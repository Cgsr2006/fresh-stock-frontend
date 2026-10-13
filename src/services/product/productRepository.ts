import { mockProductRepository } from "./productRepositoryMock";
import { apiProductRepository } from "./productRepositoryApi";
import { createDynamicRepository } from "../createDynamicRepository";

export const productRepository = createDynamicRepository(
  apiProductRepository,
  mockProductRepository,
);
