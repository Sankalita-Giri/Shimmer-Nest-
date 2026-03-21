const express     = require('express');
const mongoose    = require('mongoose');
const cors        = require('cors');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();

// 1. CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-admin-key']
}));

// 2. Body Parser
app.use(express.json());

// 3. Routes
app.use('/api/orders', orderRoutes);

// 4. Health check
app.get('/', (req, res) => {
  res.json({
    message: "ShimmerNest Backend Running ✨",
    db: mongoose.connection.readyState === 1 ? "✅ MongoDB Connected" : "❌ MongoDB Disconnected"
  });
});

// 5. MongoDB Connection
console.log("🔍 URI loaded:", process.env.MONGO_URI ? "✅ Yes" : "❌ Not found in .env");

mongoose.connect(process.env.MONGO_URI, {
  dbName: 'shimmernest',            // ← ensures correct DB is used
  serverSelectionTimeoutMS: 10000,
})
  .then(() => {
    console.log("✅ MongoDB Connected 💜");
    console.log("📦 Database:", mongoose.connection.db.databaseName);
  })
  .catch(err => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    console.error("👉 Fix: Whitelist your IP in Atlas → Network Access → Add 0.0.0.0/0");
  });

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});