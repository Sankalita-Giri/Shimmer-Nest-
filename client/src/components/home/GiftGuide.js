import React from 'react';

const GiftGuide = ({ dark, products, setView }) => {
  const giftTiers = [
    { label: "Under ₹200", emoji: "✨", gradient: "from-blue-50 to-violet-50", accent: "#7c3aed", border: "border-violet-100", desc: "Sweet little gifts that don't break the bank", priceRange: [0, 200] },
    { label: "Under ₹500", emoji: "🎀", gradient: "from-pink-50 to-rose-50", accent: "#db2777", border: "border-pink-100", desc: "Our most popular gifts — bestsellers & new arrivals", priceRange: [200, 500] },
    { label: "Above ₹500", emoji: "💜", gradient: "from-purple-50 to-indigo-50", accent: "#4f1dbb", border: "border-purple-100", desc: "Premium handmade pieces for someone extra special", priceRange: [500, 99999] },
  ];

  return (
    <section id="gift-guide-section" className="py-16">
      <div className="mb-10 text-center">
        <p className="text-[9px] font-black text-pink-400 uppercase tracking-[0.4em] mb-2">Not Sure What to Get?</p>
        <h2 className={`text-4xl font-black tracking-tighter mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>Gift Guide 🎁</h2>
        <p className={`text-sm font-medium max-w-sm mx-auto ${dark ? 'text-purple-300' : 'text-gray-400'}`}>
          Find the perfect handmade gift for every budget. Every order above ₹300 includes a free surprise gift! 🎀
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {giftTiers.map((tier, i) => {
          const knownGoodIds = [1, 2, 3, 5, 8, 9, 10, 11, 12, 13, 16, 19, 20, 21, 22, 52, 53, 54, 55];
          const available = products.filter(p => p.price >= tier.priceRange[0] && p.price < tier.priceRange[1]);

          const sorted = [...available].sort((a, b) => {
            const aGood = knownGoodIds.includes(Number(a.id)) ? 1 : 0;
            const bGood = knownGoodIds.includes(Number(b.id)) ? 1 : 0;
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
    </section>
  );
};

export default GiftGuide;
