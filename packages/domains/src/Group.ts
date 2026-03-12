import { z } from 'zod';

export const groupSchema = z.object({
  coverImage: z.string().nullish(),
  createdAt: z.string(),
  createdBy: z.uuid(),
  description: z.string().nullish(),
  id: z.uuid(),
  memberCount: z.number().default(0),
  name: z.string(),
});

export type Group = z.infer<typeof groupSchema>;

export const groupCreateSchema = z.object({
  description: z.string().optional(),
  name: z.string().min(1).max(50),
});

export type GroupCreate = z.infer<typeof groupCreateSchema>;

export const groupMemberSchema = z.object({
  joinedAt: z.string(),
  role: z.enum(['OWNER', 'MEMBER']),
  userId: z.uuid(),
  userName: z.string(),
  userProfileImage: z.string().nullish(),
});

export type GroupMember = z.infer<typeof groupMemberSchema>;
