import { axiosInstance } from "../../lib/api";
import { CategoryWithProducts } from "../categories/types";

export const getFeaturedCategories = async (): Promise<
  CategoryWithProducts[]
> => {
  return (
    await axiosInstance.get<CategoryWithProducts[]>("/featured/categories")
  ).data;
};
