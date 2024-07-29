/**
 * Page Checkout 
 */

import Link from "next/link";
import { Title } from "@/components";
import { SummaryInCart } from './ui/SummaryInCart';
import { PlaceOrder } from "./ui/PlaceOrder";


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
                        <SummaryInCart />
                    </div>

                    {/* Proceso de pago o checkout */}
                    <PlaceOrder />
                </div>
            </div>
        </div>
    );
}