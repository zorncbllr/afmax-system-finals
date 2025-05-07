import { Product } from "../types";

const ProductView = ({ product }: { product?: Product }) => {
  return <div>{product?.productName}</div>;
};

export default ProductView;
