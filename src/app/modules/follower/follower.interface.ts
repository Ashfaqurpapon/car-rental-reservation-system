import { Types } from 'mongoose';

export interface IFollower {
  userId: Types.ObjectId;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
}
