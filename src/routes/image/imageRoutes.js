const express = require("express");
const router = express.Router();
const upload = require("../../middleware/uploadMiddleware");

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
 *               photo:
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
router.post("/upload", upload.single("photo"), (req, res) => {
  res.status(200).json({
    message: "Файл завантажено",
    filePath: `http://localhost:${process.env.PORT || 3000}/${
      req.file.filename
    }`,
  });
});

module.exports = router;
