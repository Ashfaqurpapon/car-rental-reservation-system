import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommentServices } from './comment.service';

const createCommentIntoDB = catchAsync(async (req, res) => {
  const comment = await CommentServices.createCommentIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment created successfully',
    data: comment,
  });
});

const getSingleCommentByCommentId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentServices.getSingleCommentByCommentId(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment is retrieved succesfully',
    data: result,
  });
});

const getAllCommentsOfSinglePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await CommentServices.getAllCommentsOfSinglePost(postId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All comments of this Post are retrieved succesfully',
    data: result,
  });
});

const deleteSingleComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentServices.deleteSingleComment(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment is deleted succesfully',
    data: result,
  });
});

export const CommentControllers = {
  createCommentIntoDB,
  getSingleCommentByCommentId,
  getAllCommentsOfSinglePost,
  deleteSingleComment,
};
