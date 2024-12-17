import { Schema, Types } from 'mongoose';
import { model } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema(
  {
    shopId: {
      type: Types.ObjectId,
      ref: 'Shop',
      required: [true, 'Shop ID is required'],
    },
    vendorId: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'Vendor ID is required'],
    },
    productCategory: {
      type: Types.ObjectId,
      ref: 'ProductCategory',
      required: [true, 'Product category is required'],
    },
    productName: {
      type: String,
      required: [true, 'Product name is required'],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    detailsDescription: {
      type: String,
      default: '',
    },
    numberOFRatings: {
      type: Number,
      default: 0,
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

export const Product = model<IProduct>('Product', productSchema);
