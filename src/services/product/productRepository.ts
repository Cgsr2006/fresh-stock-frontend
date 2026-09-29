import useSWR from "swr";
import { IProductData } from "@/src/utils/types";
import { fetcher } from "../../utils/fetcher";

export function useProducts(category?: string) {
  const url =
    category != ""
      ? `http://localhost:8080/products/getProductsByCategory/${category}`
      : "http://localhost:8080/products/getAll";

  return useSWR<IProductData[]>(url, fetcher);
}

export async function createNewProduct(
  data: Pick<IProductData, "name" | "price" | "qtdInStock" | "categoryId">,
) {
  try {
    const response = await fetch("http://localhost:8080/products/create", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        price: data.price,
        qtdInStock: data.qtdInStock,
        categoryId: data.categoryId,
      }),
    });

    if (!response) {
      throw new Error("Failed to create product");
    }

    const result = await response.json();
    console.log("Produto criado com sucesso:", result);
  } catch (error) {
    console.log("Error na criação do produto:", error);
  }
}

export async function deleteProduct(id: number): Promise<boolean | null> {
  try {
    const response = await fetch(
      `http://localhost:8080/products/deleteById/${id}`,
      {
        method: "DELETE",
      },
    );

    const res = await response.json();
    console.log("Produto deletado com sucesso:", res);
    return true;
  } catch (error) {
    console.log("Error na exclusão do produto:", error);
    return null;
  }
}

export async function updateProduct(data: IProductData) {
  try {
    const response = await fetch(
      `http://localhost:8080/products/updateById/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          price: data.price,
          qtdInStock: data.qtdInStock,
          categoryId: data.categoryId,
        }),
      },
    );

    if (!response) {
      throw new Error("Failed to update product");
    }

    const result = await response.json();
    console.log("Produto atualizado com sucesso:", result);
  } catch (error) {
    console.log("Error na atualização do produto:", error);
  }
}
