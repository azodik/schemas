import { z } from 'zod';

export const PushDeviceSchema = z.object({
  token: z.string(),
  device: z.enum(['ios', 'android', 'web']),
});

export const PushAttachmentSchema = z.object({
  path: z.string(),
  filename: z.string().optional(),
  content: z.string().optional(),
  contentType: z.string().optional(),
});

export const PushNotificationSchema = z.object({
  to: z.array(PushDeviceSchema),
  title: z.string().min(1),
  body: z.string().min(1),
  attachments: z.array(PushAttachmentSchema).optional(),
  meta_data: z.record(z.string(), z.any()).optional(),
});

export const PushChannelSchema = z.object({
  type: z.literal('push'),
  data: PushNotificationSchema,
});

export type PushChannel = z.infer<typeof PushChannelSchema>;
export type PushNotification = z.infer<typeof PushNotificationSchema>;
export type PushAttachment = z.infer<typeof PushAttachmentSchema>;
export type PushDevice = z.infer<typeof PushDeviceSchema>;
