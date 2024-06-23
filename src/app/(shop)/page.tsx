import { GridProducts, Title } from "@/components";
import { initialData } from '@/seed/seed';

const productsData = initialData.products;
console.log("🚀 ~ productsData:", productsData)

export default function Home() {
    return (
        <main className="">
            <Title 
                title="Tienda"
                subTitle="Todos los productos"
                className="mb-2"
            />

            <GridProducts 
                products={productsData}
            />
        </main>
    );
}