import { useMutation } from "@tanstack/react-query";
import { useProductFormStore } from "../store";
import { createProduct, deleteProduct, updateProduct } from "./services";
import { queryClient } from "@/main";
import toast from "react-hot-toast";
import { ProductUpdateProps } from "../types";
import { AxiosError } from "axios";

export const useCreateProduct = () => {
  const client = queryClient;
  const { setIsOpen } = useProductFormStore();

  return useMutation({
    mutationKey: ["products"],
    mutationFn: async (data: FormData) => createProduct(data),

    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: ["products"],
      });

      client.invalidateQueries({
        queryKey: ["inventory"],
      });

      setIsOpen(false);

      toast.success(data.message, {
        position: "top-right",
      });
    },

    onError: (error: AxiosError) => {
      toast.error("Product creation failed.", {
        position: "top-right",
      });
    },
  });
};

export const useDeleteProduct = () => {
  const client = queryClient;

  return useMutation({
    mutationKey: ["products"],
    mutationFn: async (productId: number) => deleteProduct(productId),

    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: ["products"],
      });

      client.invalidateQueries({
        queryKey: ["featured"],
      });

      toast.success(data.message, {
        position: "top-right",
      });
    },

    onError: (_) => {
      toast.error("Unable to delete product.", { position: "top-right" });
    },
  });
};

export const useUpdateProduct = () => {
  const client = queryClient;

  return useMutation({
    mutationKey: ["product"],
    mutationFn: async (productProps: ProductUpdateProps) =>
      updateProduct(productProps),

    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: ["product"],
      });

      toast.success(data.message, {
        position: "top-right",
      });
    },

    onError: (_) => {
      toast.error("Product update failed.", { position: "top-right" });
    },
  });
};
