export enum productCategory {
    FOOD = "FOOD",
    DRINK = "DRINK",
    HYGIENE = "HYGIENE",
    CLEANING = "CLEANING",
}

export interface IProduct {
    id: number,
    name: string,
    price: number,
    qtdInStock: number,
    category: productCategory,
}

export interface IAddNewProductData {
    name: string,
    price: number,
    qtdInStock: number,
    category: productCategory,
}