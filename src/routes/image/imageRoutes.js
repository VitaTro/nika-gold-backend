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

/**
 * @swagger
 * /api/delete-image:
 *   delete:
 *     summary: Видалення зображення
 *     tags: [Images]
 *     parameters:
 *       - in: query
 *         name: public_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Public ID зображення
 *     responses:
 *       200:
 *         description: Зображення видалено
 *       400:
 *         description: Невірний запит
 */
router.delete("/delete-image", async (req, res) => {
  try {
    const publicId = req.query.public_id;
    await cloudinary.uploader.destroy(publicId);
    res.status(200).send({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
