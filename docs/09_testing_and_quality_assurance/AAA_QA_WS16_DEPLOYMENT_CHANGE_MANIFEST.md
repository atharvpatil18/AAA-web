# ARNAV ABACUS ACADEMY (AAA) — QA-WS-16 DEPLOYMENT CHANGE MANIFEST

**Governing Baseline:** `MGT-DET-S5-REV-1.2.0-ACPT`  
**Current Working Branch:** `feat/sprint3-integration`  
**Inspected Commit Hash:** `dbe5872a219b39f924dbdfc34cd2d3508fc96321`  
**Production Main:** `a21a3d1129cc17fc6650bfd04648eb91199e6fa8` — 🔒 **STRICTLY LOCKED**  
**Assessment Date:** 2026-11-06 (16:20 IST)  
**Governance Scope:** File-by-File Manifest for Controlled Staging Deployment Readiness

---

## 1. Production Main Integrity Confirmation

- **Production Commit:** `a21a3d1129cc17fc6650bfd04648eb91199e6fa8`
- **Drift on AcademyOS Practice Platform (8 Files):** **STRICTLY 0 BYTES**
- **Direct Pushes to Main:** **ZERO / BLOCKED**
- **Production Status:** 🔒 **LOCKED**

---

## 2. File-by-File Change Manifest

The table below catalogs every modified (`M`) and untracked (`??`) file reported by `git status --short` on `feat/sprint3-integration`:

| File Path | Git Status | Technical Purpose | Required for QA-WS-16? | Security & Data Risk Analysis | Technical Dependencies | Proposed Disposition |
| :--- | :---: | :--- | :---: | :--- | :--- | :---: |
| `.gitignore` | `M` | Adds ignore rules for `.dev.vars` (local env vars) and `.wrangler/` (Wrangler local isolate state). | **YES** | **ZERO RISK (Protective).** Prevents local developer secrets and emulator cache from leaking to Git. | None | **RETAIN** |
| `docs/09_testing_and_quality_assurance/AAA_STAGE5_OPEN_CONDITIONS_AND_CLOSURE_REGISTER.md` | `M` | Master register of Stage 5 open conditions. Explicitly preserves `QA-WS-16` as **OPEN (Partially Satisfied)** pending public HTTPS preview test. | **YES** | **ZERO RISK.** Governance register tracking compliance boundaries without containing PII or secrets. | `MGT-DET-S5-REV-1.2.0-ACPT` | **RETAIN** |
| `.dev.vars.example` | `??` | Template showing environment variable names (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) with sanitized placeholder values. | **YES** (Operational) | **ZERO RISK.** Contains purely dummy placeholders (`paste_your_staging...`); zero credentials. | None | **RETAIN** |
| `docs/09_testing_and_quality_assurance/AAA_QA_WS16_PRE_EXECUTION_READINESS_REPORT.md` | `??` | Forensic audit report evaluating pre-execution readiness, frontend hook wiring, error handling, and isolation. | **YES** (Audit) | **ZERO RISK.** Markdown documentation; zero PII. | None | **RETAIN** |
| `docs/09_testing_and_quality_assurance/AAA_QA_WS16_EVIDENCE_RECONCILIATION_REPORT.md` | `??` | Independent reconciliation of local smoke-test evidence (`http://127.0.0.1:8788`), schema matching, and HTTPS requirement. | **YES** (Audit) | **ZERO RISK.** Markdown documentation; synthetic audit data only. | `WS16_LIVE_SMOKE_TEST_OUTPUT.log` | **RETAIN** |
| `scripts/run_staging_discovery_leads_migration.ps1` | `??` | PowerShell migration runner deploying `public.leads`, `lead_ref_seq_2026`, and `fn_submit_discovery_lead` to staging PostgreSQL. | **YES** (Staging Tool) | **LOW RISK (Contained).** Uses `Read-Host -AsSecureString`; enforces SSL (`PGSSLMODE=require`); rejects production hostnames. | PostgreSQL `psql.exe`, Supabase Staging Pooler | **RETAIN** |
| `scripts/test_discovery_intake_smoke.ps1` | `??` | Automated local smoke test harness running Wrangler, dispatching synthetic payload, verifying DB row, and purging test lead. | **YES** (Testing Tool) | **LOW RISK (Contained).** Uses synthetic test leads (`SYNTHETIC-SMOKE-TEST`); purges created row; no production endpoints. | Node.js, Wrangler, PowerShell | **RETAIN** |
| `supabase/migrations/20261106000000_discovery_leads_schema.sql` | `??` | Authoritative PostgreSQL DDL: sequence `public.lead_ref_seq_2026`, table `public.leads`, stored procedure `fn_submit_discovery_lead`, RLS. | **YES** (Core Schema) | **ZERO RISK.** Purely additive DDL (`IF NOT EXISTS`); does not mutate or drop any existing tables; enforces RLS. | PostgreSQL `pgcrypto` | **RETAIN** |

---

## 3. Classification of Proposed Dispositions

1. **Retain for Commit (All 8 Files):**
   - Every file listed in this manifest is directly relevant to establishing durable lead persistence, running reproducible tests, or documenting governance compliance.
   - Zero files require exclusion or investigation.
   - No untracked build artifacts or secret files are present (`.dev.vars` is verified ignored by `.gitignore`).

---

*Verified and Prepared by Internal QA Review Team for Arnav Abacus Academy Executive Consideration.*
