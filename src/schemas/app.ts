import { z } from 'zod';

export const AppInfoSchema = z.object({
  name: z.string(),
  logo: z.string(),
  language: z.string().default('en'),
  theme: z.string().default('light'),
  privacyPolicyUrl: z.url(),
  termsOfServiceUrl: z.url(),
  cookiePolicyUrl: z.url(),
  supportUrl: z.url(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zip: z.string(),
  logoWidth: z.number().default(100).optional(),
  logoHeight: z.number().default(100).optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
});

export type AppInfo = z.infer<typeof AppInfoSchema>;
