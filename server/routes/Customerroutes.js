const express  = require('express');
const router   = express.Router();
const jwt      = require('jsonwebtoken');
const Customer = require('../models/customer');
const Order    = require('../models/order');

const JWT_SECRET = process.env.JWT_SECRET || 'shimmernest_jwt_secret';

// ── Auth middleware ──────────────────────────────────────────
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.customerId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// ── POST /api/customers/register ────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;

    if (!name || !email || !phone || !password)
      return res.status(400).json({ error: 'All fields are required.' });

    if (password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });

    const existing = await Customer.findOne({ email: email.toLowerCase() });
    if (existing)
      return res.status(409).json({ error: 'An account with this email already exists.' });

    const customer = new Customer({ name, email, phone, password, address: address || '' });
    await customer.save();

    const token = jwt.sign({ id: customer._id }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      message: 'Account created successfully! 💜',
      token,
      customer: {
        id:      customer._id,
        name:    customer.name,
        email:   customer.email,
        phone:   customer.phone,
        address: customer.address,
      }
    });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ error: 'Email already registered.' });
    res.status(500).json({ error: 'Registration failed. Try again.' });
  }
});

// ── POST /api/customers/login ────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required.' });

    const customer = await Customer.findOne({ email: email.toLowerCase() });
    if (!customer)
      return res.status(404).json({ error: 'No account found with this email.' });

    const isMatch = await customer.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ error: 'Incorrect password.' });

    const token = jwt.sign({ id: customer._id }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      message: 'Login successful! 💜',
      token,
      customer: {
        id:      customer._id,
        name:    customer.name,
        email:   customer.email,
        phone:   customer.phone,
        address: customer.address,
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed. Try again.' });
  }
});

// ── GET /api/customers/profile ───────────────────────────────
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.findById(req.customerId).select('-password');
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch {
    res.status(500).json({ error: 'Could not fetch profile' });
  }
});

// ── PATCH /api/customers/profile ─────────────────────────────
router.patch('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const update = {};
    if (name)    update.name    = name;
    if (phone)   update.phone   = phone;
    if (address) update.address = address;

    const updated = await Customer.findByIdAndUpdate(
      req.customerId, { $set: update }, { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated!', customer: updated });
  } catch {
    res.status(500).json({ error: 'Could not update profile' });
  }
});

// ── GET /api/customers/orders ────────────────────────────────
// Returns all orders for the logged-in customer by email
router.get('/orders', authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.findById(req.customerId).select('email');
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    const orders = await Order.find({ 'customer.email': customer.email })
      .sort({ createdAt: -1 });

    res.json({ count: orders.length, orders });
  } catch {
    res.status(500).json({ error: 'Could not fetch orders' });
  }
});

// ── GET /api/customers/orders/:orderId ───────────────────────
router.get('/orders/:orderId', authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.findById(req.customerId).select('email');
    const order = await Order.findOne({
      orderId: req.params.orderId,
      'customer.email': customer.email  // security: can only see own orders
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch {
    res.status(500).json({ error: 'Could not fetch order' });
  }
});

module.exports = router;
module.exports.authMiddleware = authMiddleware;