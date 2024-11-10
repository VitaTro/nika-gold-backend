const express = require("express");
const router = express.Router();
const SilverProduct = require("../../schemas/silverProducts");

/**
 * @swagger
 * components:
 *   schemas:
 *     SilverProduct:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Назва продукту
 *         category:
 *           type: string
 *           description: Категорія продукту
 *         price:
 *           type: number
 *           description: Ціна продукту
 *         description:
 *           type: string
 *           description: Опис продукту
 *         inStock:
 *           type: boolean
 *           description: Наявність на складі
 *         visible:
 *           type: boolean
 *           description: Видимість продукту
 */

/**
 * @swagger
 * /api/products/silver:
 *   get:
 *     tags: [Products/Silver]
 *     summary: Отримати всі продукти срібла
 *     responses:
 *       200:
 *         description: Список всіх продуктів срібла
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SilverProduct'
 */
router.get("/", async (req, res) => {
  try {
    const filter = { visible: true };
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const products = await SilverProduct.find(filter);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/products/silver:
 *   post:
 *     tags: [Products/Silver]
 *     summary: Створити новий продукт срібла
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SilverProduct'
 *     responses:
 *       201:
 *         description: Продукт створено
 *       400:
 *         description: Невірний запит
 */
router.post("/", async (req, res) => {
  try {
    const product = new SilverProduct(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /api/products/silver/{id}:
 *   put:
 *     tags: [Products/Silver]
 *     summary: Оновити продукт срібла
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID продукту, який потрібно оновити
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SilverProduct'
 *     responses:
 *       200:
 *         description: Продукт оновлено
 *       400:
 *         description: Невірний запит
 *       404:
 *         description: Продукт не знайдено
 */
router.put("/:id", async (req, res) => {
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

/**
 * @swagger
 * /api/products/silver/{id}/visibility:
 *   patch:
 *     tags: [Products/Silver]
 *     summary: Змінити видимість продукту срібла
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID продукту, який потрібно оновити
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visible:
 *                 type: boolean
 *                 description: Видимість продукту
 *     responses:
 *       200:
 *         description: Видимість продукту оновлено
 *       400:
 *         description: Невірний запит
 *       404:
 *         description: Продукт не знайдено
 */
router.patch("/:id/visibility", async (req, res) => {
  try {
    const product = await SilverProduct.findByIdAndUpdate(
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
