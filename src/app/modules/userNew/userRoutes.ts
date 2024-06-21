import express from 'express';
import { UserControllers } from './user.controller';
import { AuthControllers } from '../Auth/auth.controllers';

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
