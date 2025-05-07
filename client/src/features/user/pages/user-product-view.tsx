import { useParams } from "react-router";
import UserLayout from "../layouts/user-layout";
import ProductView from "@/features/products/components/product-view";
import { useFetchProductById } from "@/features/products/product-hooks";
import PageNotFound from "@/components/page-not-found";

const UserProductView = () => {
  const { productId } = useParams();
  const { data: product, isError } = useFetchProductById(
    parseInt(productId ?? "-1")
  );

  if (isError) {
    return <PageNotFound />;
  }

  return (
    <UserLayout>
      <ProductView product={product} />
    </UserLayout>
  );
};

export default UserProductView;
