import { Schema, Document, Types } from "mongoose";

export interface IReview extends Document {
  customer: Types.ObjectId;
  product: Types.ObjectId;

  rating: number;
  review: string;

  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

reviewSchema.index(
  { customer: 1, product: 1 },
  { unique: true }
);

export { reviewSchema };