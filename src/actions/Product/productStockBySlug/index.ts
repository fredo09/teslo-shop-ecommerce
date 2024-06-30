'use server';

import prisma from "@/lib/prisma";

export const getStockProductBySlugAction = async(slug: string): Promise<number>=> {
    try {
        const stock = await prisma.product.findFirst({
            where: {
                slug: slug
            },
            select: {
                inStock: true
            }
        });
        console.log("🚀 ~ getStockProductBySlugAction ~ stock:", stock);

        return stock?.inStock ?? 0;
    } catch (error) {
        throw Error('No tienes ninguna cantidad de producto 🖕');
    }
};