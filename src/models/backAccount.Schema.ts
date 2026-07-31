import { Schema, Document, Types } from "mongoose";

export interface IBankAccount extends Document {
  shopId: Types.ObjectId;
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
  createdAt: Date;
  updatedAt: Date;
}

const bankAccountSchema = new Schema<IBankAccount>(
  {
    shopId: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
      unique: true,
    },
    bankName: {
      type: String,
      required: true,
      trim: true,
    },
    accountTitle: {
      type: String,
      required: true,
      trim: true,
    },
    accountNumber: {
      type: String,
      require: true,
      unique: true,
    },
    iban: {
      type: String,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export { bankAccountSchema };
