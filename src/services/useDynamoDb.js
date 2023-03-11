import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  TransactWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import { formatArrResponse, formatObjResponse } from "../utils/format";

const { PRODUCTS_TABLE, STOCKS_TABLE } = process.env;
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const getProductsListDynamoDb = async () => {
  console.log("*** DYNAMODB PRODUCT LIST START ***");
  let results;

  const productList = await dynamo.send(
    new ScanCommand({ TableName: PRODUCTS_TABLE })
  );

  const stockList = await dynamo.send(
    new ScanCommand({ TableName: STOCKS_TABLE })
  );

  results = formatArrResponse(productList, stockList);
  console.log("JOINING RESULTS: ", results);
  return results;
};

export const getProductByIdDynamoDb = async (product_id) => {
  console.log("*** DYNAMODB PRODUCT BY ID START ***");
  let results;

  const productById = await dynamo.send(
    new GetCommand({
      TableName: PRODUCTS_TABLE,
      Key: {
        id: product_id,
      },
    })
  );

  console.log("PRODUCT BY ID: ", productById);

  if (!productById.Item) {
    return null;
  }

  const stockById = await dynamo.send(
    new GetCommand({
      TableName: STOCKS_TABLE,
      Key: {
        product_id: product_id,
      },
    })
  );

  console.log("STOCK BY PRODUCT_ID: ", stockById);

  if (!stockById.Item) {
    return null;
  }

  results = formatObjResponse(productById, stockById);
  console.log("JOINING RESULTS: ", results);

  return results;
};

export const createProductDynamoDb = async (newProduct) => {
  console.log("*** DYNAMODB CREATE PRODUCT START ***");

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
    return false;
  }

  console.log("SUCCESS: 200", "DINAMO DB: ", newProduct);
  return true;
};
