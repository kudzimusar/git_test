## Implementation Plan

### Phase 0: Foundations (Design, Prompts, QA) — 2–3 days
- Define user stories, acceptance criteria, and first 10 role playbooks (SDE Backend, Frontend, Data, QA, DevOps).
- Draft prompt templates and few-shot examples; create a 20-sample offline evaluation set.
- Decide hosting (Vercel + Supabase); set up repos, environments, observability, and cost guardrails.

### Phase 1: MVP Web App — 5–7 days
- Auth: LinkedIn OAuth + Email fallback.
- Resume handling: upload base resume; store securely; parse text safely.
- JD ingestion: paste job URL or JD text; fetch/parse with user consent; sanitize.
- Core AI features:
  - JD → requirements extraction → skills/gaps
  - 1-page ATS resume (DOCX/PDF) with quantified bullets
  - Outreach generator (recruiter, HM, referral), LinkedIn/Email/WhatsApp variants
  - Interview prep kit
- Share & OG: shareable result page with rich LinkedIn preview.
- Analytics: essential event tracking; cost per asset; error reporting.

Acceptance criteria
- From a LinkedIn job URL, user generates ATS DOCX/PDF + 3 outreach messages + prep kit in < 2 minutes.
- Outputs are editable and downloadable; messages are copyable; privacy and ToS are clear.

### Phase 2: Chrome Extension (MV3) — 3–5 days
- Content script: detect LinkedIn job/profile pages; inject two buttons.
- Side panel/new tab: pass page title/company/role and URL to the web app.
- No scraping beyond reading visible DOM for the current page after user action.
- QA across latest Chrome; graceful fallback to the web app if blocked.

Acceptance criteria
- On any LinkedIn job page, clicking "Tailor from this job" pre-fills the web app.
- On any profile page, "Ask for referral" opens pre-filled outreach suggestions.

### Phase 3: Recruiter Console v1 — 3–5 days
- Upload up to N resumes + JD; parse text; summarize candidates; tag skills; shortlist top-5.
- Export candidate cards (PDF or share page); store batch results.

Acceptance criteria
- For a given JD and ≥10 resumes, the tool returns a reasonable shortlist with summaries in < 2 minutes.

### Phase 4: Quality, Templates, Localization — 1–2 weeks (parallelizable)
- Expand role-specific templates; improve prompts; add language/tone/currency switches.
- Build offline evaluation harness with regression checks; add thumbs-up/down feedback.
- Add caching and small-model fallbacks to reduce cost.

### Phase 5: Payments, Admin, Compliance — 3–5 days
- Stripe subscriptions (Pro, Recruiter), usage metering, invoice receipts.
- Admin dashboard for moderation, content flags, user deletions.
- Finalize ToS/Privacy; add data export and delete-my-data endpoints.

### Architecture (high-level)
- Next.js (frontend + API routes) on Vercel; Supabase Postgres + Storage; Sentry.
- AI layer: thin service wrapping LLM + embeddings; caching; cost guardrails.
- Files: signed URLs; conversion pipeline (DOCX → PDF); background jobs if needed.

### Data Schema (draft)
- users(id, provider, email, name, headline, country, created_at)
- profiles(id, user_id, role_title, resume_file_url, skills[], languages[], created_at)
- jobs(id, user_id, source_url, title, company, location, jd_text, embedding)
- tailored_assets(id, user_id, job_id, resume_docx_url, resume_pdf_url, outreach_json, prep_json, quality_scores)
- recruiter_batches(id, recruiter_user_id, jd_text, candidate_ids[], shortlist_json)

### API Endpoints (MVP)
- POST /api/auth/linkedin/callback
- POST /api/upload/resume
- POST /api/tailor (body: job_url | jd_text, profile_id?) → tailored_assets
- GET  /share/:assetId (public share page with OG)
- POST /api/recruiter/shortlist (jd_text, resumes[])
- DELETE /api/user/data (GDPR-style delete)

### Prompts & Evaluation
- Maintain prompt templates per role and task (tailor, outreach, prep, summarize).
- Use few-shot examples with measurable outputs (keywords covered, specificity).
- Build a 20–50 sample offline eval set; track quality metrics over time.

### Analytics & Cost Controls
- Track activation, time-to-first-asset, copies/sends, thumbs, cost per asset, failures.
- Implement model usage caps per user; cache parsed JDs; truncate inputs sensibly.

### Launch Plan within LinkedIn
- Pinned group post with magic link and OG preview; short explainer video GIF.
- Weekly curated roles + direct tailor links; LinkedIn Newsletter with success stories.
- Live “Resume Tailoring Clinic” using the tool.

### Team & Responsibilities (minimal viable)
- Full-stack engineer (Next.js + API + extension)
- Prompt/AI engineer (prompts, evaluation harness)
- PM/Founder-operator (distribution, partnerships, compliance)

### Timeline Snapshot
- Week 1–2: Phase 0 + Phase 1
- Week 3: Phase 2 + Phase 3 (start)
- Week 4: Finish Phase 3; begin Phase 4
- Week 5: Phase 4; Phase 5 as needed for monetization/compliance

