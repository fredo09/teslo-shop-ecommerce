/**
 * Page Gender by gender 
 */

export const revalidate = 60; //* -> revialida informacion de la data api durante 60 segundos

import { Gender } from "@prisma/client";
import { GridProducts, Pagination, Title } from "@/components";
import { getproductPaginationActions } from '@/actions';
import { notFound, redirect } from "next/navigation";


interface Props {
    params: {
        gender: string
    },
    searchParams : {
        page?: string
    }
}

/**
 * forma de ponerle tipado a un objeto "Record<ValidCategories, string>"
 * donde ValidCategories es las keys 
 * el string tipo de value sera
 */

const labels: Record<string, string> = {
    'Men': 'Hombres',
    'Women': 'Mujeres',
    'Kid': 'Niños',
    'Unisex': 'Todos'
};

export default async function GenderAdmin({ params, searchParams }: Props) {
    const { gender } = params;
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { products, totalPages, currentPage } = await getproductPaginationActions({ 
        page, gender: gender as Gender 
    });

    if ( products.length === 0 ) {
        redirect(`/gender/${gender}`);
    }

    // if( id === 'kids' ){
    //     notFound();
    // }

    return (
        <>
            <Title
                title={` Articulos para ${ labels[gender] }`}
                subTitle="Todos los productos"
                className="mb-2"
            />

            <GridProducts
                products={products}
            />

            <Pagination
                totalPages={ totalPages }
            />
        </>
    );
}