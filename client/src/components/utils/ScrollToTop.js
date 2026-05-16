import React, { useState, useEffect } from 'react';

const ScrollToTop = ({ dark }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        className={`w-12 h-12 rounded-full shadow-2xl flex items-center justify-center text-xl transition-all active:scale-90 group ${dark ? 'bg-purple-600 text-white' : 'bg-white text-purple-600'}`}
      >
        <span className="group-hover:-translate-y-1 transition-transform">↑</span>
      </button>
    </div>
  );
};

export default ScrollToTop;
