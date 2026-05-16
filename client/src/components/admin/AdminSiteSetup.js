import React from 'react';
import { subCategories as defaultSubCats } from '../../data';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function AdminSiteSetup({
  siteConfig, setSiteConfig, adminKey, isUploading, setIsUploading,
  showToast, refreshSiteConfig
}) {
  const saveSiteConfig = async (newConfig) => {
    try {
      const res = await fetch(`${API}/api/site`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ key: 'homepage', value: newConfig })
      });
      if (res.ok) {
        setSiteConfig(newConfig);
        refreshSiteConfig(); // Update the global context so live site reflects change
        showToast('✅ Site settings saved!');
      } else {
        showToast('❌ Error saving settings');
      }
    } catch {
      showToast('❌ Failed to connect');
    }
  };

  const handleHeroImageUpload = async (category, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      setIsUploading(true);
      const res = await fetch(`${API}/api/upload`, { method: 'POST', headers: { 'x-admin-key': adminKey }, body: formData });
      const data = await res.json();
      if (res.ok) {
        const updatedConfig = { ...siteConfig };
        updatedConfig.hero[category] = data.url;
        saveSiteConfig(updatedConfig);
      }
    } catch { showToast('❌ Upload failed'); } finally { setIsUploading(false); }
  };

  const handleCategoryPreviewUpload = async (catIdx, imgIdx, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      setIsUploading(true);
      const res = await fetch(`${API}/api/upload`, { method: 'POST', headers: { 'x-admin-key': adminKey }, body: formData });
      const data = await res.json();
      if (res.ok) {
        const newCats = [...siteConfig.categories];
        if (!newCats[catIdx].images) newCats[catIdx].images = ["", "", "", ""];
        newCats[catIdx].images[imgIdx] = data.url;
        saveSiteConfig({ ...siteConfig, categories: newCats });
      }
    } catch { showToast('❌ Upload failed'); } finally { setIsUploading(false); }
  };

  const handleSubCategoryUpload = async (catId, subIdx, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      setIsUploading(true);
      const res = await fetch(`${API}/api/upload`, { method: 'POST', headers: { 'x-admin-key': adminKey }, body: formData });
      const data = await res.json();
      if (res.ok) {
        const newConfig = { ...siteConfig };
        if (!newConfig.subCategories) newConfig.subCategories = {};
        if (!newConfig.subCategories[catId]) {
          newConfig.subCategories[catId] = [...(defaultSubCats[catId] || [])];
        }
        newConfig.subCategories[catId][subIdx].image = data.url;
        saveSiteConfig(newConfig);
      }
    } catch { showToast('❌ Upload failed'); } finally { setIsUploading(false); }
  };

  if (!siteConfig) return <div className="text-center py-20 text-gray-400 font-bold">Loading site config...</div>;

  return (
    <div className="space-y-10 animate-fadeIn">

      {/* ── HERO IMAGES ───────────────────────────────── */}
      <div className="bg-white rounded-[3rem] border-2 border-purple-100 p-10 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">🖼️</div>
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-gray-800">Hero Section Images</h2>
            <p className="text-xs font-medium text-gray-500">Change the 4 floating images on the homepage</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.keys(siteConfig.hero).map(cat => (
            <div key={cat} className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-2">{cat}</label>
              <div className="relative group aspect-square rounded-[2rem] overflow-hidden border-4 border-purple-50 shadow-lg">
                <img src={siteConfig.hero[cat]} alt="" className="w-full h-full object-cover" />
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                  <span className="text-2xl mb-2">📤</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Change Photo</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleHeroImageUpload(cat, e.target.files[0])} />
                </label>
                {isUploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <div className="w-6 h-6 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORY SETTINGS ──────────────────────────── */}
      <div className="bg-white rounded-[3rem] border-2 border-purple-100 p-10 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-2xl">🏷️</div>
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-gray-800">Category Descriptions</h2>
            <p className="text-xs font-medium text-gray-500">Manage names, icons, descriptions, and preview images</p>
          </div>
        </div>
        <div className="space-y-6">
          {siteConfig.categories.map((cat, idx) => (
            <div key={cat.id} className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-3xl border-2 border-transparent hover:border-purple-200 transition-all">
              <div className="col-span-1 space-y-2">
                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Icon & Name</label>
                <div className="flex gap-3">
                  <input type="text" value={cat.icon}
                    onChange={(e) => { const newCats = [...siteConfig.categories]; newCats[idx].icon = e.target.value; setSiteConfig({ ...siteConfig, categories: newCats }); }}
                    className="w-12 p-3 bg-white rounded-xl text-center text-xl shadow-sm border border-gray-100" />
                  <input type="text" value={cat.name}
                    onChange={(e) => { const newCats = [...siteConfig.categories]; newCats[idx].name = e.target.value; setSiteConfig({ ...siteConfig, categories: newCats }); }}
                    className="flex-grow p-3 bg-white rounded-xl text-sm font-black shadow-sm border border-gray-100" />
                </div>
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                <input type="text" value={cat.desc}
                  onChange={(e) => { const newCats = [...siteConfig.categories]; newCats[idx].desc = e.target.value; setSiteConfig({ ...siteConfig, categories: newCats }); }}
                  className="w-full p-3 bg-white rounded-xl text-xs font-medium shadow-sm border border-gray-100" />
              </div>
              <div className="col-span-1 md:col-span-4 mt-4">
                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-2">Category Preview Images (4 Photos)</label>
                <div className="grid grid-cols-4 gap-4">
                  {[0, 1, 2, 3].map(imgIdx => (
                    <div key={imgIdx} className="relative group aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-gray-100">
                      {cat.images && cat.images[imgIdx] ? (
                        <img src={cat.images[imgIdx]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300"><span className="text-xl">📸</span></div>
                      )}
                      <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                        <span className="text-xl mb-1">📤</span>
                        <span className="text-[7px] font-black uppercase tracking-widest text-center px-1">Upload</span>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleCategoryPreviewUpload(idx, imgIdx, e.target.files[0])} />
                      </label>
                      {isUploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div></div>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-1 md:col-span-4 flex justify-end mt-2">
                <button onClick={() => saveSiteConfig(siteConfig)} className="px-8 py-3 bg-purple-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-purple-700 transition-colors">
                  Save {cat.name} Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SUBCATEGORY SETTINGS ──────────────────────── */}
      <div className="bg-white rounded-[3rem] border-2 border-purple-100 p-10 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl">✨</div>
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-gray-800">Subcategories (Studios)</h2>
            <p className="text-xs font-medium text-gray-500">Manage names, descriptions, and preview images for subcategories</p>
          </div>
        </div>
        <div className="space-y-12">
          {siteConfig.categories.map((cat) => {
            const dbSubs = siteConfig.subCategories?.[cat.id] || [];
            const defSubs = defaultSubCats[cat.id] || [];
            
            // Merge: Use DB sub if it exists, otherwise use default
            // This ensures new categories added to data.js show up in admin
            const allSubs = [...dbSubs];
            defSubs.forEach(def => {
              if (!allSubs.find(s => s.id === def.id)) {
                allSubs.push(def);
              }
            });

            return (
              <div key={cat.id} className="space-y-6">
                <h3 className="text-xl font-black text-purple-700 uppercase tracking-widest border-b-2 border-purple-100 pb-2 ml-2">{cat.name}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {allSubs.map((sub, subIdx) => (
                  <div key={sub.id} className="bg-gray-50 p-6 rounded-3xl border-2 border-gray-100 hover:border-purple-200 transition-colors flex flex-col">
                    <div className="flex gap-4 mb-4">
                      <div className="relative group w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg flex-none bg-white">
                        <img src={sub.image} alt={sub.name} className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://placehold.co/200x200?text=📸'; }} />
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                          <span className="text-xl mb-1">📤</span>
                          <span className="text-[7px] font-black uppercase tracking-widest text-center">Change</span>
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleSubCategoryUpload(cat.id, subIdx, e.target.files[0])} />
                        </label>
                        {isUploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div></div>}
                      </div>
                      <div className="flex-grow space-y-3">
                        <div>
                          <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Name</label>
                          <input type="text" value={sub.name}
                            onChange={(e) => { 
                              const newConfig = { ...siteConfig };
                              if (!newConfig.subCategories[cat.id]) newConfig.subCategories[cat.id] = [...allSubs];
                              newConfig.subCategories[cat.id][subIdx].name = e.target.value; 
                              setSiteConfig(newConfig); 
                            }}
                            className="w-full p-2.5 bg-white rounded-xl text-sm font-black shadow-sm border border-gray-100" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                      <input type="text" value={sub.desc}
                        onChange={(e) => { 
                          const newConfig = { ...siteConfig };
                          if (!newConfig.subCategories[cat.id]) newConfig.subCategories[cat.id] = [...allSubs];
                          newConfig.subCategories[cat.id][subIdx].desc = e.target.value; 
                          setSiteConfig(newConfig); 
                        }}
                        className="w-full p-2.5 bg-white rounded-xl text-xs font-medium shadow-sm border border-gray-100 mb-4" />
                      <button onClick={() => saveSiteConfig(siteConfig)}
                        className="w-full py-2.5 bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-sm transition-colors">
                        Save {sub.name}
                      </button>
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
