import { Schema, Types } from 'mongoose';
import { model } from 'mongoose';
import { IOrderHistory } from './OrderHistory.interface';

const orderHistorySchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
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
    NumberOfProducts: {
      type: Number,
      required: [true, 'NumberOfProducts is required'],
    },
    TotalAmount: {
      type: Number,
      required: [true, 'TotalAmount is required'],
    },
    transactionId: {
      type: String,
      required: [true, 'Transaction id  is required'],
    },
    isPaid: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

export const OrderHistory = model<IOrderHistory>(
  'OrderHistory',
  orderHistorySchema,
);
