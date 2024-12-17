import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createSingleUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  //console.log(`${req.body.role}`);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${req.body.role} has been registered successfully.`,
    data: result,
  });
});

const getSingleUserFromDb = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.getSingleUserUserId(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

const upadateUserInfo = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await UserServices.updateUserInfoInDB(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is updated succesfully',
    data: result,
  });
});

export const UserControllers = {
  createSingleUser,
  getSingleUserFromDb,
  upadateUserInfo,
};
