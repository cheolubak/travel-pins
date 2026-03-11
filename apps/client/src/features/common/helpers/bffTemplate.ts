import type { NextRequest } from 'next/server';

import { FetchError } from '@travel-pins/request';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import {
  ACCESS_TOKEN_KEY,
  SESSION_ID_KEY,
} from '@/src/features/common/constants/auth';

export const bffTemplate = async (
  req: NextRequest,
  work: (info: {
    accessToken?: string | null;
    sessionId: string;
  }) => Promise<NextResponse>,
) => {
  try {
    const cookieStores = await cookies();

    const sessionId = cookieStores.get(SESSION_ID_KEY)?.value || uuidv4();
    const accessToken = cookieStores.get(ACCESS_TOKEN_KEY)?.value;

    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    cookieStores.set(SESSION_ID_KEY, sessionId, {
      expires,
    });

    return await work({ accessToken, sessionId });
  } catch (e) {
    const status = e instanceof FetchError ? e.status : 500;
    return NextResponse.json({ message: '오류' }, { status });
  }
};
