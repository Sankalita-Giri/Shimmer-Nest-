import React from 'react';
import products from "../data/products";

export default function ProductList({ category, setSelectedProduct, goBack }) {
  // Logic: Filter the big list to only show items from the clicked category
  const items = products.filter(p => p.category === category);

  return (
    <div className="p-4">
      <button 
        onClick={goBack} 
        className="mb-6 text-purple-600 font-bold hover:underline flex items-center gap-2"
      >
        ← Back to Categories
      </button>

      <h2 className="text-3xl font-black text-gray-800 mb-8 capitalize">
        {category} Collection
      </h2>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <img src={item.image} alt={item.name} className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-gray-800 leading-tight">{item.name}</h3>
                <p className="text-purple-600 font-black mt-1">₹{item.price}</p>
                <button
                  className="w-full bg-gray-900 text-white py-2 mt-4 rounded-xl font-bold text-sm hover:bg-purple-700 transition-colors"
                  onClick={() => setSelectedProduct(item)}
                >
                  SELECT
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl">
          <p className="text-gray-400 font-medium">Working on new {category} designs... ✨</p>
        </div>
      )}
    </div>
  );
}