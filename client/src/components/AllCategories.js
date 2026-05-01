import React from 'react';
import { products } from '../data';
import { useTheme } from '../context/ThemeContext';
import { useSiteConfig } from '../context/SiteConfigContext';

/* --- EDIT THESE TO CHANGE PREVIEW IMAGES FOR EACH COLLECTION --- */
const CATEGORY_PREVIEWS = {
  keychains: ["/images/Keychains/luffy_hat.jpg", "/images/Keychains/daisy3.jpg", "/images/Keychains/couple1.jpg", "/images/Keychains/pawkeychain1.jpg"],
  plushies: ["/images/Plushies/Bunny_withpinkstrawberry.jpg", "/images/Plushies/bearwith_pinkoutfit.jpg", "/images/Plushies/Cat_withstrawberryslingbag.jpg", "/images/Plushies/cow_withpeachoutfit.jpg"],
  hair: ["/images/Hairaccessories/hairaccessories1.jpeg"],
  bouquets: ["/images/Bouquets/bouquet1.jpeg"]
};


const CATEGORIES = [
  { id: "keychains", name: "Crochet Keychains", icon: "🔑", gradient: "from-violet-100 to-blue-50", accent: "#7c3aed", desc: "Cute companions for your keys & bags" },
  { id: "plushies", name: "Crochet Plushies", icon: "🧸", gradient: "from-yellow-50 to-orange-50", accent: "#f59e0b", desc: "Cuddle-worthy handmade friends" },
  { id: "hair", name: "Hair Accessories", icon: "🎀", gradient: "from-rose-100 to-pink-50", accent: "#db2777", desc: "Floral clips, scrunchies & bandanas" },
  { id: "bouquets", name: "Crochet Bouquets", icon: "💐", gradient: "from-red-50 to-orange-50", accent: "#dc2626", desc: "Flowers that never fade" },
];

export default function AllCategories({ setView, setActiveCat }) {
  const { dark } = useTheme();
  const { siteConfig } = useSiteConfig();

  const categoriesToRender = siteConfig?.categories || CATEGORIES;

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
        {categoriesToRender.map((cat, i) => {
          const catProducts = products.filter(p => p.category === cat.id);
          const previewImgs = (cat.images || []).filter(img => img !== "");
          // Fallback to hardcoded previews if DB images aren't set
          const finalImgs = previewImgs.length > 0 ? previewImgs : CATEGORY_PREVIEWS[cat.id] || [];

          return (
            <div
              key={cat.id}
              onClick={() => { setView(`/category/${cat.id}`); window.scrollTo(0, 0); }}
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

                {/* Right: product image grid - ALWAYS shows 4 boxes */}
                <div className="flex-grow">
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map(j => {
                      const imgPath = finalImgs[j];
                      return (
                        <div key={j} className="aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white/50 flex items-center justify-center">
                          {imgPath ? (
                            <>
                              <img
                                src={imgPath}
                                alt={cat.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                              <span className="hidden text-2xl blur-[1px] opacity-40">{cat.icon}</span>
                            </>
                          ) : (
                            <span className="text-2xl blur-[1px] opacity-40">{cat.icon}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

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