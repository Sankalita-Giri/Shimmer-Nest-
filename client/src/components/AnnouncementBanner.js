import React, { useState, useEffect } from "react";

const MESSAGES = [
  "🚚 Free Shipping on orders above ₹500!",
  "🎁 Free Gift on orders above ₹300!",
  "🧶 100% Handmade with love & shimmer ✨",
  "🎀 New arrivals dropping soon — stay tuned!",
];

export default function AnnouncementBanner() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % MESSAGES.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full z-[60] py-2.5 px-4 text-center relative overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #4f1dbb, #7c3aed, #be185d, #7c3aed, #4f1dbb)",
        backgroundSize: "300% 100%",
        animation: "bannerShimmer 6s linear infinite",
      }}
    >
      {/* scrolling shimmer overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)", animation: "bannerGloss 2s ease-in-out infinite" }}
      />

      <p
        className="text-white text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-400"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(-6px)" }}
      >
        {MESSAGES[current]}
      </p>

      <style>{`
        @keyframes bannerShimmer {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        @keyframes bannerGloss {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}