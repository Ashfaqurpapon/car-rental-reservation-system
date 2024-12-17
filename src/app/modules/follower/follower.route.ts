import express from 'express';
import { USER_ROLE } from '../userNew/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { FollowerControllers } from './follower.controller';
import { createFollowerValidationSchema } from './follower.validation.schema';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/get-followers',
  auth(USER_ROLE.user),
  FollowerControllers.getFollowers,
);

router.get(
  '/get-following',
  auth(USER_ROLE.user),
  FollowerControllers.getFollowing,
);

router.get(
  '/get-otherUser-followers/:Id',
  auth(USER_ROLE.user),
  FollowerControllers.getOtheruserFollowers,
);

router.get(
  '/get-otherUser-following/:Id',
  auth(USER_ROLE.user),
  FollowerControllers.getOtheruserFollowing,
);

router.post(
  '/add-follower/:followerId',
  auth(USER_ROLE.user),
  validateRequest(createFollowerValidationSchema),
  FollowerControllers.followUser,
);

router.delete(
  '/remove-follower/:followerId',
  auth(USER_ROLE.user),
  FollowerControllers.unfollowUser,
);

export const FollowerRoutes = router;
