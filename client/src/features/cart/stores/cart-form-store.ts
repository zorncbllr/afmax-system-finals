import { create } from "zustand";

interface CartFormStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useCartFormStore = create<CartFormStore>((set) => ({
  isOpen: false,

  setIsOpen: (isOpen) => set(() => ({ isOpen })),
}));
