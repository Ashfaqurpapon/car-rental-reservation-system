import express from 'express';
import { createBookingValidationSchema } from './booking.validation';
import validateRequest from '../../middlewares/validateRequest';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../userNew/user.constant';

const router = express.Router();
router.get('/bookings', BookingControllers.getBookingsByCarAndDate);

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(createBookingValidationSchema),
  BookingControllers.createSingleBooking,
);
router.get(
  '/',
  auth(USER_ROLE.admin),
  BookingControllers.getBookingsByCarAndDate,
);

router.get(
  '/my-bookings',
  auth(USER_ROLE.user),
  BookingControllers.getUserBookings,
);

export const BookingRoutes = router;
