import React, { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { QRCodeSVG } from "qrcode.react";

export default function OrderForm({ cart, total, goBack }) {
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    transactionId: "",
    payerName: "",
  });

  // --- ENV VARIABLES ---
  const upiId = process.env.REACT_APP_UPI_ID || "";
  const merchantName = process.env.REACT_APP_MERCHANT_NAME || "ShimmerNest";
  const sellerWhatsApp = process.env.REACT_APP_SELLER_PHONE || "";

  const upiPayload = upiId
    ? `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${total}&cu=INR&tn=Order_ShimmerNest`
    : "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const copyUpi = () => {
    if (!upiId) return alert("UPI ID not configured yet.");
    navigator.clipboard.writeText(upiId);
    alert("UPI ID copied! Paste it in your payment app. ✨");
  };

  // --- VALIDATION ---
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter a valid email address.";
    if (!formData.phone.match(/^[6-9]\d{9}$/))
      newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!formData.address.trim() || formData.address.trim().length < 10)
      newErrors.address = "Please enter your full address with pincode.";
    if (!agreed) newErrors.agreed = "Please accept the terms to continue.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormIncomplete =
    !formData.name || !formData.phone || !formData.email || !formData.address || !agreed;

  const handleOrderSubmit = async () => {
    const utrClean = formData.transactionId.replace(/\s/g, "");
    if (!/^\d{12}$/.test(utrClean)) {
      setErrors((prev) => ({
        ...prev,
        transactionId: "Please enter a valid 12-digit UTR/Transaction ID.",
      }));
      return;
    }

    setLoading(true);
    const orderId = `SN-${Math.floor(1000 + Math.random() * 9000)}`;
    const itemSummary = cart
      .map((i) => `• ${i.name} (${i.selectedColor || "Default"}) x${i.qty}`)
      .join("\n");

    try {
      // 1. SAVE TO DATABASE
      if (process.env.REACT_APP_API_URL) {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, {
          orderId,
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          },
          items: cart.map((i) => ({
            name: i.name,
            color: i.selectedColor || "Default",
            qty: i.qty,
            price: i.price,
          })),
          payment: {
            totalAmount: total,
            transactionId: utrClean,
            payerName: formData.payerName || "Self",
          },
        });
      }

      // 2. EMAILJS RECEIPT
      if (
        process.env.REACT_APP_EMAILJS_SERVICE_ID &&
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID &&
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      ) {
        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          {
            order_id: orderId,
            to_name: formData.name,
            to_email: formData.email,
            order_details: itemSummary,
            amount: total,
            transaction_id: utrClean,
          },
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        );
      }

      // 3. WHATSAPP REDIRECT
      const whatsappMsg = window.encodeURIComponent(
        `✨ *NEW ORDER: ${orderId}*\n\n` +
        `📦 *Items:*\n${itemSummary}\n\n` +
        `💰 *Total:* ₹${total}\n` +
        `🔢 *UTR:* ${utrClean}\n` +
        `👤 *Payer:* ${formData.payerName || "Same"}\n\n` +
        `👤 *Customer:* ${formData.name}\n` +
        `📞 *Phone:* ${formData.phone}\n` +
        `📍 *Address:* ${formData.address}`
      );

      setOrderSuccess(true);
      if (sellerWhatsApp) {
        window.open(`https://wa.me/${sellerWhatsApp}?text=${whatsappMsg}`, "_blank");
      }

    } catch (error) {
      console.error(error);
      setErrors((prev) => ({
        ...prev,
        submit: "Something went wrong. Please check your connection and try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  // --- SUCCESS SCREEN ---
  if (orderSuccess) {
    return (
      <div className="animate-fadeIn max-w-2xl mx-auto pb-20 text-center pt-20">
        <div className="text-8xl mb-6">🎉</div>
        <h2 className="text-3xl font-black text-gray-800 tracking-tighter mb-4">
          Order Placed! 💜
        </h2>
        <p className="text-gray-400 text-sm font-medium mb-2">
          We've received your order and you'll get a confirmation on WhatsApp soon.
        </p>
        <p className="text-gray-400 text-sm font-medium mb-10">
          Check your email for your invoice. 📧
        </p>
        <button
          onClick={goBack}
          className="px-10 py-4 bg-purple-600 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-purple-700 transition-colors shadow-lg"
        >
          Back to Shop ✨
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn max-w-2xl mx-auto pb-20">
      <button
        onClick={goBack}
        className="mb-8 text-purple-300 font-black text-[10px] uppercase tracking-widest flex items-center hover:text-purple-500 transition-colors"
      >
        ← Back to Basket
      </button>

      {step === "form" ? (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[3.5rem] shadow-2xl border-4 border-white space-y-6">
            <h3 className="text-2xl font-black text-gray-800 italic">Delivery Details 🎀</h3>

            <div className="grid gap-4">
              {/* Name */}
              <div>
                <input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-4 bg-gray-50 rounded-2xl border-2 outline-none text-sm font-medium transition-colors ${
                    errors.name ? "border-red-300 bg-red-50" : "border-transparent focus:border-purple-200"
                  }`}
                />
                {errors.name && <p className="text-red-400 text-[10px] font-bold mt-1 ml-2">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Gmail for Invoice"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-4 bg-gray-50 rounded-2xl border-2 outline-none text-sm font-medium transition-colors ${
                    errors.email ? "border-red-300 bg-red-50" : "border-transparent focus:border-purple-200"
                  }`}
                />
                {errors.email && <p className="text-red-400 text-[10px] font-bold mt-1 ml-2">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <input
                  name="phone"
                  placeholder="WhatsApp Number (10 digits)"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  className={`w-full p-4 bg-gray-50 rounded-2xl border-2 outline-none text-sm font-medium transition-colors ${
                    errors.phone ? "border-red-300 bg-red-50" : "border-transparent focus:border-purple-200"
                  }`}
                />
                {errors.phone && <p className="text-red-400 text-[10px] font-bold mt-1 ml-2">{errors.phone}</p>}
              </div>

              {/* Address */}
              <div>
                <textarea
                  name="address"
                  placeholder="Full Shipping Address with Pincode"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-4 bg-gray-50 rounded-2xl border-2 outline-none text-sm font-medium resize-none transition-colors ${
                    errors.address ? "border-red-300 bg-red-50" : "border-transparent focus:border-purple-200"
                  }`}
                />
                {errors.address && <p className="text-red-400 text-[10px] font-bold mt-1 ml-2">{errors.address}</p>}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className={`flex items-start space-x-3 p-4 rounded-2xl border ${
              errors.agreed ? "bg-red-50 border-red-200" : "bg-purple-50 border-purple-100"
            }`}>
              <input
                type="checkbox"
                id="agreed"
                checked={agreed}
                onChange={() => {
                  setAgreed(!agreed);
                  setErrors((prev) => ({ ...prev, agreed: "" }));
                }}
                className="mt-1 w-5 h-5 accent-purple-600 cursor-pointer"
              />
              <label htmlFor="agreed" className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed">
                Handmade takes <span className="text-purple-600">3-5 days</span>. I accept the No Refund policy. 💜
              </label>
            </div>
            {errors.agreed && <p className="text-red-400 text-[10px] font-bold ml-2">{errors.agreed}</p>}
          </div>

          <button
            onClick={() => { if (validateForm()) setStep("payment"); }}
            disabled={isFormIncomplete}
            className={`w-full py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl transition-all ${
              isFormIncomplete
                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700 active:scale-95"
            }`}
          >
            Go to Payment ₹{total}
          </button>
        </div>

      ) : (
        <div className="bg-white p-8 rounded-[4rem] shadow-2xl border-4 border-white text-center space-y-8">
          <h3 className="text-2xl font-black text-gray-800 italic">Scan & Pay ✨</h3>

          {/* QR Code */}
          <div className="relative inline-block p-6 bg-white border-[12px] border-purple-50 rounded-[3.5rem] shadow-xl">
            {upiPayload ? (
              <QRCodeSVG value={upiPayload} size={200} fgColor="#6b21a8" level="H" includeMargin={true} />
            ) : (
              <p className="text-gray-400 text-sm font-medium w-[200px] h-[200px] flex items-center justify-center">
                UPI not configured
              </p>
            )}
            <div className="absolute -top-4 -right-4 bg-pink-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-white animate-bounce">
              SCAN ME
            </div>
          </div>

          {/* UPI ID Copy */}
          <div className="max-w-xs mx-auto space-y-4">
            <div className="bg-purple-50 p-4 rounded-2xl border-2 border-dashed border-purple-200 flex items-center justify-between">
              <div className="text-left">
                <p className="text-[8px] font-black text-purple-300 uppercase">UPI ID</p>
                <p className="text-xs font-mono font-bold text-purple-900">{upiId || "Not set"}</p>
              </div>
              <button
                onClick={copyUpi}
                className="bg-purple-600 text-white p-2 px-4 rounded-xl text-[10px] font-black uppercase hover:bg-purple-700 transition-colors"
              >
                Copy
              </button>
            </div>

            <div className="bg-gray-900 text-white py-6 rounded-[2.5rem]">
              <p className="text-[9px] font-bold uppercase tracking-widest opacity-50">Amount to Pay</p>
              <p className="text-5xl font-black italic tracking-tighter">₹{total}</p>
            </div>
          </div>

          {/* UTR Fields */}
          <div className="space-y-4 text-left pt-4">
            <div>
              <label className="text-[10px] font-black text-purple-400 uppercase tracking-widest ml-4">
                Account Holder Name (If different)
              </label>
              <input
                name="payerName"
                placeholder="Name on Bank Account"
                value={formData.payerName}
                onChange={handleChange}
                className="w-full p-4 mt-1 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-purple-200 outline-none text-sm font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-purple-400 uppercase tracking-widest ml-4">
                12-Digit Transaction UTR
              </label>
              <input
                name="transactionId"
                placeholder="123456789012"
                maxLength="12"
                value={formData.transactionId}
                onChange={handleChange}
                className={`w-full p-5 mt-1 bg-gray-50 rounded-2xl border-4 text-center font-mono text-2xl tracking-[0.2em] outline-none transition-colors text-purple-900 ${
                  errors.transactionId ? "border-red-300 bg-red-50" : "border-purple-100 focus:border-purple-400"
                }`}
              />
              {errors.transactionId && (
                <p className="text-red-400 text-[10px] font-bold mt-1 ml-2">{errors.transactionId}</p>
              )}
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-500 text-xs font-bold p-4 rounded-2xl">
              {errors.submit}
            </div>
          )}

          <button
            onClick={handleOrderSubmit}
            disabled={loading}
            className="w-full py-6 bg-green-600 text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-xl hover:bg-green-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Confirming Magic... 🧶" : "I have Paid ✅"}
          </button>

          <button
            onClick={() => setStep("form")}
            className="text-purple-300 font-black text-[10px] uppercase tracking-widest hover:text-purple-500 transition-colors"
          >
            ← Edit Details
          </button>
        </div>
      )}
    </div>
  );
}