const express = require('express');
const router  = express.Router();
const Order   = require('../models/order');

// ── POST /api/orders — Create new order ─────────────────────
router.post('/', async (req, res) => {
  try {
    const { orderId, customer, items, payment, giftWrap } = req.body;

    if (!orderId || !customer || !items || !payment) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Duplicate UTR check
    const dupUTR = await Order.findOne({ 'payment.transactionId': payment.transactionId });
    if (dupUTR) return res.status(409).json({ error: "Duplicate transaction ID. This UTR has already been used." });

    // Duplicate orderId check
    const dupId = await Order.findOne({ orderId });
    if (dupId) return res.status(409).json({ error: "Duplicate order ID. Please try again." });

    // Calculate charges
    const subtotal       = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const deliveryCharge = subtotal >= 500 ? 0 : 70;
    const giftWrapCharge = giftWrap?.enabled ? 30 : 0;

    const newOrder = new Order({
      orderId,
      customer,
      items,
      payment: {
        ...payment,
        subtotal,
        deliveryCharge,
        giftWrapCharge,
        totalAmount: Number(payment.totalAmount),
      },
      giftWrap: {
        enabled: giftWrap?.enabled || false,
        message: giftWrap?.message || ""
      },
      orderStatus: 'Processing'
    });

    const saved = await newOrder.save();
    console.log("📦 New Order:", orderId);

    res.status(201).json({ message: "Order placed 💜", orderId: saved.orderId, order: saved });

  } catch (err) {
    console.error("❌ Order Error:", err);
    if (err.code === 11000) {
      return res.status(409).json({ error: "Duplicate entry detected." });
    }
    res.status(500).json({ error: "Failed to place order", details: err.message });
  }
});

// ── GET /api/orders — Get all orders (admin) ────────────────
router.get('/', async (req, res) => {
  try {
    const { status, paymentStatus, from, to, limit = 100, search } = req.query;
    const filter = {};

    if (status)        filter.orderStatus         = status;
    if (paymentStatus) filter['payment.status']   = paymentStatus;
    if (search) {
      filter.$or = [
        { orderId:          { $regex: search, $options: 'i' } },
        { 'customer.name':  { $regex: search, $options: 'i' } },
        { 'customer.email': { $regex: search, $options: 'i' } },
        { 'customer.phone': { $regex: search, $options: 'i' } },
      ];
    }
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to)   filter.createdAt.$lte = new Date(to);
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 }).limit(Number(limit));
    res.status(200).json({ count: orders.length, orders });

  } catch (err) {
    console.error("❌ Fetch Orders Error:", err);
    res.status(500).json({ error: "Could not fetch orders" });
  }
});

// ── GET /api/orders/:orderId — Get single order ─────────────
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch order" });
  }
});

// ── PATCH /api/orders/:orderId — Update order (admin) ───────
router.patch('/:orderId', async (req, res) => {
  try {
    const {
      orderStatus,
      paymentStatus,
      trackingId,
      courier,
      adminNotes,
      estimatedDays
    } = req.body;

    const validOrderStatuses   = ['Processing', 'Confirmed', 'Crafting', 'Shipped', 'Delivered', 'Cancelled'];
    const validPaymentStatuses = ['Pending Verification', 'Paid', 'Failed'];
    const update = {};

    if (orderStatus) {
      if (!validOrderStatuses.includes(orderStatus))
        return res.status(400).json({ error: `Invalid orderStatus.` });
      update.orderStatus = orderStatus;
      if (orderStatus === 'Shipped')   update['shipping.shippedAt']   = new Date();
      if (orderStatus === 'Delivered') update['shipping.deliveredAt'] = new Date();
    }

    if (paymentStatus) {
      if (!validPaymentStatuses.includes(paymentStatus))
        return res.status(400).json({ error: `Invalid paymentStatus.` });
      update['payment.status'] = paymentStatus;
    }

    if (trackingId)    update['shipping.trackingId']    = trackingId;
    if (courier)       update['shipping.courier']       = courier;
    if (adminNotes)    update.adminNotes                = adminNotes;
    if (estimatedDays) update['shipping.estimatedDays'] = estimatedDays;

    if (Object.keys(update).length === 0)
      return res.status(400).json({ error: "No valid fields to update." });

    const updated = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { $set: update },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Order not found" });

    console.log(`✅ Order ${req.params.orderId} updated:`, update);
    res.status(200).json({ message: "Order updated 💜", order: updated });

  } catch (err) {
    console.error("❌ Update Error:", err);
    res.status(500).json({ error: "Could not update order" });
  }
});

// ── DELETE /api/orders/:orderId — Delete order ───────────────
router.delete('/:orderId', async (req, res) => {
  try {
    const deleted = await Order.findOneAndDelete({ orderId: req.params.orderId });
    if (!deleted) return res.status(404).json({ error: "Order not found" });
    console.log(`🗑️ Order ${req.params.orderId} deleted`);
    res.status(200).json({ message: "Order deleted", orderId: req.params.orderId });
  } catch (err) {
    res.status(500).json({ error: "Could not delete order" });
  }
});

// ── GET /api/orders/stats/summary — Dashboard stats ─────────
router.get('/stats/summary', async (req, res) => {
  try {
    const [total, processing, shipped, delivered, revenue] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ orderStatus: 'Processing' }),
      Order.countDocuments({ orderStatus: 'Shipped' }),
      Order.countDocuments({ orderStatus: 'Delivered' }),
      Order.aggregate([{ $group: { _id: null, total: { $sum: '$payment.totalAmount' } } }])
    ]);
    res.json({
      totalOrders: total,
      processing,
      shipped,
      delivered,
      totalRevenue: revenue[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ error: "Stats error" });
  }
});

module.exports = router;