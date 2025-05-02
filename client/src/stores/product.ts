// stores/product.ts
import { create } from "zustand";

interface Product {
  productId: number;
  productName: string;
  brand: string;
  price: number;
  imagePath: string;
}

interface ProductStore {
  products: Product[];
  loadProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loadProducts: async () => {
    const response = await fetch("http://localhost:8000/api/v1/products");
    const data = await response.json();

    set({ products: data });
  },
}));
