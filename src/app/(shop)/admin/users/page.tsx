/**
 * Page Admin Ordens
 */

import { Pagination, Title } from "@/components";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";
import { getUserPginationActions } from "@/actions";

interface Props {
    searchParams: {
        page?: string
    }
}

export default async function AdminUserPage({ searchParams }: Props) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const responseUsers = await getUserPginationActions({page});
    const { ok, pagination } = responseUsers;

    let users = pagination?.users ?? [];
    const totalPages = pagination?.totalPages ?? 1;

    if (!ok) {
        redirect('/auth/login');
    }

    return (
        <>
            <Title title="Ver todas los Usuarios" />
            <div className="mb-10">
                <UsersTable users={users}/>

                {/* TODO: AGERGAR PAGINACION */}
                <Pagination totalPages={totalPages}/>
            </div>
        </>
    );
}