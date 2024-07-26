/**
 * get Address User Actions
 */
'use server';

import prisma from "@/lib/prisma";


export const getAddressUserAcction = async (userId: string) => {
    try {
        
        const addressDB = await prisma.userAddress.findUnique({
            where: { userId }
        })

        if(!addressDB) {
            console.log("🚀 ~ No hay registros alguno:");
            return null;
        }

        const { countryId, address2 ,...restAddress } = addressDB;

        return {
            restAddress,
            address2: address2 ? address2 : '',
            country: countryId
        };
        
    } catch (error) {
        console.log("🚀 ~ Ocurrios algo :", error);
        return null;
    }
};