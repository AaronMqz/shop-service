import { v4 as uuidv4 } from "uuid";
import serviceResponse from "../services/response";
import { createProductDynamoDb } from "../services/useDynamoDb";
import { createProductMysql } from "../services/useMysql";

const { DB_CONNECTION } = process.env;

exports.createProduct = async (event) => {
  console.log("*** LAMBDA CREATE PRODUCT START ***");
  let result;
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

    if (DB_CONNECTION === "MYSQL") {
      result = await createProductMysql(newProduct);
    } else {
      result = await createProductDynamoDb(newProduct);
    }

    if (!result) {
      console.log("CREATION FAILED");
      return serviceResponse.error("CREATION FAILED!", 500);
    }

    console.log("SUCCESS: 200", "BODY: ", newProduct);
    return serviceResponse.success(newProduct);
  } catch (err) {
    console.error("ERROR 500: ", err.message);
    return serviceResponse.error(err.message, 500);
  }
};
