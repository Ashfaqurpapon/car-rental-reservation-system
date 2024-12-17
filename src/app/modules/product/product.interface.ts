import { Types } from 'mongoose';

export interface IProduct {
  shopId: Types.ObjectId;
  vendorId: Types.ObjectId;
  productCategory: Types.ObjectId;
  productName: string;
  imageUrl: string;
  price: number;
  detailsDescription: string;
  numberOFRatings: number;
  isDeleted: boolean;
}
