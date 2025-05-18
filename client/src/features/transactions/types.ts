export interface TransactionResponse {
  message: string;
}

export interface Transaction {
  transactionId: string;
  user: string;
  email: string;
  amount: number;
  payment: string;
  description: string;
  date: string;
}
