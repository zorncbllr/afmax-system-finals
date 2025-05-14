import { useMutation } from "@tanstack/react-query";
import { placeOrder } from "./services";
import { queryClient } from "@/main";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const usePlaceOrder = () => {
  const client = queryClient;

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

      console.log(data.checkOutLink);
      open(data.checkOutLink, "__self");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      const data = error.response?.data;

      if (data?.message) {
        toast.error(data.message);
      }
    },
  });
};
