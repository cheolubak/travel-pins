import type { NextRequest } from 'next/server';

import { FetchError } from '@travel-pins/request';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import {
  ACCESS_TOKEN_KEY,
  SESSION_ID_KEY,
} from '@/src/features/common/constants/auth';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
    const sessionId = cookieStore.get(SESSION_ID_KEY)?.value;

    const formData = await req.formData();

    const headers: Record<string, string> = {};
    if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
    if (sessionId) headers['sessionId'] = sessionId;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/upload`,
      {
        body: formData,
        headers,
        method: 'POST',
      },
    );

    if (!res.ok) {
      throw new FetchError({ message: '업로드 실패' }, res);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    const status = e instanceof FetchError ? e.status : 500;
    return NextResponse.json({ message: '업로드 오류' }, { status });
  }
}
