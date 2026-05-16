import React from 'react';
import { useTheme } from '../context/ThemeContext';
import SkeletonCard from './SkeletonCard';
import { useSiteConfig } from '../context/SiteConfigContext';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const KEYCHAIN_IMAGES = [
  "/images/Keychains/luffy_hat.jpg",
  "/images/Keychains/daisy3.jpg",
  "/images/Keychains/couple1.jpg",
  "/images/Keychains/pawkeychain1.jpg"
];
const PLUSHIES_IMAGES = [
  "/images/Plushies/Bunny_withpinkstrawberry.jpg",
  "/images/Plushies/bearwith_pinkoutfit.jpg",
  "/images/Plushies/Cat_withstrawberryslingbag.jpg",
  "/images/Plushies/cow_withpeachoutfit.jpg"
];

const DEFAULT_CATEGORIES = [
  { id: "keychains", name: "Crochet Keychains", icon: "🔑", gradient: "from-violet-100 to-blue-50", accent: "#7c3aed", desc: "Cute companions for your keys & bags", images: KEYCHAIN_IMAGES },
  { id: "plushies", name: "Crochet Plushies", icon: "🧸", gradient: "from-yellow-50 to-orange-50", accent: "#f59e0b", desc: "Tiny huggable handmade friends", images: PLUSHIES_IMAGES },
  { id: "hair", name: "Hair Accessories", icon: "🎀", gradient: "from-rose-100 to-pink-50", accent: "#db2777", desc: "Floral clips, scrunchies & bandanas", images: [] },
  { id: "bouquets", name: "Crochet Bouquets", icon: "💐", gradient: "from-red-50 to-orange-50", accent: "#dc2626", desc: "Flowers that never fade", images: [] },
];

export default function Home({ setView, setActiveCat, setSelectedProduct, products, loading }) {
  const { dark } = useTheme();
  const { siteConfig } = useSiteConfig();

  if (!siteConfig) return <div className="min-h-screen bg-[#FCF8FF]" />;

  const HERO_IMAGES = siteConfig.hero;
  const HOME_CATEGORIES = siteConfig.categories.map(c => ({
    ...c,
    gradient: c.id === 'keychains' ? "from-violet-100 to-blue-50" :
      c.id === 'plushies' ? "from-yellow-50 to-orange-50" :
        c.id === 'hair' ? "from-rose-100 to-pink-50" : "from-red-50 to-orange-50"
  }));

  const newArrivals = products ? products.filter(p => p.tag && p.tag.toLowerCase() === "new") : [];
  const MARQUEE = ["✨ Handmade with Love", "🎀 Free Gift above ₹300", "🚚 Free Shipping above ₹500", "🧶 100% Crochet", "💜 Made to Order", "🌸 ShimmerNest Studio", "✨ Handmade with Love", "🎀 Free Gift above ₹300", "🚚 Free Shipping above ₹500", "🧶 100% Crochet"];

  return (
    <div className="animate-fadeIn -mx-6">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[70vh] flex flex-col items-center justify-center px-6 text-center"
        style={{ background: dark ? "linear-gradient(160deg, #1e1027 0%, #2d1b4e 40%, #1a1230 100%)" : "linear-gradient(160deg, #fdf4ff 0%, #fce7f3 40%, #ede9fe 100%)" }}>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000 ${dark ? 'bg-purple-600/20 opacity-80' : 'bg-purple-200/50 opacity-40'}`} />

        {/* Floating images - All 4 categories represented in a balanced gallery layout */}

        {/* Floating images - Enhanced "Bigger & Beautiful" Gallery Layout */}

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

        {/* 5. Bouquets - Large (Bottom Right) - Replaced Purse with Bouquet */}
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

      {/* ── MARQUEE ───────────────────────────────────────────── */}
      <div className={`overflow-hidden py-4 border-y backdrop-blur-md ${dark ? 'border-purple-700/50 bg-purple-900/50 shadow-[0_0_20px_rgba(124,58,237,0.2)]' : 'border-purple-100 bg-white/60'}`}>
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {MARQUEE.map((text, i) => (
            <span key={i} className={`text-[11px] font-black uppercase tracking-[0.3em] flex-none ${dark ? 'text-white drop-shadow-md' : 'text-purple-500'}`}>{text}</span>
          ))}
        </div>
        <style>{`
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .animate-marquee { animation: marquee 20s linear infinite; }
        `}</style>
      </div>

      <div className="px-6">

        {/* ── NEW ARRIVALS — right after hero ───────────────────── */}
        {newArrivals.length > 0 && (
          <section className="py-14">
            <div className="flex justify-between items-end mb-10">
              <div>
                <p className="text-[9px] font-black text-pink-400 uppercase tracking-[0.4em] mb-2">Just Dropped</p>
                <h2 className={`text-4xl font-black tracking-tighter ${dark ? 'text-white' : 'text-gray-900'}`}>New Arrivals 🌸</h2>
              </div>
              <button onClick={() => { setView('/categories'); window.scrollTo(0, 0); }}
                className="text-[9px] font-black text-purple-500 uppercase tracking-widest hover:text-purple-700 transition-colors border-b-2 border-purple-200 pb-0.5">
                View All →
              </button>
            </div>
            {/* Sliding Container for New Arrivals */}
            <div className="relative group/slider">
              <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
                {loading ? (
                  [1, 2, 3, 4].map(i => (
                    <div key={i} className="flex-none w-[200px] md:w-[250px]">
                      <SkeletonCard dark={dark} />
                    </div>
                  ))
                ) : newArrivals.map((prod) => (
                  <div key={prod.id}
                    onClick={() => { setSelectedProduct(prod); window.scrollTo(0, 0); }}
                    className="flex-none w-[200px] md:w-[250px] snap-start group cursor-pointer"
                  >
                    <div className="relative aspect-square rounded-[3rem] overflow-hidden border-4 border-white shadow-xl group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-500">
                      <img src={prod.image} alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=NEW'; }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <p className="text-white font-black text-sm uppercase tracking-widest">₹{prod.price} →</p>
                      </div>
                      <div className="absolute top-4 left-4 bg-pink-500 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">New ✨</div>
                    </div>
                    <div className="mt-4 px-2 text-center">
                      <h4 className={`font-black text-base truncate ${dark ? 'text-purple-100' : 'text-gray-800'}`}>{prod.name}</h4>
                      <p className="text-purple-500 font-black italic text-sm">₹{prod.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hint for scrolling */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 opacity-0 group-hover/slider:opacity-100 transition-opacity pointer-events-none">
                <div className="w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-purple-600 font-black">→</div>
              </div>
            </div>

            <style>{`
              .scrollbar-hide::-webkit-scrollbar { display: none; }
              .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
          </section>
        )}

        {/* ── SHOP CATEGORIES — square grid cards ─────────────── */}
        <section className="py-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[9px] font-black text-purple-400 uppercase tracking-[0.4em] mb-2">Browse by Type</p>
              <h2 className={`text-5xl md:text-6xl font-black tracking-tighter ${dark ? 'text-white' : 'text-gray-900'}`}>Shop Categories</h2>
            </div>
            <button onClick={() => { setView('/categories'); window.scrollTo(0, 0); }}
              className="text-[9px] font-black text-purple-500 uppercase tracking-widest hover:text-purple-700 transition-colors border-b-2 border-purple-200 pb-0.5">
              View All →
            </button>
          </div>

          {/* Row 1: 2 wide cards */}
          <div className="grid grid-cols-2 gap-5 mb-5">
            {HOME_CATEGORIES.slice(0, 2).map((cat) => {
              let imgs = [];
              const validImages = (cat.images || []).filter(img => img !== "");
              if (validImages.length === 4) {
                imgs = validImages.map(img => ({ image: img }));
              } else {
                imgs = products.filter(p => p.category === cat.id).slice(0, 3);
              }
              const count = products.filter(p => p.category === cat.id).length;
              return (
                <div key={cat.id}
                  onClick={() => { setView(`/category/${cat.id}`); window.scrollTo(0, 0); }}
                  className={`h-full flex flex-col rounded-[3rem] border-4 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden relative p-7 ${dark ? 'bg-gradient-to-br from-purple-950/80 to-gray-900/80 border-purple-800/50' : `bg-gradient-to-br ${cat.gradient} border-white`}`}
                  style={{ minHeight: "260px" }}
                >
                  <div className="absolute -right-6 -bottom-6 text-[9rem] opacity-[0.06] select-none pointer-events-none leading-none">{cat.icon}</div>
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="text-4xl mb-3">{cat.icon}</div>
                      <h3 className={`font-black text-xl tracking-tighter ${dark ? 'text-white' : 'text-gray-900'}`}>{cat.name}</h3>
                      <p className={`text-[9px] font-medium mt-1 ${dark ? 'text-purple-300' : 'text-gray-500'}`}>{cat.desc}</p>
                    </div>
                    {count > 0 && (
                      <span className={`text-[9px] font-black px-3 py-1 rounded-full flex-none mt-1 ${dark ? 'text-purple-300 bg-purple-900/60' : 'text-gray-400 bg-white/70'}`}>
                        {count} items
                      </span>
                    )}
                  </div>
                  <div className={`grid ${imgs.length === 4 ? 'grid-cols-4' : 'grid-cols-3'} gap-2.5 mb-5`}>
                    {imgs.length > 0 ? imgs.map((p, j) => (
                      <div key={j} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white/50">
                        {/* Fallback beautiful box */}
                        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm text-3xl opacity-100 z-0">
                          {cat.icon}
                        </div>
                        {p.image && (
                          <img src={p.image} alt={p.name}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 z-10"
                            onError={(e) => {
                              e.target.style.opacity = '0';
                              e.target.nextSibling.style.display = 'flex';
                            }} />
                        )}
                        <div className="absolute inset-0 hidden items-center justify-center bg-purple-50/50 text-4xl opacity-40 z-0">
                          {cat.icon}
                        </div>
                      </div>
                    )) : [1, 2, 3].map(j => (
                      <div key={j} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white/50">
                        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm text-3xl text-opacity-50">
                          {cat.icon}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[9px] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform" style={{ color: cat.accent }}>
                      Explore Collection →
                    </span>
                    {count > 0 && (
                      <span className="text-[9px] font-black" style={{ color: cat.accent }}>
                        From ₹{Math.min(...products.filter(p => p.category === cat.id).map(p => p.price))}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Row 2: 2 wide cards */}
          <div className="grid grid-cols-2 gap-5 mb-5">
            {HOME_CATEGORIES.slice(2, 4).map((cat) => {
              let imgs = [];
              const validImages = (cat.images || []).filter(img => img !== "");
              if (validImages.length === 4) {
                imgs = validImages.map(img => ({ image: img }));
              } else {
                imgs = products.filter(p => p.category === cat.id).slice(0, 3);
              }
              const count = products.filter(p => p.category === cat.id).length;
              return (
                <div key={cat.id}
                  onClick={() => { setView(`/category/${cat.id}`); window.scrollTo(0, 0); }}
                  className={`h-full flex flex-col rounded-[3rem] border-4 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden relative p-7 ${dark ? 'bg-gradient-to-br from-purple-950/80 to-gray-900/80 border-purple-800/50' : `bg-gradient-to-br ${cat.gradient} border-white`}`}
                  style={{ minHeight: "260px" }}
                >
                  <div className="absolute -right-6 -bottom-6 text-[9rem] opacity-[0.06] select-none pointer-events-none leading-none">{cat.icon}</div>
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="text-4xl mb-3">{cat.icon}</div>
                      <h3 className={`font-black text-xl tracking-tighter ${dark ? 'text-white' : 'text-gray-900'}`}>{cat.name}</h3>
                      <p className={`text-[9px] font-medium mt-1 ${dark ? 'text-purple-300' : 'text-gray-500'}`}>{cat.desc}</p>
                    </div>
                    {count > 0 && (
                      <span className={`text-[9px] font-black px-3 py-1 rounded-full flex-none mt-1 ${dark ? 'text-purple-300 bg-purple-900/60' : 'text-gray-400 bg-white/70'}`}>
                        {count} items
                      </span>
                    )}
                  </div>
                  <div className={`grid ${imgs.length === 4 ? 'grid-cols-4' : 'grid-cols-3'} gap-2.5 mb-5`}>
                    {imgs.length > 0 ? imgs.map((p, j) => (
                      <div key={j} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white/50">
                        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm text-3xl z-0">
                          {cat.icon}
                        </div>
                        {p.image && (
                          <img src={p.image} alt={p.name}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 z-10"
                            onError={(e) => {
                              e.target.style.opacity = '0';
                              e.target.nextSibling.style.display = 'flex';
                            }} />
                        )}
                        <div className="absolute inset-0 hidden items-center justify-center bg-purple-50/50 text-4xl opacity-40 z-0">
                          {cat.icon}
                        </div>
                      </div>
                    )) : [1, 2, 3].map(j => (
                      <div key={j} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white/50">
                        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm text-3xl text-opacity-50">
                          {cat.icon}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[9px] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform" style={{ color: cat.accent }}>
                      Explore Collection →
                    </span>
                    {count > 0 && (
                      <span className="text-[9px] font-black" style={{ color: cat.accent }}>
                        From ₹{Math.min(...products.filter(p => p.category === cat.id).map(p => p.price))}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 3: Final card (Bouquets) */}
          <div className="grid grid-cols-1 mb-5">
            {HOME_CATEGORIES.slice(4, 5).map((cat) => {
              let imgs = products.filter(p => p.category === cat.id).slice(0, 6);
              const count = products.filter(p => p.category === cat.id).length;
              return (
                <div key={cat.id}
                  onClick={() => { setView(`/category/${cat.id}`); window.scrollTo(0, 0); }}
                  className={`h-full flex flex-col rounded-[3rem] border-4 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden relative p-7 ${dark ? 'bg-gradient-to-br from-purple-950/80 to-gray-900/80 border-purple-800/50' : `bg-gradient-to-br ${cat.gradient} border-white`}`}
                >
                  <div className="absolute -right-6 -bottom-6 text-[9rem] opacity-[0.06] select-none pointer-events-none leading-none">{cat.icon}</div>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <div className="text-4xl mb-3">{cat.icon}</div>
                      <h3 className={`font-black text-xl tracking-tighter ${dark ? 'text-white' : 'text-gray-900'}`}>{cat.name}</h3>
                      <p className={`text-[9px] font-medium mt-1 ${dark ? 'text-purple-300' : 'text-gray-500'}`}>{cat.desc}</p>
                    </div>
                    <div className="text-right">
                      {count > 0 && (
                        <span className={`text-[9px] font-black px-3 py-1 rounded-full ${dark ? 'text-purple-300 bg-purple-900/60' : 'text-gray-400 bg-white/70'}`}>
                          {count} items
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5 mb-5">
                    {imgs.map((p, j) => (
                      <div key={j} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white/50">
                        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm text-3xl z-0">
                          {cat.icon}
                        </div>
                        {p.image && (
                          <img src={p.image} alt={p.name}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 z-10"
                            onError={(e) => {
                              e.target.style.opacity = '0';
                              e.target.nextSibling.style.display = 'flex';
                            }} />
                        )}
                        <div className="absolute inset-0 hidden items-center justify-center bg-purple-50/50 text-4xl opacity-40 z-0">
                          {cat.icon}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform" style={{ color: cat.accent }}>
                      Explore Collection →
                    </span>
                    {count > 0 && (
                      <span className="text-[9px] font-black" style={{ color: cat.accent }}>
                        From ₹{Math.min(...products.filter(p => p.category === cat.id).map(p => p.price))}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── GIFT GUIDE ────────────────────────────────────────── */}
        <section id="gift-guide-section" className="py-16">
          <div className="mb-10 text-center">
            <p className="text-[9px] font-black text-pink-400 uppercase tracking-[0.4em] mb-2">Not Sure What to Get?</p>
            <h2 className={`text-4xl font-black tracking-tighter mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>Gift Guide 🎁</h2>
            <p className={`text-sm font-medium max-w-sm mx-auto ${dark ? 'text-purple-300' : 'text-gray-400'}`}>
              Find the perfect handmade gift for every budget. Every order above ₹300 includes a free surprise gift! 🎀
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { label: "Under ₹200", emoji: "✨", gradient: "from-blue-50 to-violet-50", accent: "#7c3aed", border: "border-violet-100", desc: "Sweet little gifts that don't break the bank", priceRange: [0, 200] },
              { label: "Under ₹500", emoji: "🎀", gradient: "from-pink-50 to-rose-50", accent: "#db2777", border: "border-pink-100", desc: "Our most popular gifts — bestsellers & new arrivals", priceRange: [200, 500] },
              { label: "Above ₹500", emoji: "💜", gradient: "from-purple-50 to-indigo-50", accent: "#4f1dbb", border: "border-purple-100", desc: "Premium handmade pieces for someone extra special", priceRange: [500, 99999] },
            ].map((tier, i) => {
              // Filter products that actually HAVE working images (not placeholders)
              // We'll prioritize products known to have good images
              const knownGoodIds = [1, 2, 3, 5, 8, 9, 10, 11, 12, 13, 16, 19, 20, 21, 22, 52, 53, 54, 55];
              const available = products.filter(p => p.price >= tier.priceRange[0] && p.price < tier.priceRange[1]);

              // Sort to put known good products first, then others
              const sorted = [...available].sort((a, b) => {
                const aGood = knownGoodIds.includes(Number(a.id)) ? 1 : 0;
                const bGood = knownGoodIds.includes(Number(b.id)) ? 1 : 0;
                // Secondary sort: ensure they HAVE an image path
                if (aGood === bGood) {
                  const aHasImg = a.image && !a.image.includes('placeholder') ? 1 : 0;
                  const bHasImg = b.image && !b.image.includes('placeholder') ? 1 : 0;
                  return bHasImg - aHasImg;
                }
                return bGood - aGood;
              });

              const uniqueSubCats = [...new Set(sorted.map(p => p.subCat))];
              const tierProducts = uniqueSubCats.map(subId => sorted.find(p => p.subCat === subId)).slice(0, 3);

              return (
                <div key={i} className={`rounded-[3rem] border-4 shadow-xl p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group ${dark ? 'bg-gradient-to-br from-purple-950/80 to-gray-900/80 border-purple-800/50' : `bg-gradient-to-br ${tier.gradient} ${tier.border}`}`}>
                  <span className="text-3xl">{tier.emoji}</span>
                  <h3 className={`font-black text-xl tracking-tighter mt-2 mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>{tier.label}</h3>
                  <p className={`text-[10px] font-medium mb-5 ${dark ? 'text-purple-300' : 'text-gray-400'}`}>{tier.desc}</p>
                  <div className="flex gap-2 mb-5">
                    {tierProducts.length > 0 ? tierProducts.map((p, j) => (
                      <div key={j} className="flex-1 min-w-0 group/item">
                        <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md mb-2 bg-white/50">
                          <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm text-2xl z-0">
                            {tier.emoji}
                          </div>
                          {p.image && (
                            <img src={p.image} alt={p.name}
                              className="absolute inset-0 w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500 z-10"
                              onError={(e) => {
                                e.target.style.opacity = '0';
                                e.target.nextSibling.style.display = 'flex';
                              }} />
                          )}
                          <div className="absolute inset-0 hidden items-center justify-center bg-white/60 text-3xl opacity-50 z-0">
                            {tier.emoji}
                          </div>
                        </div>
                        <p className={`text-[8px] font-black text-center truncate w-full px-1 ${dark ? 'text-purple-300' : 'text-gray-500'}`}>{p.name}</p>
                      </div>
                    )) : [0, 1, 2].map(j => (
                      <div key={j} className="flex-1 aspect-square rounded-2xl bg-white/60 border-2 border-white flex items-center justify-center text-xl">{tier.emoji}</div>
                    ))}
                  </div>
                  <div className="space-y-2 mb-5">
                    {tierProducts.map(p => (
                      <div key={p.id} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full flex-none" style={{ background: tier.accent }} />
                        <span className={`text-[11px] font-bold ${dark ? 'text-purple-200' : 'text-gray-600'}`}>{p.name}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { setView('/categories'); window.scrollTo(0, 0); }}
                    className="w-full py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white transition-all active:scale-95 hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${tier.accent}, ${tier.accent}cc)` }}>
                    Shop {tier.label} Gifts →
                  </button>
                </div>
              );
            })}
          </div>
          <div className={`mt-6 rounded-[2rem] border-2 p-5 flex items-center justify-between flex-wrap gap-4 ${dark ? 'bg-gradient-to-r from-purple-950/60 to-violet-950/60 border-purple-800/50' : 'bg-gradient-to-r from-pink-50 to-purple-50 border-pink-100'}`}>
            <div className="flex items-center gap-4">
              <span className="text-3xl">🎁</span>
              <div>
                <p className={`font-black text-sm ${dark ? 'text-white' : 'text-gray-800'}`}>Free Surprise Gift on orders above ₹300!</p>
                <p className={`text-[10px] font-medium ${dark ? 'text-purple-300' : 'text-gray-400'}`}>A little something extra from ShimmerNest 💜</p>
              </div>
            </div>
            <button onClick={() => { setView('/categories'); window.scrollTo(0, 0); }}
              className="px-6 py-3 bg-purple-600 text-white font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-purple-700 active:scale-95 transition-all shadow-lg">
              Shop Now ✨
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}