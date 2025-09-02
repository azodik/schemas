import { z } from 'zod';
// Attachment for push & in-app
export const InAppAttachmentSchema = z.object({
  path: z.string(),
  filename: z.string().optional(),
  content: z.string().optional(),
  contentType: z.string().optional(),
});

export const InAppNotificationSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  attachments: z.array(InAppAttachmentSchema).optional(),
  meta_data: z.record(z.string(), z.any()).optional(),
});

export const InAppChannelSchema = z.object({
  type: z.literal('in_app'),
  data: InAppNotificationSchema,
});

export type InAppChannel = z.infer<typeof InAppChannelSchema>;
export type InAppNotification = z.infer<typeof InAppNotificationSchema>;
export type InAppAttachment = z.infer<typeof InAppAttachmentSchema>;
