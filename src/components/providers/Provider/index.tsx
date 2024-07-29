/**
 * Component about provider Session Auth
 * !Esto es una configuracion que se necesita para agregar la obtencion sobre la sesion del lado del cliente
 * !Entonces es algo que si se tiene que configurar usando auth en next 
 * !ADEMAS TENDREMOS EL PROVIDER EL PAYPAL
 */
'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

interface Props {
    children: React.ReactNode
}

export const ProviderSessionAuth = ({ children }: Props) => {
  console.log("🚀 ~ tenemos el enviroment de paypal??? :", process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '');

  let clientPaypalId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';

  const OPTIONS_PAYPAL_PROVIDER = {
    clientId: clientPaypalId,
    intent: 'capture',
    currency: 'USD'
  };

  return (
    <PayPalScriptProvider options={OPTIONS_PAYPAL_PROVIDER}>
      <SessionProvider>
          { children }
      </SessionProvider>
    </PayPalScriptProvider>
  )
}
