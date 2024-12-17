import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IComment } from './comment.interface';
import { Comment } from './comment.model';
import { Post } from '../post/post.model';

const createCommentIntoDB = async (payLoad: IComment): Promise<IComment> => {
  const isPostExists = await Post.findById(payLoad.postId);

  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This  Post is not found !');
  }

  const comment = new Comment(payLoad);
  return await comment.save();
};

const getSingleCommentByCommentId = async (id: string) => {
  const result = Comment.findById(id);
  return result;
};

const getAllCommentsOfSinglePost = async (postId: string) => {
  const result = Comment.find({
    postId: postId,
  });
  return result;
};

const deleteSingleComment = async (id: string) => {
  const isSingleCreatedComentExists = await Comment.findById(id);

  if (!isSingleCreatedComentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This  Comment  is not found !');
  }

  const deletedSingleCreatedComment = await Comment.findByIdAndDelete(id, {
    new: true,
  });

  if (!deletedSingleCreatedComment) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete comment !');
  }
};

export const CommentServices = {
  createCommentIntoDB,
  getSingleCommentByCommentId,
  getAllCommentsOfSinglePost,
  deleteSingleComment,
};
