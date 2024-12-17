import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Follower } from './follower.model';
import { Types } from 'mongoose';

const followUser = async (userId: string, followerId: string) => {
  try {
    await insertUser(userId);
    await insertUser(followerId);

    await Follower.findOneAndUpdate(
      { userId: userId }, // Find the document where the `userId` matches
      { $addToSet: { following: followerId } }, // Add the `followerId` to the following array
    );

    await Follower.findOneAndUpdate(
      { userId: followerId }, // Find the document where the `userId` is the follower's ID
      { $addToSet: { followers: userId } }, // Add the `userId` to the followers array
    );

    return { success: true, message: 'User followed successfully' };
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND, 'Error following user');
  }
};

const unfollowUser = async (userId: string, followerId: string) => {
  try {
    // Remove target user from current user's following list
    await Follower.findOneAndUpdate(
      { userId: userId }, // Find the document where `userId` matches the current user
      { $pull: { following: followerId } }, // Remove the `followerId` from the following array
    );

    // Remove current user from target user's followers list
    await Follower.findOneAndUpdate(
      { userId: followerId }, // Find the document where `userId` matches the follower's ID
      { $pull: { followers: userId } }, // Remove the `userId` from the followers array
    );
    return { success: true, message: 'User unfollowed successfully' };
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND, 'Error unfollowing user');
  }
};

const getFollowers = async (userId: string) => {
  try {
    const user = await Follower.findOne({ userId: userId });
    return { success: true, followers: user };
  } catch (error) {
    return { success: false, message: 'Error retrieving followers', error };
  }
};

const getFollowing = async (userId: string) => {
  try {
    const currentUser = await Follower.findOne({ userId: userId });
    return { success: true, following: currentUser };
  } catch (error) {
    return { success: false, message: 'Error retrieving following', error };
  }
};

const insertUser = async (userId: string) => {
  const currentUser = await Follower.findOne({ userId: userId });
  console.log('Function is called');
  console.log(currentUser);

  if (!currentUser) {
    console.log('user is not find');
    // Create the current user if they do not exist
    const currentUserObjectId = new Types.ObjectId(userId);
    const currentUserP = new Follower({
      userId: currentUserObjectId,
      followers: [],
      following: [],
    });
    await currentUserP.save();
  }
};

export const FollowerServices = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
