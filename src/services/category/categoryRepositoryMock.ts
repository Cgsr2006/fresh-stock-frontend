import { ICategoryData } from "@/src/utils/types";

export function getCategories(): ICategoryData[] | null {
  const stored = localStorage.getItem("categories");

  return stored ? JSON.parse(stored) : null;
}

export function saveCategories(categories: ICategoryData[]) {
  localStorage.setItem("categories", JSON.stringify(categories));
}

export function createCategory(
  categories: ICategoryData[],
  data: Pick<ICategoryData, "name">,
): ICategoryData[] {
  const lastId = categories.length
    ? Math.max(...categories.map((categories) => categories.id))
    : 0;

  return [
    ...categories,
    {
      id: lastId + 1,
      name: data.name,
      qtdProductsInStock: 0,
    },
  ];
}

export function updateCategory(
  categories: ICategoryData[],
  id: number,
  name: string,
): ICategoryData[] {
  return categories.map((category) =>
    category.id === id
      ? {
          name: name,
          id: category.id,
          qtdProductsInStock: category.qtdProductsInStock,
        }
      : category,
  );
}

export function deleteCategory(categories: ICategoryData[], id: number) {
  return categories.filter((category) => category.id !== id);
}
