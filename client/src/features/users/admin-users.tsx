import { useSidebar } from "@/features/sidebar/store";
import AdminLayout from "../../layouts/admin-layout";
import { useEffect } from "react";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";
import { useAuthStore } from "../auth/store";
import ForbiddenPage from "@/components/forbidden-page";

export const breadcrumbList: BreadcrumbItem[] = [
  {
    href: "/admin/dashboard",
    itemName: "Admin",
  },
  {
    href: "/admin/users",
    itemName: "User List",
  },
];

const AdminUsers = () => {
  const { setActiveItem, sidebarProps } = useSidebar();
  const { setBreadcrumbList, setActivePage } = useBreadcrumb();
  const { isAuthenticated, role } = useAuthStore();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[3]);
    setBreadcrumbList(breadcrumbList);
    setActivePage(breadcrumbList[1]);
  }, [sidebarProps]);

  if (!isAuthenticated || role !== "Admin") {
    return <ForbiddenPage />;
  }

  return (
    <AdminLayout>
      <h1>Admin Users</h1>
    </AdminLayout>
  );
};

export default AdminUsers;
