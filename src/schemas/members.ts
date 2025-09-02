import { z } from "zod";
import { UserSchema } from "./users";

export const TenantMemberSchema = z.object({
  id: z.uuid(),
  tenant_id: z.uuid(),
  email: z.string(),
  uid: z.uuid(),
  invite_code: z.string(),
  role: z.enum(["admin", "member"]),
  status: z.enum(["invited", "accepted", "rejected"]),
  meta_data: z.object().optional(),
  added_by: z.uuid().optional(),
  accepted_at: z.string().optional(),
  rejected_at: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  user: UserSchema,
});

export const TenantMemberCreateSchema = TenantMemberSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const TenantMemberUpdateSchema = TenantMemberSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type TenantMember = z.infer<typeof TenantMemberSchema>;
export type TenantMemberCreate = z.infer<typeof TenantMemberCreateSchema>;
export type TenantMemberUpdate = z.infer<typeof TenantMemberUpdateSchema>;
