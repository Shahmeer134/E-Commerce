import { Schema, Document, Types } from "mongoose";

export interface ICategories extends Document {
  parentCategory: Types.ObjectId;
  categoryName: string;
  image: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategories>(
  {
    parentCategory: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
    categoryName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export { categorySchema };
