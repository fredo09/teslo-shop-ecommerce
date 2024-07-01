/**
 * Store Cart
 */

import { create } from "zustand"
import type { CartStore } from "@/interfaces";

//* tipado del estado del zustand
interface State {
    cart: CartStore[];

    //* metodos para manejar el store cart 🛒
    //Todo: addToProductCart
    addToProductCart: ( product: CartStore ) => void;
    //Todo: updateProductQuantity
    //Todo: removeProductToCart
}


export const useCartStore = create<State>()(
    //* set y get son funciones del mismo zustand
    (set, get) => ({
        cart: [],

        //* Actions
        addToProductCart: ( product: CartStore ) => {
            const { cart } = get();

            //! 1. Si cumple con el id y con la talla seleccionada es que el producto existe en el carrito 
            const productIncart = cart.some( item => item.id === product.id && item.size === product.size );

            //! Si no hay producto agregamos al carrito
            if ( !productIncart ) {
                set({
                    cart: [...cart, product]
                })
            }

            //! 2. Se que el producto existe por talla asi que... tengo que insertar
            const updateCountProductInCart = cart.map((item) => {
                //* Hacemos la operaccion de agregar la cantidad al carrito del producto "si cumple la condicion"
                if ( item.id === product.id && item.size === product.size ) {
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
        }

    })
)