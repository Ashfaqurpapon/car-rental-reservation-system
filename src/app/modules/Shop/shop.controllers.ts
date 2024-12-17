import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ShopServices } from './shop.service';

// const getAllShops = catchAsync(async (req, res) => {});

const createShop = catchAsync(async (req, res) => {
  const product = await ShopServices.createShopIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shop created successfully',
    data: product,
  });
});

const getSingleShop = catchAsync(async (req, res) => {
  const { shopId } = req.params;
  const result = await ShopServices.getSingleShopByShopId(shopId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shop is retrieved succesfully',
    data: result,
  });
});

const getAllShopsByVendor = catchAsync(async (req, res) => {
  const { vendorId } = req.params;
  const result = await ShopServices.getAllVendorShops(vendorId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'This vendor shops is retrieved succesfully',
    data: result,
  });
});

const updateShoptInfo = catchAsync(async (req, res) => {
  const { shopId } = req.params;
  const result = await ShopServices.updateShopInfoInDB(shopId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shop is updated succesfully',
    data: result,
  });
});

// const deleteSingleProduct = catchAsync(async (req, res) => {
//   const { productId } = req.params;
//   const result = await ProductServices.deleteProductFromDB(productId);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Product is deleted successfully',
//     data: result,
//   });
// });

export const ShopControllers = {
  createShop,
  getSingleShop,
  // deleteSingleProduct,
  updateShoptInfo,
  getAllShopsByVendor,
};
