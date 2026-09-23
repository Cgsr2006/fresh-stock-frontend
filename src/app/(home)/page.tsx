"use client";

import Image from "next/image";
import "./style.scss";

import React, { useEffect, useState } from "react";
import { IProductData, tabsTitle } from "@/src/utils/types";
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
import SvgArowDownIcon from "@/public/ArowDownIcon.svg";

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
  if (!productsData || productsData.length === 0) {
    return (
      <div className="no-products">
        <Image src={SvgNoProductsIcon} alt="Nenhum produto disponível" />
        <p>Nenhum produto disponível no momento.</p>
      </div>
    );
  } else {
    return (
      <section className="products-table">
        <div className="header">
          <input type="text" placeholder="Buscar produtos..." />

          <div className="filter">
            <span>Filtrar: </span>

            <select className="category-select">
              <option value="">All</option>{" "}
              {mockedCategoriesData.map((category, index) => (
                <option key={`${category.name}-${index}`} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

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
              {productsData.map((product) => {
                const categoryName = mockedCategoriesData.find(
                  (e) => e.id === product.categoryId,
                );

                return (
                  <tr key={product.id} className="product-row">
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td className="price">R$ {product.price}</td>
                    <td className="stock">{product.qtdInStock} unid.</td>
                    <td className="category">{categoryName?.name}</td>
                    <td className="action"></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
      </section>
    );
  }
}

function CategoriesGrid() {
  const [categoriesData, setCategoriesData] = useState(mockedCategoriesData);

  function addNewCategory() {
    const lastIndex = mockedCategoriesData.length - 1;
    const lastId = mockedCategoriesData[lastIndex].id;

    mockedCategoriesData.push({
      id: lastId + 1,
      name: "Food",
      qtdProductsInStock: 0,
    });

    localStorage.setItem("categories", JSON.stringify(mockedCategoriesData));
    setCategoriesData(JSON.parse(localStorage.getItem("categories") ?? "[]"));
  }

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(mockedCategoriesData));
  }, []);

  return (
    <section className="categories-grid">
      {categoriesData.map((category, index) => (
        <div key={`${category}-${index}`} className="card">
          <div className="icon">
            <Image src={SvgLabelIcon} alt="" />
          </div>
          <div className="text">
            <span>{category.name}</span>
            <small>{category.qtdProductsInStock} produtos</small>
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
        <CategoriesGrid />
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
