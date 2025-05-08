import { axiosInstance } from "../../lib/api";
import { Category, CategoryWithProducts } from "./types";

export const getCategories = async (): Promise<Category[]> => {
  return (await axiosInstance.get<Category[]>("/categories")).data;
};

export const getCategoryById = async (
  categoryId: number
): Promise<CategoryWithProducts> => {
  return (
    await axiosInstance.get<CategoryWithProducts>(`/categories/${categoryId}`)
  ).data;
};
