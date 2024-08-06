/**
 * server actions users pagination
 */

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config"

interface PaginationOption {
    page?: number,
    take?: number, //* -> usuarios a mostrar por pagina
}

export const getUserPginationActions = async ({ page = 1, take = 10 }: PaginationOption) => {
    //*validacion si el page no es un numero y no debe de hacer paginas 0
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    try {
        const sessionUser = await auth();

        if (sessionUser?.user.role !== 'admin') {
            return {
                ok: false,
                message: 'No hay role permitido'
            }
        }

        const usersDB = await prisma.user.findMany({
            take: take,
            skip: (page - 1) * take,
            orderBy: {
                name: 'desc'
            }
        });

        const constUsers = await prisma.user.count();
        console.log("🚀 ~ getUserPginationActions ~ constUsers:", constUsers)

        
        const totalPages = Math.ceil( constUsers / take );

        if (!usersDB) {
            return {
                ok: false,
                message: 'No hay usuarios 😦'
            }
        }

        return {
            ok: true,
            message: 'Se han encontrado usuarios',
            pagination: {
                currenPage: page,
                totalPages: totalPages,
                users: usersDB
            } 
        }

    } catch (error) {
        console.log("🚀 ~ getUserPginationActions ~ error:", error)
        return {
            ok: false,
            message: 'Ocurrio algo 🤡'
        }
    }
}