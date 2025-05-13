import { useMutation } from "@tanstack/react-query";
import { attemptSignIn, refreshToken, signOff, signUp } from "./services";
import { SignInFormData, SignUpFormData } from "../types";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useAuthStore } from "../store";

export const useAttemptSignIn = () => {
  const navigate = useNavigate();
  const { setAuthenticated, setRole, setToken } = useAuthStore();

  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (data: SignInFormData) => attemptSignIn(data),

    onSuccess: (data) => {
      setAuthenticated(true);
      setRole(data.role);
      setToken(data.accessToken);

      toast.success(data.message, {
        position: "top-right",
      });

      navigate(data.role === "Admin" ? "/admin/dashboard" : "/products");
    },

    onError: (error: AxiosError) => {
      console.log(error);
    },
  });
};

export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (data: SignUpFormData) => signUp(data),

    onSuccess: (data) => {
      toast.success(data.message, {
        position: "top-right",
      });

      navigate("/auth/sign-in");
    },

    onError: (error: AxiosError) => {
      console.log(error);
    },
  });
};

export const useRefreshToken = () => {
  const { setAuthenticated, setRole, setToken } = useAuthStore();

  return useMutation({
    mutationKey: ["auth-token"],
    mutationFn: async () => refreshToken(),

    onSuccess: (data) => {
      setToken(data.accessToken);
      setAuthenticated(true);
      setRole(data.role);
    },
  });
};

export const useSignOff = () => {
  const { setAuthenticated, setRole, setToken } = useAuthStore();

  return useMutation({
    mutationKey: ["auth-token"],
    mutationFn: async () => signOff(),

    onSuccess: (data) => {
      setToken(null);
      setAuthenticated(false);
      setRole(undefined);

      toast.success(data.message, {
        position: "top-right",
      });
    },
  });
};
