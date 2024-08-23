/**
 * Summary de los producto ya seleccionado para hacer la compra
 */

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

export const SummaryInCart = () => {
    //* recuperamos lo que tenemos en el store
    const productsCart = useCartStore(state => state.cart);

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
                            <span>
                                { item.size } - { item.title }
                            </span> 
                            <p> Cantidad: ({item.quantity}) </p>
                            <p> Talla: {item.size}</p>
                            <p className='font-bold'> { currencyFormat( item.price * item.quantity ) }</p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
