import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderHistoryServices } from './OrderHistory.service';

const createSingleOrderHistory = catchAsync(async (req, res) => {
  const result = await OrderHistoryServices.createOrderHistoryIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order history created successfully',
    data: result,
  });
});

const getAllOrderHistory = catchAsync(async (req, res) => {
  const result = await OrderHistoryServices.getAllOrderHistoryIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order history fetched successfully',
    data: result,
  });
});

const getAllOrderHistoryForUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result =
    await OrderHistoryServices.getAllOrderHistoryForUserIntoDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order history for this user fetched successfully',
    data: result,
  });
});

const getAllOrderHistoryForShop = catchAsync(async (req, res) => {
  const { shopId } = req.params;
  const result =
    await OrderHistoryServices.getAllOrderHistoryForShopIntoDB(shopId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order history for this shop fetched successfully',
    data: result,
  });
});

const getAllOrderHistoryForVendor = catchAsync(async (req, res) => {
  const { vendorId } = req.params;
  const result =
    await OrderHistoryServices.getAllOrderHistoryForVendorIntoDB(vendorId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order history for this vendor fetched successfully',
    data: result,
  });
});

const clearFullOrderHistory = catchAsync(async (req, res) => {
  const result = await OrderHistoryServices.clearAllOrderHistoryfromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order history for this vendor fetched successfully',
    data: result,
  });
});

export const OrderHistoryControllers = {
  getAllOrderHistory,
  getAllOrderHistoryForUser,
  getAllOrderHistoryForShop,
  getAllOrderHistoryForVendor,
  clearFullOrderHistory,
  createSingleOrderHistory,
};
