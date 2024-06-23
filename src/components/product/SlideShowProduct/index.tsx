'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper as SwiperObject } from 'swiper'; //  *-> typing TypeScript
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

// * my styles
import './slideShow.module.css';

interface Props {
    images: string[];
    title: string,
    className?: string;
}

export const SlideShowProduct = ({ images, title, className }: Props) => {
    // State Swiper
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    return (
        <div className={ className }>
            {/* Swiper main */}
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                } as React.CSSProperties }
                loop={true}
                spaceBetween={10}
                navigation={true}
                pagination
                autoplay={{
                    delay: 2500
                }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroy ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
                className="">
                    {
                        images.map(image => (
                            <SwiperSlide key={image}>
                                <Image 
                                    width={1024}
                                    height={700}
                                    src={`/products/${image}`}
                                    className='rounded-lg object-fill'
                                    alt={title}
                                    priority={true}
                                />
                            </SwiperSlide>
                        ))
                    }
            </Swiper>

            {/* Swiper secundary */}
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper mt-3">
                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <Image
                                width={300}
                                height={300}
                                src={`/products/${image}`}
                                className='rounded-lg object-fill'
                                alt={title}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}
