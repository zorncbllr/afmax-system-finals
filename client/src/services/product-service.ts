import { axiosInstance } from "../lib/api";
import { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  return (await axiosInstance.get<Product[]>("/products")).data;
};

export const getProductById = async (productId: number): Promise<Product> => {
  return (await axiosInstance.get<Product>(`/products/${productId}`)).data;
};
