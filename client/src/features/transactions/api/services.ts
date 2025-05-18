import { axiosInstance } from "@/lib/api";
import { Transaction, TransactionResponse } from "../types";

export const getTransactions = async (): Promise<Transaction[]> => {
  return (await axiosInstance.get<Transaction[]>("/transactions")).data;
};

export const handleSuccessTransaction = async (data: {
  transactionId: string;
  orderId: number;
}): Promise<TransactionResponse> => {
  return (await axiosInstance.post("/transactions/success", data)).data;
};

export const handleFailedTransaction = async (data: {
  transactionId: string;
  orderId: number;
}): Promise<TransactionResponse> => {
  return (await axiosInstance.post("/transactions/failed", data)).data;
};
