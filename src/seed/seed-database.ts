
import prisma from '../lib/prisma';
import { initialData } from "./seed";

async function main() {
    await prisma.imageProduct.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const { categories, products } = initialData;

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
}


(() => {

    if (process.env.NODE_ENV === 'production') return;

    main();
})();