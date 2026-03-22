import React, { useState } from 'react';
import ReviewSection from './ReviewSection';

export default function ProductDetail({ product, addToCart, goBack, navigateToCart, navigateToCheckout }) {
  const [mainImg, setMainImg] = useState(product.image);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState("Original");
  const [note, setNote] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  const allImages = product.images || [product.image];
  const colorOptions = product.colors?.length > 0 ? product.colors : ["Original", "Pastel", "Midnight"];

  const handleAddToCart = () => {
    addToCart(product, qty, color, note);
    setIsAdded(true);
  };

  const handleBuyNow = () => {
    addToCart(product, qty, color, note);
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

      <div className="grid md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-[4rem] shadow-2xl border-8 border-white">

        {/* LEFT: GALLERY */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="aspect-square rounded-[3rem] overflow-hidden bg-gray-50 border-4 border-purple-50 group relative">
            <img
              src={mainImg}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => { e.target.src = 'https://placehold.co/600x600?text=ShimmerNest'; }}
            />
            {/* Image count badge */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                {allImages.indexOf(mainImg) + 1} / {allImages.length}
              </div>
            )}
          </div>

          {/* Thumbnail grid — scrollable, handles up to 50 images */}
          {allImages.length > 1 && (
            <div>
              {/* For many images (wool) — show as grid */}
              {allImages.length > 8 ? (
                <div className="max-h-48 overflow-y-auto rounded-2xl border border-purple-50 p-2 bg-gray-50">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
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
            {product.tag && (
              <span className="bg-purple-100 text-purple-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                {product.tag}
              </span>
            )}
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 italic mt-4 tracking-tighter leading-tight">
              {product.name}
            </h2>
            <p className="text-6xl font-black text-purple-600 tracking-tighter mt-4">₹{product.price}</p>

            {/* Rating summary */}
            {product.rating && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} className={`text-sm ${s <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                  ))}
                </div>
                <span className="text-xs font-black text-gray-400 uppercase tracking-tight">
                  {product.rating} · {product.reviews || 0} reviews
                </span>
              </div>
            )}

            {product.description && (
              <p className="text-gray-400 text-sm font-medium mt-4 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* Color Selector */}
          <div className="space-y-3">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
              Select Shade — <span className="text-purple-500">{color}</span>
            </p>
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

          {/* Custom Note */}
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

          {/* Quantity & Actions */}
          <div className="space-y-4">
            <div className="flex gap-4 items-stretch">
              <div className="flex items-center space-x-4 bg-gray-50 px-5 rounded-3xl border-2 border-white shadow-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="font-black text-xl text-purple-400 w-8">−</button>
                <span className="font-black text-xl text-gray-800 w-6 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="font-black text-xl text-purple-400 w-8">+</button>
              </div>

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

            <button
              onClick={handleBuyNow}
              className="w-full py-6 bg-purple-600 text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:bg-purple-700 active:scale-95 transition-all shadow-purple-200"
            >
              Buy It Now ✨
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