const express = require("express");
const router = express.Router();
const cloudinary = require("../../config/cloudinary");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Product = require("../../schemas/product"); // Модель продукту

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Завантаження зображення
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Файл завантажено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 filePath:
 *                   type: string
 */
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `products/${req.file.originalname.split(".")[0]}`,
    });

    // Зберігання URL зображення у базі даних
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      photoUrl: result.secure_url,
    });

    await product.save();

    res.status(200).json({
      message: "Файл завантажено",
      filePath: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
