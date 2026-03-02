import type { NextRequest } from 'next/server';

import { externalApi } from '@travel-pins/request';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '@/src/features/common/constants/auth';
import { bffTemplate } from '@/src/features/common/helpers/bffTemplate';

export async function GET(req: NextRequest) {
  return bffTemplate(req, async ({ sessionId }) => {
    const cookieStore = await cookies();

    const { searchParams } = req.nextUrl;

    const code = searchParams.get('code');

    if (!code || !process.env.KAKAO_REST_KEY) {
      return NextResponse.json({}, { status: 400 });
    }

    const formData = new FormData();
    formData.append('grant_type', 'authorization_code');
    formData.append('client_id', process.env.KAKAO_REST_KEY);
    formData.append('client_secret', 'mZLwBt0B1lNBPdhJ19fNRlMwWusOJwjT');
    formData.append('redirect_uri', 'http://localhost:3000/auth/callback');
    formData.append('code', code);

    const res = await fetch('https://kauth.kakao.com/oauth/token', {
      body: formData,
      method: 'POST',
    });

    if (!res.ok) {
      return NextResponse.json({}, { status: 500 });
    }

    const token: {
      access_token: string;
      expires_in: number;
      id_token?: string;
      refresh_token: string;
      refresh_token_expires_in: number;
      scope?: string;
      token_type: 'bearer';
    } = await res.json();

    const { accessToken, refreshToken } = await externalApi.post<{
      accessToken: string;
      refreshToken: string;
    }>('auth/kakao', { accessToken: token.access_token, sessionId });

    cookieStore.set(ACCESS_TOKEN_KEY, accessToken);
    cookieStore.set(REFRESH_TOKEN_KEY, refreshToken);

    return NextResponse.redirect(new URL('/', req.url), {
      status: 307,
    });
  });
}
