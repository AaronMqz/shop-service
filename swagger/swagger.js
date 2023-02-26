// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "Product service API",
    "version": "1"
  },
  "paths": {
    "/products/{productId}": {
      "get": {
        "summary": "getProductById",
        "description": "",
        "operationId": "getProductById.get./products/{productId}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    },
    "/products": {
      "get": {
        "summary": "getProductsList",
        "description": "",
        "operationId": "getProductsList.get./products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    }
  },
  "definitions": {
    "Product": {
      "properties": {
        "id": {
          "title": "Product.id",
          "type": "string"
        },
        "title": {
          "title": "Product.title",
          "type": "string"
        },
        "price": {
          "title": "Product.price",
          "type": "number"
        },
        "description": {
          "title": "Product.description",
          "type": "string"
        }
      },
      "required": [
        "id",
        "title",
        "price",
        "description"
      ],
      "additionalProperties": false,
      "title": "Product",
      "type": "object"
    },
    "products": {
      "items": {
        "$ref": "#/definitions/Product",
        "title": "products.[]"
      },
      "title": "products.[]",
      "type": "array"
    }
  },
  "securityDefinitions": {},
  "basePath": "/dev"
};