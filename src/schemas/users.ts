import { z } from 'zod';

export const UserStatusSchema = z.enum(['active', 'inactive', 'suspended']);
export const UserTypeSchema = z.enum(['owner', 'member', 'user']);
export const UserSchema = z.object({
  id: z.uuid(),
  tenant_id: z.uuid().optional(),
  app_id: z.uuid().optional(),
  name: z.string(),
  email: z.email(),
  email_verified: z.boolean().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  avatar: z.string().optional(),
  phone: z.string().optional(),
  phone_verified: z.boolean().optional(),
  gender: z.string().optional(),
  dob: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zip: z.string().optional(),
  locale: z.string().optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
  currency: z.string().optional(),
  mfa_enabled: z.boolean().optional(),
  mfa_enforced: z.boolean().optional(),
  type: UserTypeSchema.optional(),
  meta_data: z.object().optional(),
  status: UserStatusSchema.optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const UserCreateSchema = UserSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const UserUpdateSchema = UserSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const UserSelectSchema = UserSchema.omit({ password: true });
export type UserStatus = z.infer<typeof UserStatusSchema>;
export type UserType = z.infer<typeof UserTypeSchema>;
export type User = z.infer<typeof UserSelectSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
