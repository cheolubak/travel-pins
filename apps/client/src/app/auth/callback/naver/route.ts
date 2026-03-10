import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');
  const errorUri = searchParams.get('error_uri');

  return NextResponse.json({});
}
