import { axiosInstance } from "@/lib/api";
import { Cart } from "../types";

export const getAllCartItems = async (): Promise<Cart> => {
  return (await axiosInstance.get<Cart>("/user/cart")).data;
};
