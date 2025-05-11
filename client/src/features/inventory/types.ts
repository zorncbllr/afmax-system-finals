import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ProductDTO } from "../products/types";

export interface Inventory {
  inventoryId: number;
  quantity: number;
  unit: string;
  product: string;
  productId: number;
  abbreviation: string;
  expiration: string;
  dateStocked: string;
  isExpired: boolean;
}

export const InventoryFormSchema = z
  .object({
    productId: z.number().min(1, "Please select a product"),
    unit: z.string().min(2, "Must be at least 2 characters"),
    abbreviation: z
      .string()
      .min(2, "Must be 2-5 characters")
      .max(5, "Must be 2-5 characters")
      .transform((val) => val.toUpperCase()),
    quantity: z
      .number()
      .min(0, "Quantity must be 0 or greater")
      .int("Must be a whole number"),
    expiration: z.coerce
      .date()
      .min(new Date(), "Expiration date must be in the future")
      .optional(),
  })
  .refine((data) => data.expiration !== undefined, {
    message: "Expiration date is required",
    path: ["expiration"],
  });

export interface SuccessResponse {
  message: string;
}

export interface InventoryErrorResponse {
  message: string;
}

export type InventoryForm = z.infer<typeof InventoryFormSchema>;

export interface InventoryFormProps {
  heading: string;
  subHeading: string;
  buttonLabel: string;
  form: UseFormReturn<
    {
      productId: number;
      unit: string;
      abbreviation: string;
      quantity: number;
      expiration?: Date | undefined;
    },
    any,
    {
      productId: number;
      unit: string;
      abbreviation: string;
      quantity: number;
      expiration?: Date | undefined;
    }
  >;
  products?: ProductDTO[];
  isOpen: boolean;
  openDate: boolean;
  openSelect: boolean;
  setIsOpen: (value: boolean) => void;
  setOpenDate: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSelect: React.Dispatch<React.SetStateAction<boolean>>;
  submitHandler: (value: InventoryForm) => void;
}
