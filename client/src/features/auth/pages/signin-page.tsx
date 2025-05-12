import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "../../../layouts/auth-layout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInFormData, SignInFormSchema } from "../types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useAttemptSignIn } from "../api/mutations";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mutate } = useAttemptSignIn();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const submitHandler = (value: SignInFormData) => mutate(value);

  return (
    <AuthLayout isSignIn={true}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <div className="space-y-6">
            {/* Email Input */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>
                    Email<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="info@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Input */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>
                    Password<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">
                          Toggle password visibility
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between">
              {/* Remember Me Checkbox */}
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!m-0 cursor-pointer">
                      Keep me logged in
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Forgot Password Link */}
              <Link
                to="/reset-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default SignInPage;
