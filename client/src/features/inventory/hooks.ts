import { useQuery } from "@tanstack/react-query";
import { fetchInventoryData } from "./service";

export const useFetchInventoryData = () =>
  useQuery({
    queryKey: ["inventory"],
    queryFn: fetchInventoryData,
  });
