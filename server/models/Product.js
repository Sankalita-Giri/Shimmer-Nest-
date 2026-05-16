const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Keep ID for compatibility with current logic
  category: { type: String, required: true },
  subCat: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  images: [{ type: String }],
  tag: { type: String },
  rating: { type: Number, default: 5 },
  reviews: { type: Number, default: 0 },
  stock: { type: Number, default: 10 },
  colors: [{ type: String }],
  variants: [{
    name: String,
    price: Number,
    stock: { type: Number, default: 0 },
    imageIndex: Number
  }],
  description: { type: String },
  isNewArrival: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
