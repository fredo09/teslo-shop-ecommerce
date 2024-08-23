/**
 * Server actions get order by user
 */
'use server';

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";

export const getOrderByUser = async () => {
    try {
        const sessionUser = await auth();

        if (!sessionUser?.user.id) {
            throw `no hay session`
        }

        const ordenDB = await prisma.order.findMany({
            where:{
                userId: sessionUser.user.id
            },
            include: {
                OrderAddress: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        });

        return {
            ok: true,
            orders: ordenDB,
            message: "has recuparado algunas ordenes"
        }
    } catch (error) {
        console.log("🚀 ~ getOrderByUser ~ error:", error)
        return {
            ok: false,
            message: 'ocurrio algun errror 🤡'
        }
    }


};