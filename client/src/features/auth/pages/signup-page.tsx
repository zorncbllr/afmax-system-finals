import AuthLayout from "@/layouts/auth-layout";
import { useForm } from "react-hook-form";
import { SignUpFormData, SignUpFormSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignUp } from "../api/mutations";

const SignUpPage = () => {
  const { mutate } = useSignUp();

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

  const submitHandler = (value: SignUpFormData) => mutate(value);

  return (
    <AuthLayout isSignIn={false}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="grid gap-6"
        >
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>
                  Full Name<span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email & Phone Number Row */}
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid w-full gap-2">
                  <FormLabel>
                    Email<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john.doe@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="grid gap-2 w-4/6">
                  <FormLabel>
                    Phone Number<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+63 555-555-5555"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Company */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc. (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>
                  Password<span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="•••••••• (min 8 characters)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>
                  Confirm Password<span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="•••••••• (re-enter)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-4">
            Sign Up
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default SignUpPage;
