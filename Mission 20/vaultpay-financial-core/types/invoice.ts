export type InvoiceStatus = "pending" | "paid";

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  _id: string;

  invoiceNumber: string;

  client: string;

  items: InvoiceItem[];

  subtotal: number;

  tax: number;

  total: number;

  status: InvoiceStatus;

  dueDate: string;

  paidAt?: string;

  pdfUrl?: string;

  createdAt: string;

  updatedAt: string;
  currency: string;

notes?: string;

paymentMethod?: string;

receiptUrl?: string;
}