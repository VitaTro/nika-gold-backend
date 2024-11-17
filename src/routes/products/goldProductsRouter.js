const express = require("express");
const router = express.Router();
const GoldProduct = require("../../schemas/goldProducts");

/**
 * @swagger
 * components:
 *   schemas:
 *     GoldProduct:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *         - subcategory
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
 *         photoUrl:
 *           type: string
 *           description: URL зображення продукту
 *         inStock:
 *           type: boolean
 *           description: Наявність на складі
 *         visible:
 *           type: boolean
 *           description: Видимість продукту
 *         subcategory:
 *           type: string
 *           description: Підкатегорія продукту
 *           enum:
 *             - chains
 *             - earrings
 *             - bracelets
 *             - rings
 *             - pendants
 *             - tic
 *             - incense
 */

/**
 * @swagger
 * /api/products/gold:
 *   get:
 *     tags: [Products/Gold]
 *     summary: Отримати всі продукти золота
 *     responses:
 *       200:
 *         description: Список всіх продуктів золота
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GoldProduct'
 */
router.get("/", async (req, res) => {
  try {
    const filter = { visible: true };
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.subcategory) {
      filter.subcategory = req.query.subcategory;
    }
    const products = await GoldProduct.find(filter);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/products/gold:
 *   post:
 *     tags: [Products/Gold]
 *     summary: Створити новий продукт золота
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoldProduct'
 *     responses:
 *       201:
 *         description: Продукт створено
 *       400:
 *         description: Невірний запит
 */
router.post("/", async (req, res) => {
  try {
    const product = new GoldProduct(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /api/products/gold/{id}:
 *   put:
 *     tags: [Products/Gold]
 *     summary: Оновити продукт золота
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID продукту
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoldProduct'
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

/**
 * @swagger
 * /api/products/gold/{id}/visibility:
 *   patch:
 *     tags: [Products/Gold]
 *     summary: Змінити видимість продукту золота
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID продукту
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
 *         description: Видимість продукту змінено
 *       400:
 *         description: Невірний запит
 *       404:
 *         description: Продукт не знайдено
 */
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

/**
 * @swagger
 * /api/products/gold/{id}:
 *   delete:
 *     tags: [Products/Gold]
 *     summary: Видалити продукт золота
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID продукту
 *     responses:
 *       200:
 *         description: Продукт видалено
 *       400:
 *         description: Невірний запит
 *       404:
 *         description: Продукт не знайдено
 */
router.delete("/:id", async (req, res) => {
  try {
    const product = await GoldProduct.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
