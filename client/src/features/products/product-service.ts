import { axiosInstance } from "../../lib/api";
import { Product, ProductDTO } from "./types";

interface SuccessResponse {
  message: string;
  description: string;
}

export const getProducts = async (): Promise<ProductDTO[]> => {
  return (await axiosInstance.get<ProductDTO[]>("/products")).data;
};

export const getProductById = async (productId: number): Promise<Product> => {
  return (await axiosInstance.get<Product>(`/products/${productId}`)).data;
};

export const createProduct = async (
  data: FormData
): Promise<SuccessResponse> => {
  return (
    await axiosInstance.post("/products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
};

export const deleteProduct = async (
  productId: number
): Promise<SuccessResponse> => {
  return (await axiosInstance.delete(`/products/${productId}`)).data;
};
