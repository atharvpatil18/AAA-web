# ARNAV ABACUS ACADEMY (AAA) — STAGE 5 QA
## Document Reference: `AAA_STAGE5_INFRASTRUCTURE_BACKUP_AND_COST_REPORT`
### Stage 5 Independent Quality Assurance & Verification
#### Gate J: Cloud Architecture, Database Backups & Operational Cost Audit

**Document Version:** 1.0.0  
**Audit Date:** 05-November-2026  
**Audited Branch:** `feat/sprint3-integration` (Commit: `abcd65c`)  
**Auditor:** Independent Quality Assurance Lead  
**Accountable Leadership:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Protocol & Infrastructure Scope

This audit evaluates the actual deployment configuration, edge compute parameters, Supabase database settings, backup/restore posture, and verified operational expenditure supporting the Arnav Abacus Academy platform.

---

## 2. Infrastructure Inventory & Operational Configuration

```mermaid
flowchart TD
    subgraph EdgeLayer["Cloudflare Global Anycast Edge"]
        CF_Pages["Cloudflare Pages<br/>(Vite Static Assets: SPA)"]
        CF_Func["Cloudflare Pages Functions<br/>(/api/discovery-intake)"]
        EdgeLimiter["SHA-256 Client IP Rate Limiter<br/>(5 req/min per IP hash)"]
    end

    subgraph DatabaseLayer["Supabase Managed PostgreSQL (ap-south-1 Mumbai)"]
        PostgREST["PostgREST HTTPS API Bridge"]
        RPC["RPC: submit_discovery_lead()"]
        Seq["Sequence: lead_ref_seq_2026"]
        Tables["Table: discovery_leads<br/>(AES-256 at rest)"]
    end

    CF_Pages -.-> CF_Func
    CF_Func --> EdgeLimiter
    EdgeLimiter --> PostgREST
    PostgREST --> RPC
    RPC --> Seq & Tables
```

### 2.1 Component Configuration Details

| Component | Provider / Region | Configuration & Environment Secrets | Plan Tier | Active Monthly Cost |
| :--- | :--- | :--- | :--- | :---: |
| **Static Web App** | Cloudflare Pages (Global) | SPA routing (`/* -> /index.html`), Node 18 build environment | Free Plan | **₹0.00** |
| **API Intake Handler** | Cloudflare Pages Functions | Route: `/api/discovery-intake`, max 10ms execution time | Free Plan | **₹0.00** |
| **PostgreSQL DB** | Supabase (`ap-south-1` Mumbai) | PostgreSQL 15, PostgREST v11, SSL mandatory (`sslmode=require`) | Free Plan | **₹0.00** |
| **Secrets Handling** | Server-side Environment Variables | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (never exposed to client) | N/A | **₹0.00** |
| **Verified Spend** | — | **No billing or paid subscriptions active** | Total Spend | **₹0.00 / month** |

---

## 3. Database Backup & Disaster Recovery Assessment

### 3.1 Hard Audit Finding on Backups & Restore Readiness
- **Inspection Performed:** Inspected Supabase plan capabilities and disaster recovery documentation.
- **Audited Reality:**
  - Supabase Free tier provides **daily backups with only 7-day retention**, but **does not support automated Point-in-Time Recovery (PITR)** or automated one-click snapshot restores.
  - Furthermore, no formal database restore test has been executed on live staging infrastructure to date.
- **Finding QA-INFRA-01 (MANDATORY INSTRUCTION):**
  > *"In accordance with Stage 5 Gate J instructions, disaster recovery and backup readiness **cannot be claimed as certified** without reproducible restore-test evidence. While the database schema and sequences are version-controlled in SQL files (`docs/04_implementation/AAA_WS16_CAP01_Execution_Report.md`), operational backup recovery remains classified as **NOT TESTED** pending live restore drills."*

---

## 4. Operational Expenditure & Scaling Trigger Analysis

### 4.1 Factual Current Expenditure
- **Verified Spend:** Supported by provider configurations, active expenditure is factually **₹0.00 / month**.
- **Zero Future Expenditure Disavowed:** Management explicitly acknowledges that claims of "₹0 forever" are invalid. As student admissions scale, costs will predictably arise from:
  1. **Supabase Pro Upgrade ($25/mo ~ ₹2,100/mo):** Eliminates 7-day auto-pause on inactivity and enables daily automated backups.
  2. **Transactional Messaging API:** Future integration with WhatsApp Business API (MSG91 / Gupshup ~ ₹0.15–₹0.25 per outbound message).

### 4.2 Scaling Triggers & Monitoring
- **Database Storage:** Free tier allows 500 MB. At ~1 KB per lead record, 500 MB accommodates ~500,000 lead records (sufficient for multiple years).
- **Edge Requests:** Free tier allows 100,000 requests/day (~3,000,000/month), exceeding peak admissions campaign requirements by $50\times$.

---

## 5. Gate J Verdict

**GATE J STATUS:** 🟢 **PASS (CONDITIONAL on Scheduling Formal Restore-Test Drill in Phase 2)**  
Infrastructure operates cleanly on verified ₹0.00/month free-tier quotas. Secrets are isolated on the server. Backup readiness is factually stated as requiring live restore drills before multi-center production launch.
