import { create } from "zustand";

interface AdminProductsStore {
  isOpen: boolean;
  category: string;
  categories: string[];
  imagePreviews: string[];

  setIsOpen: (value: boolean) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addCategory: () => void;
  removeCategory: (index: number) => void;
}

export const useAdminProductsStore = create<AdminProductsStore>((set, get) => ({
  isOpen: false,

  category: "",
  categories: [],
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

  handleCategoryChange: (event) =>
    set(() => ({ category: event.target.value })),

  addCategory: () =>
    set((state) => ({
      categories: [...state.categories, state.category],
      category: "",
    })),

  removeCategory: (index) =>
    set(() => {
      const categories = get().categories;
      categories.splice(index, 1);

      return { categories };
    }),
}));
