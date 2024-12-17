import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { IProductCategory } from './ProductCategory.interface';

const productCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Price is required'],
      unique: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

export const ProductCategory = model<IProductCategory>(
  'ProductCategory',
  productCategorySchema,
);
