const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  registerAdmin,
  checkFirstAdmin,
} = require("../../controllers/authController");

/**
 * @swagger
 * /api/auth/check-admin:
 *   get:
 *     tags: [Auth]
 *     summary: Перевірка першого адміністратора
 *     responses:
 *       200:
 *         description: Перевірка наявності першого адміністратора
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isFirstAdmin:
 *                   type: boolean
 */
router.get("/check-admin", checkFirstAdmin);

/**
 * @swagger
 * /api/auth/register/user:
 *   post:
 *     tags: [Auth]
 *     summary: Реєстрація нового користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Користувача зареєстровано
 *       400:
 *         description: Невірний запит
 */
router.post("/register/user", (req, res, next) => {
  req.body.role = "user";
  register(req, res, next);
});

/**
 * @swagger
 * /api/auth/register/admin:
 *   post:
 *     tags: [Auth]
 *     summary: Реєстрація нового адміністратора
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Адміністратора зареєстровано
 *       400:
 *         description: Невірний запит
 */
router.post("/register/admin", (req, res, next) => {
  req.body.role = "admin";
  register(req, res, next);
});

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
 *               password:
 *                 type: string
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
