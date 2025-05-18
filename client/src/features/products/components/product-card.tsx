import { SERVER_BASEURL } from "@/lib/api";
import { FlameIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

interface ProductCardProps {
  productId: number;
  productName: string;
  brand: string;
  price: number;
  image: string;
  isFeatured: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  productName,
  brand,
  price,
  image,
  isFeatured,
}) => {
  const navigator = useNavigate();

  const formattedPrice = new Intl.NumberFormat("fil-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(price.toString()));

  return (
    <div
      onClick={() => navigator(`/products/${productId}`)}
      key={productId}
      className="bg-white relative rounded-xl shadow-sm border border-gray-200 overflow-hidden w-[12rem] lg:w-[14rem] transition hover:shadow-lg"
    >
      {isFeatured && (
        <FlameIcon size={24} className="absolute top-4 right-4 text-blue-500" />
      )}

      <img
        src={SERVER_BASEURL + image}
        alt={productName}
        className="h-44 lg:h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{productName}</h3>
        <p className="text-sm text-gray-500">{brand}</p>
        <p className="mt-2 text-blue-600 font-bold">{formattedPrice}</p>
      </div>
    </div>
  );
};

export default ProductCard;
