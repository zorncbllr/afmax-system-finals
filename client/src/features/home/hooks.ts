import { useQuery } from "@tanstack/react-query";
import { getFeaturedCategories } from "./service";

export const useFetchFeaturedCategories = () =>
  useQuery({
    queryKey: ["featured-category"],
    queryFn: getFeaturedCategories,
  });
