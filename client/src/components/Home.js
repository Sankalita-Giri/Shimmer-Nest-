import React from 'react';

export default function Home({ setCategory, searchTerm, setSearchTerm }) {
  const categories = [
    { name: "Keychains", icon: "🔑", color: "bg-blue-100", desc: "Cute companions for your keys" },
    { name: "Tote Bags", icon: "👜", color: "bg-pink-100", desc: "Hand-knotted stylish bags" },
    { name: "Hair Accessories", icon: "🎀", color: "bg-yellow-100", desc: "Floral clips and scrunchies" },
    { name: "Bouquets", icon: "💐", color: "bg-red-100", desc: "Flowers that never fade" },
    { name: "Mini Plushies", icon: "🧸", color: "bg-green-100", desc: "Soft, squishy little friends" }
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-b from-purple-50 to-white rounded-3xl mb-10">
        <h2 className="text-5xl font-black text-gray-800 mb-4">
          Handmade Crochet <br />
          <span className="text-purple-600 font-cursive">With Extra Love</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-lg mx-auto mb-8">
          Explore our collection of unique, handcrafted treasures designed to bring a little shimmer to your daily life.
        </p>
        
        {/* Search Bar in Hero */}
        <div className="relative max-w-md mx-auto">
          <input 
            type="text"
            placeholder="Search for 'Bee' or 'Bag'..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 shadow-xl border-none rounded-2xl focus:ring-2 focus:ring-purple-400 text-lg"
          />
          <span className="absolute left-4 top-4 text-2xl text-purple-300">🔍</span>
        </div>
      </section>

      {/* Categories Section */}
      <div className="px-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 ml-2">Shop by Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.name}
              onClick={() => setCategory(cat.name)}
              className={`${cat.color} p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border-2 border-transparent hover:border-purple-300 group`}
            >
              <div className="text-5xl mb-4 group-hover:bounce transition-transform">{cat.icon}</div>
              <h4 className="text-xl font-black text-gray-800 uppercase tracking-wider">
                {cat.name}
              </h4>
              <p className="text-gray-500 text-sm mt-1">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}