import { useQuery } from "@tanstack/react-query";
import { fetchInventoryData } from "./services";

export const useFetchInventoryData = () =>
  useQuery({
    queryKey: ["inventory"],
    queryFn: fetchInventoryData,
  });
