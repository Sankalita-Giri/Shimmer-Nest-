import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { subCategories as defaultSubCats } from '../data';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const mergeSubCategories = (savedSubCats, fallbackSubCats) => {
  const merged = {};
  const allCats = new Set([
    ...Object.keys(fallbackSubCats || {}),
    ...Object.keys(savedSubCats || {})
  ]);
  allCats.forEach((catId) => {
    const savedList = Array.isArray(savedSubCats?.[catId]) ? savedSubCats[catId] : [];
    const fallbackList = Array.isArray(fallbackSubCats?.[catId]) ? fallbackSubCats[catId] : [];
    const savedIds = new Set(savedList.map((sub) => sub.id));
    merged[catId] = [...savedList, ...fallbackList.filter((sub) => !savedIds.has(sub.id))];
  });
  return merged;
};

const DEFAULT_CONFIG = {
  hero: {
    keychain: "/images/Keychains/miffy2.jpg",
    hair: "/images/Hairaccessories/hairaccessories1.jpeg",
    bouquet: "/images/Bouquets/bouquet1.jpeg",
    plushie: "/images/Plushies/Bunny_withblackkittyhoodiee.jpg"
  },
  categories: [
    { id: "keychains", name: "Crochet Keychains", icon: "🔑", gradient: "from-violet-100 to-blue-50", accent: "#7c3aed", desc: "Cute companions for your keys & bags", images: [] },
    { id: "plushies",  name: "Crochet Plushies",  icon: "🧸", gradient: "from-yellow-50 to-orange-50", accent: "#f59e0b", desc: "Tiny huggable handmade friends", images: [] },
    { id: "hair",      name: "Hair Accessories",  icon: "🎀", gradient: "from-rose-100 to-pink-50",   accent: "#db2777", desc: "Floral clips, scrunchies, gajras & bandanas", images: [] },
    { id: "bouquets",  name: "Crochet Bouquets",  icon: "💐", gradient: "from-red-50 to-orange-50",   accent: "#dc2626", desc: "Flowers that never fade", images: [] },
  ],
  subCategories: defaultSubCats
};

const SiteConfigContext = createContext(null);

export function SiteConfigProvider({ children }) {
  const [siteConfig, setSiteConfig] = useState(null);

  const refreshSiteConfig = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/site/homepage`);
      if (res.ok) {
        const data = await res.json();
        const val = data.value;
        // Merge in defaults for any fields not yet saved to DB
        val.subCategories = mergeSubCategories(val.subCategories, defaultSubCats);
        // Ensure gradient field on categories (stored in DB may not have it)
        const GRADIENTS = {
          keychains: "from-violet-100 to-blue-50",
          plushies:  "from-yellow-50 to-orange-50",
          hair:      "from-rose-100 to-pink-50",
          bouquets:  "from-red-50 to-orange-50",
        };
        val.categories = val.categories.map(c => ({
          ...c,
          gradient: c.gradient || GRADIENTS[c.id] || "from-purple-50 to-blue-50"
        }));
        setSiteConfig(val);
      } else {
        setSiteConfig(DEFAULT_CONFIG);
      }
    } catch {
      setSiteConfig(DEFAULT_CONFIG);
    }
  }, []);

  useEffect(() => {
    refreshSiteConfig();
  }, [refreshSiteConfig]);

  return (
    <SiteConfigContext.Provider value={{ siteConfig, refreshSiteConfig, setSiteConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
