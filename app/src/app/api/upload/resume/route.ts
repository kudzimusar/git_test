import { NextResponse } from 'next/server';

export async function POST() {
  // Placeholder: accept file via multipart/form-data in future
  return NextResponse.json({ result: 'ok', note: 'Resume upload placeholder' });
}

