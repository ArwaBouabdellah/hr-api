import { z } from 'zod';

export const DepartmentSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  managerId: z.number().int('').positive('Invalid Manager ID'),
  parentId: z.number().int('Invalid Parent ID').optional(),
});

export type CreateDepartmentDto = z.infer<typeof DepartmentSchema>;

export const UpdateDepartmentSchema = DepartmentSchema.partial();
export type UpdateDepartmentDto = z.infer<typeof UpdateDepartmentSchema>;
