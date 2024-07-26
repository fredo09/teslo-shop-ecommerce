/**
 * Delete Address
 */
'use server';

import prisma from "@/lib/prisma"

export const deleteUserAddressAction = async ( userId: string ) => {
    try {
        
        const deletedUser = await prisma.userAddress.delete({
            where: { userId }
        });
        console.log("🚀 ~ deleteUserAddressAction ~ deletedUser:", deletedUser)

        return {
            ok: true,
            deletedUser,
            message: 'Has eliminado esta direccion ✅'
        }

    } catch (error) {
        return {
            ok: false,
            message: "Ocurrio un error al hacer la operacion 🤡"
        }
    }
}