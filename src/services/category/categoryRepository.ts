import { mockCategoryRepository } from "./categoryRepositoryMock";
import { apiCategoryRepository } from "./categoryRepositoryApi";

const apiCategories = await apiCategoryRepository.getCategories();

export const categoryRepository =
  apiCategories !== null ? apiCategoryRepository : mockCategoryRepository;
