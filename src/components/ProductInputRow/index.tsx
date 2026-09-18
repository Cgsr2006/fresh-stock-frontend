"use client";

import { useEffect } from "react";
import "./_style.scss";
import { IAddNewProductData, productCategory } from "@/src/utils/types";
import { useForm } from "react-hook-form";

interface ProductInputRowProps {
  addNewProduct: boolean;
  data: ReturnType<typeof useForm<IAddNewProductData>>;
}

export function ProductInputRow({ addNewProduct, data }: ProductInputRowProps) {
  useEffect(() => {
    data.resetField("name");
    data.resetField("price");
    data.resetField("qtdInStock");
    data.resetField("category");

    data.setFocus("name");
  }, [addNewProduct]);

  return (
    <tr className="component product-input-row">
      <td></td>
      <td className="id alignment-center">
        <p>?</p>
      </td>
      <td>
        <input
          className="new-product-input"
          type="text"
          placeholder="Nome do Produto"
          {...data.register("name", { required: true })}
        />
      </td>
      <td className="especial price">
        <p>R$</p>
        <input
          className="new-product-input"
          type="number"
          placeholder="Preço"
          {...data.register("price", {
            valueAsNumber: true,
            required: true,
          })}
        />
      </td>
      <td>
        <input
          className="new-product-input"
          type="number"
          placeholder="Qtd em Estoque"
          {...data.register("qtdInStock", {
            valueAsNumber: true,
            required: true,
          })}
        />
      </td>
      <td>
        <select
          className="new-product-input"
          {...data.register("category", { required: true })}
        >
          <option value={productCategory.FOOD}>FOOD</option>
          <option value={productCategory.DRINK}>DRINK</option>
          <option value={productCategory.HYGIENE}>HYGIENE</option>
          <option value={productCategory.CLEANING}>CLEANING</option>
        </select>
      </td>
      <td></td>
    </tr>
  );
}
