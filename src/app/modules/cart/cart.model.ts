import { Schema, Types } from 'mongoose';
import { model } from 'mongoose';
import { ICart } from './cart.interface';

const cartSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    productId: {
      type: Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
    },
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
    numberOfCounts: {
      type: Number,
      required: [true, 'NumberOfCounts ID is required'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

export const Cart = model<ICart>('Cart', cartSchema);
