// car.validation.ts
import { z } from 'zod';

export const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().nonempty({ message: 'Name is required' }),
    description: z
      .string()
      .trim()
      .nonempty({ message: 'Description is required' }),
    color: z.string().trim().nonempty({ message: 'Color is required' }),
    isElectric: z.boolean({ required_error: 'isElectric is required' }),
    features: z
      .array(z.string())
      .nonempty({ message: 'Features are required' }),
    pricePerHour: z
      .number()
      .min(0, { message: 'Price per hour must be a positive number' }),
  }),
});
export const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
    color: z.string().trim().optional(),
    isElectric: z.boolean().optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z.number().min(0).optional(),
    status: z.enum(['available', 'unavailable']).optional(),
    isDeleted: z.boolean().optional(),
  }),
});
