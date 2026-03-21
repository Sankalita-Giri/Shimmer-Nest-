import React, { useState, useEffect, useCallback } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const STATUS_COLORS = {
  Processing:   "bg-yellow-100 text-yellow-700",
  Confirmed:    "bg-blue-100 text-blue-700",
  Crafting:     "bg-purple-100 text-purple-700",
  Shipped:      "bg-indigo-100 text-indigo-700",
  Delivered:    "bg-green-100 text-green-700",
  Cancelled:    "bg-red-100 text-red-500",
};

const PAYMENT_COLORS = {
  "Pending Verification": "bg-orange-100 text-orange-600",
  "Paid":                 "bg-green-100 text-green-600",
  "Failed":               "bg-red-100 text-red-500",
};

export default function AdminDashboard({ goBack }) {
  const [orders, setOrders]         = useState([]);
  const [stats, setStats]           = useState(null);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [filterStatus, setFilter]   = useState('');
  const [selected, setSelected]     = useState(null);
  const [updating, setUpdating]     = useState(false);
  const [toast, setToast]           = useState('');
  const [adminKey, setAdminKey]     = useState(localStorage.getItem('sn_admin_key') || '');
  const [authed, setAuthed]         = useState(false);
  const [authError, setAuthError]   = useState('');

  // ── Update form state ──────────────────────────────────────
  const [updateForm, setUpdateForm] = useState({
    orderStatus: '', paymentStatus: '', trackingId: '',
    courier: '', adminNotes: '', estimatedDays: ''
  });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  // ── Fetch orders ───────────────────────────────────────────
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterStatus) params.set('status', filterStatus);
      if (search)       params.set('search', search);
      params.set('limit', '200');

      const res = await fetch(`${API}/api/orders?${params}`, {
        headers: { 'x-admin-key': adminKey }
      });
      const data = await res.json();
      if (res.ok) setOrders(data.orders || []);
      else setAuthError('Invalid admin key');
    } catch (e) {
      showToast('❌ Could not connect to server');
    } finally {
      setLoading(false);
    }
  }, [adminKey, filterStatus, search]);

  // ── Fetch stats ────────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/orders/stats/summary`, {
        headers: { 'x-admin-key': adminKey }
      });
      if (res.ok) setStats(await res.json());
    } catch {}
  }, [adminKey]);

  // ── Login ──────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    const res = await fetch(`${API}/api/orders?limit=1`, {
      headers: { 'x-admin-key': adminKey }
    });
    if (res.ok) {
      localStorage.setItem('sn_admin_key', adminKey);
      setAuthed(true);
    } else {
      setAuthError('Wrong admin key. Check your .env ADMIN_SECRET');
    }
  };

  useEffect(() => {
    if (authed) { fetchOrders(); fetchStats(); }
  }, [authed, fetchOrders, fetchStats]);

  // ── Update order ───────────────────────────────────────────
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
      if (res.ok) {
        showToast('✅ Order updated!');
        setSelected(data.order);
        fetchOrders();
        fetchStats();
      } else {
        showToast('❌ ' + data.error);
      }
    } catch {
      showToast('❌ Update failed');
    } finally {
      setUpdating(false);
    }
  };

  // ── WhatsApp customer ──────────────────────────────────────
  const whatsappCustomer = (order) => {
    const msg = encodeURIComponent(
      `Hi ${order.customer.name}! 🌸\n\nYour ShimmerNest order *${order.orderId}* has been updated.\n\n` +
      `📦 Status: *${order.orderStatus}*\n` +
      (order.shipping?.trackingId ? `🚚 Tracking ID: *${order.shipping.trackingId}* (${order.shipping.courier || 'Courier'})\n` : '') +
      `\nThank you for shopping with ShimmerNest! 💜`
    );
    window.open(`https://wa.me/91${order.customer.phone}?text=${msg}`, '_blank');
  };

  // ── Login screen ───────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#FCF8FF] flex items-center justify-center px-4">
        <div className="bg-white rounded-[3rem] shadow-2xl border-4 border-white p-10 w-full max-w-sm text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter mb-2">Admin Login</h1>
          <p className="text-xs text-gray-400 font-medium mb-8">ShimmerNest Order Dashboard</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Admin Secret Key"
              value={adminKey}
              onChange={e => setAdminKey(e.target.value)}
              className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-purple-200 outline-none text-sm font-medium"
            />
            {authError && <p className="text-red-400 text-xs font-bold">{authError}</p>}
            <button type="submit"
              className="w-full py-4 bg-purple-600 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-purple-700 active:scale-95 transition-all">
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

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-purple-700 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl">
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={goBack} className="text-gray-400 hover:text-purple-600 transition-colors font-black text-sm">←</button>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tighter">
              ShimmerNest <span className="text-purple-600">Admin</span>
            </h1>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Order Management Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { fetchOrders(); fetchStats(); }}
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: "Total Orders",   value: stats.totalOrders,  icon: "📦", color: "bg-purple-50 text-purple-700" },
              { label: "Processing",     value: stats.processing,   icon: "⏳", color: "bg-yellow-50 text-yellow-700" },
              { label: "Shipped",        value: stats.shipped,      icon: "🚚", color: "bg-blue-50 text-blue-700"    },
              { label: "Delivered",      value: stats.delivered,    icon: "✅", color: "bg-green-50 text-green-700"  },
              { label: "Total Revenue",  value: `₹${stats.totalRevenue}`, icon: "💰", color: "bg-pink-50 text-pink-700" },
            ].map((s, i) => (
              <div key={i} className={`${s.color} rounded-2xl p-5 border-2 border-white shadow-sm`}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-70">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-6">

          {/* Orders List */}
          <div className="flex-grow min-w-0">
            {/* Filters */}
            <div className="flex gap-3 mb-4 flex-wrap">
              <input
                type="text" placeholder="🔍 Search name, email, order ID..."
                value={search} onChange={e => { setSearch(e.target.value); }}
                onKeyDown={e => e.key === 'Enter' && fetchOrders()}
                className="flex-grow p-3 bg-white rounded-2xl border-2 border-gray-100 focus:border-purple-200 outline-none text-sm font-medium shadow-sm"
              />
              <select value={filterStatus} onChange={e => { setFilter(e.target.value); }}
                className="p-3 bg-white rounded-2xl border-2 border-gray-100 outline-none text-sm font-medium shadow-sm">
                <option value="">All Statuses</option>
                {['Processing','Confirmed','Crafting','Shipped','Delivered','Cancelled'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button onClick={fetchOrders}
                className="px-5 py-3 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-700 active:scale-95 transition-all">
                Search
              </button>
            </div>

            {loading ? (
              <div className="text-center py-20 text-gray-400 font-bold">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-gray-100">
                <div className="text-4xl mb-3">📭</div>
                <p className="font-black text-gray-400">No orders found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order._id}
                    onClick={() => {
                      setSelected(order);
                      setUpdateForm({
                        orderStatus: order.orderStatus || '',
                        paymentStatus: order.payment?.status || '',
                        trackingId: order.shipping?.trackingId || '',
                        courier: order.shipping?.courier || '',
                        adminNotes: order.adminNotes || '',
                        estimatedDays: order.shipping?.estimatedDays || ''
                      });
                    }}
                    className={`bg-white rounded-2xl border-2 p-5 cursor-pointer hover:border-purple-200 transition-all shadow-sm ${selected?._id === order._id ? 'border-purple-400 shadow-purple-100 shadow-lg' : 'border-gray-100'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-black text-gray-900 text-sm font-mono">{order.orderId}</span>
                          <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${STATUS_COLORS[order.orderStatus] || 'bg-gray-100 text-gray-500'}`}>
                            {order.orderStatus}
                          </span>
                          <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${PAYMENT_COLORS[order.payment?.status] || 'bg-gray-100 text-gray-500'}`}>
                            {order.payment?.status}
                          </span>
                        </div>
                        <p className="font-bold text-gray-700 text-sm">{order.customer?.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{order.customer?.email} · {order.customer?.phone}</p>
                        <p className="text-[10px] text-gray-400 font-medium mt-0.5 truncate max-w-xs">{order.customer?.address}</p>
                        {order.items && (
                          <p className="text-[10px] text-purple-500 font-bold mt-1">
                            {order.items.map(i => `${i.name} x${i.qty}`).join(', ')}
                          </p>
                        )}
                      </div>
                      <div className="text-right flex-none">
                        <p className="font-black text-purple-700 text-lg italic">₹{order.payment?.totalAmount}</p>
                        <p className="text-[9px] text-gray-400 font-medium">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                        </p>
                        {order.giftWrap?.enabled && (
                          <span className="text-[9px] font-black text-pink-500">🎀 Gift Wrap</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Detail Panel */}
          {selected && (
            <div className="w-96 flex-none">
              <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm sticky top-24 overflow-hidden">

                {/* Panel Header */}
                <div className="bg-purple-900 p-5 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] font-black text-purple-300 uppercase tracking-widest mb-1">Order Details</p>
                      <p className="font-black text-lg font-mono">{selected.orderId}</p>
                    </div>
                    <button onClick={() => setSelected(null)} className="text-purple-300 hover:text-white font-black text-lg">✕</button>
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <span className={`text-[8px] font-black px-2 py-1 rounded-full ${STATUS_COLORS[selected.orderStatus]}`}>
                      {selected.orderStatus}
                    </span>
                    <span className={`text-[8px] font-black px-2 py-1 rounded-full ${PAYMENT_COLORS[selected.payment?.status]}`}>
                      {selected.payment?.status}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">

                  {/* Customer */}
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Customer</p>
                    <div className="bg-gray-50 rounded-xl p-3 space-y-1.5">
                      <p className="font-black text-gray-800 text-sm">{selected.customer?.name}</p>
                      <p className="text-xs text-gray-500">📧 {selected.customer?.email}</p>
                      <p className="text-xs text-gray-500">📞 {selected.customer?.phone}</p>
                      <p className="text-xs text-gray-500">📍 {selected.customer?.address}</p>
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Items Ordered</p>
                    <div className="space-y-2">
                      {selected.items?.map((item, i) => (
                        <div key={i} className="bg-purple-50 rounded-xl p-3 flex justify-between items-start">
                          <div>
                            <p className="font-black text-gray-800 text-xs">{item.name}</p>
                            <p className="text-[9px] text-purple-400 font-bold">
                              {item.selectedColor} · x{item.qty}
                              {item.note ? ` · "${item.note}"` : ''}
                            </p>
                          </div>
                          <p className="font-black text-purple-600 text-sm">₹{item.price * item.qty}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment */}
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Payment</p>
                    <div className="bg-gray-50 rounded-xl p-3 space-y-1.5 text-xs text-gray-600">
                      <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">₹{selected.payment?.subtotal || '—'}</span></div>
                      <div className="flex justify-between"><span>Delivery</span><span className="font-bold">{selected.payment?.deliveryCharge === 0 ? 'FREE' : `₹${selected.payment?.deliveryCharge}`}</span></div>
                      {selected.giftWrap?.enabled && <div className="flex justify-between"><span>🎀 Gift Wrap</span><span className="font-bold">₹{selected.payment?.giftWrapCharge}</span></div>}
                      <div className="flex justify-between border-t pt-1.5 mt-1"><span className="font-black text-gray-800">Total</span><span className="font-black text-purple-700">₹{selected.payment?.totalAmount}</span></div>
                      <div className="flex justify-between"><span>UTR</span><span className="font-bold font-mono text-purple-600 text-[10px]">{selected.payment?.transactionId}</span></div>
                      <div className="flex justify-between"><span>Payer Name</span><span className="font-bold">{selected.payment?.payerName}</span></div>
                    </div>
                  </div>

                  {/* Gift Wrap */}
                  {selected.giftWrap?.enabled && (
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Gift Wrap Message</p>
                      <div className="bg-pink-50 rounded-xl p-3 border border-pink-100">
                        <p className="text-xs text-gray-600 italic">"{selected.giftWrap.message || 'No message'}"</p>
                      </div>
                    </div>
                  )}

                  {/* Shipping */}
                  {(selected.shipping?.trackingId || selected.shipping?.courier) && (
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Shipping</p>
                      <div className="bg-blue-50 rounded-xl p-3 space-y-1 text-xs text-gray-600">
                        {selected.shipping.courier   && <p>🚚 {selected.shipping.courier}</p>}
                        {selected.shipping.trackingId && <p className="font-mono font-bold text-blue-600">{selected.shipping.trackingId}</p>}
                      </div>
                    </div>
                  )}

                  {/* Update Form */}
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Update Order</p>
                    <div className="space-y-3">
                      <select value={updateForm.orderStatus} onChange={e => setUpdateForm(p => ({...p, orderStatus: e.target.value}))}
                        className="w-full p-3 bg-gray-50 rounded-xl border-2 border-gray-100 focus:border-purple-200 outline-none text-sm font-medium">
                        <option value="">— Order Status —</option>
                        {['Processing','Confirmed','Crafting','Shipped','Delivered','Cancelled'].map(s => <option key={s}>{s}</option>)}
                      </select>
                      <select value={updateForm.paymentStatus} onChange={e => setUpdateForm(p => ({...p, paymentStatus: e.target.value}))}
                        className="w-full p-3 bg-gray-50 rounded-xl border-2 border-gray-100 focus:border-purple-200 outline-none text-sm font-medium">
                        <option value="">— Payment Status —</option>
                        {['Pending Verification','Paid','Failed'].map(s => <option key={s}>{s}</option>)}
                      </select>
                      <input placeholder="Tracking ID" value={updateForm.trackingId} onChange={e => setUpdateForm(p => ({...p, trackingId: e.target.value}))}
                        className="w-full p-3 bg-gray-50 rounded-xl border-2 border-gray-100 focus:border-purple-200 outline-none text-sm font-medium" />
                      <input placeholder="Courier (e.g. Delhivery, India Post)" value={updateForm.courier} onChange={e => setUpdateForm(p => ({...p, courier: e.target.value}))}
                        className="w-full p-3 bg-gray-50 rounded-xl border-2 border-gray-100 focus:border-purple-200 outline-none text-sm font-medium" />
                      <textarea placeholder="Admin notes (internal only)" rows={2} value={updateForm.adminNotes} onChange={e => setUpdateForm(p => ({...p, adminNotes: e.target.value}))}
                        className="w-full p-3 bg-gray-50 rounded-xl border-2 border-gray-100 focus:border-purple-200 outline-none text-sm font-medium resize-none" />
                      <button onClick={handleUpdate} disabled={updating}
                        className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white transition-all active:scale-95 ${updating ? 'bg-gray-300' : 'bg-purple-600 hover:bg-purple-700'}`}>
                        {updating ? 'Saving...' : 'Save Changes ✅'}
                      </button>
                    </div>
                  </div>

                  {/* Contact Customer */}
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Contact Customer</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => whatsappCustomer(selected)}
                        className="py-3 bg-green-50 text-green-600 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-green-100 transition-colors active:scale-95">
                        💬 WhatsApp
                      </button>
                      <a href={`mailto:${selected.customer?.email}?subject=Your ShimmerNest Order ${selected.orderId}&body=Hi ${selected.customer?.name},%0A%0AYour order ${selected.orderId} update:%0A%0AStatus: ${selected.orderStatus}%0A${selected.shipping?.trackingId ? `Tracking: ${selected.shipping.trackingId}` : ''}%0A%0AThank you for shopping with ShimmerNest! 💜`}
                        className="py-3 bg-purple-50 text-purple-600 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-purple-100 transition-colors active:scale-95 text-center">
                        📧 Email
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}