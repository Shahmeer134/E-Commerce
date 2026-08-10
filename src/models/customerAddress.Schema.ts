import { Schema, Document, Types } from "mongoose";

export interface ICustomerAddress extends Document {
  customerId: Types.ObjectId;
  fullName: string;
  email: string;
  country: string;
  city: string;
  area: string;
  postalCode: string;

  isVerified: boolean;

  street: string;
  phone: string;

  createdAt: Date;
  updatedAt: Date;
}

const customerAddressSchema = new Schema<ICustomerAddress>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customers",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    area: {
      type: String,
      required: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export { customerAddressSchema };
