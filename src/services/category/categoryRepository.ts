import { mockCategoryRepository } from "./categoryRepositoryMock";
import { apiCategoryRepository } from "./categoryRepositoryApi";
import { createDynamicRepository } from "../createDynamicRepository";

export const categoryRepository = createDynamicRepository(
  apiCategoryRepository,
  mockCategoryRepository,
);
