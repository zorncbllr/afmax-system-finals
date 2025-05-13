import GoogleIcon from "@/components/icons/GoogleIcon";
import XTwitterIcon from "@/components/icons/XTwitterIcon";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { ReactNode } from "react";
import { Link, useNavigate } from "react-router";
import GraphicSection from "../features/auth/components/graphic-section";

interface AuthLayoutProps {
  children: ReactNode;
  isSignIn: boolean;
}

const AuthLayout = ({ children, isSignIn }: AuthLayoutProps) => {
  const navigate = useNavigate();
  return (
    <div className="relative z-1 bg-white">
      <div className="relative flex h-screen w-full flex-col justify-center sm:p-0 lg:flex-row">
        {/* Form Section */}
        <div className="flex w-full flex-1 flex-col lg:w-1/2">
          <div className="mx-auto flex w-1/2 max-w-lg flex-1 flex-col justify-start">
            <Button
              onClick={() => navigate("/")}
              className="w-fit mt-4 text-gray-500"
              variant={"ghost"}
            >
              <ChevronLeftIcon />
              Back to dashboard
            </Button>

            <div className="flex justify-center flex-col h-full">
              <div className="mb-5 sm:mb-8">
                <h1 className="text-title-sm sm:text-title-md mb-2 font-semibold text-gray-800">
                  {isSignIn ? "Sign In" : "Sign Up"}
                </h1>
                <p className="text-sm text-gray-500">
                  {isSignIn
                    ? "Enter your email and password to sign in!"
                    : "Please fill all required fields to continue."}
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

              {children}

              <div className="mt-5">
                <p className="text-center text-sm font-normal text-gray-700 sm:text-start">
                  {isSignIn
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <Link
                    to={isSignIn ? "/auth/sign-up" : "/auth/sign-in"}
                    className="text-brand-500 hover:text-brand-600 ml-1"
                  >
                    {isSignIn ? "Sign Up" : "Sign In"}
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

export default AuthLayout;
