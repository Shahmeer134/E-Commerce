import { Schema, Document, Types } from "mongoose";
import { PAYMENT_METHODS, PAYMENT_STATUS } from "../constant/enums.js";

export interface IPayment extends Document {
  order: Types.ObjectId;

  paymentMethod: string;
  paymentStatus: string;
  transactionId?: string;

  amount: number;

  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
    },

    paymentMethod: {
      type: String,
      enum: Object.values(PAYMENT_METHODS),
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },

    transactionId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export { paymentSchema };