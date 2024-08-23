/**
 * server actions for check payments in paypal
 */
'use server';

import prisma from "@/lib/prisma";
import type { PaypalOrderStatusResponse } from "@/interfaces";
import { revalidatePath } from "next/cache";

/**
 * Check status payment in paypal with transaccionPaypalId
 * @param transaccionPaypalId {string}
 */
export const paypalCheckPaymentAction = async( transaccionPaypalId: string ) => {
    console.log("🚀 ~ paypalCheckPaymentAction ~ transaccionPaypalId:", transaccionPaypalId)
    console.log("🚀 ~ paypalCheckPaymentAction ~ transaccionPaypalId:", typeof(transaccionPaypalId));

    // Recuperamos el token para verificar pago en paypal
    const tokenPaypal = await getPaypalBearToken();
    console.log("🚀 ~ paypalCheckPaymentAction ~ tokenPaypal:", tokenPaypal)

    if (!tokenPaypal) {
        return {
            ok: false,
            message: 'No se pudo obtener la verificacion 🤡'
        }
    }

    //Recupaeramos el estatus del pago 
    const responsePayment = await verifyOrderPaypalPayment(transaccionPaypalId, tokenPaypal);

    if (!responsePayment) {
        return {
            ok: false,
            message: 'No se puede verificar el pago paypal 🤡'
        }
    }

    const { status, purchase_units } = responsePayment;
    const { reference_id: orderPaypalId } = purchase_units[0];

    if ( status !== 'COMPLETED' ) {
        return {
            ok: false,
            message: 'El pago no se ha completado 🤡'
        }
    }

    //TODO: ACTUALIZAR EL PAGO EN LA BASE DE DATOS 
    try {
        console.log("🚀 ~ paypalCheckPaymentAction ~ status, purchase_units:", { status, purchase_units })
        await prisma.order.update({
            where: { id: orderPaypalId },
            data: {
                isPaid: true,
                paidAt: new Date()
            }
        });

        //TODO:  REVALIDAR PAHTS NEXT
        revalidatePath(`/orders/${orderPaypalId}`);

        return {
            ok: true,
            message: 'Se ha pagado la orden en paypal ✅ 😎'
        }
    } catch (error) {
        console.log("🚀 ~ paypalCheckPaymentAction ~ error:", error)
        return {
            ok: false,
            message: 'No se puede actualizar el pago 🤡'
        }
    }
};


/**
 * @description Get access token of paypal
 * @returns {String | Null} acces_token
 */
const getPaypalBearToken = async (): Promise<string | null> => {
    const PAYPAL_CLIENTE = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_KEY_SECRET_ID = process.env.PAYPAL_SECRET_KEY;
    const OauthToken = process.env.PAYPAL_OAUTH_URL ?? '';

    const base64Token = Buffer.from(
        `${PAYPAL_CLIENTE}:${PAYPAL_KEY_SECRET_ID}`,
        'utf-8'
    ).toString('base64');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${base64Token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded
    };

    try {
        const result = await fetch(OauthToken, {
            ...requestOptions,
            cache: 'no-store'
        }).then((response) => response.json());

        console.log("🚀 ~ getPaypalBearToken ~ result:", result)
        return result.access_token;
        
    } catch (error) {
        console.log("🚀 ~ getPaypalBearToken ~ error:", error)
        return null;
    }
}

/**
 * @description verify order paypal token
 * @param {string} paypalTransaccionId 
 * @param {string} bearerTokenPaypal 
 * @returns {Promise<PaypalOrderStatusResponse | null>}response
 */
const verifyOrderPaypalPayment= async (
    paypalTransaccionId: string, bearerTokenPaypal: string 
):Promise<PaypalOrderStatusResponse | null> => {
    const PAYPAL_URL = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransaccionId}`;

    const myHeaders = new Headers();
    myHeaders.append(
        "Authorization",
        `Bearer ${bearerTokenPaypal}`
    );

    const requestOptions = {
        method: "GET",
        headers: myHeaders
    };

    try {
        const response  = await fetch( PAYPAL_URL, {
            ...requestOptions,
            cache: 'no-store'
        } ).then((response) => { return response.json()})
        console.log("🚀 ~ verifyOrderPaypalPayment ~ response:", response)
        return response;

    } catch (error) {
        console.log("🚀 ~ verifyOrderPaypalPayment ~ error:", error)
        return null
    }
}