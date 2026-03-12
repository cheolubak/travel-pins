import type { NextRequest } from 'next/server';

import { externalApi } from '@travel-pins/request';
import { NextResponse } from 'next/server';

import { bffTemplate } from '@/src/features/common/helpers/bffTemplate';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ placeId: string }> },
) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    const { placeId } = await params;

    await externalApi.delete(`bookmarks/${placeId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        sessionId,
      },
    });

    return NextResponse.json({ success: true });
  });
}
