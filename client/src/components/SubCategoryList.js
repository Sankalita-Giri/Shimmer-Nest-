import React from 'react';
import { subCategories } from '../data';
import { useTheme } from '../context/ThemeContext';

export default function SubCategoryList({ activeCat, setSubCat, setView, goBack }) {
  const { dark } = useTheme();
  const currentSubCats = subCategories[activeCat] || [];

  const singular = activeCat
    ? activeCat.charAt(0).toUpperCase() + activeCat.slice(1, -1)
    : 'Item';

  // Category display names
  const catNames = {
    keychains: "Crochet Keychains",
    plushies:  "Crochet Mini Plushies",
    totes:     "Crochet Tote Bags",
    hair:      "Hair Accessories",
    bouquets:  "Crochet Bouquets",
  };
  const catName = catNames[activeCat] || activeCat;

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <button
            onClick={goBack}
            className="mb-4 flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 hover:text-purple-700 transition-all group"
          >
            <span className="group-hover:-translate-x-1 transition-transform mr-2">←</span>
            Back to Shop
          </button>
          <h2 className={`text-5xl font-black italic capitalize tracking-tighter ${dark ? 'text-white' : 'text-gray-800'}`}>
            {catName} <span className="text-purple-600 font-medium">Studio</span>
          </h2>
          <p className={`text-[10px] font-bold uppercase tracking-widest mt-2 ml-1 ${dark ? 'text-purple-400' : 'text-gray-400'}`}>
            Explore our handmade {catName.toLowerCase()} varieties
          </p>
        </div>
      </div>

      {currentSubCats.length === 0 ? (
        <div className={`text-center py-32 backdrop-blur-sm rounded-[4rem] border-4 border-dashed flex flex-col items-center ${dark ? 'bg-purple-950/30 border-purple-800/40' : 'bg-white/50 border-purple-100'}`}>
          <div className="relative">
            <div className="w-28 h-28 bg-purple-50 rounded-full flex items-center justify-center text-6xl mb-8 animate-bounce">
              🧶
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-400 rounded-full border-4 border-white animate-ping"></div>
          </div>
          <h3 className={`text-3xl font-black italic mb-3 tracking-tighter ${dark ? 'text-white' : 'text-gray-800'}`}>Coming Soon...</h3>
          <p className={`font-bold text-[10px] uppercase tracking-[0.2em] max-w-[280px] mx-auto leading-relaxed opacity-70 ${dark ? 'text-purple-300' : 'text-gray-400'}`}>
            We're working on something magical for this category!
          </p>
          <button
            onClick={goBack}
            className="mt-10 px-10 py-4 bg-purple-600 text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all"
          >
            Back to Shop
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {currentSubCats.map((sub) => (
            <div
              key={sub.id}
              onClick={() => {
                setSubCat(sub.id);
                setView("productList");
                window.scrollTo(0, 0);
              }}
              className="group cursor-pointer text-center"
            >
              <div className="relative aspect-square mb-6">
                <div className="absolute inset-0 bg-purple-200 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative h-full w-full rounded-full border-[12px] border-white shadow-2xl overflow-hidden transition-all duration-700 group-hover:scale-105 group-hover:border-purple-50">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=✨'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/30">
                      View All
                    </span>
                  </div>
                </div>
              </div>
              <h3 className={`font-black uppercase tracking-tighter text-sm md:text-base group-hover:text-purple-600 transition-colors ${dark ? 'text-purple-100' : 'text-gray-800'}`}>
                {sub.name}
              </h3>
              {sub.desc ? (
                <p className={`text-[9px] font-bold uppercase tracking-[0.3em] mt-1 group-hover:text-purple-300 transition-colors ${dark ? 'text-purple-400' : 'text-gray-300'}`}>
                  {sub.desc}
                </p>
              ) : (
                <p className={`text-[9px] font-bold uppercase tracking-[0.3em] mt-1 group-hover:text-purple-300 transition-colors ${dark ? 'text-purple-400' : 'text-gray-300'}`}>
                  Hand-Knotted Selection
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {currentSubCats.length > 0 && (
        <div className="mt-20 py-10 border-t-4 border-dashed border-purple-50 text-center">
          <p className="text-[11px] font-black text-purple-200 uppercase tracking-[0.5em]">
            ✨ Every {singular} is made to order with love ✨
          </p>
        </div>
      )}
    </div>
  );
}