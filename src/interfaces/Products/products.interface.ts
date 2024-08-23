/*
 * Interface Products
 */

export interface Product {
    id :string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    //type: Type; //Todo: Llamarlo de forma no plural
    gender: Category;
}

//* interface cartStore
export interface CartStore {
    id: string;
    title: string;
    slug: string;
    price: number;
    size: Size;
    quantity: number;
    image: string;
}

export interface ImageProduct {
    id: number;
    urlImage: string;
    productId?: string;
}

export type Category = 'Men' | 'Women' | 'Kid' | 'Unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats';
