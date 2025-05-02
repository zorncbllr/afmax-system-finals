import React from "react";
import { Link } from "react-router";
import Logo from "@/assets/logo.svg";

const HomeNavbar: React.FC = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 items-center">
          <Link to="/" className="mb-4 flex gap-4 items-center">
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
          <Link
            to="/supplies"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Supplies
          </Link>
          <Link
            to="/marketplace"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Services
          </Link>
          <Link to="/contact" className="text-sm/6 font-semibold text-gray-900">
            Contact
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="/auth/login"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HomeNavbar;
