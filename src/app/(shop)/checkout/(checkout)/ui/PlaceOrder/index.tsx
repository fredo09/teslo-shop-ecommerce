/**
 * Componente que hara todo referente a la peticion de la orden 
 */
'use client';

import React, { useEffect, useState } from 'react'
import { clsx } from 'clsx';
import { currencyFormat } from '@/utils';
import { useAddressFormStore, useCartStore } from '@/store';
import { PlaceOrderActions } from '@/actions';


export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isBlockedButton, setIsBlockedButton] = useState(false);

  //* store address , summary
  const getAddressStore = useAddressFormStore( state => state.addressState );
  const getSummaryInfo = useCartStore(state => state.getSummaryInformation());

  const cartInStoreToOrder = useCartStore(state => state.cart);

  useEffect(() => {
    if (getAddressStore) {
      setLoaded(true);
    } 
  }, [getAddressStore]);


  const onPlaceOrder = async() => {
    setIsBlockedButton(true);

    const productsToOrder = cartInStoreToOrder.map( productInOrder => ({
      id: productInOrder.id,
      quantity: productInOrder.quantity,
      size: productInOrder.size,
    }));

    console.log("🚀 ~ mi contenido a mandar a server para ordenar:", { getAddressStore, productsToOrder });

    // await sleep(5);

    //TODO: HACER SERVER ACTIONS PARA LA TRANSACCION A LA DB
    await PlaceOrderActions(productsToOrder, getAddressStore);

    setIsBlockedButton(false);
  };


  if (!loaded) {
    return(
      <p>Cargando... </p>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      {/* Resumen de direccion de envio */}
      <h2 className="text-2xl text-center mb-2 font-bold">Direcciòn de envio:</h2>
      <div className="mb-10 grid grid-cols-2">
        <p>Usuario </p>
        <p className="text-right text-xl">{ getAddressStore.firstName }  { getAddressStore.lastName }</p>
        <p>Calle</p>
        <p className="text-right">{ getAddressStore.address }</p>
        <p>Alcaldia o Municipio</p>
        <p className="text-right">{ getAddressStore.city }</p>
        <p>Ciudad o Estado</p>
        <p className="text-right">{ getAddressStore.city }</p>
        <p>Pais</p>
        <p className="text-right">{ getAddressStore.country }</p>
        <p>Codigo Postal</p>
        <p className="text-right">{ getAddressStore.postalCode }</p>
        <p>Numero telefonico</p>
        <p className="text-right">{ getAddressStore.phone }</p>
      </div>

      {/* Line Separator */}
      <div className="w-full h-px bg-gray-200 my-5" />

      {/* Resumen de Orden y monto a pagar */}
      <h2 className="text-2xl text-center mb-2 font-bold">Resumen de Orden:</h2>

      <div className="grid grid-cols-2">
        <span>No. Producto </span>
        <span className="text-right">
          {getSummaryInfo.itemIncartSummary === 1 ? '1 Productos' : `${getSummaryInfo.itemIncartSummary} productos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right"> {currencyFormat(getSummaryInfo.subTotalProductIncart)}</span>

        <span>Impuesto (15%)</span>
        <span className="text-right"> {currencyFormat(getSummaryInfo.impuesto)}</span>

        <span className="mt-5 text-2xl">Total</span>
        <span className="mt-5 text-2xl text-right"> {currencyFormat(getSummaryInfo.totalProductInCart)}</span>
      </div>
      {/* Ir al pago */}
      <div className="mt-5 mb-2 w-full">

        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en &rdquo;Realizar pedido&ldquo; , aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
          </span>
        </p>

        {/* <div>
          <p className='text-red-500 font-bold'>Error al generar la orden</p>
        </div> */}

        <button
          onClick={onPlaceOrder}
          // className="flex btn-primary justify-center items-center w-full h-12"
          disabled={isBlockedButton}
          className={
            clsx({
              "flex btn-primary justify-center items-center w-full h-12" : !isBlockedButton,
              "flex btn-disabled justify-center items-center w-full h-12": isBlockedButton,
            })
          }
          // href={'/orders/1231'}
          >
            {/* TODO: HACER QUE APAREZCA EL LOADING CUANDO SE CARGA LA COMPRA */}
          {
            isBlockedButton ? 
              (<svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
              </svg>) :
              (<p>Realizar pedido </p>)
          }
        </button>
      </div>
    </div>
  )
}
