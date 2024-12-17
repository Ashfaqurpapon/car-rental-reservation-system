import express from 'express';
import { UserControllers } from './user.controller';
import { AuthControllers } from '../Auth/auth.controllers';
import { USER_ROLE } from './user.constant';
import auth from '../../middlewares/auth';

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

router.get('/getUser/:userId', UserControllers.getSingleUserFromDb);

router.put(
  '/updateUser',
  auth(USER_ROLE.user),
  UserControllers.upadateUserInfo,
);

export const userRoutes = router;
