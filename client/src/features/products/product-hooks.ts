import { useQuery } from "@tanstack/react-query";
import { getProductById, getProducts } from "./product-service";
import { Product, ProductDTO } from "./types";

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
