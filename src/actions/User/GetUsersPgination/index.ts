/**
 * server actions users pagination
 */

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config"

export const getUserPginationActions = async () => {
    try {
        const sessionUser = await auth();

        if (sessionUser?.user.role !== 'admin') {
            return {
                ok: false,
                message: 'No hay role permitido'
            }
        }

        const usersDB = await prisma.user.findMany({
            orderBy: {
                name: 'desc'
            }
        });

        if (!usersDB) {
            return {
                ok: false,
                message: 'No hay usuarios 😦'
            }
        }

        return {
            ok: true,
            message: 'Se han encontrado usuarios',
            users: usersDB
        }

    } catch (error) {
        console.log("🚀 ~ getUserPginationActions ~ error:", error)
        return {
            ok: false,
            message: 'Ocurrio algo 🤡'
        }
    }
}