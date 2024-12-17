import express from 'express';
import { OrderHistoryControllers } from './OrderHistory.controller';
import { USER_ROLE } from '../userNew/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-OrderHistory',
  //   auth(USER_ROLE.user),
  OrderHistoryControllers.createSingleOrderHistory,
);

router.get(
  '/get-full-OrderHistory',
  //   auth(USER_ROLE.user),
  OrderHistoryControllers.getAllOrderHistory,
);

router.get(
  '/get-user-full-OrderHistory/:userId',
  //   auth(USER_ROLE.user),
  OrderHistoryControllers.getAllOrderHistoryForUser,
);

router.get(
  '/get-shop-full-OrderHistory/:shopId',
  //   auth(USER_ROLE.user),
  OrderHistoryControllers.getAllOrderHistoryForShop,
);

router.get(
  '/get-vendor-full-OrderHistory/:vendorId',
  //   auth(USER_ROLE.user),
  OrderHistoryControllers.getAllOrderHistoryForVendor,
);

router.delete(
  '/clear-full-OrderHistory',
  auth(USER_ROLE.admin),
  OrderHistoryControllers.clearFullOrderHistory,
);

export const OrderHistoryRoutes = router;
