import { useLayoutEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CategoryBadge } from "@/features/categories/components/category-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAutoResizeTextarea } from "../hooks/autoresize-hook";
import { FlameIcon } from "lucide-react";
import { ProductDetails } from "../types";
import { useAuthStore } from "@/features/auth/store";
import { useNavigate } from "react-router";
import { useAddToCart } from "@/features/cart/api/mutations";
import { useCartFormStore } from "@/features/cart/stores/cart-form-store";
import { SERVER_BASEURL } from "@/lib/api";

export const ProductViewSkeleton = () => {
  return (
    <div className="w-full flex gap-40 justify-center mt-12">
      <div className="flex w-fit gap-4">
        <div className="flex flex-col gap-4">
          <Skeleton className="w-[9rem] h-[9rem] object-cover shadow-sm" />
          <Skeleton className="w-[9rem] h-[9rem] object-cover shadow-sm" />
          <Skeleton className="w-[9rem] h-[9rem] object-cover shadow-sm" />
        </div>

        <Skeleton className="w-[30rem] h-[30rem] object-cover shadow-sm" />
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Product Title */}
        <div className="space-y-4">
          <Skeleton className="h-9 w-3/4 rounded-lg" />
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>

        {/* Product Header Section */}
        <div className="space-y-4">
          <Skeleton className="h-7 w-1/3 rounded-lg" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-6 w-16 rounded-lg" />
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-1/4 rounded-md" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-1/4 rounded-md" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>

        {/* Product Description */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-40 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductView = ({ product }: { product: ProductDetails }) => {
  const [mainImage, setMainImage] = useState<string>("");
  const textareaRef = useAutoResizeTextarea("");
  const { isAuthenticated, user } = useAuthStore();
  const { mutate } = useAddToCart();
  const navigate = useNavigate();
  const { isOpen, setIsOpen } = useCartFormStore();

  const addItemToCart = () => {
    if (!isAuthenticated) {
      navigate("/auth/sign-in");
    }

    if (user?.role != "User") return;

    mutate({ productId: product.productId, quantity: 1 });
  };

  const formattedPrice = new Intl.NumberFormat("fil-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(product.price.toString()));

  useLayoutEffect(() => {
    setMainImage(product.images[0]);
    textareaRef.current!.value = product.description;
  }, [product]);

  return (
    <div className="w-full flex flex-col xl:flex-row gap-32 xl:justify-around py-10 px-18">
      <div className="flex flex-col-reverse items-center lg:flex-row xl:items-start w-fit gap-4">
        <div className="flex lg:flex-col gap-4">
          {product.images.map((image) => (
            <img
              src={SERVER_BASEURL + image}
              alt="Product Image"
              onClick={() => setMainImage(image)}
              className={cn(
                "w-[7rem] h-[7rem] lg:w-[9rem] lg:h-[9rem] lg:min-w-[9rem] object-cover shadow-sm",
                image == mainImage
                  ? " rounded-r-lg border-l-4 border-blue-500"
                  : "rounded-lg"
              )}
            />
          ))}
        </div>

        <img
          src={SERVER_BASEURL + mainImage}
          alt="Product Image"
          className="w-[25rem] h-[25rem] lg:w-[30rem] lg:h-[30rem] lg:min-w-[30rem] object-cover rounded-r-lg shadow-sm"
        />
      </div>

      <section className="flex-col flex gap-2 p-4 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold font-mono">
            {product.productName}
          </h1>

          {product.isFeatured && (
            <FlameIcon size={24} className="text-blue-500" />
          )}
        </div>

        <p className="text-xl">{product.brand}</p>

        <p className="text-blue-700 text-2xl font-semibold my-4">
          {formattedPrice}
        </p>

        <div className="flex gap-2">
          {product.categories.map((category) => (
            <CategoryBadge category={category} />
          ))}
        </div>

        <div className="flex gap-4 mt-10">
          <Button onClick={() => setIsOpen(true)}>Add Order</Button>

          <Button variant={"secondary"}>Buy Now</Button>
        </div>

        <div className="flex flex-col w-full gap-4 mt-4">
          <h1 className="text-lg font-semibold text-gray-500">
            Product Description:
          </h1>

          <textarea
            ref={textareaRef}
            disabled={true}
            className="w-full text-gray-500 tracking-wide text-justify bg-transparent border-0  resize-none overflow-hidden"
            style={{ minHeight: "6rem" }}
          />
        </div>
      </section>
    </div>
  );
};

export default ProductView;
