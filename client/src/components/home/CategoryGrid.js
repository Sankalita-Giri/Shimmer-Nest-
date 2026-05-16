import React from 'react';

const CategoryGrid = ({ dark, HOME_CATEGORIES, products, setView }) => {
  return (
    <section className="py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <p className="text-[9px] font-black text-purple-400 uppercase tracking-[0.4em] mb-2">Browse by Type</p>
          <h2 className={`text-5xl md:text-6xl font-black tracking-tighter ${dark ? 'text-white' : 'text-gray-900'}`}>Shop Categories</h2>
        </div>
        <button onClick={() => { setView('/categories'); window.scrollTo(0, 0); }}
          className="text-[9px] font-black text-purple-500 uppercase tracking-widest hover:text-purple-700 transition-colors border-b-2 border-purple-200 pb-0.5">
          View All →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        {HOME_CATEGORIES.map((cat) => {
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
              className={`flex flex-col rounded-[3rem] border-4 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden relative p-7 ${dark ? 'bg-gradient-to-br from-purple-950/80 to-gray-900/80 border-purple-800/50' : `bg-gradient-to-br ${cat.gradient} border-white`}`}
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
    </section>
  );
};

export default CategoryGrid;
