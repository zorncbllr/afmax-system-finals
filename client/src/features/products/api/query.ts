import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./service";
import { Product, ProductDTO, ProductUpdateProps } from "../types";
import { queryClient } from "@/main";
import toast from "react-hot-toast";
import { useProductFormStore } from "../store";

export const useFetchProducts = () =>
  useQuery<ProductDTO[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

export const useFetchProductById = (productId: number) =>
  useQuery<Product>({
    queryKey: ["product"],
    queryFn: () => getProductById(productId),
  });

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

    onError: (error) => {
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

      toast.success(data.message, {
        position: "top-right",
      });
    },

    onError: (error) => {
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

    onError: (error) => {
      toast.error("Product update failed.", { position: "top-right" });
    },
  });
};
