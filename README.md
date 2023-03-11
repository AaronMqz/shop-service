# shop-service

## Task 4

What was done?

- Task 4.1, 4.2 and 4.3 are completed.
- Frontend is integrated with Product Service.

NOTE: "Write a script to fill tables with test examples" you can find it in:

- ./scripts/fillTables.js
- command for execution:: npm run fillTables (package.json -> "fillTables": "node ./scripts/fillTables.js")

## Additional scope:

- POST /products lambda functions returns error 400 status code if product data is invalid.
- All lambdas return error 500 status code on any error (DB connection, any unhandled error in code).
- All lambdas do console.log for each incoming requests and their arguments.
- Transaction based creation of product.
- Use RDS instance instead fo DynamoDB tables. **_ MySql database integrated to Lambda Functions! _**

## Frontend, API/Swagger endpoints:

- [FontendURL](https://d3gtmnlqgfhty9.cloudfront.net/)

- [getProductsList](https://qgxxnpoyz7.execute-api.us-east-1.amazonaws.com/dev/products): GET - https://qgxxnpoyz7.execute-api.us-east-1.amazonaws.com/dev/products
- [getProductsById](https://qgxxnpoyz7.execute-api.us-east-1.amazonaws.com/dev/products/7567ec4b-b10c-48c5-9345-fc73c48a80aa): GET - https://qgxxnpoyz7.execute-api.us-east-1.amazonaws.com/dev/products/7567ec4b-b10c-48c5-9345-fc73c48a80aa

- createProduct: POST - https://qgxxnpoyz7.execute-api.us-east-1.amazonaws.com/dev/products - Use the schema:
  {
  "count":number,
  "price":number,
  "description":string,
  "title":string
  }
