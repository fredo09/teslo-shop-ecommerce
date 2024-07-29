/**
 * Paypal Button component
 */

'use client';

import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js';
import { paypalCheckPaymentAction, setTransactionPaypalIdAction } from '@/actions';

interface Props {
    orderId: string;
    amount: number;
}

export const PaypalButton = ( { orderId, amount }: Props ) => {
    const [{ isPending }] = usePayPalScriptReducer();

    const transformAmount = (Math.round(amount * 100)) / 100;

    if ( isPending ) {
        return(
            <div className='animate-pulse mb-15'>
                <div className='h-11 bg-gray-300 rounded'></div>
                <div className='h-11 bg-gray-300 rounded mt-2'></div>
            </div>
        );
    }

    /*
     * Generated OrderID of paypal
     * @param data CreateOrderData
     * @param actions CreateOrderActions
     * @returns {String} transactionId
     */
    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
        const transactionsPaypalId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    //invoice_id: 'order_id' -> nueva version 'reference_id'
                    amount: {
                        value: `${transformAmount}`,
                        currency_code: 'USD'
                    }
                }
            ]
        });
        console.log("🚀 ~ createOrder ~ transactionsPaypalId:", transactionsPaypalId);

        //TODO: GUARDAR EL ID DE PAYPAL EN LA BASDE DE DATOS "SETTRANSACTIONPAYPALID"
        const { ok, order } = await setTransactionPaypalIdAction(orderId, transactionsPaypalId);
        console.log("🚀 ~ createOrder ~ order:", order);

        if (!ok) {
            throw new Error('no se pudo hacer la transaccion');
        }

        return transactionsPaypalId;
    }

    /*
     * Check is payment is completed or status del payments in paypal
     * @param data 
     * @param actions 
     */
    const onApprove = async(data: OnApproveData, actions: OnApproveActions): Promise<void> => {
        console.log("🚀 ~ onApprove ~ onApprove:")
        const details = await actions.order?.capture();

        if (!details) return;
        
        //! Server actions
        await paypalCheckPaymentAction( details.id ) ;
    }

    return (
        <PayPalButtons
            onApprove={onApprove}
            createOrder={createOrder}
        >
        </PayPalButtons>
    )
}
