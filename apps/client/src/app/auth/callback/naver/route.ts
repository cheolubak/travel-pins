import type { NextRequest } from 'next/server';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { bffTemplate } from '@/src/features/common/helpers/bffTemplate';
import { oauthCallback } from '@/src/features/common/helpers/oauthCallback';

const NAVER_STATE_COOKIE = 'tp_naver_state';

export async function GET(req: NextRequest) {
  return bffTemplate(req, async ({ sessionId }) => {
    const code = req.nextUrl.searchParams.get('code');
    const state = req.nextUrl.searchParams.get('state');

    if (
      !code ||
      !state ||
      !process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID ||
      !process.env.NAVER_LOGIN_CLIENT_SECRET
    ) {
      return NextResponse.json({}, { status: 400 });
    }

    const cookieStore = await cookies();
    const savedState = cookieStore.get(NAVER_STATE_COOKIE)?.value;

    if (state !== savedState) {
      return NextResponse.json(
        { message: 'Invalid state' },
        { status: 403 },
      );
    }

    cookieStore.delete(NAVER_STATE_COOKIE);

    return oauthCallback({
      code,
      config: {
        backendEndpoint: 'auth/naver',
        clientId: process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID,
        clientSecret: process.env.NAVER_LOGIN_CLIENT_SECRET,
        redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/naver`,
        tokenUrl: 'https://nid.naver.com/oauth2.0/token',
      },
      redirectTo: new URL('/', req.url).toString(),
      sessionId,
    });
  });
}

export { NAVER_STATE_COOKIE };
