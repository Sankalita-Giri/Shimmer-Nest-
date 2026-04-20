import { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { useTheme } from "../context/ThemeContext";

// ── Pricing constants (single source of truth) ────────────
const FREE_SHIPPING_MIN = 500;
const DELIVERY_CHARGE   = 70;
const GIFT_WRAP_CHARGE  = 30;
const FREE_GIFT_MIN     = 300;

export default function OrderForm({ cart, goBack, onOrderSuccess, customer }) {
  const { dark } = useTheme();
  // ── Step: "summary" → "form" → "payment" ─────────────────
  const [step, setStep]           = useState("summary");
  const [loading, setLoading]     = useState(false);
  const [agreed, setAgreed]       = useState(false);
  const [errors, setErrors]       = useState({});
  const [upiCopied, setUpiCopied] = useState(false);

  // Gift wrap (chosen on summary step)
  const [giftWrap, setGiftWrap]       = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

  const [formData, setFormData] = useState({
    name:          customer?.name    || "",
    phone:         customer?.phone   || "",
    email:         customer?.email   || "",
    address:       customer?.address || "",
    transactionId: "",
    payerName:     "",
    securityCode:  "",
  });

  // ── ENV ───────────────────────────────────────────────────
  const upiId        = process.env.REACT_APP_UPI_ID          || "yourname@upi";
  const merchantName = process.env.REACT_APP_MERCHANT_NAME   || "ShimmerNest";
  const apiUrl       = process.env.REACT_APP_API_URL         || "http://localhost:5000";

  // ── Pricing calculations ──────────────────────────────────
  const subtotal       = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  const deliveryCharge = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_MIN ? 0 : DELIVERY_CHARGE;
  const giftWrapCharge = giftWrap ? GIFT_WRAP_CHARGE : 0;
  const grandTotal     = subtotal + deliveryCharge + giftWrapCharge;
  const amountToFreeShipping = FREE_SHIPPING_MIN - subtotal;

  // ── Handlers ──────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const copyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setUpiCopied(true);
    setTimeout(() => setUpiCopied(false), 2000);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email address.";
    if (!formData.phone.match(/^[6-9]\d{9}$/)) newErrors.phone = "Enter a valid 10-digit mobile number.";
    if (formData.address.trim().length < 10) newErrors.address = "Please enter full address + pincode.";
    if (!agreed) newErrors.agreed = "Please accept terms.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormIncomplete = !formData.name || !formData.phone || !formData.email || !formData.address || !agreed;

  const utrValue = formData.transactionId.replace(/\s/g, "");
  const isPaymentIncomplete =
    !formData.payerName.trim() ||
    utrValue.length !== 12 ||
    !/^\d{12}$/.test(utrValue);

  // ── Submit ────────────────────────────────────────────────
  const handleOrderSubmit = async () => {
    if (formData.securityCode) return;

    const utrClean = formData.transactionId.replace(/\s/g, "");
    if (!formData.payerName.trim() || !/^\d{12}$/.test(utrClean)) {
      setErrors((prev) => ({
        ...prev,
        payerName: !formData.payerName.trim() ? "Bank account holder name is required." : "",
        transactionId: !/^\d{12}$/.test(utrClean) ? "Enter a valid 12-digit UTR number." : "",
      }));
      return;
    }
    if (!formData.name.trim() || !formData.email || !formData.phone || !formData.address.trim()) {
      setErrors((prev) => ({ ...prev, submit: "Delivery details are missing. Please go back and fill them in." }));
      return;
    }

    setLoading(true);
    setErrors({});

    const orderId = `SN-${Date.now().toString().slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`;

    // ── STEP 1: Save to DB ───────────────────────────────────
    let savedOrder;
    try {
      const response = await axios.post(`${apiUrl}/api/orders`, {
        orderId,
        customer: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
        },
        items: cart.map((i) => ({
          name: i.name,
          selectedColor: i.selectedColor || "Default",
          qty: Number(i.qty),
          price: Number(i.price),
          note: i.note || "",
        })),
        payment: {
          totalAmount: Number(grandTotal),
          transactionId: utrClean,
          payerName: formData.payerName.trim(),
        },
      });
      savedOrder = response.data;
    } catch (dbError) {
      setErrors({ submit: dbError.response?.data?.error || "Could not save your order. Please try again." });
      setLoading(false);
      return;
    }

    // ── STEP 2: Send customer email via EmailJS ────────────────
    // Sends order confirmation to customer's email
    try {
      const orderDetailsText = cart
        .map((i) => `${i.name} (${i.selectedColor || "Default"})${i.note ? ` — Note: ${i.note}` : ""}`)
        .join("\n");
      const quantityText = cart.map((i) => `x${i.qty}`).join("\n");

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          to_name:        formData.name.trim(),
          to_email:       formData.email.trim(),
          order_id:       orderId,
          order_details:  orderDetailsText,
          quantity:       quantityText,
          amount:         grandTotal,
          address:        formData.address.trim(),
          transaction_id: utrClean,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      console.log("✅ Email sent to customer:", formData.email.trim());
    } catch (emailError) {
      // Email failed — order is saved, we still continue to thank you page
      console.warn("⚠️ EmailJS failed:", emailError?.text || emailError?.message || emailError);
    }

    // ── STEP 3: Go to Thank You page ────────────────────────
    setLoading(false);
    if (onOrderSuccess) {
      onOrderSuccess({
        orderId,
        customer: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
        },
        items: cart.map((i) => ({
          name: i.name,
          selectedColor: i.selectedColor || "Default",
          qty: Number(i.qty),
          price: Number(i.price),
          note: i.note || "",
        })),
        payment: {
          totalAmount: Number(grandTotal),
          transactionId: utrClean,
          payerName: formData.payerName.trim(),
          status: "Pending Verification",
        },
        orderStatus: savedOrder?.order?.orderStatus || "Processing",
        createdAt: savedOrder?.order?.createdAt || new Date().toISOString(),
      });
    }
  };

  // ════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════
  return (
    <div className="animate-fadeIn max-w-2xl mx-auto pb-20 px-4">
      <button onClick={goBack} className="mb-6 text-purple-300 font-black text-[10px] uppercase tracking-widest hover:text-purple-500 transition-colors">
        ← Back
      </button>

      {/* ── STEP 1: ORDER SUMMARY + GIFT WRAP ───────────────── */}
      {step === "summary" && (
        <div className="space-y-6 animate-fadeIn">
          <h3 className={`text-3xl font-black italic tracking-tighter ${dark ? 'text-white' : 'text-gray-800'}`}>
            Order Summary 🛍️
          </h3>

          {/* Items list */}
          <div className={`rounded-[3rem] border-4 shadow-xl p-6 space-y-3 ${dark ? 'bg-gray-900 border-purple-900/40' : 'bg-white border-white'}`}>
            <p className={`text-[9px] font-black uppercase tracking-widest mb-4 ${dark ? 'text-purple-400' : 'text-gray-400'}`}>Your Items</p>
            {cart.map((item, i) => (
              <div key={i} className={`flex items-center justify-between gap-3 p-3 rounded-2xl ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-base flex-none">🧶</div>
                  <div className="min-w-0">
                    <p className={`font-black text-sm truncate ${dark ? 'text-purple-100' : 'text-gray-800'}`}>{item.name}</p>
                    <p className="text-[9px] font-bold text-purple-400 uppercase tracking-widest">
                      {item.selectedColor || "Original"} · x{item.qty}
                      {item.note ? ` · "${item.note}"` : ""}
                    </p>
                  </div>
                </div>
                <p className="font-black text-purple-600 text-sm flex-none">₹{item.price * item.qty}</p>
              </div>
            ))}
          </div>

          {/* Free shipping progress */}
          {subtotal < FREE_SHIPPING_MIN && (
            <div className={`rounded-[2rem] border-4 shadow-lg p-5 ${dark ? 'bg-gray-900 border-purple-900/40' : 'bg-white border-white'}`}>
              <div className="flex justify-between items-center mb-2">
                <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest">
                  {amountToFreeShipping > 0
                    ? `Add ₹${amountToFreeShipping} more for FREE shipping! 🚚`
                    : "FREE shipping unlocked! 🎉"}
                </p>
                <p className={`text-[9px] font-black ${dark ? 'text-purple-400' : 'text-gray-400'}`}>₹{subtotal} / ₹{FREE_SHIPPING_MIN}</p>
              </div>
              <div className="w-full h-2 bg-purple-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min((subtotal / FREE_SHIPPING_MIN) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {subtotal >= FREE_SHIPPING_MIN && (
            <div className="bg-green-50 border-2 border-green-100 rounded-[2rem] p-4 text-center">
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">
                🎉 Free Shipping Unlocked!
                {subtotal >= FREE_GIFT_MIN ? " & 🎁 Free Gift too!" : ""}
              </p>
            </div>
          )}

          {/* Gift wrap toggle */}
          <div className={`rounded-[2.5rem] border-4 p-6 shadow-xl transition-all ${giftWrap ? (dark ? 'border-pink-700 bg-gray-900' : 'border-pink-200 bg-white') : (dark ? 'border-purple-900/40 bg-gray-900' : 'border-white bg-white')}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎀</span>
                <div>
                  <p className={`font-black text-sm ${dark ? 'text-purple-100' : 'text-gray-800'}`}>Add Gift Wrapping</p>
                  <p className={`text-[9px] font-bold uppercase tracking-widest ${dark ? 'text-purple-400' : 'text-gray-400'}`}>
                    Beautiful wrap + ribbon · +₹{GIFT_WRAP_CHARGE}
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setGiftWrap(!giftWrap); if (giftWrap) setGiftMessage(""); }}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${giftWrap ? "bg-pink-400" : "bg-gray-200"}`}
              >
                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all duration-300 ${giftWrap ? "left-7" : "left-0.5"}`} />
              </button>
            </div>
            {giftWrap && (
              <div className="mt-4 animate-fadeIn">
                <textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Write a gift message... 💌 (optional)"
                  rows={2}
                  maxLength={120}
                  className="w-full p-4 bg-pink-50 rounded-2xl border-2 border-pink-100 focus:border-pink-300 outline-none text-sm font-medium resize-none transition-all"
                />
                <p className="text-[9px] text-gray-300 font-medium text-right mt-1">{giftMessage.length}/120</p>
              </div>
            )}
          </div>

          {/* Charges breakdown */}
          <div className="bg-purple-900 rounded-[3rem] border-[8px] border-white shadow-2xl p-8">
            <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-5 text-center">
              Price Breakdown
            </p>
            <div className="space-y-3 mb-5 pb-5 border-b border-purple-700">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black text-purple-300 uppercase tracking-wider">Items Subtotal</span>
                <span className="text-white font-black">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black text-purple-300 uppercase tracking-wider">
                  Delivery {deliveryCharge === 0 ? "🎉" : ""}
                </span>
                {deliveryCharge === 0
                  ? <span className="text-green-400 font-black">FREE</span>
                  : (
                    <div className="text-right">
                      <span className="text-white font-black">₹{deliveryCharge}</span>
                      <p className="text-[8px] text-purple-400 font-bold">
                        Add ₹{amountToFreeShipping} for free delivery
                      </p>
                    </div>
                  )
                }
              </div>
              {giftWrap && (
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black text-purple-300 uppercase tracking-wider">🎀 Gift Wrap</span>
                  <span className="text-pink-300 font-black">₹{GIFT_WRAP_CHARGE}</span>
                </div>
              )}
              {subtotal >= FREE_GIFT_MIN && (
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black text-purple-300 uppercase tracking-wider">🎁 Free Gift</span>
                  <span className="text-green-400 font-black">Included!</span>
                </div>
              )}
            </div>
            <div className="text-center mb-6">
              <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1">Grand Total</p>
              <p className="text-6xl font-black text-white italic">₹{grandTotal}</p>
            </div>
            <button
              onClick={() => setStep("form")}
              className="w-full py-5 bg-white text-purple-900 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-purple-50 transition-colors active:scale-95"
            >
              Continue — Fill Delivery Details →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: DELIVERY DETAILS ─────────────────────────── */}
      {step === "form" && (
        <div className="space-y-6 animate-fadeIn">

          {/* Mini summary reminder */}
          <div className={`rounded-2xl p-4 flex justify-between items-center border ${dark ? 'bg-purple-950/50 border-purple-800/40' : 'bg-purple-50 border-purple-100'}`}>
            <div>
              <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest">Order Total</p>
              <p className={`text-2xl font-black italic ${dark ? 'text-purple-300' : 'text-purple-700'}`}>₹{grandTotal}</p>
            </div>
            <button onClick={() => setStep("summary")} className="text-[9px] font-black text-purple-400 uppercase tracking-widest hover:text-purple-600">
              ← Edit Order
            </button>
          </div>

          <div className={`p-8 rounded-[3rem] shadow-2xl border-4 space-y-5 ${dark ? 'bg-gray-900 border-purple-900/40' : 'bg-white border-white'}`}>
            <h3 className={`text-2xl font-black italic ${dark ? 'text-white' : 'text-gray-800'}`}>Delivery Info 🎀</h3>

            {/* Honeypot */}
            <input type="text" name="securityCode" value={formData.securityCode} onChange={handleChange} className="hidden" tabIndex="-1" autoComplete="off" />

            <div className="grid gap-3">
              <div>
                <input name="name" placeholder="Your Full Name" value={formData.name} onChange={handleChange}
                  className={`w-full p-4 rounded-2xl border-2 outline-none text-sm font-medium transition-colors ${
                    errors.name
                      ? 'border-red-300 bg-red-950/30 text-red-300'
                      : dark ? 'bg-gray-800 border-gray-700 text-purple-100 placeholder-purple-700 focus:border-purple-500' : 'bg-gray-50 border-transparent text-gray-800 focus:border-purple-200'
                  }`} />
                {errors.name && <p className="text-red-400 text-[10px] font-bold mt-1 px-2">{errors.name}</p>}
              </div>
              <div>
                <input name="email" type="email" placeholder="Email (for order receipt)" value={formData.email} onChange={handleChange}
                  className={`w-full p-4 rounded-2xl border-2 outline-none text-sm font-medium transition-colors ${
                    errors.email
                      ? 'border-red-300 bg-red-950/30 text-red-300'
                      : dark ? 'bg-gray-800 border-gray-700 text-purple-100 placeholder-purple-700 focus:border-purple-500' : 'bg-gray-50 border-transparent text-gray-800 focus:border-purple-200'
                  }`} />
                {errors.email && <p className="text-red-400 text-[10px] font-bold mt-1 px-2">{errors.email}</p>}
              </div>
              <div>
                <input name="phone" placeholder="WhatsApp Number (10 digits)" value={formData.phone} onChange={handleChange} maxLength={10} inputMode="numeric"
                  className={`w-full p-4 rounded-2xl border-2 outline-none text-sm font-medium transition-colors ${
                    errors.phone
                      ? 'border-red-300 bg-red-950/30 text-red-300'
                      : dark ? 'bg-gray-800 border-gray-700 text-purple-100 placeholder-purple-700 focus:border-purple-500' : 'bg-gray-50 border-transparent text-gray-800 focus:border-purple-200'
                  }`} />
                {errors.phone && <p className="text-red-400 text-[10px] font-bold mt-1 px-2">{errors.phone}</p>}
              </div>
              <div>
                <textarea name="address" placeholder="Full Delivery Address + Pincode" rows="3" value={formData.address} onChange={handleChange}
                  className={`w-full p-4 rounded-2xl border-2 outline-none text-sm font-medium resize-none transition-colors ${
                    errors.address
                      ? 'border-red-300 bg-red-950/30 text-red-300'
                      : dark ? 'bg-gray-800 border-gray-700 text-purple-100 placeholder-purple-700 focus:border-purple-500' : 'bg-gray-50 border-transparent text-gray-800 focus:border-purple-200'
                  }`} />
                {errors.address && <p className="text-red-400 text-[10px] font-bold mt-1 px-2">{errors.address}</p>}
              </div>
            </div>

            <div className={`flex items-start space-x-3 p-4 rounded-2xl border transition-all ${
              errors.agreed
                ? 'bg-red-950/30 border-red-700'
                : dark ? 'bg-purple-950/40 border-purple-800/40' : 'bg-purple-50 border-purple-50'
            }`}>
              <input type="checkbox" id="agreed" checked={agreed} onChange={() => setAgreed(!agreed)} className="mt-1 w-5 h-5 accent-purple-600" />
              <label htmlFor="agreed" className={`text-[9px] font-bold uppercase leading-relaxed ${dark ? 'text-purple-300' : 'text-gray-500'}`}>
                I understand handmade items take 5–7 working days and all sales are final (non-refundable). 💜
              </label>
            </div>
            {errors.agreed && <p className="text-red-400 text-[10px] font-bold px-2">{errors.agreed}</p>}
          </div>

          <button
            onClick={() => { if (validateForm()) setStep("payment"); }}
            disabled={isFormIncomplete}
            className={`w-full py-6 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-all ${isFormIncomplete ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-purple-600 text-white hover:bg-purple-700 active:scale-95"}`}
          >
            Continue to Payment • ₹{grandTotal}
          </button>
        </div>
      )}

      {/* ── STEP 3: PAYMENT ──────────────────────────────────── */}
      {step === "payment" && (
        <div className={`p-8 rounded-[4rem] shadow-2xl border-4 text-center space-y-8 animate-fadeIn ${dark ? 'bg-gray-900 border-purple-900/40' : 'bg-white border-white'}`}>
          <h3 className={`text-2xl font-black italic ${dark ? 'text-white' : 'text-gray-800'}`}>Complete Payment ✨</h3>

          {/* Amount display with breakdown */}
          <div className="bg-gray-900 text-white py-10 px-8 rounded-[3.5rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
            <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-4 text-center">Order Summary</p>
            <div className="space-y-2 mb-5 pb-5 border-b border-white/10 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-300 font-bold text-[11px] uppercase tracking-wider">Items Subtotal</span>
                <span className="font-black">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300 font-bold text-[11px] uppercase tracking-wider">Delivery</span>
                {deliveryCharge === 0
                  ? <span className="text-green-400 font-black text-[11px]">FREE 🎉</span>
                  : <span className="font-black">₹{deliveryCharge}</span>
                }
              </div>
              {giftWrap && (
                <div className="flex justify-between">
                  <span className="text-purple-300 font-bold text-[11px] uppercase tracking-wider">🎀 Gift Wrap</span>
                  <span className="text-pink-300 font-black">₹{giftWrapCharge}</span>
                </div>
              )}
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1 text-center">Total to Pay</p>
            <p className="text-6xl font-black italic tracking-tighter text-center">₹{grandTotal}</p>
            <p className="text-[10px] font-bold text-purple-400 tracking-widest mt-3 uppercase text-center">Pay to: {merchantName}</p>
          </div>

          {/* UPI options */}
          <div className="space-y-4">
            <div className={`p-6 rounded-3xl border-2 border-dashed flex items-center justify-between ${dark ? 'bg-purple-950/40 border-purple-800/40' : 'bg-purple-50 border-purple-100'}`}>
              <div className="text-left">
                <p className="text-[8px] font-black text-purple-300 uppercase tracking-widest">UPI ID</p>
                <p className={`text-sm font-mono font-black ${dark ? 'text-purple-200' : 'text-purple-900'}`}>{upiId}</p>
              </div>
              <button onClick={copyUpi} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all active:scale-95 ${upiCopied ? "bg-green-500" : "bg-purple-600"} text-white`}>
                {upiCopied ? "Copied! ✓" : "Copy ID"}
              </button>
            </div>
            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Or open your UPI app directly</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "GPay",    emoji: "🟢", color: "border-green-100 hover:border-green-300",   url: `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${grandTotal}&cu=INR` },
                { name: "PhonePe", emoji: "🟣", color: "border-purple-100 hover:border-purple-300", url: `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${grandTotal}&cu=INR` },
                { name: "Paytm",   emoji: "🔵", color: "border-blue-100 hover:border-blue-300",     url: `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${grandTotal}&cu=INR` },
              ].map((app) => (
                <a key={app.name} href={app.url} className={`p-4 rounded-2xl border-2 ${app.color} hover:shadow-lg transition-all flex flex-col items-center gap-1 active:scale-95 ${dark ? 'bg-gray-800' : 'bg-white'}`}>
                  <span className="text-xl">{app.emoji}</span>
                  <span className={`text-[9px] font-black uppercase tracking-wide ${dark ? 'text-purple-300' : 'text-gray-500'}`}>{app.name}</span>
                </a>
              ))}
            </div>
            <p className="text-[9px] font-medium text-gray-300 italic">💡 On desktop? Copy the UPI ID and pay from your phone app.</p>
          </div>

          {/* Payment confirmation fields */}
          <div className="space-y-4 text-left">
            <div>
              <input name="payerName" placeholder="Bank Account Holder Name (as shown in UPI app)" value={formData.payerName} onChange={handleChange}
                className={`w-full p-4 rounded-2xl border-2 outline-none text-sm font-bold transition-colors ${
                  errors.payerName
                    ? 'border-red-300 bg-red-950/30 text-red-300'
                    : dark ? 'bg-gray-800 border-gray-700 text-purple-100 placeholder-purple-700 focus:border-purple-500' : 'bg-gray-50 border-transparent focus:border-purple-100'
                }`} />
              {errors.payerName && <p className="text-red-400 text-[10px] font-bold mt-1 px-2">{errors.payerName}</p>}
            </div>
            <div>
              <input name="transactionId" placeholder="12-Digit UTR / Transaction ID" maxLength="12" inputMode="numeric" value={formData.transactionId} onChange={handleChange}
                className={`w-full p-5 rounded-2xl border-4 text-center font-mono text-2xl tracking-widest outline-none transition-all ${
                  errors.transactionId
                    ? 'border-red-300 bg-red-950/30 text-red-300'
                    : dark ? 'bg-gray-800 border-gray-700 text-purple-100 focus:border-purple-500' : 'bg-gray-50 border-purple-50 focus:border-purple-600'
                }`} />
              {errors.transactionId && <p className="text-red-400 text-[10px] font-bold text-center mt-1">{errors.transactionId}</p>}
              <div className="flex justify-between items-center mt-2 px-1">
                <p className="text-[9px] text-gray-300 font-medium">Find UTR: UPI app → Transaction History → Details</p>
                <p className={`text-[9px] font-black tabular-nums ${utrValue.length === 12 ? "text-green-500" : utrValue.length > 0 ? "text-orange-400" : "text-gray-200"}`}>
                  {utrValue.length}/12 {utrValue.length === 12 ? "✓" : ""}
                </p>
              </div>
            </div>
          </div>

          {errors.submit && (
            <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-4">
              <p className="text-red-500 text-xs font-bold text-center">⚠️ {errors.submit}</p>
            </div>
          )}

          <button
            onClick={handleOrderSubmit}
            disabled={loading || isPaymentIncomplete}
            className={`w-full py-6 rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl transition-all active:scale-95 ${
              loading || isPaymentIncomplete
                ? "bg-gray-100 text-gray-300 cursor-not-allowed shadow-none"
                : "bg-green-500 text-white hover:bg-green-600 shadow-green-100"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
                Processing Order...
              </span>
            ) : isPaymentIncomplete ? (
              "Fill All Payment Details to Continue"
            ) : (
              "Confirm Payment & Place Order ✅"
            )}
          </button>

          {isPaymentIncomplete && !loading && (
            <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest text-center -mt-4">
              {!formData.payerName.trim() && !utrValue
                ? "⚠️ Enter your bank account name and 12-digit UTR to proceed"
                : !formData.payerName.trim()
                ? "⚠️ Enter your bank account holder name"
                : utrValue.length > 0 && utrValue.length < 12
                ? `⚠️ UTR must be 12 digits — you've entered ${utrValue.length}`
                : "⚠️ Enter the 12-digit UTR / Transaction ID"}
            </p>
          )}

          <button onClick={() => setStep("form")} className="text-gray-300 font-black text-[9px] uppercase tracking-widest block w-full hover:text-purple-400 transition-colors">
            ← Edit Delivery Info
          </button>
        </div>
      )}
    </div>
  );
}