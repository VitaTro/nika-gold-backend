const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-resolved.json");
const passportConfig = require("./src/config/config-passport");
const app = require("./App");
const { storage, cloudinary } = require("./src/config/cloudinary"); // Імпорт конфігурації Cloudinary
const multer = require("multer");
const upload = multer({ storage: storage });

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Connection error", error);
  });

passportConfig(passport);
app.use(passport.initialize());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Використання resolved.json

// Маршрут для завантаження зображень
app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({ url: req.file.path });
});

// Функція для отримання URL зображення
const getImageUrl = (publicId) => {
  return cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto",
  });
};

// Використання для тестування
const imageUrl = getImageUrl("products/gold/image1");
console.log(imageUrl);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
