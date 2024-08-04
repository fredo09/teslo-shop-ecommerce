/**
 * Page orderes by id
 */

import Image from 'next/image';
import clsx from 'clsx';
import { PaypalButton, Title } from '@/components';
import { redirect } from 'next/navigation';
import { getOrderByIdAction } from '@/actions';
import { IoCardOutline } from 'react-icons/io5';
import { currencyFormat, formartPhoneNumber } from '@/utils';
import type { Metadata } from 'next';

interface Props {
    params: {
        id: string;
    };
}

export const metadata: Metadata = {
    title: 'Detalle de tu Compra'
}

//id de referencia: f20a86e7-0979-4f17-abc3-0e8360018f64 
export default async function OrderById({ params }: Props) {
    const { id } = params;
    const { orden, ok } = await getOrderByIdAction(id)

    if (!ok) {
        redirect('/');
    }

    //! Informacion del address de la orden
    const address = orden!.OrderAddress;

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <Title title={`Tu Orden # ${orden!.id.split('-')[0]}`} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Carrito */}
                    <div className="flex flex-col mt-5">
                        <div className={
                            clsx(
                                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                {
                                    'bg-red-500': !orden!.isPaid,
                                    'bg-green-700': orden!.isPaid,
                                }
                            )
                        }>
                            <IoCardOutline size={30} />
                            {/* <span className="mx-2">Pendiente de pago</span> */}
                            <span className="mx-2 font-bold">
                                { !orden!.isPaid ? 'No pagado' : 'Pagado' }
                            </span>
                        </div>

                        {/* Items */}
                        {
                            orden?.OrderItem.map((itemOrden, idx) => (
                                <div key={itemOrden.product.slug + "-" + idx} className="flex mb-5">
                                    <Image
                                        src={`/products/${itemOrden.product.imageProduct[0].urlImage}`}
                                        width={100}
                                        height={100}
                                        style={{
                                            width: '100px',
                                            height: '100px'
                                        }}
                                        alt={itemOrden.product.title}
                                        className="mr-5 rounded"
                                    />

                                    <div>
                                        <p>{itemOrden.product.title}</p>
                                        <p>${itemOrden.price} x 3</p>
                                        <p className="font-bold">
                                            SubTotal: {currencyFormat(itemOrden.price * itemOrden.quantity)}
                                        </p>
                                    </div>

                                </div>
                            ))
                        }
                    </div>

                    {/* Checkout - Resumen de orden */}
                    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl mb-2">Dirección de entrega</h2>
                        <div className="mb-10  grid grid-cols-2">
                            <p>Usuario </p>
                            <p className="text-right text-xl">{address!.firstName}  {address!.lastName}</p>
                            <p>Calle</p>
                            <p className="text-right">{address!.address}</p>
                            <p>Alcaldia o Municipio</p>
                            <p className="text-right">{address!.city}</p>
                            <p>Ciudad o Estado</p>
                            <p className="text-right">{address!.city}</p>
                            <p>Pais</p>
                            <p className="text-right">{address!.countryId}</p>
                            <p>Codigo Postal</p>
                            <p className="text-right">{address!.postalCode}</p>
                            <p>Numero telefonico</p>
                            <p className="text-right">{formartPhoneNumber(address!.phone)}</p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

                        <h2 className="text-2xl mb-2">Resumen de orden</h2>

                        {/* Summary Orden */}
                        <div className="grid grid-cols-2" >
                            <span>No. Productos</span>
                            <span className="text-right">
                                {orden!.itemsInOrder === 1 ? '1 Productos' : `${orden!.itemsInOrder} productos`}
                            </span>

                            <span>Subtotal</span>
                            <span className="text-right"> {currencyFormat(orden!.subTotal)}</span>

                            <span>Impuesto (15%)</span>
                            <span className="text-right"> {currencyFormat(orden!.tax)}</span>

                            <span className="mt-5 text-2xl">Total</span>
                            <span className="mt-5 text-2xl text-right"> {currencyFormat(orden!.total)}</span>
                        </div>

                        <div className="mt-5 mb-2 w-full">
                            {/* <div className={
                                clsx(
                                    "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                    {
                                        'bg-red-500': !orden!.isPaid,
                                        'bg-green-700': orden!.isPaid,
                                    }
                                )
                            }> */}
                                {/* <IoCardOutline size={30} /> */}
                                {/* <span className="mx-2">Pendiente de pago</span> */}
                                {/* <span className="mx-2">Pagada</span> */}
                            {/* </div> */}
                            
                            {/* Paypal button */}
                            <PaypalButton
                                amount={orden!.total}
                                orderId={orden!.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}