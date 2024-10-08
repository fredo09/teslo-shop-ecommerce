/**
 * Page cart admin
 */

import Link from "next/link";
import { Title } from "@/components";
import { ProductInCart } from "./ui/ProductInCart";
import { SummaryProductInCart } from "./ui/SummaryProductInCart";


export default function CartPage() {

    return (
        <div className="flex justify-center items-center mb-40 px-10 sm-px-0">
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
                        <ProductInCart />
                    </div>

                    {/* Proceso de pago o checkout */}
                    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl text-center mb-2">Resumen de Orden</h2>

                        {/* Contenido del summary cart  */}
                        <SummaryProductInCart />

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