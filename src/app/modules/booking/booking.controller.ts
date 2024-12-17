import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';
const getBookingsByCarAndDate = catchAsync(async (req, res) => {
  const { carId, date } = req.query;
  //console.log(req.query);
  const bookings = await BookingServices.getBookingsByCarAndDate(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bookings retrieved successfully',
    data: bookings,
  });
});

const createSingleBooking = catchAsync(async (req, res) => {
  req.body.user = req.user.userId;
  const result = await BookingServices.createSingleBookingIntoDB(req.body);

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

export const BookingControllers = {
  getBookingsByCarAndDate,
  createSingleBooking,
  getUserBookings,
};
