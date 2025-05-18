import { useMutation } from "@tanstack/react-query";
import { handleSuccessTransaction } from "./services";
import { queryClient } from "@/main";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { TransactionResponse } from "../types";
import { error } from "console";

export const useVerifySuccess = () => {
  const client = queryClient;

  return useMutation({
    mutationKey: ["transactions", "success"],
    mutationFn: async (params: { transactionId: string; orderId: number }) =>
      handleSuccessTransaction(params),

    onSuccess: (data) => {
      console.log(data);
      client.invalidateQueries({
        queryKey: ["transactions"],
      });

      client.invalidateQueries({
        queryKey: ["orders"],
      });

      client.invalidateQueries({
        queryKey: ["cart-items"],
      });

      toast.success(data.message, {
        position: "top-right",
      });
    },

    onError: (error: AxiosError<TransactionResponse>) => {
      console.log(error);
      client.invalidateQueries({
        queryKey: ["transactions"],
      });

      client.invalidateQueries({
        queryKey: ["orders"],
      });

      client.invalidateQueries({
        queryKey: ["cart-items"],
      });

      toast.error(error.response!.data.message, {
        position: "top-right",
      });
    },
  });
};

export const useVerifyFailed = () => {
  const client = queryClient;

  return useMutation({
    mutationKey: ["transactions", "success"],
    mutationFn: async (params: { transactionId: string; orderId: number }) =>
      handleSuccessTransaction(params),

    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: ["transactions"],
      });

      client.invalidateQueries({
        queryKey: ["orders"],
      });

      client.invalidateQueries({
        queryKey: ["cart-items"],
      });

      toast.success(data.message, {
        position: "top-right",
      });
    },

    onError: (error: AxiosError<TransactionResponse>) => {
      client.invalidateQueries({
        queryKey: ["transactions"],
      });

      client.invalidateQueries({
        queryKey: ["orders"],
      });

      client.invalidateQueries({
        queryKey: ["cart-items"],
      });

      toast.error(error.response!.data.message, {
        position: "top-right",
      });
    },
  });
};
