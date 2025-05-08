import { useParams } from "react-router";
import UserLayout from "../../../../layouts/user-layout";
import ProductView, {
  ProductViewSkeleton,
} from "@/features/products/components/product-view";
import { useFetchProductById } from "@/features/products/api/query";
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
    isLoading,
    isFetching,
  } = useFetchProductById(Number(productId));
  const { setActivePage, setBreadcrumbList } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumbList(breadcrumbList);
    setActivePage(breadcrumbList[breadcrumbList.length - 1]);
  }, [productId, setActivePage, setBreadcrumbList]);

  useEffect(() => {
    if (product) {
      const activePage: BreadcrumbItem = {
        href: `/products/${productId}`,
        itemName: product.productName,
      };
      setBreadcrumbList([...breadcrumbList, activePage]);
      setActivePage(activePage);
    }
  }, [product, productId, setActivePage, setBreadcrumbList]);

  if (isError) {
    return <PageNotFound />;
  }

  return (
    <UserLayout>
      {isLoading || isFetching ? (
        <ProductViewSkeleton />
      ) : (
        product && <ProductView key={productId} product={product} />
      )}
    </UserLayout>
  );
};

export default UserProductView;
