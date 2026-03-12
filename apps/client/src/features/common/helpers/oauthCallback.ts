import { externalApi } from '@travel-pins/request';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '@/src/features/common/constants/auth';

interface OAuthConfig {
  backendEndpoint: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  tokenUrl: string;
}

interface OAuthCallbackParams {
  code: string;
  config: OAuthConfig;
  redirectTo: string;
  sessionId: string;
}

export async function oauthCallback({
  code,
  config,
  redirectTo,
  sessionId,
}: OAuthCallbackParams) {
  const formData = new FormData();
  formData.append('grant_type', 'authorization_code');
  formData.append('client_id', config.clientId);
  formData.append('client_secret', config.clientSecret);
  formData.append('redirect_uri', config.redirectUri);
  formData.append('code', code);

  const res = await fetch(config.tokenUrl, {
    body: formData,
    method: 'POST',
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: '토큰 교환 실패' },
      { status: 500 },
    );
  }

  const token: { access_token: string } = await res.json();

  const { accessToken, refreshToken } = await externalApi.post<{
    accessToken: string;
    refreshToken: string;
  }>(config.backendEndpoint, {
    accessToken: token.access_token,
    sessionId,
  });

  const cookieStore = await cookies();
  const cookieOptions = {
    httpOnly: true,
    path: '/',
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
  };

  cookieStore.set(ACCESS_TOKEN_KEY, accessToken, cookieOptions);
  cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, cookieOptions);

  return NextResponse.redirect(redirectTo, { status: 307 });
}
