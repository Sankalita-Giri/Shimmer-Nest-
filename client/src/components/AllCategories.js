import React from 'react';
import { products } from '../data';
import { useTheme } from '../context/ThemeContext';

const CATEGORIES = [
  { id: "keychains", name: "Crochet Keychains",     icon: "🔑", gradient: "from-violet-100 to-blue-50",  accent: "#7c3aed", desc: "Cute companions for your keys & bags" },
  { id: "plushies",  name: "Crochet Mini Plushies", icon: "🧸", gradient: "from-yellow-50 to-orange-50", accent: "#f59e0b", desc: "Tiny huggable handmade friends"         },
  { id: "totes",     name: "Crochet Tote Bags",     icon: "👜", gradient: "from-amber-50 to-yellow-50",  accent: "#d97706", desc: "Hand-knotted stylish carry-alls"        },
  { id: "hair",      name: "Hair Accessories",       icon: "🎀", gradient: "from-rose-100 to-pink-50",   accent: "#db2777", desc: "Floral clips, scrunchies & bandanas"   },
  { id: "bouquets",  name: "Crochet Bouquets",       icon: "💐", gradient: "from-red-50 to-orange-50",   accent: "#dc2626", desc: "Flowers that never fade"                },
];

export default function AllCategories({ setView, setActiveCat }) {
  const { dark } = useTheme();
  return (
    <div className="animate-fadeIn pb-20">

      {/* Header */}
      <div className="mb-12">
        <button
          onClick={() => { setView('home'); window.scrollTo(0, 0); }}
          className="mb-6 text-purple-300 font-black text-[10px] uppercase tracking-widest hover:text-purple-500 transition-colors flex items-center gap-1"
        >
          ← Back to Home
        </button>
        <p className="text-[9px] font-black text-purple-400 uppercase tracking-[0.4em] mb-2">What are you looking for?</p>
        <h1 className={`text-5xl font-black tracking-tighter ${dark ? 'text-white' : 'text-gray-900'}`}>
          Shop All <span className="text-purple-500 italic font-medium">Collections</span>
        </h1>
        <p className={`text-sm font-medium mt-3 ${dark ? 'text-purple-300' : 'text-gray-400'}`}>
          Choose a category to explore our handmade creations 🧶
        </p>
      </div>

      {/* Category Cards — big, image-rich */}
      <div className="space-y-5">
        {CATEGORIES.map((cat, i) => {
          const catProducts = products.filter(p => p.category === cat.id);
          const previewImgs = catProducts.slice(0, 4);

          return (
            <div
              key={cat.id}
              onClick={() => { setActiveCat(cat.id); setView('subcat'); window.scrollTo(0, 0); }}
              className={`rounded-[3rem] border-4 shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer group p-6 md:p-8 ${dark ? 'bg-gradient-to-br from-purple-950/80 to-gray-900/80 border-purple-800/40' : `bg-gradient-to-br ${cat.gradient} border-white`}`}
            >
              <div className="flex items-center gap-6">

                {/* Left: icon + text */}
                <div className="flex-none">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/70 shadow-md flex items-center justify-center text-3xl mb-3">
                    {cat.icon}
                  </div>
                  <h2 className={`font-black text-lg tracking-tight leading-tight ${dark ? 'text-white' : 'text-gray-900'}`}>{cat.name}</h2>
                  <p className={`text-[10px] font-medium mt-1 max-w-[140px] ${dark ? 'text-purple-300' : 'text-gray-500'}`}>{cat.desc}</p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <span className="text-[9px] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform"
                      style={{ color: cat.accent }}>
                      Explore Collection
                    </span>
                    <span className="text-[9px] font-black group-hover:translate-x-1 transition-transform"
                      style={{ color: cat.accent }}>→</span>
                  </div>
                </div>

                {/* Right: product image grid */}
                <div className="flex-grow">
                  {previewImgs.length > 0 ? (
                    <div className="grid grid-cols-4 gap-2">
                      {previewImgs.map((p, j) => (
                        <div key={j} className="aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => { e.target.src = `https://placehold.co/200x200?text=${cat.icon}`; }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Coming soon state */
                    <div className="grid grid-cols-4 gap-2">
                      {[0,1,2,3].map(j => (
                        <div key={j} className="aspect-square rounded-2xl bg-white/50 border-2 border-white flex items-center justify-center text-2xl">
                          {cat.icon}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Product count + price range */}
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${dark ? 'text-purple-400' : 'text-gray-400'}`}>
                      {catProducts.length > 0 ? `${catProducts.length} items` : "Coming soon"}
                    </span>
                    {catProducts.length > 0 && (
                      <>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: cat.accent }}>
                          From ₹{Math.min(...catProducts.map(p => p.price))}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom note */}
      <div className="mt-12 text-center">
        <p className="text-[10px] font-black text-purple-200 uppercase tracking-[0.4em]">
          ✨ All items are handmade to order with love ✨
        </p>
      </div>
    </div>
  );
}