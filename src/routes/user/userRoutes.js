const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/userMiddleware");
const {
  getUserProfile,
  updateUserProfile,
} = require("../../controllers/userController");

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Ім'я користувача
 *         email:
 *           type: string
 *           description: Електронна пошта користувача
 *         avatar:
 *           type: string
 *           description: URL або шлях до зображення аватара
 *         basket:
 *           type: array
 *           items:
 *             type: string
 *             description: ID продуктів у кошику користувача
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Дата створення профілю
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     tags: [User]
 *     summary: Отримання профілю користувача
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Профіль користувача отримано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Неавторизований запит
 *       500:
 *         description: Внутрішня помилка сервера
 */
router.get("/profile", authMiddleware, getUserProfile);

/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     tags: [User]
 *     summary: Оновлення профілю користувача
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       200:
 *         description: Профіль користувача оновлено
 *       400:
 *         description: Невірний запит
 *       401:
 *         description: Неавторизований запит
 *       500:
 *         description: Внутрішня помилка сервера
 */
router.put("/profile", authMiddleware, updateUserProfile);

module.exports = router;
