const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const { swaggerDocs } = require("./src/config/swagger");
const passportConfig = require("./src/config/config-passport"); // Імпорт config-passport.js
const app = require("./App");

dotenv.config(); // Завантаження змінних середовища з файлу .env

const PORT = process.env.PORT || 5000;

// Підключення до MongoDB без застарілих параметрів
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Connection error", error);
  });

// Passport middleware
passportConfig(passport);
app.use(passport.initialize());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
