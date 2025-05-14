import { axiosInstance } from "@/lib/api";
import { User } from "../types";

export const getAllUsers = async (): Promise<User[]> => {
  return (await axiosInstance.get<User[]>("/users")).data;
};
