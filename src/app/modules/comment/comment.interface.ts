import { Types } from 'mongoose';

export interface IComment {
  postId: Types.ObjectId;
  description: string;
  isDeleted: boolean;
}
