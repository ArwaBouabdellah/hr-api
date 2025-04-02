import { z } from 'zod';
import { Role } from '../enums/user.enum';

export const UserSchema = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 characters'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters'),
  email: z.string().email('Invalid email format').optional(),
  tel: z
    .string()
    .min(8, 'Phone number must be at minimum 8 digits')
    .max(15, 'Phone number must be at maximum 15 digits')
    .regex(/^\d{8,15}$/, 'Phone number must contain only digits')
    .optional(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  departmentId: z.number().int().positive('Invalid department ID').optional(),
  role: z.enum([Role.ADMIN, Role.EMPLOYEE, Role.HR]).default(Role.EMPLOYEE),
});

export const CreateUserSchema = UserSchema.refine((data) => data.email || data.tel, {
  message: "Either 'email' or 'tel' must be provided",
  path: ['email', 'tel'],
});
export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = UserSchema.partial();
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
