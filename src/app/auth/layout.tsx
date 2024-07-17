/**
* !LOS LAYOUT SON GENERADOS DEL LADO DEL SERVIDOR  
*/

import { auth } from "@/auth.config";
import { ToastNotification } from "@/components";
import { redirect } from "next/navigation";

export default async function authLayout({ children }: { children: React.ReactNode; }) {
    //! LLAMAMOS A CONFIG DE AUTH EN NEXT MIDDLEWARE
    const session = await auth();

    console.log("🚀 ~ authLayout ~ session:", { session });

    if ( session?.user ) {
        redirect('/')
    }

    return (
        <main className="flex justify-center">
            <div className="w-full sm:w-[350px] px-10">
                {children}
            </div>

            {/* ToastNotification */}
            <ToastNotification />
        </main>
    );
}