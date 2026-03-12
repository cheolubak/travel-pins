import type { PlaceDetail } from '@travel-pins/domains';
import type { NextRequest } from 'next/server';

import { placeDetailSchema } from '@travel-pins/domains';
import { externalApi } from '@travel-pins/request';
import { NextResponse } from 'next/server';

import { bffTemplate } from '@/src/features/common/helpers/bffTemplate';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    const { id } = await params;

    const res = await externalApi.get<PlaceDetail>(`places/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        sessionId,
      },
    });

    return NextResponse.json(placeDetailSchema.parse(res));
  });
}
