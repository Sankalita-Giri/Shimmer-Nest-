import React, { useState } from 'react';
import ReviewSection from './ReviewSection';
import { useTheme } from '../context/ThemeContext';

export default function ProductDetail({ product, addToCart, goBack, navigateToCart, navigateToCheckout }) {
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const { dark } = useTheme();

  // Handle variants (different prices/images per selection)
  const [selectedVariant, setSelectedVariant] = useState(product.variants ? product.variants[0] : null);
  const [color, setColor] = useState("Original");
  const [mainImg, setMainImg] = useState(product.image);

  const outOfStock = product.stock !== undefined && product.stock <= 0;
  const allImages = product.images || [product.image];
  const colorOptions = product.colors?.length > 0 ? product.colors : ["Original", "Pastel", "Midnight"];

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentColor = selectedVariant ? selectedVariant.name : color;

  const handleVariantSelect = (v) => {
    setSelectedVariant(v);
    if (v.imageIndex !== undefined && allImages[v.imageIndex]) {
      setMainImg(allImages[v.imageIndex]);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, qty, currentColor, note, currentPrice);
    setIsAdded(true);
  };

  const handleBuyNow = () => {
    addToCart(product, qty, currentColor, note, currentPrice);
    if (navigateToCheckout) navigateToCheckout();
  };

  return (
    <div className="animate-fadeIn pb-20">
      <button
        onClick={goBack}
        className="mb-6 text-[10px] font-black uppercase text-purple-400 hover:text-purple-600 transition-colors flex items-center gap-1"
      >
        ← Back to List
      </button>

      <div className={`grid md:grid-cols-2 gap-12 p-8 md:p-12 rounded-[4rem] shadow-2xl border-8 ${dark ? 'bg-gray-900 border-purple-900/40' : 'bg-white border-white'}`}>

        {/* LEFT: GALLERY */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="aspect-square rounded-[3rem] overflow-hidden bg-gray-50 border-4 border-purple-50 group relative">
            {outOfStock && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-950/40 backdrop-blur-md">
                <span className="bg-white text-gray-900 text-xs font-black px-8 py-3 rounded-full uppercase tracking-widest shadow-2xl">Sold Out</span>
              </div>
            )}
            <img
              src={mainImg}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${outOfStock ? 'grayscale opacity-50' : ''}`}
              onError={(e) => { e.target.src = 'https://placehold.co/600x600?text=ShimmerNest'; }}
            />
            {/* Image count badge */}
            {!outOfStock && allImages.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                {allImages.indexOf(mainImg) + 1} / {allImages.length}
              </div>
            )}
          </div>

          {/* Thumbnail grid — scrollable, handles up to 50 images */}
          {allImages.length > 1 && (
            <div className={outOfStock ? 'grayscale opacity-50 pointer-events-none' : ''}>
              {/* For many images (wool) — show as grid */}
              {allImages.length > 8 ? (
                <div className={`max-h-48 overflow-y-auto rounded-2xl border p-2 ${dark ? 'bg-gray-800 border-purple-800/40' : 'bg-gray-50 border-purple-50'}`}>
                  <p className={`text-[8px] font-black uppercase tracking-widest mb-2 px-1 ${dark ? 'text-purple-400' : 'text-gray-400'}`}>
                    All Colours ({allImages.length} options) — click to preview
                  </p>
                  <div className="grid grid-cols-8 gap-1.5">
                    {allImages.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`colour ${i + 1}`}
                        onClick={() => setMainImg(img)}
                        className={`aspect-square rounded-xl cursor-pointer object-cover transition-all hover:scale-110 ${
                          mainImg === img
                            ? 'ring-2 ring-purple-500 ring-offset-1 scale-110'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                        onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=🧶'; }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                /* For few images — horizontal scroll strip */
                <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
                  {allImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="thumbnail"
                      onClick={() => setMainImg(img)}
                      className={`w-20 h-20 flex-none rounded-2xl cursor-pointer border-4 object-cover transition-all ${
                        mainImg === img
                          ? 'border-purple-400 scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                      onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=✨'; }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: DETAILS */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <div className="flex items-center gap-3">
                {product.tag && (
                <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${dark ? 'bg-purple-900/60 text-purple-300' : 'bg-purple-100 text-purple-600'}`}>
                    {product.tag}
                </span>
                )}
                {outOfStock && (
                    <span className="bg-red-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest animate-pulse">Out of Stock</span>
                )}
            </div>
            <h2 className={`text-4xl md:text-5xl font-black italic mt-4 tracking-tighter leading-tight ${dark ? 'text-white' : 'text-gray-800'}`}>
              {product.name}
            </h2>
            <p className="text-6xl font-black text-purple-600 tracking-tighter mt-4">₹{currentPrice}</p>

            {/* Rating summary */}
            {product.rating && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} className={`text-sm ${s <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                  ))}
                </div>
                <span className={`text-xs font-black uppercase tracking-tight ${dark ? 'text-purple-400' : 'text-gray-400'}`}>
                  {product.rating} · {product.reviews || 0} reviews
                </span>
              </div>
            )}

            {product.description && (
              <p className={`text-sm font-medium mt-4 leading-relaxed ${dark ? 'text-purple-300' : 'text-gray-400'}`}>
                {product.description}
              </p>
            )}
          </div>

          {/* Color Selector */}
          <div className={`space-y-3 ${outOfStock ? 'opacity-40 pointer-events-none' : ''}`}>
            <p className={`text-[11px] font-black uppercase tracking-widest ${dark ? 'text-purple-400' : 'text-gray-400'}`}>
              Select Shade — <span className="text-purple-500">{currentColor}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {product.variants ? (
                product.variants.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => handleVariantSelect(v)}
                    className={`px-6 py-3.5 rounded-[1.5rem] border-2 font-black text-[11px] uppercase tracking-wider transition-all duration-300 shadow-sm ${
                      selectedVariant?.name === v.name 
                        ? 'bg-purple-600 border-purple-600 text-white shadow-purple-200 scale-105' 
                        : dark 
                          ? 'bg-gray-800 border-gray-700 text-purple-300 hover:border-purple-500' 
                          : 'bg-white border-purple-50 text-gray-400 hover:border-purple-200 hover:text-purple-600'
                    }`}
                  >
                    {v.name}
                  </button>
                ))
              ) : (
                colorOptions.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-6 py-3.5 rounded-[1.5rem] border-2 font-black text-[11px] uppercase tracking-wider transition-all duration-300 shadow-sm ${
                      color === c 
                        ? 'bg-purple-600 border-purple-600 text-white shadow-purple-200 scale-105' 
                        : dark 
                          ? 'bg-gray-800 border-gray-700 text-purple-300 hover:border-purple-500' 
                          : 'bg-white border-purple-50 text-gray-400 hover:border-purple-200 hover:text-purple-600'
                    }`}
                  >
                    {c}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Custom Note */}
          <div className={`space-y-3 ${outOfStock ? 'opacity-40 pointer-events-none' : ''}`}>
            <p className={`text-[11px] font-black uppercase tracking-widest flex justify-between ${dark ? 'text-purple-400' : 'text-gray-400'}`}>
              <span>Custom Message 🎀</span>
              <span className="normal-case font-medium opacity-60 text-[9px]">Hand-made requests</span>
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ex: Please use a pink bow! 🎀"
              rows={3}
              className={`w-full p-5 rounded-[2rem] border-2 focus:border-purple-300 outline-none text-sm font-medium italic resize-none transition-all shadow-inner ${dark ? 'bg-gray-800 border-gray-700 text-purple-100 placeholder-purple-700' : 'bg-purple-50/50 border-transparent'}`}
            />
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4">
            <div className="flex gap-4 items-stretch">
              <div className={`flex items-center space-x-4 px-5 rounded-3xl border-2 shadow-sm ${dark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-white'} ${outOfStock ? 'opacity-40 pointer-events-none' : ''}`}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="font-black text-xl text-purple-400 w-8">−</button>
                <span className={`font-black text-xl w-6 text-center ${dark ? 'text-purple-100' : 'text-gray-800'}`}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="font-black text-xl text-purple-400 w-8">+</button>
              </div>

              {!isAdded ? (
                <button
                  onClick={handleAddToCart}
                  disabled={outOfStock}
                  className={`flex-grow py-5 rounded-[2rem] font-black uppercase tracking-widest text-[11px] transition-all active:scale-95 ${outOfStock ? 'bg-gray-100 text-gray-400 border-4 border-gray-200 cursor-not-allowed' : 'bg-white border-4 border-purple-600 text-purple-600 hover:bg-purple-50'}`}
                >
                  {outOfStock ? 'Out of Stock 😢' : 'Add to Basket 🧺'}
                </button>
              ) : (
                <button
                  onClick={navigateToCart}
                  className="flex-grow py-5 bg-green-500 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-lg shadow-green-200 transition-all animate-pulse"
                >
                  Go to Cart →
                </button>
              )}
            </div>

            <button
              onClick={handleBuyNow}
              disabled={outOfStock}
              className={`w-full py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[11px] transition-all shadow-2xl ${outOfStock ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : 'bg-purple-600 text-white shadow-purple-200 hover:bg-purple-700 active:scale-95'}`}
            >
              {outOfStock ? 'Temporarily Unavailable' : 'Buy It Now ✨'}
            </button>
          </div>

          <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] text-center italic">
            🧶 Handmade to order — ships in 5–7 working days
          </p>
        </div>
      </div>

      {/* ── REVIEW SECTION ── */}
      <ReviewSection product={product} />
    </div>
  );
}