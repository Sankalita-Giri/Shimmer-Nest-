import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function SettingsPanel({ open, onClose, setView }) {
  const { customer, isLoggedIn, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    onClose();
    setView('home');
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[998] bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Slide-in panel from right */}
      <div className={`fixed top-0 right-0 h-full w-80 z-[999] shadow-2xl transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}
        ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-opacity-10"
          style={{ borderColor: dark ? '#374151' : '#f3e8ff' }}>
          <div>
            <h2 className="text-lg font-black tracking-tighter">Settings ⚙️</h2>
            <p className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${dark ? 'text-gray-400' : 'text-gray-400'}`}>
              ShimmerNest
            </p>
          </div>
          <button onClick={onClose}
            className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-lg transition-colors ${dark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-50 hover:bg-gray-100 text-gray-400'}`}>
            ✕
          </button>
        </div>

        <div className="p-6 space-y-3 overflow-y-auto h-[calc(100%-80px)]">

          {/* ── ACCOUNT SECTION ──────────────────────────── */}
          <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-4 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
            Account
          </p>

          {isLoggedIn ? (
            <>
              {/* Logged in card */}
              <div className={`rounded-2xl p-4 mb-2 ${dark ? 'bg-gray-800' : 'bg-purple-50'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white font-black text-lg">
                    {customer?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-sm truncate">{customer?.name}</p>
                    <p className={`text-[10px] font-medium truncate ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {customer?.email}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { setView('myorders'); onClose(); }}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black text-sm transition-all active:scale-95 text-left ${dark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-purple-50'}`}>
                <span className="text-xl">📦</span>
                <div>
                  <p className="font-black text-sm">My Orders</p>
                  <p className={`text-[9px] font-medium ${dark ? 'text-gray-400' : 'text-gray-400'}`}>View & track your orders</p>
                </div>
                <span className={`ml-auto text-sm ${dark ? 'text-gray-500' : 'text-gray-300'}`}>→</span>
              </button>

              <button
                onClick={() => { setView('myorders'); onClose(); }}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black text-sm transition-all active:scale-95 text-left ${dark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-purple-50'}`}>
                <span className="text-xl">👤</span>
                <div>
                  <p className="font-black text-sm">My Profile</p>
                  <p className={`text-[9px] font-medium ${dark ? 'text-gray-400' : 'text-gray-400'}`}>Edit your details & address</p>
                </div>
                <span className={`ml-auto text-sm ${dark ? 'text-gray-500' : 'text-gray-300'}`}>→</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-4 rounded-2xl bg-red-50 hover:bg-red-100 transition-all active:scale-95 text-left">
                <span className="text-xl">🚪</span>
                <div>
                  <p className="font-black text-sm text-red-500">Logout</p>
                  <p className="text-[9px] font-medium text-red-300">Sign out of your account</p>
                </div>
              </button>
            </>
          ) : (
            <>
              <div className={`rounded-2xl p-4 mb-2 text-center ${dark ? 'bg-gray-800' : 'bg-purple-50'}`}>
                <div className="text-3xl mb-2">🌸</div>
                <p className={`font-black text-sm ${dark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Login to ShimmerNest
                </p>
                <p className={`text-[9px] font-medium mt-1 ${dark ? 'text-gray-400' : 'text-gray-400'}`}>
                  Track orders & checkout faster
                </p>
              </div>

              <button
                onClick={() => { setView('login'); onClose(); }}
                className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-700 active:scale-95 transition-all">
                Login / Register →
              </button>
            </>
          )}

          {/* Divider */}
          <div className={`my-4 border-t ${dark ? 'border-gray-700' : 'border-purple-50'}`} />

          {/* ── APPEARANCE SECTION ───────────────────────── */}
          <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-4 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
            Appearance
          </p>

          {/* Dark / Light toggle */}
          <div className={`flex items-center justify-between p-4 rounded-2xl ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3">
              <span className="text-xl">{dark ? '🌙' : '☀️'}</span>
              <div>
                <p className="font-black text-sm">{dark ? 'Dark Mode' : 'Light Mode'}</p>
                <p className={`text-[9px] font-medium ${dark ? 'text-gray-400' : 'text-gray-400'}`}>
                  {dark ? 'Switch to light' : 'Switch to dark'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${dark ? 'bg-purple-600' : 'bg-gray-200'}`}>
              <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all duration-300 ${dark ? 'left-7' : 'left-0.5'}`} />
            </button>
          </div>

          {/* Divider */}
          <div className={`my-4 border-t ${dark ? 'border-gray-700' : 'border-purple-50'}`} />

          {/* ── SHOP LINKS ───────────────────────────────── */}
          <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-4 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
            Shop
          </p>

          {[
            { icon: '🏠', label: 'Home',        sub: 'Back to homepage',         view: 'home'       },
            { icon: '🛍️', label: 'All Products', sub: 'Browse all categories',    view: 'categories' },
            { icon: '🧺', label: 'My Basket',    sub: 'View your cart',           view: 'cart'       },
            { icon: '🎁', label: 'Gift Guide',   sub: 'Find the perfect gift',    view: 'home'       },
          ].map((item, i) => (
            <button key={i}
              onClick={() => { setView(item.view); onClose(); window.scrollTo(0,0); }}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all active:scale-95 ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="font-black text-sm">{item.label}</p>
                <p className={`text-[9px] font-medium ${dark ? 'text-gray-400' : 'text-gray-400'}`}>{item.sub}</p>
              </div>
            </button>
          ))}

          {/* Divider */}
          <div className={`my-4 border-t ${dark ? 'border-gray-700' : 'border-purple-50'}`} />

          {/* Footer note */}
          <p className={`text-center text-[9px] font-black uppercase tracking-widest ${dark ? 'text-gray-600' : 'text-gray-200'}`}>
            Made with 💜 by ShimmerNest
          </p>
        </div>
      </div>
    </>
  );
}