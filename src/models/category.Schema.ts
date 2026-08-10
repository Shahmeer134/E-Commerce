import { Document, Schema, Types } from "mongoose";

export interface ICategories extends Document {
  parentCategory?: Types.ObjectId | null;
  categoryName: string;
  image: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategories>(
  {
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      required: false,
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
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
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
