import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  id: z.uuid(),
  name: z.string(),
  profileImage: z.string().nullish(),
  provider: z.enum(['KAKAO', 'NAVER', 'GOOGLE']),
});

export type User = z.infer<typeof userSchema>;
