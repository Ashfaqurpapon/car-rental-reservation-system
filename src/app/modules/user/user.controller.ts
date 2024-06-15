import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';

const createSingleUser = catchAsync(async (req, res) => {
  const { student: studentData } = req.body;
  const result = await UserServices.createUserIntoDB(studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const UserControllers = {
  createSingleUser,
};
