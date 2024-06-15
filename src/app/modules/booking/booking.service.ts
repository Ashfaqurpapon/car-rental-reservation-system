import httpStatus from 'http-status';
import { TBooking, TReturnBooking } from './booking.interface';
import { Booking } from './booking.model';
import AppError from '../../errors/AppError';

const createSingleBookingIntoDB = async (payload: TBooking) => {
  try {
    const newBooking = (await Booking.create(payload)).populate('user');
    if (!newBooking) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create newBooking');
    }
    return newBooking;
  } catch (err: any) {
    throw new Error(err);
  }
};

const getUserBookings = async (userId: string) => {
  console.log('Limon');
  console.log(userId);
  try {
    const result = await Booking.findOne({
      user: userId,
    }).populate('user');
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `This user is not  belong to this `,
      );
    }
    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const returnBookedCar = async (returnInfo: TReturnBooking) => {
  try {
    const result = await Booking.findByIdAndUpdate(returnInfo.bookingId, {
      endTime: '15:00',
    });
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `This user is not  belong to this `,
      );
    }
    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const BookingServices = {
  createSingleBookingIntoDB,
  getUserBookings,
  returnBookedCar,
};
