import { create } from "zustand";

interface ProductFormStore {
  isOpen: boolean;

  setIsOpen: (value: boolean) => void;
}

export const useProductFormStore = create<ProductFormStore>((set) => ({
  isOpen: false,

  setIsOpen: (value) => set(() => ({ isOpen: value })),
}));
