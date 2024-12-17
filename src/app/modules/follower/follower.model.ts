import mongoose, { Schema, Types } from 'mongoose';
import { model } from 'mongoose';
import { IFollower } from './follower.interface';

const followerSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true],
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of users following this user
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

export const Follower = model<IFollower>('Follower', followerSchema);
