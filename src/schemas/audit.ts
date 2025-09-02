import { z } from 'zod';
import { UserSchema } from './users';

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

export const AuditLogSchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  action: AuditLogActionSchema,
  actor_id: z.string(),
  actor_type: z.string(),
  actor_name: z.string(),
  targets: z.string(),
  description: z.string(),
  ip_address: z.string(),
  user_agent: z.string(),
  tenant_id: z.string(),
  app_id: z.string(),
  product_slug: z.string(),
  meta_data: z.string(),
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
