# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3
## Document Reference: `AAA_WS18_ACCESS_CONTROL_AND_SECURITY_AUDIT`
### WS-18 Independent Technical & Governance Acceptance Audit
#### Dimensions C, D & E: Micro-Batch Capacity, Access Control & Security Audit

**Document Version:** 1.0.0  
**Audit Date:** 05-November-2026  
**Audited Branch:** `feat/sprint3-integration`  
**Audited HEAD Commit:** `d3daf4f`  
**Governing Baseline Determination:** `MGT-DET-S4-S3-STEP0-WS18-08`  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Micro-Batch Capacity Enforcement Audit (Dimension C)

### 1.1 The Strict Maximum-5-Student Rule
Under AAA pedagogical philosophy and Directive `DIR-02`, student batches are hard-limited to **maximum 5 students per micro-batch** ($\le 5$).

### 1.2 Algorithmic Verification in `academyRosterBridge.ts`
```typescript
export const MAX_BATCH_CAPACITY = 5 as const;

if (batch.enrolledStudents.length >= MAX_BATCH_CAPACITY) {
  throw new BatchCapacityExceededError(batch.batchName, MAX_BATCH_CAPACITY);
}
```

### 1.3 Test Verification Results
- **TC-SYNC-01 (Capacity Acceptance):** Successfully enrolls exactly 5 students into a batch. The batch sets `isFull: true` upon the 5th enrollment. (PASS)
- **TC-SYNC-02 (6th Student Hard Overflow Block):** Attempting to enroll a 6th student throws `BatchCapacityExceededError`. (PASS)

### 1.4 Architectural Security Finding: In-Memory vs. Database Concurrency
- **Finding SEC-CAP-01:** The current check operates in the TypeScript domain. While completely robust within a single runtime event loop, under high-concurrency production deployments across multiple serverless instances, two concurrent requests to the last available seat (seat 5) could both observe `length === 4` unless guarded at the authoritative data layer.
- **Production Hardening Requirement (OBS-WS18-03):** When live database writes are connected, the database table `micro_batches` must include a PostgreSQL check constraint:
  ```sql
  ALTER TABLE micro_batches ADD CONSTRAINT chk_max_capacity CHECK (enrolled_count <= 5);
  ```
  and row-level locking (`SELECT FOR UPDATE`) during enrollment transactions.

---

## 2. Authentication & Authorization Audit (Dimension D)

### 2.1 Email Approval vs. Authentication Proof
- An entry in `ApprovedEmailRecord` whitelists which curriculum levels a student is permitted to access.
- **Critical Distinction:** Whitelisting an email is **not** authentication. A user cannot simply state their email in `PracticeHub.tsx` to gain access. The user must actively authenticate via:
  1. Email OTP (6-digit one-time password verified in `AuthContext.tsx`), or
  2. Google OAuth 2.0 JWT token verified via `jwtDecode`.

### 2.2 Client-Side Storage & Privilege Escalation Analysis
- In `src/lib/accessControl.ts`, records are stored in browser `localStorage` (`aaa_approved_email_access_db`).
- **Threat Scenario:** A student with technical knowledge opens browser DevTools and modifies their `permissions` or sets `isAdmin: true` in localStorage.
- **Protection Analysis:**
  - `accessControl.ts` contains an explicit defense against client-side admin escalation:
    ```typescript
    export function isUserAdmin(email?: string): boolean {
      if (!email) return false;
      const cleanEmail = email.trim().toLowerCase();
      const isRootAdmin = SYSTEM_ROOT_ADMINS.map((e) => e.toLowerCase()).includes(cleanEmail);
      return isRootAdmin;
    }
    ```
  - `SYSTEM_ROOT_ADMINS` is hardcoded to `["nitinkpatil@gmail.com", "admin@arnavabacus.com"]`. Modifying `isAdmin` in localStorage will **not** grant administrative privileges because `isUserAdmin()` ignores the localStorage flag and strictly inspects the hardcoded root administrator whitelist.

### 2.3 Role Authorization in `academyRosterBridge.ts`
- `enrollLeadToRoster()` asserts:
  ```typescript
  if (actorRole !== "ACADEMIC_DIRECTOR" && actorRole !== "ADMISSIONS_COORDINATOR") {
    throw new UnauthorizedEnrollmentRoleError(actorRole);
  }
  ```
- **TC-SYNC-08 (Unauthorized Role Enforcement):** Verified that attempts by unauthorized roles (`SYSTEM_AUTOMATION`, anonymous) to execute enrollment are immediately intercepted. (PASS)

---

## 3. Telemetry & CSV Export Security Audit (Dimension E)

### 3.1 Telemetry Shredding
- During hydration of `EnrolledStudentProfile`:
  - Marketing consent flags are excluded.
  - Honeypot bot-trap flags are excluded.
  - Client edge IP address hashes are excluded.
- **TC-SYNC-05 (Telemetry Shredding):** Confirmed 100% exclusion of prospective tracking attributes from student profile objects. (PASS)

### 3.2 IP Hashing Clarification: Pseudonymization vs. Anonymization
- In `functions/api/discovery-intake.ts`, incoming IP addresses are hashed using SHA-256 with a daily salt.
- **Regulatory Clarification:** Under the DPDP Act 2023, CERT-In Directions 2022, and GDPR, salted IP hashing constitutes **pseudonymization**, not irreversible anonymization. Because the search space for IPv4 addresses is $2^{32}$, a determined adversary with the salt can reconstruct the IP. AAA documentation correctly designates IP hashing as a privacy-preserving pseudonymization mechanism for rate limiting, not absolute anonymization.

### 3.3 CSV Formula Injection Neutralization (CWE-1236)
- Spreadsheet applications (Excel, Google Sheets, Calc) interpret cells beginning with `=`, `+`, `-`, `@`, `\t`, `\r`, or `|` as executable formulas or DDE commands.
- `generateRosterCsv()` in `academyRosterBridge.ts` applies `formatCellForCsvExport()` from `src/lib/intakeGatewayEngine.ts` across every cell.
- **Verification Evidence (TC-SYNC-09):**
  - Malicious batch name `=cmd|' /C calc'!A0` is exported as `"'=cmd|' /C calc'!A0"`.
  - Malicious student name `@MaliciousStudent` is exported as `"'@MaliciousStudent"`.
  - Phone with leading `+` is exported as `"'... "`.
  - Stored canonical data in memory is **never mutated**; the single quote is applied exclusively to the generated CSV output stream. (PASS)

---

## 4. Access Control & Security Findings Summary

| Security Dimension | Assessed Posture | Audit Verdict |
| :--- | :--- | :---: |
| **Micro-Batch Cap ($\le 5$)** | Tested in-memory with overflow rejection. | 🟢 **PASS (Unit)** / Cataloged `OBS-WS18-03` for DB Check Constraint |
| **Authentication Defense** | Email approval requires OTP / OAuth verification. | 🟢 **PASS** |
| **Privilege Escalation** | Admin privileges locked to immutable `SYSTEM_ROOT_ADMINS`. | 🟢 **PASS** |
| **Role Enforcement** | Enrollment locked to Academic Director & Admissions Coordinator. | 🟢 **PASS** |
| **Telemetry Stripping** | Zero prospective marketing PII enters AcademyOS profiles. | 🟢 **PASS** |
| **CSV Injection (CWE-1236)** | Context-aware formula neutralization active on all export cells. | 🟢 **PASS** |
