import React, { useEffect, useState } from "react";

export default function ThankYou({ order, onContinue }) {
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const STATUS_MAP = { Processing: 1, Shipped: 2, Delivered: 3, Cancelled: -1 };
  const currentStep = STATUS_MAP[order?.orderStatus] ?? 1;

  useEffect(() => {
    const t = setTimeout(() => setActiveStep(currentStep), 600);
    return () => clearTimeout(t);
  }, [currentStep]);

  const STEPS = [
    { icon: "✅", label: "Order Placed",      desc: "We've received your order",          color: "bg-purple-500" },
    { icon: "💳", label: "Payment Verified",  desc: "UTR matched & confirmed",            color: "bg-violet-500" },
    { icon: "🧶", label: "Being Crafted",     desc: "Handmade with love, 5–7 days",       color: "bg-pink-400"   },
    { icon: "📦", label: "Shipped",           desc: "On its way to your door!",           color: "bg-rose-400"   },
    { icon: "🌸", label: "Delivered",         desc: "Enjoy your ShimmerNest treasure",    color: "bg-green-400"  },
  ];

  const isCancelled = order?.orderStatus === "Cancelled";
  const { orderId = "SN-XXXX-0000", customer = {}, items = [], payment = {}, createdAt } = order || {};

  const orderDate = new Date(createdAt || Date.now()).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  const sellerWhatsApp = process.env.REACT_APP_SELLER_PHONE || "91XXXXXXXXXX";

  return (
    <div
      className={`min-h-screen bg-[#FCF8FF] transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="fixed -top-32 -right-32 w-96 h-96 bg-purple-100/50 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="fixed -bottom-32 -left-32 w-96 h-96 bg-pink-100/40 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-2xl mx-auto px-4 pt-12 pb-24 space-y-6">

        {/* HERO BANNER */}
        <div
          className="relative rounded-[3rem] overflow-hidden text-center py-14 px-8 border-8 border-white shadow-2xl"
          style={{ background: "linear-gradient(135deg, #4f1dbb 0%, #7c3aed 45%, #be185d 100%)" }}
        >
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
          <div className="text-6xl mb-4" style={{ animation: "float 3s ease-in-out infinite" }}>🌸</div>
          <h1 className="text-white font-black tracking-tighter leading-tight mb-2" style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}>
            Thank You for Shopping!
          </h1>
          <p className="text-purple-200 font-medium text-sm">Your order is confirmed and we're on it 💜</p>
          <div className="inline-flex items-center gap-2 mt-6 bg-white/15 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full">
            <span className="text-[9px] font-black text-purple-200 uppercase tracking-widest">Order ID</span>
            <span className="text-white font-black font-mono text-sm tracking-wider">{orderId}</span>
          </div>
        </div>

        {/* TRACKING TIMELINE */}
        <div className="bg-white rounded-[3rem] border-4 border-white shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-black text-gray-800 uppercase tracking-widest">Order Tracking</h2>
            <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full ${isCancelled ? "bg-red-50 text-red-400" : "bg-purple-50 text-purple-500"}`}>
              {isCancelled ? "❌ Cancelled" : `Step ${Math.min(activeStep + 1, 5)} of 5`}
            </span>
          </div>

          {isCancelled ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">😢</div>
              <p className="text-gray-500 font-bold text-sm">This order was cancelled. Please contact us on WhatsApp for help.</p>
            </div>
          ) : (
            <div className="relative">
              {STEPS.map((step, i) => {
                const done = i < activeStep;
                const current = i === activeStep - 1 || (activeStep === 0 && i === 0);
                const upcoming = i >= activeStep;
                return (
                  <div key={i} className="flex gap-5 items-stretch">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-none border-4 transition-all duration-700 ${done || current ? `${step.color} border-transparent shadow-lg` : "bg-gray-50 border-gray-100"}`}
                        style={{ transitionDelay: `${i * 150}ms`, transform: current ? "scale(1.1)" : "scale(1)" }}
                      >
                        {done ? <span className="text-white text-base">✓</span> : <span className={upcoming && !current ? "opacity-30" : ""}>{step.icon}</span>}
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className="w-0.5 flex-grow my-1 rounded-full overflow-hidden bg-gray-100">
                          <div className={`w-full transition-all duration-700 ${step.color}`} style={{ height: done ? "100%" : "0%", transitionDelay: `${i * 150 + 200}ms` }} />
                        </div>
                      )}
                    </div>
                    <div className="pb-8 pt-2 flex-grow">
                      <p className={`font-black text-sm tracking-tight ${done || current ? "text-gray-800" : "text-gray-300"}`}>
                        {step.label}
                        {current && <span className="ml-2 text-[8px] font-black bg-purple-100 text-purple-500 px-2 py-0.5 rounded-full uppercase tracking-widest align-middle">Current</span>}
                      </p>
                      <p className={`text-xs font-medium mt-0.5 ${done || current ? "text-gray-400" : "text-gray-200"}`}>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!isCancelled && (
            <div className="mt-4 bg-purple-50 rounded-2xl p-4 flex items-center gap-3">
              <span className="text-2xl">🚀</span>
              <div>
                <p className="text-xs font-black text-purple-700">Estimated Delivery</p>
                <p className="text-[10px] text-purple-400 font-medium">5–7 working days from order date · {orderDate}</p>
              </div>
            </div>
          )}
        </div>

        {/* ORDER DETAILS */}
        <div className="bg-white rounded-[3rem] border-4 border-white shadow-xl p-8 space-y-6">
          <h2 className="text-lg font-black text-gray-800 uppercase tracking-widest">Order Details</h2>
          <div className="space-y-3">
            {items.length > 0 ? items.map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-3 p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-lg flex-none">🧶</div>
                  <div className="min-w-0">
                    <p className="font-black text-gray-800 text-sm truncate">{item.name}</p>
                    <p className="text-[9px] font-bold text-purple-400 uppercase tracking-widest">
                      {item.selectedColor || "Original"} · Qty {item.qty}{item.note ? ` · "${item.note}"` : ""}
                    </p>
                  </div>
                </div>
                <p className="font-black text-purple-600 text-sm flex-none">₹{item.price * item.qty}</p>
              </div>
            )) : (
              <p className="text-gray-300 text-sm font-medium text-center py-4">No item details available.</p>
            )}
          </div>
          <div className="flex justify-between items-center border-t-2 border-dashed border-purple-50 pt-4">
            <span className="font-black text-gray-800 text-sm uppercase tracking-widest">Total Paid</span>
            <span className="font-black text-purple-700 text-2xl italic">₹{payment?.totalAmount ?? "—"}</span>
          </div>
        </div>

        {/* CUSTOMER + PAYMENT INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-[2.5rem] border-4 border-white shadow-xl p-7 space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Shipping To</h3>
            <InfoRow icon="👤" label="Name"    value={customer.name}    />
            <InfoRow icon="📞" label="Phone"   value={customer.phone}   />
            <InfoRow icon="📧" label="Email"   value={customer.email}   />
            <InfoRow icon="📍" label="Address" value={customer.address} />
          </div>
          <div className="bg-white rounded-[2.5rem] border-4 border-white shadow-xl p-7 space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Info</h3>
            <InfoRow icon="💳" label="Method"       value="UPI"                    />
            <InfoRow icon="🔢" label="UTR / Trans."  value={payment?.transactionId} mono />
            <InfoRow icon="🏦" label="Payer Name"   value={payment?.payerName}     />
            <div className="flex items-center gap-3">
              <span className="text-lg">📊</span>
              <div>
                <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Payment Status</p>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full ${payment?.status === "Paid" ? "bg-green-100 text-green-600" : payment?.status === "Failed" ? "bg-red-100 text-red-500" : "bg-yellow-50 text-yellow-500"}`}>
                  {payment?.status ?? "Pending Verification"} ⏳
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* HELP */}
        <div className="bg-white rounded-[2.5rem] border-4 border-white shadow-xl p-7">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-5">Need Help?</h3>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`https://wa.me/${sellerWhatsApp}?text=${encodeURIComponent(`Hi! I need help with my ShimmerNest order: ${orderId}`)}`}
              target="_blank" rel="noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-2xl border-2 border-green-100 hover:border-green-300 transition-all active:scale-95"
            >
              <span className="text-2xl">💬</span>
              <p className="text-[9px] font-black text-green-600 uppercase tracking-widest text-center">WhatsApp Us</p>
            </a>
            <a href="mailto:support@shimmernest.com"
              className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all active:scale-95"
            >
              <span className="text-2xl">📧</span>
              <p className="text-[9px] font-black text-purple-500 uppercase tracking-widest text-center">Email Support</p>
            </a>
          </div>
          <p className="text-[9px] text-gray-300 font-medium text-center mt-4">
            Always quote your order ID: <span className="text-purple-400 font-black font-mono">{orderId}</span>
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={onContinue}
          className="w-full py-6 rounded-full font-black uppercase tracking-[0.25em] text-[10px] text-white shadow-2xl active:scale-95 transition-all"
          style={{ background: "linear-gradient(135deg, #7c3aed 0%, #be185d 100%)", boxShadow: "0 20px 60px -10px rgba(124,58,237,0.4)" }}
        >
          Continue Shopping ✨
        </button>

        <p className="text-center text-[9px] text-gray-300 font-black uppercase tracking-widest">
          Made with 💜 by ShimmerNest Studio
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-10px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
}

function InfoRow({ icon, label, value, mono = false }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-lg mt-0.5">{icon}</span>
      <div className="min-w-0">
        <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">{label}</p>
        <p className={`text-sm font-bold text-gray-700 break-words ${mono ? "font-mono tracking-widest text-xs" : ""}`}>
          {value ?? "—"}
        </p>
      </div>
    </div>
  );
}