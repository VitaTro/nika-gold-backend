const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-resolved.json");
const passportConfig = require("./src/config/config-passport");
const app = require("./App");

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Connection error", error);
  });

passportConfig(passport);
app.use(passport.initialize());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Використання resolved.json

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
