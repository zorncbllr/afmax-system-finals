import { useForm } from "react-hook-form";
import { SignUpError, SignUpFormData, SignUpFormSchema } from "../types";
import { useSignUp } from "../api/mutations";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const useSignUpForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate, error, isError } = useSignUp();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      phoneNumber: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  if (isError) {
    const err = error.response?.data as SignUpError;

    if (err.email) {
      form.setError("email", {
        message: err.email,
      });
    }
    if (err.fullName) {
      form.setError("fullName", {
        message: err.fullName,
      });
    }
    if (err.phoneNumber) {
      form.setError("phoneNumber", {
        message: err.phoneNumber,
      });
    }
    if (err.password) {
      form.setError("password", {
        message: err.password,
      });
    }
    if (err.passwordConfirmation) {
      form.setError("passwordConfirmation", {
        message: err.passwordConfirmation,
      });
    }
  }

  const submitHandler = (value: SignUpFormData) => mutate(value);

  return {
    form,
    submitHandler,
    showPassword,
    setShowPassword,
  };
};
