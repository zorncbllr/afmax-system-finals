import { useQuery } from "@tanstack/react-query";
import { fetchInventoryById, fetchInventoryData } from "./services";

export const useFetchInventoryData = () =>
  useQuery({
    queryKey: ["inventory"],
    queryFn: fetchInventoryData,
  });

export const useFetchInventoryById = (inventoryId: number) =>
  useQuery({
    queryKey: ["inventory", "inventoryId"],
    queryFn: () => fetchInventoryById(inventoryId),
  });
