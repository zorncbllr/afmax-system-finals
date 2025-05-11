import { z } from "zod";

export interface Inventory {
  inventoryId: number;
  quantity: number;
  unit: string;
  product: string;
  abbreviation: string;
  expiration: string;
  dateStocked: string;
  isExpired: boolean;
}

export const InventoryFormSchema = z
  .object({
    productId: z.number().min(0, "Please select a product"),
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
