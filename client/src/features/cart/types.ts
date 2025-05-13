export interface Product {
  productId: number;
  productName: string;
  brand: string;
  price: number;
  image: string;
  isFeatured: boolean;
}

export interface CartItem {
  cartItemId: number;
  quantity: number;
  product: Product;
}

export interface Cart {
  cartId: number;
  cartItems: CartItem[];
  totalPrice: number;
}

export interface CartItemProps {
  productId: number;
  quantity: number;
}
