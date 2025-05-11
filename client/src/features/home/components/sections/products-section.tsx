import React, { useEffect } from "react";
import SectionHeader from "../section-header";
import GridPattern from "../../../../components/grid-pattern";
import ProductTab from "../product-tab";
import { useFeaturedStore } from "../../../featured-products/store";
import { useFetchFeaturedCategories } from "../../../featured-products/query";
import ProductCard from "@/features/products/components/product-card";

const ProductsSection: React.FC = () => {
  const { data: categories, isFetched } = useFetchFeaturedCategories();
  const { initCategories, activeCategory, setActiveCategory } =
    useFeaturedStore();

  useEffect(() => {
    if (isFetched && categories!.length > 0) {
      initCategories(categories);
      setActiveCategory(0);
    }
  }, [isFetched, categories]);

  if (!activeCategory) {
    return <></>;
  }

  return (
    <section className="flex px-4 lg:px-2 justify-center flex-col gap-8 mb-24">
      <SectionHeader
        section="Products"
        heading="Medical Supplies On Hand"
        description="We work with trusted manufacturers and suppliers to guarantee that every product meets industry standards for safety and effectiveness."
      />

      <div className="flex justify-center w-full">
        <div className="hidden xl:flex w-[20rem] relative shadow-sm border-[.01px] rounded-l-2xl border-gray-300 overflow-hidden">
          <GridPattern />

          <a
            href="#"
            className="absolute bottom-5 left-6 text-sm leading-6 font-semibold text-gray-900"
          >
            See Products <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="flex flex-col justify-start gap-2 w-fit">
          <ProductTab />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pl-2 w-fit place-self-center">
            {activeCategory.products.map((product) => (
              <ProductCard
                key={product.productId}
                productId={product.productId}
                productName={product.productName}
                brand={product.brand}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
