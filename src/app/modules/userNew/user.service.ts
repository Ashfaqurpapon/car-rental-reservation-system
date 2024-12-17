import httpStatus from 'http-status';
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';

const createUserIntoDB = async (payload: TUser) => {
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = payload.password || (config.default_password as string);

  //set student role
  if (payload.role == 'admin') {
    userData.role = 'admin';
  } else if (payload.role == 'vendor') {
    userData.role = 'vendor';
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

const getSingleUserUserId = async (id: string) => {
  const result = User.findById(id);
  return result;
};

const updateUserInfoInDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// Admin can do this
// const deleteUserAcccount = async () => {};
// const suspentUserAccount = async () => {};

export const UserServices = {
  createUserIntoDB,
  getSingleUserUserId,
  updateUserInfoInDB,
};
