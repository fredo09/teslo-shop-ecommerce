import React from 'react';
import clsx from 'clsx';
import { ValidSizes } from '@/interfaces';

interface Props {
  selectorSize: ValidSizes;
  availableSizes: ValidSizes[]; //* -> ['XS','S', 'M', 'L', 'XL', 'XXL', 'XXXL']
}


export const SizeSelector = ({ selectorSize, availableSizes  }: Props) => {
  return (
    <div className='my-5'>
      <h3 className='font-bold mb-4'>Tallas disponibles</h3>
      {
        availableSizes.map( size => (
          <button
            className={
              clsx("mx-2 hover:underline text-lg", { 'underline': size === selectorSize })
            }
            key={size}>
              {size}
          </button>
        ))
      }
    </div>
  )
}
