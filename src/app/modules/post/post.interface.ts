import { Types } from 'mongoose';

export interface IPost {
  // _id?: string;
  postTitle: string;
  userId: Types.ObjectId;
  postCategory: string;
  description: string;
  imageUrl: string;
  numberOfLikes: number;
  isPremimum: boolean;
  isDeleted: boolean;
}
