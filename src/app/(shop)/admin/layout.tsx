/**
 * Layout for Admin pages
 */

import { auth } from "@/auth.config";
import { redirect } from "next/navigation";


export default async function AdminLayout({ children }: { children: React.ReactNode; }) {

    const sessionUser = await auth();

    if (sessionUser?.user.role !== 'admin') {
        redirect('/login');
    }

    return (
        <>
            { children }
        </>
    );
}