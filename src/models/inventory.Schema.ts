import { Schema, Document, Types } from "mongoose";

export interface IInventory extends Document {
  product: Types.ObjectId;

  availableStock: number;
  recievedStock: number;

  createdAt: Date;
  updatedAt: Date;
}

const inventorySchema = new Schema<IInventory>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
      unique: true,
    },
    recievedStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    availableStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export { inventorySchema };
