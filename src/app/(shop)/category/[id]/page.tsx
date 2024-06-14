/**
 * Page category by id 
 */

import { notFound } from "next/navigation";

interface Props {
    params: {
        id: string
    }
}

export default function CartAdmin({ params }: Props) {
    const { id } = params;

    if( id === 'kids' ){
        notFound();
    }

    return (
        <div>
            <h1>Hello category 🚀 { id }</h1>
        </div>
    );
}