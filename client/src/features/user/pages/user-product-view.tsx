import { useParams } from "react-router";
import UserLayout from "../layouts/user-layout";
import ProductView from "@/features/products/components/product-view";
import { useFetchProductById } from "@/features/products/product-hooks";
import PageNotFound from "@/components/page-not-found";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";
import { useEffect } from "react";

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

const UserProductView = () => {
  const { productId } = useParams();
  const {
    data: product,
    isError,
    isFetched,
  } = useFetchProductById(parseInt(productId ?? "-1"));
  const { setActivePage, setBreadcrumbList } = useBreadcrumb();

  if (isError) {
    return <PageNotFound />;
  }

  useEffect(() => {
    if (isFetched) {
      const activePage: BreadcrumbItem = {
        href: `/products/${productId?.toString()}`,
        itemName: product!.productName,
      };

      setBreadcrumbList([...breadcrumbList, activePage]);
      setActivePage(activePage);
    }
  }, [product]);

  return (
    <UserLayout>
      <ProductView product={product} />
    </UserLayout>
  );
};

export default UserProductView;
