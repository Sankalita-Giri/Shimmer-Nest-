import React from 'react';
import { products } from '../data';

const HOME_CATEGORIES = [
  { id: "keychains", name: "Crochet Keychains",     icon: "🔑", gradient: "from-violet-100 to-blue-50",  accent: "#7c3aed", desc: "Cute companions for your keys & bags" },
  { id: "plushies",  name: "Crochet Mini Plushies", icon: "🧸", gradient: "from-yellow-50 to-orange-50", accent: "#f59e0b", desc: "Tiny huggable handmade friends"         },
  { id: "totes",     name: "Crochet Tote Bags",     icon: "👜", gradient: "from-amber-50 to-yellow-50",  accent: "#d97706", desc: "Hand-knotted stylish carry-alls"        },
  { id: "hair",      name: "Hair Accessories",       icon: "🎀", gradient: "from-rose-100 to-pink-50",   accent: "#db2777", desc: "Floral clips, scrunchies & bandanas"   },
  { id: "bouquets",  name: "Crochet Bouquets",       icon: "💐", gradient: "from-red-50 to-orange-50",   accent: "#dc2626", desc: "Flowers that never fade"                },
];

const MARQUEE = ["✨ Handmade with Love", "🎀 Free Gift above ₹300", "🚚 Free Shipping above ₹500", "🧶 100% Crochet", "💜 Made to Order", "🌸 ShimmerNest Studio", "✨ Handmade with Love", "🎀 Free Gift above ₹300", "🚚 Free Shipping above ₹500", "🧶 100% Crochet"];

export default function Home({ setView, setActiveCat, setSelectedProduct }) {
  const newArrivals = products.filter(p => p.tag === "NEW").slice(0, 4);

  return (
    <div className="animate-fadeIn -mx-6">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[70vh] flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "linear-gradient(160deg, #fdf4ff 0%, #fce7f3 40%, #ede9fe 100%)" }}>
        <div className="absolute top-10 left-10 w-64 h-64 bg-pink-200/40 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-200/40 rounded-full blur-[80px] pointer-events-none" />

        {/* Floating images */}
        <div className="absolute top-16 left-[5%] w-24 h-24 md:w-32 md:h-32 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white rotate-[-8deg] animate-float hidden md:block">
          <img src={products[0]?.image} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://placehold.co/200x200?text=✨"; }} />
        </div>
        <div className="absolute top-32 right-[5%] w-20 h-20 md:w-28 md:h-28 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white rotate-[6deg] animate-float hidden md:block" style={{ animationDelay: "1s" }}>
          <img src={products[4]?.image} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://placehold.co/200x200?text=🎀"; }} />
        </div>
        <div className="absolute bottom-32 left-[8%] w-20 h-20 md:w-24 md:h-24 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white rotate-[5deg] animate-float hidden md:block" style={{ animationDelay: "2s" }}>
          <img src={products[8]?.image} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://placehold.co/200x200?text=💐"; }} />
        </div>
        <div className="absolute bottom-20 right-[8%] w-28 h-28 md:w-36 md:h-36 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white rotate-[-5deg] animate-float hidden md:block" style={{ animationDelay: "0.5s" }}>
          <img src={products[11]?.image} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://placehold.co/200x200?text=👜"; }} />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-purple-100 px-5 py-2 rounded-full mb-8 shadow-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-purple-600 uppercase tracking-[0.3em]">Handcrafted in India 🇮🇳</span>
          </div>
          <h1 className="font-black text-gray-900 leading-tight tracking-tighter mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Crochet <span className="italic" style={{ color: "#7c3aed" }}>Magic</span><span style={{ color: "#db2777" }}>.</span>
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base max-w-md mx-auto leading-relaxed mb-10">
            Every stitch is crafted with love, shimmer, and a whole lot of cozy vibes.
            Shop handmade keychains, bouquets, hair accessories & tote bags.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => { setView('categories'); window.scrollTo(0, 0); }}
              className="px-10 py-4 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-2xl active:scale-95 transition-all"
              style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)", boxShadow: "0 20px 40px -10px rgba(124,58,237,0.4)" }}>
              Shop Now ✨
            </button>
            <button onClick={() => { document.getElementById('gift-guide-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-10 py-4 bg-white text-purple-700 font-black text-xs uppercase tracking-widest rounded-full shadow-xl border-2 border-purple-100 hover:border-purple-300 active:scale-95 transition-all">
              Gift Guide 🎁
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {[{ icon: "🧶", text: "100% Handmade" }, { icon: "🚚", text: "Free Ship ₹500+" }, { icon: "🎁", text: "Free Gift ₹300+" }, { icon: "💜", text: "Made to Order" }].map((b, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-50 shadow-sm">
                <span className="text-sm">{b.icon}</span>
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border-2 border-purple-300 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-purple-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────── */}
      <div className="overflow-hidden py-3 border-y border-purple-100 bg-white/60 backdrop-blur-sm">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {MARQUEE.map((text, i) => (
            <span key={i} className="text-[10px] font-black text-purple-500 uppercase tracking-[0.3em] flex-none">{text}</span>
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
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter">New Arrivals 🌸</h2>
              </div>
              <button onClick={() => { setView('categories'); window.scrollTo(0,0); }}
                className="text-[9px] font-black text-purple-500 uppercase tracking-widest hover:text-purple-700 transition-colors border-b-2 border-purple-200 pb-0.5">
                View All →
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {newArrivals.map((prod) => (
                <div key={prod.id} onClick={() => { setSelectedProduct(prod); setView('product-detail'); window.scrollTo(0,0); }}
                  className="group cursor-pointer">
                  <div className="relative aspect-square rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-500">
                    <img src={prod.image} alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=NEW'; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white font-black text-xs uppercase tracking-widest">₹{prod.price} →</p>
                    </div>
                    <div className="absolute top-3 left-3 bg-pink-500 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">New ✨</div>
                    {prod.stock !== undefined && prod.stock <= 3 && prod.stock > 0 && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase">Only {prod.stock} left!</div>
                    )}
                  </div>
                  <div className="mt-3 px-1">
                    <h4 className="font-black text-gray-800 text-sm truncate">{prod.name}</h4>
                    <p className="text-purple-600 font-black italic">₹{prod.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── SHOP CATEGORIES — square grid cards ─────────────── */}
        <section className="py-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[9px] font-black text-purple-400 uppercase tracking-[0.4em] mb-2">Browse by Type</p>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter">Shop Categories</h2>
            </div>
            <button onClick={() => { setView('categories'); window.scrollTo(0,0); }}
              className="text-[9px] font-black text-purple-500 uppercase tracking-widest hover:text-purple-700 transition-colors border-b-2 border-purple-200 pb-0.5">
              View All →
            </button>
          </div>

          {/* Row 1: 2 wide cards */}
          <div className="grid grid-cols-2 gap-5 mb-5">
            {HOME_CATEGORIES.slice(0, 2).map((cat) => {
              const imgs = products.filter(p => p.category === cat.id).slice(0, 3);
              const count = products.filter(p => p.category === cat.id).length;
              return (
                <div key={cat.id}
                  onClick={() => { setActiveCat(cat.id); setView('subcat'); window.scrollTo(0,0); }}
                  className={`bg-gradient-to-br ${cat.gradient} rounded-[3rem] border-4 border-white shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden relative p-7`}
                  style={{ minHeight: "260px" }}
                >
                  {/* Big faded icon bg */}
                  <div className="absolute -right-6 -bottom-6 text-[9rem] opacity-[0.06] select-none pointer-events-none leading-none">{cat.icon}</div>

                  {/* Top: name + count */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="text-4xl mb-3">{cat.icon}</div>
                      <h3 className="font-black text-gray-900 text-xl tracking-tighter">{cat.name}</h3>
                      <p className="text-[9px] text-gray-500 font-medium mt-1">{cat.desc}</p>
                    </div>
                    {count > 0 && (
                      <span className="text-[9px] font-black text-gray-400 bg-white/70 px-3 py-1 rounded-full flex-none mt-1">
                        {count} items
                      </span>
                    )}
                  </div>

                  {/* 3 product images in a row */}
                  <div className="grid grid-cols-3 gap-2.5 mb-5">
                    {imgs.length > 0 ? imgs.map((p, j) => (
                      <div key={j} className="aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md">
                        <img src={p.image} alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => { e.target.src = `https://placehold.co/200x200?text=${cat.icon}`; }} />
                      </div>
                    )) : [0,1,2].map(j => (
                      <div key={j} className="aspect-square rounded-2xl bg-white/40 flex items-center justify-center text-2xl">{cat.icon}</div>
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

          {/* Row 2: 3 equal cards */}
          <div className="grid grid-cols-3 gap-5">
            {HOME_CATEGORIES.slice(2, 5).map((cat) => {
              const imgs = products.filter(p => p.category === cat.id).slice(0, 2);
              const count = products.filter(p => p.category === cat.id).length;
              return (
                <div key={cat.id}
                  onClick={() => { setActiveCat(cat.id); setView('subcat'); window.scrollTo(0,0); }}
                  className={`bg-gradient-to-br ${cat.gradient} rounded-[3rem] border-4 border-white shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden relative p-6`}
                  style={{ minHeight: "260px" }}
                >
                  <div className="absolute -right-5 -bottom-5 text-[7rem] opacity-[0.06] select-none pointer-events-none leading-none">{cat.icon}</div>

                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h3 className="font-black text-gray-900 text-base tracking-tighter leading-tight">{cat.name}</h3>
                  <p className="text-[9px] text-gray-500 font-medium mt-1 mb-5">{cat.desc}</p>

                  {/* 2 product images */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {imgs.length > 0 ? imgs.map((p, j) => (
                      <div key={j} className="aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md">
                        <img src={p.image} alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => { e.target.src = `https://placehold.co/200x200?text=${cat.icon}`; }} />
                      </div>
                    )) : [0,1].map(j => (
                      <div key={j} className="aspect-square rounded-2xl bg-white/40 flex items-center justify-center text-xl">{cat.icon}</div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform" style={{ color: cat.accent }}>
                      Explore →
                    </span>
                    {count > 0 && (
                      <span className="text-[8px] font-black text-gray-400">{count} items</span>
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
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-3">Gift Guide 🎁</h2>
            <p className="text-gray-400 text-sm font-medium max-w-sm mx-auto">
              Find the perfect handmade gift for every budget. Every order above ₹300 includes a free surprise gift! 🎀
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { label: "Under ₹200", emoji: "✨", gradient: "from-blue-50 to-violet-50",   accent: "#7c3aed", border: "border-violet-100", desc: "Sweet little gifts that don't break the bank",        priceRange: [0, 200]    },
              { label: "Under ₹500", emoji: "🎀", gradient: "from-pink-50 to-rose-50",     accent: "#db2777", border: "border-pink-100",   desc: "Our most popular gifts — bestsellers & new arrivals", priceRange: [200, 500]  },
              { label: "Above ₹500", emoji: "💜", gradient: "from-purple-50 to-indigo-50", accent: "#4f1dbb", border: "border-purple-100", desc: "Premium handmade pieces for someone extra special",    priceRange: [500, 99999] },
            ].map((tier, i) => {
              const tierProducts = products.filter(p => p.price >= tier.priceRange[0] && p.price < tier.priceRange[1]).slice(0, 3);
              return (
                <div key={i} className={`bg-gradient-to-br ${tier.gradient} rounded-[3rem] border-4 ${tier.border} shadow-xl p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group`}>
                  <span className="text-3xl">{tier.emoji}</span>
                  <h3 className="font-black text-gray-900 text-xl tracking-tighter mt-2 mb-1">{tier.label}</h3>
                  <p className="text-[10px] font-medium text-gray-400 mb-5">{tier.desc}</p>
                  <div className="flex gap-2 mb-5">
                    {tierProducts.length > 0 ? tierProducts.map((p, j) => (
                      <div key={j} className="flex-1 aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md">
                        <img src={p.image} alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { e.target.src = `https://placehold.co/100x100?text=${tier.emoji}`; }} />
                      </div>
                    )) : [0,1,2].map(j => (
                      <div key={j} className="flex-1 aspect-square rounded-2xl bg-white/60 border-2 border-white flex items-center justify-center text-xl">{tier.emoji}</div>
                    ))}
                  </div>
                  <div className="space-y-2 mb-5">
                    {tierProducts.map(p => (
                      <div key={p.id} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full flex-none" style={{ background: tier.accent }} />
                        <span className="text-[11px] font-bold text-gray-600">{p.name}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { setView('categories'); window.scrollTo(0, 0); }}
                    className="w-full py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white transition-all active:scale-95 hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${tier.accent}, ${tier.accent}cc)` }}>
                    Shop {tier.label} Gifts →
                  </button>
                </div>
              );
            })}
          </div>
          <div className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-[2rem] border-2 border-pink-100 p-5 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-3xl">🎁</span>
              <div>
                <p className="font-black text-gray-800 text-sm">Free Surprise Gift on orders above ₹300!</p>
                <p className="text-[10px] font-medium text-gray-400">A little something extra from ShimmerNest 💜</p>
              </div>
            </div>
            <button onClick={() => { setView('categories'); window.scrollTo(0, 0); }}
              className="px-6 py-3 bg-purple-600 text-white font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-purple-700 active:scale-95 transition-all shadow-lg">
              Shop Now ✨
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}