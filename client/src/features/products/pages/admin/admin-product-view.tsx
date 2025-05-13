import { useParams } from "react-router";
import AdminLayout from "../../../../layouts/admin-layout";
import ProductView, {
  ProductViewSkeleton,
} from "@/features/products/components/product-view";

import { breadcrumbList } from "./admin-products";
import { useEffect } from "react";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";
import ForbiddenPage from "@/components/forbidden-page";
import { useAuthStore } from "@/features/auth/store";
import { useFetchProductById } from "../../api/queries";

const AdminProductView = () => {
  const { productId } = useParams();
  const { data: product, isLoading } = useFetchProductById(
    parseInt(productId ?? "-1")
  );

  const { setBreadcrumbList, setActivePage } = useBreadcrumb();
  const { isAuthenticated, role } = useAuthStore();

  useEffect(() => {
    if (product) {
      const activePage: BreadcrumbItem = {
        href: `/admin/products/${productId?.toString()}`,
        itemName: product!.productName,
      };

      setBreadcrumbList([...breadcrumbList, activePage]);
      setActivePage(activePage);
    }
  }, [product]);

  if (!isAuthenticated || role !== "Admin") {
    return <ForbiddenPage />;
  }

  return (
    <AdminLayout>
      {isLoading ? (
        <ProductViewSkeleton />
      ) : (
        product && <ProductView key={productId} product={product} />
      )}
    </AdminLayout>
  );
};

export default AdminProductView;
