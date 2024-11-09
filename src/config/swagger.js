const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple Inventory API",
      version: "1.0.0",
      description: "This is a simple API",
      contact: {
        email: "you@your-company.com",
      },
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      },
    },
    servers: [
      {
        url: "https://virtserver.swaggerhub.com/VITYLJATROJAN/nika-gold/1.0.0",
        description: "SwaggerHub API Auto Mocking",
      },
    ],
  },
  apis: ["./routes/*.js"], // шляхи до файлів з маршрутами
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec };
