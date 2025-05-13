import { create } from "zustand";

interface CartDrawerStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useCartDrawer = create<CartDrawerStore>((set) => ({
  isOpen: false,

  setIsOpen: (isOpen) => set(() => ({ isOpen })),
}));
