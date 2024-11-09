const mongoose = require("mongoose");

const silverProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  inStock: { type: Boolean, default: true },
  visible: { type: Boolean, default: true }, // Нове поле для видимості товару
});

const SilverProduct = mongoose.model("SilverProduct", silverProductSchema);

module.exports = SilverProduct;
