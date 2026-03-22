const express         = require('express');
const mongoose        = require('mongoose');
const cors            = require('cors');
const orderRoutes     = require('./routes/orderRoutes');
const customerRoutes  = require('./routes/customerRoutes');
const cartRoutes      = require('./routes/cartRoutes');
require('dotenv').config();

const app = express();

// 1. CORS
app.use(cors());
app.use(express.json());

// 2. Routes
app.use('/api/orders',    orderRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/cart',      cartRoutes);

// 3. Health check
app.get('/', (req, res) => {
  res.json({
    message: "ShimmerNest Backend Running ✨",
    db: mongoose.connection.readyState === 1 ? "✅ Connected" : "❌ Disconnected"
  });
});

// 4. MongoDB
console.log("🔍 URI loaded:", process.env.MONGO_URI ? "✅ Yes" : "❌ Not found");

mongoose.connect(process.env.MONGO_URI, {
  dbName: 'shimmernest',
  serverSelectionTimeoutMS: 10000,
})
  .then(() => {
    console.log("✅ MongoDB Connected 💜");
    console.log("📦 Database:", mongoose.connection.db.databaseName);
  })
  .catch(err => {
    console.error("❌ MongoDB Failed:", err.message);
  });

// 5. Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});