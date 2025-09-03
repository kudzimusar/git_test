import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { job_url: jobUrl, jd_text: jobDescription } = body ?? {};

  if (!jobUrl && !jobDescription) {
    return NextResponse.json(
      { error: 'Provide job_url or jd_text' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    result: 'ok',
    assets: {
      resume_docx_url: null,
      resume_pdf_url: null,
      outreach_json: [],
      prep_json: {},
    },
    note: 'Placeholder response. AI generation not yet wired.'
  });
}

