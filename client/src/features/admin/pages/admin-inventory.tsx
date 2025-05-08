import { useSidebar } from "@/features/sidebar/store";
import AdminLayout from "../layouts/admin-layout";
import { useEffect } from "react";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";

export const breadcrumbList: BreadcrumbItem[] = [
  {
    href: "/admin/dashboard",
    itemName: "Admin",
  },
  {
    href: "/admin/inventoy",
    itemName: "Inventory",
  },
];

const AdminInventory = () => {
  const { setActiveItem, sidebarProps } = useSidebar();
  const { setBreadcrumbList, setActivePage } = useBreadcrumb();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[2]);
    setBreadcrumbList(breadcrumbList);
    setActivePage(breadcrumbList[1]);
  }, [sidebarProps]);

  return (
    <AdminLayout>
      <h1>Admin Inventory</h1>
    </AdminLayout>
  );
};

export default AdminInventory;
