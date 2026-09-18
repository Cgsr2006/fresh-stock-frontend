"use client";

import Image from "next/image";
import "./style.scss";

import SvgFreshStockIcon from "@/public/FreshStockIcon.svg";
import {
  createNewProduct,
  useProducts,
  deleteProduct,
  updateProduct,
} from "@/src/services/product/productMetods";
import { ProductsTable } from "@/src/components/ProductsTable";
import { useEffect, useState } from "react";
import {
  IAddNewProductData,
  IProduct,
  productCategory,
} from "@/src/utils/types";
import { mockedProductsData } from "@/src/utils/data";

function sideBar() {
  return <section></section>;
}

function prductsTable() {
  return <section></section>;
}

function categoriesGrid() {
  return <section></section>;
}

function dashBoard() {
  return <section></section>;
}

export default function Home() {
  const [addNewProduct, setAddNewProduct] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editProduct, setEditProduct] = useState<null | number>(null);

  const { data, mutate } = useProducts(selectedCategory);
  const productsInfo = data ? data : mockedProductsData;

  async function handleAddNewProduct(data: IAddNewProductData) {
    await createNewProduct(data);

    mutate();
    setAddNewProduct(false);
  }

  async function handleUpdateProduct(data: IProduct) {
    await updateProduct(data);
    mutate();
    setEditProduct(null);
  }

  async function handleDeleteProduct(id: number) {
    const res = await deleteProduct(id);

    if (res) {
      mutate();
    }
  }

  useEffect(() => {
    mutate();
  }, [productsInfo]);

  return (
    <main className="page home">
      <div className="content">
        <div className="title">
          <Image src={SvgFreshStockIcon} alt="Fresh Stock Icon" />
          <h1>Fresh Stock</h1>
        </div>

        <div className="body">
          <div className="filters">
            <div className="category-filter">
              <label className="category-label">Filter by Category</label>

              <select
                className="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={addNewProduct || editProduct !== null}
              >
                <option value="">ALL</option>
                <option value={productCategory.FOOD}>FOOD</option>
                <option value={productCategory.DRINK}>DRINK</option>
                <option value={productCategory.HYGIENE}>HYGIENE</option>
                <option value={productCategory.CLEANING}>CLEANING</option>
              </select>
            </div>

            <button
              onClick={() => setAddNewProduct(true)}
              className="create-button"
              disabled={addNewProduct || editProduct !== null}
            >
              <p>+ Create</p>
            </button>
          </div>

          <ProductsTable
            products={productsInfo}
            addNewProduct={addNewProduct}
            editProduct={editProduct}
            handleAddNewProduct={handleAddNewProduct}
            setAddNewProduct={setAddNewProduct}
            setEditProduct={setEditProduct}
            deleteProduct={handleDeleteProduct}
            handleUpdateProduct={handleUpdateProduct}
          />
        </div>
      </div>
    </main>
  );
}
