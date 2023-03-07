import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  TransactWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import serviceResponse from "../services/response";

const { PRODUCTS_TABLE, STOCKS_TABLE } = process.env;
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

exports.createProduct = async (event) => {
  console.log("*** LAMBDA CREATE PRODUCT START ***");
  try {
    const newProduct = JSON.parse(event.body);
    console.log("ADDING PRODUCT: ", newProduct);

    if (!newProduct) {
      console.error("ERROR 400: INVALID PRODUCT OBJECT");
      return serviceResponse.error("Invalid Product Object", 400);
    }

    if (!newProduct.id) {
      newProduct.id = uuidv4();
      console.log("NEW ID CREATED", newProduct.id);
    }

    const { count, ...newProductInfo } = newProduct;
    const newStockInfo = { product_id: newProduct.id, count };

    console.log("TRANSACTION START");

    const transactionOutput = await dynamo.send(
      new TransactWriteCommand({
        TransactItems: [
          { Put: { Item: newProductInfo, TableName: PRODUCTS_TABLE } },
          { Put: { Item: newStockInfo, TableName: STOCKS_TABLE } },
        ],
      })
    );

    console.log("TRANSACTION FINISHED");

    console.log("TRANSACTION OUTPUT", transactionOutput);

    if (transactionOutput.$metadata?.httpStatusCode !== 200) {
      console.log("TRANSACTION FAILED");
      return serviceResponse.error("TRANSACTION FAILED!", 500);
    }

    console.log("SUCCESS: 200", "BODY: ", newProduct);
    return serviceResponse.success(newProduct);
  } catch (err) {
    console.error("ERROR 500: ", err.message);
    return serviceResponse.error(err.message, 500);
  }
};
