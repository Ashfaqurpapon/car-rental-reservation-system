import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ICart } from './cart.interface';
import { Cart } from './cart.model';

const addProductToCartDB = async (payLoad: ICart): Promise<ICart> => {
  //   const previousAdded = await Cart.find({
  //     userId: payLoad.userId,
  //     productId: payLoad.productId,
  //   });
  //   if (previousAdded.length > 0) {
  //     const cart = new Cart(payLoad);
  //     return await cart.save();
  //   } else {
  //     throw new AppError(httpStatus.ALREADY_REPORTED, 'Allready added product');
  //   }
  const cart = new Cart(payLoad);
  return await cart.save();
};

const getAllProductsInUserCart = async (userId: string) => {
  const products = await Cart.find({ userId: userId })
    .populate('userId')
    .populate('shopId')
    .populate('productId')
    .populate('vendorId');
  return products;
};

const deleteSpecificProductFromCart = async (cartId: string) => {
  try {
    const result = await Cart.findByIdAndDelete(cartId);
    if (result) {
      return result;
    } else {
      throw new AppError(httpStatus.NOT_FOUND, 'Error deleting cart item');
    }
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND, 'Error deleting cart item');
  }
};

const resetUserCart = async (userId: string) => {
  try {
    const result = await Cart.deleteMany({ userId });
    return result;
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND, 'Error deleting cart item');
  }
};

export const CartServices = {
  addProductToCartDB,
  deleteSpecificProductFromCart,
  getAllProductsInUserCart,
  resetUserCart,
};
