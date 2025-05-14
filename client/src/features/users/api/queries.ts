import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./services";

export const useFetchUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
