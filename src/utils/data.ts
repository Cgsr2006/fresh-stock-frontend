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
    selectedIcon: SvgBoxIconSelected,
    unselectedIcon: SvgBoxIconUnselected,
  },
  {
    title: tabsTitle.CATEGORIAS,
    selectedIcon: SvgFunnelIconSelected,
    unselectedIcon: SvgFunnelIconUnselected,
  },
];
