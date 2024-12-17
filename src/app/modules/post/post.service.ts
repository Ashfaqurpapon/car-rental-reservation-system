import httpStatus from 'http-status';
import { IPost } from './post.interface';
import { Post } from './post.model';
import AppError from '../../errors/AppError';

const createPostIntoDB = async (payLoad: IPost): Promise<IPost> => {
  const car = new Post(payLoad);
  return await car.save();
};

const getAllPostFromDB = async () => {
  const result = await Post.find();
  return result;
};

const getSinglePostByPostId = async (id: string) => {
  const result = Post.findById(id);
  return result;
};

const getAllPostByUserId = async (userId: string) => {
  const result = Post.find({
    userId: userId,
  });
  return result;
};

const updatePostInfoInDB = async (postId: string, payload: Partial<IPost>) => {
  const result = await Post.findByIdAndUpdate(postId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const increaseLikesOfPostInDB = async (postId: string) => {
  const curPost = (await Post.findById(postId)) as IPost;
  if (!curPost) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post is not found');
  }
  curPost.numberOfLikes = curPost.numberOfLikes + 1;
  const result = await Post.findByIdAndUpdate(postId, curPost, {
    new: true,
    runValidators: true,
  });
  return result;
};

const decreaseLikesOfPostInDB = async (postId: string) => {
  const curPost = (await Post.findById(postId)) as IPost;

  if (curPost.numberOfLikes > 0) {
    curPost.numberOfLikes = curPost.numberOfLikes - 1;
  }
  const result = await Post.findByIdAndUpdate(postId, curPost, {
    new: true,
    runValidators: true,
  });
  return result;
};

const getUniquePostCategoriesfromDB = async () => {
  try {
    const uniqueCategories = await Post.distinct('postCategory');
    return uniqueCategories;
  } catch (error) {
    console.error('Error retrieving unique post categories:', error);
    throw error;
  }
};

const searchPostByCategoryInDB = async (query: Record<string, unknown>) => {
  try {
    const result = await Post.find(query);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const PostServices = {
  createPostIntoDB,
  getAllPostFromDB,
  getSinglePostByPostId,
  getAllPostByUserId,
  updatePostInfoInDB,
  increaseLikesOfPostInDB,
  decreaseLikesOfPostInDB,
  getUniquePostCategoriesfromDB,
  searchPostByCategoryInDB,
};
