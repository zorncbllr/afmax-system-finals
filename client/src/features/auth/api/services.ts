import { axiosInstance } from "@/lib/api";
import {
  SignInFormData,
  SignUpFormData,
  SuccessSignInResponse,
} from "../types";
import { SuccessResponse } from "@/features/inventory/types";

export const attemptSignIn = async (
  data: SignInFormData
): Promise<SuccessSignInResponse> => {
  return (
    await axiosInstance.post<SuccessSignInResponse>("/auth/sign-in", data)
  ).data;
};

export const signUp = async (
  data: SignUpFormData
): Promise<SuccessResponse> => {
  return (await axiosInstance.post<SuccessResponse>("/auth/sign-up", data))
    .data;
};

export const refreshToken = async (): Promise<SuccessSignInResponse> => {
  return (await axiosInstance.post<SuccessSignInResponse>("/auth/refresh"))
    .data;
};

export const signOff = async (): Promise<SuccessResponse> => {
  return (await axiosInstance.post<SuccessResponse>("/auth/sign-off")).data;
};
