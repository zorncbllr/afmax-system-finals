import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Logo from "@/assets/logo.svg";
import { useAuthStore } from "@/features/auth/store";
import { Button } from "@/components/ui/button";
import { useSignOff } from "@/features/auth/api/mutations";
import { ChevronRightIcon } from "lucide-react";

const HomeNavbar: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { mutate: signOff } = useSignOff();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-primary-foreground/20 border-b border-primary-foreground/10"
          : "backdrop-blur-none bg-transparent border-b-transparent"
      }`}
    >
      <nav
        className="flex items-center justify-between lg:justify-around py-4 px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex items-center">
          <Link to="/" className="flex gap-4 items-center">
            <img width="35" src={Logo} alt="Logo" />

            <h1 className="text-2xl font-semibold tracking-tight text-balance text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              <span>AFMAX</span>
            </h1>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/products"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Products
          </Link>
          <Link to="#about" className="text-sm/6 font-semibold text-gray-900">
            About
          </Link>
          <Link
            to="#testimonials"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Testimonials
          </Link>
          <Link to="#contact" className="text-sm/6 font-semibold text-gray-900">
            Contact
          </Link>
          {user?.role == "Admin" && (
            <Link
              to="/admin/dashboard"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Admin
            </Link>
          )}
        </div>

        {isAuthenticated ? (
          <Button
            className="font-semibold hidden lg:flex items-center"
            onClick={() => signOff()}
            variant={"ghost"}
          >
            Sign out <ChevronRightIcon />
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/auth/sign-in")}
            className="font-semibold hidden lg:flex items-center"
            variant={"ghost"}
          >
            Sign in <ChevronRightIcon />
          </Button>
        )}
      </nav>
    </header>
  );
};

export default HomeNavbar;
