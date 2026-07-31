import { Schema, Document, Types } from "mongoose";

export interface ICartItem extends Document {
  cart: Types.ObjectId;
  product: Types.ObjectId;
  variant?: Types.ObjectId;
  quantity: number;
  price: number;

}

const cartItemSchema = new Schema<ICartItem>(
  {
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    variant: {
      type: Schema.Types.ObjectId,
      ref: "ProductVariant",
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    price: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

cartItemSchema.index(
  { cart: 1, product: 1, variant: 1 },
  { unique: true }
);

export { cartItemSchema };