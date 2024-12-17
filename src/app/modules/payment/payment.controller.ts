// import { initiatePayment } from './payment.utils';

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentServices } from './payment.service';
import { IPaymentData } from './payment.interface';
import { IOrderHistory } from '../OrderHistory/OrderHistory.interface';
import { Types } from 'mongoose';
import { OrderHistoryServices } from '../OrderHistory/OrderHistory.service';

const confirmationController = catchAsync(async (req, res) => {
  const { transactionId } = req.query;
  const result = await PaymentServices.confirmationPaymentService(
    transactionId as string,
    // status as string,
  );
  res.send(result);
});

const initiatePayment = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const transactionId = `TXN-${Date.now()}`;

  const paymetData: IPaymentData = {
    custormerName: 'Papon',
    customerEmail: 'p@gmail.com',
    customerAddress: '',
    transactionId: transactionId,
    totalPrice: req.body.TotalAmount,
    customerPhone: 18888888,
    paymentStatus: false,
  };

  saveOrderHistoryToDataBase(userId, transactionId, req.body);

  const result = await PaymentServices.initiatePayment(userId, paymetData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment initiate succesfully',
    data: result,
  });
});

const saveOrderHistoryToDataBase = async (
  userId: string,
  transactionId: string,
  req: IOrderHistory,
) => {
  const orderHistory: IOrderHistory = {
    userId: new Types.ObjectId(userId),
    shopId: req.shopId,
    vendorId: req.vendorId,
    NumberOfProducts: req.NumberOfProducts,
    TotalAmount: req.TotalAmount,
    transactionId: transactionId,
    isPaid: false,
  };

  // Saving order to data base
  await OrderHistoryServices.createOrderHistoryIntoDB(orderHistory);
};

export const PaymentController = {
  initiatePayment,
  confirmationController,
  saveOrderHistoryToDataBase,
};
