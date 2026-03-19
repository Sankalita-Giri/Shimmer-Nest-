const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// --- POST /api/orders --- CREATE ORDER
router.post('/', async (req, res) => {
  try {
    const { orderId, customer, items, payment } = req.body;

    // Validate required top-level fields
    if (!orderId || !customer || !items || !payment) {
      return res.status(400).json({
        error: "Missing required fields: orderId, customer, items, payment"
      });
    }

    // Check for duplicate UTR (same transaction ID used twice)
    const existingOrder = await Order.findOne({
      'payment.transactionId': payment.transactionId
    });
    if (existingOrder) {
      return res.status(409).json({
        error: "Duplicate transaction ID. This UTR has already been used."
      });
    }

    // Check for duplicate orderId
    const existingOrderId = await Order.findOne({ orderId });
    if (existingOrderId) {
      return res.status(409).json({
        error: "Duplicate order ID. Please try again."
      });
    }

    console.log("📦 New Order Received:", orderId);

    const newOrder = new Order({ orderId, customer, items, payment });
    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order placed 💜",
      orderId: savedOrder.orderId,
      order: savedOrder
    });

  } catch (err) {
    console.error("❌ Order Creation Error:", err);

    // Handle MongoDB duplicate key error
    if (err.code === 11000) {
      return res.status(409).json({
        error: "Duplicate entry. This transaction ID or order ID already exists."
      });
    }

    res.status(500).json({
      error: "Failed to place order",
      details: err.message
    });
  }
});

// --- GET /api/orders --- GET ALL ORDERS (SELLER DASHBOARD)
router.get('/', async (req, res) => {
  try {
    const { status, from, to, limit = 50 } = req.query;

    const filter = {};

    // Filter by order status e.g. ?status=Processing
    if (status) filter.orderStatus = status;

    // Filter by date range e.g. ?from=2024-01-01&to=2024-12-31
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to)   filter.createdAt.$lte = new Date(to);
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.status(200).json({
      count: orders.length,
      orders
    });

  } catch (err) {
    console.error("❌ Fetch Orders Error:", err);
    res.status(500).json({ error: "Could not fetch orders" });
  }
});

// --- GET /api/orders/:orderId --- GET SINGLE ORDER
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);

  } catch (err) {
    console.error("❌ Fetch Order Error:", err);
    res.status(500).json({ error: "Could not fetch order" });
  }
});

// --- PATCH /api/orders/:orderId/status --- UPDATE ORDER STATUS (SELLER)
router.patch('/:orderId/status', async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const validOrderStatuses   = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
    const validPaymentStatuses = ['Pending Verification', 'Paid', 'Failed'];

    const update = {};

    if (orderStatus) {
      if (!validOrderStatuses.includes(orderStatus)) {
        return res.status(400).json({ error: `Invalid orderStatus. Must be one of: ${validOrderStatuses.join(', ')}` });
      }
      update.orderStatus = orderStatus;
    }

    if (paymentStatus) {
      if (!validPaymentStatuses.includes(paymentStatus)) {
        return res.status(400).json({ error: `Invalid paymentStatus. Must be one of: ${validPaymentStatuses.join(', ')}` });
      }
      update['payment.status'] = paymentStatus;
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ error: "No valid fields to update." });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { $set: update },
      { new: true }  // return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    console.log(`✅ Order ${req.params.orderId} updated:`, update);

    res.status(200).json({
      message: "Order updated 💜",
      order: updatedOrder
    });

  } catch (err) {
    console.error("❌ Update Order Error:", err);
    res.status(500).json({ error: "Could not update order" });
  }
});

// --- DELETE /api/orders/:orderId --- CANCEL/DELETE ORDER (SELLER)
router.delete('/:orderId', async (req, res) => {
  try {
    const deleted = await Order.findOneAndDelete({ orderId: req.params.orderId });

    if (!deleted) {
      return res.status(404).json({ error: "Order not found" });
    }

    console.log(`🗑️ Order ${req.params.orderId} deleted`);
    res.status(200).json({ message: "Order deleted", orderId: req.params.orderId });

  } catch (err) {
    console.error("❌ Delete Order Error:", err);
    res.status(500).json({ error: "Could not delete order" });
  }
});

module.exports = router;