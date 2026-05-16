import React, { useState, useEffect, useCallback } from 'react';
import { subCategories as defaultSubCats } from '../data';
import { useSiteConfig } from '../context/SiteConfigContext';
import AdminOrders from './admin/AdminOrders';
import AdminInventory from './admin/AdminInventory';
import AdminSiteSetup from './admin/AdminSiteSetup';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export default function AdminDashboard({ goBack }) {
  // ── Global site config from context ───────────────────────
  const { refreshSiteConfig } = useSiteConfig();

  // ── Auth ────────────────────────────────────────────────
  const [authed, setAuthed]       = useState(false);
  const [adminKey, setAdminKey]   = useState(localStorage.getItem('sn_admin_key') || '');
  const [authError, setAuthError] = useState('');

  // ── Orders state ────────────────────────────────────────
  const [orders, setOrders]           = useState([]);
  const [allOrders, setAllOrders]     = useState([]);
  const [stats, setStats]             = useState(null);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState('');
  const [filterStatus, setFilter]     = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [selected, setSelected]       = useState(null);
  const [updating, setUpdating]       = useState(false);
  const [updateForm, setUpdateForm]   = useState({
    orderStatus: '', paymentStatus: '', trackingId: '',
    courier: '', adminNotes: '', estimatedDays: ''
  });

  // ── Inventory state ─────────────────────────────────────
  const [dbProducts, setDbProducts]   = useState([]);
  const [editingProd, setEditingProd] = useState(null);
  const [isAddingProd, setIsAddingProd] = useState(false);
  const [prodForm, setProdForm]       = useState({
    id: '', name: '', price: '', category: '', subCat: '',
    tag: '', stock: 10, image: '', images: [], variants: [], description: ''
  });

  // ── Site config (admin-local copy for editing) ──────────
  const [siteConfig, setSiteConfig]   = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // ── UI state ────────────────────────────────────────────
  const [activeTab, setActiveTab]     = useState('inventory');
  const [toast, setToast]             = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  // ── Auto-login on mount ─────────────────────────────────
  useEffect(() => {
    const savedKey = localStorage.getItem('sn_admin_key');
    if (savedKey) {
      fetch(`${API}/api/orders?limit=1`, { headers: { 'x-admin-key': savedKey } })
        .then(res => {
          if (res.ok) { setAdminKey(savedKey); setAuthed(true); }
          else localStorage.removeItem('sn_admin_key');
        })
        .catch(() => {});
    }
  }, []);

  // ── Login handler ───────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch(`${API}/api/orders?limit=1`, { headers: { 'x-admin-key': adminKey } });
      if (res.ok) { localStorage.setItem('sn_admin_key', adminKey); setAuthed(true); }
      else setAuthError('Wrong admin key. Check your .env ADMIN_SECRET');
    } catch {
      setAuthError('❌ Cannot connect to server. Make sure server is running on port 5000.');
    }
  };

  // ── Data fetchers ───────────────────────────────────────
  const buildMonthlyStats = (orderList) => {
    const map = {};
    orderList.forEach(order => {
      const d = new Date(order.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!map[key]) map[key] = { key, label: `${MONTHS[d.getMonth()]} ${d.getFullYear()}`, count: 0, revenue: 0, delivered: 0, processing: 0, cancelled: 0 };
      map[key].count++;
      map[key].revenue += order.payment?.totalAmount || 0;
      if (order.orderStatus === 'Delivered')  map[key].delivered++;
      if (order.orderStatus === 'Processing') map[key].processing++;
      if (order.orderStatus === 'Cancelled')  map[key].cancelled++;
    });
    setMonthlyStats(Object.values(map).sort((a, b) => b.key.localeCompare(a.key)));
  };

  const fetchAllOrders = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/orders?limit=10000`, { headers: { 'x-admin-key': adminKey } });
      const data = await res.json();
      if (res.ok) { setAllOrders(data.orders || []); buildMonthlyStats(data.orders || []); }
    } catch {}
  }, [adminKey]);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterStatus) params.set('status', filterStatus);
      if (search) params.set('search', search);
      if (filterMonth) {
        const [yr, mo] = filterMonth.split('-');
        params.set('from', new Date(yr, mo - 1, 1).toISOString());
        params.set('to',   new Date(yr, mo, 0, 23, 59, 59).toISOString());
      }
      params.set('limit', '10000');
      const res = await fetch(`${API}/api/orders?${params}`, { headers: { 'x-admin-key': adminKey } });
      const data = await res.json();
      if (res.ok) setOrders(data.orders || []);
      else setAuthError('Invalid admin key');
    } catch { showToast('❌ Could not connect to server'); }
    finally { setLoading(false); }
  }, [adminKey, filterStatus, search, filterMonth]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/orders/stats/summary`, { headers: { 'x-admin-key': adminKey } });
      if (res.ok) setStats(await res.json());
    } catch {}
  }, [adminKey]);

  const fetchDbProducts = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/products`);
      if (res.ok) setDbProducts(await res.json());
    } catch {}
  }, []);

  const fetchSiteConfig = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/site/homepage`);
      if (res.ok) {
        const data = await res.json();
        const val = data.value;
        if (!val.subCategories) {
          val.subCategories = defaultSubCats;
        } else {
          // Merge any missing subcategories from defaults
          Object.keys(defaultSubCats).forEach(catId => {
            if (!val.subCategories[catId]) {
              val.subCategories[catId] = [...defaultSubCats[catId]];
            } else {
              defaultSubCats[catId].forEach(defaultSub => {
                if (!val.subCategories[catId].find(s => s.id === defaultSub.id)) {
                  val.subCategories[catId].push(defaultSub);
                }
              });
            }
          });
        }
        setSiteConfig(val);
      } else {
        setSiteConfig({
          hero: { keychain: "/images/Keychains/miffy2.jpg", hair: "/images/Hairaccessories/hairaccessories1.jpeg", bouquet: "/images/Bouquets/bouquet1.jpeg", plushie: "/images/Plushies/Bunny_withblackkittyhoodiee.jpg" },
          categories: [
            { id: "keychains", name: "Crochet Keychains", icon: "🔑", desc: "Cute companions for your keys & bags", accent: "#7c3aed" },
            { id: "plushies",  name: "Crochet Plushies",  icon: "🧸", desc: "Tiny huggable handmade friends",        accent: "#f59e0b" },
            { id: "hair",      name: "Hair Accessories",  icon: "🎀", desc: "Floral clips, scrunchies & bandanas",   accent: "#db2777" },
            { id: "bouquets",  name: "Crochet Bouquets",  icon: "💐", desc: "Flowers that never fade",               accent: "#dc2626" },
          ],
          subCategories: defaultSubCats
        });
      }
    } catch (err) { console.error("Failed to fetch site config", err); }
  }, []);

  // ── Order action handlers ────────────────────────────────
  const handleUpdate = async () => {
    if (!selected) return;
    setUpdating(true);
    try {
      const body = {};
      if (updateForm.orderStatus)   body.orderStatus   = updateForm.orderStatus;
      if (updateForm.paymentStatus) body.paymentStatus = updateForm.paymentStatus;
      if (updateForm.trackingId)    body.trackingId    = updateForm.trackingId;
      if (updateForm.courier)       body.courier       = updateForm.courier;
      if (updateForm.adminNotes)    body.adminNotes    = updateForm.adminNotes;
      if (updateForm.estimatedDays) body.estimatedDays = Number(updateForm.estimatedDays);
      const res = await fetch(`${API}/api/orders/${selected.orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) { showToast('✅ Order updated!'); setSelected(data.order); fetchOrders(); fetchStats(); fetchAllOrders(); }
      else showToast('❌ ' + data.error);
    } catch { showToast('❌ Update failed'); }
    finally { setUpdating(false); }
  };

  const whatsappCustomer = (order) => {
    const msg = encodeURIComponent(
      `Hi ${order.customer.name}! 🌸\n\nYour ShimmerNest order *${order.orderId}* update:\n\n` +
      `📦 Status: *${order.orderStatus}*\n` +
      (order.shipping?.trackingId ? `🚚 Tracking: *${order.shipping.trackingId}* (${order.shipping.courier || 'Courier'})\n` : '') +
      `\nThank you for shopping with ShimmerNest! 💜`
    );
    window.open(`https://wa.me/91${order.customer.phone}?text=${msg}`, '_blank');
  };

  // ── Load data after authentication ──────────────────────
  useEffect(() => {
    if (!authed) return;
    fetchOrders(); fetchStats(); fetchAllOrders(); fetchDbProducts(); fetchSiteConfig();
    const interval = setInterval(() => { fetchOrders(); fetchStats(); fetchAllOrders(); fetchDbProducts(); }, 30000);
    return () => clearInterval(interval);
  }, [authed, fetchOrders, fetchStats, fetchAllOrders, fetchDbProducts, fetchSiteConfig]);

  // ── Login screen ─────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#FCF8FF] flex items-center justify-center px-4">
        <div className="bg-white rounded-[3rem] shadow-2xl border-4 border-white p-10 w-full max-w-sm text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter mb-2">Admin Login</h1>
          <p className="text-xs text-gray-400 font-medium mb-8">ShimmerNest Order Dashboard</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder="Enter Admin Secret Key"
              value={adminKey} onChange={e => setAdminKey(e.target.value)}
              className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-purple-200 outline-none text-sm font-medium" />
            {authError && <p className="text-red-400 text-xs font-bold">{authError}</p>}
            <button type="submit" className="w-full py-4 bg-purple-600 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-purple-700 active:scale-95 transition-all">
              Enter Dashboard →
            </button>
          </form>
          <button onClick={goBack} className="mt-6 text-[10px] font-black text-gray-300 uppercase tracking-widest hover:text-purple-400 transition-colors">
            ← Back to Shop
          </button>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line no-unused-vars
  const availableMonths = monthlyStats.map(m => ({ value: m.key, label: m.label }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-purple-700 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl">
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={goBack} className="text-gray-400 hover:text-purple-600 font-black text-sm">←</button>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tighter">
              ShimmerNest <span className="text-purple-600">Admin</span>
            </h1>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Order Management Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { fetchOrders(); fetchStats(); fetchAllOrders(); }}
            className="px-4 py-2 bg-purple-50 text-purple-600 rounded-xl font-black text-xs hover:bg-purple-100 transition-colors">
            🔄 Refresh
          </button>
          <button onClick={() => { setAuthed(false); localStorage.removeItem('sn_admin_key'); }}
            className="px-4 py-2 bg-red-50 text-red-400 rounded-xl font-black text-xs hover:bg-red-100 transition-colors">
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {[
              { label: "Total Orders",  value: stats.totalOrders,      icon: "📦", color: "bg-purple-50 text-purple-700" },
              { label: "Processing",    value: stats.processing,        icon: "⏳", color: "bg-yellow-50 text-yellow-700" },
              { label: "Shipped",       value: stats.shipped,           icon: "🚚", color: "bg-blue-50 text-blue-700" },
              { label: "Delivered",     value: stats.delivered,         icon: "✅", color: "bg-green-50 text-green-700" },
              { label: "Total Revenue", value: `₹${stats.totalRevenue}`,icon: "💰", color: "bg-pink-50 text-pink-700" },
            ].map((s, i) => (
              <div key={i} className={`${s.color} rounded-2xl p-5 border-2 border-white shadow-sm`}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-70">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { id: 'orders',    label: '📦 All Orders' },
            { id: 'monthly',   label: '📅 Month by Month' },
            { id: 'inventory', label: '🧶 Inventory' },
            { id: 'site',      label: '✨ Site Setup' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-purple-600 text-white' : 'bg-white text-gray-400 hover:bg-purple-50'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Monthly View ─────────────────────────────── */}
        {activeTab === 'monthly' && (
          <div className="space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              All orders stored permanently — {allOrders.length} total orders across all months
            </p>
            {monthlyStats.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-gray-100">
                <div className="text-4xl mb-3">📅</div>
                <p className="font-black text-gray-400">No orders yet</p>
              </div>
            ) : monthlyStats.map(month => (
              <div key={month.key} className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl">📅</div>
                    <div>
                      <h3 className="font-black text-gray-900 text-lg">{month.label}</h3>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {month.count} orders · ₹{month.revenue} revenue
                      </p>
                    </div>
                  </div>
                  <button onClick={() => { setFilterMonth(month.key); setActiveTab('orders'); }}
                    className="px-5 py-2 bg-purple-50 text-purple-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-purple-100 transition-colors">
                    View Orders →
                  </button>
                </div>
                <div className="grid grid-cols-4 divide-x divide-gray-50">
                  {[
                    { label: "Total Orders", value: month.count,          color: "text-purple-700" },
                    { label: "Revenue",      value: `₹${month.revenue}`,  color: "text-green-600" },
                    { label: "Delivered",    value: month.delivered,      color: "text-green-600" },
                    { label: "Cancelled",    value: month.cancelled,      color: "text-red-500" },
                  ].map((s, i) => (
                    <div key={i} className="p-4 text-center">
                      <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Orders Tab ───────────────────────────────── */}
        {activeTab === 'orders' && (
          <AdminOrders
            orders={orders} monthlyStats={monthlyStats} allOrders={allOrders}
            loading={loading} search={search} setSearch={setSearch}
            filterStatus={filterStatus} setFilter={setFilter}
            filterMonth={filterMonth} setFilterMonth={setFilterMonth}
            fetchOrders={fetchOrders}
            selected={selected} setSelected={setSelected}
            updateForm={updateForm} setUpdateForm={setUpdateForm}
            handleUpdate={handleUpdate} updating={updating}
            whatsappCustomer={whatsappCustomer}
          />
        )}

        {/* ── Inventory Tab ────────────────────────────── */}
        {activeTab === 'inventory' && (
          <AdminInventory
            dbProducts={dbProducts} adminKey={adminKey} fetchDbProducts={fetchDbProducts}
            isUploading={isUploading} setIsUploading={setIsUploading}
            editingProd={editingProd} setEditingProd={setEditingProd}
            isAddingProd={isAddingProd} setIsAddingProd={setIsAddingProd}
            prodForm={prodForm} setProdForm={setProdForm}
            showToast={showToast}
          />
        )}

        {/* ── Site Setup Tab ───────────────────────────── */}
        {activeTab === 'site' && (
          <AdminSiteSetup
            siteConfig={siteConfig} setSiteConfig={setSiteConfig}
            adminKey={adminKey} isUploading={isUploading} setIsUploading={setIsUploading}
            showToast={showToast} refreshSiteConfig={refreshSiteConfig}
          />
        )}
      </div>
    </div>
  );
}