import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdValidator = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

export const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string({
      required_error: 'Date is required',
    }),
    carId: objectIdValidator.optional(),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().nullable().optional(),
    totalCost: z.number().min(0, 'Total cost must be positive').default(0),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
