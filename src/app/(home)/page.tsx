"use client";

import Image from "next/image";
import "./style.scss";

import React, { useEffect, useState } from "react";
import {
  Package,
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Pencil,
  Trash2,
  Check,
  X,
  ChevronDown,
  Tag,
} from "lucide-react";
import { ICategoryData, IProductData, tabsTitle } from "@/src/utils/types";
import {
  mockedCategoriesData,
  mockedProductsData,
  TABS,
} from "@/src/utils/data";
import SvgBoxIconSelected from "@/public/BoxIconSelected.svg";
import SvgPlusIcon from "@/public/PlusIcon.svg";
import SvgLabelIcon from "@/public/LabelIcon.svg";
import SvgGreyPlusIcon from "@/public/GreyPlusIcon.svg";
import SvgNoProductsIcon from "@/public/NoProductsIcon.svg";

interface sideBarProps {
  activeTab: tabsTitle;
  setActiveTab: React.Dispatch<React.SetStateAction<tabsTitle>>;
}

function SideBar({ setActiveTab, activeTab }: sideBarProps) {
  return (
    <section className="side-bar">
      <header className="header">
        <div className="icon-box">
          <Image src={SvgBoxIconSelected} alt="" className="icon" />
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
              <Image
                src={active ? tab.selectedIcon : tab.unselectedIcon}
                alt=""
              />
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

interface productTableProps {
  productsData: IProductData[];
}

function ProductsTable({ productsData }: productTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedName, setSelectedName] = useState<string>("");
  const [editCategory, setEditCategory] = useState<number>(-1);
  const [productsDataControl, setProductsDataControl] =
    useState<IProductData[]>(mockedProductsData);
  const filteredMockedData = productsDataControl.filter((product) => {
    const matchesCategory =
      selectedCategory === "" ||
      product.categoryId.toString() === selectedCategory;

    const matchesName =
      selectedName === "" || product.name.includes(selectedName);

    return matchesCategory && matchesName;
  });

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");

    if (storedProducts) {
      setProductsDataControl(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(productsDataControl));
  }, [productsDataControl]);

  function deleteProduct(id: number) {
    setProductsDataControl((prevProducts) =>
      prevProducts.filter((product) => product.id != id),
    );
  }

  return (
    <section className="products-table">
      <div className="header">
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
        />

        <div className="filter">
          <span>Filtrar: </span>

          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>{" "}
            {mockedCategoriesData.map((category, index) => (
              <option
                key={`${category.name}-${index}`}
                value={category.id.toString()}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {productsDataControl.length === 0 || productsData.length === 0 ? (
        <div className="no-products">
          <Image src={SvgNoProductsIcon} alt="Nenhum produto disponível" />
          <p>Nenhum produto disponível no momento.</p>
        </div>
      ) : (
        <form className="body">
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
                  <tr key={product.id} className="product-row">
                    <td className="id">
                      {product.id.toString().padStart(3, "0")}
                    </td>
                    <td>{product.name}</td>
                    <td className="price">
                      R${" "}
                      {product.price.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      <div className="stock">{product.qtdInStock} unid.</div>
                    </td>
                    <td>
                      <div className="category">
                        <Tag className="icon" />
                        {categoryName?.name}
                      </div>
                    </td>
                    <td className="action">
                      <button onClick={() => setEditCategory(product.id)}>
                        {product.id === editCategory ? (
                          <Check className="icon" />
                        ) : (
                          <Pencil className="icon" />
                        )}
                      </button>
                      <button
                        className="alt"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <Trash2 className="icon" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
      )}

      <footer>
        <small>
          Mostrando {filteredMockedData.length} de {mockedProductsData.length}{" "}
          produtos
        </small>
      </footer>
    </section>
  );
}

interface categoriesGridProps {
  categoriesData: ICategoryData[];
}

function CategoriesGrid({ categoriesData }: categoriesGridProps) {
  const [categoriesDataControl, setCategoriesDataControl] =
    useState<ICategoryData[]>(mockedCategoriesData);

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");

    if (storedCategories) {
      setCategoriesDataControl(JSON.parse(storedCategories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categoriesDataControl));
  }, [categoriesDataControl]);

  function addNewCategory() {
    setCategoriesDataControl((prevCategories) => {
      const lastId = prevCategories.length
        ? Math.max(...prevCategories.map((category) => category.id))
        : 0;

      return [
        ...prevCategories,
        {
          id: lastId + 1,
          name: "Food",
          qtdProductsInStock: 0,
        },
      ];
    });
  }

  function deleteCategory(id: number) {
    setCategoriesDataControl((prevCategories) =>
      prevCategories.filter((category) => category.id != id),
    );
  }

  return (
    <section className="categories-grid">
      {categoriesDataControl.map((category) => (
        <div key={`${category.id}`} className="card">
          <div className="left">
            <div className="icon">
              <Image src={SvgLabelIcon} alt="" />
            </div>
            <div className="text">
              <span>{category.name}</span>
              <small>{category.qtdProductsInStock} produtos</small>
            </div>
          </div>

          <div className="buttons">
            <button>
              <Pencil className="icon" />
            </button>
            <button className="alt" onClick={() => deleteCategory(category.id)}>
              <Trash2 className="icon" />
            </button>
          </div>
        </div>
      ))}

      <button className="new-category" onClick={() => addNewCategory()}>
        <Image src={SvgGreyPlusIcon} alt="" />
        <span>Criar nova categoria</span>
      </button>
    </section>
  );
}

interface dasBoardProps {
  activeTab: tabsTitle;
}

function DashBoard({ activeTab }: dasBoardProps) {
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

        <button className="new-product">
          <Image src={SvgPlusIcon} alt="" />

          <span>
            {activeTab === tabsTitle.ESTOQUE
              ? "Novo Produto"
              : "Nova Categoria"}
          </span>
        </button>
      </div>

      {activeTab === tabsTitle.ESTOQUE ? (
        <ProductsTable productsData={mockedProductsData} />
      ) : (
        <CategoriesGrid categoriesData={mockedCategoriesData} />
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
