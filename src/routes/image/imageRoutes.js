const express = require("express");
const router = express.Router();
const cloudinary = require("../../config/cloudinary");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

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
    const result = await cloudinary.uploader.upload(req.file.path);
    res.status(200).json({
      message: "Файл завантажено",
      filePath: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
