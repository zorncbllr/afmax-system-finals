import { useParams } from "react-router";
import AdminLayout from "../layouts/admin-layout";
import ProductView from "@/features/products/components/product-view";
import { useFetchProductById } from "@/features/products/hooks";
import PageNotFound from "@/components/page-not-found";

import { breadcrumbList } from "./admin-products";
import { useEffect } from "react";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";

const AdminProductView = () => {
  const { productId } = useParams();
  const {
    data: product,
    isError,
    isFetched,
  } = useFetchProductById(parseInt(productId ?? "-1"));
  const { setBreadcrumbList, setActivePage } = useBreadcrumb();

  if (isError) {
    return <PageNotFound />;
  }

  useEffect(() => {
    if (isFetched) {
      const activePage: BreadcrumbItem = {
        href: `/admin/products/${productId?.toString()}`,
        itemName: product!.productName,
      };

      setBreadcrumbList([...breadcrumbList, activePage]);
      setActivePage(activePage);
    }
  }, [product]);

  return (
    <AdminLayout>{isFetched && <ProductView product={product!} />}</AdminLayout>
  );
};

export default AdminProductView;
