import { z } from 'zod';
import { RegionSchema } from './region';

export const TenantStatusSchema = z.enum(['active', 'inactive', 'suspended']);

export const TenantSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  region: RegionSchema,
  uid: z.uuid(),
  status: TenantStatusSchema,
  meta_data: z.object().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const TenantCreateSchema = TenantSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const TenantUpdateSchema = TenantSchema.omit({
  id: true,
  slug: true,
  created_at: true,
  updated_at: true,
});

export type Tenant = z.infer<typeof TenantSchema>;
export type TenantCreate = z.infer<typeof TenantCreateSchema>;
export type TenantUpdate = z.infer<typeof TenantUpdateSchema>;
export type TenantStatus = z.infer<typeof TenantStatusSchema>;
