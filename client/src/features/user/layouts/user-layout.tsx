import SideBar from "@/features/sidebar/sidebar";
import React, { useLayoutEffect } from "react";
import { LayoutRouteProps } from "react-router";

import { ShoppingBagIcon, Package2Icon } from "lucide-react";
import { SideBarProps } from "@/features/sidebar/types";
import { useSidebar } from "@/features/sidebar/store";
import Header from "@/components/header";
import AppBreadcrumb from "@/features/breadcrumbs/app-breadcrumb";

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
        {
          title: "Supplies",
          icon: Package2Icon,
          href: "/supplies",
          children: [],
        },
      ],
    },
  ],
};

const UserLayout: React.FC<LayoutRouteProps> = ({ children }) => {
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
          <div className="p-4 border rounded-lg text-gray-700 bg-white flex flex-col gap-4">
            <AppBreadcrumb />

            <div>{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
