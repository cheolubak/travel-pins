import type { User } from '@travel-pins/domains';
import type { NextRequest } from 'next/server';

import { userSchema } from '@travel-pins/domains';
import { externalApi } from '@travel-pins/request';
import { NextResponse } from 'next/server';

import { bffTemplate } from '@/src/features/common/helpers/bffTemplate';

export async function GET(req: NextRequest) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    if (!accessToken) {
      return NextResponse.json({ user: null });
    }

    try {
      const res = await externalApi.get<User>('auth/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          sessionId,
        },
      });

      return NextResponse.json({ user: userSchema.parse(res) });
    } catch {
      return NextResponse.json({ user: null });
    }
  });
}
