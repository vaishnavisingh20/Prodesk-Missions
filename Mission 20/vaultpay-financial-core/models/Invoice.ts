import mongoose, { Document, Model, Schema } from "mongoose";

export interface IInvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface IInvoice extends Document {
  invoiceNumber: string;

  client:
  | mongoose.Types.ObjectId
  | {
      name: string;
      email: string;
    };

  items: IInvoiceItem[];

  subtotal: number;

  tax: number;

  total: number;

  status: "pending" | "paid";

  dueDate: Date;

  paidAt?: Date;

  stripeSessionId?: string;

  pdfUrl?: string;

  createdAt: Date;

  updatedAt: Date;
  notes?: string;

currency: string;

paymentMethod?: string;

receiptUrl?: string;
paymentDetails?: {
  stripeSessionId?: string;
  paymentIntent?: string;
  paidAt?: Date;
};
}

const InvoiceItemSchema = new Schema<IInvoiceItem>(
  {
    description: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    unitPrice: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const InvoiceSchema = new Schema<IInvoice>(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [InvoiceItemSchema],
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    tax: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    dueDate: {
      type: Date,
      required: true,
    },

    paidAt: {
      type: Date,
    },

    stripeSessionId: {
      type: String,
      default: "",
    },

    pdfUrl: {
      type: String,
      default: "",
    },
    notes: {
  type: String,
  default: "",
},

currency: {
  type: String,
  default: "USD",
},

paymentMethod: {
  type: String,
  default: "",
},

receiptUrl: {
  type: String,
  default: "",
},
paymentDetails: {
  stripeSessionId: {
    type: String,
  },

  paymentIntent: {
    type: String,
  },

  paidAt: {
    type: Date,
  },
},
  },
  {
    timestamps: true,
  }
);
InvoiceSchema.index({ client: 1 });
InvoiceSchema.index({ status: 1 });
InvoiceSchema.index({ invoiceNumber: 1 });
const Invoice: Model<IInvoice> =
  mongoose.models.Invoice ||
  mongoose.model<IInvoice>("Invoice", InvoiceSchema);

export default Invoice;