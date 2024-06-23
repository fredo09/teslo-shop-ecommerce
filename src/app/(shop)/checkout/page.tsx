/**
 * Page Checkout 
 */

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { initialData } from "@/seed/seed";
import { Title } from "@/components";


const PRODUCTS_IN_CART = [
    initialData.products[0],
    initialData.products[1],
    // initialData.products[2],
];

export default function CheckoutPage() {
    //* redireccion de pages en next -> redirect
    //redirect('/empty');

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm-px-0">
            <div className="flex flex-col w-[1000px">
                <Title title="Verificar Orden" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* Carrito */}
                    <div className="flex flex-col mt-5 ">
                        <span className="text-xl">Estas a un paso de llevarte todo.</span>
                        <Link href={'/cart'} className="hover:underline mb-5">
                            ¿Olvidas algo? Pica aqui 
                        </Link>

                        {/* Items del carrito */}
                        {
                            PRODUCTS_IN_CART.map(product => (
                                <div key={product.slug} className="flex mb-5">
                                    <Image
                                        src={`/products/${product.images[0]}`}
                                        alt={product.title}
                                        height={100}
                                        width={100}
                                        className="mr-5 rounded"
                                    />
                                    <div>
                                        <p>{product.title}</p>
                                        <p>${product.price} x 3</p>
                                        <p className="font-bold">Subtotal: ${product.price * 3}</p>

                                        {/* <button className="hover:underline mt-3">
                                            Eliminar
                                        </button> */}
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Proceso de pago o checkout */}
                    <div className="bg-white rounded-xl shadow-xl p-7">
                        {/* Resumen de direccion de envio */}
                        <h2 className="text-2xl text-center mb-2 font-bold">Direcciòn de envio:</h2>
                        <div className="mb-10 grid grid-cols-2">
                            <p>Usuario </p>
                            <p className="text-right text-xl">Alfredo Vazquez</p>
                            <p>Calle</p>
                            <p className="text-right">Av simpre viva 123</p>
                            <p>Alcaldia o Municipio</p>
                            <p className="text-right">Alcaldia Benito Juarez</p>
                            <p>Ciudad o Estado</p>
                            <p className="text-right">Ciudad de Mexico</p>
                            <p>Codigo Postal</p>
                            <p className="text-right">03510</p>
                            <p>Numero telefonico</p>
                            <p className="text-right">9631354762</p>
                        </div>

                        {/* Line Separator */}
                        <div className="w-full h-px bg-gray-200 my-10" />

                        {/* Resumen de Orden y monto a pagar */}
                        <h2 className="text-2xl text-center mb-2 font-bold">Resumen de Orden:</h2>

                        <div className="grid grid-cols-2">
                            <span>No. Producto</span>
                            <span className="text-right">3 Productos</span>

                            <span>Subtotal</span>
                            <span className="text-right">$ 100.00</span>

                            <span>Impuesto (15%)</span>
                            <span className="text-right">$ 10.00</span>

                            <span className="mt-5 text-2xl">Total</span>
                            <span className="mt-5 text-x2l text-right">$ 10.00</span>
                        </div>
                        {/* Ir al pago */}
                        <div className="mt-5 mb-2 w-full">

                            <p className="mb-5">
                                {/* Disclaimer */}
                                <span className="text-xs">
                                    Al hacer clic en &rdquo;Realizar pedido&ldquo; , aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
                                </span>
                            </p>
                            <Link
                                className="flex btn-primary justify-center"
                                href={'/orders/1231'}>
                                Realizar pedido
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}