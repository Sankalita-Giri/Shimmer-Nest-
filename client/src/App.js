import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from "react-router-dom";
import { products } from "./data";
import OrderForm from "./components/OrderForm";
import ThankYou from "./components/ThankYou";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import SubCategoryList from "./components/SubCategoryList";
import AnnouncementBanner from "./components/AnnouncementBanner";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./components/LoginPage";
import MyOrders from "./components/MyOrders";
import { useAuth } from "./context/AuthContext";
import { useTheme } from "./context/ThemeContext";
import SettingsPanel from "./components/SettingsPanel";
import AllCategories from "./components/AllCategories";

// ── Pricing constants ──────────────────────────────────────
const FREE_SHIPPING_MIN = 500;
const FREE_GIFT_MIN     = 300;

export default function App() {
  const { customer, isLoggedIn, getToken } = useAuth();
  const { dark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery]       = useState("");
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [toast, setToast]                   = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);

  // ── FETCH PRODUCTS FROM MONGODB ────────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/products`);
        if (res.ok) {
          const data = await res.json();
          setDbProducts(data);
        } else {
          // Fallback to local data if API fails
          setDbProducts(products);
        }
      } catch (err) {
        setDbProducts(products);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Use either DB products or fallback
  const currentProducts = dbProducts.length > 0 ? dbProducts : products;

  const subtotal   = cart.reduce((acc, item) => acc + (Number(item.price) * Number(item.qty)), 0);
  const totalQty   = cart.reduce((acc, item) => acc + Number(item.qty), 0);
  const amountToFreeShipping = FREE_SHIPPING_MIN - subtotal;

  // ── SECRET ADMIN ACCESS via URL hash ────────────────────────
  useEffect(() => {
    if (window.location.hash === '#shimmeradmin') {
      window.history.replaceState(null, '', window.location.pathname);
      navigate('/admin');
    }
  }, [navigate]);

  // ── MONGODB CART — load when customer logs in ─────────────
  useEffect(() => {
    if (!customer?.email) return;
    const token = getToken();
    if (!token) return;

    const loadCart = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/cart`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.ok) {
          const data = await res.json();
          if (data.items && data.items.length > 0) {
            setCart(data.items);
            showToast(`Welcome back! Your basket has ${data.items.length} item${data.items.length > 1 ? 's' : ''} 🧺`);
          }
        }
      } catch {}
    };
    loadCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer?.email]);

  // ── MONGODB CART — save whenever cart changes ───────────────
  useEffect(() => {
    if (!customer?.email) return;
    const token = getToken();
    if (!token) return;

    const saveCart = async () => {
      try {
        await fetch(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/cart`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ items: cart })
          }
        );
      } catch {}
    };

    const timer = setTimeout(saveCart, 1000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  // ── sparkle effect ─────────────────────────────────────────
  useEffect(() => {
    let lastTime = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 80) return;
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

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const addToCart = (product, qty, color, note, overridePrice) => {
    const finalPrice = overridePrice !== undefined ? overridePrice : product.price;
    setCart((prev) => [...prev, { 
      ...product, 
      price: finalPrice, // Store the price at the moment of adding
      cartId: Date.now(), 
      qty, 
      selectedColor: color, 
      note: note || "" 
    }]);
    showToast(`${product.name} added to your nest! 🧺`);
  };

  const removeFromCart = (cartId) => setCart((prev) => prev.filter((item) => item.cartId !== cartId));

  const updateQty = (cartId, newQty) => {
    if (newQty < 1) return;
    setCart((prev) => prev.map((item) => (item.cartId === cartId ? { ...item, qty: newQty } : item)));
  };

  const handleOrderSuccess = useCallback((orderData) => {
    setCompletedOrder(orderData);
    setCart([]);
    const token = getToken();
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/cart`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
    }
    navigate("/thankyou");
  }, [navigate, getToken]);

  const filteredProducts = currentProducts.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tag?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isCheckoutPath = location.pathname === "/thankyou" || location.pathname === "/admin";

  return (
    <div className={`min-h-screen flex flex-col selection:bg-pink-200 overflow-x-hidden transition-colors duration-300 ${dark ? "bg-gray-950 text-white" : "bg-[#FCF8FF] text-gray-900"}`}>

      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-purple-700 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl animate-fadeIn">
          {toast}
        </div>
      )}

      {!isCheckoutPath && <AnnouncementBanner />}

      {!isCheckoutPath && (
        <header className="py-8 md:py-12 px-6 max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8 relative z-50">
          <h1
            className="text-5xl font-black text-purple-700 tracking-tighter cursor-pointer hover:scale-105 transition-all italic select-none"
            onClick={() => { navigate("/"); setSearchQuery(""); }}
          >
            ShimmerNest<span className="text-pink-400">.</span>
          </h1>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-80 group/search">
              <input
                type="text" placeholder="Search magic..." value={searchQuery}
                className={`w-full p-4 px-8 rounded-[2rem] border-4 backdrop-blur-sm outline-none shadow-xl transition-all text-sm italic ${dark ? "bg-gray-800/80 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 shadow-gray-900" : "bg-white/80 border-white text-gray-800 focus:border-purple-200 shadow-purple-100/50"}`}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => { if (searchQuery) navigate("/search"); }}
              />
              
              {/* Instant Search Suggestions Dropdown */}
              {searchQuery && filteredProducts.length > 0 && (
                <div className={`absolute top-full left-0 right-0 mt-3 p-3 rounded-[2rem] border-4 shadow-2xl z-[100] animate-fadeIn ${dark ? 'bg-gray-900 border-purple-900/40 shadow-black' : 'bg-white border-white'}`}>
                  <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest px-4 mb-3">Top Matches ✨</p>
                  <div className="space-y-2">
                    {filteredProducts.slice(0, 4).map(prod => (
                      <div 
                        key={prod.id}
                        onClick={() => {
                          setSearchQuery("");
                          navigate(`/product/${prod.id}`);
                        }}
                        className={`flex items-center gap-3 p-2 rounded-2xl cursor-pointer transition-all hover:translate-x-1 ${dark ? 'hover:bg-purple-900/30' : 'hover:bg-purple-50'}`}
                      >
                        <img src={prod.image} alt="" className="w-10 h-10 rounded-xl object-cover shadow-sm" />
                        <div className="flex-grow min-w-0">
                          <p className={`text-[11px] font-black truncate ${dark ? 'text-purple-100' : 'text-gray-800'}`}>{prod.name}</p>
                          <p className="text-[9px] font-bold text-purple-500 uppercase tracking-tighter">₹{prod.price} · {prod.category}</p>
                        </div>
                        <span className="text-purple-300 opacity-40">→</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => navigate("/search")}
                    className="w-full mt-3 py-2 text-[9px] font-black uppercase text-purple-400 hover:text-purple-600 transition-colors border-t border-purple-50 pt-3"
                  >
                    See all {filteredProducts.length} results
                  </button>
                </div>
              )}

              {searchQuery ? (
                <button onClick={() => { setSearchQuery(""); navigate("/"); }} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-purple-400 font-black">✕</button>
              ) : (
                <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-30 cursor-default">🔍</span>
              )}
            </div>
            <button onClick={() => navigate("/cart")} className={`relative p-4 rounded-3xl border-4 shadow-xl transition-all active:scale-90 ${dark ? "bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-gray-900" : "bg-white border-white hover:bg-purple-50 shadow-purple-100/50"}`}>
              <span className="text-2xl">🧺</span>
              {cart.length > 0 && (
                <span className="absolute -top-3 -right-3 bg-pink-500 text-white text-[10px] w-7 h-7 rounded-full flex items-center justify-center font-black animate-bounce shadow-lg border-2 border-white">
                  {cart.length}
                </span>
              )}
            </button>
            <button onClick={() => setSettingsOpen(true)} className={`p-4 rounded-3xl border-4 shadow-xl transition-all active:scale-90 ${dark ? "bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-gray-900" : "bg-white border-white hover:bg-purple-50 shadow-purple-100/50"}`}>
              <span className="text-xl">⚙️</span>
            </button>
          </div>
        </header>
      )}

      <main className={`flex-grow w-full ${location.pathname === "/" ? "pb-0" : "pb-20"} ${!isCheckoutPath ? "max-w-6xl mx-auto px-6" : ""}`}>
        <Routes>
          <Route path="/" element={<Home setView={navigate} setSelectedProduct={(p) => navigate(`/product/${p.id}`)} setActiveCat={(c) => navigate(`/category/${c}`)} products={currentProducts} loading={loading} />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/categories" element={<AllCategories setView={navigate} setActiveCat={(c) => navigate(`/category/${c}`)} products={currentProducts} />} />
          <Route path="/category/:catId" element={<SubCategoryListWrapper navigate={navigate} />} />
          <Route path="/category/:catId/:subCatId" element={<ProductListWrapper navigate={navigate} products={currentProducts} loading={loading} />} />
          <Route path="/product/:productId" element={<ProductDetailWrapper addToCart={addToCart} navigate={navigate} isLoggedIn={isLoggedIn} products={currentProducts} />} />
          <Route path="/search" element={
            <div className="animate-fadeIn">
              <h2 className={`text-4xl font-black italic mb-10 ${dark ? 'text-white' : 'text-gray-800'}`}>Search Results<span className="text-pink-400">.</span></h2>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => navigate(`/product/${prod.id}`)}
                      className={`p-4 rounded-[3rem] shadow-xl border-4 cursor-pointer hover:-translate-y-2 transition-all group ${dark ? 'bg-gray-900 border-purple-900/40' : 'bg-white border-white'}`}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-[2.2rem] mb-4">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <h3 className={`font-black text-center truncate px-2 ${dark ? 'text-purple-100' : 'text-gray-800'}`}>{prod.name}</h3>
                      <p className="text-purple-500 font-black text-center italic mt-1">₹{prod.price}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`text-center py-32 rounded-[4rem] border-4 border-dashed ${dark ? 'bg-purple-950/30 border-purple-800/40' : 'bg-white/50 border-purple-100'}`}>
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className={`text-2xl font-black italic mb-2 ${dark ? 'text-white' : 'text-gray-800'}`}>No Results Found</h3>
                </div>
              )}
            </div>
          } />
          <Route path="/cart" element={<CartView cart={cart} dark={dark} navigate={navigate} updateQty={updateQty} removeFromCart={removeFromCart} subtotal={subtotal} totalQty={totalQty} amountToFreeShipping={amountToFreeShipping} isLoggedIn={isLoggedIn} />} />
          <Route path="/checkout" element={<OrderForm cart={cart} customer={customer} goBack={() => navigate("/cart")} onOrderSuccess={handleOrderSuccess} />} />
          <Route path="/login" element={<LoginPage setView={navigate} redirectAfter="home" />} />
          <Route path="/my-orders" element={<MyOrders setView={navigate} />} />
          <Route path="/admin" element={<AdminDashboard goBack={() => navigate("/")} />} />
          <Route path="/thankyou" element={<ThankYou order={completedOrder} onContinue={() => { setCompletedOrder(null); navigate("/"); }} />} />
        </Routes>
      </main>

      {!isCheckoutPath && <Footer setView={navigate} />}
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} setView={navigate} />
      <div className="fixed -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-[500px] h-[500px] bg-pink-100/30 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </div>
  );
}

// ── Wrapper Components to handle URL Params ──────────────────

function SubCategoryListWrapper({ navigate }) {
  const { catId } = useParams();
  return <SubCategoryList activeCat={catId} setSubCat={(sc) => navigate(`/category/${catId}/${sc}`)} setView={navigate} goBack={() => navigate("/categories")} />;
}

function ProductListWrapper({ navigate, products, loading }) {
  const { catId, subCatId } = useParams();
  return <ProductList category={catId} subCat={subCatId} setSelectedProduct={(p) => navigate(`/product/${p.id}`)} setView={navigate} goBack={() => navigate(`/category/${catId}`)} products={products} loading={loading} />;
}

function ProductDetailWrapper({ addToCart, navigate, isLoggedIn, products }) {
  const { productId } = useParams();
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return <div className="py-20 text-center font-black text-2xl italic mt-10">Product not found 🌸</div>;
  return (
    <ProductDetail product={product} addToCart={addToCart}
      goBack={() => navigate(-1)}
      navigateToCart={() => navigate("/cart")}
      navigateToCheckout={() => isLoggedIn ? navigate("/checkout") : navigate("/login")}
    />
  );
}

function CartView({ cart, dark, navigate, updateQty, removeFromCart, subtotal, totalQty, amountToFreeShipping, isLoggedIn }) {
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
}