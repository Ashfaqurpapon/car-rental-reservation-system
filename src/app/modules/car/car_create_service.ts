import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ICar } from './car_create_interface';
import { Car } from './car_create_model';
import { Booking } from '../booking/booking.model';
import mongoose from 'mongoose';
import { TReturnBooking } from '../booking/booking.interface';

const createCarIntoDB = async (payLoad: ICar): Promise<ICar> => {
  const existingCar = await Car.findOne({ name: payLoad.name });
  if (existingCar) {
    throw new AppError(httpStatus.NOT_FOUND, 'This car already existe !');
  }

  const car = new Car(payLoad);
  return await car.save();
};
const getAllCreatedCarFromDB = async () => {
  //console.log('This routes is called');
  const result = await Car.find();
  return result;
};
// const getSingleCreatedCarFromDB = async (id: string) => {
//   //console.log(id);

//   const result = await Car.findById(id);
//   console.log(result);

//   return result;
// };
const getSingleCreatedCarFromDB = async (id: string) => {
  //console.log(id);

  const result = await Car.findById(id);
  //console.log(result);

  return result;
};
const updateSingleCreatedCarFromDB = async (
  id: string,
  payload: Partial<ICar>,
) => {
  const isSingleCreatedCarExists = await Car.findById(id);

  if (!isSingleCreatedCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This car is not found !');
  }
  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};
const deleteSingleCreatedCarFromDB = async (id: string) => {
  const isSingleCreatedCarExists = await Car.findById(id);

  if (!isSingleCreatedCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This  car id is not found !');
  }

  const deletedSingleCreatedCar = await Car.findByIdAndDelete(id, {
    new: true,
  });

  if (!deletedSingleCreatedCar) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to delete semester registration !',
    );
  }
};

const returnBookedCar = async (returnInfo: TReturnBooking) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const befortrans = await Booking.findById(returnInfo.bookingId);
    const beforeTransCar = await Car.findById(befortrans?.carId);

    // TODO : need to check weather start time is before end time
    const totalCost = calculateTotalCost(
      befortrans?.startTime as string,
      returnInfo.endTime,
      beforeTransCar?.pricePerHour as number,
    );

    await Car.findByIdAndUpdate(
      befortrans?.carId,
      {
        status: 'available',
      },
      { new: true, session },
    );

    const result = await Booking.findByIdAndUpdate(
      returnInfo.bookingId,
      {
        endTime: returnInfo.endTime,
        totalCost: totalCost,
      },
      { new: true, session },
    )
      .populate('user')
      .populate('carId');

    const newResult = await Booking.findById(returnInfo.bookingId)
      .populate('user')
      .populate('carId');

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `This user is not  belong to this `,
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newResult;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

function calculateTotalCost(
  startTime: string,
  endTime: string,
  pricePerHour: number,
): number {
  // Convert times to hours
  const startHour = parseInt(startTime.split(':')[0]);
  const endHour = parseInt(endTime.split(':')[0]);

  // Calculate duration
  const durationHours = endHour - startHour;

  // Calculate total cost
  const totalCost = durationHours * pricePerHour;

  return totalCost;
}

export const carCreateServices = {
  createCarIntoDB,
  getAllCreatedCarFromDB,
  getSingleCreatedCarFromDB,
  updateSingleCreatedCarFromDB,
  deleteSingleCreatedCarFromDB,
  returnBookedCar,
};
