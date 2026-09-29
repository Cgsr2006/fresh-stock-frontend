import { IProductData, ITabs, tabsTitle, ICategoryData } from "./types";
import { Package, Filter } from "lucide-react";

export const mockedProductsData: IProductData[] = [
  {
    id: 1,
    name: "maçã",
    categoryId: 1,
    price: 10.0,
    qtdInStock: 67,
  },
  {
    id: 2,
    name: "banana",
    categoryId: 1,
    price: 15.0,
    qtdInStock: 69,
  },
  {
    id: 3,
    name: "amaciante",
    categoryId: 4,
    price: 20.0,
    qtdInStock: 24,
  },
];

export const mockedCategoriesData: ICategoryData[] = [
  {
    id: 1,
    name: "Food",
    qtdProductsInStock: 2,
  },
  {
    id: 2,
    name: "Drink",
    qtdProductsInStock: 7,
  },
  {
    id: 3,
    name: "Hygiene",
    qtdProductsInStock: 0,
  },
  {
    id: 4,
    name: "Cleaning",
    qtdProductsInStock: 13,
  },
];

export const TABS: ITabs[] = [
  {
    title: tabsTitle.ESTOQUE,
    icon: <Package size={16} />,
  },
  {
    title: tabsTitle.CATEGORIAS,
    icon: <Filter size={16} />,
  },
];
