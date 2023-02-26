import { getProductById } from "../handlers/getProductById";

describe("getProductById", () => {
  it("TEST: GET PRODUCT BY ID", async () => {
    const response = await getProductById({
      pathParameters: {
        productId: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
      },
    });
    const { statusCode } = response;

    expect(statusCode).toBe(200);
  });

  describe("getProductById - Product not found", () => {
    it("TEST: GET PRODUCT BY ID", async () => {
      const response = await getProductById({
        pathParameters: {
          productId: "0",
        },
      });
      const { body } = response;

      expect(JSON.parse(body).message).toBe("Product not found!");
    });
  });
});
