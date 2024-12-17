import express from 'express';
import { USER_ROLE } from '../userNew/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { CommentControllers } from './comment.controller';
import { createCommentValidationSchema } from './comment.validation.schema';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/:id',
  auth(USER_ROLE.user),
  CommentControllers.getSingleCommentByCommentId,
);

router.get(
  '/comment/:postId',
  auth(USER_ROLE.user),
  CommentControllers.getAllCommentsOfSinglePost,
);

router.post(
  '/create-comment',
  auth(USER_ROLE.user),
  validateRequest(createCommentValidationSchema),
  CommentControllers.createCommentIntoDB,
);

router.delete(
  '/:id',
  auth(USER_ROLE.user),
  CommentControllers.deleteSingleComment,
);

export const CommentRoutes = router;
