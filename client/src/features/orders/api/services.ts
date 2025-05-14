import { SuccessResponse } from "@/features/inventory/types";
import { axiosInstance } from "@/lib/api";
import { Order } from "../types";

export const placeOrder = async (): Promise<SuccessResponse> => {
  return (await axiosInstance.post<SuccessResponse>("/orders")).data;
};

export const getAllOrders = async (): Promise<Order[]> => {
  return (await axiosInstance.get<Order[]>("/orders")).data;
};
