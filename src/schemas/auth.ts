import { z } from 'zod';

export const SignInSchema = z.object({
  region: z.enum(['in', 'us', 'eu']),
  email: z.email('signin.error.invalidEmail'),
  password: z.string().min(1, 'signin.error.passwordRequired'),
});

export const SignUpSchema = z.object({
  region: z.enum(['in', 'us', 'eu']),
  user: z
    .object({
      name: z.string().min(1, 'signup.error.nameRequired'),
      email: z.string().email('signup.error.invalidEmail'),
      password: z.string().min(6, 'signup.error.passwordTooShort'),
      confirm_password: z.string().min(1, 'signup.error.confirmPasswordRequired'),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: 'signup.error.passwordsDoNotMatch',
      path: ['confirm_password'],
    }),
  subscription: z
    .object({
      product_id: z.string().optional(),
      product_slug: z.enum(['authzio']).default('authzio'),
      subscription_id: z.string().optional(),
      plan_id: z.string().optional(),
      plan_slug: z.enum(['free', 'pro', 'team']).default('free'),
      provider: z.enum(['dodo', 'stripe', 'razorpay', 'paypal', 'azodik']).default('azodik'),
      status: z.enum(['active', 'inactive', 'suspended"']).default('active'),
      start_date: z.string().optional(),
      end_date: z.string().optional(),
      frequency: z.enum(['monthly', 'yearly']).default('monthly'),
      meta_data: z.object({}).optional(),
    })
    .superRefine((data) => {
      if (data.plan_slug === 'free') {
        // Set frequency to yearly for free plan
        data.frequency = 'yearly';

        // Set start_date to today if not provided
        if (!data.start_date) {
          data.start_date = new Date().toISOString().split('T')[0];
        }

        // Set end_date to 1 year from start_date
        if (!data.end_date && data.start_date) {
          const startDate = new Date(data.start_date);
          const endDate = new Date(startDate);
          endDate.setFullYear(endDate.getFullYear() + 1);
          data.end_date = endDate.toISOString().split('T')[0];
        }
      }
    }),
});

export const ForgotPasswordSchema = z.object({
  region: z.enum(['in', 'us', 'eu']),
  email: z.email(),
});

export type SignIn = z.infer<typeof SignInSchema>;
export type SignUp = z.infer<typeof SignUpSchema>;
export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
