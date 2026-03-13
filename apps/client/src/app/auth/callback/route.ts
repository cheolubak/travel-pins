import type { NextRequest } from 'next/server';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { bffTemplate } from '@/src/features/common/helpers/bffTemplate';
import { oauthCallback } from '@/src/features/common/helpers/oauthCallback';

const KAKAO_STATE_COOKIE = 'tp_kakao_state';

export async function GET(req: NextRequest) {
  return bffTemplate(req, async ({ sessionId }) => {
    const code = req.nextUrl.searchParams.get('code');
    const state = req.nextUrl.searchParams.get('state');

    if (
      !code ||
      !state ||
      !process.env.KAKAO_REST_KEY ||
      !process.env.KAKAO_CLIENT_SECRET
    ) {
      return NextResponse.json({}, { status: 400 });
    }

    const cookieStore = await cookies();
    const savedState = cookieStore.get(KAKAO_STATE_COOKIE)?.value;

    if (state !== savedState) {
      return NextResponse.json(
        { message: 'Invalid state' },
        { status: 403 },
      );
    }

    cookieStore.delete(KAKAO_STATE_COOKIE);

    return oauthCallback({
      code,
      config: {
        backendEndpoint: 'auth/kakao',
        clientId: process.env.KAKAO_REST_KEY,
        clientSecret: process.env.KAKAO_CLIENT_SECRET,
        redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        tokenUrl: 'https://kauth.kakao.com/oauth/token',
      },
      redirectTo: new URL('/', req.url).toString(),
      sessionId,
    });
  });
}
