/**
 * Page product slug
 */

import { initialData } from "@/seed/seed";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { QuantitySelector, SizeSelector } from "@/components";

interface Props {
    params: {
        slug: string
    }
}

const seedProduct = initialData.products;

export default function ProductPage({ params }: Props ) {
    const { slug } = params;

    const product = seedProduct.find( product => {
        return product.slug === slug 
    });

    console.log("🚀 ~ ProductPage ~ product:", product)
    
    if (!product) {
        notFound();
    }

    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* SlideShows */}

            <div className="col-span-1 md:col-span-2">
                <h1>hola 🚀 </h1>
            </div>

            {/* Details */}
            <div className="col-span-1 px-5">
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                    { product.title }
                </h1>
                <p className="text-lg mb-5">
                    ${ product.price.toFixed(2) }
                </p>

                {/* Selector de tallas */}
                <SizeSelector 
                    selectorSize={product.sizes[0]}
                    availableSizes={product.sizes}
                />

                {/* Selector de cantidades */}
                <QuantitySelector quantity={1} />

                {/* Button */}
                <button className="btn-primary my-5">
                    Agregar al carrito
                </button>

                {/* Description */}
                <h3 className="font-bold text-sm">Descripcion</h3>
                <p className="font-light mt-2">
                    {product.description}
                </p>
            </div>
        </div>
    );
}