'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useUiStore, useCartStore } from '@/store';
import { titleFont } from '@/config/fonts';
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';

export const TopMenu = () => {

    // * Use store open Menu and StoreCart
    const openMenu = useUiStore(state => state.openSideMenu);
    const totalItemsinCart = useCartStore(state => state.getTotalItems()); //* -> aqui ejecuto la accion del store "()"

    const [isLoadingCart, setIsLoadingCart] = useState(false);

    useEffect(() => {
        //! Nos sirve para solventar la hydratacion entre el server y el cliente en el shopping cart  
        setIsLoadingCart(true);
    }, []);

    return (
        <nav className='flex px-5 justify-between items-center w-full'>
            {/* LOGO */}
            <div>
                <Link href="/">
                    <span className={`${titleFont.className} antialiased font-bold`}> Teslo </span>
                    <span>| shop </span>
                </Link>
            </div>

            {/* CENTER MENU */}
            <div className='hidden sm:block'>
                <Link href='/gender/Men' className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
                    Hombres
                </Link>
                <Link href='/gender/Women' className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
                    Mujeres
                </Link>
                <Link href='/gender/Kid' className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
                    Niños
                </Link>
            </div>

            {/* Icons Actios Menu */}
            <div className='flex items-center'>
                <Link href='/search' className="mx-2">
                    <IoSearchOutline className='w-5 h-5' />
                </Link>
                <Link href={
                    (totalItemsinCart === 0 && isLoadingCart) ?
                        '/empty' : '/cart'
                }
                    className="mx-2">
                    <div className='relative'>
                        {
                            (isLoadingCart && totalItemsinCart >= 0) ? (
                                <span className='absolute text-xs rounded-full font-bold px-1 -top-2 -right-2 bg-blue-700 text-white fade-in'>
                                    {totalItemsinCart}
                                </span>
                            ) : (
                                <span className='absolute text-xs rounded-full font-bold px-1 -top-2 -right-2 bg-blue-700 text-white fade-in'>
                                    0
                                </span>
                            )
                        }
                        <IoCartOutline className='w-5 h-5' />
                    </div>
                </Link>

                <button
                    onClick={() => openMenu()}
                    className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
                    Menu
                </button>
            </div>
        </nav>
    )
}
