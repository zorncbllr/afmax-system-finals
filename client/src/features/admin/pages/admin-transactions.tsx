import { useSidebar } from "@/features/sidebar/store";
import AdminLayout from "../layouts/admin-layout";
import { useEffect } from "react";

const AdminTransactions = () => {
  const { setActiveItem, sidebarProps } = useSidebar();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[3]);
  }, [sidebarProps]);

  return (
    <AdminLayout>
      <h1>AdminTransactions</h1>
    </AdminLayout>
  );
};

export default AdminTransactions;
