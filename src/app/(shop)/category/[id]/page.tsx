/**
 * Page category by id 
 */

import { initialData } from "@/seed/seed";
import { GridProducts, Title } from "@/components";
import { ValidCategories } from "@/interfaces";
import { notFound } from "next/navigation";

const seedProducts = initialData.products;

interface Props {
    params: {
        id: ValidCategories
    }
}

/**
 * forma de ponerle tipado a un objeto "Record<ValidCategories, string>"
 * donde ValidCategories es las keys 
 * el string tipo de value sera
 */

const labels: Record<ValidCategories, string> = {
    'men': 'Hombres',
    'women': 'Mujeres',
    'kid': 'Niños',
    'unisex': 'Todos'
};

export default function CartAdmin({ params }: Props) {
    const { id } = params;

    const product = seedProducts.filter( product => product.gender === id );

    // if( id === 'kids' ){
    //     notFound();
    // }

    return (
        <>
            <Title
                title={` Articulos para ${ labels[id] }`}
                subTitle="Todos los productos"
                className="mb-2"
            />

            <GridProducts
                products={product}
            />
        </>
    );
}