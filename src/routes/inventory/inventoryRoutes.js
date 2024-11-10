const express = require("express");
const router = express.Router();
const InventoryItem = require("../../schemas/inventoryItem");

/**
 * @swagger
 * components:
 *   schemas:
 *     InventoryItem:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Назва товару
 *         category:
 *           type: string
 *           description: Категорія товару
 *         price:
 *           type: number
 *           description: Ціна товару
 *         description:
 *           type: string
 *           description: Опис товару
 *         inStock:
 *           type: boolean
 *           description: Наявність на складі
 *         visible:
 *           type: boolean
 *           description: Видимість товару
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Дата створення товару
 */

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     tags: [Inventory]
 *     summary: Створити новий товар
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryItem'
 *     responses:
 *       201:
 *         description: Товар створено
 *       400:
 *         description: Невірний запит
 */
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

/**
 * @swagger
 * /api/inventory/latest:
 *   get:
 *     tags: [Inventory]
 *     summary: Отримати останні додані товари
 *     responses:
 *       200:
 *         description: Список останніх доданих товарів
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InventoryItem'
 */
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
