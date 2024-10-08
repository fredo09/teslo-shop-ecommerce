'use server';

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOption{
    page?: number, 
    take?:number, //* -> articulos a mostrar por pagina
    gender?: Gender
}

export const getproductPaginationActions = async ({ page = 1, take = 12, gender }: PaginationOption)  => {

    //*validacion si el page no es un numero y no debe de hacer paginas 0
    if ( isNaN(Number(page)) ) page = 1; 
    if ( page < 1 ) page = 1;

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    try {
        //* -> 1. Obtener los productos
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                imageProduct: {
                    take: 2,
                    select: {
                        urlImage: true,
                    },
                },
            },
            where: {
                gender: gender
            }
        });

        //* -> 2. Obtener el total de de paginas
        const countProducts = await prisma.product.count({
            where: {
                gender: gender
            }
        });

        const totalPages = Math.ceil( countProducts / take );

        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map((product) => ({
                ...product,
                images: product.imageProduct.map((image) => image.urlImage),
            })),
        };
    } catch (error) {
        throw new Error("No se pudo cargar los productos 🖕 ");
    }
}
