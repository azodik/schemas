import { z } from 'zod';
import { AppInfoSchema } from './app';

export const TemplateLanguageSchema = z.enum(['en', 'es', 'fr', 'de', 'hi']);

export const EmailTemplateSchema = z.enum([
  'welcome',
  'reset-password',
  'password-changed',
  'verify-email',
  'profile-updated',
  'password-changed',
  'email-changed',
  'phone-changed',
  'login-alert',
  'account-deleted', // not implemented
]);

export const TemplateVariablesSchema = z.record(z.string(), z.any());

export const GetTemplateSchema = z.object({
  template: EmailTemplateSchema,
  variables: TemplateVariablesSchema,
  lang: TemplateLanguageSchema.default('en').optional(),
  appInfo: AppInfoSchema,
});

export type EmailTemplate = z.infer<typeof EmailTemplateSchema>;
export type GetTemplate = z.infer<typeof GetTemplateSchema>;
export type TemplateLanguage = z.infer<typeof TemplateLanguageSchema>;
export type TemplateVariables = z.infer<typeof TemplateVariablesSchema>;
