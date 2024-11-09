const express = require("express");
const router = express.Router();
const GoldProduct = require("../models/goldProducts");

// Створення продукту
router.post("/goldProducts", async (req, res) => {
  try {
    const product = new GoldProduct(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Отримання всіх продуктів
router.get("/goldProducts", async (req, res) => {
  try {
    const products = await GoldProduct.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Оновлення продукту
router.put("/goldProducts/:id", async (req, res) => {
  try {
    const product = await GoldProduct.findByIdAndUpdate(
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
router.delete("/goldProducts/:id", async (req, res) => {
  try {
    const product = await GoldProduct.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
