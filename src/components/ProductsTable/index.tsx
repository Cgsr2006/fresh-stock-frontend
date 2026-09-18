"use client";

import "./_style.scss";
import Image from "next/image";
import {
  IAddNewProductData,
  IProduct,
  productCategory,
} from "@/src/utils/types";
import { useForm } from "react-hook-form";
import SvgTrashCan from "@/public/TrashCan.svg";
import SvgNoProductsIcon from "@/public/NoProductsIcon.svg";
import { ProductInputRow } from "../ProductInputRow";
import SvgPencilIcon from "@/public/PencilIcon2.svg";

import PngConfirmIcon from "@/public/ConfirmIcon.png";
import PngCancelIcon from "@/public/CancelIcon.png";

interface ProductsTableProps {
  products?: IProduct[] | null;
  addNewProduct: boolean;
  editProduct: null | number;

  setAddNewProduct: React.Dispatch<React.SetStateAction<boolean>>;
  setEditProduct: React.Dispatch<React.SetStateAction<null | number>>;

  handleAddNewProduct: (data: IAddNewProductData) => void;
  handleUpdateProduct: (data: IProduct) => void;
  deleteProduct: (id: number) => Promise<void>;
}

export function ProductsTable({
  products,
  addNewProduct,
  editProduct,

  handleAddNewProduct,
  handleUpdateProduct,
  deleteProduct,

  setAddNewProduct,
  setEditProduct,
}: ProductsTableProps) {
  const data = useForm<IAddNewProductData>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  function setEditProductInfo(productData: IProduct) {
    if (editProduct === productData.id && data.formState.isDirty) {

      return handleUpdateProduct({ id: productData.id, ...data.getValues() });
    }

    setEditProduct(productData.id);

    data.reset({
      name: productData.name,
      price: productData.price,
      qtdInStock: productData.qtdInStock,
      category: productData.category,
    });
  }

  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        <Image src={SvgNoProductsIcon} alt="Nenhum produto disponível" />
        <p>Nenhum produto disponível no momento.</p>
      </div>
    );
  } else {
    return (
      <form
        onSubmit={data.handleSubmit(handleAddNewProduct)}
        className="component products-table-form"
      >
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Nome do Produto</th>
              <th>Preço</th>
              <th>Qtd em Estoque</th>
              <th>Categoria</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="product-row">
                <td
                  className={`row-button edit ${addNewProduct ? "disabled" : ""}`}
                  onClick={() =>
                    addNewProduct == true || setEditProductInfo(product)
                  }
                >
                  <Image
                    src={
                      editProduct === product.id
                        ? PngConfirmIcon
                        : SvgPencilIcon
                    }
                    alt=""
                    className="icon"
                  />
                </td>

                {editProduct === product.id && (
                  <>
                    <td className="id alignment-center">{product.id}</td>
                    <td>
                      <input
                        className="edit-product-input"
                        {...data.register("name", { required: true })}
                      />
                    </td>

                    <td>
                      <input
                        className="edit-product-input"
                        {...data.register("price", { required: true })}
                        type="number"
                      />
                    </td>
                    <td>
                      <input
                        className="edit-product-input"
                        {...data.register("qtdInStock", { required: true })}
                        type="number"
                      />
                    </td>
                    <td>
                      <select
                        className="edit-product-input"
                        {...data.register("category", { required: true })}
                      >
                        <option value={productCategory.FOOD}>FOOD</option>
                        <option value={productCategory.DRINK}>DRINK</option>
                        <option value={productCategory.HYGIENE}>HYGIENE</option>
                        <option value={productCategory.CLEANING}>
                          CLEANING
                        </option>
                      </select>
                    </td>
                  </>
                )}

                {editProduct !== product.id && (
                  <>
                    <td className="id alignment-center">{product.id}</td>
                    <td className="name alignment-left">{product.name}</td>
                    <td className="price alignment-left">
                      R$ {product.price.toFixed(2)}
                    </td>
                    <td className="quantity alignment-center">
                      {product.qtdInStock} 📦
                    </td>
                    <td className="category alignment-center">
                      {product.category}
                    </td>
                  </>
                )}

                <td
                  className={`row-button delete ${addNewProduct ? "disabled" : ""}`}
                  onClick={() =>
                    addNewProduct || editProduct === product.id
                      ? setEditProduct(null)
                      : deleteProduct(product.id)
                  }
                >
                  <Image
                    src={
                      editProduct === product.id ? PngCancelIcon : SvgTrashCan
                    }
                    alt=""
                    className="icon"
                  />
                </td>
              </tr>
            ))}

            {addNewProduct && (
              <ProductInputRow addNewProduct={addNewProduct} data={data} />
            )}
          </tbody>
        </table>

        {addNewProduct && (
          <div className="buttons">
            <button
              className="button cancel"
              onClick={() => setAddNewProduct(false)}
              type="button"
            >
              Cancelar
            </button>

            <button
              className="button confirm"
              type="submit"
              disabled={!data.formState.isValid}
            >
              Confirmar Criação
            </button>
          </div>
        )}
      </form>
    );
  }
}
