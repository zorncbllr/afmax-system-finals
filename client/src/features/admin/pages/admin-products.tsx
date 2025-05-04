import { useSidebar } from "@/features/sidebar/store";
import AdminLayout from "../layouts/admin-layout";
import { useEffect } from "react";

const AdminProducts = () => {
  const { setActiveItem, sidebarProps } = useSidebar();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[1]);
  }, [sidebarProps]);

  return (
    <AdminLayout>
      <h1>products</h1>
    </AdminLayout>
  );
};

export default AdminProducts;
