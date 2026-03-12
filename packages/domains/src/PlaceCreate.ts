import { z } from 'zod';

export const placeCreateSchema = z.object({
  address: z.string().min(1),
  detailAddress: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
  name: z.string().min(1).max(100),
  postcode: z.string().optional(),
  type: z.enum(['CAFE', 'FOOD', 'STORE', 'PLACE']),
});

export type PlaceCreate = z.infer<typeof placeCreateSchema>;
