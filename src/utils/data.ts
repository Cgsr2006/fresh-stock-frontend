import {
  IProductData,
  ITabs,
  tabsTitle,
  ICategoryData,
} from "./types";
import SvgBoxIconSelected from "@/public/BoxIconSelected.svg";
import SvgBoxIconUnselected from "@/public/BoxIconUnselected.svg";
import SvgFunnelIconSelected from "@/public/FunnelIconSelected.svg";
import SvgFunnelIconUnselected from "@/public/FunnelIconUnselected.svg";

export const mockedProductsData: IProductData[] = [
  {
    id: 0,
    name: "maçâ",
    categoryId: 0, 
    price: 10.0,
    qtdInStock: 67,
  },
  {
    id: 1,
    name: "banana",
    categoryId: 0, 
    price: 15.0,
    qtdInStock: 69,
  },
  {
    id: 2,
    name: "amaciante",
    categoryId: 3, 
    price: 20.0,
    qtdInStock: 24,
  },
];

export const mockedCategoriesData: ICategoryData[] = [
  {
    id: 0,
    name: "Food",
    qtdProductsInStock: 2,
  },
  {
    id: 1,
    name: "Drink",
    qtdProductsInStock: 7,
  },
  {
    id: 2,
    name: "Hygiene",
    qtdProductsInStock: 0,
  },
  {
    id: 3,
    name: "Cleaning",
    qtdProductsInStock: 13,
  },
];

export const TABS: ITabs[] = [
  {
    title: tabsTitle.ESTOQUE,
    selectedIcon: SvgBoxIconSelected,
    unselectedIcon: SvgBoxIconUnselected,
  },
  {
    title: tabsTitle.CATEGORIAS,
    selectedIcon: SvgFunnelIconSelected,
    unselectedIcon: SvgFunnelIconUnselected,
  },
];
