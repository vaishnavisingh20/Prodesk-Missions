export function getInvoicePdfName(invoiceNumber: string) {
  return `Invoice-${invoiceNumber}.pdf`;
}

export function getReceiptPdfName(invoiceNumber: string) {
  return `Receipt-${invoiceNumber}.pdf`;
}