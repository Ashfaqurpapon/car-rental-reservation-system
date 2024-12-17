import express from 'express';
import { ProductControllers } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createProductValidationSchema } from './product.validation';

const router = express.Router();

router.get('/', ProductControllers.getAllProducts);

router.post(
  '/create-product',
  //   auth(USER_ROLE.user),
  validateRequest(createProductValidationSchema),
  ProductControllers.createProduct,
);

router.get(
  '/:productId',
  //   auth(USER_ROLE.user),
  ProductControllers.getSingleProduct,
);

router.delete(
  '/:productId',
  //   auth(USER_ROLE.user),
  ProductControllers.deleteSingleProduct,
);

router.put(
  '/update-product/:productId',
  //   auth(USER_ROLE.admin),
  ProductControllers.updateProductInfo,
);

// router.put(
//   '/increase-like/:postId',
//   auth(USER_ROLE.user),
//   PostControllers.increaseLikesOfPost,
// );
// router.put(
//   '/decrease-like/:postId',
//   auth(USER_ROLE.user),
//   PostControllers.decreaseLikesOfPost,
// );

// router.get('/get-post-categories', PostControllers.getUniquePostCategories);

// router.get('/search-post', PostControllers.searchPostByCategory);
export const ProductRoutes = router;
