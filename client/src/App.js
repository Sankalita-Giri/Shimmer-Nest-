import React, { useState, useEffect, useCallback } from "react";
import { products } from "./data";

// --- COMPONENTS ---
import OrderForm from "./components/OrderForm";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import SubCategoryList from "./components/SubCategoryList";

export default function App() {
  // --- NAVIGATION STATE ---
  const [view, setView] = useState("home");
  const [activeCat, setActiveCat] = useState(null);
  const [activeSubCat, setActiveSubCat] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [prevView, setPrevView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  // --- CART STATE ---
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  // --- CALCULATION ---
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // --- SPARKLE EFFECT (throttled) ---
  useEffect(() => {
    let lastTime = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 80) return; // throttle to every 80ms
      lastTime = now;

      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- TOAST HELPER ---
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  // --- NAVIGATION HELPER ---
  const changeView = useCallback((newView) => {
    setPrevView((prev) => prev);
    setView(newView);
    window.scrollTo(0, 0);
  }, []);

  // --- CART LOGIC ---
  const addToCart = (product, qty, color, note) => {
    const cartItem = {
      ...product,
      cartId: Date.now(),
      qty,
      selectedColor: color,
      note: note || "",
    };
    setCart((prev) => [...prev, cartItem]);
    showToast(`${product.name} added to your nest! 🧺`);
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQty = (cartId, newQty) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) => item.cartId === cartId ? { ...item, qty: newQty } : item)
    );
  };

  // --- SEARCH LOGIC ---
  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tag?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF8FF] selection:bg-pink-200 overflow-x-hidden">

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-purple-700 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl animate-fadeIn">
          {toast}
        </div>
      )}

      {/* --- HEADER --- */}
      <header className="py-8 md:py-12 px-6 max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8 relative z-50">
        <h1
          className="text-5xl font-black text-purple-700 tracking-tighter cursor-pointer hover:scale-105 transition-all italic select-none"
          onClick={() => { changeView("home"); setSearchQuery(""); }}
        >
          ShimmerNest<span className="text-pink-400">.</span>
        </h1>

        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80 group">
            <input
              type="text"
              placeholder="Search magic..."
              value={searchQuery}
              className="w-full p-4 px-8 rounded-[2rem] border-4 border-white bg-white/80 backdrop-blur-sm outline-none shadow-xl shadow-purple-100/50 focus:border-purple-200 transition-all text-sm italic"
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length > 0) changeView("search");
                else changeView("home");
              }}
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); changeView("home"); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-purple-400 font-black"
              >
                ✕
              </button>
            )}
            {!searchQuery && (
              <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-30 cursor-default">🔍</span>
            )}
          </div>

          <button
            onClick={() => changeView("cart")}
            className="relative p-4 bg-white rounded-3xl border-4 border-white shadow-xl shadow-purple-100/50 hover:bg-purple-50 transition-all active:scale-90"
          >
            <span className="text-2xl">🧺</span>
            {cart.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-pink-500 text-white text-[10px] w-7 h-7 rounded-full flex items-center justify-center font-black animate-bounce shadow-lg border-2 border-white">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow max-w-6xl mx-auto px-6 w-full pb-20">

        {/* HOME */}
        {view === "home" && (
          <Home
            setView={changeView}
            setActiveCat={setActiveCat}
            setSelectedProduct={(p) => {
              setSelectedProduct(p);
              setPrevView("home");
              changeView("product-detail");
            }}
          />
        )}

        {/* SUB-CATEGORY LIST */}
        {view === "subcat" && (
          <SubCategoryList
            activeCat={activeCat}
            setSubCat={setActiveSubCat}
            setView={changeView}
            goBack={() => changeView("home")}
          />
        )}

        {/* PRODUCT LIST */}
        {view === "productList" && (
          <ProductList
            category={activeCat}
            subCat={activeSubCat}
            setSelectedProduct={(p) => {
              setSelectedProduct(p);
              setPrevView("productList");
              changeView("product-detail");
            }}
            setView={changeView}
            goBack={() => changeView("subcat")}
          />
        )}

        {/* SEARCH RESULTS */}
        {view === "search" && (
          <div className="animate-fadeIn">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-gray-800 italic">
                Results for "{searchQuery}"
              </h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setSelectedProduct(prod);
                      setPrevView("search");
                      changeView("product-detail");
                    }}
                    className="bg-white p-4 rounded-[3rem] shadow-xl border-4 border-white cursor-pointer hover:-translate-y-2 transition-all group"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-[2.2rem] mb-4">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=ShimmerNest'; }}
                      />
                    </div>
                    <h3 className="font-black text-gray-800 text-center truncate px-2">{prod.name}</h3>
                    <p className="text-purple-500 font-black text-center italic mt-1">₹{prod.price}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white/50 rounded-[4rem] border-4 border-dashed border-purple-100">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-black text-gray-800 italic mb-2">No Results Found</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                  Try searching for "bouquet", "keychain", or "tote"
                </p>
              </div>
            )}
          </div>
        )}

        {/* PRODUCT DETAIL */}
        {view === "product-detail" && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            addToCart={addToCart}
            goBack={() => changeView(prevView || "home")}
            setCart={setCart}
            changeView={changeView}
          />
        )}

        {/* CART */}
        {view === "cart" && (
          <div className="animate-fadeIn max-w-2xl mx-auto">
            <h2 className="text-5xl font-black text-gray-800 italic mb-12">
              Your Basket<span className="text-pink-400">.</span>
            </h2>

            {cart.length > 0 ? (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex items-center bg-white p-6 rounded-[3rem] shadow-xl border-4 border-white gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-[2rem] object-cover flex-none"
                      onError={(e) => { e.target.src = 'https://placehold.co/96x96?text=✨'; }}
                    />
                    <div className="flex-grow min-w-0">
                      <h4 className="font-black text-gray-800 text-lg truncate">{item.name}</h4>
                      <p className="text-[10px] text-purple-400 font-black uppercase mt-1">
                        {item.selectedColor} {item.note && `• "${item.note}"`}
                      </p>
                      {/* Qty Controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => updateQty(item.cartId, item.qty - 1)}
                          className="w-7 h-7 rounded-full bg-purple-50 text-purple-400 font-black hover:bg-purple-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="font-black text-gray-800 text-sm">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.cartId, item.qty + 1)}
                          className="w-7 h-7 rounded-full bg-purple-50 text-purple-400 font-black hover:bg-purple-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 flex-none">
                      <p className="text-purple-600 font-black text-xl italic">₹{item.price * item.qty}</p>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-gray-200 hover:text-red-400 font-black text-lg transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}

                {/* Cart Total */}
                <div className="mt-10 bg-purple-900 p-10 rounded-[4rem] border-[12px] border-white shadow-2xl text-center">
                  <p className="text-[10px] font-black text-purple-300 uppercase tracking-widest mb-2">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} · Free Love Included 💜
                  </p>
                  <p className="text-7xl font-black text-white italic">₹{cartTotal}</p>
                  <button
                    onClick={() => changeView("checkout")}
                    className="shimmer-btn mt-8 w-full py-6 bg-white text-purple-900 rounded-[2.5rem] font-black uppercase text-xs tracking-widest hover:bg-purple-50 transition-colors"
                  >
                    Proceed to Checkout ✨
                  </button>
                  <button
                    onClick={() => changeView("home")}
                    className="mt-4 text-purple-300 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors"
                  >
                    ← Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-[5rem] shadow-2xl border-8 border-white">
                <div className="text-8xl mb-6">🧺</div>
                <h3 className="text-2xl font-black text-gray-800 italic mb-3">Your nest is empty!</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">
                  Fill it with handmade magic 🧶
                </p>
                <button
                  onClick={() => changeView("home")}
                  className="px-10 py-4 bg-purple-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-purple-700 transition-colors shadow-lg"
                >
                  Start Shopping ✨
                </button>
              </div>
            )}
          </div>
        )}

        {/* CHECKOUT */}
        {view === "checkout" && (
          <OrderForm cart={cart} total={cartTotal} goBack={() => changeView("cart")} />
        )}
      </main>

      <Footer setView={changeView} />

      {/* Background Orbs */}
      <div className="fixed -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-[500px] h-[500px] bg-pink-100/30 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </div>
  );
}