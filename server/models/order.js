const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    // ── ORDER IDENTITY ──────────────────────────────────────
    orderId: { type: String, required: true, unique: true, trim: true, index: true },

    // ── CUSTOMER DETAILS ────────────────────────────────────
    customer: {
      name:    { type: String, required: true, trim: true },
      email:   { type: String, required: true, trim: true, lowercase: true },
      phone:   { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true }
    },

    // ── ORDER ITEMS ─────────────────────────────────────────
    items: [
      {
        name:          { type: String, required: true },
        price:         { type: Number, required: true },
        qty:           { type: Number, required: true, min: 1 },
        selectedColor: { type: String, default: "Original" },
        note:          { type: String, default: "" }
      }
    ],

    // ── PAYMENT ─────────────────────────────────────────────
    payment: {
      totalAmount:    { type: Number, required: true },
      subtotal:       { type: Number, default: 0 },
      deliveryCharge: { type: Number, default: 0 },
      giftWrapCharge: { type: Number, default: 0 },
      transactionId:  { type: String, required: true, trim: true },
      payerName:      { type: String, default: "Self" },
      method:         { type: String, default: "UPI Manual" },
      status: {
        type: String,
        enum: ['Pending Verification', 'Paid', 'Failed'],
        default: 'Pending Verification'
      }
    },

    // ── GIFT WRAP ───────────────────────────────────────────
    giftWrap: {
      enabled: { type: Boolean, default: false },
      message: { type: String, default: "" }
    },

    // ── ORDER STATUS ────────────────────────────────────────
    orderStatus: {
      type: String,
      enum: ['Processing', 'Confirmed', 'Crafting', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing'
    },

    // ── SHIPPING INFO ───────────────────────────────────────
    shipping: {
      trackingId:    { type: String, default: "" },
      courier:       { type: String, default: "" },
      shippedAt:     { type: Date },
      deliveredAt:   { type: Date },
      estimatedDays: { type: Number, default: 7 }
    },

    // ── ADMIN NOTES ─────────────────────────────────────────
    adminNotes: { type: String, default: "" }
  },
  { timestamps: true }
);

OrderSchema.index({ 'payment.transactionId': 1 }, { unique: true });
OrderSchema.index({ 'customer.email': 1 });
OrderSchema.index({ orderStatus: 1 });
OrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Order', OrderSchema);