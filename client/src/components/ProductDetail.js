import React, { useState } from 'react';

export default function ProductDetail({ product, addToCart, goBack, navigateToCart, navigateToCheckout }) {
  const [mainImg, setMainImg] = useState(product.image);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState("Original");
  const [note, setNote] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  const allImages = product.images || [product.image];
  const colorOptions = product.colors?.length > 0 ? product.colors : ["Original", "Pastel", "Midnight"];

  // --- Standard Add to Cart (Stays on page, shows "Go to Cart") ---
  const handleAddToCart = () => {
    addToCart(product, qty, color, note);
    setIsAdded(true);
  };

  // --- DIRECT BUY (Skips Cart, goes to Payment/Form) ---
  const handleBuyNow = () => {
    // 1. Add it to the cart state first so the checkout has data to read
    addToCart(product, qty, color, note);
    
    // 2. Immediately jump to the checkout/payment view
    if (navigateToCheckout) {
      navigateToCheckout();
    }
  };

  return (
    <div className="animate-fadeIn pb-20">
      <button
        onClick={goBack}
        className="mb-6 text-[10px] font-black uppercase text-purple-400 hover:text-purple-600 transition-colors flex items-center gap-1"
      >
        ← Back to List
      </button>

      <div className="grid md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-[4rem] shadow-2xl border-8 border-white">
        
        {/* LEFT: GALLERY */}
        <div className="space-y-6">
          <div className="aspect-square rounded-[3rem] overflow-hidden bg-gray-50 border-4 border-purple-50 group">
            <img
              src={mainImg}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => { e.target.src = 'https://placehold.co/600x600?text=ShimmerNest'; }}
            />
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {allImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumbnail"
                  onClick={() => setMainImg(img)}
                  className={`w-20 h-20 flex-none rounded-2xl cursor-pointer border-4 object-cover transition-all ${
                    mainImg === img ? 'border-purple-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: DETAILS */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            {product.tag && (
              <span className="bg-purple-100 text-purple-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                {product.tag}
              </span>
            )}
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 italic mt-4 tracking-tighter leading-tight">
              {product.name}
            </h2>
            <p className="text-6xl font-black text-purple-600 tracking-tighter mt-4">₹{product.price}</p>
          </div>

          {/* Color Selector */}
          <div className="space-y-3">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Select Shade — <span className="text-purple-500">{color}</span></p>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-5 py-2 rounded-xl border-2 font-black text-[10px] uppercase transition-all ${
                    color === c ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-gray-100 text-gray-400 hover:border-purple-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* CUSTOM MESSAGE (Passed to checkout) */}
          <div className="space-y-3">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex justify-between">
              <span>Custom Message 🎀</span>
              <span className="normal-case font-medium opacity-60 text-[9px]">Hand-made requests</span>
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ex: Please use a pink bow! 🎀"
              rows={3}
              className="w-full p-5 rounded-[2rem] bg-purple-50/50 border-2 border-transparent focus:border-purple-200 outline-none text-sm font-medium italic resize-none transition-all shadow-inner"
            />
          </div>

          {/* QUANTITY & ACTIONS */}
          <div className="space-y-4">
            <div className="flex gap-4 items-stretch">
              {/* Qty Selector */}
              <div className="flex items-center space-x-4 bg-gray-50 px-5 rounded-3xl border-2 border-white shadow-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="font-black text-xl text-purple-400 w-8">−</button>
                <span className="font-black text-xl text-gray-800 w-6 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="font-black text-xl text-purple-400 w-8">+</button>
              </div>

              {/* TOGGLE: Add to Basket / Go to Cart */}
              {!isAdded ? (
                <button
                  onClick={handleAddToCart}
                  className="flex-grow py-5 bg-white border-4 border-purple-600 text-purple-600 rounded-[2rem] font-black uppercase tracking-widest text-[11px] hover:bg-purple-50 transition-all active:scale-95"
                >
                  Add to Basket 🧺
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

            {/* DIRECT BUY NOW - Goes straight to Payment */}
            <button
              onClick={handleBuyNow}
              className="w-full py-6 bg-purple-600 text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:bg-purple-700 active:scale-95 transition-all shadow-purple-200"
            >
              Buy It Now ✨
            </button>
          </div>
          
          <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] text-center italic">
            🧶 skipping the line to checkout...
          </p>
        </div>
      </div>
    </div>
  );
}