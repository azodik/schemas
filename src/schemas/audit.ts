import { z } from 'zod';

export const AuditLogActionSchema = z.enum([
  'TENANT_EMAIL_VERIFICATION',
  'TENANT_PHONE_VERIFICATION',
  'TENANT_MAGIC_LINK_VERIFICATION',
  'TENANT_SIGNUP',
  'TENANT_SIGNIN',
  'TENANT_LOGOUT',
  'TENANT_PASSWORD_RESET',
  'TENANT_EMAIL_CHANGE',
  'TENANT_PHONE_CHANGE',
  'TENANT_MAGIC_LINK',
  'TENANT_VERIFICATION',
  'USER_EMAIL_VERIFICATION',
  'USER_PHONE_VERIFICATION',
  'USER_MAGIC_LINK_VERIFICATION',
  'USER_SIGNUP',
  'USER_SIGNIN',
  'USER_LOGOUT',
  'USER_PASSWORD_RESET',
  'USER_EMAIL_CHANGE',
  'USER_PHONE_CHANGE',
  'USER_MAGIC_LINK',
  'USER_VERIFICATION',
]);

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  phone: z.string().optional().nullable(),
  tenant_id: z.string().optional().nullable(),
});

export const AuditLogOptionsSchema = z.object({
  action: AuditLogActionSchema,
  user: UserSchema,
  tenant_id: z.string().optional(),
  description: z.string().optional(),
  app_id: z.string().optional(),
  previous_data: z.string().optional(),
  new_data: z.string().optional(),
  product_slug: z.string().optional(),
});

export type AuditLogOptions = z.infer<typeof AuditLogOptionsSchema>;
export type AuditLogAction = z.infer<typeof AuditLogActionSchema>;
export type User = z.infer<typeof UserSchema>;
