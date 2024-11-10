const mongoose = require("mongoose");

const goldProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  inStock: { type: Boolean, default: true },
  visible: { type: Boolean, default: true }, // Нове поле для видимості товару
  createdAt: { type: Date, default: Date.now },
});

const GoldProduct = mongoose.model("GoldProduct", goldProductSchema);

module.exports = GoldProduct;
