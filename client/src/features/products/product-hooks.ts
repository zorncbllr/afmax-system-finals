import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "./product-service";
import { Product, ProductDTO } from "./types";
import { queryClient } from "@/main";
import { useAdminProductsStore } from "../admin/stores/admin-products-store";

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

    onSettled: (data, err) => {
      console.log(err);
      console.log(data);

      setIsOpen(false);

      client.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useDeleteProduct = () => {
  const client = queryClient;

  return useMutation({
    mutationKey: ["products"],
    mutationFn: async (productId: number) => deleteProduct(productId),

    onSettled: (data, err) => {
      console.log(data);
      console.log(err);

      client.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
