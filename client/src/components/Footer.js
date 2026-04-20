import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Footer({ setView }) {
  const { dark } = useTheme();
  const currentYear = new Date().getFullYear();
  const sellerPhone = process.env.REACT_APP_SELLER_PHONE || '';
  const instagramHandle = process.env.REACT_APP_INSTAGRAM_HANDLE || '_.shimmernest._';

  return (
    <footer className={`border-t backdrop-blur-sm ${dark ? 'border-purple-900/40 bg-gray-950/80' : 'border-purple-50 bg-white/50'}`}>

      {/* ── WHY SHIMMERNEST ── */}
      <div className="px-6 pt-16 pb-12 max-w-5xl mx-auto">
        <div
          className="rounded-[3.5rem] p-10 md:p-14 text-center relative overflow-hidden border-8 border-white shadow-2xl"
          style={{ background: "linear-gradient(135deg, #4f1dbb 0%, #7c3aed 50%, #be185d 100%)" }}
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <p className="text-purple-200 text-[9px] font-black uppercase tracking-[0.4em] mb-3">Why Choose Us</p>
          <h2 className="text-white font-black tracking-tighter mb-3" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            Why ShimmerNest? 🌸
          </h2>
          <p className="text-purple-200 font-medium text-sm max-w-lg mx-auto mb-10">
            We don't just sell products — we craft tiny moments of joy, one stitch at a time.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: "🧶", title: "100% Handmade",    desc: "Every piece crocheted by hand with care" },
              { icon: "🎨", title: "Custom Colors",    desc: "Pick your shade, we'll make it yours"    },
              { icon: "📦", title: "5–7 Day Delivery", desc: "Carefully packed and shipped with love"  },
              { icon: "💌", title: "Gift Ready",       desc: "Add gift wrap + personal message"        },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-[2rem] p-5 border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-white font-black text-sm">{item.title}</p>
                <p className="text-purple-200 text-[10px] font-medium mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER LINKS ── */}
      <div className="px-6 pb-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-purple-600 tracking-tighter">
              ShimmerNest<span className="text-pink-400">.</span>
            </h2>
            <p className={`text-sm font-medium leading-relaxed ${dark ? 'text-purple-300' : 'text-gray-400'}`}>
              Handmade crochet treasures crafted with love and extra shimmer. 💜
            </p>
            <div className="flex space-x-3 pt-2">
              <a href={"https://instagram.com/" + instagramHandle} target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 hover:bg-pink-100 transition-colors">📸</a>
              <a href={sellerPhone ? "https://wa.me/" + sellerPhone : '#'} target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-400 hover:bg-green-100 transition-colors">💬</a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-5 ${dark ? 'text-purple-200' : 'text-gray-800'}`}>Shop</h4>
            <ul className={`space-y-3 text-sm font-bold ${dark ? 'text-purple-400' : 'text-gray-400'}`}>
              <li><button onClick={() => { setView('home'); window.scrollTo(0,0); }} className="hover:text-purple-600 transition-colors">Home</button></li>
              <li><button onClick={() => { setView('categories'); window.scrollTo(0,0); }} className="hover:text-purple-600 transition-colors">All Products</button></li>
              <li><button onClick={() => { setView('cart'); window.scrollTo(0,0); }} className="hover:text-purple-600 transition-colors">My Basket</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-5 ${dark ? 'text-purple-200' : 'text-gray-800'}`}>Contact</h4>
            <ul className={`space-y-3 text-sm font-bold ${dark ? 'text-purple-400' : 'text-gray-400'}`}>
              <li><a href="mailto:support@shimmernest.com" className="hover:text-purple-600 transition-colors normal-case">support@shimmernest.com</a></li>
              <li><a href={"https://instagram.com/" + instagramHandle} target="_blank" rel="noreferrer" className="hover:text-purple-600 transition-colors">@{instagramHandle}</a></li>
              <li><a href={sellerPhone ? "https://wa.me/" + sellerPhone : '#'} target="_blank" rel="noreferrer" className="hover:text-purple-600 transition-colors">WhatsApp Us</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-5 ${dark ? 'text-purple-200' : 'text-gray-800'}`}>Policies</h4>
            <ul className={`space-y-3 text-sm font-bold ${dark ? 'text-purple-400' : 'text-gray-400'}`}>
              <li className="flex items-center gap-2"><span>📦</span> 5–7 Days Delivery</li>
              <li className="flex items-center gap-2"><span>🧶</span> 100% Handmade</li>
              <li className="flex items-center gap-2"><span>🎀</span> No Returns / Refunds</li>
              <li className="flex items-center gap-2"><span>🚚</span> Free Ship ₹500+</li>
              <li className="flex items-center gap-2"><span>🎁</span> Free Gift ₹300+</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest ${dark ? 'border-purple-900/40 text-purple-600' : 'border-purple-50 text-purple-200'}`}>
          <p>© {currentYear} ShimmerNest Studio. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">Made with 💜 by your favourite crochet enthusiast</p>
        </div>
      </div>
    </footer>
  );
}