const express = require("express");
const router = express.Router();
const SetProduct = require("../../schemas/setProducts");

/**
 * @swagger
 * components:
 *   schemas:
 *     SetProduct:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Назва набору
 *         category:
 *           type: string
 *           description: Категорія набору
 *         price:
 *           type: number
 *           description: Ціна набору
 *         description:
 *           type: string
 *           description: Опис набору
 *         inStock:
 *           type: boolean
 *           description: Наявність на складі
 *         visible:
 *           type: boolean
 *           description: Видимість набору
 */

/**
 * @swagger
 * /api/products/set:
 *   get:
 *     tags: [Products/Set]
 *     summary: Отримати всі набори
 *     responses:
 *       200:
 *         description: Список всіх наборів
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SetProduct'
 */
router.get("/", async (req, res) => {
  try {
    const filter = { visible: true };
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const sets = await SetProduct.find(filter);
    res.status(200).send(sets);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/products/set:
 *   post:
 *     tags: [Products/Set]
 *     summary: Створити новий набір
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SetProduct'
 *     responses:
 *       201:
 *         description: Набір створено
 *       400:
 *         description: Невірний запит
 */
router.post("/", async (req, res) => {
  try {
    const set = new SetProduct(req.body);
    await set.save();
    res.status(201).send(set);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /api/products/set/{id}:
 *   put:
 *     tags: [Products/Set]
 *     summary: Оновити набір
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID набору
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SetProduct'
 *     responses:
 *       200:
 *         description: Набір оновлено
 *       400:
 *         description: Невірний запит
 *       404:
 *         description: Набір не знайдено
 */
router.put("/:id", async (req, res) => {
  try {
    const set = await SetProduct.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!set) {
      return res.status(404).send();
    }
    res.status(200).send(set);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /api/products/set/{id}:
 *   patch:
 *     tags: [Products/Set]
 *     summary: Оновити властивості набору
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID набору
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Назва набору
 *               category:
 *                 type: string
 *                 description: Категорія набору
 *               price:
 *                 type: number
 *                 description: Ціна набору
 *               description:
 *                 type: string
 *                 description: Опис набору
 *               photoUrl:
 *                 type: string
 *                 description: URL зображення набору
 *               inStock:
 *                 type: boolean
 *                 description: Наявність на складі
 *               visible:
 *                 type: boolean
 *                 description: Видимість набору
 *     responses:
 *       200:
 *         description: Властивості набору оновлено
 *       400:
 *         description: Невірний запит
 *       404:
 *         description: Набір не знайдено
 */
router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body; // Додаємо змінну updates
    const set = await SetProduct.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!set) {
      return res.status(404).send();
    }
    res.status(200).send(set);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /api/products/set/{id}:
 *   delete:
 *     tags: [Products/Set]
 *     summary: Видалити набір
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID набору
 *     responses:
 *       200:
 *         description: Набір видалено
 *       400:
 *         description: Невірний запит
 *       404:
 *         description: Набір не знайдено
 */
router.delete("/:id", async (req, res) => {
  try {
    const set = await SetProduct.findByIdAndDelete(req.params.id);
    if (!set) {
      return res.status(404).send();
    }
    res.status(200).send({ message: "Set deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
