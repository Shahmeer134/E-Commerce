import { Schema, Document, Types } from "mongoose";
import { SHOP_STATUS } from "../constant/enums.js";

export interface IShop extends Document {
  owner: Types.ObjectId;
  category: Types.ObjectId;

  shopName: string;
  description: string;
  logo: string;
  address: string;
  city: string;
  country: string;

  rating: number;
  totalProducts: number;
  totalOrders: number;

  slug: string;
  status: string;

  createdAt: Date;
  updatedAt: Date;
}

const shopSchema = new Schema<IShop>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    shopName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 150,
    },
    logo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 5000,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    totalOrders: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalProducts: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: Object.values(SHOP_STATUS),
      default: "pending",
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export { shopSchema };
