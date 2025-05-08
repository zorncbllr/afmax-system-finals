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
