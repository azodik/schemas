import { z } from 'zod';

const BaseJWKSchema = z.object({
  kty: z.literal('EC'),
  crv: z.literal('P-256'),
  alg: z.literal('ES256'),
  use: z.literal('sig'),
  ext: z.literal(true),
  kid: z.string(),
});

export const ECPublicJWKSchema = BaseJWKSchema.extend({
  x: z.string(),
  y: z.string(),
  key_ops: z.array(z.literal('verify')),
});

export const ECPrivateJWKSchema = BaseJWKSchema.extend({
  x: z.string(),
  y: z.string(),
  d: z.string(),
  key_ops: z.array(z.literal('sign')),
});

export const JWTTokenPayloadSchema = z.object({
  sub: z.uuid(),
  tenant_id: z.uuid().optional(),
  app_id: z.uuid().optional(),
  session_id: z.uuid(),
  region: z.enum(['us', 'eu', 'in']),
  type: z.enum(['user', 'member', 'owner']),
});

export const JWTSignSchema = z.object({
  payload: JWTTokenPayloadSchema,
  privateJwk: ECPrivateJWKSchema,
  options: z
    .object({
      issuer: z.string(),
      aud: z.string().optional(),
      expiresIn: z.union([z.string(), z.number()]).optional(),
    })
    .optional(),
});

export const JWTVerifySchema = z.object({
  token: z.string(),
  publicJwk: ECPublicJWKSchema,
});

export type JWTTokenPayload = z.infer<typeof JWTTokenPayloadSchema>;
export type ECPublicJWK = z.infer<typeof ECPublicJWKSchema>;
export type ECPrivateJWK = z.infer<typeof ECPrivateJWKSchema>;
export type JWTSign = z.infer<typeof JWTSignSchema>;
export type JWTVerify = z.infer<typeof JWTVerifySchema>;
