/**
 * Server action Product create and update 
 */
'use server';

import { z } from 'zod';
import { Gender } from '@prisma/client';

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

export const createUpdateProductAction = async(formDataProduct: FormData) => {
    console.log("🚀 ~ createUpdateProductAction ~ formDataProduct:", formDataProduct);


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


    return {
        ok: true,
        message: ''
    }

};