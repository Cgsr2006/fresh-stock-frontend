import { ICategoryData, CategoryRepository } from "@/src/utils/types";
import { mockedCategoriesData } from "@/src/utils/data";

export const mockCategoryRepository: CategoryRepository = {
  async getCategories() {
    const stored = localStorage.getItem("categories");

    return stored ? JSON.parse(stored) : mockedCategoriesData;
  },

  async createCategory(data) {
    const categories = await this.getCategories();

    if (!categories) {
      return null;
    }

    const lastId = categories.length
      ? Math.max(...categories.map((category) => category.id))
      : 0;

    const newCategory: ICategoryData = {
      id: lastId + 1,
      name: data.name,
      qtdProductsInStock: 0,
    };

    const updatedCategories = [...categories, newCategory];

    localStorage.setItem("categories", JSON.stringify(updatedCategories));

    return newCategory;
  },

  async updateCategory(id, name) {
    const categories = await this.getCategories();

    if (!categories) {
      return null;
    }

    const updatedCategories = categories.map((category) =>
      category.id === id
        ? {
            ...category,
            name,
          }
        : category,
    );

    localStorage.setItem("categories", JSON.stringify(updatedCategories));

    return updatedCategories.find((category) => category.id === id) ?? null;
  },

  async deleteCategory(id) {
    const categories = await this.getCategories();

    if (!categories) {
      return null;
    }

    const updatedCategories = categories.filter(
      (category) => category.id !== id,
    );

    localStorage.setItem("categories", JSON.stringify(updatedCategories));

    return true;
  },
};
