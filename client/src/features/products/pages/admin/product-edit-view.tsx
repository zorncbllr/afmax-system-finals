import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CategoryBadge } from "@/features/categories/components/category-badge";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { useFetchProductById } from "../../api/query";
import AdminLayout from "@/layouts/admin-layout";
import { ImagePlusIcon, PencilIcon, XIcon } from "lucide-react";
import { breadcrumbList } from "./admin-products";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";

const ProductEditView = () => {
  const [mainImage, setMainImage] = useState<string>("");
  const [formattedPrice, setFormattedPrice] = useState<string>("");

  const { setActivePage, setBreadcrumbList } = useBreadcrumb();

  const { productId } = useParams();
  const { data: product, isFetched } = useFetchProductById(
    parseInt(productId!)
  );

  useEffect(() => {
    if (isFetched) {
      const activePage: BreadcrumbItem = {
        href: `/admin/products/edit/${productId?.toString()}`,
        itemName: product!.productName,
      };

      setBreadcrumbList([...breadcrumbList, activePage]);
      setActivePage(activePage);

      setMainImage(product!.images[0]);
      setFormattedPrice(
        new Intl.NumberFormat("fil-PH", {
          style: "currency",
          currency: "PHP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(parseFloat(product!.price.toString()))
      );
    }
  }, [product]);

  return (
    <AdminLayout>
      <div className="flex flex-col items-center gap-8 p-12">
        <div className="flex w-full justify-end">
          <Button>Update Details</Button>
        </div>

        <div className="flex  gap-40">
          <div className="flex w-fit gap-4">
            <div className="flex flex-col gap-4">
              <div className="relative flex justify-center items-center w-[9rem] h-[9rem] border border-dashed border-blue-500 bg-blue-50 shadow-sm rounded-lg">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="placeholder-transparent text-transparent w-full h-full z-50"
                />
                <ImagePlusIcon className="absolute text-blue-500" size={40} />
              </div>

              {product?.images.map((image) => (
                <div className="relative">
                  <img
                    src={"http://localhost:8000" + image}
                    alt="Product Image"
                    className={cn(
                      "w-[9rem] h-[9rem] object-cover shadow-sm",
                      image == mainImage
                        ? " rounded-r-lg border-l-4 border-blue-500"
                        : "rounded-lg"
                    )}
                  />
                  <Button
                    variant={"secondary"}
                    className="rounded-full absolute -top-2 -right-2"
                  >
                    <XIcon />
                  </Button>
                </div>
              ))}
            </div>

            <div className="relative">
              <img
                src={"http://localhost:8000" + mainImage}
                alt="Product Image"
                className="w-[30rem] h-[30rem] object-cover rounded-r-lg shadow-sm"
              />
              <Button
                variant={"secondary"}
                className="rounded-full absolute -top-2 -right-2"
              >
                <XIcon />
              </Button>
            </div>
          </div>

          <section className="flex-col flex gap-2 p-4">
            <div className="flex gap-4 items-center">
              <h1 className="text-3xl font-semibold font-mono">
                {product?.productName}
              </h1>
              <PencilIcon size={20} />
            </div>

            <div className="flex gap-4 w-fit items-center">
              <p className="text-xl">{product?.brand}</p>
              <PencilIcon size={16} />
            </div>

            <div className="flex gap-4 items-center">
              <p className="text-blue-700 text-2xl font-semibold my-4">
                {formattedPrice}
              </p>
              <PencilIcon size={16} />
            </div>

            <div className="flex gap-4 items-center">
              <div>
                {product?.categories.map((category) => (
                  <CategoryBadge category={category} />
                ))}
              </div>
              <PencilIcon size={16} />
            </div>

            <div className="flex flex-col w-[40rem] gap-4 mt-4">
              <div className="flex gap-4 items-center">
                <h1 className="text-lg font-semibold text-gray-500">
                  Product Description:
                </h1>
                <PencilIcon size={16} />
              </div>

              <div className="tracking-wide text-justify text-gray-500">
                {product?.description}
              </div>
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductEditView;
