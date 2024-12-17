import express from 'express';
import { USER_ROLE } from '../userNew/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { PostControllers } from './post.controller';
import { createPostValidationSchema } from './post.validation.schema';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', PostControllers.getAllPosts);

//TODO LIMON : GET POST BY POST ID
router.get('/post/:postId', PostControllers.getSinglePost);

//TODO LIMON : GET POST BY  USER ID
router.get(
  '/user/:userId',
  auth(USER_ROLE.user),
  PostControllers.getUserAllPosts,
);

router.post(
  '/create-post',
  auth(USER_ROLE.user),
  validateRequest(createPostValidationSchema),
  PostControllers.createPost,
);

router.delete(
  '/post/:postId',
  auth(USER_ROLE.user),
  PostControllers.deleteSinglePost,
);

router.put(
  '/update-post/:postId',
  auth(USER_ROLE.admin),
  PostControllers.updatePostInfo,
);
router.put(
  '/increase-like/:postId',
  auth(USER_ROLE.user),
  PostControllers.increaseLikesOfPost,
);
router.put(
  '/decrease-like/:postId',
  auth(USER_ROLE.user),
  PostControllers.decreaseLikesOfPost,
);

router.get('/get-post-categories', PostControllers.getUniquePostCategories);

router.get('/search-post', PostControllers.searchPostByCategory);

export const PostRoutes = router;
