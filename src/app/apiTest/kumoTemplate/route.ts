import { NextResponse } from 'next/server';

import { dummyBlueprintList } from '@/src/assets/dummyBlueprintList';

export async function GET(request: Request) {
  return NextResponse.json(dummyBlueprintList);
}
