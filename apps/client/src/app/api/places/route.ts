import type { Place } from '@travel-pins/domains';
import type { NextRequest } from 'next/server';

import { placeSchema } from '@travel-pins/domains';
import { externalApi } from '@travel-pins/request';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const leftBottomLat = searchParams.get('leftBottomLat');
  const leftBottomLng = searchParams.get('leftBottomLng');
  const rightTopLat = searchParams.get('rightTopLat');
  const rightTopLng = searchParams.get('rightTopLng');

  const res = await externalApi.get<Place[]>('places', {
    params: {
      leftBottomLat,
      leftBottomLng,
      rightTopLat,
      rightTopLng,
    },
  });

  return NextResponse.json(placeSchema.array().parse(res));
}
