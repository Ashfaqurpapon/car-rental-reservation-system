import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IOrderHistory } from './OrderHistory.interface';
import { OrderHistory } from './OrderHistory.model';
import { CartServices } from '../cart/cart.service';

const createOrderHistoryIntoDB = async (
  payLoad: IOrderHistory,
): Promise<IOrderHistory> => {
  const orderHistory = new OrderHistory(payLoad);
  return await orderHistory.save();
};

const getAllOrderHistoryIntoDB = async () => {
  const result = await OrderHistory.find({ isPaid: true });
  return result;
};
const getAllOrderHistoryForUserIntoDB = async (userId: string) => {
  const result = await OrderHistory.find({ userId: userId });
  return result;
};
const getAllOrderHistoryForShopIntoDB = async (shopId: string) => {
  const result = await OrderHistory.find({ shopId: shopId });
  return result;
};
const getAllOrderHistoryForVendorIntoDB = async (vendorId: string) => {
  const result = await OrderHistory.find({ vendorId: vendorId });
  return result;
};

const updateTransactionsStatus = async (transactionId: string) => {
  try {
    const userData: IOrderHistory | null = await OrderHistory.findOne({
      transactionId,
    });

    if (userData != null && userData.userId != null) {
      const userId = userData.userId.toString();
      await CartServices.resetUserCart(userId);
    }

    const result = await OrderHistory.findOneAndUpdate(
      { transactionId },
      { $set: { isPaid: true } },
      { new: true },
    );
    return result;
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Not valid token!');
  }
};
const clearAllOrderHistoryfromDB = async () => {
  const result = await OrderHistory.deleteMany();
  return result;
};

export const OrderHistoryServices = {
  createOrderHistoryIntoDB,
  getAllOrderHistoryIntoDB,
  getAllOrderHistoryForUserIntoDB,
  getAllOrderHistoryForShopIntoDB,
  getAllOrderHistoryForVendorIntoDB,
  clearAllOrderHistoryfromDB,
  updateTransactionsStatus,
};
