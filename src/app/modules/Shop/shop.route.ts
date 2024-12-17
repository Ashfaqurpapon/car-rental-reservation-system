import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createShopValidationSchema } from './shop.validation';
import { ShopControllers } from './shop.controllers';

const router = express.Router();

// router.get('/getVendorAllshops', ProductControllers.getAllProducts);

router.post(
  '/create-shop',
  //   auth(USER_ROLE.user),
  validateRequest(createShopValidationSchema),
  ShopControllers.createShop,
);

router.get(
  '/:shopId',
  //   auth(USER_ROLE.user),
  ShopControllers.getSingleShop,
);

router.get(
  '/get-shops-byVendor/:vendorId',
  //   auth(USER_ROLE.user),
  ShopControllers.getAllShopsByVendor,
);

// router.delete(
//   '/:productId',
//   //   auth(USER_ROLE.user),
//   ProductControllers.deleteSingleProduct,
// );

router.put(
  '/update-shop/:shopId',
  //   auth(USER_ROLE.admin),
  ShopControllers.updateShoptInfo,
);

export const ShopRoutes = router;
