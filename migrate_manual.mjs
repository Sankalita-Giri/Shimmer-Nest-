import fs from 'fs';

const API_URL = 'http://localhost:5000/api/products/seed';

async function migrate() {
  console.log("📦 Reading products_backup.json...");
  
  try {
    const data = fs.readFileSync('./products_backup.json', 'utf8');
    const products = JSON.parse(data);
    
    console.log(`🚀 Sending ${products.length} products to MongoDB...`);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log("✅ SUCCESS!");
      console.log(`✨ ${result.count} products have been moved to your database.`);
      console.log("🔗 You can now manage them in your Admin Dashboard under 'Inventory'.");
    } else {
      console.error("❌ Failed:", result.message);
    }
  } catch (err) {
    console.error("❌ Error during migration:", err.message);
  }
}

migrate();
