import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPayment extends Document {
  invoice: mongoose.Types.ObjectId;

  client: mongoose.Types.ObjectId;

  amount: number;

  stripePaymentIntentId: string;

  stripeSessionId: string;

  paymentMethod: string;

  status: "pending" | "paid" | "failed";

  currency: string;

  paidAt?: Date;

  createdAt: Date;

  updatedAt: Date;
  receiptNumber: string;

transactionId: string;
}

const PaymentSchema = new Schema<IPayment>(
  {
    invoice: {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },

    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    stripePaymentIntentId: {
      type: String,
      default: "",
    },

    stripeSessionId: {
      type: String,
      default: "",
    },

    paymentMethod: {
      type: String,
      default: "card",
    },

    currency: {
      type: String,
      default: "usd",
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paidAt: {
      type: Date,
    },
    receiptNumber: {
  type: String,
  default: "",
},

transactionId: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);
PaymentSchema.index({ invoice: 1 });
PaymentSchema.index({ client: 1 });
PaymentSchema.index({ status: 1 });
const Payment: Model<IPayment> =
  mongoose.models.Payment ||
  mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;