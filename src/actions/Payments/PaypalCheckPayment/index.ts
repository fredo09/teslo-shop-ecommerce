/**
 * server actions for check payments in paypal
 */
'use server';

/**
 * CHeck status payment in paypal with transaccionPaypalId
 * @param transaccionPaypalId {string}
 */
export const paypalCheckPaymentAction = async( transaccionPaypalId: string | undefined ) => {
    console.log("🚀 ~ paypalCheckPaymentAction ~ transaccionPaypalId:", transaccionPaypalId)

};