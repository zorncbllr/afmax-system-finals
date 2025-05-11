import { useQuery } from "@tanstack/react-query";
import { getFeaturedCategories } from "./services";

export const useFetchFeaturedCategories = () =>
  useQuery({
    queryKey: ["featured"],
    queryFn: getFeaturedCategories,
  });
