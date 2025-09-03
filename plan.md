## Project Plan: LinkedIn Job Copilot (Global)

### Purpose
Build an AI-first assistant that lives alongside LinkedIn to help job seekers tailor resumes and outreach from any job post in ~60 seconds, surface warm-referral paths, and prep for interviews; and help recruiters summarize and shortlist candidates rapidly. Fully user-initiated, transparent, and ToS-friendly.

### How big is this tool?
- **MVP (2 weeks, 1–2 engineers)**: Web app with LinkedIn sign-in, resume upload, JD paste/link, ATS resume tailoring (DOCX/PDF), 3 outreach message types, interview prep kit, shareable link with rich preview. Optional: simple recruiter upload → summary.
- **V1 (4–6 weeks total)**: Add Chrome extension (two buttons on LinkedIn: "Tailor from this job" and "Ask for referral"), referral suggestions, recruiter console v1 (shortlist), analytics, cost controls, privacy controls.
- **V2 (8–10 weeks)**: Role-specific templates library, multilingual support, evaluation harness (quality scoring), job aggregation feeds, organization/team features, payments, admin.

### USP (Unique Selling Proposition)
- **From any LinkedIn job to ATS-ready resume + outreach in 60 seconds.**
- **Transparent, compliant, user-in-the-loop.** No auto-DMs or scraping; user initiates actions and copy/pastes messages.
- **Referral-first workflow.** Surfaces who to contact and gives high-conversion messages.
- **Recruiter speed.** Instant candidate summaries and shortlists from bulk resumes + JD.

### User complexity (how complex is it to use?)
- **Job seekers**: 3 steps — sign in, paste job link/upload JD, click generate → download tailored resume + copy outreach + review prep. Optional: save role profiles. Extension reduces to 1 click from the job page.
- **Recruiters**: 2 steps — upload resumes + paste JD → get shortlist + candidate cards.
- **Group admins**: Share a single "magic link" in the LinkedIn group; no setup.

### Core Modules
- **Auth & Profiles**: LinkedIn OAuth + email fallback; multiple role profiles per user.
- **JD Ingestion**: Paste job link or JD text; safe, user-provided input only.
- **Tailored Resume Generation**: Extract skills/requirements → generate 1-page ATS DOCX/PDF + impact bullets.
- **Outreach Generator**: Recruiter, hiring manager, referral messages (LinkedIn/Email/WhatsApp variants; tone/language toggles).
- **Interview Prep Kit**: Skill-gap analysis, targeted questions, behavioral prompts with STAR samples.
- **Referral Finder (lite)**: Suggest who to contact based on company and user network hints (no scraping; user-pasted names/links; provide search queries).
- **Recruiter Console (v1)**: Upload up to N resumes + JD → summaries, tags, shortlist.
- **Chrome Extension (MV3)**: Two buttons on job/profile pages; opens side panel or new tab with pre-filled context.
- **Analytics & Cost Controls**: Event tracking, model spend guardrails, quality signals.
- **Privacy & Compliance**: Data minimization, consent, retention policies, user delete.

### Tech Stack
- **Frontend**: Next.js (App Router) + React + Tailwind CSS; file upload; SSR/ISR for share pages; OG meta for rich preview.
- **Browser Extension**: Chrome MV3 (TypeScript + React for side panel); DOM-read with user action only.
- **Backend**: Next.js API routes (Node) or FastAPI (Python). For speed, prefer Next.js API routes co-located.
- **Database**: PostgreSQL (Supabase) with `pgvector` for embeddings; RLS for multi-tenant safety.
- **Object Storage**: Supabase Storage or S3-compatible (PDF/DOCX/resume files).
- **AI/ML**:
  - LLMs: OpenAI GPT-4.1/GPT-4o Mini or Anthropic Claude 3.5 for generation.
  - Embeddings: text-embedding-3-large or similar for skill/JD vectors.
  - Orchestration: Simple service layer or LangChain/LlamaIndex selectively (keep thin).
  - Prompt templates: Role-specific playbooks; system prompts with guardrails.
  - Lightweight evaluation set + offline scoring for quality.
- **Docs Generation**: `docx` or `docx-templates` for DOCX; `pdf-lib`/`puppeteer` for PDF.
- **Observability**: Sentry (frontend/backend), OpenTelemetry traces, request logging.
- **Infra/Hosting**: Vercel (frontend + API) + Supabase (DB/Storage/Auth optional) + Cloudflare CDN.
- **Payments (optional)**: Stripe for Pro/Recruiter plans.

### Data Model (high-level)
- `users`: id, auth_provider, email, name, headline, country
- `profiles`: id, user_id, role_title, base_resume_file, skills[], languages[], created_at
- `jobs`: id, user_id, source_url, title, company, location, jd_text, embeddings
- `tailored_assets`: id, user_id, job_id, resume_docx_url, resume_pdf_url, outreach_json, prep_json, quality_scores
- `recruiter_batches`: id, recruiter_user_id, jd_text, candidate_ids[], shortlist_json

### Security & Compliance
- No scraping or automated messaging. Only process content users paste or upload.
- Store minimal personal data; default 90-day retention with delete controls.
- Clear ToS/Privacy Policy; consent screens for resume processing.
- PII encryption at rest (DB + storage); signed URLs for files.

### Risks & Mitigations
- **LinkedIn ToS**: Avoid automation and scraping. Use extension only for convenience; keep actions user-driven.
- **LLM Quality Variance**: Maintain templates, few-shot examples, and offline evals; allow easy edits.
- **Costs**: Cache derivations, use small models by default, batch, truncate inputs.
- **ATS Compatibility**: Use simple layout, standard headings, no tables/images.

### KPIs
- Activation: % of users who generate at least 1 tailored asset
- Time-to-first-asset: median < 2 minutes
- Outreach copied/sent per user
- Recruiter shortlists created per week
- Interview callbacks (self-reported) and NPS
- Model cost per asset

### Roadmap Snapshot
- Week 1–2: MVP app (auth, JD → resume/outreach/prep, OG share)
- Week 3–4: Extension, referral suggestions, recruiter console v1
- Week 5–6: Templates library, localization, analytics, cost controls
- Week 7–8: Payments, admin, evaluation harness, growth motions

