/**
 * Config auth.hs with nextAtuh
 */

import NextAuth, { type NextAuthConfig } from 'next-auth';
import { z } from 'zod';
import Credentials from 'next-auth/providers/credentials';

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
                
                console.log("🚀 ~ authorize ~ parsedCredentials:", parsedCredentials)

                if (!parsedCredentials) return null;

                const { data, error, success } = parsedCredentials;

                //* BUSCAR USUARIO

                //* COMPARAR CONTRASEÑAS

                //* Regresar el usuario informacion necesaria

                return null;
            },
        }),
    ]
};

//* exportamos la configuracion del auth
export const { signIn, signOut, auth } = NextAuth(authConfig);