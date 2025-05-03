import { ProductDTO } from "../products/types";

export interface Category {
  categoryId: number;
  categoryName: string;
}

export interface CategoryWithProducts {
  categoryId: number;
  categoryName: string;
  products: ProductDTO[];
}
