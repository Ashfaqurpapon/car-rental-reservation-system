import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductCategoryServices } from './ProductCategory.service';

const createProductCategory = catchAsync(async (req, res) => {
  const products = await ProductCategoryServices.createProductCategoryIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'ProductCategory created successfully',
    data: products,
  });
});

const getAllProductCategory = catchAsync(async (req, res) => {
  const products = await ProductCategoryServices.getAllProductCategory();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'ProductCategory retrieved successfully',
    data: products,
  });
});

const getAllProductsByCategory = catchAsync(async (req, res) => {
  const { productCategoryId } = req.params;
  const products =
    await ProductCategoryServices.getAllProductsByCategory(productCategoryId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products retrieved successfully by productCategory',
    data: products,
  });
});

export const ProductCategoryControllers = {
  getAllProductCategory,
  createProductCategory,
  getAllProductsByCategory,
};
