import { Schema, Document, Types } from "mongoose";

export interface IInventory extends Document {
  product: Types.ObjectId;

  availableStock: number;
  receivedStock: number;

  createdAt: Date;
  updatedAt: Date;
}

const inventorySchema = new Schema<IInventory>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      unique: true,
    },
    receivedStock: {
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
