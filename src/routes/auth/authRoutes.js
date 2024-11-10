const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../../controllers/authController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Ім'я користувача
 *         email:
 *           type: string
 *           description: Електронна пошта користувача
 *         password:
 *           type: string
 *           description: Пароль користувача
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Реєстрація нового користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       201:
 *         description: Користувача зареєстровано
 *       400:
 *         description: Невірний запит
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Вхід користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Електронна пошта користувача
 *               password:
 *                 type: string
 *                 description: Пароль користувача
 *     responses:
 *       200:
 *         description: Користувача увійшов
 *       400:
 *         description: Невірний запит
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Вихід користувача
 *     responses:
 *       200:
 *         description: Користувача вийшов
 */
router.post("/logout", logout);

module.exports = router;
