import { useParams } from "react-router";
import AdminLayout from "../layouts/admin-layout";
import ProductView from "@/features/products/components/product-view";
import { useFetchProductById } from "@/features/products/product-hooks";
import PageNotFound from "@/components/page-not-found";

const AdminProductView = () => {
  const { productId } = useParams();
  const { data: product, isError } = useFetchProductById(
    parseInt(productId ?? "-1")
  );

  if (isError) {
    return <PageNotFound />;
  }

  return (
    <AdminLayout>
      <ProductView product={product} />
    </AdminLayout>
  );
};

export default AdminProductView;
