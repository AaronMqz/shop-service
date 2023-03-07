import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

import serviceResponse from "../services/response";
import { formatObjResponse } from "../utils/format";

const { PRODUCTS_TABLE, STOCKS_TABLE } = process.env;
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

exports.getProductById = async (event) => {
  let result;

  console.log("*** LAMBDA PRODUCT BY ID START ***");
  try {
    const productById = await dynamo.send(
      new GetCommand({
        TableName: PRODUCTS_TABLE,
        Key: {
          id: event.pathParameters.productId,
        },
      })
    );

    console.log("PRODUCT BY ID: ", productById);

    if (!productById.Item) {
      console.error("ERROR 400: Product Not Found");
      return serviceResponse.error("Product Not Found", 400);
    }

    const stockById = await dynamo.send(
      new GetCommand({
        TableName: STOCKS_TABLE,
        Key: {
          product_id: event.pathParameters.productId,
        },
      })
    );

    console.log("STOCK BY PRODUCT_ID: ", stockById);

    if (!productById.Item) {
      console.error("ERROR 400: No Stock");
      return serviceResponse.error("No Stock", 400);
    }

    result = formatObjResponse(productById, stockById);
    console.log("JOINING RESULTS: ", result);
  } catch (err) {
    console.error("ERROR 500: ", err.message);
    return serviceResponse.error(err.message, 500);
  }

  console.log("SUCCESS: 200", "BODY: ", result);
  return serviceResponse.success(result);
};
