/**
 * Page product slug
 */
export const revalidate = 604800 ; //* -> revalidar data de productos en 7 dias 

import { Metadata, ResolvingMetadata } from "next";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { getProductBySlugAction } from '@/actions'
import { SlideShowMobileProduct, SlideShowProduct, StockProduct } from "@/components";
import { AddToCart } from "../ui/AddToCart";

//import { initialData } from "@/seed/seed";

interface Props {
    params: {
        slug: string
    }
}

// * generamos Metadata desdes el path url
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug

    // fetch data para info de la data
    //const product = await fetch(`https://.../${id}`).then((res) => res.json())

    // * traemos info del producto del server actions
    const product = await getProductBySlugAction(slug);

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []

    return {
        title: product?.title ?? 'Producto no encontrado',
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Producto no encontrado',
            description: product?.description ?? '',
            // images: ['/some-specific-page-image.jpg', ...previousImages],
            images: [
                `products/${product?.images[1]}`
            ]
        },
    }
}

//const seedProduct = initialData.products;

export default async function ProductPage({ params }: Props ) {
    const { slug } = params;

    // const product = seedProduct.find( product => {
    //     return product.slug === slug 
    // });

    const product  = await getProductBySlugAction( slug );

    console.log("🚀 ~ ProductPage ~ product:", product)
    
    if (!product) {
        notFound();
    }

    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* SlideShows */}
            <div className="col-span-1 md:col-span-2">

                <SlideShowMobileProduct
                    title={product.title}
                    images={product.images}
                    className="block md:hidden"
                />

                {/* SlideShow Desktop */}
                <SlideShowProduct 
                    title={product.title}
                    images={product.images}
                    className="hidden md:block"
                />
            </div>

            {/* Details */}
            <div className="col-span-1 px-5">
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                    {product.title}
                </h1>
                <p className="text-lg mb-5">
                    ${ product.price.toFixed(2) }
                </p>

                {/* Stock productos */}
                <StockProduct
                    slug={product.slug}
                />

                {/* Component Cart */}
                <AddToCart product={product} />

                {/* Description */}
                <h3 className="font-bold text-sm">Descripcion</h3>
                <p className="font-light mt-2">
                    {product.description}
                </p>
            </div>
        </div>
    );
}