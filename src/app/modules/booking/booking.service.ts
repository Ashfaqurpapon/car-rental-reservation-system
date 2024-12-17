import httpStatus from 'http-status';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import AppError from '../../errors/AppError';
import { Car } from '../car/car_create_model';
import mongoose from 'mongoose';

const getBookingsByCarAndDate = async (query: Record<string, unknown>) => {
  //console.log('paps');
  try {
    //const objectIdCarId = mongoose.Types.ObjectId(carId);
    const bookings = await Booking.find(query)
      .populate('user')
      .populate('carId');
    if (!bookings) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create newBooking');
    }
    return bookings;
  } catch (err: any) {
    throw new Error(err);
  }
};

const createSingleBookingIntoDB = async (payload: TBooking) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const checkAlleradyBooking = await Car.findById(payload.carId);
    if (!checkAlleradyBooking) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Sorry car is not execite');
    }
    if (checkAlleradyBooking?.status === 'unavailable') {
      throw new AppError(httpStatus.BAD_REQUEST, 'Sorry car is unavailbe');
    }

    await Car.findByIdAndUpdate(
      payload.carId,
      {
        status: 'unavailable',
      },
      { new: true, session },
    );

    const newBooking = await Booking.create([payload], { session });
    if (!newBooking.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create newBooking');
    }
    await session.commitTransaction();
    await session.endSession();

    const rslt = await Booking.findById(newBooking[0]._id)
      .populate('user')
      .populate('carId');

    return rslt;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getUserBookings = async (userId: string) => {
  //console.log('Limon');
  //console.log(userId);
  try {
    const result = await Booking.find({
      user: userId,
    })
      .populate('user')
      .populate('carId');
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
  getBookingsByCarAndDate,
  createSingleBookingIntoDB,
  getUserBookings,
};
