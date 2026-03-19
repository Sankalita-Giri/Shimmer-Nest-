import React from 'react';
import { categories, products } from '../data';

export default function Home({ setView, setActiveCat, setSelectedProduct }) {

  const featured = products.filter(p => p.tag === "BESTSELLER" || p.tag === "NEW").slice(0, 5);

  const categoryExtras = {
    hair: { icon: "🎀", color: "bg-yellow-50", desc: "Floral clips and scrunchies" },
    bouquets: { icon: "💐", color: "bg-red-50", desc: "Flowers that never fade" },
    keychains: { icon: "🔑", color: "bg-blue-50", desc: "Cute companions for your keys" },
    totes: { icon: "👜", color: "bg-pink-50", desc: "Hand-knotted stylish bags" }
  };

  return (
    <div className="animate-fadeIn">

      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-b from-purple-50/50 to-transparent rounded-[4rem] mb-12 border border-purple-50/30">
        <h2 className="text-6xl md:text-8xl font-black text-gray-800 mb-6 tracking-tighter leading-tight">
          Handmade Crochet <br />
          <span className="text-purple-600 italic font-medium">With Extra Shimmer</span>
        </h2>
        <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-xs">
          Cozy treasures for your aesthetic nest
        </p>
        <button
          onClick={() => { setView('subcat'); window.scrollTo(0, 0); }}
          className="mt-8 px-8 py-3 bg-purple-600 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-purple-700 transition-colors shadow-lg hover:shadow-purple-200"
        >
          Shop Now ✨
        </button>
      </section>

      {/* Featured Scroller */}
      <section className="mb-20">
        <div className="flex justify-between items-center mb-8 px-2">
          <h3 className="text-xl font-black text-gray-800 uppercase tracking-widest">Trending Now ✨</h3>
          <span className="text-[10px] font-black text-purple-400 bg-purple-50 px-4 py-1.5 rounded-full shadow-sm">
            Swipe to explore
          </span>
        </div>

        {featured.length === 0 ? (
          <p className="text-center text-gray-400 text-sm font-medium py-10">
            No featured products yet. Check back soon! 🧶
          </p>
        ) : (
          <div className="flex overflow-x-auto space-x-8 pb-10 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {featured.map((prod) => (
              <div
                key={prod.id}
                onClick={() => { setSelectedProduct(prod); setView('product-detail'); }}
                className="flex-none w-72 snap-center group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-purple-100">
                  <img
                    src={prod.image}
                    alt={prod.name || 'ShimmerNest product'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x500?text=ShimmerNest'; }}
                  />
                  {prod.tag && (
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl shadow-sm border border-white">
                      <span className="text-[10px] font-black text-purple-600 uppercase tracking-tighter">{prod.tag}</span>
                    </div>
                  )}
                </div>
                <div className="mt-6 px-4 text-center">
                  <h4 className="font-black text-gray-800 text-lg truncate tracking-tighter">{prod.name}</h4>
                  <p className="text-purple-500 font-black italic text-xl">₹{prod.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <div className="px-2 mb-20">
        <h3 className="text-xl font-black text-gray-800 uppercase tracking-widest mb-10">Shop Categories</h3>

        {categories.length === 0 ? (
          <p className="text-center text-gray-400 text-sm font-medium py-10">
            Categories coming soon! 🧶
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {categories.map((cat) => {
              const extra = categoryExtras[cat.id] || { icon: "✨", color: "bg-purple-50", desc: "Handmade magic" };
              return (
                <div
                  key={cat.id}
                  onClick={() => { setActiveCat(cat.id); setView('subcat'); }}
                  className={`${extra.color} p-10 rounded-[3.5rem] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border-8 border-white group relative overflow-hidden cursor-pointer`}
                >
                  {/* Decorative Background Text */}
                  <div className="absolute -right-6 -bottom-6 text-9xl opacity-5 group-hover:opacity-10 group-hover:rotate-6 transition-all font-black uppercase italic select-none">
                    {cat.id}
                  </div>

                  <div className="relative z-10">
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform origin-left drop-shadow-sm">
                      {extra.icon}
                    </div>
                    <h4 className="text-2xl font-black text-gray-800 italic uppercase tracking-tighter">{cat.name}</h4>
                    <p className="text-gray-500 text-sm mt-2 font-medium opacity-80">{extra.desc}</p>

                    <div className="mt-8 flex items-center text-[10px] font-black text-purple-400 uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                      Explore Collection <span className="ml-2">→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}