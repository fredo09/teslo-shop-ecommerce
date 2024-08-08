/**
 * Server actions categories
 */
'use server';

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config"

export const getCategoriesAction = async () => {
    try {
        const sessionUser = await auth();

        if (sessionUser?.user.role !== 'admin') {
            return {
                ok: false,
                message: "No cuentas con este provilegio ❌"
            }
        }

        const categoriesDB = await prisma.category.findMany({
            orderBy: {
                name: "asc"
            }
        });
        console.log("🚀 ~ getCategoriesAction ~ categoriesDB:", categoriesDB)

        if (!categoriesDB) {
            return {
                ok: false,
                message: "no hay categorias 😦"
            }
        }

        return {
            ok: true,
            message: "Hemos traido las categorias 😎",
            categories: categoriesDB
        }

    } catch (error) {
        console.log("🚀 ~ getCategoriesAction ~ error:", error)
        return {
            ok: false,
            message: "Ocurrio un error 🤡"
        }
    }
}