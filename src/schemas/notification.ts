import { z } from 'zod';
import { EmailChannelSchema } from './email';
import { SMSChannelSchema } from './sms';
import { PushChannelSchema } from './push';
import { InAppChannelSchema } from './in-app';

export type NotificationChannelType = 'email' | 'sms' | 'push' | 'in_app';
export const NotificationSenderTypeSchema = z.enum(['system', 'user']);
export const NotificationChannelSchema = z.discriminatedUnion('type', [
  EmailChannelSchema,
  SMSChannelSchema,
  PushChannelSchema,
  InAppChannelSchema,
]);

export const NotificationSchema = z.object({
  tenant_id: z.uuid({ message: 'Tenant ID is required' }),
  app_id: z.uuid({ message: 'App ID is required' }).optional(),
  uid: z.uuid({ message: 'User ID is required' }),
  type: NotificationSenderTypeSchema.default('system'),
  channels: z.array(NotificationChannelSchema).min(1),
});
export type NotificationChannel = z.infer<typeof NotificationChannelSchema>;
export type Notification = z.infer<typeof NotificationSchema>;
export type NotificationSenderType = z.infer<typeof NotificationSenderTypeSchema>;
