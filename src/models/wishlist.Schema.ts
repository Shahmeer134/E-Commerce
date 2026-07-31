import { Schema, Document, Types } from "mongoose";

export interface IWishlist extends Document {
  product: Types.ObjectId;
  customer: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const wishlistSchema = new Schema<IWishlist>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Prevent duplicate wishlist entries
wishlistSchema.index(
  { customer: 1, product: 1 },
  { unique: true }
);

export { wishlistSchema };
