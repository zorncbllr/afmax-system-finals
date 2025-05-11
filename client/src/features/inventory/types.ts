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

export interface InventoryForm {
  product: string;
  unit: string;
  abbreviation: string;
  quantity: number;
  expiration: Date;
}
