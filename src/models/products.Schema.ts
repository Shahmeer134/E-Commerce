import { Schema, Document, Types } from "mongoose";
import { PRODUCT_STATUS } from "../constant/enums.js";

export interface IProduct extends Document {
  shop: Types.ObjectId;
  category: Types.ObjectId;

  title: string;
  slug: string;
  description: string;
  brand: string;
  sku: string;

  price: number;
  discountPrice: number;
  stock: number;
  sold: number;

  thumbnail: String;

  averageRating: number;
  totalReviews: number;

  status: string;

  createdAt: Date;
  UpdatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 150,
    },
    slug: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      rquired: true,
      maxLength: 5000,
    },
    brand: {
      type: String,
      required: true,
      default: "Generic",
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
    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    sold: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: Object.values(PRODUCT_STATUS),
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export { productSchema };
