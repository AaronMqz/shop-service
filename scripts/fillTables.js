const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

// PRODUCTS TABLE
var params = {
  RequestItems: {
    products: [
      {
        PutRequest: {
          Item: {
            id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80aa" },
            title: { S: "Product 1" },
            description: { S: "Short Product Description 1" },
            price: { N: "50" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: "2567ec4b-b10c-48c5-9345-fc73c48a80aa" },
            title: { S: "Product 2" },
            description: { S: "Short Product Description 2" },
            price: { N: "100" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: "3567ec4b-b10c-48c5-9345-fc73c48a80aa" },
            title: { S: "Product 3" },
            description: { S: "Short Product Description 3" },
            price: { N: "200" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: "4567ec4b-b10c-48c5-9345-fc73c48a80a4" },
            title: { S: "Product 4" },
            description: { S: "Short Product Description 4" },
            price: { N: "150" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: "5567ec4b-b10c-48c5-9345-fc73c48a80a5" },
            title: { S: "Product 5" },
            description: { S: "Short Product Description 5" },
            price: { N: "130" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: "6567ec4b-b10c-48c5-9345-fc73c48a80a6" },
            title: { S: "Product 6" },
            description: { S: "Short Product Description 6" },
            price: { N: "300" },
          },
        },
      },
    ],
  },
};

ddb.batchWriteItem(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});

// STOCK TABLE
var stockParams = {
  RequestItems: {
    stocks: [
      {
        PutRequest: {
          Item: {
            product_id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80aa" },
            count: { N: "5" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            product_id: { S: "2567ec4b-b10c-48c5-9345-fc73c48a80aa" },
            count: { N: "5" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            product_id: { S: "3567ec4b-b10c-48c5-9345-fc73c48a80aa" },
            count: { N: "1" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            product_id: { S: "4567ec4b-b10c-48c5-9345-fc73c48a80a4" },
            count: { N: "10" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            product_id: { S: "5567ec4b-b10c-48c5-9345-fc73c48a80a5" },
            count: { N: "20" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            product_id: { S: "6567ec4b-b10c-48c5-9345-fc73c48a80a6" },
            count: { N: "15" },
          },
        },
      },
    ],
  },
};

ddb.batchWriteItem(stockParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
