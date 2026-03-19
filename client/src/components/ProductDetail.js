import React, { useState } from 'react';

export default function ProductDetail({ product, addToCart, goBack }) {
  const [mainImg, setMainImg] = useState(product.image);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState("Original");
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);

  const allImages = product.images || [product.image];

  // Use colors from product data if available, fallback to defaults
  const colorOptions = product.colors?.length > 0
    ? product.colors
    : ["Original", "Pastel", "Midnight"];

  const handleAddToCart = () => {
    addToCart(product, qty, color, note);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="animate-fadeIn">
      <button
        onClick={goBack}
        className="mb-6 text-[10px] font-black uppercase text-purple-400 hover:text-purple-600 transition-colors flex items-center gap-1"
      >
        ← Back to List
      </button>

      <div className="grid md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-[4rem] shadow-2xl border-8 border-white">

        {/* LEFT: GALLERY */}
        <div className="space-y-6">
          <div className="aspect-square rounded-[3rem] overflow-hidden bg-gray-50 border-4 border-purple-50">
            <img
              src={mainImg}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
              onError={(e) => { e.target.src = 'https://placehold.co/600x600?text=ShimmerNest'; }}
            />
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {allImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} view ${i + 1}`}
                  onClick={() => setMainImg(img)}
                  onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=✨'; }}
                  className={`w-20 h-20 flex-none rounded-2xl cursor-pointer border-4 object-cover transition-all ${
                    mainImg === img
                      ? 'border-purple-400 scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: DETAILS & ACTIONS */}
        <div className="flex flex-col justify-center space-y-8">

          {/* Tag & Name */}
          <div>
            {product.tag && (
              <span className="bg-purple-100 text-purple-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                {product.tag}
              </span>
            )}
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 italic mt-4 tracking-tighter leading-tight">
              {product.name}
            </h2>
            {product.description && (
              <p className="text-gray-400 text-sm font-medium mt-3 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* Price */}
          <p className="text-6xl font-black text-purple-600 tracking-tighter">₹{product.price}</p>

          {/* Color Selector */}
          <div className="space-y-3">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
              Select Color ✨
              <span className="ml-2 text-purple-500 normal-case font-bold">— {color}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-5 py-2 rounded-xl border-2 font-black text-[10px] uppercase transition-all ${
                    color === c
                      ? 'bg-purple-600 border-purple-600 text-white shadow-md'
                      : 'bg-white border-gray-100 text-gray-400 hover:border-purple-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Note */}
          <div className="space-y-3">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
              Custom Note 🎀 <span className="normal-case font-medium">(optional)</span>
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ex: Add a tiny blue bow! 🎀"
              rows={3}
              className="w-full p-4 rounded-3xl bg-purple-50/50 border-2 border-white focus:border-purple-200 outline-none text-sm italic resize-none transition-colors"
            />
          </div>

          {/* Qty + Add to Cart */}
          <div className="flex gap-4 items-stretch">
            <div className="flex items-center space-x-4 bg-purple-50/50 px-5 rounded-3xl border-2 border-white">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="font-black text-xl text-purple-400 hover:text-purple-700 transition-colors w-8"
              >
                −
              </button>
              <span className="font-black text-xl text-gray-800 min-w-[1.5rem] text-center">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="font-black text-xl text-purple-400 hover:text-purple-700 transition-colors w-8"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-grow py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {added ? 'Added! ✅' : 'Add to Basket 🧺'}
            </button>
          </div>

          {/* Stock / Info Badge */}
          {product.stock !== undefined && (
            <p className={`text-[10px] font-black uppercase tracking-widest text-center ${
              product.stock > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {product.stock > 0 ? `✅ ${product.stock} in stock` : '❌ Out of stock'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}