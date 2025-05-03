export interface ProductDTO {
  productId: number;
  productName: string;
  brand: string;
  price: number;
  imagePath: string;
  isFeatured: boolean;
}

export interface Product {
  productId: number;
  productName: string;
  description: string;
  brand: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  images: string[];
  categories: string[];
  isFeatured: boolean;
}
