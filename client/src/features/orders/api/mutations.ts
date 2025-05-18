import { useMutation } from "@tanstack/react-query";
import { placeOrder } from "./services";
import { queryClient } from "@/main";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useTransactionStore } from "@/features/transactions/store";
import { useVerifySuccess } from "@/features/transactions/api/mutations";

export const usePlaceOrder = () => {
  const client = queryClient;
  const { setTransactionId } = useTransactionStore();
  const { mutate } = useVerifySuccess();

  return useMutation({
    mutationKey: ["orders"],
    mutationFn: async () => placeOrder(),

    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: ["orders"],
      });

      client.invalidateQueries({
        queryKey: ["cart-items"],
      });

      toast.success(data.message, {
        position: "top-right",
      });

      setTransactionId(data.transactionId);

      open(data.checkoutLink);

      setTimeout(() => {
        console.log(data.transactionId);
        mutate(data.transactionId);
      }, 30000);
    },

    onError: (error: AxiosError<{ message: string }>) => {
      const data = error.response?.data;

      if (data?.message) {
        toast.error(data.message);
      }
    },
  });
};
