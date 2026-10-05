import { mockProductRepository } from "./productRepositoryMock";
import { apiProductRepository } from "./productRepositoryApi";

const apiProducts = await apiProductRepository.getProducts();

export const productRepository =
  apiProducts !== null ? apiProductRepository : mockProductRepository;
