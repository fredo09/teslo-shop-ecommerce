/**
 * Server actions set transaction paypal 
 */
'use server';

import prisma from "@/lib/prisma";

export const setTransactionPaypalIdAction = async( orderId: string, transactionPaypalId: string ) => {
    try {
        const updateOrderDB = await prisma.order.update({
            where: { id: orderId },
            data: {
                transactionPaypalId: transactionPaypalId
            }
        });
        console.log("🚀 ~ setTransactionPaypalIdAction ~ updateOrderDB:", updateOrderDB)

        if (!updateOrderDB) {
            return {
                ok: false,
                message: "Ocurrio un error al setear transaccion"
            };
        }

        return {
            ok: true,
            message: 'has realizado la actualizacion',
            order: updateOrderDB
        }
        
    } catch (error) {
        console.log("🚀 ~ setTransactionPaypalId ~ error:", error);
        return {
            ok: false,
            message: 'Ocurrio un error al setear la transaccion id 🤡',
        }
    }

};