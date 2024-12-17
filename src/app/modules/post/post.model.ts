import { Schema, Types } from 'mongoose';
import { model } from 'mongoose';
import { IPost } from './post.interface';

const postSchema = new Schema(
  {
    postTitle: {
      type: String,
      required: [true, 'Post title is required'],
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true],
    },
    postCategory: {
      type: String,
      required: [true, 'Post category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    isPremium: {
      type: Boolean,
      default: false,
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

export const Post = model<IPost>('Post', postSchema);
