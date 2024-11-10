const express = require("express");
const app = express();
const categoryRoutes = require("./src/routes/category/userCategory");
const authRoutes = require("./src/routes/auth/authRoutes");
const userRoutes = require("./src/routes/user/userRoutes");
const goldRoutes = require("./src/routes/products/goldProductsRouter");
const silverRoutes = require("./src/routes/products/silverProductsRouter");
const subscriberRoutes = require("./src/routes/subscribes/subscribes");
const boxProductsRouter = require("./src/routes/products/boxProductsRouter");
const setProductsRouter = require("./src/routes/products/setProductsRouter");
const inventoryRoutes = require("./src/routes/inventory/inventoryRoutes");
const imageRoutes = require("./src/routes/image/imageRoutes");
const productRouter = require("./src/routes/products/productRouter");
// Middleware
app.use(express.json());
app.use(express.static("uploads")); // Зробити папку з файлами доступною

// Routes
app.use("/api/category", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/goldProducts", goldRoutes);
app.use("/api/silverProducts", silverRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/boxProducts", boxProductsRouter);
app.use("/api/setProducts", setProductsRouter);
app.use("/api", inventoryRoutes);
app.use("/api", imageRoutes);
app.use("/api/products", productRouter);
app.get("/welcome", (req, res) => {
  res.send("Welcome to the API");
});

module.exports = app;
