import { useSidebar } from "@/features/sidebar/store";
import UserLayout from "../layouts/user-layout";
import { useEffect } from "react";
import { useFetchProducts } from "@/features/products/product-hooks";
import ProductCard from "@/features/products/components/product-card";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";

const breadcrumbList: BreadcrumbItem[] = [
  {
    href: "/",
    itemName: "Home",
  },
  {
    href: "/products",
    itemName: "Products",
  },
];

const UserProducts = () => {
  const { setActiveItem, sidebarProps } = useSidebar();
  const { data: products } = useFetchProducts();
  const { setBreadcrumbList, setActivePage } = useBreadcrumb();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[0]);
    setBreadcrumbList(breadcrumbList);
    setActivePage(breadcrumbList[1]);
  }, [sidebarProps]);

  return (
    <UserLayout>
      <div className="flex flex-wrap gap-4">
        {products?.map((product) => (
          <ProductCard key={product.productId} {...product} />
        ))}
      </div>
    </UserLayout>
  );
};

export default UserProducts;
