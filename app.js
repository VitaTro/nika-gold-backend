const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const categoryRoutes = require("./src/routes/category/userCategory");
const authRoutes = require("./src/routes/auth/authRoutes");
const userRoutes = require("./src/routes/user/userRoutes");
const subscriberRoutes = require("./src/routes/subscribes/subscribes");
const inventoryRoutes = require("./src/routes/inventory/inventoryRoutes");
const productRouter = require("./src/routes/products/productRouter");
// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Зробити папку з файлами доступною
app.use(
  "/favicon.ico",
  express.static(path.join(__dirname, "public", "favicon.ico"))
);
// Routes
app.use("/api/category", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use("/api/subscribers", subscriberRoutes);

app.use("/api/inventory", inventoryRoutes);
app.use("/api/products", productRouter);
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

module.exports = app;
