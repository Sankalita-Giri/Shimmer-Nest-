import axios from 'axios';
import { products } from './client/src/data.js';

const API_URL = 'http://localhost:5000/api/products/seed';

async function seed() {
  console.log("🚀 Starting migration of products from data.js to MongoDB...");
  try {
    const res = await axios.post(API_URL, products);
    console.log(`✅ Success! Seeded ${res.data.count} products into MongoDB.`);
  } catch (err) {
    console.error("❌ Migration failed:", err.response?.data?.message || err.message);
  }
}

seed();
