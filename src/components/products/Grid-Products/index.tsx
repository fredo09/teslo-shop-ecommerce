import React from 'react';
import { Product } from '@/interfaces';
import { ItemProduct } from './../ItemProduct';


interface Props {
  products: Product[];
}

export const GridProducts = ({ products }: Props) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10'>
      {
        products.map(product => (
          <ItemProduct 
            key={product.slug}
            product={product}
          />
        ))
      }
    </div>
  )
}
