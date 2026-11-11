# ARNAV ABACUS ACADEMY (AAA) — WS-07 REFINED MANAGEMENT DECISION REGISTER
## Six-Part Discrete Management Determination Instrument (`MGT-DET-S3-10`)

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Stage:** Stage 3 — Architecture & Design  
**Workstream:** WS-07 — AcademyOS Boundary Isolation & Protection Architecture  
**Document Ref:** `AAA-S3-MGT-WS07-02`  
**Date of Presentation:** 03 November 2026 (Updated with Management Recommendations)  
**Status:** 🟢 **FORMALLY RATIFIED & EXECUTED UNDER MGT-DET-S3-10**  
**Executive Reviewers:** Nitin Patil (Operations & Technology Lead) & Neha Patil (Founder & Academic Director)  
**Applicable Stage-Gate:** Stage-Gate 3.2 (Status: 🟢 **RATIFIED & CLOSED**)  

---

## 1. Executive Summary & Purpose

In strict accordance with management governance instructions, this register establishes the **six-part discrete management decision structure (`D-1` through `D-6`)** for WS-07.

On 03 November 2026, Nitin Patil (Operations & Technology Lead) and Neha Patil (Founder & Academic Director) reviewed and formally executed all determinations `D-1` through `D-6`, closing **Stage-Gate 3.2** and authorizing progression to **WS-08**.

---

## 2. Six-Part Discrete Management Determination Record (`MGT-DET-S3-10`)

```
========================================================================================
MANAGEMENT DETERMINATION RECORD: MGT-DET-S3-10 (REFINED & EXECUTED)
Subject: Six-Part Architectural Determinations for Workstream WS-07
Date of Execution: 03 November 2026
Executive Authority: Nitin Patil (Operations & Tech Lead) & Neha Patil (Founder & Academic Director)
Stage-Gate 3.2 Status: 🟢 CLOSED
========================================================================================

[X] DETERMINATION D-1 — BOUNDARY ISOLATION ARCHITECTURE & TRUST PRINCIPLE (Nitin Patil)
    Scope:
    - Approves the logical separation of the platform into three distinct operational zones:
      Zone 1 (Public Website & Parent Admissions), Zone 2 (AcademyOS Student Practice), and 
      Zone 3 (Internal Academy Administration).
    - Approves the target architecture principle of trusted server-side security enforcement 
      (transitioning from browser-side client checks to server-enforced authentication).
    - Formally defers all cloud hosting, serverless compute provider, and edge infrastructure 
      decisions to Workstream WS-11 (Platform Infrastructure & Hosting).
    
    Formal Management Decision: [X] APPROVED WITH AMENDMENTS   [ ] APPROVED   [ ] REJECTED
    Sign-off: Nitin Patil (Operations & Technology Lead)    Date: 03-Nov-2026

----------------------------------------------------------------------------------------

[X] DETERMINATION D-2 — PERSISTENCE & JSONBLOB CONTROLLED DEPRECATION (Nitin Patil)
    Scope:
    - Approves the controlled deprecation assessment and planning framework for the two
      hardcoded public jsonblob.com endpoints.
    - Mandates completion and verification of the 11-point Migration Readiness Checklist before any
      migration script is executed.
    - Explicitly DEFERS replacement-provider selection, data migration execution, endpoint disablement,
      and data deletion to separate future management approval gates.
    
    Formal Management Decision: [X] APPROVED WITH AMENDMENTS   [ ] APPROVED   [ ] REJECTED
    Sign-off: Nitin Patil (Operations & Technology Lead)    Date: 03-Nov-2026

----------------------------------------------------------------------------------------

[X] DETERMINATION D-3 — PERMANENT STUDENT IDENTITY PRINCIPLE (Joint)
    Scope:
    - Formally reaffirms the non-negotiable Stage 2 principle: "One permanent Student ID per child, 
      with multiple programmes attached to the same Student ID."
    - Formally records the candidate format AAA-STU-YYYY-XXXX as a PROPOSED DESIGN SPECIFICATION ONLY,
      pending database schema selection and historical data reconciliation.
    - Explicitly DEFERS final identifier formatting and database field structures to Workstream WS-09.
    
    Formal Management Decision: [X] APPROVED   [ ] APPROVED WITH AMENDMENTS   [ ] REJECTED
    Sign-off (Joint): Neha Patil & Nitin Patil              Date: 03-Nov-2026

----------------------------------------------------------------------------------------

[X] DETERMINATION D-4 — CHILD DEVELOPMENT PRIVACY & LEADERBOARD REFORM (Neha Patil)
    Scope:
    - Formally approves the pedagogical policy prohibiting public developmental rankings and public
      comparisons of children's individual calculation scores.
    - Formally approves "child-versus-own-previous-progress" as the foundational developmental principle
      for all AcademyOS practice results.
    - Confirms that pseudonymous data remains subject to strict internal child privacy protections.
    - Explicitly DEFERS detailed display permissions and parent-sharing feature rollout pending 
      the WS-10 privacy review.
    
    Formal Management Decision: [X] APPROVED WITH AMENDMENTS   [ ] APPROVED   [ ] REJECTED
    Sign-off: Neha Patil (Founder & Academic Director)      Date: 03-Nov-2026

----------------------------------------------------------------------------------------

[X] DETERMINATION D-5 — MULTI-PROGRAMME & SIBLING RELATIONSHIP PRINCIPLES (Joint)
    Scope:
    - Reaffirms that an individual student profile must support simultaneous active enrollments in 
      multiple learning streams (e.g. Abacus, Vedic, School Math) under a single student record.
    - Reaffirms that multiple siblings must be supported under a unified parent contact identity 
      without collision or attempt data overwriting.
    - Explicitly DEFERS parent/sibling database relationship schemas to Workstream WS-09.
    
    Formal Management Decision: [X] APPROVED WITH AMENDMENTS   [ ] APPROVED   [ ] REJECTED
    Sign-off (Joint): Neha Patil & Nitin Patil              Date: 03-Nov-2026

----------------------------------------------------------------------------------------

[X] DETERMINATION D-6 — WS-07 ARCHITECTURAL RATIFICATION & GATE 3.2 CLOSURE (Joint)
    Scope:
    - Ratifies Deliverable AAA-S3-SPEC-WS07-01 and closes Stage-Gate 3.2.
    - Authorizes commencement of Workstream WS-08 (Diagnostic Assessment Architecture) 
      and WS-09 (Technology Architecture & CRM Strategy).
    
    Formal Management Decision: [X] APPROVED   [ ] DEFERRED   [ ] REJECTED
    Sign-off (Joint): Neha Patil & Nitin Patil              Date: 03-Nov-2026
========================================================================================
```

---

## 3. Formal Stage-Gate Closure Record & Next Actions

> [!NOTE]
> **GATE 3.2 RATIFICATION & PROGRESSION RECORD:**  
> 1. **Determinations D-1 through D-6 are FORMALLY RATIFIED** under `MGT-DET-S3-10`.  
> 2. **Stage-Gate 3.2 is officially CLOSED.**  
> 3. Management has authorized commencement of **WS-08 (Diagnostic Assessment & Learning Recommendation Architecture)**.  
> 4. The Stage 3 implementation freeze remains active across `src/` and `public/`.

---
*End of Refined Management Decision Register (AAA-S3-MGT-WS07-02) — Ratified under MGT-DET-S3-10.*
