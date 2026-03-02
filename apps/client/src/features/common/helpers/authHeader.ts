'use server';

import { cookies } from 'next/headers';

import {
  ACCESS_TOKEN_KEY,
  SESSION_ID_KEY,
} from '@/src/features/common/constants/auth';

export const authHeader = async (): Promise<Record<string, string>> => {
  const cookieStores = await cookies();
  const sessionId = cookieStores.get(SESSION_ID_KEY)?.value;
  const accessToken = cookieStores.get(ACCESS_TOKEN_KEY)?.value;

  const headers: Record<string, string> = {};

  if (sessionId) {
    headers['sessionId'] = sessionId;
  }

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return headers;
};
