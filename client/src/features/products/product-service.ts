import { axiosInstance } from "../../lib/api";
import { Product, ProductDTO } from "./types";

export const getProducts = async (): Promise<ProductDTO[]> => {
  return (await axiosInstance.get<ProductDTO[]>("/products")).data;
};

export const getProductById = async (productId: number): Promise<Product> => {
  return (await axiosInstance.get<Product>(`/products/${productId}`)).data;
};
