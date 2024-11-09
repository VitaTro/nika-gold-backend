const express = require("express");
const router = express.Router();
const SilverProduct = require("../models/silverProducts");

// Створення продукту
router.post("/silverProducts", async (req, res) => {
  try {
    const product = new SilverProduct(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Отримання всіх продуктів
router.get("/silverProducts", async (req, res) => {
  try {
    const products = await SilverProduct.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Оновлення продукту
router.put("/silverProducts/:id", async (req, res) => {
  try {
    const product = await SilverProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).send();
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Видалення продукту
router.delete("/silverProducts/:id", async (req, res) => {
  try {
    const product = await SilverProduct.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
