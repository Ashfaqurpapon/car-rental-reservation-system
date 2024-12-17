import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FollowerServices } from './follower.service';

const followUser = catchAsync(async (req, res) => {
  const { followerId } = req.params;
  const userId = req.user.userId;

  console.log('LIMON LOG : ');
  console.log(userId);

  const result = await FollowerServices.followUser(userId, followerId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Follower added successfully',
    data: result,
  });
});

const unfollowUser = catchAsync(async (req, res) => {
  const { followerId } = req.params;
  const userId = req.user.userId;
  const result = await FollowerServices.unfollowUser(userId, followerId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Follower remove successfully',
    data: result,
  });
});

const getFollowers = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await FollowerServices.getFollowers(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment created successfully',
    data: result,
  });
});

const getFollowing = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await FollowerServices.getFollowing(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment created successfully',
    data: result,
  });
});

const getOtheruserFollowers = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const result = await FollowerServices.getFollowers(Id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment created successfully',
    data: result,
  });
});

const getOtheruserFollowing = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const result = await FollowerServices.getFollowing(Id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment created successfully',
    data: result,
  });
});

export const FollowerControllers = {
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  getOtheruserFollowers,
  getOtheruserFollowing,
};
