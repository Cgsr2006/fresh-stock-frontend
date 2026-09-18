import { IProduct, productCategory } from "./types";

export const mockedProductsData: IProduct[] = [
  {
    id: 0,
    name: "maçâ",
    category: productCategory.FOOD,
    price: 10.0,
    qtdInStock: 67,
  },
  {
    id: 1,
    name: "banana",
    category: productCategory.FOOD,
    price: 15.0,
    qtdInStock: 69,
  },
  {
    id: 2,
    name: "amaciante",
    category: productCategory.CLEANING,
    price: 20.0,
    qtdInStock: 24,
  },
];
