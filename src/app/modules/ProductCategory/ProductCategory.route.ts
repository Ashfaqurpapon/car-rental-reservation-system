import express from 'express';
import { ProductCategoryControllers } from './ProductCategory.controller';

const router = express.Router();

router.get('/', ProductCategoryControllers.getAllProductCategory);

router.post(
  '/create-productCategory',
  //   auth(USER_ROLE.user),
  //   validateRequest(createProductValidationSchema),
  ProductCategoryControllers.createProductCategory,
);

router.get(
  '/get-allProductsBy-productCategory/:productCategoryId',
  //   auth(USER_ROLE.user),
  //   validateRequest(createProductValidationSchema),
  ProductCategoryControllers.getAllProductsByCategory,
);

export const ProductCategoryRoutes = router;
