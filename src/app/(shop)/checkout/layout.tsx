/**
 * Layout CheckoutPage 
 */

import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function CheckoutLayout({ children }: { children: React.ReactNode; }) {

    const session = await auth();

    //! Si no hay usuario regresamos a la page de login
    if (!session?.user) {
        //! hacemos un redirect a login y despues ala page de profile
        //redirect('/auth/login?returnTo=/perfil');
        redirect('/auth/login?redirectTo=/checkout/address');
    }

    return (
        <>
            {children}
        </>
    );
}