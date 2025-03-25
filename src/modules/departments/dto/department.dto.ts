import { z } from 'zod';

export const DepartmentSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  managerId: z.number().int('').positive('Invalid Manager ID'),
});

const result = DepartmentSchema.safeParse({
  name: 'string',
  description: 'string',
  isActive: true,
  managerId: 'jj',
});

console.log(result);

export type CreateDepartmentDto = z.infer<typeof DepartmentSchema>;

export const UpdateDepartmentSchema = DepartmentSchema.partial();
export type UpdateDepartmentDto = z.infer<typeof UpdateDepartmentSchema>;
