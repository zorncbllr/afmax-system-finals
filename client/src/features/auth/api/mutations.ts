import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { attemptSignIn, signUp } from "./services";
import { SignInFormData, SignUpFormData } from "../types";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Axios, AxiosError } from "axios";

export const useAttemptSignIn = () => {
  const client = queryClient;
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (data: SignInFormData) => attemptSignIn(data),

    onSuccess: (data) => {
      toast(data.message, {
        position: "top-right",
      });

      navigate("/products");
    },

    onError: (error: AxiosError) => {
      console.log(error);
    },
  });
};

export const useSignUp = () => {
  const client = queryClient;
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (data: SignUpFormData) => signUp(data),

    onSuccess: (data) => {
      toast(data.message, {
        position: "top-right",
      });

      navigate("/auth/sign-in");
    },

    onError: (error: AxiosError) => {
      console.log(error);
    },
  });
};
