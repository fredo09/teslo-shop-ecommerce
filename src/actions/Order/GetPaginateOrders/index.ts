/**
 * Get Paginatite Orders Actions
 */
'use server';

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";

export const getPaginateOrderActions = async() => {
    try {
        const sessionUser = await auth();

        if (sessionUser?.user.role !== 'admin') {
            return {
                ok: false,
                message: 'no eres usuario admin'
            }
        }

        const ordenDB = await prisma.order.findMany({
            orderBy: {
                createdAt: 'desc'
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
}