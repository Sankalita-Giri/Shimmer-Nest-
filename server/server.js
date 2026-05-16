const express         = require('express');
const mongoose        = require('mongoose');
const cors            = require('cors');
const orderRoutes     = require('./routes/orderRoutes');
const customerRoutes  = require('./routes/customerRoutes');
const cartRoutes      = require('./routes/cartRoutes');
const productRoutes   = require('./routes/productRoutes');
const uploadRoutes    = require('./routes/uploadRoutes');
const siteRoutes      = require('./routes/siteRoutes');
const rateLimit       = require('express-rate-limit');
const errorMiddleware = require('./middleware/errorMiddleware');
require('dotenv').config();

const app = express();

// 1. CORS & Rate Limiting
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  skip: (req) => req.headers['x-admin-key'] === process.env.ADMIN_SECRET,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes"
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use('/api/', limiter);

// 2. Routes
app.use('/api/orders',    orderRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/cart',      cartRoutes);
app.use('/api/products',  productRoutes);
app.use('/api/upload',    uploadRoutes);
app.use('/api/site',      siteRoutes);

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

// 5. Error Handling
app.use(errorMiddleware);

// 6. Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});