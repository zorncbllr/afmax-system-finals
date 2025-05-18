import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "./services";

export const useFetchTransactions = () =>
  useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
