import { create } from "zustand";

interface AdminProductsStore {
  isOpen: boolean;
  imagePreviews: string[];

  setIsOpen: (value: boolean) => void;
}

export const useAdminProductsStore = create<AdminProductsStore>((set, get) => ({
  isOpen: false,

  imagePreviews: [],

  setIsOpen: (value) =>
    set(() => {
      get().imagePreviews.forEach((image) => {
        URL.revokeObjectURL(image);
      });

      return {
        isOpen: value,
        imagePreviews: [],
        categories: [],
        category: "",
      };
    }),
}));
