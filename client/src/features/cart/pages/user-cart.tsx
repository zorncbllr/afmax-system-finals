import ForbiddenPage from "@/components/forbidden-page";
import { useAuthStore } from "@/features/auth/store";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";
import { useSidebar } from "@/features/sidebar/store";
import UserLayout from "@/layouts/user-layout";
import { useEffect } from "react";

const breadcrumbList: BreadcrumbItem[] = [
  {
    href: "/",
    itemName: "Home",
  },
  {
    href: "/user/cart",
    itemName: "Cart Items",
  },
];

const UserCartPage = () => {
  const { setBreadcrumbList, setActivePage } = useBreadcrumb();
  const { setActiveItem, sidebarProps } = useSidebar();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[0]);
    setBreadcrumbList(breadcrumbList);
    setActivePage(breadcrumbList[1]);
  }, [sidebarProps]);

  if (!isAuthenticated || user?.role != "User") {
    return <ForbiddenPage />;
  }

  return (
    <UserLayout>
      <div>hey</div>
    </UserLayout>
  );
};

export default UserCartPage;
