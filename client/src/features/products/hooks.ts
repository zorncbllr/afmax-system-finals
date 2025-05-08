import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "./service";
import { Product, ProductDTO } from "./types";
import { queryClient } from "@/main";
import { useAdminProductsStore } from "../admin/stores/admin-products-store";
import toast from "react-hot-toast";

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
  const { setIsOpen } = useAdminProductsStore();

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
  });
};
