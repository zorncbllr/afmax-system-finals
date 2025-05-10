import { z } from "zod";

export interface ProductDTO {
  productId: number;
  productName: string;
  brand: string;
  price: number;
  image: string;
  isFeatured: boolean;
  categories: string[];
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

export const ProductFormSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  brand: z.string().min(1, "Brand is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(10000, "Maximum description length is 10,0000 characters"),
  price: z.number().min(1, "Price must be greater than 0"),
  images: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "At least one image is required"),
  categories: z
    .array(z.string().min(1))
    .min(1, "At least one category is required"),
});

export interface ProductUpdateProps {
  productId: number;
  product: FormData;
}
