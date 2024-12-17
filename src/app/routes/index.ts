import { Router } from 'express';
import { userRoutes } from '../modules/userNew/userRoutes';
import { PostRoutes } from '../modules/post/post.route';

import { PaymentRoute } from '../modules/payment/payment.route';
import { ProductRoutes } from '../modules/product/product.route';
import { ShopRoutes } from '../modules/Shop/shop.route';
import { CartRoute } from '../modules/cart/cart.router';
import { ProductCategoryRoutes } from '../modules/ProductCategory/ProductCategory.route';
import { OrderHistoryRoutes } from '../modules/OrderHistory/OrderHistory.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/post',
    route: PostRoutes,
  },
  // {
  //   path: '/comment',
  //   route: CommentRoutes,
  // },
  // {
  //   path: '/follower',
  //   route: FollowerRoutes,
  // },
  {
    path: '/payment',
    route: PaymentRoute,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/shop',
    route: ShopRoutes,
  },
  {
    path: '/cart',
    route: CartRoute,
  },
  {
    path: '/productCategory',
    route: ProductCategoryRoutes,
  },
  {
    path: '/orderHistory',
    route: OrderHistoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
