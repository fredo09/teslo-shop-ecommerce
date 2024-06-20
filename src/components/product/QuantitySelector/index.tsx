'use client';

import React, { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number
}

export const QuantitySelector = ({ quantity }: Props) => {

  const [quantityProduct, setQuantityProduct] = useState(quantity);

  // const onCountProduct = (value: number) => {
  //   console.log("🚀 ~ onCountProduct ~ value:", value)
  //   console.log('infooosdf ', quantityProduct + value);
  //   if (quantityProduct + value < 1 ) return;
  //   // if (quantityProduct === 5) return;
    
  //   setQuantityProduct(quantityProduct + value);

  //   console.log("🚀 ~ onCountProduct ~ quantityProduct:", quantityProduct + value)
  // }

  return (
    <div className='flex'>
      <button
        disabled={ quantityProduct < 1 }
        onClick={() => setQuantityProduct(quantityProduct - 1)}>
        <IoRemoveCircleOutline size={30}/>
      </button>
      <span className='w-20 mx-3 px-5 bg-gray-100 text-center rounded-md'>
        { quantityProduct }
      </span>
      <button
        disabled={quantityProduct >= 5}
        onClick={() => setQuantityProduct(quantityProduct + 1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
