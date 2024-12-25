const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  registerAdmin,
  checkFirstAdmin,
} = require("../../controllers/authController");

router.get("/check-admin", checkFirstAdmin);

router.post("/register/user", (req, res, next) => {
  req.body.role = "user";
  register(req, res, next);
});

router.post("/register/admin", (req, res, next) => {
  req.body.role = "admin";
  register(req, res, next);
});

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;
