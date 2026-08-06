import { Schema, Document, Types } from "mongoose";
import { SHIPPING_STATUS } from "../constant/enums.js";

export interface IShipping extends Document {
  order: Types.ObjectId;

  courierName: string;
  trackingNumber: string;

  shippingStatus: string;

  estimatedDelivery: Date;
}

const shippingSchema = new Schema<IShipping>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
    },

    courierName: {
      type: String,
      required: true,
    },

    trackingNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    shippingStatus: {
      type: String,
      enum: Object.values(SHIPPING_STATUS),
      default: SHIPPING_STATUS.PENDING,
    },

    estimatedDelivery: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export { shippingSchema };