import { Schema, Document } from "mongoose";

import { hashPassword } from "../utils/helper.js";

export interface IUsers extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  profileImage: string;

  isVerified: boolean;

  status: string;
  phone: number;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUsers>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,
      required: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      require: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.pre<IUsers>("save", async function (next) {
  if (!this.isModified("passwordHash")) {
    return;
  }
  this.passwordHash = await hashPassword(this.passwordHash, 10);
});
export { userSchema };
