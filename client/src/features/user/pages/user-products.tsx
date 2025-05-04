import { useSidebar } from "@/features/sidebar/store";
import UserLayout from "../layouts/user-layout";
import { useEffect } from "react";

const UserProducts = () => {
  const { setActiveItem, sidebarProps } = useSidebar();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[0]);
  }, [sidebarProps]);

  return (
    <UserLayout>
      <h1>hey</h1>
    </UserLayout>
  );
};

export default UserProducts;
