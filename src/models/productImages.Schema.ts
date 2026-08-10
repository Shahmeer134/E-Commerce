import { Schema, Document, Types } from "mongoose";

export interface IProductImages extends Document {
  product: Types.ObjectId;
  imageUrl: string;
  isPrimary: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productImageSchema = new Schema<IProductImages>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

productImageSchema.index({ product: 1 });

export { productImageSchema };
