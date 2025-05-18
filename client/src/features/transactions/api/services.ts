import { axiosInstance } from "@/lib/api";
import { TransactionResponse } from "../types";

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
