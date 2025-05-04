import React, { useEffect } from "react";
import UserLayout from "../layouts/user-layout";
import { useSidebar } from "@/features/sidebar/store";

const UserSupplies = () => {
  const { sidebarProps, setActiveItem } = useSidebar();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[1]);
  }, [sidebarProps]);

  return (
    <UserLayout>
      <h1>Supplies</h1>
    </UserLayout>
  );
};

export default UserSupplies;
