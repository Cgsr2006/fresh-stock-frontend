import { mockedProductsData } from "@/src/utils/data";
import { ProductRepository } from "@/src/utils/types";

export const mockProductRepository: ProductRepository = {
  async getProducts() {
    const stored = localStorage.getItem("products");

    return stored ? JSON.parse(stored) : mockedProductsData;
  },

  async createProduct(data) {
    const products = await this.getProducts();

    const lastId = products.length
      ? Math.max(...products.map((product) => product.id))
      : 0;

    const newProduct = {
      ...data,
      id: lastId + 1,
    };

    const updatedProducts = [...products, newProduct];

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    return newProduct;
  },

  async updateProduct(data) {
    const products = await this.getProducts();

    const updatedProducts = products.map((product) =>
      product.id === data.id ? data : product,
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    return data;
  },

  async deleteProduct(id) {
    const products = await this.getProducts();

    const updatedProducts = products.filter((product) => product.id !== id);

    localStorage.setItem("products", JSON.stringify(updatedProducts));
  },
};
