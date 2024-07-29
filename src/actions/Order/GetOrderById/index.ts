/**
 * Server action for get order by id
 */
'use server';

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";

export const getOrderByIdAction = async (ordenId: string) => {
    console.log("🚀 ~ tenemod el id de la orden:", { ordenId });
    try {

        const sessionUser = await auth();

        if (!sessionUser?.user.id) {
            return {
                ok: false,
                message: 'Debes de tener session 🤡',
            }
        }

        //! Buscamos la orden por el id
        const orderByIdDB = await prisma.order.findUnique({
            where: {
                id: ordenId
            },
            include: {
                OrderAddress: true, //! -> con esto tenemos toda la realcion de un modelo
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,

                        product: {
                            select: {
                                title: true,
                                slug: true,

                                imageProduct: {
                                    select: {
                                        urlImage: true
                                    }, 
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        });
        // console.log("🚀 ~ getOrderByIdAction ~ orderByIdDB:", orderByIdDB)

        if (!orderByIdDB) throw `${ordenId} no existe`;

        if ( sessionUser.user.role === 'user' ) {
            if ( sessionUser.user.id !== orderByIdDB.userId ) {
                throw `${ordenId} no pertenece a este usuario`;
            }
        }

        return {
            ok: true,
            message: "Hemos recuperado la orden solicitada",
            orden: orderByIdDB
        };

    } catch(error) {
        console.log("🚀 ~ ocurrio un error:", error);
        return {
            ok: false,
            message: 'ocurrio un error al obtener la orden 😦'
        }
    } 
};