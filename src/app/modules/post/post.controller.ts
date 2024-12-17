import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostServices } from './post.service';

const getAllPosts = catchAsync(async (req, res) => {
  const posts = await PostServices.getAllPostFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Posts retrieved successfully',
    data: posts,
  });
});

const createPost = catchAsync(async (req, res) => {
  const post = await PostServices.createPostIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post created successfully',
    data: post,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await PostServices.getSinglePostByPostId(postId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post is retrieved succesfully',
    data: result,
  });
});

const getUserAllPosts = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await PostServices.getAllPostByUserId(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts is retrieved succesfully',
    data: result,
  });
});

const updatePostInfo = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await PostServices.updatePostInfoInDB(postId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts is updated succesfully',
    data: result,
  });
});

const increaseLikesOfPost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await PostServices.increaseLikesOfPostInDB(postId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts like increased succesfully',
    data: result,
  });
});

const decreaseLikesOfPost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await PostServices.decreaseLikesOfPostInDB(postId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts like decreased succesfully',
    data: result,
  });
});

const getUniquePostCategories = catchAsync(async (req, res) => {
  const result = await PostServices.getUniquePostCategoriesfromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories are retrievd succesfully',
    data: result,
  });
});

const searchPostByCategory = catchAsync(async (req, res) => {
  const result = await PostServices.searchPostByCategoryInDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts are filered succesfully',
    data: result,
  });
});

const deleteSinglePost = catchAsync(async (req, res) => {});

export const PostControllers = {
  getAllPosts,
  createPost,
  deleteSinglePost,
  getSinglePost,
  getUserAllPosts,
  increaseLikesOfPost,
  decreaseLikesOfPost,
  updatePostInfo,
  getUniquePostCategories,
  searchPostByCategory,
};
