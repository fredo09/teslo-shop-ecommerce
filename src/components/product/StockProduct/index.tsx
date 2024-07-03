/**
 * Component Stock
 */
'use client';

import React, { useEffect, useState } from 'react'
import { titleFont } from '@/config/fonts';
import { getStockProductBySlugAction  } from '@/actions';

interface Props {
  slug: string
}

export const StockProduct = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  //* Recuperamos el producto
  useEffect(() => {
    getStock();
  });
  
  const getStock = async () => {
    const stock = await getStockProductBySlugAction(slug);
    setStock(stock);
    setIsLoading(false);
  }

  return (
    <>
      {
        isLoading 
        ? (
          <h1 className={`${titleFont.className} antialiased text-xs animate-pulse bg-gray-300`}>
            &nbsp;
          </h1>
        ) 
        : (
          <h1 className={`${titleFont.className} antialiased text-xs`}>
            Cantidad: { stock }
          </h1>
        )
      }
    </>
  );
};
