/**
 * server actions for check payments in paypal
 */
'use server';

/**
 * CHeck status payment in paypal with transaccionPaypalId
 * @param transaccionPaypalId {string}
 */
export const paypalCheckPaymentAction = async( transaccionPaypalId: string | undefined ) => {
    console.log("🚀 ~ paypalCheckPaymentAction ~ transaccionPaypalId:", transaccionPaypalId);

    const tokenPaypal = await getPaypalBearToken();
    console.log("🚀 ~ paypalCheckPaymentAction ~ tokenPaypal:", tokenPaypal)

    if (!tokenPaypal) {
        return {
            ok: false,
            message: 'No se pudo obtener la verificacion 🤡'
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
        const result = await fetch(OauthToken, requestOptions)
            .then((response) => response.json());
            
        console.log("🚀 ~ getPaypalBearToken ~ result:", result)
        return result.access_token;
        
    } catch (error) {
        console.log("🚀 ~ getPaypalBearToken ~ error:", error)
        return null;
    }
}