# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-16 VERIFICATION
## Document Reference: `AAA-WS16-ASSESS-DEV-01`
### Deliverable 6: Approved Infrastructure Architecture Deviation Assessment

**Document Version:** 1.0.0  
**Audit Date:** 05-November-2026  
**Governing Audit Baseline:** `AAA-S3-REG-WS16-AUDIT-FINAL-01`  
**Governing Determination:** `MGT-DET-S4-S3-AUTH-02`  
**Inspected Commit:** `51b7322` on branch `feat/sprint3-integration`  
**Production Status:** STRICTLY LOCKED (`a21a3d1129cc17fc6650bfd04648eb91199e6fa8`)  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Summary & Purpose

In Stage 2 and the Sprint 2 Architectural Master Plan, AAA Leadership formally ratified a multi-cloud infrastructure architecture:
1. **Frontend Hosting & CDN:** Cloudflare Pages.
2. **Ingress API Gateway & Compute:** AWS Mumbai (`ap-south-1`) API Gateway v2 + AWS Lambda (Node.js 20 LTS).
3. **Database Tier:** Supabase PostgreSQL in AWS Mumbai (`ap-south-1`).
4. **Perimeter Security:** Cloudflare WAF & Zero-Trust.

During WS-16 remediation, code was implemented as a **Cloudflare Pages Function** located at `/functions/api/discovery-intake.ts`.

This assessment evaluates whether the Cloudflare Pages Function implementation represents an unauthorized architectural deviation, provides a side-by-side technical trade-off comparison, and defines the governance requirements for formal management ratification.

---

## 2. Architectural Comparison Matrix

| Evaluation Dimension | Ratified Baseline Architecture (AWS Mumbai Lambda) | Implemented Remediation (Cloudflare Pages Function) | Deviation Assessment |
| :--- | :--- | :--- | :---: |
| **Compute / Runtime Tier** | AWS Lambda (Node.js 20 LTS) in Mumbai | Cloudflare Pages Function (V8 Workerd Isolate) | **ARCHITECTURAL DEVIATION** |
| **Ingress Gateway** | AWS API Gateway v2 (HTTP API) in `ap-south-1` | Cloudflare Pages file-based routing (`/api/*`) | **ARCHITECTURAL DEVIATION** |
| **Execution Location** | Strictly within AWS Mumbai (`ap-south-1`) | Cloudflare Anycast Edge (Closest PoP: Mumbai/Pune) | **MODIFIED (Edge Ingress)** |
| **Data Residency** | 100% within Republic of India (Mumbai) | Transient edge execution; data stored in Mumbai | **COMPLIANT (Subject to DB)** |
| **Database Persistence Tier** | Supabase PostgreSQL in AWS Mumbai | Supabase PostgreSQL in AWS Mumbai (Unconnected) | **ALIGNED (When connected)** |
| **Cold Start Performance** | 150 ms – 400 ms (Node.js runtime init) | **0 ms** (V8 Isolate instant invocation) | **SUPERIOR (Edge Worker)** |
| **Operational Complexity** | High (Requires AWS IAM, VPC, Terraform/SAM) | Low (Single repository, native Git deployment) | **SIMPLIFIED** |
| **Cost Profile** | AWS Free Tier, then usage-based billing | Cloudflare Free Tier (100,000 req/day free) | **COST REDUCED** |
| **Monitoring & Telemetry** | AWS CloudWatch (Zero-PII KMS encrypted) | Cloudflare Analytics & Worker Logpush | **ALIGNED** |
| **Vendor Footprint** | Cloudflare + AWS + Supabase (3 vendors) | Cloudflare + Supabase (2 vendors) | **CONSOLIDATED** |

---

## 3. Deep-Dive Deviation Analysis

### 3.1 The Compute Shift: AWS Lambda vs. Cloudflare Worker
* **The Baseline Requirement:**  
  The original Stage 2 architecture placed all serverless API logic inside AWS Mumbai (`ap-south-1`) to ensure that no computation or data transit occurred outside the sovereign borders of Maharashtra/India.
* **The Remediation Shift:**  
  `functions/api/discovery-intake.ts` shifts compute to Cloudflare Pages Functions. Cloudflare operates Anycast nodes in Mumbai and Pune, ensuring that traffic originating from parents in Wakad, Pune, and Maharashtra terminates locally in India.
* **Benefits of the Deviation:**
  1. **Zero Cold Starts:** Eliminates the 300ms–500ms delay experienced by mobile parents on AWS Lambda cold starts.
  2. **Single CI/CD Pipeline:** Code, static assets, and API routes live in the same Git repository and deploy synchronously without multi-stage Terraform orchestration.
  3. **Zero Ingress Billing:** Free on Cloudflare Pages up to 100,000 requests per day (far exceeding AAA's immediate admissions traffic).

### 3.2 Data Sovereignty & DPDP Act Compliance
Under India's DPDP Act 2023, personal data of children may be processed, provided it is protected against unauthorized cross-border exfiltration without safeguards.
- In the Cloudflare Pages Function model, the compute layer is **stateless and ephemeral**.
- So long as all persistent storage calls connect directly via TLS 1.3 to Supabase PostgreSQL in AWS Mumbai (`ap-south-1`), **data residency is strictly preserved within Mumbai, India**.
- However, because durable persistence is currently **not connected in code**, data residency cannot be formally certified until the database bridge is active.

---

## 4. Governance Determination Status: Does this Require a New Determination?

### Analysis:
1. In `AAA_WS16_Server_Gateway_Architecture_Options.md` (`AAA-WS16-ARCH-SRV-01`), Cloudflare Pages Functions was formally evaluated and presented as the recommended Option 1.
2. In `AAA_WS16_Management_Approval_Pack.md` (`AAA-WS16-PACK-MGT-01`), Management Determination `MGT-DET-S4-S3-AUTH-02` was drafted to ratify this recommendation.
3. Management formally approved Option 1 in the interactive decision gate.
4. **However:** The original ratified Stage 2 Architecture (`AAA-S2-PLAN-MASTER-01`) was not updated with an addendum formally deprecating the AWS API Gateway requirement.
5. **Formal Finding:**  
   The Cloudflare Pages Function implementation represents an **Authorized Architectural Pivot** under `MGT-DET-S4-S3-AUTH-02`. To maintain absolute documentation integrity across audits, a formal **Architecture Addendum** must be appended to the Sprint 3 Master Plan prior to live production deployment.

---

## 5. Sign-Off & Verification Block

| Governance Role | Name | Designation | Signature Status | Date |
| :--- | :--- | :--- | :--- | :--- |
| **Solutions Architect** | Enterprise Infrastructure Lead | Cloud & Infrastructure Audit | Verified | 05-Nov-2026 |
| **Operations & Compliance** | Nitin Patil | Operations, Tech & Compliance Director | Pending Formal Review | [Pending] |
| **Academic & Admissions** | Neha Patil | Founder & Academic Director | Pending Formal Review | [Pending] |
