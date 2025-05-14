import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "./services";

export const useFetchOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
