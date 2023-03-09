import serviceResponse from "../services/response";
import { getProductByIdDynamoDb } from "../services/useDynamoDb";
import { getProductByIdMysql } from "../services/useMysql";

const { DB_CONNECTION } = process.env;

exports.getProductById = async (event) => {
  let result;

  console.log("*** LAMBDA PRODUCT BY ID START ***");
  try {
    const product_id = event.pathParameters.productId;

    if (DB_CONNECTION === "MYSQL") {
      result = await getProductByIdMysql(product_id);
    } else {
      result = await getProductByIdDynamoDb(product_id);
    }

    if (!result) {
      console.error("ERROR 400: Product Not Found");
      return serviceResponse.error("Product Not Found", 400);
    }
  } catch (err) {
    console.error("ERROR 500: ", err.message);
    return serviceResponse.error(err.message, 500);
  }

  console.log("SUCCESS: 200", "BODY: ", result);
  return serviceResponse.success(result);
};
