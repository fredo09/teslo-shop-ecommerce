/**
 * Server actions for Created order 
 */
'use server';

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductInOrder {
    id: string,
    quantity: number;
    size: Size;
}

export const PlaceOrderActions = async ( itemsToOrder: ProductInOrder[], address: Address ) => {
    try {
        //! Verificacion de usuario existente "sesion"
        const sessionUser = await auth();
        const userId = sessionUser?.user.id;

        if (!userId) {
            return {
                ok: false,
                message:"Ocurrio un error 🤡"
            }
        }

        // console.log("🚀 ~ mi contenido del server actions:", { itemToOrder, address, session: sessionUser.user.id });

        //! Obtencion de informacion de productos en la orden
        //! Recuerda que pueden hacer mas de 2+ con el mismo id pero diferente talla
        const productsDB = await prisma.product.findMany({
            where: {
                id: {
                    in: itemsToOrder.map(item => item.id) //* "in" -> indica que es un include dentro de un conjunto de elemtentos
                }
            }
        });
        // console.log("🚀 ~ PlaceOrderActions ~ productsDB:", productsDB)

        //!Calcular los montos de productos que se esta generando la orden
        const countItems = itemsToOrder.reduce((count, p) => count + p.quantity , 0);
        console.log("🚀 ~ PlaceOrderActions ~ countItems:", countItems)

        //!Totales, subtotatles y tax(impuesto) 15%
        const { subTotal, tax, total } = itemsToOrder.reduce((totals, item) => {
            //* Obtenemos la cantidad de productos e informacion del producto
            const productQuantity = item.quantity;
            const product = productsDB.find( productDB => productDB.id === item.id );

            //! Si ocurre algun detalle con el producto
            if ( !product ) throw new Error(`${item.id} no existe 🤡 - 500`);

            //Obtenemos el subtottal
            const subTotal = product.price * productQuantity;

            //hacemos la asignacion del subTotal, tax y totals
            totals.subTotal += subTotal;
            totals.tax += subTotal * 0.15;
            totals.total += subTotal * 1.15;

            return totals;
        },  { subTotal: 0, tax: 0, total: 0 });

        console.log("🚀 ~ Calculando subTotal, tax y total:", { subTotal, tax, total });

        //!Crear la transaccion a la DB
        const orderTX = await prisma.$transaction( async (tx) => {
            //! especificar pasos de la transaccion
            
            //* 1.- Actualizar el stock de los productos
            //* 2.- Crear la orden  - encabezado - detalles
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: countItems,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,


                    //* OrderItems -> productos que tiene el carrio 
                    OrderItem: {
                        createMany: { // se hace para meter mas registros dentro de otro 
                            data: itemsToOrder.map( productItem => ({
                                quantity: productItem.quantity,
                                size: productItem.size,
                                productId: productItem.id,
                                price: productsDB.find( productFind => productFind.id === productItem.id )?.price ?? 0
                            }))
                        }
                    }
                }
            });
            //console.log("🚀 ~ hemos creado la orden:", { order });
            //? validar si el price devuelve 0 "opcional"

            //* 3.- Crear la direccion de la order
            const idCountry = address.country;

            const addressOrder = await tx.orderAddress.create({
                data: {
                    firstName: address.firstName,
                    lastName: address.lastName,
                    address: address.address,
                    address2: address.address2,
                    phone: address.phone,
                    postalCode: address.postalCode,
                    city: address.city,

                    //CountryId
                    countryId: idCountry,

                    //OrderId
                    orderId: order.id,

                }
            });
            
            return {
                order: order,
                updateProducts: [],
                orderAddress: addressOrder
            }          
        });


    } catch (error) {
        console.log("🚀 ~ PlaceOrderActions ~ error:", error)
        return null;
    }
};