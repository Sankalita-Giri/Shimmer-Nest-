import React, { useState, useMemo } from 'react';
import { subCategories as defaultSubCats } from "../data";
import { useTheme } from '../context/ThemeContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import SkeletonCard from './SkeletonCard';

export default function ProductList({ category, subCat, setSelectedProduct, setView, goBack, products, loading }) {
  const { dark } = useTheme();
  const { siteConfig } = useSiteConfig();

  // --- Filter State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(2500);
  const [inStockOnly, setInStockOnly] = useState(false);

  const baseItems = useMemo(() => {
    return products ? products.filter(p =>
      p.category?.toLowerCase() === category?.toLowerCase() &&
      p.subCat?.toLowerCase() === subCat?.toLowerCase()
    ) : [];
  }, [products, category, subCat]);

  // Filter items dynamically
  const items = useMemo(() => {
    return baseItems.filter(item => {
      const itemName = item.name || "";
      const itemTag = item.tag || "";
      
      const matchesSearch = itemName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            itemTag.toLowerCase().includes(searchTerm.toLowerCase());
                            
      const itemPrice = Number(item.price) || 0;
      const matchesPrice = itemPrice <= maxPrice;
      
      const matchesStock = inStockOnly ? (item.stock !== undefined && item.stock > 0) : true;
      
      return matchesSearch && matchesPrice && matchesStock;
    });
  }, [baseItems, searchTerm, maxPrice, inStockOnly]);

  const currentSubCats = siteConfig?.subCategories?.[category] || defaultSubCats[category] || [];
  const subCatData = currentSubCats.find(s => s.id === subCat);
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
          <h2 className={`text-5xl font-black tracking-tighter capitalize italic leading-none ${dark ? 'text-white' : 'text-gray-800'}`}>
            {subCatName}<span className="text-pink-400">.</span>
          </h2>
        </div>

        {items.length > 0 && (
          <div className={`inline-flex items-center space-x-2 backdrop-blur-sm px-5 py-2.5 rounded-full border-2 shadow-sm self-start md:self-auto ${dark ? 'bg-purple-950/60 border-purple-800/50' : 'bg-white/80 border-purple-50'}`}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <p className={`font-black text-[10px] uppercase tracking-widest ${dark ? 'text-purple-300' : 'text-gray-500'}`}>
              {items.length} {items.length === 1 ? 'Magic Item' : 'Treasures'} Found
            </p>
          </div>
        )}
      </div>

      {/* Filter UI */}
      {baseItems.length > 0 && (
        <div className={`mb-10 p-6 rounded-3xl border-2 transition-all shadow-sm ${dark ? 'bg-gray-900 border-purple-900/40' : 'bg-white border-purple-50'}`}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            
            {/* Search Bar */}
            <div className="relative w-full lg:w-1/3">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-50">🔍</span>
              <input 
                type="text" 
                placeholder="Search treasures..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3.5 rounded-2xl outline-none font-bold text-sm transition-all ${dark ? 'bg-gray-800 text-white focus:ring-2 focus:ring-purple-600' : 'bg-gray-50 text-gray-800 focus:ring-2 focus:ring-purple-400'}`}
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
              {/* Price Slider */}
              <div className="flex flex-col flex-1 min-w-[150px]">
                <label className={`text-[10px] font-black uppercase tracking-widest mb-2 ${dark ? 'text-purple-300' : 'text-gray-400'}`}>
                  Max Price: ₹{maxPrice}
                </label>
                <input 
                  type="range" 
                  min="0" max="5000" step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-purple-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* In Stock Toggle */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${inStockOnly ? 'bg-purple-600' : (dark ? 'bg-gray-700' : 'bg-gray-200')}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${inStockOnly ? 'transform translate-x-4' : ''}`}></div>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${inStockOnly ? 'text-purple-500' : (dark ? 'text-purple-300' : 'text-gray-600')}`}>
                  In Stock Only
                </span>
              </label>

              {/* Reset Button */}
              <button 
                onClick={() => { setSearchTerm(''); setMaxPrice(2500); setInStockOnly(false); }}
                className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${dark ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-500 hover:text-gray-800 hover:bg-gray-200'}`}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} dark={dark} />)}
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {items.map((item) => {
            const outOfStock = item.stock !== undefined && item.stock <= 0;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (outOfStock) return;
                  setSelectedProduct(item);
                  window.scrollTo(0, 0);
                }}
                className={`group ${outOfStock ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              >
                <div className={`p-4 rounded-[3rem] shadow-xl border-4 transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-[-1deg] relative overflow-hidden ${dark ? 'bg-gray-900 border-purple-900/40 group-hover:shadow-purple-900' : 'bg-white border-white group-hover:shadow-purple-100'}`}>

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
                      <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-950/40 backdrop-blur-[2px] rounded-[2.2rem]">
                        <span className="bg-white text-gray-900 text-[10px] font-black px-5 py-2.5 rounded-full uppercase tracking-[0.2em] shadow-2xl">
                          Sold Out
                        </span>
                      </div>
                    )}

                    <img
                      src={item.image}
                      alt={item.name}
                      className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ${outOfStock ? 'grayscale opacity-60' : ''}`}
                      onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=ShimmerNest'; }}
                    />
                    <div className="absolute inset-0 bg-purple-900/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.2rem]" />
                  </div>

                  <div className="text-center pb-2">
                    <h3 className={`font-black tracking-tight text-base md:text-lg mb-1 truncate px-2 ${dark ? 'text-purple-100' : 'text-gray-800'}`}>
                      {item.name}
                    </h3>

                    <div className="flex justify-center items-center space-x-1.5 mb-3">
                      <span className="text-yellow-400 text-xs">★</span>
                      <span className={`text-[10px] font-bold uppercase tracking-tighter ${dark ? 'text-purple-400' : 'text-gray-400'}`}>
                        {item.rating || "5.0"}
                        <span className="opacity-40 mx-1">|</span>
                        {item.reviews || "12"} Loves
                      </span>
                    </div>

                    <p className="text-purple-500 font-black text-xl italic mb-5 leading-none">
                      ₹{item.price}
                    </p>

                    <div className={`w-full py-3.5 rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] transition-all duration-300 ${outOfStock
                        ? 'bg-gray-100 text-gray-300'
                        : dark
                          ? 'bg-purple-900/50 text-purple-400 group-hover:bg-purple-600 group-hover:text-white group-hover:shadow-lg'
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
        <div className={`text-center py-32 backdrop-blur-sm rounded-[4rem] border-4 border-dashed flex flex-col items-center ${dark ? 'bg-purple-950/30 border-purple-800/40' : 'bg-white/50 border-purple-100'}`}>
          <div className="relative">
            <div className={`w-28 h-28 rounded-full flex items-center justify-center text-6xl mb-8 animate-bounce ${dark ? 'bg-purple-900/60' : 'bg-purple-50'}`}>
              🔍
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-400 rounded-full border-4 border-white animate-ping"></div>
          </div>
          <h3 className={`text-3xl font-black italic mb-3 tracking-tighter ${dark ? 'text-white' : 'text-gray-800'}`}>
            No Magic Found!
          </h3>
          <p className={`font-bold text-[10px] uppercase tracking-[0.2em] max-w-[280px] mx-auto leading-relaxed opacity-70 ${dark ? 'text-purple-300' : 'text-gray-400'}`}>
            Try adjusting your filters <br />
            or search terms to find <br/>
            what you're looking for!
          </p>
          <button
            onClick={() => { setSearchTerm(''); setMaxPrice(2500); setInStockOnly(false); }}
            className="mt-10 px-10 py-4 bg-purple-600 text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}