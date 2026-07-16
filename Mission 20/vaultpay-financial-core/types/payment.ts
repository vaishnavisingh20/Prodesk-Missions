export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed";

export interface Payment {
  _id: string;

  invoice: string;

  client: string;

  amount: number;

  paymentMethod: string;

  currency: string;

  status: PaymentStatus;

  stripePaymentIntentId?: string;

  stripeSessionId?: string;

  paidAt?: string;

  createdAt: string;

  updatedAt: string;
  receiptNumber?: string;

transactionId?: string;
}