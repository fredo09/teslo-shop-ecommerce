/**
 * Page address
 */

import { Title } from '@/components';
import { auth } from '@/auth.config';
import { AddressForm } from './ui/AddressForm';
import { getAddressUserAcction, getCountriesAction } from '@/actions';

//Interfaces
import { Country } from '@/interfaces';

export default async function AddressPage() { 

    const contries: Country[] = await getCountriesAction();

    //* -> Session del usuario con auth en paginas cargadas desde el servidor
    const sessionData = await auth();

    if (!sessionData?.user) {
        return(
            <h3 className='text-5xl'>500 - No hay session</h3>
        )
    }
    
    //* Server actions
    const getAddress = await getAddressUserAcction(sessionData.user.id) ?? undefined;

    return (
        <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
            <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
                <Title title="Dirección" subTitle="Dirección de entrega" />

                {/* TODO: AQUI SE MOSTRAR LA LISTA DE DIRECCIONES O INCLUSO MOSTRAR LA DIRECCION DE DEFAULT */}
                <AddressForm 
                    countries={contries}
                    userAddress={getAddress}
                />
            </div>
        </div>
    );
}