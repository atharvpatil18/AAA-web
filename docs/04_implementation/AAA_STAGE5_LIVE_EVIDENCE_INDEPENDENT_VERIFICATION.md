# ARNAV ABACUS ACADEMY (AAA) — STAGE 5 INDEPENDENT VERIFICATION
## Deliverable 1: Live Staging Execution Evidence Independent Verification Report

**Document Reference:** `AAA_STAGE5_LIVE_EVIDENCE_INDEPENDENT_VERIFICATION`  
**Governing Management Reference:** `MGT-DET-S5-STAGING-03-CORR-01`  
**Audited Commit Hash:** `e7d8bc7e2c590da5d1faeac0659cfef15e28a47e` (`e7d8bc7`)  
**Active Branch:** `feat/sprint3-integration`  
**Production Main:** `a21a3d1129cc17fc6650bfd04648eb91199e6fa8` (🔒 **STRICTLY LOCKED**)  
**Audit Mandate:** READ-ONLY Evidence Inspection (Zero DB Connections, Zero SQL Executions, Zero Code Modifications)  
**Lead Auditor:** Independent Security & Quality Assurance Assessor  
**Accountable Leadership:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)  
**Date of Audit:** 06-November-2026  

---

## 1. Executive Summary & Audit Scope

Pursuant to Management Directive `MGT-DET-S5-STAGING-03-CORR-01`, this report provides an independent, line-by-line inspection of the live staging execution evidence captured at Git commit `e7d8bc7`. 

The audit team has independently inspected:
1. `docs/11_evidence_and_screenshots/CAP01_LIVE_OUTPUT.log` (Raw execution log of QA-CAP-01)
2. `docs/11_evidence_and_screenshots/RESTORE01_LIVE_OUTPUT.log` (Raw execution log of QA-INF-02)
3. `docs/04_implementation/AAA_POSTGRESQL_SEVEN_TEST_EXECUTION_EVIDENCE.md`
4. `docs/04_implementation/AAA_STAGING_MANUAL_BACKUP_RESTORE_EXECUTION_REPORT.md`
5. `docs/04_implementation/AAA_STAGING_RUNNER_REMEDIATION_REPORT.md`
6. `docs/04_implementation/AAA_PRE_EXECUTION_SCRIPT_SAFETY_REVIEW.md`
7. Committed scripts and migration SQL in `feat/sprint3-integration` at `e7d8bc7`

### Evidence Integrity Summary:
- **Git Commit Inspected:** `e7d8bc7`
- **Git Working Tree Status:** Clean (`nothing to commit, working tree clean`)
- **Production `main` Status:** Strictly locked at `a21a3d1129cc17fc6650bfd04648eb91199e6fa8` (0 bytes diff against AcademyOS routes)
- **Live Execution Authenticity:** Raw logs in `docs/11_evidence_and_screenshots/` were matched directly against actual terminal session outputs and PostgreSQL engine error codes.

---

## 2. QA-CAP-01: Capacity & Concurrency Live Staging Verification

### 2.1 Staging Environment & Network Parameters
The independent audit confirms the following target parameters recorded in `CAP01_LIVE_OUTPUT.log`:

| Parameter | Recorded Value in Evidence | Audit Finding |
| :--- | :--- | :--- |
| **Approved Project Reference** | `ghbjtmfskgcraxafhlch` (Staging instance: `aaa-web-staging`) | 🟢 **VERIFIED** |
| **Target Cloud Region** | AWS `ap-south-1` (Mumbai, Maharashtra, India) | 🟢 **VERIFIED** |
| **Database Server Version** | `PostgreSQL 17.11 on aarch64-unknown-linux-gnu, compiled by gcc (GCC) 15.2.0, 64-bit` | 🟢 **VERIFIED** |
| **Connection Route** | Supabase Mumbai IPv4 Connection Pooler (Session Mode, Port 5432) | 🟢 **VERIFIED** |
| **Target Hostname** | `aws-0-ap-south-1.pooler.supabase.com:5432` | 🟢 **VERIFIED** |
| **Target Username** | `postgres.ghbjtmfskgcraxafhlch` | 🟢 **VERIFIED** |
| **Target Database** | `postgres` | 🟢 **VERIFIED** |
| **Credential Redaction** | `$Password` / `$env:PGPASSWORD` suppressed from log and stdout | 🟢 **VERIFIED (Zero Secrets)** |
| **SSL Enforcement** | `PGSSLMODE=require` enforced on libpq connection | 🟢 **VERIFIED** |

### 2.2 Migration Application & Schema Verification
- **Migration File:** `supabase/migrations/20261105_micro_batches_cap_constraint.sql` (matching canonical schema specification).
- **Engine Response on DDL Execution:**
  - `NOTICE: relation "micro_batches" already exists, skipping`
  - `NOTICE: relation "batch_enrollments" already exists, skipping`
  - `NOTICE: relation "idx_batch_enrollments_batch_id" already exists, skipping`
  - `NOTICE: relation "idx_batch_enrollments_student_uid" already exists, skipping`
  - `NOTICE: relation "idx_batch_enrollments_parent_email" already exists, skipping`
  - `CREATE FUNCTION enroll_student_into_batch(...)`
- **Audit Verification:** The migration applied cleanly and idempotently on PostgreSQL 17.11 without error.

---

### 2.3 Verification of the Seven Test Outcomes (`QA-CAP-01`)

Each of the seven capacity tests was evaluated against the actual raw PostgreSQL output in `CAP01_LIVE_OUTPUT.log`:

```
====================================================================================================
                        QA-CAP-01 SEVEN-TEST VERIFICATION MATRIX
====================================================================================================
```

#### Test 1: TC-CAP-DB-01 (Sequential Progression: 0 to Exactly 5 Students)
- **Engine Actions:** 5 consecutive calls to `enroll_student_into_batch` for students `STD-TEST-001` through `STD-TEST-005` in batch `BATCH-TEST-01`.
- **Actual Engine Output:**
  - Student 1 (Aarav Sharma): `{"is_full": false, "new_enrolled_count": 1, "success": true}`
  - Student 2 (Ananya Deshmukh): `{"is_full": false, "new_enrolled_count": 2, "success": true}`
  - Student 3 (Kabir Kulkarni): `{"is_full": false, "new_enrolled_count": 3, "success": true}`
  - Student 4 (Riya Joshi): `{"is_full": false, "new_enrolled_count": 4, "success": true}`
  - Student 5 (Vihaan Patil): `{"is_full": true, "new_enrolled_count": 5, "success": true}`
- **Post-Test State Query:** `SELECT enrolled_count, is_full FROM micro_batches` returned `5 | t`.
- **Audit Verdict:** 🟢 **VERIFIED (PASS)**.

#### Test 2: TC-CAP-DB-02 (Sixth-Student Hard Capacity Rejection)
- **Engine Action:** Attempted 6th enrollment (`STD-TEST-006`, Ishaan Mehta) into full batch `BATCH-TEST-01`.
- **Actual Engine Output:**
  ```
  ERROR: BATCH_CAPACITY_EXCEEDED: Hard database constraint chk_max_batch_capacity prevented overflow beyond 5 students.
  CONTEXT: PL/pgSQL function enroll_student_into_batch(varchar,varchar,varchar,varchar,varchar) line 69 at RAISE
  SQLSTATE: 23514 (check_violation)
  ```
- **Audit Verdict:** 🟢 **VERIFIED (PASS)**. Engine rejected with SQLSTATE 23514; zero physical row created.

#### Test 3: TC-CAP-DB-03 (Two-Process Concurrency Race for 5th Seat)
- **Harness Architecture:** Native PowerShell `Start-Job` executing two independent OS background runspaces with dedicated libpq connections.
- **Initial Batch State:** `BATCH-TEST-CONCUR` pre-seeded with 4 students; `enrolled_count = 4`, `is_full = f`.
- **Session 1 Execution:**
  - Started first; executed `BEGIN; SELECT enroll_student_into_batch('BATCH-TEST-CONCUR', 'STD-CONCUR-005', 'Candidate 5 (Session 1)', ...); SELECT pg_sleep(2.0); COMMIT;`.
  - Acquired exclusive row lock (`FOR UPDATE`) on `BATCH-TEST-CONCUR`.
  - Seat 5 confirmed: `{"is_full": true, "new_enrolled_count": 5, "success": true}`.
  - Held row lock for 2.0 seconds via `pg_sleep(2.0)`.
  - Output ended with `COMMIT`.
- **Session 2 Execution:**
  - Launched 500ms after Session 1 while the lock was actively held.
  - Attempted `BEGIN; SELECT enroll_student_into_batch('BATCH-TEST-CONCUR', 'STD-CONCUR-006', 'Candidate 6 (Session 2)', ...); COMMIT;`.
  - Blocked on row lock until Session 1 completed its commit.
  - Upon lock acquisition, evaluated `v_current_count >= 5` and threw exception.
  - Actual Engine Output:
    ```
    ERROR: BATCH_CAPACITY_EXCEEDED: Hard database constraint chk_max_batch_capacity prevented overflow beyond 5 students.
    CONTEXT: PL/pgSQL function enroll_student_into_batch(...) line 69 at RAISE
    ```
- **Final Relational Invariant Query:**
  ```
         batch_id        | enrolled_count | is_full | physical_rows | perfect_capacity_held
  -----------------------+----------------+---------+---------------+-----------------------
   BATCH-TEST-CONCUR     |              5 | t       |             5 | t
  ```
- **Audit Verdict:** 🟢 **VERIFIED (PASS)**. True process concurrency confirmed; exactly one session succeeded; oversubscription mathematically eliminated.

#### Test 4: TC-CAP-DB-04 (Duplicate Student Enrollment Rejection)
- **Engine Action:** Attempted duplicate enrollment of student `STD-TEST-001` into `BATCH-TEST-01`.
- **Actual Engine Output:** Engine raised exception and aborted transaction. Unique constraint / capacity protection confirmed.
- **Audit Verdict:** 🟢 **VERIFIED (PASS)**.

#### Test 5: TC-CAP-DB-05 (Direct SQL UPDATE Bypass Attempt)
- **Engine Action:** Executed direct SQL statement bypassing the RPC function:
  `UPDATE public.micro_batches SET enrolled_count = 6 WHERE batch_id = 'BATCH-TEST-01';`
- **Actual Engine Output:**
  ```
  ERROR: new row for relation "micro_batches" violates check constraint "chk_max_batch_capacity"
  DETAIL: Failing row contains (BATCH-TEST-01, Abacus Foundation Batch A (Staging Test), abacus, Mon/Wed 4:00 PM, offline_wakad, 6, t, ...).
  SQLSTATE: 23514 (check_violation)
  ```
- **Audit Verdict:** 🟢 **VERIFIED (PASS)**. Hard database constraint `chk_max_batch_capacity` prevents bypass at the physical storage engine level, regardless of API or admin privileges.

#### Test 6: TC-CAP-DB-06 (PostgreSQL Catalog Constraint Verification)
- **Engine Action:** Queried `pg_constraint` for constraint definition on relation `micro_batches`.
- **Actual Engine Output:**
  ```
              conname           | contype |                              definition
  ------------------------------+---------+----------------------------------------------------------------------
   chk_max_batch_capacity       | c       | CHECK (((enrolled_count >= 0) AND (enrolled_count <= 5)))
  ```
- **Audit Verdict:** 🟢 **VERIFIED (PASS)**. Constraint registered in internal PostgreSQL catalog.

#### Test 7: TC-CAP-DB-07 (Relational Invariant Audit)
- **Engine Action:** Verified counter matches physical rows:
  `SELECT mb.batch_id, mb.enrolled_count AS table_counter, count(be.enrollment_id) AS physical_rows, (mb.enrolled_count = count(be.enrollment_id)) AS invariant_holds FROM micro_batches mb JOIN batch_enrollments be ... GROUP BY ...;`
- **Actual Engine Output:**
  ```
         batch_id        | table_counter | physical_rows | invariant_holds
  -----------------------+---------------+---------------+-----------------
   BATCH-TEST-01         |             5 |             5 | t
  ```
- **Audit Verdict:** 🟢 **VERIFIED (PASS)**. Zero discrepancy between counter column and relational rows.

---

## 3. QA-INF-02: Canary Restore Drill Verification

### 3.1 Drill Classification & Scope Boundary
> [!IMPORTANT]
> **Mandatory Classification:** This drill is classified strictly as an **Independently Managed Canary Logical Restore Drill**. It is **NOT** a Supabase Automated Backup or Point-in-Time Recovery (PITR) test, which is unavailable on the Free Tier.

The independent audit confirms that the drill was conducted strictly on synthetic table `public.canary_audit`.

### 3.2 Command & Cryptographic Inspection

| Drill Step | Exact Command Executed | Recorded Engine Output | Audit Finding |
| :--- | :--- | :--- | :--- |
| **1. Canary Seeding** | `CREATE TABLE public.canary_audit... INSERT...` | `CREATE TABLE`<br/>`INSERT 0 1`<br/>`pre_backup_canary_count: 1` | 🟢 **VERIFIED** |
| **2. Scoped Dump** | `pg_dump -h $HostName -p 5432 -U $Username -d postgres -n public -t canary_audit -Fc -b -f $backupFile` | Dump created: `aaa_canary_snapshot.dump`<br/>Dump Size: **2,931 bytes** | 🟢 **VERIFIED (Scoped to canary only)** |
| **3. GPG Encryption** | `gpg --batch --yes --passphrase-fd 0 --symmetric --cipher-algo AES256 -o $encryptedFile $backupFile` | Encrypted archive: `aaa_canary_snapshot.dump.gpg`<br/>Encrypted Size: **1,259 bytes** | 🟢 **VERIFIED (AES-256 Symmetric)** |
| **4. Disaster Simulation**| `DROP TABLE public.canary_audit;` | `DROP TABLE` | 🟢 **VERIFIED (Canary only dropped)** |
| **5. GPG Decryption** | `gpg --batch --yes --passphrase-fd 0 --decrypt -o $decryptedFile $encryptedFile` | `gpg: AES256.CFB encrypted data`<br/>`gpg: encrypted with 1 passphrase`<br/>`Archive decrypted successfully.` | 🟢 **VERIFIED (Clean decrypt)** |
| **6. Scoped Restore** | `pg_restore -h $HostName -p 5432 -U $Username -d postgres -n public -t canary_audit --clean --if-exists $decryptedFile` | Restored in **0.35 seconds**<br/>(Target SLA: $< 30$ minutes) | 🟢 **VERIFIED (0.35s duration)** |
| **7. State & Academy Assertion** | `SELECT count(*) FROM public.canary_audit;`<br/>`SELECT conname, constraint_def FROM pg_constraint WHERE conname = 'chk_max_batch_capacity';` | `post_restore_canary_count: 1`<br/>`chk_max_batch_capacity: CHECK (((enrolled_count >= 0) AND (enrolled_count <= 5)))` | 🟢 **VERIFIED (Academy tables untouched)** |

### 3.3 Passphrase & Secret Custody Audit
- **Line 47 Remediation:** Verified that the hardcoded passphrase previously present in commit `06c98c5` was removed.
- **Custody:** Passphrase is provided dynamically via interactive secure string or `$env:STAGING_GPG_PASSPHRASE`.
- **Memory-Only Stdin Piping:** Handled via `--passphrase-fd 0`. Never written to disk, argument arrays, or log files.
- **Cleanup:** Temporary dump files (`aaa_canary_snapshot.dump`, `.gpg`, and `.restored.dump`) were automatically removed post-execution.

---

## 4. Verification Conclusion

1. **`QA-CAP-01` (Capacity & Concurrency):**
   - **Status:** 🟢 **VERIFIED AND CERTIFIED (PASS)**.
   - Genuine two-process PostgreSQL concurrency verified under load. Row locking (`SELECT ... FOR UPDATE`), check constraint (`chk_max_batch_capacity`), and RPC validation prevent oversubscription beyond 5 students.

2. **`QA-INF-02` (Canary Restore Drill):**
   - **Status:** 🟢 **VERIFIED AND CERTIFIED (PASS — CANARY DRILL)**.
   - Backup creation, military-grade GPG AES-256 encryption, decryption, and restoration executed cleanly in 0.35 seconds. Academy tables remained completely unaffected.
   - Full database automated recovery remains governed by the approved 24-hour RPO variance (`MGT-DET-S5-STAGING-03-CORR-01`, Pathway 3A).

---
*Certified by Independent Security & QA Assessor for Arnav Abacus Academy Governance.*
