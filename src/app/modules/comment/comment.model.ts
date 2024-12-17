import { Schema, Types } from 'mongoose';
import { model } from 'mongoose';
import { IComment } from './comment.interface';

const commentSchema = new Schema(
  {
    postId: {
      type: Types.ObjectId,
      ref: 'Post',
      required: [true, 'Shop ID is required'],
    },
    description: {
      type: String,
      required: [true, 'Comment description is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

export const Comment = model<IComment>('Comment', commentSchema);
