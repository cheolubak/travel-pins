import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { bffTemplate } from '@/src/features/common/helpers/bffTemplate';
import { oauthCallback } from '@/src/features/common/helpers/oauthCallback';

export async function GET(req: NextRequest) {
  return bffTemplate(req, async ({ sessionId }) => {
    const code = req.nextUrl.searchParams.get('code');

    if (
      !code ||
      !process.env.GOOGLE_CLIENT_ID ||
      !process.env.GOOGLE_CLIENT_SECRET
    ) {
      return NextResponse.json({}, { status: 400 });
    }

    return oauthCallback({
      code,
      config: {
        backendEndpoint: 'auth/google',
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/google`,
        tokenUrl: 'https://oauth2.googleapis.com/token',
      },
      redirectTo: new URL('/', req.url).toString(),
      sessionId,
    });
  });
}
