'use client';

import React, { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;
  onQuantityValue: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityValue }: Props) => {
  // const onCountProduct = (value: number) => {
  //   console.log("🚀 ~ onCountProduct ~ value:", value)
  //   console.log('infooosdf ', quantityProduct + value);
  //   if (quantityProduct + value < 1 ) return;
  //   // if (quantityProduct === 5) return;
    
  //   setQuantityProduct(quantityProduct + value);

  //   console.log("🚀 ~ onCountProduct ~ quantityProduct:", quantityProduct + value)
  // }

  const onSetQuantityLess = () => {
    onQuantityValue(quantity -1 );
  }

  const onSetQuantityPlus = () => {
    onQuantityValue(quantity + 1);
  }

  return (
    <div className='flex'>
      <button
        disabled={ quantity <= 1 }
        onClick={() => onSetQuantityLess()}>
        <IoRemoveCircleOutline size={30}/>
      </button>
      <span className='w-20 mx-3 px-5 bg-gray-100 text-center rounded-md'>
        { quantity }
      </span>
      <button
        disabled={ quantity >= 8 }
        onClick={() => onSetQuantityPlus() }>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
