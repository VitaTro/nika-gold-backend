const express = require("express");
const categoryRoutes = require("./src/routes/category/userCategory");
const authRoutes = require("./src/routes/auth/authRoutes");
const goldRoutes = require("./src/routes/products/goldProductsRouter");
const silverRoutes = require("./src/routes/products/silverProductsRouter");
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/category", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/goldProducts", goldRoutes);
app.use("/api/silverProducts", silverRoutes);

app.get("/welcome", (req, res) => {
  res.send("Welcome to the API");
});
module.exports = app;
