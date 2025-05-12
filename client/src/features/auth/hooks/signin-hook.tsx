import { useState } from "react";
import { useAttemptSignIn } from "../api/mutations";
import { SignInError, SignInFormData, SignInFormSchema } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useSignInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mutate, isError, error } = useAttemptSignIn();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  if (isError) {
    const err = error.response?.data as SignInError;

    if (err.email) {
      form.setError("email", {
        message: err.email,
      });
    }

    if (err.password) {
      form.setError("password", {
        message: err.password,
      });
    }
  }

  const submitHandler = (value: SignInFormData) => mutate(value);

  return {
    form,
    showPassword,
    setShowPassword,
    submitHandler,
  };
};
