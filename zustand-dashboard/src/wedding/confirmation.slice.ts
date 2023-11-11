import { StateCreator } from "zustand";


export interface ConfirmationSlice {

    isConfirm: boolean;

    setIsConfirmed: (value: boolean) => void;

}

export const createConfirmationSlice: StateCreator<ConfirmationSlice> = (set) => ({
    isConfirm: false,
    setIsConfirmed: ( value: boolean) => set({isConfirm: value})
})