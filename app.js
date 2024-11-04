const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerDocument = require("./config/swagger");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();

// налаштування swagger

const swaggerOptions = {
  swaggerDefinition: swaggerDocument,
  apis: ["./routes/*.js"],
};
const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// використання swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// маршрути
app.get("/index", (req, res) => {
  res.send("Głowna strona");
});

module.exports = app;
