const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerDocument = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Nika Project API",
      description: "API documentation for the MyProject Nika",
      // contact: {
      //   email: "you@your-company.com",
      // },
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://virtserver.swaggerhub.com/VITYLJATROJAN/MyProject/1.0.0",
        description: "SwaggerHub API Auto Mocking",
      },
    ],
    tags: [
      {
        name: "admins",
        description: "Secured Admin-only calls",
      },
      {
        name: "developers",
        description: "Operations available to regular developers",
      },
    ],
    paths: {
      "/inventory": {
        get: {
          tags: ["developers"],
          summary: "searches inventory",
          description:
            "By passing in the appropriate options, you can search for\navailable inventory in the system\n",
          operationId: "searchInventory",
          parameters: [
            {
              name: "searchString",
              in: "query",
              description:
                "pass an optional search string for looking up inventory",
              required: false,
              style: "form",
              explode: true,
              schema: {
                type: "string",
              },
            },
            {
              name: "skip",
              in: "query",
              description: "number of records to skip for pagination",
              required: false,
              style: "form",
              explode: true,
              schema: {
                minimum: 0,
                type: "integer",
                format: "int32",
              },
            },
            {
              name: "limit",
              in: "query",
              description: "maximum number of records to return",
              required: false,
              style: "form",
              explode: true,
              schema: {
                maximum: 50,
                minimum: 0,
                type: "integer",
                format: "int32",
              },
            },
          ],
          responses: {
            200: {
              description: "search results matching criteria",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/InventoryItem",
                    },
                  },
                },
              },
            },
            400: {
              description: "bad input parameter",
            },
          },
        },
        post: {
          tags: ["admins"],
          summary: "adds an inventory item",
          description: "Adds an item to the system",
          operationId: "addInventory",
          requestBody: {
            description: "Inventory item to add",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/InventoryItem",
                },
              },
            },
          },
          responses: {
            201: {
              description: "item created",
            },
            400: {
              description: "invalid input, object invalid",
            },
            409: {
              description: "an existing item already exists",
            },
          },
        },
      },
    },
    components: {
      schemas: {
        InventoryItem: {
          required: ["id", "manufacturer", "name", "releaseDate"],
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "d290f1ee-6c54-4b01-90e6-d701748f0851",
            },
            name: {
              type: "string",
              example: "Widget Adapter",
            },
            releaseDate: {
              type: "string",
              format: "date-time",
              example: "2016-08-29T09:12:33.001Z",
            },
            manufacturer: {
              $ref: "#/components/schemas/Manufacturer",
            },
          },
        },
        Manufacturer: {
          required: ["name"],
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "ACME Corporation",
            },
            homePage: {
              type: "string",
              format: "url",
              example: "https://www.acme-corp.com",
            },
            phone: {
              type: "string",
              example: "408-867-5309",
            },
          },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
