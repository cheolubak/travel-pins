import { z } from 'zod';

export const placeSchema = z.object({
  address: z.string(),
  category: z.object({
    name: z.string(),
  }),
  detailAddress: z.string().nullish(),
  id: z.uuid(),
  lat: z.number(),
  lng: z.number(),
  name: z.string(),
  postcode: z.string(),
  thumbnail: z.string().nullish(),
  type: z.enum(['CAFE', 'FOOD', 'STORE', 'PLACE']),
});

export type Place = z.infer<typeof placeSchema>;
