import express from 'express';
import { CartControllers } from './cart.controller';

const router = express.Router();
router.post(
  '/add-to-card',
  //   auth(USER_ROLE.admin),
  //   validateRequest(createCarValidationSchema),
  CartControllers.addProductTocart,
);

router.get(
  '/get-All-userAddedProducts/:userId',
  //   auth(USER_ROLE.admin),
  //   validateRequest(createCarValidationSchema),
  CartControllers.getAllProductsInUserCart,
);

router.delete(
  '/remove-from-cart/:cartId',
  //   auth(USER_ROLE.admin),
  //   validateRequest(createCarValidationSchema),
  CartControllers.deleteSpecificProductFromCart,
);

router.delete(
  '/reset-user-cart/:userId',
  //   auth(USER_ROLE.admin),
  //   validateRequest(createCarValidationSchema),
  CartControllers.restetUserCart,
);

export const CartRoute = router;
