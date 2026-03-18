const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();

// 1. CORS Middleware (Configure this ONCE, before routes)
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'] 
}));

// 2. Body Parser Middleware (MUST come before routes to read JSON data)
app.use(express.json());

// 3. Routes
app.use('/api/orders', orderRoutes);

// 4. Test Route
app.get('/', (req, res) => {
  res.send("ShimmerNest Backend Running ✨");
});

// 5. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 💜"))
  .catch(err => console.log(err));

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});