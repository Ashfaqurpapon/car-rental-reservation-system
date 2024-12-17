import { Types } from 'mongoose';

export interface ICart {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  shopId: Types.ObjectId;
  vendorId: Types.ObjectId;
  numberOfCounts: number;
}
