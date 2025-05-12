import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z
    .string()
    .min(5, "Email must be at least 5 characters")
    .max(255, "Email must be less than 255 characters")
    .email("Invalid email address")
    .transform((val) => val.trim().toLowerCase()),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters")
    .trim(),

  rememberMe: z.boolean(),
});

export type SignInFormData = z.infer<typeof SignInFormSchema>;

export const SignUpFormSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .regex(/^[a-zA-Z\s'-]+$/, "Invalid characters in name"),

    email: z
      .string()
      .email("Invalid email address")
      .min(5, "Email must be at least 5 characters")
      .transform((val) => val.trim().toLowerCase()),

    phoneNumber: z
      .string()
      .min(10, "Must be at least 10 digits")
      .regex(/^\+?[0-9\s-]+$/, "Invalid phone number format"),

    company: z
      .string()
      .max(50, "Company name must be less than 50 characters")
      .optional()
      .transform((val) => val?.trim()),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
        "Must contain at least one special character"
      ),

    passwordConfirmation: z
      .string()
      .min(8, "Confirmation must be at least 8 characters"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export type SignUpFormData = z.infer<typeof SignUpFormSchema>;

export interface SignUpError {
  email?: string;
  password?: string;
  fullName?: string;
  phoneNumber?: string;
  passwordConfirmation?: string;
}

export interface SignInError {
  email?: string;
  password?: string;
}

export interface SuccessSignInResponse {
  message: string;
  accessToken: string;
}
