import { createProduct } from "@/features/products/product-service";
import { create } from "zustand";

interface AdminProductsStore {
  isOpen: boolean;
  category: string;
  categories: string[];

  setIsOpen: (value: boolean) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSumbit: (event: React.FormEvent<HTMLFormElement>) => void;
  addCategory: () => void;
  removeCategory: (index: number) => void;
}

export const useAdminProductsStore = create<AdminProductsStore>((set, get) => ({
  isOpen: false,

  category: "",
  categories: [],

  setIsOpen: (value) =>
    set(() => ({
      isOpen: value,
    })),

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

  handleSumbit: async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    get().categories.forEach((category) => {
      formData.append("categories[]", category);
    });

    console.log(formData.getAll("images[]"));

    const data = await createProduct(formData);
    console.log(data);
  },
}));
