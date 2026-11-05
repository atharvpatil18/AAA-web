# ARNAV ABACUS ACADEMY (AAA) — PROJECT GOVERNANCE CORRECTION
## Management Determination Correction Proposal: MGT-DET-S5-STAGING-03

**Document Reference:** `AAA_MGT_DET_S5_STAGING_03_CORRECTION_REQUEST`  
**Target Determination for Amendment:** `MGT-DET-S5-STAGING-03`  
**Governing Register:** `docs/04_implementation/AAA_Stage4_Management_Approval_and_Gate_Register.md` (Line 39)  
**Proposed Corrective Determination:** `MGT-DET-S5-STAGING-03-CORR-01`  
**Accountable Leadership:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)  
**Date of Submission:** 05-November-2026  

---

## 1. Executive Summary & Governance Integrity Statement

In strict compliance with management instructions:
> *"Preserve the historical text of MGT-DET-S5-STAGING-03. Create a separate correction proposal... Do not silently rewrite or backdate the original determination."*

This document formally records the technical discrepancy identified in `MGT-DET-S5-STAGING-03` and submits the precise corrective determination for leadership ratification.

---

## 2. Itemized Discrepancy & Technical Reality Analysis

### 2.1 The Original Approved Statement
In Determination `MGT-DET-S5-STAGING-03` (recorded 05-Nov-2026), the text approved under Directive 3 stated:
> *"...Formally ratifies Pathway 3A: temporary pre-launch variance to RPO <= 24 hours backed by daily snapshots and instant WhatsApp inquiry logs, preserving strictly ₹0.00/month spend."*

### 2.2 The Technical Discrepancy
- **The Discrepancy:** The text assumed that Supabase Free Tier takes and stores automated daily snapshots.
- **The Actual Provider Reality:** As verified via official Supabase documentation (checked 05-Nov-2026), the Free Tier includes **0 days of automated backup retention**. Supabase does not take automatic daily snapshots for free projects.
- **Operational Impact:** To maintain the ₹0.00/month mandate under Pathway 3A, AAA cannot rely on provider automation. Daily exports must be **independently managed and scheduled** via `pg_dump` over SSL with encrypted off-site storage.

---

## 3. Proposed Corrective Determination Text

The following corrective determination is prepared for entry into `AAA_Stage4_Management_Approval_and_Gate_Register.md` without altering the historical record:

```markdown
| Determination ID | Date of Execution | Subject / Scope | Ratifying Authority | Formal Determination Outcome | Binding Implementation Conditions |
| :---: | :---: | :--- | :--- | :---: | :--- |
| **MGT-DET-S5-STAGING-03-CORR-01** | 05-Nov-2026 | **Factual Correction to Pathway 3A Disaster Recovery Strategy (MGT-DET-S5-STAGING-03 Amendment)** | Nitin Patil & Neha Patil | 🟢 **RATIFIED & AMENDED (INDEPENDENT ZERO-COST BACKUP POSTURE)** | Formally accepts the Supabase Free Tier Backup Capability Verification (`AAA_SUPABASE_FREE_TIER_BACKUP_CAPABILITY_VERIFICATION.md`) and Corrected Strategy (`AAA_PATHWAY_3A_RECOVERY_STRATEGY_CORRECTION.md`). Corrects the technical description of Pathway 3A: clarifies that Supabase Free Tier does NOT provide automated daily snapshots. Re-defines Pathway 3A as an Independently Managed Backup Architecture (daily scheduled pg_dump over SSL, AES-256 GPG encryption, off-site storage, automated failure alerts, and instant WhatsApp inquiry logs) preserving strictly ₹0.00/month spend. Authorizes staging execution of QA-CAP-01 capacity tests on isolated staging database. Production main remains strictly locked at a21a3d1129cc17fc6650bfd04648eb91199e6fa8. |
```

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
