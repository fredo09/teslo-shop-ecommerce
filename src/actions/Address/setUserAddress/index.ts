/**
 * Server Actions address user
 */
'use server';

import prisma from "@/lib/prisma";
import type { Address } from "@/interfaces";


export const setUserAddressAction = async (userId: string, address: Address) => {
    try {
        const setNewAddress = await createOrReplaceAddressAction(address, userId);
        console.log("🚀 ~ setUserAddressAction ~ setNewAddress:", setNewAddress)

        return {
            ok: true,
            address: setNewAddress,
            message: 'Se ha agregado nueva direccion ✅'
        }

    } catch (error) {
        console.log("🚀 ~ setUserAddressAction ~ error:", error)
        return {
            ok: false,
            address: null,
            message: 'No se pudo guardar la direccion'
        };
    }
}


const createOrReplaceAddressAction = async ( address: Address, userId: string ) => {
    try {

        console.log("🚀 ~ user id:", { userId });

        const addressDB = await prisma.userAddress.findUnique({
            where: { userId }
        });

        const addressToSave = {
            userId: userId,
            address: address.address,
            address2: address.address2,
            countryId: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode,
            city: address.city
        };

        if (!addressDB) {
            //* creamos el numero registro de la direccion
            const newAddress = await prisma.userAddress.create({
                data: addressToSave
            });
            console.log("🚀 ~ createOrReplaceAddressAction ~ newAddress:", newAddress)

            return newAddress;
        }


        //* actualizar address
        const updateAdress = await prisma.userAddress.update({
            where: { userId },
            data: addressToSave
        });

        return updateAdress;

    } catch (error) {
        console.log("🚀 ~ createOrReplaceAddress ~ error:", error)
        throw new Error('No se puede guardar esta direccion por el usuario 💩');
    }
}