import { useState } from "react";
import { Product } from "../types";
import { cn } from "@/lib/utils";
import { CategoryBadge } from "@/features/categories/components/category-badge";
import { Button } from "@/components/ui/button";

const ProductView = ({ product }: { product: Product }) => {
  const [mainImage, setMainImage] = useState<string>(product.images[0]);

  const formattedPrice = new Intl.NumberFormat("fil-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(product.price.toString()));

  return (
    <div className="w-full flex gap-40 justify-center mt-12">
      <div className="flex w-fit gap-4">
        <div className="flex flex-col gap-4">
          {product.images.map((image) => (
            <img
              src={"http://localhost:8000" + image}
              alt="Product Image"
              onClick={() => setMainImage(image)}
              className={cn(
                "w-[9rem] h-[9rem] object-cover shadow-sm",
                image == mainImage
                  ? " rounded-r-lg border-l-4 border-blue-500"
                  : "rounded-lg"
              )}
            />
          ))}
        </div>

        <img
          src={"http://localhost:8000" + mainImage}
          alt="Product Image"
          className="w-[30rem] h-[30rem] object-cover rounded-r-lg shadow-sm"
        />
      </div>

      <section className="flex-col flex gap-2 p-4">
        <h1 className="text-3xl font-semibold font-mono">
          {product.productName}
        </h1>
        <p className="text-xl">{product.brand}</p>

        <p className="text-blue-700 text-2xl font-semibold my-4">
          {formattedPrice}
        </p>

        <div>
          {product.categories.map((category) => (
            <CategoryBadge category={category} />
          ))}
        </div>

        <div className="flex gap-4 mt-10">
          <Button>Add Order</Button>
          <Button variant={"secondary"}>Buy Now</Button>
        </div>

        <div className="flex flex-col w-[40rem] gap-4 mt-4">
          <h1 className="text-lg font-semibold text-gray-500">
            Product Description:
          </h1>

          <div className="tracking-wide text-justify text-gray-500">
            {product.description}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductView;
