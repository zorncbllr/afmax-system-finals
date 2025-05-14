import { create } from "zustand";

interface TransactionStore {
  transactionId?: string;

  setTransactionId: (transactionId: string) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactionId: undefined,

  setTransactionId: (transactionId) => set(() => ({ transactionId })),
}));
