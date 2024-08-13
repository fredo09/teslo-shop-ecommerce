/**
 * Server action Product create and update 
 */
'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';
import { Gender, Product, Size } from '@prisma/client';

//* -> nueva validacion para esquema del producto
const productSchemaValidation = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number().min(0).transform( val => Number(val.toFixed(2)) ),
    inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform(val => val.split(',')),
    tags: z.string(),
    gender: z.nativeEnum(Gender)

});

export const createUpdateProductAction = async( formDataProduct: FormData ) => {
    const data = Object.fromEntries(formDataProduct);
    console.log("🚀 ~ createUpdateProductAction ~ data:", data)
    const parsedData = productSchemaValidation.safeParse(data);

    if(!parsedData.success) {
        console.log("🚀 ~ ocurrio algo en especial:", parsedData.error);
        return {
            ok: false,
            message: 'No estas poniendo la data como es 🤡'
        }
    }

    console.log("🚀 ~ paser data:", parsedData.data);

    //! SE HACE UNA TRANSACCION PARA SUBIR FOTOS Y DATA DEL PRODUCTO
    const productData = parsedData.data;
    productData.slug = productData.slug.toLowerCase().replace(/ /g, '-').trim();

    const { id, ...restProduct } = productData;

    const prismaTx = await prisma.$transaction( async (tx) => {
        let productTransaction: Product;

        const tagsArray = restProduct.tags.split(',').map( tag => tag.trim().toLowerCase() );

        if (id) {
            //* Actualizar
            productTransaction =  await prisma.product.update({
                where: { id },
                data: {
                    ...restProduct,
                    sizes: {
                        set : restProduct.sizes as Size[] //! -> "Set" se usa para enumenraciones  
                    },
                    tags: {
                        set: tagsArray
                    }
                }
            });

        } else {
            //* Crear nuevo producto
            productTransaction = await prisma.product.create({
                data: {
                    ...restProduct,
                    sizes: {
                        set: restProduct.sizes as Size[]
                    },
                    tags: {
                        set: tagsArray
                    }
                }
            });

            console.log("🚀 ~ prismaTx ~ productTransaction:", productTransaction)
        }

        return {
            ok: true,
            productTransaction
        }
    });

    return {
        ok: true,
        message: ''
    }

};