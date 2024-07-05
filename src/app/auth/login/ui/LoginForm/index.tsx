'use client';

import React from 'react';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { authenticate } from '@/actions';

export const LoginFrom = () => {
    const [state, dispatch] = useFormState(
        authenticate,
        undefined
    );

    console.log("🚀 ~ LoginFrom ~ state:", {state});

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

            <button
                type='submit'
                className="btn-primary">
                Ingresar
            </button>

            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}
