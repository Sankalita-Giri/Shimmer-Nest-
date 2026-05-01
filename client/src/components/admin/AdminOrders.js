import React from 'react';

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

export default function AdminOrders({
  orders, monthlyStats, allOrders,
  loading, search, setSearch, filterStatus, setFilter,
  filterMonth, setFilterMonth, fetchOrders,
  selected, setSelected, updateForm, setUpdateForm,
  handleUpdate, updating, whatsappCustomer
}) {
  const availableMonths = monthlyStats.map(m => ({ value: m.key, label: m.label }));

  return (
    <div className="flex gap-6">
      <div className="flex-grow min-w-0">
        {/* Filters */}
        <div className="flex gap-3 mb-4 flex-wrap">
          <input type="text" placeholder="🔍 Search name, email, order ID..."
            value={search} onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchOrders()}
            className="flex-grow p-3 bg-white rounded-2xl border-2 border-gray-100 focus:border-purple-200 outline-none text-sm font-medium shadow-sm" />

          <select value={filterMonth} onChange={e => setFilterMonth(e.target.value)}
            className="p-3 bg-white rounded-2xl border-2 border-gray-100 outline-none text-sm font-medium shadow-sm">
            <option value="">All Months</option>
            {availableMonths.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>

          <select value={filterStatus} onChange={e => setFilter(e.target.value)}
            className="p-3 bg-white rounded-2xl border-2 border-gray-100 outline-none text-sm font-medium shadow-sm">
            <option value="">All Statuses</option>
            {['Processing','Confirmed','Crafting','Shipped','Delivered','Cancelled'].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <button onClick={fetchOrders}
            className="px-5 py-3 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-700 active:scale-95 transition-all">
            Search
          </button>

          {(filterMonth || filterStatus || search) && (
            <button onClick={() => { setFilterMonth(''); setFilter(''); setSearch(''); }}
              className="px-5 py-3 bg-gray-100 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
              Clear ✕
            </button>
          )}
        </div>

        {filterMonth && (
          <div className="mb-3 flex items-center gap-2">
            <span className="bg-purple-100 text-purple-700 text-xs font-black px-3 py-1 rounded-full">
              📅 {availableMonths.find(m => m.value === filterMonth)?.label}
            </span>
            <span className="text-xs text-gray-400 font-medium">{orders.length} orders</span>
          </div>
        )}

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
                    orderStatus:   order.orderStatus || '',
                    paymentStatus: order.payment?.status || '',
                    trackingId:    order.shipping?.trackingId || '',
                    courier:       order.shipping?.courier || '',
                    adminNotes:    order.adminNotes || '',
                    estimatedDays: order.shipping?.estimatedDays || ''
                  });
                }}
                className={`bg-white rounded-2xl border-2 p-5 cursor-pointer hover:border-purple-200 transition-all shadow-sm ${selected?._id === order._id ? 'border-purple-400 shadow-purple-100 shadow-lg' : 'border-gray-100'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-black text-gray-900 text-sm font-mono">{order.orderId}</span>
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${STATUS_COLORS[order.orderStatus] || 'bg-gray-100 text-gray-500'}`}>
                        {order.orderStatus}
                      </span>
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${PAYMENT_COLORS[order.payment?.status] || 'bg-gray-100 text-gray-500'}`}>
                        {order.payment?.status}
                      </span>
                    </div>
                    <p className="font-bold text-gray-700 text-sm">{order.customer?.name}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{order.customer?.email} · {order.customer?.phone}</p>
                    <p className="text-[10px] text-purple-500 font-bold mt-1">
                      {order.items?.map(i => `${i.name} x${i.qty}`).join(', ')}
                    </p>
                  </div>
                  <div className="text-right flex-none">
                    <p className="font-black text-purple-700 text-lg italic">₹{order.payment?.totalAmount}</p>
                    <p className="text-[9px] text-gray-400 font-medium">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                    </p>
                    {order.giftWrap?.enabled && <span className="text-[9px] font-black text-pink-500">🎀 Gift</span>}
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
            <div className="bg-purple-900 p-5 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[9px] font-black text-purple-300 uppercase tracking-widest mb-1">Order Details</p>
                  <p className="font-black text-lg font-mono">{selected.orderId}</p>
                  <p className="text-[9px] text-purple-300 mt-1">
                    {new Date(selected.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <button onClick={() => setSelected(null)} className="text-purple-300 hover:text-white font-black text-lg">✕</button>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                <span className={`text-[8px] font-black px-2 py-1 rounded-full ${STATUS_COLORS[selected.orderStatus]}`}>{selected.orderStatus}</span>
                <span className={`text-[8px] font-black px-2 py-1 rounded-full ${PAYMENT_COLORS[selected.payment?.status]}`}>{selected.payment?.status}</span>
              </div>
            </div>

            <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Customer</p>
                <div className="bg-gray-50 rounded-xl p-3 space-y-1.5">
                  <p className="font-black text-gray-800 text-sm">{selected.customer?.name}</p>
                  <p className="text-xs text-gray-500">📧 {selected.customer?.email}</p>
                  <p className="text-xs text-gray-500">📞 {selected.customer?.phone}</p>
                  <p className="text-xs text-gray-500">📍 {selected.customer?.address}</p>
                </div>
              </div>

              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Items Ordered</p>
                <div className="space-y-2">
                  {selected.items?.map((item, i) => (
                    <div key={i} className="bg-purple-50 rounded-xl p-3 flex justify-between items-start">
                      <div>
                        <p className="font-black text-gray-800 text-xs">{item.name}</p>
                        <p className="text-[9px] text-purple-400 font-bold">
                          {item.selectedColor} · x{item.qty}{item.note ? ` · "${item.note}"` : ''}
                        </p>
                      </div>
                      <p className="font-black text-purple-600 text-sm">₹{item.price * item.qty}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Payment</p>
                <div className="bg-gray-50 rounded-xl p-3 space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">₹{selected.payment?.subtotal || '—'}</span></div>
                  <div className="flex justify-between"><span>Delivery</span><span className="font-bold">{selected.payment?.deliveryCharge === 0 ? 'FREE' : `₹${selected.payment?.deliveryCharge}`}</span></div>
                  {selected.giftWrap?.enabled && <div className="flex justify-between"><span>🎀 Gift Wrap</span><span className="font-bold">₹{selected.payment?.giftWrapCharge}</span></div>}
                  <div className="flex justify-between border-t pt-1.5"><span className="font-black text-gray-800">Total</span><span className="font-black text-purple-700">₹{selected.payment?.totalAmount}</span></div>
                  <div className="flex justify-between"><span>UTR</span><span className="font-bold font-mono text-purple-600 text-[10px]">{selected.payment?.transactionId}</span></div>
                  <div className="flex justify-between"><span>Payer</span><span className="font-bold">{selected.payment?.payerName}</span></div>
                </div>
              </div>

              {selected.giftWrap?.enabled && (
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Gift Message</p>
                  <div className="bg-pink-50 rounded-xl p-3 border border-pink-100">
                    <p className="text-xs text-gray-600 italic">"{selected.giftWrap.message || 'No message'}"</p>
                  </div>
                </div>
              )}

              {(selected.shipping?.trackingId || selected.shipping?.courier) && (
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Shipping</p>
                  <div className="bg-blue-50 rounded-xl p-3 space-y-1 text-xs text-gray-600">
                    {selected.shipping.courier    && <p>🚚 {selected.shipping.courier}</p>}
                    {selected.shipping.trackingId && <p className="font-mono font-bold text-blue-600">{selected.shipping.trackingId}</p>}
                  </div>
                </div>
              )}

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

              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Contact Customer</p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => whatsappCustomer(selected)}
                    className="py-3 bg-green-50 text-green-600 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-green-100 transition-colors active:scale-95">
                    💬 WhatsApp
                  </button>
                  <a href={`mailto:${selected.customer?.email}?subject=Your ShimmerNest Order ${selected.orderId}&body=Hi ${selected.customer?.name},%0A%0AYour order ${selected.orderId} update:%0A%0AStatus: ${selected.orderStatus}%0A${selected.shipping?.trackingId ? `Tracking: ${selected.shipping.trackingId}` : ''}%0A%0AThank you! 💜`}
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
  );
}
