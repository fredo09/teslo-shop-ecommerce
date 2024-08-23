/**
 * Server actions getCountries
 */
'use server';

import prisma from "@/lib/prisma";

/**
 * get countries from Databse for Prima Client
 * @returns {Array} Countries 
 */
export const getCountriesAction = async () => {
    try {
        const contriesDB = await prisma.countries.findMany({
            orderBy: {
                name: 'desc'
            }
        });

        return contriesDB;

    } catch (error) {
        console.log("🚀 ~ getCountries ~ error:", error);
        return [];
    }
}