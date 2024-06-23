'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

// * my styles
import './slideShowMobile.module.css';


interface Props {
    images: string[];
    title: string,
    className?: string;
}

export const SlideShowMobileProduct = ({ images, title, className }: Props) => {

    return (
        <div className={className}>
            {/* Swiper main */}
            <Swiper
                style={{
                    width: '100vw',
                    height: '500px',
                    '--swiper-pagination-color': '#fff',
                } as React.CSSProperties}
                pagination
                autoplay={{
                    delay: 2500
                }}
                modules={[FreeMode, Autoplay, Pagination]}
                className="">
                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <Image
                                width={600}
                                height={500}
                                src={`/products/${image}`}
                                className='object-fill'
                                alt={title}
                                priority={true}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}
