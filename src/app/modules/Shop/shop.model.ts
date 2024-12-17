import { Schema, Types } from 'mongoose';
import { model } from 'mongoose';
import { IShop } from './shop.interface';

const shopSchema = new Schema(
  {
    shopName: {
      type: String,
      required: [true, 'Shop name is required'],
    },
    vendorId: {
      type: Types.ObjectId,
      ref: 'Vendor',
      required: [true, 'Vendor ID is required'],
    },
    numberOfFollowers: {
      type: Number,
      default: 0,
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

export const Shop = model<IShop>('Shop', shopSchema);
