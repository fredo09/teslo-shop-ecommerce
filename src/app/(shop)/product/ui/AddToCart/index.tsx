'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store';
import type { CartStore, Product, Size } from '@/interfaces';
import { QuantitySelector, SizeSelector } from '@/components';

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {
    //* Store CartStore
    const addProductCartStore = useCartStore( state => state.addToProductCart );

    const [size, setSize] = useState<Size | undefined> ();
    const [quantity, setquantity] = useState<number>(1);
    
    const addToCart = () => {
        if ( !size ) {
            console.log('toast');
            toast.error('Tienes que seleccionar una talla 😱');
            return;
        }

        const cartProduct: CartStore =  {
            id: product.id,
            title: product.title,
            slug: product.slug,
            price: product.price,
            size: size,
            quantity: quantity,
            image: product.images[0]
        }

        //* Funcion para agregar el carrito al store
        addProductCartStore(cartProduct);

        toast.success('Agregado al carrito 🛒');

        //! Seteamos los states
        setquantity(1);
        setSize(undefined);
    }

    return (
        <>
            {/* Selector de tallas */}
            <SizeSelector
                selectorSize={size}
                availableSizes={product.sizes}
                onSizeSelected={setSize} //* -> lo que sucede es esto (size) => setSize(zise) en forma comprimida
            />

            {/* Selector de cantidades */}
            <QuantitySelector 
                quantity={quantity}
                onQuantityValue={setquantity}
            />

            {/* Button */}
            <button
                onClick={addToCart}
                className="btn-primary my-5">
                Agregar al carrito
            </button>
        </>
    )
}
