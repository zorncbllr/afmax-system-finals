import { axiosInstance } from "@/lib/api";
import { Inventory, InventoryForm, SuccessResponse } from "../types";

export const fetchInventoryData = async (): Promise<Inventory[]> => {
  return (await axiosInstance.get<Inventory[]>("/inventory")).data;
};

export const fetchInventoryById = async (
  inventoryId: number
): Promise<Inventory> => {
  return (await axiosInstance.get<Inventory>(`/inventory/${inventoryId}`)).data;
};

export const createInventory = async (
  inventoryData: InventoryForm
): Promise<SuccessResponse> => {
  return (
    await axiosInstance.post<SuccessResponse>("/inventory", inventoryData)
  ).data;
};

export const deleteInventory = async (
  inventoryId: number
): Promise<SuccessResponse> => {
  return (
    await axiosInstance.delete<SuccessResponse>(`/inventory/${inventoryId}`)
  ).data;
};

export const updateInventory = async ({
  inventoryId,
  inventory,
}: {
  inventoryId: number;
  inventory: InventoryForm;
}): Promise<SuccessResponse> => {
  return (
    await axiosInstance.patch<SuccessResponse>(
      `/inventory/${inventoryId}`,
      inventory
    )
  ).data;
};
