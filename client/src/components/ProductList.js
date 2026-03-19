import React from 'react';
import { products, subCategories } from "../data";

export default function ProductList({ category, subCat, setSelectedProduct, setView, goBack }) {

  const items = products.filter(p =>
    p.category?.toLowerCase() === category?.toLowerCase() &&
    p.subCat?.toLowerCase() === subCat?.toLowerCase()
  );

  const subCatData = subCategories[category]?.find(s => s.id === subCat);
  const subCatName = subCatData ? subCatData.name : subCat;

  return (
    <div className="animate-fadeIn px-4 pb-20">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <button
            onClick={goBack}
            className="mb-6 text-purple-300 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 hover:text-purple-600 transition-all group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to {category}
          </button>
          <h2 className="text-5xl font-black text-gray-800 tracking-tighter capitalize italic leading-none">
            {subCatName}<span className="text-pink-300">.</span>
          </h2>
        </div>

        {items.length > 0 && (
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border-2 border-purple-50 shadow-sm self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <p className="text-gray-500 font-black text-[10px] uppercase tracking-widest">
              {items.length} {items.length === 1 ? 'Magic Item' : 'Treasures'} Found
            </p>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {items.map((item) => {
            const outOfStock = item.stock !== undefined && item.stock <= 0;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (outOfStock) return;
                  setSelectedProduct(item);
                  setView("product-detail");
                  window.scrollTo(0, 0);
                }}
                className={`group ${outOfStock ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              >
                <div className="bg-white p-4 rounded-[3rem] shadow-xl border-4 border-white transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-purple-100 group-hover:rotate-[-1deg] relative overflow-hidden">

                  <div className="relative aspect-square rounded-[2.2rem] overflow-hidden mb-6 bg-gray-50 shadow-inner">

                    {/* Tag Badge */}
                    {item.tag && !outOfStock && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-white/90 backdrop-blur-md text-purple-600 text-[9px] font-black px-4 py-1.5 rounded-2xl shadow-sm border border-purple-50 uppercase tracking-widest">
                          {item.tag}
                        </span>
                      </div>
                    )}

                    {/* Out of Stock Badge */}
                    {outOfStock && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-[2.2rem]">
                        <span className="bg-gray-800 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                          Sold Out
                        </span>
                      </div>
                    )}

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=ShimmerNest'; }}
                    />
                    <div className="absolute inset-0 bg-purple-900/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.2rem]" />
                  </div>

                  <div className="text-center pb-2">
                    <h3 className="font-black text-gray-800 tracking-tight text-base md:text-lg mb-1 truncate px-2">
                      {item.name}
                    </h3>

                    <div className="flex justify-center items-center space-x-1.5 mb-3">
                      <span className="text-yellow-400 text-xs">★</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                        {item.rating || "5.0"}
                        <span className="opacity-40 mx-1">|</span>
                        {item.reviews || "12"} Loves
                      </span>
                    </div>

                    <p className="text-purple-500 font-black text-xl italic mb-5 leading-none">
                      ₹{item.price}
                    </p>

                    <div className={`w-full py-3.5 rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] transition-all duration-300 ${
                      outOfStock
                        ? 'bg-gray-100 text-gray-300'
                        : 'bg-gray-50 text-gray-400 group-hover:bg-purple-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-purple-200'
                    }`}>
                      {outOfStock ? 'Sold Out 😢' : 'Adopt Me ✨'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty / Coming Soon State */
        <div className="text-center py-32 bg-white/50 backdrop-blur-sm rounded-[4rem] border-4 border-dashed border-purple-100 flex flex-col items-center">
          <div className="relative">
            <div className="w-28 h-28 bg-purple-50 rounded-full flex items-center justify-center text-6xl mb-8 animate-bounce">
              🧶
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-400 rounded-full border-4 border-white animate-ping"></div>
          </div>
          <h3 className="text-3xl font-black text-gray-800 italic mb-3 tracking-tighter">
            Patience is Magic...
          </h3>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] max-w-[280px] mx-auto leading-relaxed opacity-70">
            Our tiny hands are currently crocheting <br />
            new <span className="text-purple-400">{subCatName}</span> designs just for you!
          </p>
          <button
            onClick={goBack}
            className="mt-10 px-10 py-4 bg-purple-600 text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all"
          >
            Explore Other Nests
          </button>
        </div>
      )}
    </div>
  );
}