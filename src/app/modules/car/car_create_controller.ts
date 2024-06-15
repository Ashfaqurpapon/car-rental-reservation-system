import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { carCreateServices } from './car_create_service';
import { Request, Response } from 'express';

const createCar = catchAsync(async (req: Request, res: Response) => {
  const result = await carCreateServices.createCarIntoDB(req.body);
  //console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car is created successfully!',
    data: result,
  });
});

const getAllACreatedCar = catchAsync(async (req, res) => {
  const result = await carCreateServices.getAllCreatedCarFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
});
// const getSingleCreatedCar = catchAsync(async (req, res) => {
//   const { cardId } = req.params;
//   console.log(req.params);
//   console.log(cardId);

//   const result = await carCreateServices.getSingleCreatedCarFromDB(cardId);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic department is retrieved succesfully',
//     data: result,
//   });
// });
const getSingleCreatedCar = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await carCreateServices.getSingleCreatedCarFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car is retrieved succesfully',
    data: result,
  });
});
const updateCreatedCar = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await carCreateServices.updateSingleCreatedCarFromDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is updated successfully',
    data: result,
  });
});
const deleteSingleCreatedCar = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await carCreateServices.deleteSingleCreatedCarFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'car  is deleted successfully',
      data: result,
    });
  },
);

export const carCreateController = {
  createCar,
  getAllACreatedCar,
  getSingleCreatedCar,
  updateCreatedCar,
  deleteSingleCreatedCar,
};