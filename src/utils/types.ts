export enum tabsTitle {
  ESTOQUE = "Estoque",
  CATEGORIAS = "Categorias",
}

// Interface usada para a tipagem das informações da entidade Categorias
export interface ICategoryData {
  id: number;
  name: string;
  qtdProductsInStock: number;
}

// Interface usada para a tipagem das informações da entidade Produtos
export interface IProductData {
  id: number;
  name: string;
  price: number;
  qtdInStock: number;
  categoryId: number;
}

export interface ITabs {
  title: tabsTitle;
  selectedIcon: string;
  unselectedIcon: string;
}
