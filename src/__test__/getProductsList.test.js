import { getProductsList } from "../handlers/getProductsList";

describe("getProductsList", () => {
  it("TEST: GET ALL PRODUCTS", async () => {
    const response = await getProductsList();
    const { statusCode } = response;

    expect(statusCode).toBe(200);
  });
});
