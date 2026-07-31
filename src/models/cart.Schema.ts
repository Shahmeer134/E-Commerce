import { Schema, Document, Types } from "mongoose";

export interface ICart extends Document {
  customerId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export { cartSchema };
