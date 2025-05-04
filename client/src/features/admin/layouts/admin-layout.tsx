import SideBar from "@/features/sidebar/sidebar";
import React, { useLayoutEffect } from "react";
import { LayoutRouteProps } from "react-router";

import {
  ShoppingBagIcon,
  Package2Icon,
  LayoutDashboardIcon,
  UsersIcon,
  BadgeDollarSignIcon,
} from "lucide-react";
import { SideBarProps } from "@/features/sidebar/types";
import { useSidebar } from "@/features/sidebar/store";
import Header from "@/components/header";

const sidebarProps: SideBarProps = {
  heading: "ADMIN",
  headingHref: "/",
  sections: [
    {
      section: "Menu",
      items: [
        {
          title: "Dashboard",
          icon: LayoutDashboardIcon,
          href: "/admin/dashboard",
          children: [],
        },
        {
          title: "Products",
          icon: ShoppingBagIcon,
          href: "/admin/products",
          children: [],
        },
        {
          title: "Users",
          icon: UsersIcon,
          href: "/admin/users",
          children: [],
        },
        {
          title: "Transactions",
          icon: BadgeDollarSignIcon,
          href: "/admin/transactions",
          children: [],
        },
      ],
    },
  ],
};

const AdminLayout: React.FC<LayoutRouteProps> = ({ children }) => {
  const { setSidebarProps } = useSidebar();

  useLayoutEffect(() => {
    setSidebarProps(sidebarProps);
  }, []);

  return (
    <div className="w-full h-screen flex">
      <SideBar />

      <div className="flex flex-col w-full">
        <Header />

        <main className="p-4 w-full h-full grid bg-gray-50">
          <div className="p-4 border rounded-lg text-gray-700 bg-white">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
