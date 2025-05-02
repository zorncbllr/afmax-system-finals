import React from "react";

interface ProductCardProps {
  productId: number;
  productName: string;
  brand: string;
  price: number;
  imagePath: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  productName,
  brand,
  price,
  imagePath,
}) => {
  return (
    <div
      key={productId}
      className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden w-[14rem] lg:w-[16rem] transition hover:shadow-lg"
    >
      <img
        src={imagePath}
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
