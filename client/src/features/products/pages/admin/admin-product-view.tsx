import { useParams } from "react-router";
import AdminLayout from "../../../../layouts/admin-layout";
import ProductView, {
  ProductViewSkeleton,
} from "@/features/products/components/product-view";
import { useFetchProductById } from "@/features/products/api/queries";
import PageNotFound from "@/components/page-not-found";

import { breadcrumbList } from "./admin-products";
import { useEffect } from "react";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";

const AdminProductView = () => {
  const { productId } = useParams();
  const {
    data: product,
    isError,
    isLoading,
    isFetching,
  } = useFetchProductById(parseInt(productId ?? "-1"));
  const { setBreadcrumbList, setActivePage } = useBreadcrumb();

  if (isError) {
    return <PageNotFound />;
  }

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

  return (
    <AdminLayout>
      {isLoading || isFetching ? (
        <ProductViewSkeleton />
      ) : (
        product && <ProductView key={productId} product={product} />
      )}
    </AdminLayout>
  );
};

export default AdminProductView;
