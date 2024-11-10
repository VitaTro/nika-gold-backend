const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventoryItemSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  inStock: { type: Boolean, default: true },
  visible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }, // Поле для відстеження дати додавання
});

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

module.exports = InventoryItem;
