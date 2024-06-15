import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { carCreateRoute } from '../modules/car/car_create_route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/cars',
    route: carCreateRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
