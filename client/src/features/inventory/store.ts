import { create } from "zustand";

interface InventoryStore {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const useInventoryStore = create<InventoryStore>((set) => ({
  isOpen: false,

  setIsOpen: (value) => set(() => ({ isOpen: value })),
}));
