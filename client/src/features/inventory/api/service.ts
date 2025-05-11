import { axiosInstance } from "@/lib/api";
import { Inventory } from "../types";

export const fetchInventoryData = async (): Promise<Inventory[]> => {
  return (await axiosInstance.get<Inventory[]>("/inventory")).data;
};
