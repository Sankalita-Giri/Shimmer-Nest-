const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  customerEmail: { type: String, required: true, unique: true, lowercase: true },
  items: [
    {
      id:            { type: Number },
      name:          { type: String },
      price:         { type: Number },
      image:         { type: String },
      category:      { type: String },
      subCat:        { type: String },
      selectedColor: { type: String, default: "Original" },
      qty:           { type: Number, default: 1 },
      note:          { type: String, default: "" },
      cartId:        { type: Number },
      colors:        { type: Array, default: [] },
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);