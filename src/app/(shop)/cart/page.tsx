/**
 * Page cart admin
 */

import Image from "next/image";
import Link from "next/link";
import { initialData } from "@/seed/seed";
import { QuantitySelector, Title } from "@/components";


const PRODUCTS_IN_CART = [
    initialData.products[0],
    initialData.products[1],
    // initialData.products[2],
];

export default function CartPage() {

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm-px-0">
            <div className="flex flex-col w-[1000px">
                <Title title="Carrito de Compras" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* Carrito */}
                    <div className="flex flex-col mt-5 ">
                        <span className="text-xl">Agrega productos al carrito</span>
                        <Link href={'/'} className="hover:underline mb-5">
                            Continua Comprando :)!
                        </Link>

                        {/* Items del carrito */}
                        {
                            PRODUCTS_IN_CART.map(item => (
                                <div key={item.slug} className="flex mb-5">
                                    <Image
                                        src={`/products/${item.images[0]}`}
                                        alt={item.title}
                                        height={100}
                                        width={100}
                                        className="mr-5 rounded"
                                    />
                                    <div>
                                        <p>{item.title}</p>
                                        <p>{item.price}</p>
                                        <QuantitySelector
                                            quantity={2}
                                        />

                                        <button className="hover:underline mt-3">
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Proceso de pago o checkout */}
                    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl text-center mb-2">Resumen de Orden</h2>

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
                            <Link 
                            className="flex btn-primary justify-center"
                            href={'/checkout/address'}>
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}