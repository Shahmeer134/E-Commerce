import { Schema, Document, Types } from "mongoose";
import { SHIPPING_STATUS } from "../constant/enums.js";

export interface IOrderTracking extends Document {
  order: Types.ObjectId;

  status: string;
  location: string;

  updateddAt: Date;
}

const orderTrackingSchema = new Schema<IOrderTracking>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(SHIPPING_STATUS),
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export { orderTrackingSchema };
