import { z } from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    role: z.enum(['user', 'admin', 'vendor']),
    password: z.string().min(1, 'Password is required'),
    phone: z.string().min(1, 'Phone number is required'),
    address: z.string().min(1, 'Address is required'),
    imageUrlID: z.string().optional().default(''),
    isPremium: z.boolean().optional().default(false),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
