import type { Place } from '@travel-pins/domains';
import type { NextRequest } from 'next/server';

import { externalApi } from '@travel-pins/request';
import { NextResponse } from 'next/server';

import { bffTemplate } from '@/src/features/common/helpers/bffTemplate';

export async function GET(req: NextRequest) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    const res = await externalApi.get<Place[]>('users/me/places', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        sessionId,
      },
    });

    return NextResponse.json(res);
  });
}
