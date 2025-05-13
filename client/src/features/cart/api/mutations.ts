import { useMutation } from "@tanstack/react-query";
import { CartItemProps } from "../types";
import { addToCart } from "./services";
import { queryClient } from "@/main";
import toast from "react-hot-toast";

export const useAddToCart = () => {
  const client = queryClient;

  return useMutation({
    mutationKey: ["cart-items"],
    mutationFn: async (data: CartItemProps) => addToCart(data),

    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: ["cart-items"],
      });

      toast.success(data.message, {
        position: "top-right",
      });
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};
