import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getProductById, getProducts } from "./product-service";
import { Product, ProductDTO, ProductFormSchema } from "./types";
import { z } from "zod";

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

export const useCreateProduct = () =>
  useMutation({
    mutationKey: ["products"],
    mutationFn: (data: FormData) => createProduct(data),

    onSettled: (data, err) => {
      console.log(data);
    },
  });
