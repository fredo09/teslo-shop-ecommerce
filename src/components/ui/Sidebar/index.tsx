'use client'

import React from 'react'
import Link from 'next/link'
import clsx from 'clsx';
import { useUiStore } from '@/store';
import { logoutAction } from '@/actions';
import { useSession } from 'next-auth/react';
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5';

export const SideBar = () => {
    // * Uso del store median un hook
    const isSideMenuOpen = useUiStore(state => state.isSideOpenMenu);
    const closeMenu = useUiStore(state => state.closeSideMenu);

    //* hook para manejo de sesion useSession "next-auth/react" del lado del cliente
    const { data: session } = useSession();
    //console.log("🚀 ~ SideBar ~ session:", session);

    //* hacemos docle negacion usando !! para ver si hay usuario o no
    const isAuthenticate = !!session?.user;


    //* recargar sidebar 
    const logutSidebar = async () => {
        console.log("🚀 ~ se ha llamado?:");
        await logoutAction();
        window.location.replace('/');
        closeMenu();
    }

    return (
        <div>
            {/* Background */}
            {
                isSideMenuOpen && (
                    <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'></div>
                )
            }

            {/* Blur Background */}
            {
                isSideMenuOpen && (
                    <div
                        onClick={ closeMenu }
                        className='fede-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'></div>
                )
            }

            {/* SideMenu */}
            <nav
                className={
                    clsx(
                        'fixed p-5 right-0 top-0 w-[350px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-x-scroll',
                        {
                            'translate-x-full': !isSideMenuOpen
                        }
                    )
                }>
                <IoCloseOutline
                    size={50}
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={ () => closeMenu() } />

                {/* Search Input */}
                <div className='relative mt-14'>
                    <IoSearchOutline size={20} className='absolute top-2 left-2' />
                    <input
                        className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
                        placeholder='Search'
                        type='text' />
                </div>

                {/* Items Links */}

                <Link
                    href="/profile"
                    onClick={() => closeMenu() }
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                    <IoPersonOutline size={25} />
                    <span className="ml-3 text-xl">Perfil</span>
                </Link>

                <Link
                    href="/"
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                    <IoTicketOutline size={25} />
                    <span className="ml-3 text-xl">Ordenes</span>
                </Link>

                {/* Si esta autenticado mostrar el boton de salir */}
                {
                    isAuthenticate && (
                        <button
                            onClick={() => logutSidebar() }
                            className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                            <IoLogOutOutline size={25} />
                            <span className="ml-3 text-xl">Salir</span>
                        </button>
                    )
                }

                {/* Si no lo esta mostrar el boton de ingresar */}
                {
                    !isAuthenticate && (
                        <Link
                            href="/auth/login"
                            onClick={() => closeMenu()}
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoLogInOutline size={25} />
                            <span className="ml-3 text-xl">Ingresar</span>
                        </Link>
                    )
                }

                {/* Line Separator */}
                <div className="w-full h-px bg-gray-200 my-10" />

                <Link
                    href='/'
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                    <IoShirtOutline size={25} />
                    <span className="ml-3 text-xl">Productos</span>
                </Link>

                <Link
                    href="/"
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                    <IoTicketOutline size={25} />
                    <span className="ml-3 text-xl">Ordenes</span>
                </Link>

                <Link
                    href="/"
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                    <IoPeopleOutline size={25} />
                    <span className="ml-3 text-xl">Usuarios</span>
                </Link>

            </nav>
        </div>
    )
}
