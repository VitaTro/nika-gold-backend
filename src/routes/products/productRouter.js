const express = require("express");
const router = express.Router();
const Product = require("../../schemas/product");

/**
 * @swagger
 * /api/products/add-product:
 *   post:
 *     summary: Додавання нового продукту
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               photoUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Продукт додано
 *       500:
 *         description: Внутрішня помилка сервера
 */
router.post("/add-product", async (req, res) => {
  try {
    const { name, category, price, description, photoUrl } = req.body;

    const newProduct = new Product({
      name,
      category,
      price,
      description,
      photoUrl,
    });

    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
