import { create } from "zustand";

interface InventoryStore {
  isCreationFormOpen: boolean;
  isEditFormOpen: boolean;
  inventoryId: number;

  setIsCreationFormOpen: (value: boolean) => void;
  setIsEditFormOpen: (value: boolean) => void;
  setInventoryId: (inventoryId: number) => void;
}

export const useInventoryStore = create<InventoryStore>((set) => ({
  isCreationFormOpen: false,
  isEditFormOpen: false,

  inventoryId: -1,

  setIsCreationFormOpen: (value) => set(() => ({ isCreationFormOpen: value })),
  setIsEditFormOpen: (value) => set(() => ({ isEditFormOpen: value })),
  setInventoryId: (inventoryId) => set(() => ({ inventoryId })),
}));
