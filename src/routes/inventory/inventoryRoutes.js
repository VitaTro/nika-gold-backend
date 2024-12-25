const express = require("express");
const router = express.Router();
const InventoryItem = require("../../schemas/inventoryItem");

// Створення продукту в інвентарі
router.post("/inventory", async (req, res) => {
  try {
    const item = new InventoryItem(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Отримання останніх доданих продуктів
router.get("/inventory/latest", async (req, res) => {
  try {
    const items = await InventoryItem.find().sort({ createdAt: -1 }).limit(10); // Отримати останні 10 доданих продуктів
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
