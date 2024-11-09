const express = require("express");
const router = express.Router();
const GoldProduct = require("../../schema/goldProducts");

// Створення продукту
router.post("/", async (req, res) => {
  try {
    const product = new GoldProduct(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Отримання всіх видимих продуктів або продуктів за категорією
router.get("/", async (req, res) => {
  try {
    const filter = { visible: true };
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const products = await GoldProduct.find(filter);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Оновлення продукту
router.put("/:id", async (req, res) => {
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

// Зміна видимості продукту
router.patch("/:id/visibility", async (req, res) => {
  try {
    const product = await GoldProduct.findByIdAndUpdate(
      req.params.id,
      { visible: req.body.visible },
      { new: true }
    );
    if (!product) {
      return res.status(404).send();
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
