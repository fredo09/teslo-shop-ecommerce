'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/interfaces';

interface Props {
    product: Product
}

export const ItemProduct = ({ product }: Props) => {

    const [displayImages, setDisplayImages] = useState(product.images[0]);

    return (
        <div className=' rounded-md overflow-hidden fade-in '>
            <Link href={`/product/${product.slug}`}>
                <Image
                    alt={`${product.title}`}
                    className='w-full object-cover rounded'
                    src={`/products/${displayImages}`}
                    width={500}
                    height={500}
                    onMouseEnter={() => setDisplayImages(product.images[1]) }
                    onMouseOut={() => setDisplayImages(product.images[0])}
                />
            </Link>

            <div className='p-4 flex flex-col'>
                <Link href={`/product/${product.slug}`} className='hover:text-blue-600'>
                    {product.title}
                </Link>
                <span className='font-bold'> ${product.price} </span>
            </div>
        </div>
    )
}
