/**
 * Component Product Form admin 
 */
"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { Product, Categories, ImageProduct } from "@/interfaces";

interface Props {
    product: Product & { imageProduct?: ImageProduct[] };
    categoires: Categories[]
}

type FormInputs = {
    title: string;
    slug: string;
    description: string;
    price: number;
    inStock: number;
    sizes: string[];
    tags: string;
    gender: 'Men' | 'Kid' | 'Women' | 'Unisex';
    categoryId: string;

    //TODO: Images
}

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categoires }: Props) => {
console.log("🚀 ~ ProductForm ~ product:", product)

    const { handleSubmit, register, formState:{ isValid } } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            tags: product.tags.join(', '),
            sizes: product.sizes ?? []
        }
    });

    const onSubmit = async ( dataForm: FormInputs) => {
        console.log("🚀 ~ onSubmit ~ dataForm:", dataForm)
    };

    return (
        <form onSubmit={ handleSubmit(onSubmit) } className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('title', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('slug', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        rows={5}
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('description', { required: true })}
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Price</span>
                    <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('price', { required: true, min: 0 })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('tags', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <select className="p-2 border rounded-md bg-gray-200" {...register('gender', { required: true })}>
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Categoria</span>
                    <select className="p-2 border rounded-md bg-gray-200" {...register('categoryId', { required: true })}>
                        <option value="">[Seleccione]</option>
                        {
                            categoires.map((category) => (
                                <option  key={category.id} value={`${category.id}`}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button className="btn-primary w-full">
                    Guardar
                </button>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                {/* As checkboxes */}
                <div className="flex flex-col">
                    <span>Tallas</span>
                    <div className="flex flex-wrap">
                        {
                            SIZES.map(size => (
                                // bg-blue-500 text-white <--- si está seleccionado
                                <div key={size} className="flex  items-center justify-center w-10 h-10 mr-2 border rounded-md">
                                    <span>{size}</span>
                                </div>
                            ))
                        }
                    </div>

                    <div className="flex flex-col mb-2">
                        <span>Fotos</span>
                        <input
                            type="file"
                            multiple
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {
                            product.imageProduct?.map((image) => (
                                <div key={image.id}>
                                    <Image
                                        src={`/products/${image.urlImage}`}
                                        className="rounded-t shadow-sd"
                                        alt={ product.title ?? '' }
                                        width={300}
                                        height={300}
                                    />

                                    <button 
                                        type='button' 
                                        onClick={() => console.log("🚀 ~ image id:", image.id )}
                                        className="btn-danger w-full rounded-b-xl">
                                        Eliminar
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </form>
    );
};