import React from 'react';

const Hero = ({ dark, HERO_IMAGES, setView }) => {
  return (
    <section className="relative overflow-hidden min-h-[70vh] flex flex-col items-center justify-center px-6 text-center"
      style={{ background: dark ? "linear-gradient(160deg, #1e1027 0%, #2d1b4e 40%, #1a1230 100%)" : "linear-gradient(160deg, #fdf4ff 0%, #fce7f3 40%, #ede9fe 100%)" }}>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000 ${dark ? 'bg-purple-600/20 opacity-80' : 'bg-purple-200/50 opacity-40'}`} />

      {/* 1. Keychain - Large (Top Left) */}
      <div className={`absolute top-[10%] left-[4%] w-36 h-36 md:w-64 md:h-64 rounded-[4rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(124,58,237,0.3)] border-[6px] rotate-[-10deg] animate-float hover:scale-105 transition-transform duration-500 z-0 hidden lg:block ${dark ? 'border-purple-500/30' : 'border-white'}`}>
        <img src={HERO_IMAGES.keychain} alt="" className="w-full h-full object-cover"
          onError={(e) => { e.target.parentElement.style.display = 'none'; }} />
      </div>

      {/* 2. Crochet Plushie - Medium (Bottom Left) */}
      <div className={`absolute bottom-[12%] left-[8%] w-32 h-32 md:w-56 md:h-48 rounded-[3rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(124,58,237,0.2)] border-4 rotate-[15deg] animate-float hover:scale-105 transition-transform duration-500 z-0 hidden xl:block ${dark ? 'border-purple-500/30' : 'border-white'}`} style={{ animationDelay: "2s" }}>
        <img src={HERO_IMAGES.plushie} alt="" className="w-full h-full object-cover"
          onError={(e) => { e.target.parentElement.style.display = 'none'; }} />
      </div>

      {/* 3. Hair Accessories - Large (Top Right) */}
      <div className={`absolute top-[15%] right-[6%] w-32 h-32 md:w-56 md:h-56 rounded-[3.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(219,39,119,0.2)] border-[6px] rotate-[8deg] animate-float hover:scale-105 transition-transform duration-500 z-0 hidden lg:block ${dark ? 'border-pink-500/30' : 'border-white'}`} style={{ animationDelay: "1s" }}>
        <img src={HERO_IMAGES.hair} alt="" className="w-full h-full object-cover"
          onError={(e) => { e.target.parentElement.style.display = 'none'; }} />
      </div>

      {/* 5. Bouquets - Large (Bottom Right) */}
      <div className={`absolute bottom-[5%] right-[5%] w-40 h-40 md:w-60 md:h-60 rounded-[4rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(220,38,38,0.3)] border-[6px] rotate-[-5deg] animate-float hover:scale-105 transition-transform duration-500 z-0 hidden lg:block ${dark ? 'border-red-500/30' : 'border-white'}`} style={{ animationDelay: "1.5s" }}>
        <img src={HERO_IMAGES.bouquet} alt="" className="w-full h-full object-cover"
          onError={(e) => { e.target.parentElement.style.display = 'none'; }} />
      </div>

      <div className="relative z-10 max-w-3xl">
        <div className={`inline-flex items-center gap-2 backdrop-blur-md border px-5 py-2 rounded-full mb-8 shadow-sm ${dark ? 'bg-purple-900/40 border-purple-700/50' : 'bg-white/80 border-purple-100'}`}>
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${dark ? 'text-purple-300' : 'text-purple-600'}`}>Handcrafted in India 🇮🇳</span>
        </div>
        <h1 className={`font-black leading-tight tracking-tighter mb-6 ${dark ? 'text-white drop-shadow-[0_0_30px_rgba(124,58,237,0.3)]' : 'text-gray-900'}`} style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          Crochet <span className="italic" style={{ color: dark ? "#c084fc" : "#7c3aed" }}>Magic</span><span style={{ color: "#db2777" }}>.</span>
        </h1>
        <p className={`font-medium text-sm md:text-base max-w-md mx-auto leading-relaxed mb-10 ${dark ? 'text-purple-200' : 'text-gray-500'}`}>
          Handcrafted crochet treasures, woven with shimmer and care. Explore our collection of 100% handmade magic. ✨
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => { setView('/categories'); window.scrollTo(0, 0); }}
            className="px-10 py-4 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-2xl active:scale-95 transition-all"
            style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)", boxShadow: "0 20px 40px -10px rgba(124,58,237,0.4)" }}>
            Shop Now ✨
          </button>
          <button onClick={() => { document.getElementById('gift-guide-section')?.scrollIntoView({ behavior: 'smooth' }); }}
            className={`px-10 py-4 font-black text-xs uppercase tracking-widest rounded-full shadow-xl border-2 active:scale-95 transition-all ${dark ? 'bg-purple-900/40 text-white border-purple-500/50 hover:bg-purple-800/60 hover:border-purple-400' : 'bg-white text-purple-700 border-purple-100 hover:border-purple-300'}`}>
            Gift Guide 🎁
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {[{ icon: "🧶", text: "100% Handmade" }, { icon: "🚚", text: "Free Ship ₹500+" }, { icon: "🎁", text: "Free Gift ₹300+" }, { icon: "💜", text: "Made to Order" }].map((b, i) => (
            <div key={i} className={`flex items-center gap-2 backdrop-blur-md px-5 py-2.5 rounded-full border ${dark ? 'bg-purple-900/80 border-purple-300 shadow-[0_0_20px_rgba(216,180,254,0.3)] hover:bg-purple-800 transition-colors' : 'bg-white/80 border-purple-50 shadow-lg'}`}>
              <span className="text-base">{b.icon}</span>
              <span className={`text-[10px] font-black uppercase tracking-widest ${dark ? 'text-white drop-shadow-md' : 'text-gray-600'}`}>{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
