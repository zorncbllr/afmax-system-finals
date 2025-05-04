import { useSidebar } from "@/features/sidebar/store";
import AdminLayout from "../layouts/admin-layout";
import { useEffect } from "react";

const Dashboard = () => {
  const { setActiveItem, sidebarProps } = useSidebar();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[0]);
  }, [sidebarProps]);

  return (
    <AdminLayout>
      <h1>Admin Dashboard</h1>
    </AdminLayout>
  );
};

export default Dashboard;
