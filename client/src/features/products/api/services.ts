import { axiosInstance } from "../../../lib/api";
import { ProductDetails, ProductDTO, ProductTableDTO } from "../types";

interface SuccessResponse {
  message: string;
  description: string;
}

export const getProducts = async (): Promise<ProductDTO[]> => {
  return (await axiosInstance.get<ProductDTO[]>("/products")).data;
};

export const getAdminProducts = async (): Promise<ProductTableDTO[]> => {
  return (await axiosInstance.get<ProductTableDTO[]>("/admin/products")).data;
};

export const getProductById = async (
  productId: number
): Promise<ProductDetails> => {
  return (await axiosInstance.get<ProductDetails>(`/products/${productId}`))
    .data;
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

export const updateProduct = async ({
  productId,
  product,
}: {
  productId: number;
  product: FormData;
}): Promise<SuccessResponse> => {
  return (
    await axiosInstance.post<SuccessResponse>(
      `/products/update/${productId}`,
      product,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
  ).data;
};
