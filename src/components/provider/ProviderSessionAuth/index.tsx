/**
 * Component about provider Session Auth
 * !Esto es una configuracion que se necesita para agregar la obtencion sobre la sesion del lado del cliente
 * !Entonces es algo que si se tiene que configurar usando auth en next 
 */
'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

interface Props {
    children: React.ReactNode
}

export const ProviderSessionAuth = ({ children }: Props) => {
  return (
    <SessionProvider>
        { children }
    </SessionProvider>
  )
}
