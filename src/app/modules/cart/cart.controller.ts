import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CartServices } from './cart.service';

const addProductTocart = catchAsync(async (req, res) => {
  const product = await CartServices.addProductToCartDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product added to cart successfully',
    data: product,
  });
});

const getAllProductsInUserCart = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const product = await CartServices.getAllProductsInUserCart(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User cart products retrieved successfully',
    data: product,
  });
});

const deleteSpecificProductFromCart = catchAsync(async (req, res) => {
  const { cartId } = req.params;
  const product = await CartServices.deleteSpecificProductFromCart(cartId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product removed from cart successfully',
    data: product,
  });
});

const restetUserCart = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const product = await CartServices.resetUserCart(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Reseted user card successfully',
    data: product,
  });
});

export const CartControllers = {
  addProductTocart,
  getAllProductsInUserCart,
  deleteSpecificProductFromCart,
  restetUserCart,
};
