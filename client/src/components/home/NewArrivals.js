import React from 'react';
import SkeletonCard from '../SkeletonCard';

const NewArrivals = ({ dark, loading, newArrivals, setView, setSelectedProduct }) => {
  if (newArrivals.length === 0) return null;

  return (
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

        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 opacity-0 group-hover/slider:opacity-100 transition-opacity pointer-events-none">
          <div className="w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-purple-600 font-black">→</div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default NewArrivals;
