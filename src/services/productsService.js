import products from "../utils/products";

const productsService = {
  getALL: async () => products,
  getById: async (id) => products.find((product) => product.id === id),
};

export default productsService;
