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
  icon: React.ReactNode;
}

export interface ProductRepository {
  getProducts(): Promise<IProductData[]>;

  createProduct(
    data: Pick<IProductData, "name" | "price" | "qtdInStock" | "categoryId">,
  ): Promise<IProductData>;

  updateProduct(data: IProductData): Promise<IProductData>;

  deleteProduct(id: number): Promise<void>;
}

export interface CategoryRepository {
  getCategories(): Promise<ICategoryData[]>;

  createCategory(
    data: Pick<ICategoryData, "name">,
  ): Promise<ICategoryData | null>;

  updateCategory(id: number, name: string): Promise<ICategoryData | null>;

  deleteCategory(id: number): Promise<boolean | null>;
}
