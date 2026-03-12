import type { Group } from '@travel-pins/domains';
import type { NextRequest } from 'next/server';

import { externalApi } from '@travel-pins/request';
import { NextResponse } from 'next/server';

import { bffTemplate } from '@/src/features/common/helpers/bffTemplate';

export async function GET(req: NextRequest) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    const res = await externalApi.get<Group[]>('groups', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        sessionId,
      },
    });

    return NextResponse.json(res);
  });
}

export async function POST(req: NextRequest) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    const body = await req.json();

    const res = await externalApi.post('groups', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        sessionId,
      },
    });

    return NextResponse.json(res, { status: 201 });
  });
}
