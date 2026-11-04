# AAA SPRINT 2 — WS-13 TEST AND ACCEPTANCE REGISTER
## Quality Assurance, Acceptance Tests & State Machine Verification

**Document Reference:** `AAA-S2-REG-TEST-WS13-01`  
**Phase:** Stage 4 — Sprint 2 Implementation (WS-13 Lead CRM)  
**Quality Lead:** Nitin Patil (Operations & Tech Lead)  
**Academic Lead:** Neha Patil (Academic Director)  
**Date:** 04 November 2026  
**Status:** 🟡 **AUTHORIZED TEST REGISTER**

---

## 1. Test Case Specifications & Verification Criteria

The table below defines the formal acceptance tests governing the 14-State Admissions Lead CRM Machine:

| Test Case ID | Test Scenario & Scope | Acceptance Criteria & Verification Method | Expected Outcome | Verification Status |
| :---: | :--- | :--- | :--- | :---: |
| **TC-CRM-01** | **Happy Path Admissions Journey** | Sequential progression: `ENQUIRY_RECEIVED` $\rightarrow$ `PARENT_CONTACTED` $\rightarrow$ `DISCOVERY_SCHEDULED` $\rightarrow$ `DISCOVERY_REMINDED` $\rightarrow$ `DISCOVERY_ATTENDED` $\rightarrow$ `OBSERVATION_COMPLETED` $\rightarrow$ `RECOMMENDATION_DELIVERED` $\rightarrow$ `DECISION_PENDING` $\rightarrow$ `ENROLLED`. | State machine permits each transition cleanly; audit log records all timestamps and actors. | 🟡 **Awaiting Implementation** |
| **TC-CRM-02** | **Illegal Transition Rejection** | Attempt to transition directly from `ENQUIRY_RECEIVED` $\rightarrow$ `ENROLLED` without discovery exploration. | State machine throws strict `InvalidStateTransitionError`; state remains unchanged. | 🟡 **Awaiting Implementation** |
| **TC-CRM-03** | **Reschedule Handling** | Parent requests new slot from `DISCOVERY_SCHEDULED` or `DISCOVERY_NO_SHOW`. | Transitions to `DISCOVERY_RESCHEDULED`, increments `rescheduleCount`, transitions back to `DISCOVERY_SCHEDULED`. | 🟡 **Awaiting Implementation** |
| **TC-CRM-04** | **No-Show Handling** | Student fails to attend scheduled discovery session. | Transitions to `DISCOVERY_NO_SHOW`, triggers follow-up outreach alert. | 🟡 **Awaiting Implementation** |
| **TC-CRM-05** | **Voluntary Cancellation** | Parent withdraws enquiry during `DECISION_PENDING` or earlier. | Transitions to `ENQUIRY_CANCELLED`; suppresses all marketing broadcasts; tags reason. | 🟡 **Awaiting Implementation** |
| **TC-CRM-06** | **Dormant Purge Queuing** | Expired or cancelled lead exceeds SLA without response. | Transitions to `LEAD_DORMANT_PURGE_PENDING`; queues record for DPDP cryptographic deletion. | 🟡 **Awaiting Implementation** |
| **TC-CRM-07** | **Duplicate Detection Engine** | Submitting an enquiry with an already active 10-digit WhatsApp phone. | Appends notes to existing lead UID without creating duplicate row or corrupting appointment. | 🟡 **Awaiting Implementation** |
| **TC-CRM-08** | **AcademyOS Student UID Generation** | Completing enrollment in state `ENROLLED`. | Generates deterministic UID matching `AAA-STD-[YYYY]-[XXXX]` and links active cohort. | 🟡 **Awaiting Implementation** |
| **TC-CRM-09** | **Batch Cap Limit Enforcement** | Attempt to assign student to a batch that already has 5 active students. | Enrollment is blocked with warning: *"Batch capacity reached (Maximum 5 students per batch)"*. | 🟡 **Awaiting Implementation** |
| **TC-CRM-10** | **Synthetic Fixture Isolation** | Execution against test fixtures (`SYNTH-LEAD-001` to `SYNTH-LEAD-005`). | Zero production or live customer records accessed. | 🟡 **Awaiting Implementation** |

---

## 2. Test Execution Protocol

- **Engine:** Automated TypeScript unit testing via `npx tsx src/lib/crmStateMachine.test.ts`.
- **Compiler Health:** Full repository check via `npx tsc --noEmit` and `npm run build`.
- **Target Exit Code:** Code 0 across all test suites before stage sign-off.
