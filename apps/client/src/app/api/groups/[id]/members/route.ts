import type { GroupMember } from '@travel-pins/domains';
import type { NextRequest } from 'next/server';

import { externalApi } from '@travel-pins/request';
import { NextResponse } from 'next/server';

import { bffTemplate } from '@/src/features/common/helpers/bffTemplate';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    const { id } = await params;

    const res = await externalApi.get<GroupMember[]>(
      `groups/${id}/members`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          sessionId,
        },
      },
    );

    return NextResponse.json(res);
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    const { id } = await params;
    const body = await req.json();

    const res = await externalApi.post(`groups/${id}/members`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        sessionId,
      },
    });

    return NextResponse.json(res, { status: 201 });
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    const { id } = await params;
    const userId = req.nextUrl.searchParams.get('userId');

    await externalApi.delete(`groups/${id}/members`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        sessionId,
      },
      params: { userId },
    });

    return NextResponse.json({ success: true });
  });
}
