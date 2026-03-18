import React, { useState } from 'react';
import Home from './components/Home';
import ProductList from './components/ProductList';
import OrderForm from './components/OrderForm';
import products from './data/products';

function App() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const resetToHome = () => {
    setActiveCategory(null);
    setSelectedProduct(null);
    setSearchTerm("");
  };  

  // Logic for search results
  const searchedProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 
            className="text-2xl font-black text-purple-700 cursor-pointer tracking-tighter"
            onClick={resetToHome}
          >
            SHIMMERNEST💜
          </h1>
          {activeCategory || selectedProduct || searchTerm ? (
            <button onClick={resetToHome} className="text-purple-600 font-bold text-sm">HOME</button>
          ) : null}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto pt-4">
        {/* VIEW 1: SEARCH RESULTS */}
        {searchTerm !== "" && !selectedProduct && (
          <div className="px-4">
            <button onClick={() => setSearchTerm("")} className="mb-4 text-purple-500">← Clear Search</button>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {searchedProducts.map(item => (
                <ProductCard key={item.id} item={item} onSelect={setSelectedProduct} />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: HOME PAGE */}
        {searchTerm === "" && !activeCategory && !selectedProduct && (
          <Home 
            setCategory={setActiveCategory} 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
        )}

        {/* VIEW 3: PRODUCT LIST */}
        {searchTerm === "" && activeCategory && !selectedProduct && (
          <ProductList 
            category={activeCategory} 
            setSelectedProduct={setSelectedProduct} 
            goBack={() => setActiveCategory(null)} 
          />
        )}

        {/* VIEW 4: ORDER FORM */}
        {selectedProduct && (
          <div className="max-w-xl mx-auto px-4">
            <OrderForm 
              product={selectedProduct} 
              goBack={() => setSelectedProduct(null)} 
            />
          </div>
        )}
      </main>
    </div>
  );
}

// Simple Card for search results
function ProductCard({ item, onSelect }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h3 className="font-bold text-gray-800 text-sm leading-tight h-10">{item.name}</h3>
        <p className="text-purple-600 font-black mt-1">₹{item.price}</p>
        <button
          className="w-full bg-purple-600 text-white py-2 mt-3 rounded-xl font-bold text-xs"
          onClick={() => onSelect(item)}
        >
          ORDER
        </button>
      </div>
    </div>
  );
}

export default App;