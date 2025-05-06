import { createProduct } from "@/features/products/product-service";
import { create } from "zustand";

interface AdminProductsStore {
  isOpen: boolean;
  category: string;
  categories: string[];
  imagePreviews: string[];

  setIsOpen: (value: boolean) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSumbit: (event: React.FormEvent<HTMLFormElement>) => void;
  addCategory: () => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

  handleImageChange: (event) =>
    set(() => {
      get().imagePreviews.forEach((image) => {
        URL.revokeObjectURL(image);
      });

      const files = event.target.files as FileList;
      const images = [];

      for (const file of files) {
        images.push(URL.createObjectURL(file));
      }

      return { imagePreviews: images };
    }),

  handleSumbit: async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    get().categories.forEach((category) => {
      formData.append("categories[]", category);
    });

    console.log(formData.getAll("images[]"));

    get().imagePreviews.forEach((image) => {
      URL.revokeObjectURL(image);
    });

    const data = await createProduct(formData);
    console.log(data);
  },
}));
