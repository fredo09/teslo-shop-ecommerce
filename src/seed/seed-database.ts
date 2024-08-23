/*
 * rountime seed
 */

import prisma from '../lib/prisma';
import { initialData } from "./seed";
import { countries } from './seed-country';

async function main() {
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.userAddress.deleteMany();
    await prisma.imageProduct.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    
    await prisma.user.deleteMany();
    await prisma.countries.deleteMany();

    const { categories, products, usersData } = initialData;


    //* user
    await prisma.user.createMany({
        data: usersData
    });

    //* categories
    const categoriesData = categories.map((name) => ({ name }));

    await prisma.category.createMany({
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>);

    products.forEach(async (product) => {

        const { type, images, ...rest } = product;

        //* products
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

        //* Images
        const imagesData = images.map(image => ({
            urlImage: image,
            productId: dbProduct.id
        }));

        await prisma.imageProduct.createMany({
            data: imagesData
        });
    });

    await prisma.countries.createMany({
        data: countries
    });
    
    console.log("🚀 ~ seed lanzado correctamente!! ✅ 😎 ")
}


(() => {

    if (process.env.NODE_ENV === 'production') return;

    main();
})();