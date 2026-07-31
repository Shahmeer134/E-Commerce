import { Schema, Document, Types } from "mongoose";

export interface IProductVariant extends Document {
  product: Types.ObjectId;

  color: string;
  size: string;
  sku: string;

  price: number;
  stock: number;

  createdAt: Date;
  updatedAt: Date;
}

const productVariantSchema = new Schema<IProductVariant>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
      maxLength: 150,
    },
    size: {
      type: String,
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export { productVariantSchema };
