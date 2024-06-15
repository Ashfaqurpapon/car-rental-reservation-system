import { TUser } from './user.interface';
// import config from '../../config';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = payload.password || (config.default_password as string);

  //set student role
  if (payload.role == 'admin') {
    userData.role = 'admin';
  } else {
    userData.role = 'user';
  }

  try {
    const newUser = await User.create(payload);
    // if (!newUser.length) {
    //   throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    // }
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    return newUser;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const UserServices = {
  createUserIntoDB,
};
