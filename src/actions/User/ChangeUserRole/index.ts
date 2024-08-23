/**
 * Server actions chenge User role
 */
'use server';

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";

/**
 * Server action to update role in user DB 
 * @param userId {String}
 * @param roleValue {String}
 * @returns {Object}
 */
export const changeUserRoleAction = async (userId: string, roleValue: string) => {
    try {
        const sessionData = await auth();
        
        if (sessionData?.user.role !== 'admin') {
            return {
                ok: false,
                message: "No tienes el privilegio para hacer esta operacion 💩"
            }
        }

        //! Validation de tipo de role
        const newRole = roleValue === 'admin' ? 'admin' : 'user';

        const updateRoleUserDB = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: newRole
            }
        });
        console.log("🚀 ~ changeUserRoleAction ~ updateRoleUserDB:", updateRoleUserDB)

        if (!updateRoleUserDB) {
            return {
                ok: false,
                message: 'Ocurrio un error al actualizar el role 😦'
            }
        }

        //* Revalidamos path para reflejar el cambio
        revalidatePath('/admin/users');

        return {
            ok: true,
            message: "hemos actualizado el role",
            updateUserRole: updateRoleUserDB
        }
    } catch (error) {
        console.log("🚀 ~ changeUserRoleAction ~ error:", error)
        return {
            ok: false,
            message: "Ocurrio algun error al hacer esto 🤡"
        }
    }
}