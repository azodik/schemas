import { z } from 'zod';

export const SMSSchema = z.object({
  to: z.string().min(5), // phone number
  message: z.string().min(1),
  meta_data: z.record(z.string(), z.any()).optional(),
});

export const SMSChannelSchema = z.object({
  type: z.literal('sms'),
  data: SMSSchema,
});

export type SMSChannel = z.infer<typeof SMSChannelSchema>;
export type SMS = z.infer<typeof SMSSchema>;
