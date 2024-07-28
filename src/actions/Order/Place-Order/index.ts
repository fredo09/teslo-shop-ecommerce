/**
 * Server actions for Created order 
 */
'use server';

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";

interface ProductInOrder {
    id: string,
    quantity: number;
    size: Size;
}

export const PlaceOrderActions = async ( itemToOrder: ProductInOrder[], address: Address ) => {
    try {
        //TODO: SERVER ACTIONS FOR ORDER
        const sessionUser = await auth();

        if (!sessionUser?.user.id) {
            return {
                ok: false,
                message:"Ocurrio un error 🤡"
            }
        }

        console.log("🚀 ~ mi contenido del server actions:", { itemToOrder, address, session: sessionUser.user.id });

    } catch (error) {
        console.log("🚀 ~ PlaceOrderActions ~ error:", error)
        return null;
    }
};