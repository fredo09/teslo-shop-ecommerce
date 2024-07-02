'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import Link from 'next/link';

export const ProductInCart = () => {
    //* recuperamos lo que tenemos en el store
    const productsCart = useCartStore( state => state.cart );
    const setQuantityItemCart = useCartStore( state => state.updateProductQuantity);
    const removeProductInCart = useCartStore( state => state.removeProductToCart );

    const [isLoding, setIsLoding] = useState(false);

    useEffect(() => {
        //! hacemos la rehidratacion entre el servidor y el cliente content
        setIsLoding(true);
    }, []);


    if (!isLoding) {
        return (
            // <div className='antialiased text-xs animate-pulse bg-gray-300 h-80 w-full'>
            //     &nbsp;
            // </div>
            <p>
                cargando...
            </p>
        )
    }

    return (
        <>
            {
                productsCart.map(item => (
                    <div key={`${item.slug}-${item.size}`} className="flex mb-5">
                        <Image
                            src={`/products/${item.image}`}
                            alt={item.title}
                            height={100}
                            width={100}
                            className="mr-5 rounded"
                        />
                        <div>
                            <Link
                                className='hover:underline cursor-pointer'
                                href={`product/${item.slug}`}>
                                <p className='font-bold'> {item.title}</p>
                            </Link>
                            <p> Talla: {item.size}</p>
                            <p>{item.price}</p>
                            <QuantitySelector
                                onQuantityValue={( quantity ) => setQuantityItemCart( item, quantity )}
                                quantity={ item.quantity }
                            />

                            <button 
                                onClick={() => removeProductInCart( item )}
                                className="hover:underline mt-3">
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
