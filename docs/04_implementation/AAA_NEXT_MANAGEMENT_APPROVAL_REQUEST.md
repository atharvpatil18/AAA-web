# ARNAV ABACUS ACADEMY (AAA) — MANAGEMENT APPROVAL REQUEST
## Staging Environment Activation, Sibling Attribution Design & RPO Policy Approval

**Document Reference:** `AAA_NEXT_MANAGEMENT_APPROVAL_REQUEST`  
**Governing Baseline:** AAA Management Directive (05-Nov-2026)  
**Proposed Determination Reference:** `MGT-DET-S5-STAGING-03`  
**Target Feature Branch:** `feat/sprint3-integration` (Commit: `5c134a8`)  
**Production Baseline:** `a21a3d1129cc17fc6650bfd04648eb91199e6fa8` (`main` 🔒 **STRICTLY LOCKED**)  
**Lead Auditor / Architect:** Nitin Patil (Operations, Tech & Compliance)  
**Academic Lead:** Neha Patil (Founder & Academic Director)  
**Date of Submission:** 05-November-2026  

---

## 1. Executive Summary for Leadership

In response to the **AAA Management Directive of 05-November-2026**, the engineering team has completed all four mandated technical planning tasks:

1. **Task A — Sibling Practice Attribution Design:**  
   Completed [`AAA_SIBLING_PRACTICE_ATTRIBUTION_DESIGN.md`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/docs/04_implementation/AAA_SIBLING_PRACTICE_ATTRIBUTION_DESIGN.md). Proves that the current practice platform cannot safely support two siblings under one parent login without blending learning histories. Specifies the Active Student Context, UI Child Switcher, and `studentUid`-stamped `AttemptRecord` model for Phase 2.
2. **Task B — Staging Database Preparation Plan:**  
   Completed [`AAA_STAGING_DATABASE_PROVISIONING_PLAN.md`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/docs/04_implementation/AAA_STAGING_DATABASE_PROVISIONING_PLAN.md). Checklists an isolated AWS Mumbai (`ap-south-1`) staging project (`aaa-web-staging`) operating strictly at **₹0.00 / month** using 100% synthetic data.
3. **Task C — QA-CAP-01 PostgreSQL Execution Plan:**  
   Completed [`AAA_CAP01_POSTGRESQL_EXECUTION_PLAN.md`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/docs/04_implementation/AAA_CAP01_POSTGRESQL_EXECUTION_PLAN.md). Formulates exact SQL scripts for 7 live database tests (5 normal enrollments, 6th-student overflow rejection, 5th-seat concurrent race condition lock, duplicate rejection, direct SQL bypass prevention, rollback integrity, and relational count consistency).
4. **Task D — QA-INF-02 Recovery Plan & RPO/RTO Assessment:**  
   Completed [`AAA_INF02_RPO_RTO_COST_AND_CAPABILITY_ASSESSMENT.md`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/docs/04_implementation/AAA_INF02_RPO_RTO_COST_AND_CAPABILITY_ASSESSMENT.md). Reconciles the approved RPO $\le 5$ minutes target against cloud capabilities, presenting a clear cost comparison between the ₹0.00/month Free Tier (24h RPO) and the ₹2,100/month Supabase Pro Tier (continuous 1-minute PITR).

---

## 2. Four Discrete Management Decisions Required Next

Leadership is invited to ratify the following four specific determinations:

```
========================================================================================
                          FOUR MANAGEMENT ACTION ITEMS
========================================================================================
Item 1: Authorize Staging Database Provisioning (Free Tier, AWS Mumbai, ₹0.00/month)
Item 2: Approve Sibling Practice Attribution Design Architecture for Phase 2
Item 3: Select Disaster Recovery RPO Policy Pathway (Pathway A vs. Pathway B)
Item 4: Reaffirm Strict Production Lockdown of main (Commit: a21a3d11...)
========================================================================================
```

### Detailed Decision Breakdown:

#### Decision Item 1: Staging Database Provisioning Authorization
- **Proposed Action:** Authorize creation of the isolated staging project `aaa-web-staging` on Supabase Mumbai (`ap-south-1`) under the Free Plan.
- **Cost Impact:** Strictly **₹0.00 / month**. Zero credit card required.
- **Scope:** Applying migration `20261105_micro_batches_cap_constraint.sql` and executing the 7-part test plan in staging only.

#### Decision Item 2: Sibling Practice Attribution Design Approval
- **Proposed Action:** Formally adopt [`AAA_SIBLING_PRACTICE_ATTRIBUTION_DESIGN.md`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/docs/04_implementation/AAA_SIBLING_PRACTICE_ATTRIBUTION_DESIGN.md) as the governing specification for student-level practice isolation in Phase 2.
- **Operational Guard:** Confirm that multi-sibling practice UI remains **DISABLED** until student-level practice attribution is implemented and tested.

#### Decision Item 3: Disaster Recovery RPO Policy Selection
Leadership is requested to choose between two explicit operational pathways:
- **Pathway 3A (Zero-Cost Pre-Launch Variance — Recommended for Pilot):**  
  Formally ratify a temporary pre-launch variance to **RPO $\le 24\text{ hours}$** based on Supabase free-tier daily automated backups, preserving strictly **₹0.00 / month** expenditure during initial single-center admissions in Wakad.
- **Pathway 3B (Paid Enterprise Pro Activation):**  
  Authorize upgrading to **Supabase Pro ($25/mo ~ ₹2,100/mo)** prior to public launch to activate continuous Point-in-Time Recovery (PITR) achieving full compliance with the **RPO $\le 5\text{ minutes}$** target.

#### Decision Item 4: Reaffirmation of Strict Production Lockdown
- **Proposed Action:** Reaffirm that production `main` remains **STRICTLY LOCKED** at `a21a3d1129cc17fc6650bfd04648eb91199e6fa8`.
- **Release Horizon:** No production merge or deployment is permitted until:
  1. Staging PostgreSQL test outputs (`TC-CAP-DB-01`–`07`) are recorded.
  2. Staging restore drill output is verified.
  3. The 10-working-day Track A Corrective Action Period for physical premises logs (due 18-Nov-2026 under `MGT-DET-S4-01`) is completed.
  4. Legal counsel review of the registration deed (`QA-LEG-01`) is returned with written sign-off.

---

## 3. Proposed Management Determination for Ratification

The following determination is prepared for entry into `AAA_Stage4_Management_Approval_and_Gate_Register.md`:

### **Determination Reference: `MGT-DET-S5-STAGING-03`**
- **Date of Execution:** 05-November-2026
- **Subject:** Ratification of Staging Provisioning Plan, Sibling Practice Attribution Architecture, and Disaster Recovery Policy Selection.
- **Ratifying Authority:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)
- **Formal Determination Outcome:** 🟢 **RATIFIED & AUTHORIZED**
- **Binding Directives:**
  > *"The Management of Arnav Abacus Academy formally adopts Deliverables 1 through 5 (`AAA_SIBLING_PRACTICE_ATTRIBUTION_DESIGN.md` through `AAA_NEXT_MANAGEMENT_APPROVAL_REQUEST.md`). Management authorizes the immediate zero-cost provisioning of isolated Supabase Mumbai staging database `aaa-web-staging` and the execution of the 7-part PostgreSQL capacity test suite. Management adopts the Sibling Practice Attribution Design, ordering multi-sibling practice functionality to remain disabled until Phase 2 student attribution is verified. Management resolves the Disaster Recovery Policy under [Pathway 3A / Pathway 3B]. Production `main` remains strictly locked at `a21a3d1129cc17fc6650bfd04648eb91199e6fa8`."*

---

## 4. Formal Endorsement & Authorization Sign-Off

```
========================================================================================
                      MANAGEMENT APPROVAL & RATIFICATION SIGN-OFF
========================================================================================

1. Operations, Technology & Compliance Lead:

   Signature: _________________________________________
   Name:      Nitin Patil
   Date:      05-November-2026


2. Founder & Academic Director:

   Signature: _________________________________________
   Name:      Neha Patil
   Date:      05-November-2026

========================================================================================
```
