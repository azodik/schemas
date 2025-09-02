import { z } from 'zod';
import { TemplateLanguageSchema, EmailTemplateSchema, TemplateVariablesSchema } from './templates';
import { AppInfoSchema } from './app';

// Base schemas
export const EmailProviderSchema = z.enum(['resend', 'sendgrid', 'ses', 'smtp']);

// Optimized provider configs with shared fields
const BaseProviderConfig = z.object({
  provider: EmailProviderSchema,
});

export const EmailProviderConfigSchema = z.discriminatedUnion('provider', [
  BaseProviderConfig.extend({
    provider: z.literal('resend'),
    apiKey: z.string().min(1),
  }),
  BaseProviderConfig.extend({
    provider: z.literal('sendgrid'),
    apiKey: z.string().min(1),
  }),
  BaseProviderConfig.extend({
    provider: z.literal('ses'),
    accessKeyId: z.string().min(1),
    secretAccessKey: z.string().min(1),
    region: z.string().min(1),
  }),
  BaseProviderConfig.extend({
    provider: z.literal('smtp'),
    host: z.string().min(1),
    port: z.number().int().positive(),
    username: z.string().min(1),
    password: z.string().min(1),
  }),
]);

// Optimized recipient schema
export const EmailRecipientSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

// Optimized attachment schema
export const EmailAttachmentSchema = z.object({
  path: z.string().min(1),
  filename: z.string().optional(),
  content: z.string().optional(),
  contentType: z.string().optional(),
});

// Optimized tags schemas
export const EmailTagsCreateSchema = z.object({
  tenant_id: z.uuid().optional(),
  app_id: z.uuid().optional(),
  uid: z.uuid().optional(),
  lang: z.string().default('en'),
  type: z.enum(['system', 'user']).default('system'),
});

export const EmailTagsSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

export const EmailNotificationSchema = z.object({
  to: z.array(EmailRecipientSchema).min(1),
  cc: z.array(EmailRecipientSchema).optional(),
  bcc: z.array(EmailRecipientSchema).optional(),
  from: z.email(),
  replyTo: z.email().optional(),
  subject: z.string().min(1),
  text: z.string().optional(),
  html: z.string().min(1),
  tags: z.array(EmailTagsSchema).optional(),
  attachments: z.array(EmailAttachmentSchema).optional(),
});

// Optimized channel schema
export const EmailChannelSchema = z.object({
  type: z.literal('email'),
  data: z.object({
    to: z.array(EmailRecipientSchema).min(1),
    cc: z.array(EmailRecipientSchema).optional(),
    bcc: z.array(EmailRecipientSchema).optional(),
    attachments: z.array(EmailAttachmentSchema).optional(),
  }),
  template: EmailTemplateSchema,
  lang: TemplateLanguageSchema.default('en'),
});

// Provider-specific schemas using composition
export const SendResendEmailSchema = z.object({
  payload: EmailNotificationSchema,
  config: z.object({
    apiKey: z.string().min(1),
  }),
});

export const SendSendgridEmailSchema = z.object({
  payload: EmailNotificationSchema,
  config: z.object({
    apiKey: z.string().min(1),
  }),
});

export const SendSesEmailSchema = z.object({
  payload: EmailNotificationSchema,
  config: z.object({
    accessKeyId: z.string().min(1),
    secretAccessKey: z.string().min(1),
    region: z.string().min(1),
  }),
});

export const SendEmailSchema = z.object({
  tenant_id: z.uuid().optional(),
  app_id: z.uuid().optional(),
  uid: z.uuid(),
  to: z.array(EmailRecipientSchema).min(1),
  template: EmailTemplateSchema,
  lang: TemplateLanguageSchema.default('en'),
  variables: TemplateVariablesSchema,
  type: z.enum(['system', 'user']).default('system'),
  appInfo: AppInfoSchema,
  config: z.object({
    accessKeyId: z.string().min(1),
    secretAccessKey: z.string().min(1),
    region: z.string().min(1),
    fromAddress: z.string().min(1),
    replyToAddress: z.string().min(1),
  }),
});
// Type exports
export type EmailProvider = z.infer<typeof EmailProviderSchema>;
export type EmailRecipient = z.infer<typeof EmailRecipientSchema>;
export type EmailAttachment = z.infer<typeof EmailAttachmentSchema>;
export type EmailTags = z.infer<typeof EmailTagsCreateSchema>;
export type EmailNotification = z.infer<typeof EmailNotificationSchema>;
export type EmailChannel = z.infer<typeof EmailChannelSchema>;
export type SendResendEmail = z.infer<typeof SendResendEmailSchema>;
export type SendSendgridEmail = z.infer<typeof SendSendgridEmailSchema>;
export type SendSesEmail = z.infer<typeof SendSesEmailSchema>;
export type SendEmail = z.infer<typeof SendEmailSchema>;
