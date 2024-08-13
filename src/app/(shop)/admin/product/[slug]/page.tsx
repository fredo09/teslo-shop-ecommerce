/**
 * Page product admin
 */

import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { getCategoriesAction, getProductBySlugAction } from "@/actions";

interface Props {
    params: {
        slug: string;
    }
}

export default async function ProductAdminPage({ params }: Props ) {
    const { slug } = params;

    const [productAction, { categories = [] }] = await Promise.all([
        getProductBySlugAction(slug),
        getCategoriesAction()
    ]);

    if ( !productAction && slug !== 'new') {
        redirect('/admin/products');
    }

    const titleProduct = ( slug === 'new' ) ? 'Nuevo' : 'Editar';

    return (
        <>
            <Title title={`${titleProduct} Producto`}/>

            {/* Form product */}
            <ProductForm product={ productAction ?? {} } categoires={ categories } />
        </>
    )
}