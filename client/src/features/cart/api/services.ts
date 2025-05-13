import { axiosInstance } from "@/lib/api";
import { Cart, CartItemProps } from "../types";
import { SuccessResponse } from "@/features/inventory/types";

export const getAllCartItems = async (): Promise<Cart> => {
  return (await axiosInstance.get<Cart>("/user/cart")).data;
};

export const addToCart = async (
  data: CartItemProps
): Promise<SuccessResponse> => {
  return (await axiosInstance.post<SuccessResponse>("/user/cart", data)).data;
};

export const removeToCart = async ({
  cartItemId,
}: {
  cartItemId: number;
}): Promise<SuccessResponse> => {
  return (
    await axiosInstance.delete<SuccessResponse>(`/user/cart/${cartItemId}`)
  ).data;
};
