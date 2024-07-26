/**
 * Address Store
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
    addressState: {
        firstName: string;
        lastName: string;
        address: string;
        address2: string;
        postalCode: string;
        city: string;
        country: string;
        phone: string;
        // rememberAddress: boolean;
    };

    //Actions
    addAddressStore: ( address: State['addressState'] ) =>  void,
}

export const useAddressFormStore = create<State>()(
    persist(
        (set, get) => ({

            // Store
            addressState: {
                firstName: '',
                lastName: '',
                address: '',
                address2: '',
                postalCode: '',
                city: '',
                country: '',
                phone: ''
            },

            //Actions
            addAddressStore: (addressState: State['addressState']) => {
                set({ addressState })
            }
        }),
        {
            name: 'addressForm-storage'
        }
    )
);