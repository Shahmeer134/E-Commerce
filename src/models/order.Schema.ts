import { Schema, Document, Types } from "mongoose";
import { ORDER_STATUS } from "../constant/enums";

export interface IOrder extends Document {
  customer: Types.ObjectId;
  shippingAddress: Types.ObjectId;

  subTotal: number;
  shippingCost: number;
  tax: number;
  discount: number;

  totalAmount: number;

  paymentStatus: string;
  orderStatus: string;

  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: "CustomerAddress",
      required: true,
    },

    subTotal: {
      type: Number,
      required: true,
      min: 0,
    },

    shippingCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
    },
    orderStatus: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export { orderSchema };
