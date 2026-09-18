import { mockedProductsData } from "./data";

export const fetcher = async (url) => {
  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    // throw new Error("Failed to fetch data");
    return mockedProductsData;
  }

  return res.json(); // Retorna os dados já em formato JSON
};
