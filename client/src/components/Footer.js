import React from 'react';

export default function Footer({ setView }) {
  const currentYear = new Date().getFullYear();
  const sellerPhone = process.env.REACT_APP_SELLER_PHONE || '';
  const instagramHandle = process.env.REACT_APP_INSTAGRAM_HANDLE || 'shimmernest';

  return (
    <footer className="mt-20 border-t border-purple-50 bg-white/50 backdrop-blur-sm pt-16 pb-8 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-purple-700 tracking-tighter">
            ShimmerNest<span className="text-pink-300">.</span>
          </h2>
          <p className="text-gray-400 text-sm font-medium leading-relaxed">
            Crafting small joys and cozy treasures for your daily aesthetic.
            Every stitch is made with extra shimmer and a lot of love.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href={"https://instagram.com/" + instagramHandle} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 hover:bg-pink-100 transition-colors">
              <span role="img" aria-label="Instagram">📸</span>
            </a>
            <a href={sellerPhone ? "https://wa.me/" + sellerPhone : '#'} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-400 hover:bg-green-100 transition-colors">
              <span role="img" aria-label="WhatsApp">💬</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-black text-gray-800 uppercase tracking-[0.2em] mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm font-bold text-gray-400 uppercase tracking-tighter">
            <li>
              <button onClick={() => { setView('home'); window.scrollTo(0, 0); }} className="hover:text-purple-600 transition-colors">
                Back to Nest
              </button>
            </li>
            <li>
              <button onClick={() => { setView('cart'); window.scrollTo(0, 0); }} className="hover:text-purple-600 transition-colors">
                View My Basket
              </button>
            </li>
            <li>
              <button onClick={() => alert('Tracking feature coming soon!')} className="hover:text-purple-600 transition-colors">
                Track My Order
              </button>
            </li>
            <li>
              <button onClick={() => alert('Join our newsletter via Instagram!')} className="hover:text-purple-600 transition-colors">
                Join the Club
              </button>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-xs font-black text-gray-800 uppercase tracking-[0.2em] mb-6">Our Policies</h4>
          <ul className="space-y-3 text-sm font-bold text-gray-400 uppercase tracking-tighter">
            <li className="flex items-center text-gray-500">
              <span>📦</span><span className="ml-2">3-5 Days Shipping</span>
            </li>
            <li className="flex items-center text-gray-500">
              <span>🧶</span><span className="ml-2">100% Handmade</span>
            </li>
            <li className="flex items-center text-gray-500">
              <span>🎀</span><span className="ml-2">No Returns / Refunds</span>
            </li>
            <li className="flex items-center text-gray-500">
              <span>💌</span><span className="ml-2 normal-case">support@shimmernest.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-5xl mx-auto border-t border-purple-50 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-purple-200 uppercase tracking-widest">
        <p>© {currentYear} ShimmerNest Studio. All Rights Reserved.</p>
        <p className="mt-2 md:mt-0">Made with 💜 by your favorite crochet enthusiast</p>
      </div>
    </footer>
  );
}