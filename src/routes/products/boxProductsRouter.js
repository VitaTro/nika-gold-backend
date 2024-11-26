const express = require("express");
const router = express.Router();
const BoxProduct = require("../../schemas/boxProducts");

/**
 * @swagger
 * components:
 *   schemas:
 *     BoxProduct:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Назва коробки
 *         category:
 *           type: string
 *           description: Категорія коробки
 *         price:
 *           type: number
 *           description: Ціна коробки
 *         description:
 *           type: string
 *           description: Опис коробки
 *         photoUrl:
 *           type: string
 *           description: URL зображення продукту
 *         inStock:
 *           type: boolean
 *           description: Наявність на складі
 *         visible:
 *           type: boolean
 *           description: Видимість коробки
 *
 */

/**
 * @swagger
 * /api/products/box:
 *   get:
 *     tags: [Products/Box]
 *     summary: Отримати всі коробки
 *     responses:
 *       200:
 *         description: Список всіх коробок
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BoxProduct'
 *       500:
 *         description: Внутрішня помилка сервера
 */
router.get("/", async (req, res) => {
  try {
    const filter = { visible: true };
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const boxes = await BoxProduct.find(filter);
    res.status(200).send(boxes);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/products/box:
 *   post:
 *     tags: [Products/Box]
 *     summary: Створити нову коробку
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoxProduct'
 *     responses:
 *       201:
 *         description: Коробку створено
 *       400:
 *         description: Невірний запит
 */
router.post("/", async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      description,
      photoUrl,
      inStock,
      visible,
      createdAt,
    } = req.body;
    const newBoxProduct = new BoxProduct({
      name,
      category,
      price,
      description,
      photoUrl,
      inStock,
      visible,
      createdAt,
    });
    await newBoxProduct.save();
    res.status(201).send(box);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /api/products/box/{id}:
 *   put:
 *     tags: [Products/Box]
 *     summary: Оновити коробку
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID коробки
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoxProduct'
 *     responses:
 *       200:
 *         description: Коробку оновлено
 *       400:
 *         description: Невірний запит
 *       404:
 *         description: Коробку не знайдено
 */
router.put("/:id", async (req, res) => {
  try {
    const box = await BoxProduct.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!box) {
      return res.status(404).send();
    }
    res.status(200).send(box);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /api/products/box/{id}:
 *   patch:
 *     tags: [Products/Box]
 *     summary: Оновити властивості коробки
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID коробки
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Назва продукту
 *               category:
 *                 type: string
 *                 description: Категорія продукту
 *               price:
 *                 type: number
 *                 description: Ціна продукту
 *               description:
 *                 type: string
 *                 description: Опис продукту
 *               photoUrl:
 *                 type: string
 *                 description: URL зображення продукту
 *               inStock:
 *                 type: boolean
 *                 description: Наявність на складі
 *               visible:
 *                 type: boolean
 *                 description: Видимість коробки
 *     responses:
 *       200:
 *         description: Властивості коробки оновлено
 *       400:
 *         description: Невірний запит
 *       404:
 *         description: Коробку не знайдено
 */
router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const box = await BoxProduct.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!box) {
      return res.status(404).send();
    }
    res.status(200).send(box);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /api/products/box/{id}:
 *   delete:
 *     tags: [Products/Box]
 *     summary: Видалити коробку
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
    const box = await BoxProduct.findByIdAndDelete(req.params.id);
    if (!box) {
      return res.status(404).send();
    }
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
