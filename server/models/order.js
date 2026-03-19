const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    // --- ORDER IDENTITY ---
    orderId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true  // fast lookup by SN-XXXX
    },

    // --- CUSTOMER DETAILS ---
    customer: {
      name:    { type: String, required: true, trim: true },
      email:   { type: String, required: true, trim: true, lowercase: true },
      phone:   { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true }
    },

    // --- ORDER ITEMS ---
    items: [
      {
        productId:     { type: String, trim: true },
        name:          { type: String, required: true },
        price:         { type: Number, required: true },
        qty:           { type: Number, required: true, min: 1 },
        selectedColor: { type: String, default: "Original" },
        note:          { type: String, default: "" }  // custom note from ProductDetail
      }
    ],

    // --- PAYMENT ---
    payment: {
      totalAmount:   { type: Number, required: true },
      transactionId: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      payerName:     { type: String, default: "Self" },
      method:        { type: String, default: "UPI QR" },
      status: {
        type: String,
        enum: ['Pending Verification', 'Paid', 'Failed'],
        default: 'Pending Verification'
      }
    },

    // --- ORDER STATUS ---
    orderStatus: {
      type: String,
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing'
    }
  },
  {
    // Auto-manages createdAt and updatedAt
    timestamps: true
  }
);

// --- INDEXES ---
// Fast lookup by transaction ID (prevent duplicate UTR)
OrderSchema.index({ 'payment.transactionId': 1 }, { unique: true });
// Fast lookup by customer email (for order history)
OrderSchema.index({ 'customer.email': 1 });
// Fast lookup by order status (for seller dashboard)
OrderSchema.index({ orderStatus: 1 });
// Fast lookup by date (for recent orders)
OrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Order', OrderSchema);