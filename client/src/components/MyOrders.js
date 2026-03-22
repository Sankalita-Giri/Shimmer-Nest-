import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const STATUS_STEPS = ['Processing', 'Confirmed', 'Crafting', 'Shipped', 'Delivered'];

const STATUS_COLORS = {
  Processing: "bg-yellow-100 text-yellow-700",
  Confirmed:  "bg-blue-100 text-blue-700",
  Crafting:   "bg-purple-100 text-purple-700",
  Shipped:    "bg-indigo-100 text-indigo-700",
  Delivered:  "bg-green-100 text-green-700",
  Cancelled:  "bg-red-100 text-red-500",
};

const PAYMENT_COLORS = {
  "Pending Verification": "bg-orange-100 text-orange-600",
  "Paid":                 "bg-green-100 text-green-600",
  "Failed":               "bg-red-100 text-red-500",
};

export default function MyOrders({ setView }) {
  const { customer, logout, fetchMyOrders, getToken, updateCustomer } = useAuth();
  const [orders, setOrders]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [selected, setSelected]     = useState(null);
  const [activeTab, setActiveTab]   = useState('orders'); // orders | profile
  const [saving, setSaving]         = useState(false);
  const [saveMsg, setSaveMsg]       = useState('');

  const [profileForm, setProfileForm] = useState({
    name:    customer?.name    || '',
    phone:   customer?.phone   || '',
    address: customer?.address || '',
  });

  useEffect(() => {
    loadOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const data = await fetchMyOrders();
    setOrders(data);
    setLoading(false);
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/customers/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(profileForm)
      });
      const data = await res.json();
      if (res.ok) {
        updateCustomer(data.customer);
        setSaveMsg('✅ Profile saved!');
        setTimeout(() => setSaveMsg(''), 3000);
      }
    } catch {
      setSaveMsg('❌ Could not save');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    setView('home');
  };

  const getStepIndex = (status) => STATUS_STEPS.indexOf(status);

  return (
    <div className="animate-fadeIn max-w-2xl mx-auto pb-20 px-4 pt-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <button onClick={() => setView('home')}
            className="text-purple-300 font-black text-[10px] uppercase tracking-widest hover:text-purple-500 transition-colors mb-2 block">
            ← Back to Shop
          </button>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter">
            My Account 💜
          </h1>
          <p className="text-gray-400 text-sm font-medium mt-1">
            Welcome back, <span className="text-purple-600 font-black">{customer?.name}</span>!
          </p>
        </div>
        <button onClick={handleLogout}
          className="px-5 py-2.5 bg-red-50 text-red-400 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-colors">
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-50 rounded-2xl p-1 mb-8">
        <button onClick={() => setActiveTab('orders')}
          className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-400'}`}>
          📦 My Orders
        </button>
        <button onClick={() => setActiveTab('profile')}
          className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'profile' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-400'}`}>
          👤 My Profile
        </button>
      </div>

      {/* ── ORDERS TAB ─────────────────────────────────────── */}
      {activeTab === 'orders' && (
        <div>
          {loading ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-3 animate-bounce">🧶</div>
              <p className="text-gray-400 font-bold text-sm">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[3rem] shadow-xl border-4 border-white">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-black text-gray-800 italic mb-3">No orders yet!</h3>
              <p className="text-gray-400 text-sm font-medium mb-8">Your orders will appear here once you shop.</p>
              <button onClick={() => setView('home')}
                className="px-8 py-4 bg-purple-600 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-purple-700 active:scale-95 transition-all">
                Start Shopping ✨
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order._id}>
                  {/* Order Card */}
                  <div
                    onClick={() => setSelected(selected?._id === order._id ? null : order)}
                    className={`bg-white rounded-[2.5rem] border-4 p-6 cursor-pointer transition-all shadow-lg ${selected?._id === order._id ? 'border-purple-300 shadow-purple-100' : 'border-white hover:border-purple-100'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="font-black text-gray-900 font-mono text-sm">{order.orderId}</span>
                          <span className={`text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${STATUS_COLORS[order.orderStatus] || 'bg-gray-100 text-gray-500'}`}>
                            {order.orderStatus}
                          </span>
                          <span className={`text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${PAYMENT_COLORS[order.payment?.status] || 'bg-gray-100 text-gray-500'}`}>
                            {order.payment?.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">
                          {order.items?.map(i => `${i.name} x${i.qty}`).join(' · ')}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium mt-1">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="text-right flex-none">
                        <p className="font-black text-purple-700 text-lg italic">₹{order.payment?.totalAmount}</p>
                        <p className="text-[9px] text-gray-300 font-bold mt-1">{selected?._id === order._id ? '▲ Hide' : '▼ Details'}</p>
                      </div>
                    </div>

                    {/* Mini tracking bar */}
                    {order.orderStatus !== 'Cancelled' && (
                      <div className="mt-5">
                        <div className="flex items-center justify-between mb-1.5">
                          {STATUS_STEPS.map((step, i) => {
                            const current = getStepIndex(order.orderStatus);
                            const done    = i <= current;
                            return (
                              <div key={step} className="flex flex-col items-center flex-1">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[8px] transition-all ${done ? 'bg-purple-600 border-purple-600 text-white' : 'bg-gray-100 border-gray-200 text-gray-300'}`}>
                                  {done ? '✓' : ''}
                                </div>
                                {i < STATUS_STEPS.length - 1 && (
                                  <div className="hidden md:block absolute" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex w-full h-1.5 rounded-full overflow-hidden bg-gray-100">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-400 rounded-full transition-all duration-700"
                            style={{ width: `${Math.max(10, ((getStepIndex(order.orderStatus)) / (STATUS_STEPS.length - 1)) * 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-1">
                          {STATUS_STEPS.map((step, i) => (
                            <span key={step} className={`text-[7px] font-black uppercase tracking-tight ${i <= getStepIndex(order.orderStatus) ? 'text-purple-500' : 'text-gray-300'}`}>
                              {step}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {order.orderStatus === 'Cancelled' && (
                      <div className="mt-4 bg-red-50 rounded-2xl p-3 text-center">
                        <p className="text-red-400 text-xs font-bold">❌ This order was cancelled</p>
                      </div>
                    )}
                  </div>

                  {/* Expanded order details */}
                  {selected?._id === order._id && (
                    <div className="bg-purple-50 rounded-[2rem] border-2 border-purple-100 p-6 mt-2 space-y-5 animate-fadeIn">

                      {/* Items */}
                      <div>
                        <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-3">Items Ordered</p>
                        <div className="space-y-2">
                          {order.items?.map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-3 flex justify-between items-center">
                              <div>
                                <p className="font-black text-gray-800 text-sm">{item.name}</p>
                                <p className="text-[9px] text-purple-400 font-bold uppercase">
                                  {item.selectedColor} · x{item.qty}
                                  {item.note ? ` · "${item.note}"` : ''}
                                </p>
                              </div>
                              <p className="font-black text-purple-600">₹{item.price * item.qty}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payment breakdown */}
                      <div>
                        <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-3">Payment Summary</p>
                        <div className="bg-white rounded-2xl p-4 space-y-2 text-sm">
                          <div className="flex justify-between text-gray-500">
                            <span>Items</span><span>₹{order.payment?.subtotal || order.payment?.totalAmount}</span>
                          </div>
                          {order.payment?.deliveryCharge >= 0 && (
                            <div className="flex justify-between text-gray-500">
                              <span>Delivery</span>
                              <span>{order.payment?.deliveryCharge === 0 ? 'FREE 🎉' : `₹${order.payment.deliveryCharge}`}</span>
                            </div>
                          )}
                          {order.giftWrap?.enabled && (
                            <div className="flex justify-between text-gray-500">
                              <span>🎀 Gift Wrap</span><span>₹30</span>
                            </div>
                          )}
                          <div className="flex justify-between font-black text-gray-800 border-t pt-2">
                            <span>Total Paid</span><span className="text-purple-700">₹{order.payment?.totalAmount}</span>
                          </div>
                        </div>
                      </div>

                      {/* Shipping */}
                      <div>
                        <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-3">Shipping Details</p>
                        <div className="bg-white rounded-2xl p-4 space-y-1 text-sm text-gray-600">
                          <p className="font-medium">📍 {order.customer?.address}</p>
                          {order.shipping?.courier && (
                            <p className="font-bold text-blue-600">🚚 {order.shipping.courier}</p>
                          )}
                          {order.shipping?.trackingId && (
                            <p className="font-mono font-bold text-blue-600 text-xs">Tracking: {order.shipping.trackingId}</p>
                          )}
                          {!order.shipping?.trackingId && (
                            <p className="text-[10px] text-gray-400 font-medium">
                              Tracking details will appear here once shipped 📦
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Gift wrap message */}
                      {order.giftWrap?.enabled && order.giftWrap?.message && (
                        <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100">
                          <p className="text-[9px] font-black text-pink-400 uppercase tracking-widest mb-1">🎀 Gift Message</p>
                          <p className="text-sm text-gray-600 italic">"{order.giftWrap.message}"</p>
                        </div>
                      )}

                      {/* No cancel/refund notice */}
                      <div className="bg-white rounded-2xl p-4 border-2 border-purple-100 text-center">
                        <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest">
                          🧶 Handmade to order · No cancellations or refunds
                        </p>
                        <p className="text-[9px] text-gray-400 font-medium mt-1">
                          Questions? Email us at support@shimmernest.com
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── PROFILE TAB ────────────────────────────────────── */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-[3rem] shadow-2xl border-4 border-white p-8 space-y-5">
          <h2 className="text-xl font-black text-gray-800 italic">Your Details 🎀</h2>

          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Full Name</label>
            <input value={profileForm.name} onChange={e => setProfileForm(p => ({...p, name: e.target.value}))}
              className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-purple-200 outline-none text-sm font-medium" />
          </div>

          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Email</label>
            <input value={customer?.email} disabled
              className="w-full p-4 bg-gray-100 rounded-2xl border-2 border-transparent outline-none text-sm font-medium text-gray-400 cursor-not-allowed" />
            <p className="text-[9px] text-gray-300 font-medium mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Phone</label>
            <input value={profileForm.phone} onChange={e => setProfileForm(p => ({...p, phone: e.target.value}))}
              maxLength={10} inputMode="numeric"
              className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-purple-200 outline-none text-sm font-medium" />
          </div>

          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Default Delivery Address</label>
            <textarea value={profileForm.address} onChange={e => setProfileForm(p => ({...p, address: e.target.value}))}
              rows={3} placeholder="Your full address + pincode"
              className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-purple-200 outline-none text-sm font-medium resize-none" />
          </div>

          {saveMsg && (
            <div className={`rounded-2xl p-3 text-center text-xs font-bold ${saveMsg.includes('✅') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
              {saveMsg}
            </div>
          )}

          <button onClick={saveProfile} disabled={saving}
            className={`w-full py-5 rounded-full font-black text-xs uppercase tracking-widest text-white transition-all active:scale-95 ${saving ? 'bg-gray-300' : 'bg-purple-600 hover:bg-purple-700 shadow-xl shadow-purple-100'}`}>
            {saving ? 'Saving...' : 'Save Profile ✅'}
          </button>
        </div>
      )}
    </div>
  );
}