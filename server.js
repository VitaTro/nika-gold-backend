const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const { swaggerDocs } = require("./src/config/swagger");
const passportConfig = require("./src/config/config-passport"); // Імпорт config-passport.js

dotenv.config(); // Завантаження змінних середовища з файлу .env

const app = express();

const PORT = process.env.PORT || 3000;

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

// Routes
const categoryRoutes = require("./src/routes/category/userCategory");
const authRoutes = require("./src/routes/auth/authRoutes");
const goldRoutes = require("./src/routes/products/goldProductsRouter");
const silverRoutes = require("./src/routes/products/silverProductsRouter");

app.use("/api/category", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/goldProducts", goldRoutes);
app.use("/api/silverProducts", silverRoutes);

app.get("/welcome", (req, res) => {
  res.send("Welcome to the API");
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
