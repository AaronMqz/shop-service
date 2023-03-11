import serviceResponse from "../services/response";
import { getProductsListDynamoDb } from "../services/useDynamoDb";
import { getProductsListMysql } from "../services/useMysql";

const { DB_CONNECTION } = process.env;

export const getProductsList = async () => {
  let result;

  try {
    if (DB_CONNECTION === "MYSQL") {
      result = await getProductsListMysql();
    } else {
      result = await getProductsListDynamoDb();
    }

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
