import { useSidebar } from "@/features/sidebar/store";
import UserLayout from "../layouts/user-layout";
import { useEffect } from "react";
import { useFetchProducts } from "@/features/products/product-hooks";
import ProductCard from "@/features/products/components/product-card";

const UserProducts = () => {
  const { setActiveItem, sidebarProps } = useSidebar();
  const { data: products } = useFetchProducts();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[0]);
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
