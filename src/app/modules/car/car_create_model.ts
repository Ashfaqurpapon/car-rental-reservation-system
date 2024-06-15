// car.model.ts
import { Schema, model } from 'mongoose';
import { ICar } from './car_create_interface';

const carSchema = new Schema<ICar>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    color: {
      type: String,
      required: [true, 'Color is required'],
      trim: true,
    },
    isElectric: {
      type: Boolean,
      required: [true, 'isElectric is required'],
    },
    features: {
      type: [String],
      required: [true, 'Features are required'],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required'],
      min: [0, 'Price per hour must be a positive number'],
    },
    status: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Car = model<ICar>('Car', carSchema);
