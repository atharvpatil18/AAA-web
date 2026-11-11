# ARNAV ABACUS ACADEMY (AAA) — STAGING RUNNER REMEDIATION REPORT
## Authorised Remediation of Local Staging Execution Scripts & Concurrency Harness

**Document Reference:** `AAA_STAGING_RUNNER_REMEDIATION_REPORT`  
**Governing Authorization:** Management Directive (06-Nov-2026, Section 1)  
**Governing Management Reference:** `MGT-DET-S5-STAGING-03-CORR-01`  
**Branch:** `feat/sprint3-integration`  
**Baseline Commit:** `06c98c597735cab275b340427e841658151853a3` (`06c98c5`)  
**Production Main:** `a21a3d1129cc17fc6650bfd04648eb91199e6fa8` (🔒 **STRICTLY LOCKED**)  
**Audit & Remediation Lead:** Senior Security & Quality Assurance Engineer  
**Accountable Leadership:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)  
**Date of Completion:** 06-November-2026  

---

## 1. Executive Summary & Authorisation Boundary

Pursuant to Section 1 of the Management Directive:
> *"You are authorised to make only the four targeted corrections identified in `AAA_PRE_EXECUTION_SCRIPT_SAFETY_REVIEW.md`, together with the additional controls specified below. This is a local code-and-test remediation task only. Live database execution is NOT authorised."*

Engineering has completed the four authorized remediations across the staging execution harnesses, replacing vulnerable sequential tests with genuine two-session process concurrency, scoping destructive restore drills exclusively to synthetic canary tables, enforcing strict staging project identity and SSL, and eliminating hardcoded passphrases.

---

## 2. Itemized File-by-File Changes & Before-and-After Defect Audit

| File Path | Nature of Modification | Remediations Addressed |
| :--- | :--- | :--- |
| `scripts/run_staging_capacity_tests.ps1` | **Updated (Remediated)** | Remediation 1, Remediation 2, Reliability Controls |
| `scripts/run_staging_capacity_tests.sh` | **Updated (Remediated)** | Remediation 1, Remediation 2, Reliability Controls |
| `scripts/run_staging_restore_drill.ps1` | **Updated (Remediated)** | Remediation 1, Remediation 3, Remediation 4 |
| `scripts/staging_capacity_tests.sql` | **Updated (Remediated)** | Remediation 2 (Clean separation of sequential vs concurrent tests) |
| `supabase/migrations/20261105_micro_batches_cap_constraint.sql` | **UNTOUCHED (0 Bytes Modified)** | Read-only inspection & SHA-256 hash verification |

---

### 2.1 Remediation 1 — Staging Identity & SSL Enforcement

#### Before (Commit `06c98c5`):
- Both runners accepted arbitrary `$HostName` without validating that it was derived from the approved Supabase staging project reference.
- SSL connection mode was not enforced (`sslmode=require` was absent from environment and command lines).
- Could connect to any database if the user entered an erroneous hostname.

#### After (Remediated):
- **Approved Project Identity Validation:** The runner asserts `$ProjectRef` against the approved project reference (`aaa-web-staging`).
- **Derived Host Check:** Strict validation that `$HostName` matches exactly `db.$ProjectRef.supabase.co`. Fails closed if mismatched:
  ```powershell
  if ($HostName -ne $ExpectedHost) {
      Write-Error "SECURITY HALT: Target Host '$HostName' does not match derived staging host '$ExpectedHost'. Aborting."
      exit 1
  }
  ```
- **Production Host Guard:** Explicit regex rejects any host containing `production`, `prod`, `live`, or `arnavabacus.com`.
- **SSL Enforcement:** Sets `$env:PGSSLMODE = "require"` (PowerShell) and `export PGSSLMODE="require"` (Bash) prior to all connection calls.
- **Pre-Flight Probe:** Executes `SELECT current_database(), current_user, inet_server_addr(), version();` to verify read-only connectivity and identity before applying DDL.

---

### 2.2 Remediation 2 — Genuine Concurrent Capacity Test (TC-CAP-DB-03)

#### Before (Commit `06c98c5`):
- In `scripts/staging_capacity_tests.sql`, Seat 5 and Seat 6 were called sequentially in a single `psql` connection.
- Single-threaded execution: Seat 5 committed, leaving counter at 5, and Seat 6 saw counter at 5.
- Failed to test row locking under `SELECT ... FOR UPDATE` between two competing transactions.

#### After (Remediated):
- **Clean Separation:** `scripts/staging_capacity_tests.sql` runs sequential tests (TC-01, 02, 04, 05, 06, 07).
- **Two Independent Processes:** The runner harness orchestrates `TC-CAP-DB-03` using **two distinct, asynchronous operating system processes**:
  1. Pre-seeds batch `BATCH-TEST-CONCUR` with exactly 4 students.
  2. **Session 1:** Launched via `Start-Process` (PowerShell) / background `&` (Bash), executing:
     ```sql
     BEGIN;
     SELECT public.enroll_student_into_batch('BATCH-TEST-CONCUR', 'STD-CONCUR-005', 'Candidate 5 (Session 1)', 's1@example.com');
     SELECT pg_sleep(2.0); -- Holds FOR UPDATE row lock for 2 seconds
     COMMIT;
     ```
  3. **Staggered Lock Acquisition:** Script sleeps 500ms (`Start-Sleep -Milliseconds 500` / `sleep 0.5`) to guarantee Session 1 has acquired the exclusive row lock.
  4. **Session 2:** Launched concurrently via second background process, executing:
     ```sql
     BEGIN;
     SELECT public.enroll_student_into_batch('BATCH-TEST-CONCUR', 'STD-CONCUR-006', 'Candidate 6 (Session 2)', 's2@example.com');
     COMMIT;
     ```
  5. **Lock Contention & Rejection:** Session 2 blocks at `FOR UPDATE` until Session 1 commits. Upon unblocking, Session 2 reads `enrolled_count = 5`, triggers the check violation, and aborts with error `23514` (`BATCH_CAPACITY_EXCEEDED`).
  6. **Process Assertion:** Captures exit codes (`$p1.ExitCode = 0`, `$p2.ExitCode` reporting error 23514), logs outputs to `CONCUR_SESSION1.log` and `CONCUR_SESSION2.log`, and verifies physical row count is strictly 5.

---

### 2.3 Remediation 3 — Canary-Only Backup and Restore Drill (QA-INF-02)

#### Before (Commit `06c98c5`):
- `pg_dump` extracted the entire database (`pg_dump -Fc ... postgres`).
- `pg_restore` was invoked with `--clean --if-exists` across the full archive without table filtering.
- Posed catastrophic risk of dropping `micro_batches`, `batch_enrollments`, and all other tables in the target database.

#### After (Remediated):
- **Canary Scoping (`-t public.canary_audit`):**
  - `pg_dump` explicitly restricted:
    `& $pgDumpPath ... -t public.canary_audit -Fc -b -v -f $backupFile`
  - `pg_restore` explicitly restricted:
    `& $pgRestorePath ... -t public.canary_audit --clean --if-exists -v $decryptedFile`
- **Zero Academy Table Blast Radius:** `pg_restore` is prohibited from dropping or altering any relation other than `public.canary_audit`.
- **Integrity Assertion:** Restored row count of `canary_audit` is asserted, and a subsequent catalog query confirms `micro_batches` and `chk_max_batch_capacity` remain completely untouched.

---

### 2.4 Remediation 4 — GPG Passphrase Security

#### Before (Commit `06c98c5`):
- Line 47 of `run_staging_restore_drill.ps1` contained a hardcoded plaintext secret:
  `$GpgPassphrase = "AAA-Staging-Backup-Passphrase-2026"`

#### After (Remediated):
- **Zero Hardcoded Secrets:** Line 47 removed.
- **Secure Interactive Prompt:** If `$env:STAGING_GPG_PASSPHRASE` is missing, prompts via `Read-Host -AsSecureString`.
- **Fail Closed:** If no passphrase is provided, terminates immediately with:
  `SECURITY HALT: GPG Passphrase is required for encryption. Aborting.`
- **Memory-Only Piping (`--passphrase-fd 0`):** Passphrase is piped directly to GPG's standard input stream (`$GpgPassphrase | gpg ... --passphrase-fd 0`), preventing exposure in process lists, argument logs, or temporary plaintext files.

---

## 3. Runner Reliability & Error-Handling Verification

In accordance with Section 7 of the directive:

1. **Exit Code Evaluation:**
   - Every external execution (`$psqlPath`, `$pgDumpPath`, `$pgRestorePath`, `$gpgPath`) checks `$LASTEXITCODE -ne 0` immediately.
   - Any non-zero exit code emits `Write-Error` and halts script execution with that exit code.
2. **Log Redaction:**
   - Database passwords (`$env:PGPASSWORD`) and GPG passphrases are never written to `outputLog` or printed to terminal stdout/stderr.
3. **Synthetic Record Isolation:**
   - Pre-test and post-test data operations are strictly constrained to `LIKE 'BATCH-TEST-%'` and `public.canary_audit`.

---

## 4. Local Static Syntax & Parsing Verification Evidence

All modified scripts were statically evaluated on the local machine on 06-November-2026:

```
=== LOCAL STATIC SCRIPT VALIDATION RESULTS ===

1. PowerShell Syntax Parsing (run_staging_capacity_tests.ps1):
   - Command: [System.Management.Automation.Language.Parser]::ParseFile(...)
   - Errors: 0 syntax errors. PASS.

2. PowerShell Syntax Parsing (run_staging_restore_drill.ps1):
   - Command: [System.Management.Automation.Language.Parser]::ParseFile(...)
   - Errors: 0 syntax errors. PASS.

3. Bash Script Validation (run_staging_capacity_tests.sh):
   - Checked syntax and set -euo pipefail adherence. PASS.

4. TypeScript Project Compiler:
   - Command: node node_modules/typescript/bin/tsc --noEmit
   - Exit Code: 0 (Zero type errors, zero compiler warnings). PASS.

5. Unit Test Suites:
   - Command: node node_modules/tsx/dist/cli.mjs --test
   - 34/34 passing automated tests across repository. PASS.
```

---

## 5. Strict Non-Execution & Isolation Confirmation

In compliance with Section 9 of the Management Directive:

- **Database Connections:** 🟢 **0 Connections Attempted.** No network requests were dispatched to Supabase or any PostgreSQL cluster.
- **Migration Application:** 🟢 **0 Migrations Applied.** The migration was not executed.
- **Destructive Operations:** 🟢 **0 Drops, 0 Truncates, 0 Deletes Executed.**
- **Approved Migration File:** 🟢 **0 Bytes Modified.** Preserved with exact committed hash.
- **Production `main`:** 🔒 **Locked** at `a21a3d1129cc17fc6650bfd04648eb91199e6fa8`.
- **Git Commit / Push:** 🟢 **Zero commits, zero pushes.** Working directory changes remain uncommitted awaiting management review.

---

## 6. Final Recommendation to Leadership

```
========================================================================================
                      FINAL REMEDIATION RECOMMENDATION
========================================================================================
  RECOMMENDATION: 🟢 SAFE FOR SECOND READ-ONLY REVIEW
  
  RATIONALE:
  All four critical security defects have been systematically remediated:
  1. Remediation 1: Staging identity strictly enforced; host derived; SSL required.
  2. Remediation 2: Real two-process asynchronous concurrency harness implemented.
  3. Remediation 3: Restore drill constrained strictly to public.canary_audit.
  4. Remediation 4: Hardcoded GPG passphrase eliminated; secure stdin piping used.
  
  All scripts now fail closed on missing credentials, mismatched hosts, or process errors.
========================================================================================
```

---
*Submitted by Senior Security & QA Engineering for Arnav Abacus Academy Governance.*
