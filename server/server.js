const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();

// routes
app.use('/api/orders', orderRoutes);

// middleware
app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected 💜"))
.catch(err => console.log(err));

// test route
app.get('/', (req, res) => {
  res.send("ShimmerNest Backend Running ✨");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});