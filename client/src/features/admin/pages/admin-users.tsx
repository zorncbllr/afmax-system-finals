import { useSidebar } from "@/features/sidebar/store";
import AdminLayout from "../layouts/admin-layout";
import { useEffect } from "react";

const AdminUsers = () => {
  const { setActiveItem, sidebarProps } = useSidebar();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[2]);
  }, [sidebarProps]);

  return (
    <AdminLayout>
      <h1>Admin Users</h1>
    </AdminLayout>
  );
};

export default AdminUsers;
