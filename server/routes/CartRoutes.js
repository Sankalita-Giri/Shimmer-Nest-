const express  = require('express');
const router   = express.Router();
const Cart     = require('../models/Cart');
const { authMiddleware } = require('./Customerroutes');
const Customer = require('../models/customer');

// ── GET /api/cart — load cart for logged in customer ─────────
router.get('/', authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.findById(req.customerId).select('email');
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    const cart = await Cart.findOne({ customerEmail: customer.email });
    res.json({ items: cart?.items || [] });
  } catch (err) {
    res.status(500).json({ error: 'Could not load cart' });
  }
});

// ── POST /api/cart — save entire cart ────────────────────────
router.post('/', authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.findById(req.customerId).select('email');
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    const { items } = req.body;

    await Cart.findOneAndUpdate(
      { customerEmail: customer.email },
      { customerEmail: customer.email, items: items || [], updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json({ message: 'Cart saved', count: items?.length || 0 });
  } catch (err) {
    res.status(500).json({ error: 'Could not save cart' });
  }
});

// ── DELETE /api/cart — clear cart after order ────────────────
router.delete('/', authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.findById(req.customerId).select('email');
    await Cart.findOneAndUpdate(
      { customerEmail: customer.email },
      { items: [], updatedAt: new Date() }
    );
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Could not clear cart' });
  }
});

module.exports = router;