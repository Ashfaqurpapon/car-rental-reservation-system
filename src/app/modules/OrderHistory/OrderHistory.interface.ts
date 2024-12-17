import { Types } from 'mongoose';

export interface IOrderHistory {
  userId: Types.ObjectId;
  shopId: Types.ObjectId;
  vendorId: Types.ObjectId;
  NumberOfProducts: Types.ObjectId;
  TotalAmount: number;
  transactionId: string;
  isPaid: boolean;
}
