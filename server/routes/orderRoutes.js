const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// CREATE ORDER
router.post('/create', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(200).json("Order placed 💜");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL ORDERS (ADMIN)
router.get('/', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;