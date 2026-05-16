import React from 'react';

const CartView = ({ cart, dark, navigate, updateQty, removeFromCart, subtotal, totalQty, amountToFreeShipping, isLoggedIn, FREE_SHIPPING_MIN, FREE_GIFT_MIN }) => {
  return (
    <div className="animate-fadeIn max-w-2xl mx-auto">
      <button onClick={() => navigate('/')}
        className="mb-6 text-purple-400 font-black text-[10px] uppercase tracking-widest hover:text-purple-500 transition-colors flex items-center gap-1">
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Continue Shopping
      </button>
      <h2 className={`text-5xl font-black italic mb-12 ${dark ? 'text-white' : 'text-gray-800'}`}>Your Basket<span className="text-pink-400">.</span></h2>

      {cart.length > 0 ? (
        <div className="space-y-6">
          {/* Perk Progress Bar */}
          {subtotal < FREE_SHIPPING_MIN && (
            <div className={`rounded-[2rem] border-4 shadow-lg p-5 ${dark ? 'bg-gray-900 border-purple-900/40' : 'bg-white border-white'}`}>
              <div className="flex justify-between items-center mb-2">
                <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest">
                  {amountToFreeShipping > 0
                    ? `Add ₹${amountToFreeShipping} more for FREE shipping! 🚚`
                    : "You've unlocked FREE shipping! 🎉"}
                </p>
                <p className={`text-[9px] font-black ${dark ? 'text-purple-400' : 'text-gray-400'}`}>₹{subtotal} / ₹{FREE_SHIPPING_MIN}</p>
              </div>
              <div className="w-full h-2 bg-purple-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min((subtotal / FREE_SHIPPING_MIN) * 100, 100)}%` }}
                />
              </div>
              {subtotal >= FREE_GIFT_MIN && subtotal < FREE_SHIPPING_MIN && (
                <p className="text-[9px] font-black text-green-500 mt-2">🎁 Free gift unlocked on your order!</p>
              )}
            </div>
          )}

          {subtotal >= FREE_SHIPPING_MIN && (
            <div className="bg-green-50 border-2 border-green-100 rounded-[2rem] p-4 text-center">
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">
                🎉 Free Shipping Unlocked! {subtotal >= FREE_GIFT_MIN ? "& 🎁 Free Gift too!" : ""}
              </p>
            </div>
          )}

          {/* Cart Items */}
          {cart.map((item) => (
            <div key={item.cartId} className={`flex items-center p-6 rounded-[3rem] shadow-xl border-4 gap-4 ${dark ? 'bg-gray-900 border-purple-900/40' : 'bg-white border-white'}`}>
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-[2rem] object-cover flex-none"
                onError={(e) => { e.target.src = "https://placehold.co/100x100?text=✨"; }}
              />
              <div className="flex-grow min-w-0">
                <h4 className={`font-black text-lg truncate ${dark ? 'text-purple-100' : 'text-gray-800'}`}>{item.name}</h4>
                <p className="text-[10px] text-purple-400 font-black uppercase mt-1">
                  {item.selectedColor}{item.note && ` • "${item.note}"`}
                </p>
                <p className={`text-[10px] font-black italic mt-1 ${dark ? 'text-purple-500' : 'text-purple-400'}`}>
                  ₹{item.price} each
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <button onClick={() => updateQty(item.cartId, item.qty - 1)} className={`w-7 h-7 rounded-full font-black hover:bg-purple-200 transition-colors ${dark ? 'bg-purple-900/60 text-purple-300' : 'bg-purple-50 text-purple-400'}`}>−</button>
                  <span className={`font-black text-sm ${dark ? 'text-purple-100' : 'text-gray-800'}`}>{item.qty}</span>
                  <button onClick={() => updateQty(item.cartId, item.qty + 1)} className={`w-7 h-7 rounded-full font-black hover:bg-purple-200 transition-colors ${dark ? 'bg-purple-900/60 text-purple-300' : 'bg-purple-50 text-purple-400'}`}>+</button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 flex-none">
                <p className="text-purple-600 font-black text-xl italic">₹{item.price * item.qty}</p>
                <button onClick={() => removeFromCart(item.cartId)} className="text-gray-200 hover:text-red-400 font-black text-lg transition-colors">✕</button>
              </div>
            </div>
          ))}

          {/* Cart Total + Checkout */}
          <div className="mt-4 bg-purple-900 p-10 rounded-[4rem] border-[12px] border-white shadow-2xl text-center">
            <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-2">Items Total</p>
            <p className="text-6xl font-black text-white italic">₹{subtotal}</p>
            <p className={`text-[9px] ${dark ? 'text-purple-300' : 'text-purple-300'} font-medium mt-2 mb-6`}>
              {totalQty} {totalQty === 1 ? "piece" : "pieces"} · Delivery & gift wrap calculated at checkout
            </p>
            <button
              onClick={() => isLoggedIn ? navigate("/checkout") : navigate("/login")}
              className="w-full py-6 bg-white text-purple-900 rounded-[2.5rem] font-black uppercase text-xs tracking-widest hover:bg-purple-50 transition-colors active:scale-95"
            >
              {isLoggedIn ? "Proceed to Checkout ✨" : "Login to Checkout 🔐"}
            </button>
          </div>
        </div>
      ) : (
        <div className={`text-center py-32 rounded-[5rem] shadow-2xl border-8 ${dark ? 'bg-gray-900 border-purple-900/40' : 'bg-white border-white'}`}>
          <div className="text-6xl mb-6">🧵</div>
          <h3 className={`text-2xl font-black italic ${dark ? 'text-white' : 'text-gray-800'}`}>Your nest is empty!</h3>
          <p className={`text-sm font-medium mt-3 mb-8 ${dark ? 'text-purple-300' : 'text-gray-400'}`}>Fill it with handmade magic ✨</p>
          <button onClick={() => navigate("/")} className="px-10 py-4 bg-purple-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-purple-700 transition-colors active:scale-95">
            Start Shopping ✨
          </button>
        </div>
      )}
    </div>
  );
};

export default CartView;
