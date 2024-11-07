const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerDocument = {
  swagger: "2.0",
  info: {
    description: "This is a simple API",
    version: "1.0.0",
    title: "Simple Inventory API",
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
      description: "SwaggerHub API Auto Mocking",
      url: "https://virtserver.swaggerhub.com/VITYLJATROJAN/nika-gold/1.0.0",
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
    {
      name: "auth",
      description: "User authentication and registration",
    },
  ],
  paths: {
    "/inventory": {
      get: {
        tags: ["developers"],
        summary: "searches inventory",
        operationId: "searchInventory",
        description:
          "By passing in the appropriate options, you can search for available inventory in the system",
        parameters: [
          {
            name: "searchString",
            in: "query",
            description:
              "pass an optional search string for looking up inventory",
            required: false,
            schema: {
              type: "string",
            },
          },
          {
            name: "skip",
            in: "query",
            description: "number of records to skip for pagination",
            schema: {
              type: "integer",
              format: "int32",
              minimum: 0,
            },
          },
          {
            name: "limit",
            in: "query",
            description: "maximum number of records to return",
            schema: {
              type: "integer",
              format: "int32",
              minimum: 0,
              maximum: 50,
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
        operationId: "addInventory",
        description: "Adds an item to the system",
        requestBody: {
          description: "Inventory item to add",
          required: true,
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
    "/auth/register": {
      post: {
        tags: ["auth"],
        summary: "Register a new user",
        operationId: "registerUser",
        requestBody: {
          description: "New user details",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/NewUser",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
          },
          400: {
            description: "Invalid input",
          },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["auth"],
        summary: "Login a user",
        operationId: "loginUser",
        requestBody: {
          description: "User login details",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginUser",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      InventoryItem: {
        type: "object",
        required: ["id", "name", "manufacturer", "releaseDate"],
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
        type: "object",
        required: ["name"],
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
      NewUser: {
        type: "object",
        required: ["username", "password", "email"],
        properties: {
          username: {
            type: "string",
            example: "johndoe",
          },
          password: {
            type: "string",
            example: "secretpassword",
          },
          email: {
            type: "string",
            format: "email",
            example: "johndoe@example.com",
          },
        },
      },
      LoginUser: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: {
            type: "string",
            example: "johndoe",
          },
          password: {
            type: "string",
            example: "secretpassword",
          },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
