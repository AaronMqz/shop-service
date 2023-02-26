"use strict";

const headers = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
};

const errorMesageDefault = "Oop, Something went wrong. Please try again later.";

const serviceResponse = {
  success: (body, statusCode = 200) => {
    return {
      headers,
      statusCode,
      body: JSON.stringify(body),
    };
  },

  error: (error = errorMesageDefault, statusCode = 500) => {
    return {
      headers,
      statusCode,
      body: JSON.stringify({ error }),
    };
  },
};

export default serviceResponse;
