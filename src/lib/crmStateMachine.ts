/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Arnav Abacus Academy (AAA) — 14-State Admissions Lead CRM Engine
 * Governing Determination: MGT-DET-S4-S2-AUTH-02 (WS-13)
 * Authority: Nitin Patil (Operations & Tech Lead) & Neha Patil (Academic Director)
 */

import {
  LeadState,
  LeadActorRole,
  LeadRecord,
  LeadStateTransition,
  MicroBatchRecord,
  SLAStatus
} from "../types/crm";

export const PERMITTED_TRANSITIONS: Record<LeadState, LeadState[]> = {
  ENQUIRY_RECEIVED: ["PARENT_CONTACTED", "ENQUIRY_CANCELLED"],
  PARENT_CONTACTED: ["DISCOVERY_SCHEDULED", "ENQUIRY_CANCELLED", "LEAD_DORMANT_PURGE_PENDING"],
  DISCOVERY_SCHEDULED: ["DISCOVERY_REMINDED", "DISCOVERY_RESCHEDULED", "ENQUIRY_CANCELLED"],
  DISCOVERY_REMINDED: ["DISCOVERY_ATTENDED", "DISCOVERY_NO_SHOW", "DISCOVERY_RESCHEDULED"],
  DISCOVERY_ATTENDED: ["OBSERVATION_COMPLETED"],
  DISCOVERY_NO_SHOW: ["DISCOVERY_RESCHEDULED", "LEAD_DORMANT_PURGE_PENDING"],
  DISCOVERY_RESCHEDULED: ["DISCOVERY_SCHEDULED", "ENQUIRY_CANCELLED"],
  OBSERVATION_COMPLETED: ["RECOMMENDATION_DELIVERED"],
  RECOMMENDATION_DELIVERED: ["DECISION_PENDING", "ENROLLED", "ENQUIRY_CANCELLED"],
  DECISION_PENDING: ["ENROLLED", "FOLLOW_UP_ACTIVE", "ENQUIRY_CANCELLED"],
  FOLLOW_UP_ACTIVE: ["ENROLLED", "ENQUIRY_CANCELLED", "LEAD_DORMANT_PURGE_PENDING"],
  ENROLLED: [], // Terminal admissions state (migrates to AcademyOS active roster)
  ENQUIRY_CANCELLED: ["LEAD_DORMANT_PURGE_PENDING"],
  LEAD_DORMANT_PURGE_PENDING: [] // Terminal state (queued for automated DPDP purge)
};

export const STATE_SLA_HOURS: Record<LeadState, number> = {
  ENQUIRY_RECEIVED: 4,
  PARENT_CONTACTED: 24,
  DISCOVERY_SCHEDULED: 72,
  DISCOVERY_REMINDED: 24,
  DISCOVERY_ATTENDED: 2,
  DISCOVERY_NO_SHOW: 1,
  DISCOVERY_RESCHEDULED: 24,
  OBSERVATION_COMPLETED: 2,
  RECOMMENDATION_DELIVERED: 4,
  DECISION_PENDING: 120, // 5 calendar days
  FOLLOW_UP_ACTIVE: 168, // 7 calendar days
  ENROLLED: 24,
  ENQUIRY_CANCELLED: 24,
  LEAD_DORMANT_PURGE_PENDING: 2160 // 90 calendar days
};

export class InvalidStateTransitionError extends Error {
  constructor(fromState: LeadState, toState: LeadState, reason?: string) {
    super(`Invalid Lead CRM state transition from "${fromState}" to "${toState}". ${reason || "Transition not permitted by state machine."}`);
    this.name = "InvalidStateTransitionError";
  }
}

export class UnauthorizedRoleError extends Error {
  constructor(role: LeadActorRole, action: string) {
    super(`Role "${role}" is not authorized to execute: ${action}.`);
    this.name = "UnauthorizedRoleError";
  }
}

export class BatchCapacityExceededError extends Error {
  constructor(batchName: string, maxCapacity: number) {
    super(`Cannot enroll student: Batch "${batchName}" has reached its maximum limit of ${maxCapacity} students.`);
    this.name = "BatchCapacityExceededError";
  }
}

/**
 * Normalizes an Indian phone number to clean 10 digits.
 */
export function normalizePhone(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.substring(2);
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    return digits.substring(1);
  }
  if (digits.length === 10) {
    return digits;
  }
  throw new Error(`Invalid mobile number "${rawPhone}". Must be a valid 10-digit Indian phone number.`);
}

/**
 * Detects existing active lead with the same phone number to prevent duplicate rows.
 */
export function detectDuplicateLead(leads: LeadRecord[], rawPhone: string): LeadRecord | undefined {
  const cleanPhone = normalizePhone(rawPhone);
  return leads.find(l => 
    l.phone === cleanPhone &&
    l.currentState !== "ENROLLED" &&
    l.currentState !== "LEAD_DORMANT_PURGE_PENDING"
  );
}

/**
 * Calculates current SLA status for a lead.
 */
export function calculateSLAStatus(lead: LeadRecord, currentTimeMs: number = Date.now()): SLAStatus {
  const maxHours = STATE_SLA_HOURS[lead.currentState] || 24;
  const enteredMs = new Date(lead.stateEnteredAt).getTime();
  const elapsedMs = Math.max(0, currentTimeMs - enteredMs);
  const elapsedHours = Number((elapsedMs / (1000 * 60 * 60)).toFixed(1));
  const percentElapsed = Math.round((elapsedHours / maxHours) * 100);

  let status: "NORMAL" | "WARNING" | "BREACHED" = "NORMAL";
  if (percentElapsed >= 100) {
    status = "BREACHED";
  } else if (percentElapsed >= 80) {
    status = "WARNING";
  }

  return {
    state: lead.currentState,
    maxDurationHours: maxHours,
    elapsedHours,
    percentElapsed,
    status
  };
}

/**
 * Transitions a lead to a new state with strict validation of permitted pathways and actor roles.
 */
export function transitionLeadState(
  lead: LeadRecord,
  nextState: LeadState,
  actor: LeadActorRole,
  actorName: string,
  notes?: string,
  nowIso: string = new Date().toISOString()
): LeadRecord {
  const permitted = PERMITTED_TRANSITIONS[lead.currentState];
  if (!permitted.includes(nextState)) {
    throw new InvalidStateTransitionError(lead.currentState, nextState);
  }

  // Role Boundary 1: Only Academic Director (Neha Patil) can complete diagnostic observations
  if (nextState === "OBSERVATION_COMPLETED" && actor !== "ACADEMIC_DIRECTOR") {
    throw new UnauthorizedRoleError(actor, "OBSERVATION_COMPLETED requires exclusive Academic Director (Neha Patil) sign-off.");
  }

  // Role Boundary 2: Dormant purge transition requires Compliance Officer or System Automation
  if (nextState === "LEAD_DORMANT_PURGE_PENDING" && actor !== "COMPLIANCE_OFFICER" && actor !== "SYSTEM_AUTOMATION") {
    throw new UnauthorizedRoleError(actor, "LEAD_DORMANT_PURGE_PENDING requires Compliance Officer or Automated DPDP Engine execution.");
  }

  // Business Rule: Max 2 reschedules permitted
  let newRescheduleCount = lead.rescheduleCount;
  if (nextState === "DISCOVERY_RESCHEDULED") {
    if (lead.rescheduleCount >= 2) {
      throw new InvalidStateTransitionError(
        lead.currentState, 
        nextState, 
        "Maximum 2 discovery session reschedules reached. Requires personal review by Nitin Patil."
      );
    }
    newRescheduleCount += 1;
  }

  const transitionEvent: LeadStateTransition = {
    transitionId: `TR-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    fromState: lead.currentState,
    toState: nextState,
    timestamp: nowIso,
    actor,
    actorName,
    notes
  };

  return {
    ...lead,
    currentState: nextState,
    stateEnteredAt: nowIso,
    updatedAt: nowIso,
    rescheduleCount: newRescheduleCount,
    history: [transitionEvent, ...lead.history]
  };
}

/**
 * Enrolls a lead into a micro-batch, enforcing the strict max 5 students cap and generating AcademyOS Student UID.
 */
export function enrollLeadIntoBatch(
  lead: LeadRecord,
  batch: MicroBatchRecord,
  academicYear: number = 2026,
  nowIso: string = new Date().toISOString()
): { updatedLead: LeadRecord; updatedBatch: MicroBatchRecord } {
  // Prerequisite: Can only enroll from decision or recommendation states
  const validPriorStates: LeadState[] = ["DECISION_PENDING", "RECOMMENDATION_DELIVERED", "FOLLOW_UP_ACTIVE"];
  if (!validPriorStates.includes(lead.currentState)) {
    throw new InvalidStateTransitionError(
      lead.currentState,
      "ENROLLED",
      `Student can only be enrolled from decision or recommendation states (current: ${lead.currentState}).`
    );
  }

  // Strict Business Rule: Enforce Maximum 5 students per batch
  if (batch.enrolledCount >= batch.maxCapacity) {
    throw new BatchCapacityExceededError(batch.batchName, batch.maxCapacity);
  }

  const nextSeq = batch.enrolledCount + 1;
  const studentUid = `AAA-STD-${academicYear}-${nextSeq.toString().padStart(4, "0")}`;

  const updatedLead: LeadRecord = {
    ...transitionLeadState(
      lead,
      "ENROLLED",
      "ADMISSIONS_COORDINATOR",
      "Admissions Lead",
      `Formally enrolled into ${batch.batchName}. Generated Student UID: ${studentUid}`,
      nowIso
    ),
    enrolledStudentUid: studentUid,
    assignedBatchId: batch.batchId
  };

  const updatedBatch: MicroBatchRecord = {
    ...batch,
    enrolledCount: nextSeq,
    enrolledStudentUids: [...batch.enrolledStudentUids, studentUid]
  };

  return { updatedLead, updatedBatch };
}
