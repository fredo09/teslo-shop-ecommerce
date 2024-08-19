/**
 * Server action for delete images product
 */
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';

//! Config cloudinary
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProductImageAction = async ( imageId: number, urlImage: string) => {
    if (!urlImage.startsWith('http')) {
        return {
            ok: false,
            message: 'No se puede borrar images del FS'
        }
    }

    const imageName = urlImage.split('/').pop()?.split('.')[0] ?? '';
    console.log("🚀 ~ deleteProductImageAction ~ imageName:", imageName);

    try {
        await cloudinary.uploader.destroy(imageName);

        const deleteImage = await prisma.imageProduct.delete({
            where: {
                id: imageId
            },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        });

        //Todo: Revalidate Paths
        revalidatePath('/admin/products');
        revalidatePath(`/admin/products/${deleteImage.product.slug}`);
        revalidatePath(`/products/${deleteImage.product.slug}`);
        return {
            ok: true,
            message: 'Se han eliminado la imagen'
        }
    } catch (error) {
        console.log("🚀 ~ deleteProductImageAction ~ error:", error)
        return {
            ok: false,
            message: 'No se pudo eliminar la imagen'
        }
    }

}