/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Arnav Abacus Academy (AAA) — Admissions & Lead CRM Type Definitions
 * Governing Determination: MGT-DET-S4-S2-AUTH-02 (WS-13)
 * Authority: Nitin Patil (Operations & Tech Lead) & Neha Patil (Academic Director)
 */

export type LeadState =
  | "ENQUIRY_RECEIVED"
  | "PARENT_CONTACTED"
  | "DISCOVERY_SCHEDULED"
  | "DISCOVERY_REMINDED"
  | "DISCOVERY_ATTENDED"
  | "DISCOVERY_NO_SHOW"
  | "DISCOVERY_RESCHEDULED"
  | "OBSERVATION_COMPLETED"
  | "RECOMMENDATION_DELIVERED"
  | "DECISION_PENDING"
  | "FOLLOW_UP_ACTIVE"
  | "ENROLLED"
  | "ENQUIRY_CANCELLED"
  | "LEAD_DORMANT_PURGE_PENDING";

export type LeadActorRole =
  | "ADMISSIONS_COORDINATOR"
  | "ACADEMIC_DIRECTOR"    // Neha Patil
  | "COMPLIANCE_OFFICER"    // Nitin Patil
  | "SYSTEM_AUTOMATION";

export interface LeadStateTransition {
  transitionId: string;
  fromState: LeadState;
  toState: LeadState;
  timestamp: string; // ISO 8601
  actor: LeadActorRole;
  actorName: string;
  notes?: string;
}

export interface DiscoverySlotInfo {
  slotUid: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:30 AM"
  deliveryMode: "offline_wakad" | "live_online";
}

export interface LeadRecord {
  leadId: string; // Format: LEAD-YYYY-XXXX
  parentName: string;
  phone: string; // Normalized 10-digit Indian phone (e.g. "9823012345")
  childAgeGroup: string; // Categorical age group (e.g. "7-9")
  programInterest: string;
  preferredMode: "offline" | "online";
  currentState: LeadState;
  serviceConsent: boolean;
  marketingConsent: boolean;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  stateEnteredAt: string; // ISO 8601 for SLA tracking
  rescheduleCount: number;
  discoverySlot?: DiscoverySlotInfo;
  observationId?: string; // Links to WS-12 DiscoverySessionRecord
  enrolledStudentUid?: string; // Format: AAA-STD-YYYY-XXXX
  assignedBatchId?: string;
  cancellationReason?: string;
  history: LeadStateTransition[];
}

export interface MicroBatchRecord {
  batchId: string;
  batchName: string;
  program: string;
  schedule: string; // e.g. "Sat & Sun 10:00 AM - 11:30 AM"
  mode: "offline_wakad" | "live_online";
  maxCapacity: 5; // Strict business rule: maximum 5 students
  enrolledCount: number;
  enrolledStudentUids: string[];
}

export interface SLAStatus {
  state: LeadState;
  maxDurationHours: number;
  elapsedHours: number;
  percentElapsed: number;
  status: "NORMAL" | "WARNING" | "BREACHED";
}
