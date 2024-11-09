const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../../controllers/authController"); // Імпорт контролерів

// Реєстрація користувача
router.post("/api/auth/register", register);

// Вхід користувача
router.post("/api/auth/login", login);

// Вихід користувача
router.post("/api/auth/logout", logout);

module.exports = router;
