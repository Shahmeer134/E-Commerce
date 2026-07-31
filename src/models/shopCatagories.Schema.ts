import { Schema, Document, Types } from "mongoose";

export interface IShopCategories extends Document {
  shopCategoryName: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const shopCategorySchema = new Schema<IShopCategories>({
  shopCategoryName: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
}, {
    timestamps: true,
    versionKey: false
});

export { shopCategorySchema };
