/**
 * Store ui
 */

import { create } from 'zustand';

interface State {
    //* Status del menu
    isSideOpenMenu: boolean;

    //* funcioines para hacer acciones en el menu
    openSideMenu: () => void;
    closeSideMenu: () => void;
}


//* Declaracion del store zustand
export const useUiStore = create<State>()((set) => ({
    isSideOpenMenu: false,
    openSideMenu: () => set({ isSideOpenMenu: true }),
    closeSideMenu: () => set({ isSideOpenMenu: false })
}))