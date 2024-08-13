/**
 * Page Admin Ordens
 */

import Link from "next/link";
import { currencyFormat } from "@/utils";
import { getproductPaginationActions } from "@/actions";
import { Pagination, ProductImage, Title } from "@/components";

interface Props {
    searchParams: {
        page?: string
    }
}

export default async function AdminProductsPage({ searchParams }: Props) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { products, currentPage, totalPages } = await getproductPaginationActions({ page });

    return (
        <>
            <Title title="Mantenimiento de productos" />

            {/* Boton nuevo producto */}
            <div className="flex justify-end mb-5">
                <Link href="/admin/product/new" className="btn-primary">
                    Nuevo Producto
                </Link>
            </div>

            <div className="mb-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                Imagen
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                Nombre Producto
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                Precio
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                Inventario
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                Genero
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                Tallas
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products?.map((product) => (
                                <tr
                                    key={product.id}
                                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <Link href={`/product/${product.slug}`}>
                                            <ProductImage
                                                src={product.imageProduct[0]?.urlImage}
                                                alt={product.slug}
                                                width={80}
                                                height={80}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                        </Link>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        <Link href={`/admin/product/${product.slug}`}>
                                            {product.title}
                                        </Link>
                                    </td>
                                    <td className="text-sm  text-gray-900 px-6 py-4 whitespace-nowrap">
                                        {currencyFormat(product.price)}
                                    </td>
                                    <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {product.inStock}
                                    </td>
                                    <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {product.gender}
                                    </td>
                                    <td className="text-sm  text-gray-900 px-6 py-4 whitespace-nowrap font-bold">
                                        {product.sizes.join(', ')}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                
                {/* Pagination products */}
                <Pagination totalPages={totalPages} />
            </div>
        </>
    );
}