import SideBar from "@/features/sidebar/sidebar";
import React, { useLayoutEffect } from "react";
import { LayoutRouteProps } from "react-router";

import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import { SideBarProps } from "@/features/sidebar/types";
import { useSidebar } from "@/features/sidebar/store";
import Header from "@/components/header";
import AppBreadcrumb from "@/features/breadcrumbs/app-breadcrumb";
import { useAuthStore } from "@/features/auth/store";

const authenticatedSidebarProps: SideBarProps = {
  heading: "AFMAX",
  headingHref: "/",
  sections: [
    {
      section: "Menu",
      items: [
        {
          title: "Cart Items",
          icon: ShoppingCartIcon,
          href: "/user/cart",
          children: [],
        },
        {
          title: "Products",
          icon: ShoppingBagIcon,
          href: "/products",
          children: [],
        },
      ],
    },
  ],
};

const sidebarProps: SideBarProps = {
  heading: "AFMAX",
  headingHref: "/",
  sections: [
    {
      section: "Menu",
      items: [
        {
          title: "Products",
          icon: ShoppingBagIcon,
          href: "/products",
          children: [],
        },
      ],
    },
  ],
};

const UserLayout: React.FC<LayoutRouteProps> = ({ children }) => {
  const { setSidebarProps } = useSidebar();
  const { isAuthenticated, user } = useAuthStore();

  useLayoutEffect(() => {
    if (!isAuthenticated || user?.role != "User") {
      setSidebarProps(sidebarProps);
    } else {
      setSidebarProps(authenticatedSidebarProps);
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <SideBar />

      <div className="flex flex-col w-full">
        <Header />

        <main className="p-4 w-full h-full max-h-[53rem] grid bg-gray-50">
          <div className="p-4 border rounded-lg text-gray-700 bg-white flex flex-col gap-4 overflow-y-scroll">
            <AppBreadcrumb />

            <div>{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
