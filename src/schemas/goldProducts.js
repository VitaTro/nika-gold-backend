const mongoose = require("mongoose");

const goldProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  subcategory: {
    type: String,
    required: true,
    enum: [
      "chains",
      "earrings",
      "bracelets",
      "rings",
      "pendants",
      "tic",
      "incense",
    ],
  },
});

const GoldProduct = mongoose.model("GoldProduct", goldProductSchema);

module.exports = GoldProduct;
