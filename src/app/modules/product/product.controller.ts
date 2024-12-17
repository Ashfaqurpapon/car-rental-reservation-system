import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const getAllProducts = catchAsync(async (req, res) => {
  const products = await ProductServices.getAllProducts();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products retrieved successfully',
    data: products,
  });
});

const createProduct = catchAsync(async (req, res) => {
  const product = await ProductServices.createProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product created successfully',
    data: product,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProductByProductID(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is retrieved succesfully',
    data: result,
  });
});

const updateProductInfo = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.updateProductInfoInDB(
    productId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is updated succesfully',
    data: result,
  });
});

const deleteSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.deleteProductFromDB(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is deleted successfully',
    data: result,
  });
});

export const ProductControllers = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProductInfo,
  deleteSingleProduct,
};
