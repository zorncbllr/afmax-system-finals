import { useState } from "react";
import { Link } from "react-router";
import logo from "@/assets/logo.svg";
import GridPattern from "@/components/grid-pattern";
import TopGradient from "@/components/top-gradient";
import BottomGradient from "@/components/bottom-gradient";
import GoogleIcon from "@/components/icons/GoogleIcon";
import XTwitterIcon from "@/components/icons/XTwitterIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import GraphicSection from "../components/graphic-section";
import { Separator } from "@/components/ui/separator";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="relative z-1 bg-white">
      <div className="relative flex h-screen w-full flex-col justify-center sm:p-0 lg:flex-row">
        {/* Form Section */}
        <div className="flex w-full flex-1 flex-col lg:w-1/2">
          <div className="mx-auto w-full max-w-1/2 pt-10">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700"
            >
              <ChevronLeftIcon />
              Back to dashboard
            </Link>
          </div>

          <div className="mx-auto flex w-1/2 max-w-lg flex-1 flex-col justify-center">
            <div>
              <div className="mb-5 sm:mb-8">
                <h1 className="text-title-sm sm:text-title-md mb-2 font-semibold text-gray-800">
                  Sign In
                </h1>
                <p className="text-sm text-gray-500">
                  Enter your email and password to sign in!
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
                {/* Social Login Buttons */}

                <Button variant={"secondary"}>
                  <GoogleIcon />
                  Sign in with Google
                </Button>

                <Button variant={"secondary"}>
                  <XTwitterIcon />
                  Sign in with X
                </Button>
              </div>

              <div className="relative py-3 sm:py-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white p-2 text-gray-400 sm:px-5 sm:py-2">
                    Or
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Email Input */}
                  <div className="grid gap-2">
                    <Label>
                      Email<span className="text-red-600">*</span>
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="info@gmail.com"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="grid gap-2">
                    <Label>
                      Password<span className="text-red-600">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                      />
                      <span
                        className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {/* Password Visibility Toggle SVG */}
                      </span>
                    </div>
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center justify-between">
                    <Label>
                      <Checkbox />
                      Keep me logged in
                    </Label>
                    <Link to="/reset-password">
                      <Label>Forgot password?</Label>
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </div>
              </form>

              <div className="mt-5">
                <p className="text-center text-sm font-normal text-gray-700 sm:text-start">
                  Don't have an account?
                  <Link
                    to="/signup"
                    className="text-brand-500 hover:text-brand-600 ml-1"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Graphic Section */}
        <GraphicSection />
      </div>
    </div>
  );
};

export default LoginPage;
