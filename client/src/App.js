import React, { useState, useEffect, useCallback } from "react";
import SplashScreen from "./components/SplashScreen";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { products } from "./data";
import OrderForm from "./components/OrderForm";
import ThankYou from "./components/ThankYou";
import Home from "./components/Home";
import Footer from "./components/Footer";
import AnnouncementBanner from "./components/AnnouncementBanner";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./components/LoginPage";
import MyOrders from "./components/MyOrders";
import { useAuth } from "./context/AuthContext";
import { useTheme } from "./context/ThemeContext";
import SettingsPanel from "./components/SettingsPanel";
import AllCategories from "./components/AllCategories";
import CartView from "./components/CartView";
import { SubCategoryListWrapper, ProductListWrapper, ProductDetailWrapper } from "./components/utils/RouteWrappers";
import ScrollToTop from "./components/utils/ScrollToTop";

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
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('splashShown'));

  // ── FETCH PRODUCTS FROM MONGODB ────────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/products`);
        if (res.ok) {
          const data = await res.json();
          setDbProducts(data);
        } else {
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

  // ── MONGODB CART ──────────────────────────────────────────
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
  }, [customer?.email, getToken]);

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
  }, [cart, customer?.email, getToken]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const addToCart = (product, qty, color, note, overridePrice) => {
    const finalPrice = overridePrice !== undefined ? overridePrice : product.price;
    setCart((prev) => [...prev, { 
      ...product, 
      price: finalPrice,
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

      {showSplash && (
        <SplashScreen onDone={() => {
          sessionStorage.setItem('splashShown', 'true');
          setShowSplash(false);
        }} />
      )}

      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-purple-700 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl animate-fadeIn">
          {toast}
        </div>
      )}

      {!isCheckoutPath && <AnnouncementBanner />}

      {!isCheckoutPath && (
        <header className="py-8 md:py-12 px-6 max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8 relative z-50">
          <div
            className="flex items-center gap-5 cursor-pointer hover:scale-105 transition-all select-none"
            onClick={() => { navigate("/"); setSearchQuery(""); }}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-200 shadow-xl shadow-purple-100 bg-white flex-shrink-0">
              <img
                src="/shimmer-nest-logo.png"
                alt="Shimmer-Nest"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-5xl font-black text-purple-700 tracking-tighter italic">
              Shimmer<span className="text-pink-400">Nest</span><span className="text-pink-400">.</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-80 group/search">
              <input
                type="text" placeholder="Search magic..." value={searchQuery}
                className={`w-full p-4 px-8 rounded-[2rem] border-4 backdrop-blur-sm outline-none shadow-xl transition-all text-sm italic ${dark ? "bg-gray-800/80 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 shadow-gray-900" : "bg-white/80 border-white text-gray-800 focus:border-purple-200 shadow-purple-100/50"}`}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => { if (searchQuery) navigate("/search"); }}
              />
              
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
          <Route path="/" element={<Home setView={navigate} setSelectedProduct={(p) => navigate(`/product/${p.id}`)} products={currentProducts} loading={loading} />} />
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
          <Route path="/cart" element={<CartView cart={cart} dark={dark} navigate={navigate} updateQty={updateQty} removeFromCart={removeFromCart} subtotal={subtotal} totalQty={totalQty} amountToFreeShipping={amountToFreeShipping} isLoggedIn={isLoggedIn} FREE_SHIPPING_MIN={FREE_SHIPPING_MIN} FREE_GIFT_MIN={FREE_GIFT_MIN} />} />
          <Route path="/checkout" element={<OrderForm cart={cart} customer={customer} goBack={() => navigate("/cart")} onOrderSuccess={handleOrderSuccess} />} />
          <Route path="/login" element={<LoginPage setView={navigate} redirectAfter="home" />} />
          <Route path="/my-orders" element={<MyOrders setView={navigate} />} />
          <Route path="/admin" element={<AdminDashboard goBack={() => navigate("/")} />} />
          <Route path="/thankyou" element={<ThankYou order={completedOrder} onContinue={() => { setCompletedOrder(null); navigate("/"); }} />} />
        </Routes>
      </main>

      {!isCheckoutPath && <Footer setView={navigate} />}
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} setView={navigate} />
      <ScrollToTop dark={dark} />
      <div className="fixed -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-[500px] h-[500px] bg-pink-100/30 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </div>
  );
}