import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ICar } from './car_create_interface';
import { Car } from './car_create_model';

const createCarIntoDB = async (payLoad: ICar): Promise<ICar> => {
  const existingCar = await Car.findOne({ name: payLoad.name });
  if (existingCar) {
    throw new AppError(httpStatus.NOT_FOUND, 'This car already existe !');
  }

  const car = new Car(payLoad);
  return await car.save();
};
const getAllCreatedCarFromDB = async () => {
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

export const carCreateServices = {
  createCarIntoDB,
  getAllCreatedCarFromDB,
  getSingleCreatedCarFromDB,
  updateSingleCreatedCarFromDB,
  deleteSingleCreatedCarFromDB,
};
