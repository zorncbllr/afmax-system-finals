import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryById } from "./category-service";

export const useFetchCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

export const useFetchCategoryById = (categoryId: number) =>
  useQuery({
    queryKey: ["category"],
    queryFn: () => getCategoryById(categoryId),
  });
