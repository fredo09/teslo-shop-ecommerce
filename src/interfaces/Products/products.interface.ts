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

export type Category = 'Men' | 'Women' | 'Kid' | 'Unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats';
