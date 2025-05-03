import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product-service";
import { Product } from "../types/product";

export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
