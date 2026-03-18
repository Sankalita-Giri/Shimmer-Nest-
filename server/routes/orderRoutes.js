const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// CREATE ORDER
router.post('/create', async (req, res) => {
  try {
    // Optional: Log the body to your terminal to debug the "CORS/Network" issue
    console.log("Received Order Data:", req.body);

    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    
    // Return the saved object so the frontend can use the ID if needed
    res.status(201).json({ 
      message: "Order placed 💜", 
      order: savedOrder 
    });
  } catch (err) {
    console.error("Order Creation Error:", err);
    res.status(500).json({ error: "Failed to place order", details: err.message });
  }
});

// GET ALL ORDERS (ADMIN)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch orders" });
  }
});

module.exports = router;