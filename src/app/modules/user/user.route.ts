import express from 'express';
// import { createUserValidationSchema } from 'userValidations';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { createUserValidationSchema } from './user.validation';
import { AuthControllers } from '../Auth/auth.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

// router.post(
//   '/signup',
//   auth(USER_ROLE.admin),
//   validateRequest(createStudentValidationSchema),
//   UserControllers.createStudent,
// );

router.post(
  '/signup',
  //validateRequest(createUserValidationSchema),
  UserControllers.createSingleUser,
);

router.post('/signin', AuthControllers.loginUser);

export const userRoutes = router;
