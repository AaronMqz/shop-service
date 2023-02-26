"use strict";
import serviceResponse from "../services/response";
import productsService from "../services/productsService";

exports.getProductById = async (event) => {
  try {
    const productId = event.pathParameters.productId;
    const response = await productsService.getById(productId);
    if (response) return serviceResponse.success(response);
    return serviceResponse.success({ message: "Product not found!" }, 404);
  } catch (error) {
    return serviceResponse.error(error);
  }
};
