'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
// import { useRouter } from 'next/router';
import { authenticate } from '@/actions';
import { IoInformationOutline } from 'react-icons/io5';
import { useFormState, useFormStatus } from 'react-dom';
import { Loading } from '@/components';

export const LoginFrom = () => {
    const [state, dispatch] = useFormState(
        authenticate,
        undefined
    );

    // const route = useRouter();

    console.log("🚀 ~ LoginFrom ~ state:", state);

    useEffect(() => {
        if (state === 'Success') {
            console.log("🚀 ~ ha entrado al success:");
            window.location.replace('/');
        }
    }, [state]);


    return (
        <form action={dispatch} className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                name='email'
                type="email" />

            <label htmlFor="email">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                name='password'
                type="password" />

            {/* <label htmlFor="email">Repetir Contraseña</label>
                    <input
                        className="px-5 py-2 border bg-gray-200 rounded mb-5"
                        type="email" /> */}
            <div
                className="flex h-8 items-end space-x-1 mb-5 justify-center"
                aria-live="polite"
                aria-atomic="true">
                {state === 'CredentialsSignin' && (
                    <>
                        <IoInformationOutline className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">Credenciales Incorrectas</p>
                    </>
                )}
            </div>

            {/* Buton de login */}
            <LoginButton />

            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/newAccount"
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>
        </form>
    )
}


function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <>
            <button
                type='submit'
                className={
                    clsx("mt-4 w-full", {
                        "btn-primary": !pending,
                        "btn-disabled": pending
                    })
                }
                disabled={pending}>
                Ingresar
            </button>
        </>
    );
}
