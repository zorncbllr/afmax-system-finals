import { useQuery } from "@tanstack/react-query";
import { getAllCartItems } from "./services";

export const useFetchCartItems = () =>
  useQuery({
    queryKey: ["cart-items"],
    queryFn: getAllCartItems,
  });
