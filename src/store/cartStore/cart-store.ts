/**
 * Store Cart
 */

import { create } from "zustand"
import type { CartStore } from "@/interfaces";
import { persist } from "zustand/middleware";

//* tipado del estado del zustand
interface State {
    cart: CartStore[];

    //* metodos para manejar el store cart 🛒
    //* -> returna el total de elementos en el carrito
    getTotalItems: () => number;
    
    //Todo: addToProductCart
    addToProductCart: ( product: CartStore ) => void;
    //Todo: updateProductQuantity
    updateProductQuantity: ( product: CartStore, quantity: number ) => void;
    //Todo: removeProductToCart
    removeProductToCart: ( product: CartStore ) => void;
}


export const useCartStore = create<State>()(
    persist( //! -> Nos sirve para agregar el store al localStorage
        //* set y get son funciones del mismo zustand
        (set, get) => ({
            //* Global State
            cart: [],

            //* Actions

            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((totalItems, itemCart) =>  totalItems + itemCart.quantity , 0);
            },


            addToProductCart: (product: CartStore) => {
                const { cart } = get();
                console.log("🚀 ~ cart:", cart);

                //! 1. Si cumple con el id y con la talla seleccionada es que el producto existe en el carrito 
                const productIncart = cart.some(item => item.id === product.id && item.size === product.size);

                //! Si no hay producto agregamos al carrito
                if (!productIncart) {
                    set({
                        cart: [...cart, product]
                    })
                    return;
                }

                //! 2. Se que el producto existe por talla asi que... tengo que insertar
                const updateCountProductInCart = cart.map((item) => {
                    //* Hacemos la operaccion de agregar la cantidad al carrito del producto "si cumple la condicion"
                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity: item.quantity + product.quantity
                        }
                    }

                    //* Si no cumple con la condicion regresamos el item tal cual 
                    return item;
                });

                //* Nuevo valor del arreglo del carrito
                set({
                    cart: updateCountProductInCart
                });
            },

            //* Setemaos la nueva cantidad al producto en el store 
            updateProductQuantity: ( product: CartStore, quantity: number ) => {
                const { cart } = get();

                const updatedItemsIncart = cart.map(item => {
                    if(product.id === item.id && product.size === item.size) {
                        return { ...item, quantity: quantity };
                    }

                    return item;
                });

                set({ cart: updatedItemsIncart });
            },

            //* Remove product in storeCart
            removeProductToCart: (product: CartStore) => {
                const { cart } = get();

                const removeProductCart = cart.filter(item => (
                    item.id !== product.id || item.size !== product.size
                ));
                console.log("🚀 ~ removeProductCart:", removeProductCart)

                set({ cart: removeProductCart })
            }
        })
        ,{
            name: 'shopping-cart'
        }
    )
)