import { z } from 'zod';

import { placeSchema } from './Place';

export const reviewSummarySchema = z.object({
  content: z.string(),
  createdAt: z.string(),
  id: z.uuid(),
  images: z.array(z.string()).default([]),
  rating: z.number().min(1).max(5),
  userId: z.uuid(),
  userName: z.string(),
  userProfileImage: z.string().nullish(),
});

export type ReviewSummary = z.infer<typeof reviewSummarySchema>;

export const placeDetailSchema = placeSchema.extend({
  images: z.array(z.string()).default([]),
  isBookmarked: z.boolean().default(false),
  reviewCount: z.number().default(0),
  reviews: z.array(reviewSummarySchema).default([]),
});

export type PlaceDetail = z.infer<typeof placeDetailSchema>;
