import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import serviceResponse from "../services/response";
import { formatArrResponse } from "../utils/format";

const { PRODUCTS_TABLE, STOCKS_TABLE } = process.env;
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const getProductsList = async () => {
  let result;

  console.log("*** LAMBDA PRODUCT LIST START ***");
  try {
    const productList = await dynamo.send(
      new ScanCommand({ TableName: PRODUCTS_TABLE })
    );

    console.log("PRODUCT LIST: ", productList);

    const stockList = await dynamo.send(
      new ScanCommand({ TableName: STOCKS_TABLE })
    );

    console.log("STOCKS: ", stockList);

    result = formatArrResponse(productList, stockList);
    console.log("JOINING RESULTS: ", result);

    if (result.length === 0) {
      console.error("ERROR 400: Products Not Found");
      return serviceResponse.error("Products Not Found", 400);
    }
  } catch (err) {
    console.error("ERROR 500: ", err.message);
    return serviceResponse.error(err.message, 500);
  }

  console.log("SUCCESS: 200", "BODY: ", result);
  return serviceResponse.success(result);
};
