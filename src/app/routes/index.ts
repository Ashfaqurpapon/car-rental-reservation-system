import { Router } from 'express';
import { BookingRoutes } from '../modules/booking/booking.route';
import { carCreateRoute } from '../modules/car/car_create_route';
import { userRoutes } from '../modules/userNew/userRoutes';

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
