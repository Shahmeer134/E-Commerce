import { Schema, Document, Types } from "mongoose";

export interface ICustomers extends Document {
  user: Types.ObjectId;
  gender: string;
  dateOfBirth: Date;
}

const customerSchema = new Schema<ICustomers>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export { customerSchema };
