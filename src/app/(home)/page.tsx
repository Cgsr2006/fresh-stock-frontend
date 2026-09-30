"use client";

import Image from "next/image";
import "./style.scss";

import React, { useEffect, useState } from "react";
import {
  Package,
  Search,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Tag,
} from "lucide-react";
import {
  ICategoryData,
  IProductData,
  ITabs,
  tabsTitle,
} from "@/src/utils/types";
import {
  mockedCategoriesData,
  mockedProductsData,
  TABS,
} from "@/src/utils/data";
import {
  createProduct,
  deleteProduct,
  getProducts,
  saveProducts,
  updateProduct,
} from "@/src/services/product/productRepositoryMock";
import SvgNoProductsIcon from "@/public/assets/NoProductsIcon.svg";
import { useForm } from "react-hook-form";
import {
  createCategory,
  deleteCategory,
  getCategories,
  saveCategories,
  updateCategory,
} from "@/src/services/category/categoryRepositoryMock";

interface sideBarProps {
  activeTab: tabsTitle;
  setActiveTab: React.Dispatch<React.SetStateAction<tabsTitle>>;
}

interface productTableProps {
  productsData: IProductData[];
  setProductsData: React.Dispatch<React.SetStateAction<IProductData[]>>;
  newProduct: boolean;
  setNewProduct: React.Dispatch<React.SetStateAction<tabsTitle | null>>;
  categoriesData: ICategoryData[];
}

interface categoriesGridProps {
  categoriesData: ICategoryData[];
  setCategoriesData: React.Dispatch<React.SetStateAction<ICategoryData[]>>;
  newCategory: boolean;
  setNewCategory: React.Dispatch<React.SetStateAction<tabsTitle | null>>;
  productsData: IProductData[];
}

interface dasBoardProps {
  activeTab: tabsTitle;
}

function SideBar({ setActiveTab, activeTab }: sideBarProps) {
  return (
    <section className="side-bar">
      <header className="header">
        <div className="icon-box">
          <Package size={18} />
        </div>
        <h1>FreshStock</h1>
      </header>

      <div className="tabs">
        {TABS.map((tab, index) => {
          const active = tab.title === activeTab;

          return (
            <button
              key={`tab-${index}`}
              className={`tab ${active ? "active" : ""}`}
              onClick={() => setActiveTab(tab.title)}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>

      <div className="profile">
        <div className="user-icon" />
        <div className="user-info">
          <h1>Manager</h1>
          <small>Admin</small>
        </div>
      </div>
    </section>
  );
}

function ProductsTable({
  productsData,
  setProductsData,
  newProduct,
  setNewProduct,
  categoriesData,
}: productTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedName, setSelectedName] = useState<string>("");
  const [editProductId, setEditProductId] = useState<number | null>(null); // Guarda um valor nulo ou o id do produto que será editado
  const filteredMockedData = productsData.filter((product) => {
    const matchesCategory =
      selectedCategory === "" ||
      product.categoryId.toString() === selectedCategory;

    const matchesName =
      selectedName === "" || product.name.includes(selectedName);

    return matchesCategory && matchesName;
  });
  const formData = useForm<
    Pick<IProductData, "name" | "price" | "qtdInStock" | "categoryId">
  >({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { isValid } = formData.formState;

  useEffect(() => {
    if (editProductId) {
      const control = filteredMockedData.filter((e) => e.id === editProductId);

      formData.reset(...control);
    }
  }, [editProductId]);

  useEffect(() => {
    if (newProduct) {
      formData.reset({ name: "", price: 0, qtdInStock: 0, categoryId: 1 });
    }
  }, [newProduct]);

  function handleDeleteProduct(id: number) {
    setProductsData((prev) => deleteProduct(prev, id));
  }

  function handleUpdateProduct(
    id: number,
    data: Pick<IProductData, "name" | "price" | "qtdInStock" | "categoryId">,
  ) {
    setProductsData((prev) => updateProduct(prev, id, data));
    setEditProductId(null);
  }

  function handleCreateProduct() {
    setProductsData((prev) => createProduct(prev, formData.getValues()));
    setNewProduct(null);
  }

  return (
    <section className="products-table">
      <div className="header">
        <div className="search-products">
          <Search size={16} className="icon" />{" "}
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
          />
        </div>

        <div className="filter">
          <span>Filtrar: </span>

          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>{" "}
            {categoriesData.map((category, index) => (
              <option key={`${category.name}-${index}`} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {productsData.length === 0 ? (
        <div className="no-products">
          <Image src={SvgNoProductsIcon} alt="Nenhum produto disponível" />
          <p>Nenhum produto disponível no momento.</p>
        </div>
      ) : (
        <div className="body">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do Produto</th>
                <th>Preço</th>
                <th>Em Estoque</th>
                <th>Categoria</th>
                <th className="action">Ações</th>
              </tr>
            </thead>

            <tbody>
              {filteredMockedData.map((product) => {
                const categoryName = mockedCategoriesData.find(
                  (e) => e.id === product.categoryId,
                );

                return (
                  <tr key={product.id}>
                    <td className="id">
                      {product.id.toString().padStart(3, "0")}
                    </td>
                    {editProductId === product.id ? (
                      <>
                        <td>
                          <input
                            className="edit-product-input"
                            {...formData.register("name", { required: true })}
                          />
                        </td>

                        <td>
                          <input
                            className="edit-product-input"
                            {...formData.register("price", {
                              required: true,
                              valueAsNumber: true,
                            })}
                            type="number"
                          />
                        </td>
                        <td>
                          <input
                            className="edit-product-input"
                            {...formData.register("qtdInStock", {
                              required: true,
                              valueAsNumber: true,
                            })}
                            type="number"
                          />
                        </td>
                        <td>
                          <select
                            className="category-select"
                            {...formData.register("categoryId", {
                              required: true,
                              valueAsNumber: true,
                            })}
                          >
                            {mockedCategoriesData.map((category, index) => (
                              <option
                                key={`${category.name}-${index}`}
                                value={category.id}
                              >
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{product.name}</td>
                        <td className="price">
                          R${" "}
                          {product.price.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td>
                          <div className="stock">
                            {product.qtdInStock} unid.
                          </div>
                        </td>
                        <td>
                          <div className="category">
                            <Tag className="icon" />
                            {categoryName?.name}
                          </div>
                        </td>
                      </>
                    )}

                    <td className="action">
                      <button
                        onClick={() =>
                          editProductId != null
                            ? handleUpdateProduct(
                                editProductId,
                                formData.getValues(),
                              )
                            : setEditProductId(product.id)
                        }
                        type="button"
                      >
                        {product.id === editProductId ? (
                          <Check className="icon" />
                        ) : (
                          <Pencil className="icon" />
                        )}
                      </button>
                      <button
                        className="alt"
                        type="button"
                        onClick={() =>
                          editProductId != null
                            ? setEditProductId(null)
                            : handleDeleteProduct(product.id)
                        }
                      >
                        {product.id === editProductId ? (
                          <X className="icon" />
                        ) : (
                          <Trash2 className="icon" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}

              {newProduct && (
                <tr>
                  <td className="id">?</td>

                  <td>
                    <input
                      className="edit-product-input"
                      {...formData.register("name", {
                        required: true,
                        validate: (value) =>
                          value != "" || "O produto deve ter um nome",
                      })}
                    />
                  </td>

                  <td>
                    <input
                      className="edit-product-input"
                      {...formData.register("price", {
                        required: true,
                        valueAsNumber: true,
                        validate: (value) =>
                          value > 0.0 || "O preço deve ser maior que 0",
                      })}
                      type="number"
                    />
                  </td>
                  <td>
                    <input
                      className="edit-product-input"
                      {...formData.register("qtdInStock", {
                        required: true,
                        valueAsNumber: true,
                        validate: (value) =>
                          value >= 0 || "A quantidade não pode ser negativa",
                      })}
                      type="number"
                    />
                  </td>
                  <td>
                    <select
                      className="category-select"
                      {...formData.register("categoryId", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    >
                      {mockedCategoriesData.map((category, index) => (
                        <option
                          key={`${category.name}-${index}`}
                          value={category.id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="action">
                    <button
                      onClick={() => handleCreateProduct()}
                      type="button"
                      disabled={!isValid}
                    >
                      <Check className="icon" />
                    </button>

                    <button
                      onClick={() => setNewProduct(null)}
                      type="button"
                      className="alt"
                    >
                      <X className="icon" />
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <footer>
        <small>
          Mostrando {filteredMockedData.length} de {productsData.length}{" "}
          produtos
        </small>
      </footer>
    </section>
  );
}

function CategoriesGrid({
  categoriesData,
  setCategoriesData,
  newCategory,
  setNewCategory,
  productsData,
}: categoriesGridProps) {
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const formData = useForm<Pick<ICategoryData, "name">>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (newCategory == true) {
      formData.reset();
    }
  }, [newCategory]);

  useEffect(() => {
    if (editCategoryId) {
      const control = categoriesData.filter((e) => e.id === editCategoryId);

      formData.reset(...control);
    }
  }, [editCategoryId]);

  function handleCreateCategory() {
    setCategoriesData((prev) => createCategory(prev, formData.getValues()));

    setNewCategory(null);
  }

  function handleUpdateCategory(id: number) {
    setCategoriesData((prev) =>
      updateCategory(prev, id, formData.getValues("name")),
    );
    setEditCategoryId(null);
  }

  function handleDeleteCategory(id: number) {
    setCategoriesData((prev) => deleteCategory(prev, id));
  }

  return (
    <section className="categories-grid">
      {categoriesData.map((category) => {
        return editCategoryId != category.id ? (
          <div key={`${category.id}`} className="card default">
            <div className="left">
              <div className="icon">
                <Tag size={16} />
              </div>
              <div className="text">
                <span>{category.name}</span>
                <small>{category.qtdProductsInStock} produtos</small>
              </div>
            </div>

            <div className="buttons">
              <button onClick={() => setEditCategoryId(category.id)}>
                <Pencil className="icon" />
              </button>
              <button
                className="alt"
                onClick={() => handleDeleteCategory(category.id)}
              >
                <Trash2 className="icon" />
              </button>
            </div>
          </div>
        ) : (
          <div key={`${category.id}`} className="card alt">
            <div className="top">
              <div className="icon">
                <Tag size={18} />
              </div>
              <input
                type="text"
                placeholder="Nova Categoria"
                {...formData.register("name", { required: true })}
              />
            </div>

            <div className="buttons">
              <button className="alt" onClick={() => setEditCategoryId(null)}>
                Cancelar
              </button>
              <button onClick={() => handleUpdateCategory(category.id)}>
                Salvar
              </button>
            </div>
          </div>
        );
      })}

      {newCategory ? (
        <div className="card alt">
          <div className="top">
            <div className="icon">
              <Plus size={18} />
            </div>
            <input
              type="text"
              placeholder="Nova Categoria"
              {...formData.register("name", { required: true })}
            />
          </div>

          <div className="buttons">
            <button className="alt" onClick={() => setNewCategory(null)}>
              Cancelar
            </button>
            <button onClick={() => handleCreateCategory()}>Criar</button>
          </div>
        </div>
      ) : (
        <button
          className="new-category-card"
          onClick={() => setNewCategory(tabsTitle.CATEGORIAS)}
        >
          <Plus size={20} />
          <span>Criar nova categoria</span>
        </button>
      )}
    </section>
  );
}

function DashBoard({ activeTab }: dasBoardProps) {
  const [newProductOrCategory, setNewProductOrCategory] =
    useState<tabsTitle | null>(null);

  const productsData: IProductData[] | null = null;
  const categoriesData: ICategoryData[] | null = null;

  const [productsDataControl, setProductsDataControl] = useState<
    IProductData[]
  >(productsData ? productsData : []);
  const [categoriesDataControl, setCategoriesDataControl] = useState<
    ICategoryData[]
  >(categoriesData ? categoriesData : []);

  useEffect(() => {
    if (!productsData && !categoriesData) {
      const storedCategories = getCategories();
      const storedProducts = getProducts();

      if (storedCategories) {
        setCategoriesDataControl(storedCategories);
      } else {
        setCategoriesDataControl(mockedCategoriesData);
      }

      if (storedProducts) {
        setProductsDataControl(storedProducts);
      } else {
        setProductsDataControl(mockedProductsData);
      }
    }
  }, []);

  useEffect(() => {
    saveCategories(categoriesDataControl);
    saveProducts(productsDataControl);
  }, [categoriesDataControl, productsDataControl]);

  useEffect(() => {
    if (categoriesDataControl.length > 0) {
      const updatedCategoriesProductCount = categoriesDataControl.map(
        (category) => ({
          ...category,
          qtdProductsInStock: productsDataControl.filter(
            (product) => product.categoryId === category.id,
          ).length,
        }),
      );

      setCategoriesDataControl(updatedCategoriesProductCount);
    }
  }, [productsDataControl]);

  return (
    <section className="dashBoard">
      <div className="header">
        <div className="title">
          <h1>
            {activeTab === tabsTitle.ESTOQUE
              ? "Gestão de Estoque"
              : "Categorias"}
          </h1>
          <p>
            {activeTab === tabsTitle.ESTOQUE
              ? "Gerencie seus produtos, preços e disponibilidade."
              : "Organize os grupos de produtos do seu mercado."}
          </p>
        </div>

        <button
          className="new-product"
          onClick={() =>
            setNewProductOrCategory(
              activeTab === tabsTitle.ESTOQUE
                ? tabsTitle.ESTOQUE
                : tabsTitle.CATEGORIAS,
            )
          }
          disabled={newProductOrCategory != null}
        >
          <Plus size={16} />

          <span>
            {activeTab === tabsTitle.ESTOQUE
              ? "Novo Produto"
              : "Nova Categoria"}
          </span>
        </button>
      </div>

      {activeTab === tabsTitle.ESTOQUE ? (
        <ProductsTable
          productsData={productsDataControl}
          setProductsData={setProductsDataControl}
          newProduct={newProductOrCategory === tabsTitle.ESTOQUE}
          setNewProduct={setNewProductOrCategory}
          categoriesData={categoriesDataControl}
        />
      ) : (
        <CategoriesGrid
          categoriesData={categoriesDataControl}
          setCategoriesData={setCategoriesDataControl}
          newCategory={newProductOrCategory === tabsTitle.CATEGORIAS}
          setNewCategory={setNewProductOrCategory}
          productsData={productsDataControl}
        />
      )}
    </section>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<tabsTitle>(tabsTitle.ESTOQUE);

  return (
    <div className="page home">
      <SideBar setActiveTab={setActiveTab} activeTab={activeTab} />
      <DashBoard activeTab={activeTab} />
    </div>
  );
}
