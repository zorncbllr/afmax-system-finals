import { create } from "zustand";
import { CategoryWithProducts } from "../categories/types";

interface FeaturedStore {
  categories: CategoryWithProducts[];
  activeCategory: CategoryWithProducts | null;

  initCategories: (categories: CategoryWithProducts[] | undefined) => void;
  setActiveCategory: (index: number) => void;
}

export const useFeaturedStore = create<FeaturedStore>((set) => ({
  categories: [],
  activeCategory: null,

  initCategories: (categories: CategoryWithProducts[] | undefined) =>
    set(() => ({ categories: categories })),

  setActiveCategory: (index: number) =>
    set((state) => ({
      activeCategory: state.categories[index],
    })),
}));
