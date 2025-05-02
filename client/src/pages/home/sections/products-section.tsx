import React, { useEffect } from "react";
import SectionHeader from "../components/section-header";
import { useProductStore } from "../../../stores/product";
import GridPattern from "../../../components/grid-pattern";
import ProductCard from "../../../components/product-card";

const ProductsSection: React.FC = () => {
  const { products, loadProducts } = useProductStore();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  console.log(products);

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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pl-2 w-fit place-self-center">
            {products.map((product) => (
              <ProductCard
                key={product.productId}
                productId={product.productId}
                productName={product.productName}
                brand={product.brand}
                price={product.price}
                imagePath={product.imagePath}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
