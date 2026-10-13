import { ProductRepository } from "@/src/utils/types";

export const apiProductRepository: ProductRepository = {
  async getProducts() {
    const response = await fetch("http://localhost:8080/products/getAll");

    if (!response.ok) {
      return null;
    }

    return await response.json();
  },

  async createProduct(data) {
    const response = await fetch("http://localhost:8080/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  async updateProduct(data) {
    const response = await fetch(
      `http://localhost:8080/products/updateById/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    return response.json();
  },

  async deleteProduct(id) {
    await fetch(`http://localhost:8080/products/deleteById/${id}`, {
      method: "DELETE",
    });
  },
};
