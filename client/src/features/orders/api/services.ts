import { axiosInstance } from "@/lib/api";
import { Order, PlaceOrderResponse } from "../types";

export const placeOrder = async (): Promise<PlaceOrderResponse> => {
  return (await axiosInstance.post<PlaceOrderResponse>("/orders")).data;
};

export const getAllOrders = async (): Promise<Order[]> => {
  return (await axiosInstance.get<Order[]>("/orders")).data;
};
