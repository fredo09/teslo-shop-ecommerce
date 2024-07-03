'use client';

import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/store';

export const SummaryProductInCart = () => {
    const getSummaryInfo = useCartStore( state => state.getSummaryInformation() );

    //! state para controlar la hydratacion entre servidor y cliente en next
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=> {
        setIsLoaded(true);
    }, []);

    if (!isLoaded){
        return(
            <div className="grid grid-cols-2">
                <span>Cantidad</span>
                <span className="antialiased text-xs animate-pulse bg-gray-300">&nbsp;</span>

                <span>Subtotal</span>
                <span className="antialiased text-xs animate-pulse bg-gray-300">&nbsp;</span>

                <span>Impuesto (15%)</span>
                <span className="antialiased text-xs animate-pulse bg-gray-300">&nbsp;</span>

                <span className="mt-5 text-2xl">Total</span>
                <span className="antialiased text-xs animate-pulse bg-gray-300">&nbsp;</span>
            </div>            
        );
    }

    return (
        <div className="grid grid-cols-2">
            <span>Cantidad </span>
            <span className="text-right">
                {getSummaryInfo.itemIncartSummary === 1 ? '1 Productos' : `${getSummaryInfo.itemIncartSummary} productos` }
            </span>

            <span>Subtotal</span>
            <span className="text-right">$ {getSummaryInfo.subTotalProductIncart}</span>

            <span>Impuesto (15%)</span>
            <span className="text-right">$ {getSummaryInfo.impuesto}</span>

            <span className="mt-5 text-2xl">Total</span>
            <span className="mt-5 text-x2l text-right">$ {getSummaryInfo.totalProductInCart}</span>
        </div>
    )
}
