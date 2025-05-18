export interface Order {
  orderId: number;
  orderList: string;
  user: string;
  email: string;
  totalAmount: number;
}

export interface PlaceOrderResponse {
  checkoutLink: string;
  transactionId: string;
  message: string;
}
