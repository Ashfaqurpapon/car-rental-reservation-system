import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createSingleBooking = catchAsync(async (req, res) => {
  const { booking } = req.body;
  booking.user = req.user.userId;
  const result = await BookingServices.createSingleBookingIntoDB(booking);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car booked successfully',
    data: result,
  });
});

const getUserBookings = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await BookingServices.getUserBookings(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Bookings retrieved successfully',
    data: result,
  });
});

const returnCar = catchAsync(async (req, res) => {
  const result = await BookingServices.getUserBookings(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car booked successfully',
    data: result,
  });
});

export const BookingControllers = {
  createSingleBooking,
  getUserBookings,
  returnCar,
};
