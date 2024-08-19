/**
 * Server action Product create and update 
 */
'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { Gender, Product, Size } from '@prisma/client';

//! Config cloudinary
cloudinary.config( process.env.CLOUDINARY_URL ?? '' );

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

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            let productTransaction: Product;

            const tagsArray = restProduct.tags.split(',').map(tag => tag.trim().toLowerCase());

            if (id) {
                //* Actualizar
                productTransaction = await prisma.product.update({
                    where: { id },
                    data: {
                        ...restProduct,
                        sizes: {
                            set: restProduct.sizes as Size[] //! -> "Set" se usa para enumenraciones  
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
            }

            //TODO: Proceso de subida de imagenes de productos
            if (formDataProduct.getAll('images')) {
                const imagesUploaded = await uploadImagesProducts(formDataProduct.getAll('images') as File[]);
                console.log("🚀 ~ prismaTx ~ imagesUploaded:", imagesUploaded);
            }

            return {
                ok: true,
                productTransaction
            }
        });

        revalidatePath('/admin/products');
        revalidatePath(`/admin/products/${prismaTx.productTransaction.slug}`);
        revalidatePath(`/products/${prismaTx.productTransaction.slug}`);

        return {
            ok: true,
            message: 'Se ha creado el producto',
            producto: prismaTx.productTransaction
        }
    } catch (error) {
        console.log("🚀 ~ createUpdateProductAction ~ error:", error)
        return {
            ok: true,
            error: error,
            message: 'Ocurrio un error ',
        }
    }
};


const uploadImagesProducts = async ( images: File[] ) => {
    try {
        const uploadImagesPromise = images.map( async (image) => {
            try {
                //! Convertimos la images en strings 
                const buffer = await image.arrayBuffer();
                const baseImage64 = await Buffer.from(buffer).toString('base64');

                return cloudinary.uploader.upload(`data:image/png;base64,${baseImage64}`)
                    .then(response => response.secure_url);
            } catch (error) {
                console.log("🚀 ~ uploadImages ~ error:", error)
                return null;
            }
        });

        const uploadImages = await Promise.all(uploadImagesPromise);

        return uploadImages;
    } catch (error) {
        console.log("🚀 ~ uploadImagesProducts ~ error:", error)
        return null;
    }
}