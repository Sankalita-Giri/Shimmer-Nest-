import React from 'react';
import { subCategories as defaultSubCats } from '../../data';
import { useSiteConfig } from '../../context/SiteConfigContext';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function AdminInventory({
  dbProducts, adminKey, fetchDbProducts,
  isUploading, setIsUploading,
  editingProd, setEditingProd,
  isAddingProd, setIsAddingProd,
  prodForm, setProdForm,
  showToast
}) {
  const { siteConfig } = useSiteConfig();
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const isEdit = !!editingProd;
    const url = isEdit ? `${API}/api/products/${editingProd.id}` : `${API}/api/products`;
    const method = isEdit ? 'PUT' : 'POST';
    try {
      // Sanitize the form data: remove internal DB fields and convert strings to numbers
      const { _id, __v, colorString, ...rest } = prodForm;
      const finalForm = { 
        ...rest, 
        price: Number(rest.price),
        stock: Number(rest.stock),
        colors: (colorString || '').split(',').map(c => c.trim()).filter(Boolean),
        variants: (rest.variants || []).map(v => ({
          ...v,
          price: Number(v.price),
          stock: Number(v.stock)
        }))
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify(finalForm)
      });
      if (res.ok) {
        showToast(isEdit ? '✅ Product updated!' : '✅ Product added!');
        setEditingProd(null);
        setIsAddingProd(false);
        fetchDbProducts();
      } else {
        const errData = await res.json();
        showToast('❌ Error saving: ' + (errData.message || 'Unknown error'));
      }
    } catch {
      showToast('❌ Failed to connect');
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${API}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey }
      });
      if (res.ok) { showToast('🗑️ Product deleted'); fetchDbProducts(); }
    } catch {}
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`${API}/api/upload`, { 
        method: 'POST', 
        headers: { 'x-admin-key': adminKey },
        body: formData 
      });
      const data = await res.json();
      if (res.ok) {
        setProdForm(prev => {
          const newImages = [...(prev.images || []), data.url];
          return { ...prev, image: prev.image || data.url, images: newImages };
        });
        showToast('📸 Image uploaded successfully!');
      } else {
        showToast('❌ Upload failed: ' + (data.message || data.error || 'Unknown error'));
      }
    } catch {
      showToast('❌ Could not connect to upload server');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index) => {
    setProdForm(prev => {
      const newImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: newImages, image: index === 0 ? (newImages[0] || '') : prev.image };
    });
  };

  const addVariant = () => {
    setProdForm(prev => ({ ...prev, variants: [...(prev.variants || []), { name: '', price: prev.price, imageIndex: 0 }] }));
  };

  const updateVariant = (index, field, value) => {
    setProdForm(prev => {
      const newVariants = [...prev.variants];
      newVariants[index] = { ...newVariants[index], [field]: value };
      return { ...prev, variants: newVariants };
    });
  };

  const removeVariant = (index) => {
    setProdForm(prev => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }));
  };

  const groupedProductsContent = Object.entries(
    dbProducts.reduce((acc, prod) => {
      const cat = prod.category || 'Uncategorized';
      const sub = prod.subCat || 'General';
      if (!acc[cat]) acc[cat] = {};
      if (!acc[cat][sub]) acc[cat][sub] = [];
      acc[cat][sub].push(prod);
      return acc;
    }, {})
  ).map(([categoryName, subCats]) => {
    return (
      <div key={categoryName} className="space-y-8">
        <h3 className="text-3xl font-black text-purple-800 uppercase tracking-widest border-b-4 border-purple-200 pb-2">
          {categoryName}
        </h3>
        <div className="space-y-8 pl-2">
          {Object.entries(subCats).map(([subCatId, products]) => {
            const currentSubCats = siteConfig?.subCategories?.[categoryName] || defaultSubCats[categoryName] || [];
            const subCatData = currentSubCats.find(s => s.id === subCatId);
            const displayName = subCatData ? subCatData.name : subCatId;

            return (
              <div key={subCatId} className="space-y-4">
                <h4 className="text-sm font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="text-purple-400">↳</span>
                  <span>{displayName}</span>
                  <span className="text-[9px] font-medium text-gray-300 normal-case tracking-normal">({products.length} item{products.length !== 1 ? 's' : ''})</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(prod => (
                    <div key={prod._id} className="bg-white rounded-[2.5rem] border-2 border-gray-100 p-6 shadow-sm hover:border-purple-200 transition-all group flex flex-col">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 flex-none">
                          <img src={prod.image} alt="" className="w-full h-full rounded-[1.5rem] object-cover shadow-inner"
                            onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=Error'; }} />
                          {!prod.image && <div className="absolute inset-0 bg-gray-100 rounded-[1.5rem] flex items-center justify-center text-[10px] text-gray-400">No Image</div>}
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 mb-1">
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${prod.tag === 'New' ? 'bg-green-100 text-green-600' : prod.tag === 'Romantic' ? 'bg-pink-100 text-pink-600' : prod.tag === 'Bestseller' ? 'bg-yellow-100 text-yellow-600' : prod.tag === 'Trending' ? 'bg-blue-100 text-blue-600' : prod.tag === 'Gift' ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'}`}>
                              {prod.tag || 'Standard'}
                            </span>
                            <span className="text-[8px] font-black px-2 py-0.5 rounded-full uppercase bg-purple-50 text-purple-400 border border-purple-100">
                              {displayName}
                            </span>
                            <span className="text-[8px] font-black text-gray-300 uppercase tracking-tighter ml-auto">ID: {prod.id}</span>
                          </div>
                          <h3 className="font-black text-gray-800 truncate mb-1">{prod.name}</h3>
                          <p className="text-purple-600 font-black text-lg italic">₹{prod.price}</p>
                        </div>
                      </div>
                      <div className="mt-auto pt-4 border-t border-gray-50 grid grid-cols-2 gap-3">
                        <button
                          onClick={() => { setEditingProd(prod); setProdForm({ ...prod, colorString: (prod.colors || []).join(', ') }); setIsAddingProd(true); }}
                          className="py-2.5 bg-gray-50 text-gray-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-50 hover:text-purple-600 transition-all"
                        >Edit Details</button>
                        <button onClick={() => deleteProduct(prod.id)}
                          className="py-2.5 bg-red-50 text-red-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all"
                        >Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-gray-900 italic">Manage Your Creations<span className="text-purple-600">.</span></h2>
        <button
          onClick={() => {
            setIsAddingProd(true);
            setProdForm({ id: Date.now(), name: '', price: '', category: '', subCat: '', tag: '', stock: 10, image: '', images: [], variants: [], description: '', colorString: '' });
          }}
          className="px-6 py-3 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-700 active:scale-95 transition-all shadow-lg"
        >
          + Add New Product
        </button>
      </div>

      <div className="space-y-12">
        {groupedProductsContent}
      </div>
      
      {dbProducts.length === 0 && (
        <div className="text-center py-20 text-gray-400 font-bold">No products found in inventory.</div>
      )}

      {/* Product Edit/Add Modal */}
      {isAddingProd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsAddingProd(false)} />
          <div className="relative bg-white rounded-[3rem] w-full max-w-2xl p-10 shadow-2xl animate-fadeInUp max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-black text-gray-900 italic mb-8">{editingProd ? 'Edit Product' : 'Add New Creation'} ✨</h3>
            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2">Name</label>
                  <input value={prodForm.name} onChange={e => setProdForm({...prodForm, name: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-sm font-medium focus:bg-purple-50 border-2 border-transparent focus:border-purple-200" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2">Price (₹)</label>
                  <input type="number" value={prodForm.price} onChange={e => setProdForm({...prodForm, price: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-sm font-medium focus:bg-purple-50 border-2 border-transparent focus:border-purple-200" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2">Category</label>
                  <select 
                    value={prodForm.category} 
                    onChange={e => setProdForm({...prodForm, category: e.target.value, subCat: ''})} 
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-sm font-medium focus:bg-purple-50 border-2 border-transparent focus:border-purple-200" 
                    required
                  >
                    <option value="">Select Category</option>
                    {siteConfig.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2">Sub-Category</label>
                  <select 
                    value={prodForm.subCat} 
                    onChange={e => setProdForm({...prodForm, subCat: e.target.value})} 
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-sm font-medium focus:bg-purple-50 border-2 border-transparent focus:border-purple-200" 
                    required
                  >
                    <option value="">Select Sub-Category</option>
                    {(siteConfig.subCategories?.[prodForm.category] || defaultSubCats[prodForm.category] || []).map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2">Tag (New/Trending)</label>
                  <input value={prodForm.tag} onChange={e => setProdForm({...prodForm, tag: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-sm font-medium focus:bg-purple-50 border-2 border-transparent focus:border-purple-200" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2">Global Stock Qty</label>
                  <input type="number" value={prodForm.stock} onChange={e => setProdForm({...prodForm, stock: Number(e.target.value)})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-sm font-medium focus:bg-purple-50 border-2 border-transparent focus:border-purple-200" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2">Colors (Comma separated)</label>
                <input 
                  value={prodForm.colorString || ''} 
                  onChange={e => setProdForm({...prodForm, colorString: e.target.value})} 
                  placeholder="e.g. Red, Blue, Pink"
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-sm font-medium focus:bg-purple-50 border-2 border-transparent focus:border-purple-200" 
                />
              </div>

              {/* Gallery */}
              <div className="space-y-4">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2">Product Gallery (First image is main)</label>
                <div className="grid grid-cols-4 gap-3">
                  {(prodForm.images || []).map((img, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden border-2 border-purple-50">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        <button type="button" onClick={() => removeImage(idx)} className="px-3 py-1 bg-red-500 text-white rounded-full font-black text-[8px] uppercase">Remove</button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[7px] text-white p-1 truncate font-mono">{img.split('/').pop()}</div>
                    </div>
                  ))}
                  <label className={`aspect-square rounded-2xl border-4 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${isUploading ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-purple-100 hover:border-purple-300'}`}>
                    {isUploading ? (
                      <div className="w-6 h-6 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <><span className="text-2xl mb-1">➕</span><span className="text-[8px] font-black uppercase text-purple-400">Add Photo</span></>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
                  </label>
                </div>
                <input
                  placeholder="Or paste URL manually to add..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (e.target.value) {
                        setProdForm(prev => ({ ...prev, images: [...(prev.images || []), e.target.value], image: prev.image || e.target.value }));
                        e.target.value = '';
                      }
                    }
                  }}
                  className="w-full p-3 bg-transparent border-b-2 border-gray-100 outline-none text-[10px] font-mono text-gray-400 focus:border-purple-200"
                />
              </div>

              {/* Variants */}
              <div className="space-y-4 p-6 bg-purple-50/50 rounded-[2rem] border-2 border-purple-100/50">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[9px] font-black text-purple-400 uppercase tracking-widest">Price Variations (Variants)</label>
                  <button type="button" onClick={addVariant} className="text-[9px] font-black text-purple-600 uppercase tracking-widest hover:text-purple-800">+ Add Variant</button>
                </div>
                <div className="space-y-3">
                  {(prodForm.variants || []).map((variant, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-3 items-end bg-white p-4 rounded-2xl shadow-sm border border-purple-50">
                      <div className="col-span-3 space-y-1">
                        <label className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">Variant Name</label>
                        <input value={variant.name} placeholder="e.g. Pink Hat" onChange={e => updateVariant(idx, 'name', e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg outline-none text-xs font-bold" />
                      </div>
                      <div className="col-span-2 space-y-1">
                        <label className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">Price (₹)</label>
                        <input type="number" value={variant.price} onChange={e => updateVariant(idx, 'price', Number(e.target.value))} className="w-full p-2 bg-gray-50 rounded-lg outline-none text-xs font-bold" />
                      </div>
                      <div className="col-span-2 space-y-1">
                        <label className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">Stock Qty</label>
                        <input type="number" value={variant.stock || 0} onChange={e => updateVariant(idx, 'stock', Number(e.target.value))} className="w-full p-2 bg-gray-50 rounded-lg outline-none text-xs font-bold" />
                      </div>
                      <div className="col-span-4 space-y-1">
                        <label className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">Link to Photo</label>
                        <div className="flex gap-2 items-center">
                          {prodForm.images?.[variant.imageIndex] && (
                            <img src={prodForm.images[variant.imageIndex]} alt="" className="w-8 h-8 rounded-lg object-cover border" />
                          )}
                          <select value={variant.imageIndex} onChange={e => updateVariant(idx, 'imageIndex', Number(e.target.value))} className="flex-grow p-2 bg-gray-50 rounded-lg outline-none text-xs font-bold">
                            {(prodForm.images || []).map((img, i) => (
                              <option key={i} value={i}>Photo #{i + 1} ({img.split('/').pop().slice(0, 10)}...)</option>
                            ))}
                            {(prodForm.images || []).length === 0 && <option value={0}>No Photos</option>}
                          </select>
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-center pb-2">
                        <button type="button" onClick={() => removeVariant(idx)} className="text-red-400 hover:text-red-600 font-black text-xs">✕</button>
                      </div>
                    </div>
                  ))}
                  {(prodForm.variants || []).length === 0 && (
                    <p className="text-center py-4 text-[10px] font-bold text-gray-400 italic">No variants added. Base price will be used.</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2">Description</label>
                <textarea value={prodForm.description} onChange={e => setProdForm({...prodForm, description: e.target.value})} rows={3} className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-sm font-medium focus:bg-purple-50 border-2 border-transparent focus:border-purple-200 resize-none" />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsAddingProd(false)} className="flex-grow py-4 bg-gray-100 text-gray-500 rounded-full font-black text-xs uppercase tracking-widest">Cancel</button>
                <button type="submit" className="flex-grow py-4 bg-purple-600 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-100">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
