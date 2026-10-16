import useSWR from "swr";
import { productRepository } from "@/src/services/product/productRepository";
import { categoryRepository } from "@/src/services/category/categoryRepository";

export function useProducts() {
  const res = useSWR("products", () => productRepository.getProducts(), {
    refreshInterval: 5000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return res;
}

export function useCategories() {
  const res = useSWR("categories", () => categoryRepository.getCategories(), {
    refreshInterval: 5000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return res;
}
