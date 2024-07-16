/**
 * Declaracion de nextauth for session in typescript
 */

import NextAauth, { DefaultSession } from 'next-auth';


/**
 * Esto se usa para declarar una nueva forma de escribir una interface session para la authentificacion
 */
declare module 'next-auth' {
    interface Session {
        user : {
            id: string;
            name: string;
            email: string;
            emailVerified?: boolean ;
            role: string;
            image?: string;
        } & DefaultSession['user']
    }
}