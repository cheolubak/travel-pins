import { z } from 'zod';

export const reviewSchema = z.object({
  content: z.string(),
  createdAt: z.string(),
  id: z.uuid(),
  images: z.array(z.string()).default([]),
  placeId: z.uuid(),
  rating: z.number().min(1).max(5),
  userId: z.uuid(),
  userName: z.string(),
  userProfileImage: z.string().nullish(),
});

export type Review = z.infer<typeof reviewSchema>;

export const reviewCreateSchema = z.object({
  content: z.string().min(1).max(1000),
  images: z.array(z.string()).default([]),
  rating: z.number().min(1).max(5),
});

export type ReviewCreate = z.infer<typeof reviewCreateSchema>;
