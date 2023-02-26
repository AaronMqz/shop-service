"use strict";
import serviceResponse from "../services/response";
import productsService from "../services/productsService";

exports.getProductsList = async (event) => {
  try {
    const response = await productsService.getALL();
    if (response) return serviceResponse.success(response);
    return serviceResponse.success({ message: "Products not found!" }, 404);
  } catch (err) {
    return serviceResponse.error(err);
  }
};
