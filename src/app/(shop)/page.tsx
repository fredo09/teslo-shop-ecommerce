/*
 *  Page Shop inicial 
 */

export const revalidate = 60; //* -> revialida informacion de la data api durante 60 segundos

import { GridProducts, Pagination, Title } from "@/components";
import { getproductPaginationActions } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
    searchParams : { //* -> PARAMS PAGE URL
        page?: string
    }
}

export default async function Home({ searchParams }: Props) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const { products, currentPage, totalPages } = await getproductPaginationActions({ page });

    if (products && products.length === 0) {
        redirect('/');
    }

    return (
        <main className="">
            <Title 
                title="Tienda"
                subTitle="Todos los productos"
                className="mb-2"
            />

            <GridProducts 
                products={ products }
            />

            <Pagination totalPages={ totalPages } />
        </main>
    );
}