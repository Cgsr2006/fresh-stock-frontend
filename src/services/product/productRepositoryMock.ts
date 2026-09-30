import { IProductData } from "@/src/utils/types";

export function getProducts(): IProductData[] | null {
  const stored = localStorage.getItem("products");

  return stored ? JSON.parse(stored) : null;
}

export function saveProducts(products: IProductData[]) {
  localStorage.setItem("products", JSON.stringify(products));
}

export function createProduct(
  products: IProductData[],
  data: Pick<IProductData, "name" | "price" | "qtdInStock" | "categoryId">,
): IProductData[] {
  const lastId = products.length
    ? Math.max(...products.map((product) => product.id))
    : 0;

  console.log(lastId);
  console.log(data);

  return [
    ...products,
    {
      ...data,
      id: lastId + 1,
    },
  ];
}

export function updateProduct(
  products: IProductData[],
  id: number,
  data: Pick<IProductData, "name" | "price" | "qtdInStock" | "categoryId">,
): IProductData[] {
  return products.map((product) =>
    product.id === id
      ? {
          id: product.id,
          ...data,
        }
      : product,
  );
}

export function deleteProduct(
  products: IProductData[],
  id: number,
): IProductData[] {
  return products.filter((product) => product.id !== id);
}
