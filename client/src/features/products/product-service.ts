import { axiosInstance } from "../../lib/api";
import { Product, ProductDTO } from "./types";

export const getProducts = async (): Promise<ProductDTO[]> => {
  return (await axiosInstance.get<ProductDTO[]>("/products")).data;
};

export const getProductById = async (productId: number): Promise<Product> => {
  return (await axiosInstance.get<Product>(`/products/${productId}`)).data;
};

export const createProduct = async (data: FormData) => {
  return (
    await axiosInstance.post("/products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
};
