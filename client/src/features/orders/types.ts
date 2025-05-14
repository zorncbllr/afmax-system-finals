export interface Order {
  orderId: number;
  orderList: string;
  user: string;
  email: string;
  totalAmount: number;
}

export interface PlaceOrderResponse {
  checkOutLink: string;
  transactionId: string;
  message: string;
}
