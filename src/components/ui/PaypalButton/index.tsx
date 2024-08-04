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
     * @param {Object} data CreateOrderData
     * @param {Object} actions CreateOrderActions
     * @returns {String} transactionId
     */
    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
        const transactionsPaypalId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    //invoice_id: 'order_id' -> nueva version 'reference_id'
                    reference_id: orderId,
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

        if (!ok) {
            throw new Error('no se pudo hacer la transaccion');
        }

        return transactionsPaypalId;
    }

    /*
     * Check is payment is completed or status del payments in paypal
     * @param {Object} data 
     * @param {Object} actions 
     */
    const onApprove = async(data: OnApproveData, actions: OnApproveActions): Promise<void> => {
        const details = await actions.order?.capture();

        if (!details) return;

        const orderId = details.id ?? '';
        
        //! Server actions
        await paypalCheckPaymentAction(orderId) ;
    };

    return (
        <PayPalButtons onApprove={onApprove} createOrder={createOrder}></PayPalButtons>
    )
}
