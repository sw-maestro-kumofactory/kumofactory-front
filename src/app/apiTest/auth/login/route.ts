import { NextResponse } from 'next/server';

import dummyBlueprint from '@/src/assets/blueprintDummy.json';

export async function GET(request: Request) {
  return NextResponse.json({
    accessToken: 'test',
  });
}
