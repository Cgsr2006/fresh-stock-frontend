import { ICategoryData, CategoryRepository } from "@/src/utils/types";

export const apiCategoryRepository: CategoryRepository = {
  async getCategories() {
    const response = await fetch("http://localhost:8080/categories/getAll");

    if (!response.ok) {
      return null;
    }

    return await response.json();
  },

  async createCategory(data) {
    try {
      const response = await fetch("http://localhost:8080/categories/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch {
      return null;
    }
  },

  async updateCategory(id, name) {
    try {
      const response = await fetch(
        `http://localhost:8080/categories/updateById/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        },
      );

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch {
      return null;
    }
  },

  async deleteCategory(id) {
    try {
      const response = await fetch(
        `http://localhost:8080/categories/deleteById/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        return null;
      }

      return true;
    } catch {
      return null;
    }
  },
};
