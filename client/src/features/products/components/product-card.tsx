import React from "react";

interface ProductCardProps {
  productId: number;
  productName: string;
  brand: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  productName,
  brand,
  price,
  image,
}) => {
  return (
    <div
      key={productId}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-[12rem] lg:w-[14rem] transition hover:shadow-lg"
    >
      <img
        src={image}
        alt={productName}
        className="h-44 lg:h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{productName}</h3>
        <p className="text-sm text-gray-500">{brand}</p>
        <p className="mt-2 text-blue-600 font-bold">
          ${price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
