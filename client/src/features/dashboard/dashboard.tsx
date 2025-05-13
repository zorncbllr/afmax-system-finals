import { useSidebar } from "@/features/sidebar/store";
import AdminLayout from "../../layouts/admin-layout";
import { useEffect } from "react";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";
import ForbiddenPage from "@/components/forbidden-page";
import { useAuthStore } from "../auth/store";

export const breadcrumbList: BreadcrumbItem[] = [
  {
    href: "/admin/dashboard",
    itemName: "Admin",
  },
  {
    href: "/admin/dashboard",
    itemName: "Dashboard",
  },
];

const Dashboard = () => {
  const { setActiveItem, sidebarProps } = useSidebar();
  const { setBreadcrumbList, setActivePage } = useBreadcrumb();
  const { isAuthenticated, role } = useAuthStore();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[0]);
    setBreadcrumbList(breadcrumbList);
    setActivePage(breadcrumbList[1]);
  }, [sidebarProps]);

  if (!isAuthenticated || role !== "Admin") {
    return <ForbiddenPage />;
  }

  return (
    <AdminLayout>
      <h1>Admin Dashboard</h1>
    </AdminLayout>
  );
};

export default Dashboard;
