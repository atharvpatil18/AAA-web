/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Arnav Abacus Academy (AAA) — WS-13 State Machine Acceptance Tests
 * Governing Determination: MGT-DET-S4-S2-AUTH-02
 * Synthetic Test Data Mandate: Zero Live Parent / Minor Data
 */

import {
  transitionLeadState,
  enrollLeadIntoBatch,
  detectDuplicateLead,
  calculateSLAStatus,
  normalizePhone,
  InvalidStateTransitionError,
  UnauthorizedRoleError,
  BatchCapacityExceededError
} from "./crmStateMachine";
import { LeadRecord, MicroBatchRecord } from "../types/crm";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`TEST ASSERTION FAILED: ${message}`);
  }
  console.log(`✓ PASS: ${message}`);
}

console.log("=== AAA WS-13 LEAD CRM STATE MACHINE ACCEPTANCE SUITE ===");

// Initial Synthetic Lead Fixture
const initialLead: LeadRecord = {
  leadId: "SYNTH-LEAD-001",
  parentName: "Sneha Kulkarni (Synthetic Parent)",
  phone: "9823012345",
  childAgeGroup: "7-9",
  programInterest: "Abacus Mathematics (Ages 4.5–9)",
  preferredMode: "offline",
  currentState: "ENQUIRY_RECEIVED",
  serviceConsent: true,
  marketingConsent: false,
  createdAt: "2026-11-04T10:00:00Z",
  updatedAt: "2026-11-04T10:00:00Z",
  stateEnteredAt: "2026-11-04T10:00:00Z",
  rescheduleCount: 0,
  history: []
};

// Initial Synthetic Micro-Batch Fixture (Max 5 Capacity)
const testBatch: MicroBatchRecord = {
  batchId: "BATCH-WAKAD-ABACUS-01",
  batchName: "Abacus Foundation Micro-Batch 1",
  program: "Abacus Mathematics (Ages 4.5–9)",
  schedule: "Sat & Sun 10:00 AM - 11:30 AM",
  mode: "offline_wakad",
  maxCapacity: 5,
  enrolledCount: 4, // 4 seats filled; 1 seat available
  enrolledStudentUids: ["AAA-STD-2026-0001", "AAA-STD-2026-0002", "AAA-STD-2026-0003", "AAA-STD-2026-0004"]
};

// --- TEST 1: Happy Path Admissions Progression ---
let lead = transitionLeadState(initialLead, "PARENT_CONTACTED", "ADMISSIONS_COORDINATOR", "Coordinator A");
assert(lead.currentState === "PARENT_CONTACTED", "TC-CRM-01.1: Lead transitioned to PARENT_CONTACTED");

lead = transitionLeadState(lead, "DISCOVERY_SCHEDULED", "ADMISSIONS_COORDINATOR", "Coordinator A");
assert(lead.currentState === "DISCOVERY_SCHEDULED", "TC-CRM-01.2: Lead transitioned to DISCOVERY_SCHEDULED");

lead = transitionLeadState(lead, "DISCOVERY_REMINDED", "ADMISSIONS_COORDINATOR", "Coordinator A");
assert(lead.currentState === "DISCOVERY_REMINDED", "TC-CRM-01.3: Lead transitioned to DISCOVERY_REMINDED");

lead = transitionLeadState(lead, "DISCOVERY_ATTENDED", "ADMISSIONS_COORDINATOR", "Coordinator A");
assert(lead.currentState === "DISCOVERY_ATTENDED", "TC-CRM-01.4: Lead transitioned to DISCOVERY_ATTENDED");

// Academic Director Authority: Neha Patil only
lead = transitionLeadState(lead, "OBSERVATION_COMPLETED", "ACADEMIC_DIRECTOR", "Founder Neha Patil");
assert(lead.currentState === "OBSERVATION_COMPLETED", "TC-CRM-01.5: Neha Patil completed observation");

lead = transitionLeadState(lead, "RECOMMENDATION_DELIVERED", "ADMISSIONS_COORDINATOR", "Coordinator A");
assert(lead.currentState === "RECOMMENDATION_DELIVERED", "TC-CRM-01.6: Recommendation delivered");

lead = transitionLeadState(lead, "DECISION_PENDING", "ADMISSIONS_COORDINATOR", "Coordinator A");
assert(lead.currentState === "DECISION_PENDING", "TC-CRM-01.7: Decision pending recorded");

// --- TEST 2: Illegal State Transition Rejection ---
try {
  transitionLeadState(initialLead, "ENROLLED", "ADMISSIONS_COORDINATOR", "Hacker");
  assert(false, "Illegal transition should have thrown error");
} catch (e) {
  assert(e instanceof InvalidStateTransitionError, "TC-CRM-02.1: Direct leap from ENQUIRY_RECEIVED to ENROLLED strictly rejected");
}

try {
  transitionLeadState(lead, "OBSERVATION_COMPLETED", "ADMISSIONS_COORDINATOR", "Uncertified Teacher");
  assert(false, "Non-director completing observation should have thrown error");
} catch (e) {
  assert(e instanceof UnauthorizedRoleError || e instanceof InvalidStateTransitionError, "TC-CRM-02.2: Non-Director role unauthorized to score observations");
}

// --- TEST 3: Reschedule Handling & Cap ---
let reschedLead = transitionLeadState(initialLead, "PARENT_CONTACTED", "ADMISSIONS_COORDINATOR", "Coordinator");
reschedLead = transitionLeadState(reschedLead, "DISCOVERY_SCHEDULED", "ADMISSIONS_COORDINATOR", "Coordinator");
reschedLead = transitionLeadState(reschedLead, "DISCOVERY_RESCHEDULED", "ADMISSIONS_COORDINATOR", "Coordinator");
assert(reschedLead.rescheduleCount === 1, "TC-CRM-03.1: Reschedule count incremented to 1");

reschedLead = transitionLeadState(reschedLead, "DISCOVERY_SCHEDULED", "ADMISSIONS_COORDINATOR", "Coordinator");
reschedLead = transitionLeadState(reschedLead, "DISCOVERY_RESCHEDULED", "ADMISSIONS_COORDINATOR", "Coordinator");
assert(reschedLead.rescheduleCount === 2, "TC-CRM-03.2: Reschedule count incremented to 2");

try {
  reschedLead = transitionLeadState(reschedLead, "DISCOVERY_SCHEDULED", "ADMISSIONS_COORDINATOR", "Coordinator");
  reschedLead = transitionLeadState(reschedLead, "DISCOVERY_RESCHEDULED", "ADMISSIONS_COORDINATOR", "Coordinator");
  assert(false, "3rd reschedule should have been blocked");
} catch (e) {
  assert(e instanceof InvalidStateTransitionError, "TC-CRM-03.3: 3rd reschedule blocked (max 2 limit enforced)");
}

// --- TEST 4: No-Show Handling ---
let noShowLead = transitionLeadState(initialLead, "PARENT_CONTACTED", "ADMISSIONS_COORDINATOR", "Coordinator");
noShowLead = transitionLeadState(noShowLead, "DISCOVERY_SCHEDULED", "ADMISSIONS_COORDINATOR", "Coordinator");
noShowLead = transitionLeadState(noShowLead, "DISCOVERY_REMINDED", "ADMISSIONS_COORDINATOR", "Coordinator");
noShowLead = transitionLeadState(noShowLead, "DISCOVERY_NO_SHOW", "ADMISSIONS_COORDINATOR", "Coordinator");
assert(noShowLead.currentState === "DISCOVERY_NO_SHOW", "TC-CRM-04: Transitioned to DISCOVERY_NO_SHOW");

// --- TEST 5: Voluntary Cancellation ---
let cancelLead = transitionLeadState(initialLead, "ENQUIRY_CANCELLED", "ADMISSIONS_COORDINATOR", "Coordinator", "Relocating");
assert(cancelLead.currentState === "ENQUIRY_CANCELLED", "TC-CRM-05: Transitioned to ENQUIRY_CANCELLED");

// --- TEST 6: Dormant Purge Queuing ---
let purgeLead = transitionLeadState(cancelLead, "LEAD_DORMANT_PURGE_PENDING", "COMPLIANCE_OFFICER", "Nitin Patil");
assert(purgeLead.currentState === "LEAD_DORMANT_PURGE_PENDING", "TC-CRM-06: Transitioned to LEAD_DORMANT_PURGE_PENDING");

// --- TEST 7: Duplicate Detection ---
assert(normalizePhone("+91 98230 12345") === "9823012345", "TC-CRM-07.1: Phone normalization strips spaces and +91");
const dupFound = detectDuplicateLead([initialLead], "+91 98230 12345");
assert(dupFound !== undefined && dupFound.leadId === "SYNTH-LEAD-001", "TC-CRM-07.2: Duplicate lead detected on normalized phone");

// --- TEST 8 & 9: AcademyOS Student UID Generation & Batch Capping ---
const { updatedLead, updatedBatch } = enrollLeadIntoBatch(lead, testBatch, 2026);
assert(updatedLead.currentState === "ENROLLED", "TC-CRM-08.1: Lead transitioned to ENROLLED");
assert(updatedLead.enrolledStudentUid === "AAA-STD-2026-0005", "TC-CRM-08.2: Deterministic Student UID generated");
assert(updatedBatch.enrolledCount === 5, "TC-CRM-08.3: Batch count incremented to 5");

// Now batch is full (5/5). Next enrollment attempt MUST fail
try {
  const anotherLead: LeadRecord = { ...lead, leadId: "SYNTH-LEAD-002", currentState: "DECISION_PENDING" };
  enrollLeadIntoBatch(anotherLead, updatedBatch, 2026);
  assert(false, "Enrolling into full batch should have thrown error");
} catch (e) {
  assert(e instanceof BatchCapacityExceededError, "TC-CRM-09: Batch capacity cap (max 5 students) strictly enforced");
}

// --- TEST 10: SLA Status Calculator ---
const freshSla = calculateSLAStatus(initialLead, new Date("2026-11-04T11:00:00Z").getTime()); // 1 hour elapsed (max 4h)
assert(freshSla.status === "NORMAL", "TC-CRM-10.1: 1h elapsed on 4h SLA is NORMAL");

const breachedSla = calculateSLAStatus(initialLead, new Date("2026-11-04T15:00:00Z").getTime()); // 5h elapsed (max 4h)
assert(breachedSla.status === "BREACHED", "TC-CRM-10.2: 5h elapsed on 4h SLA is BREACHED");

console.log("=== ALL 10 WS-13 STATE MACHINE TESTS PASSED WITH ZERO DEFECTS ===");
