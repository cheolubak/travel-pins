import { z } from 'zod';

export const bookmarkSchema = z.object({
  createdAt: z.string(),
  id: z.uuid(),
  placeId: z.uuid(),
  userId: z.uuid(),
});

export type Bookmark = z.infer<typeof bookmarkSchema>;
