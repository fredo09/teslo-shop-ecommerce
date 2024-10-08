/**
 * Register Form
 * -> aqui se usa el paquete de React Hook Form
 */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { RegisterAccountAcction, loginAction } from '@/actions';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormInputs = {
    name: string;
    email: string;
    password: string;
    repitePassword: string;
}

export const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState('');

    /*
     * Aqui usamos el hook de 'react-hook-form'
     * donde ocupamos el register y el handleSubmit
     * register es para usar los inputs 
     * handleSubmit evita la propagacion
     */
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();


    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        const { name, password, email, repitePassword } = data;

        console.log("🚀 ~ mostrando data del submit :", { name, password, email, repitePassword });

        //TODO: AGREGAR SERVERACTIONS

        const response = await RegisterAccountAcction(name, password, email);

        if (!response.ok) {
            setErrorMessage(response.message)
            toast.error(`${response.message}`);
            return;
        }

        if (response.user) {
            await loginAction(email.toLowerCase(), password);

            console.log("🚀 ~ Se ha creado el usuario:", { response });
            toast.success(`${response.message}`);

            window.location.replace('/');
            return;
        }

    };


    return (
        <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col">

            <label htmlFor="email">Nombre completo</label>
            <input
                autoFocus
                { ...register('name', { required: true }) }
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.name
                        }
                    )
                }
                type="text" />

            <label htmlFor="email">Correo electrónico</label>
            <input
                autoFocus
                {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ }) }
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.email
                        }
                    )
                }
                type="email" />


            <label htmlFor="email">Contraseña</label>
            <input
                autoFocus
                type="password"
                {...register('password', { required: true }) }
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.password
                        }
                    )
                }/>
            
            {/* <label htmlFor="email">Repertir Contraseña</label>
            <input
                autoFocus
                {...register('repitePassword', { required: true }) }
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password" /> */}

            <span className="text-red-500">{errorMessage} </span>

            <button

                className="btn-primary">
                Crear cuenta
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Ingresar
            </Link>

        </form>
    )
}
