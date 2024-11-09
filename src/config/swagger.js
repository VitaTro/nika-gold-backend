const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Simple Inventory API",
      version: "1.0.0",
      description: "API documentation for the Simple Inventory project",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        GoldProduct: {
          type: "object",
          required: ["name", "category", "price"],
          properties: {
            name: {
              type: "string",
              description: "Назва продукту",
            },
            category: {
              type: "string",
              description: "Категорія продукту",
            },
            price: {
              type: "number",
              description: "Ціна продукту",
            },
            description: {
              type: "string",
              description: "Опис продукту",
            },
            inStock: {
              type: "boolean",
              description: "Наявність на складі",
            },
            visible: {
              type: "boolean",
              description: "Видимість продукту",
            },
          },
        },
        SilverProduct: {
          type: "object",
          required: ["name", "category", "price"],
          properties: {
            name: {
              type: "string",
              description: "Назва продукту",
            },
            category: {
              type: "string",
              description: "Категорія продукту",
            },
            price: {
              type: "number",
              description: "Ціна продукту",
            },
            description: {
              type: "string",
              description: "Опис продукту",
            },
            inStock: {
              type: "boolean",
              description: "Наявність на складі",
            },
            visible: {
              type: "boolean",
              description: "Видимість продукту",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Вказуй правильний шлях до файлів з маршрутами
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerDocs };
