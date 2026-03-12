import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  SESSION_ID_KEY,
} from '@/src/features/common/constants/auth';

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
  cookieStore.delete(SESSION_ID_KEY);

  return NextResponse.json({ success: true });
}
