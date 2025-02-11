const express = require("express");
const cors = require("cors");
const path = require("path");
const categoryRoutes = require("./src/routes/category/userCategory");
const authRoutes = require("./src/routes/auth/authRoutes");
const userRoutes = require("./src/routes/user/userRoutes");
const subscriberRoutes = require("./src/routes/subscribes/subscribes");
const inventoryRoutes = require("./src/routes/inventory/inventoryRoutes");
const productRouter = require("./src/routes/products/productRouter");
const upload = require("./src/middleware/uploadMiddleware");
const { cloudinary, storage } = require("./src/config/cloudinary");

// Middleware
const app = express();
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

// Маршрут для завантаження зображень
app.post("/upload", upload.single("photo"), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Failed to upload image" });
    } else {
      res.json({ url: result.secure_url });
    }
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

module.exports = app;
