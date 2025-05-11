import { axiosInstance } from "../../lib/api";
import { CategoryWithProducts } from "../categories/types";

export const getFeaturedCategories = async (): Promise<
  CategoryWithProducts[]
> => {
  return (await axiosInstance.get<CategoryWithProducts[]>("/featured")).data;
};

export const setIsFeatured = async (data: {
  productId: number;
  value: boolean;
}) => {
  return (await axiosInstance.post("/featured", data)).data;
};
