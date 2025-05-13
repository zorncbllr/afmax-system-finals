import { useMutation } from "@tanstack/react-query";
import { attemptSignIn, refreshToken, signOff, signUp } from "./services";
import { SignInFormData, SignUpFormData } from "../types";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useAuthStore } from "../store";

export const useAttemptSignIn = () => {
  const navigate = useNavigate();
  const { setAuthenticated, setUser, setToken } = useAuthStore();

  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (data: SignInFormData) => attemptSignIn(data),

    onSuccess: (data) => {
      setAuthenticated(true);
      setUser(data.user);
      setToken(data.accessToken);

      toast.success(data.message, {
        position: "top-right",
      });

      navigate(data.user?.role === "Admin" ? "/admin/dashboard" : "/products");
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
  const { setAuthenticated, setUser, setToken } = useAuthStore();

  return useMutation({
    mutationKey: ["auth-token"],
    mutationFn: async () => refreshToken(),

    onSuccess: (data) => {
      setToken(data.accessToken);
      setAuthenticated(true);
      setUser(data.user);
    },
  });
};

export const useSignOff = () => {
  const { setAuthenticated, setUser, setToken } = useAuthStore();

  return useMutation({
    mutationKey: ["auth-token"],
    mutationFn: async () => signOff(),

    onSuccess: (data) => {
      setToken(null);
      setAuthenticated(false);
      setUser(undefined);

      toast.success(data.message, {
        position: "top-right",
      });
    },
  });
};
