const express = require("express");
const router = express.Router();
const Product = require("../../schemas/product");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
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
 *         photoUrl:
 *           type: string
 *           description: URL зображення продукту
 * inStock:
 *           type: boolean
 *           description: Наявність на складі
 *visible:
 *           type: boolean
 *           description: Видимість коробки
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Отримати всі продукти
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список всіх продуктів
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Внутрішня помилка сервера
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/products/{type}:
 *   get:
 *     summary: Отримати продукти за типом
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Тип продукту
 *     responses:
 *       200:
 *         description: Список продуктів за типом
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Внутрішня помилка сервера
 */
router.get("/:type", async (req, res) => {
  try {
    const type = req.params.type;
    const products = await Product.find({ category: type });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Додавання нового продукту
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Продукт додано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Внутрішня помилка сервера
 */
router.post("/", async (req, res) => {
  try {
    const {
      name,
      category,
      subcategory,
      price,
      description,
      photoUrl,
      inStock,
      visible,
      createdAt,
    } = req.body;

    const newProduct = new Product({
      name,
      category,
      subcategory,
      price,
      description,
      photoUrl,
      inStock,
      visible,
      createdAt,
    });

    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Оновлення продукту
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Ідентифікатор продукту
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Продукт оновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Продукт не знайдено
 *       500:
 *         description: Внутрішня помилка сервера
 */
router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
