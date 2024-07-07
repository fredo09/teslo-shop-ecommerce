/**
 * Config auth.hs with nextAtuh
 */

import { z } from 'zod';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import bycrypt from 'bcryptjs';
import prisma from './lib/prisma';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/newAccount'
    },
    providers: [
        //! login con credenciales de email y contraseña
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(8) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;
                
                console.log("🚀 ~ authorize ~ parsedCredentials:", parsedCredentials)

                if (!parsedCredentials) return null;
                //const { data, error, success } = parsedCredentials.data;
                const { email, password } = parsedCredentials.data;
                console.log("🚀 ~ authorize ~ email:", { email, password })

                //* BUSCAR USUARIO

                const userDb = await prisma.user.findUnique({ where: { email: email.toLowerCase() }});
                console.log("🚀 ~ authorize ~ userDb:", userDb);

                if (!userDb) return null;

                //* COMPARAR CONTRASEÑAS
                if (!bycrypt.compareSync( password, userDb.password )) return null;

                //* Regresar el usuario informacion necesaria sin password
                const { password: _ , ...rest } = userDb;
                console.log("🚀 ~ authorize ~ rest:", rest);
                return rest;
            },
        }),
    ]
};

//* exportamos la configuracion del auth
export const { signIn, signOut, auth } = NextAuth(authConfig);