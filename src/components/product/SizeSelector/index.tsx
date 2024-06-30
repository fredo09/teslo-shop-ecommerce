import React from 'react';
import clsx from 'clsx';
import { Size } from '@/interfaces';

interface Props {
  selectorSize?: Size;
  availableSizes: Size[]; //* -> ['XS','S', 'M', 'L', 'XL', 'XXL', 'XXXL']

  //* -> Metodo que se pasa por las props para actializar la talla seleccionada
  onSizeSelected: ( size: Size ) => void;
}


export const SizeSelector = ({ selectorSize, availableSizes, onSizeSelected  }: Props) => {
  return (
    <div className='my-5'>
      <h3 className='font-bold mb-4'>Tallas disponibles</h3>
      {
        availableSizes.map( size => (
          <button
            className={
              clsx("mx-2 hover:underline text-lg", { 'underline': size === selectorSize })
            }
            onClick={ () => onSizeSelected(size) }
            key={size}>
              {size}
          </button>
        ))
      }
    </div>
  )
}
