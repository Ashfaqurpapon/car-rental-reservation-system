import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';

const createSingleUser = catchAsync(async (req, res) => {
  //console.log(req.body);

  const result = await UserServices.createUserIntoDB(req.body);
  //console.log(`${req.body.role}`);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${req.body.role} has been registered successfully.`,

    data: result,
  });
});

export const UserControllers = {
  createSingleUser,
};
