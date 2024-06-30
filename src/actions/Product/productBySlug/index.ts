'use server';

import prisma from "@/lib/prisma";

export const getProductBySlugAction = async( slug: string ) => {
    try {
        const product = await prisma.product.findFirst({
            include: {
                imageProduct: {
                    select:{
                        urlImage: true
                    }
                }
            },
            where: {
                slug: slug
            }
        });

        if ( !product ) return null;

        return {
            ...product,
            images: product.imageProduct.map((image) => image.urlImage),
        }

    } catch (error) {
        throw Error('No se ha encontrado el producto 🖕');
    }
}