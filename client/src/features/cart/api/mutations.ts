import { useMutation } from "@tanstack/react-query";
import { CartItemProps } from "../types";
import { addToCart, removeToCart, updateCartItem } from "./services";
import { queryClient } from "@/main";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

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

    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response?.data.message) {
        toast.error(error.response?.data.message, {
          position: "top-right",
        });
      }
    },
  });
};

export const useUpdateCartItem = () => {
  const client = queryClient;

  return useMutation({
    mutationKey: ["cart-items"],
    mutationFn: async (data: CartItemProps) => updateCartItem(data),

    onSuccess: (_) => {
      client.invalidateQueries({
        queryKey: ["cart-items"],
      });
    },

    onError: (error: AxiosError<{ quantity: string }>) => {
      if (error.response?.data.quantity) {
        toast.error(error.response?.data.quantity, {
          position: "top-right",
        });
      }
    },
  });
};

export const useRemoveToCart = () => {
  const client = queryClient;

  return useMutation({
    mutationKey: ["cart-items"],
    mutationFn: async (cartItemId: number) => removeToCart({ cartItemId }),

    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: ["cart-items"],
      });

      toast.success(data.message, {
        position: "top-right",
      });
    },

    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response?.data.message) {
        toast.error(error.response?.data.message, {
          position: "top-right",
        });
      }
    },
  });
};
