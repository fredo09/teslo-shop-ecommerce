/**
 * Server actions for Created order 
 */
'use server';

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";

interface ProductInOrder {
    id: string,
    quantity: number;
    size: Size;
};

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
        try {
            const orderTX = await prisma.$transaction(async (tx) => {
                //! especificar pasos de la transaccion

                //* 1.- Actualizar el stock de los productos
                const updatedProductPromises = productsDB.map(async (productDB) => {
                    //Recuperamos la cantidad del producto que viene de la orden mediante el identificador y hacemos el contador para tener la cantidad el carrito
                    //Acomulados los valores "cantidad" por id
                    const productQuantity = itemsToOrder
                        .filter(p => p.id === productDB.id)
                        .reduce((acc, item) => item.quantity + acc, 0);

                    //Si llega a ocurrir algun error si productQuantity es 0
                    if (productQuantity === 0) {
                        throw new Error(`${productDB.id} no tiene la cantidad definida`);
                    }
                    return tx.product.update({
                        where: { id: productDB.id },
                        data: {
                            // inStock: productDB.inStock - productQuantity -> no hacer ya que al hacer puede estar desfasado la cantidad en el stock
                            inStock: {
                                decrement: productQuantity
                            }
                        }
                    });
                });

                //! Generamos una resolucion de procesas con todos los productos actualizado con respecto a la cantidad en el stock
                const updatedProducts = await Promise.all(updatedProductPromises);

                //Verificar si los valores de la cantidad de productos es -0 -> osea no hay productos que vender
                updatedProducts.forEach(product => {
                    if (product.inStock < 0) {
                        //No hay productos que vender
                        console.log("🚀 ~ No hay productos que vender 🤡:", product.inStock);
                        throw new Error(`${product.title} no contamos con el producto por el momento 😦`);
                    }
                });

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
                                data: itemsToOrder.map(productItem => ({
                                    quantity: productItem.quantity,
                                    size: productItem.size,
                                    productId: productItem.id,
                                    price: productsDB.find(productFind => productFind.id === productItem.id)?.price ?? 0
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

                console.log("🚀 ~ contenido de la transaccion de crear la orden :", {
                    order: order,
                    updateProducts: updatedProducts,
                    orderAddress: addressOrder
                });

                //! return de toda la transaccion 
                return {
                    order: order,
                    updateProducts: updatedProducts,
                    orderAddress: addressOrder
                }
            });

            //* Regresamos la respuesta del server actions
            return {
                ok: true,
                message: "Has creado tu pedido con exito ✅",
                orden: orderTX.order,
                transaction: orderTX
            };

        } catch (error: any) {
            console.log("🚀 ~ Ocurrio un error en la transaccion 🤡:", error);
            return {
                ok: false,
                message: "Ocurrio un error al momento de hacer tu orden"
            }
        }

    } catch (error) {
        console.log("🚀 ~ PlaceOrderActions ~ error:", error)
        return null;
    }
};