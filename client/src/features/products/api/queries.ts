import { useQuery } from "@tanstack/react-query";
import { getAdminProducts, getProductById, getProducts } from "./services";
import { ProductDetails, ProductDTO } from "../types";

export const useFetchProducts = () =>
  useQuery<ProductDTO[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

export const useFetchAdminProducts = () =>
  useQuery({
    queryKey: ["products", "admin"],
    queryFn: getAdminProducts,
  });

export const useFetchProductById = (productId: number) =>
  useQuery<ProductDetails>({
    queryKey: ["product"],
    queryFn: () => getProductById(productId),
  });
