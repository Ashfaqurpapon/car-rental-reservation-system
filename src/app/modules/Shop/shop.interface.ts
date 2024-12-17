import { Types } from 'mongoose';

export interface IShop {
  shopName: string;
  vendorId: Types.ObjectId;
  numberOfFollowers: number;
  isdeleted: boolean;
}
