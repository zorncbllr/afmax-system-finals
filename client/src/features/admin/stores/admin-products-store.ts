import { create } from "zustand";

interface AdminProductsStore {
  isOpen: boolean;

  setIsOpen: (value: boolean) => void;
}

export const useAdminProductsStore = create<AdminProductsStore>((set) => ({
  isOpen: false,

  setIsOpen: (value) =>
    set(() => ({
      isOpen: value,
    })),
}));
