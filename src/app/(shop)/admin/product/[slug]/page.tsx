/**
 * Page product admin
 */

import { Title } from "@/components";
import { getProductBySlugAction } from "@/actions";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
    params: {
        slug: string;
    }
}

export default async function ProductAdminPage({ params }: Props ) {
    const { slug } = params;

    const productAction = await getProductBySlugAction(slug);
    console.log("🚀 ~ ProductAdminPage ~ productAction:", productAction)

    if (!productAction) {
        redirect('/admin/products');
    }

    const titleProduct = ( slug === 'new' ) ? 'Nuevo' : 'Editar'

    return (
        <>
            <Title title={`${titleProduct} Producto`}/>

            {/* Form product */}
            <ProductForm product={productAction} />
        </>
    )
}