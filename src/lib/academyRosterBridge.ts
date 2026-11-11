/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Arnav Abacus Academy (AAA) — AcademyOS Roster Ingestion Sync Bridge
 * Governing Determination: MGT-DET-S4-S3-STEP0-WS18-08 (WS-18)
 * Authority: Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Academic Director)
 * 
 * Boundaries:
 * - Does NOT modify /practice/* or /login routes (zero runtime mutation of practice data).
 * - Enforces strict micro-batch capacity cap (maximum 5 students per batch).
 * - Enforces Dual-Identity Decoupling: strips marketing consent, UTMs, and IP hashes.
 * - Protects CSV roster downloads against spreadsheet formula injection (CWE-1236).
 */

import {
  LeadRecord,
  LeadActorRole,
  MicroBatchRecord
} from "../types/crm";
import { ApprovedEmailRecord, LevelPermission, EnrolledSiblingSummary } from "../types";
import { formatCellForCsvExport } from "./intakeGatewayEngine";

export const MAX_BATCH_CAPACITY = 5 as const;

export class BatchCapacityExceededError extends Error {
  constructor(batchName: string, maxCapacity: number = MAX_BATCH_CAPACITY) {
    super(`Cannot enroll student: Batch "${batchName}" has reached its maximum limit of ${maxCapacity} students.`);
    this.name = "BatchCapacityExceededError";
  }
}

export class UnauthorizedEnrollmentRoleError extends Error {
  constructor(role: string) {
    super(`Role "${role}" is not authorized to execute student enrollment. Requires ACADEMIC_DIRECTOR (Neha Patil) or authorized ADMISSIONS_COORDINATOR.`);
    this.name = "UnauthorizedEnrollmentRoleError";
  }
}

export class InvalidEnrollmentStateError extends Error {
  constructor(currentState: string) {
    super(`Cannot enroll lead in state "${currentState}". Valid prior states: DECISION_PENDING, RECOMMENDATION_DELIVERED, or FOLLOW_UP_ACTIVE.`);
    this.name = "InvalidEnrollmentStateError";
  }
}

export interface EnrolledStudentProfile {
  studentUid: string;              // Format: "AAA-STD-YYYY-XXXX"
  leadReference: string;           // Decoupled source cross-reference: "AAA-LEAD-YYYY-XXXXX"
  displayName: string;             // Student first name + initial
  parentEmail: string;             // Authenticated login email for AcademyOS
  emergencyPhone: string;          // Normalized 10-digit Indian mobile
  assignedBatchId: string;         // e.g. "AAA-BATCH-2026-ABA-WAKAD-01"
  enrolledCourse: "abacus" | "vedic" | "mental" | "school_maths" | "olympiad";
  assignedLevels: string[];        // e.g. ["JR-0", "JR-1"]
  accessMode: "both" | "quiz" | "learn";
  enrollmentDate: string;          // ISO 8601
  status: "ACTIVE" | "ON_LEAVE" | "COMPLETED" | "WITHDRAWN";
  retentionExempt: true;           // Statutory exemption under DPDP Act 2023 Sec 6/9
}

export interface MicroBatchRoster {
  batchId: string;
  batchName: string;
  program: "abacus" | "vedic" | "mental" | "school_maths" | "olympiad";
  schedule: string;
  venue: "offline_wakad" | "live_online";
  maxCapacity: 5;
  enrolledStudents: {
    studentUid: string;
    studentName: string;
    enrolledAt: string;
  }[];
  isFull: boolean;
}

/**
 * Generates deterministic sequential Student UID: AAA-STD-[YEAR]-[0001]
 */
export function generateStudentUid(academicYear: number = 2026, sequenceNumber: number): string {
  if (sequenceNumber < 1) {
    throw new Error("Student sequence number must be positive and non-zero.");
  }
  return `AAA-STD-${academicYear}-${sequenceNumber.toString().padStart(4, "0")}`;
}

/**
 * Creates a new micro-batch with enforced 5-student capacity cap.
 */
export function createMicroBatch(
  config: Omit<MicroBatchRoster, "enrolledStudents" | "isFull" | "maxCapacity">
): MicroBatchRoster {
  return {
    ...config,
    maxCapacity: MAX_BATCH_CAPACITY,
    enrolledStudents: [],
    isFull: false
  };
}

/**
 * Maps public course identifiers to internal AcademyOS course types.
 */
export function mapToAcademyOsCourse(
  programInterest: string
): "abacus" | "vedic" | "mental" | "school_maths" | "olympiad" {
  const norm = programInterest.toLowerCase().trim();
  if (norm.includes("abacus")) return "abacus";
  if (norm.includes("vedic")) return "vedic";
  if (norm.includes("mental")) return "mental";
  if (norm.includes("school")) return "school_maths";
  if (norm.includes("olympiad") || norm.includes("ipm")) return "olympiad";
  return "abacus";
}

/**
 * Hydrates or merges an ApprovedEmailRecord for AcademyOS accessControl.ts.
 * Supports multi-student sibling accounts under a single parent email without data collision.
 */
export function hydrateApprovedRecord(
  profile: EnrolledStudentProfile,
  existingRecord?: ApprovedEmailRecord | null
): ApprovedEmailRecord {
  let mappedCourse: "abacus" | "vedic" | "mental" | "all" = "abacus";
  if (profile.enrolledCourse === "abacus") mappedCourse = "abacus";
  else if (profile.enrolledCourse === "vedic") mappedCourse = "vedic";
  else if (profile.enrolledCourse === "mental") mappedCourse = "mental";
  else mappedCourse = "all";

  const newPermission: LevelPermission = {
    course: mappedCourse,
    levels: profile.assignedLevels.length > 0 ? profile.assignedLevels : ["ALL"],
    accessMode: profile.accessMode
  };

  const currentSiblingSummary: EnrolledSiblingSummary = {
    studentUid: profile.studentUid,
    studentName: profile.displayName,
    assignedLevels: profile.assignedLevels,
    enrolledAt: profile.enrollmentDate
  };

  const existingStudents = existingRecord?.students ? [...existingRecord.students] : [];
  const existingIdx = existingStudents.findIndex((s) => s.studentUid === profile.studentUid);

  let mergedStudents: EnrolledSiblingSummary[];
  if (existingIdx >= 0) {
    mergedStudents = [...existingStudents];
    mergedStudents[existingIdx] = currentSiblingSummary;
  } else {
    // If existing record has an older single studentName not yet in students array, preserve both
    if (existingStudents.length === 0 && existingRecord?.studentName && existingRecord.studentName !== profile.displayName) {
      mergedStudents = [
        { studentUid: "AAA-STD-LEGACY", studentName: existingRecord.studentName },
        currentSiblingSummary
      ];
    } else {
      mergedStudents = [...existingStudents, currentSiblingSummary];
    }
  }

  // Merge permissions across courses cleanly
  const existingPermissions = existingRecord?.permissions ? [...existingRecord.permissions] : [];
  const coursePermIdx = existingPermissions.findIndex((p) => p.course === mappedCourse);
  if (coursePermIdx >= 0) {
    const combinedLevels = Array.from(new Set([...existingPermissions[coursePermIdx].levels, ...newPermission.levels]));
    existingPermissions[coursePermIdx] = {
      ...existingPermissions[coursePermIdx],
      levels: combinedLevels,
      accessMode: newPermission.accessMode === "both" || existingPermissions[coursePermIdx].accessMode === "both" ? "both" : newPermission.accessMode
    };
  } else {
    existingPermissions.push(newPermission);
  }

  // Display name formatting: "Aarav & Ananya" if multiple siblings
  const compositeDisplayName = mergedStudents.map((s) => s.studentName).join(" & ");

  return {
    email: profile.parentEmail.toLowerCase().trim(),
    studentName: compositeDisplayName,
    students: mergedStudents,
    isAdmin: existingRecord?.isAdmin || false,
    permissions: existingPermissions,
    createdAt: existingRecord?.createdAt || profile.enrollmentDate
  };
}

/**
 * Enrolls a lead into a micro-batch and generates decoupled AcademyOS student profile.
 * Strips all marketing telemetry and IP hashes to protect children's data privacy.
 */
export function enrollLeadToRoster(params: {
  lead: LeadRecord;
  batch: MicroBatchRoster;
  parentEmail: string;
  studentDisplayName: string;
  assignedLevels: string[];
  accessMode?: "both" | "quiz" | "learn";
  actorRole: LeadActorRole;
  actorName: string;
  academicYear?: number;
  nowIso?: string;
  existingApprovedRecord?: ApprovedEmailRecord | null;
}): {
  studentProfile: EnrolledStudentProfile;
  updatedBatch: MicroBatchRoster;
  updatedLead: LeadRecord;
  approvedEmailRecord: ApprovedEmailRecord;
} {
  const {
    lead,
    batch,
    parentEmail,
    studentDisplayName,
    assignedLevels,
    accessMode = "both",
    actorRole,
    actorName,
    academicYear = 2026,
    nowIso = new Date().toISOString(),
    existingApprovedRecord
  } = params;

  // 1. Role Boundary Guard
  if (actorRole !== "ACADEMIC_DIRECTOR" && actorRole !== "ADMISSIONS_COORDINATOR") {
    throw new UnauthorizedEnrollmentRoleError(actorRole);
  }

  // 2. State Boundary Guard
  const validPriorStates = ["DECISION_PENDING", "RECOMMENDATION_DELIVERED", "FOLLOW_UP_ACTIVE"];
  if (!validPriorStates.includes(lead.currentState)) {
    throw new InvalidEnrollmentStateError(lead.currentState);
  }

  // 3. Strict Micro-Batch Capacity Guard (Max 5)
  if (batch.enrolledStudents.length >= MAX_BATCH_CAPACITY) {
    throw new BatchCapacityExceededError(batch.batchName, MAX_BATCH_CAPACITY);
  }

  // 4. Deterministic Monotonic Student UID Generation
  const nextSeq = batch.enrolledStudents.length + 1;
  const studentUid = generateStudentUid(academicYear, nextSeq);

  // 5. Build Decoupled AcademyOS Student Profile (Zero Marketing Telemetry)
  const studentProfile: EnrolledStudentProfile = {
    studentUid,
    leadReference: lead.leadId,
    displayName: studentDisplayName.trim(),
    parentEmail: parentEmail.toLowerCase().trim(),
    emergencyPhone: lead.phone,
    assignedBatchId: batch.batchId,
    enrolledCourse: mapToAcademyOsCourse(lead.programInterest),
    assignedLevels,
    accessMode,
    enrollmentDate: nowIso,
    status: "ACTIVE",
    retentionExempt: true // Statutory exemption under Section 6 & 9 DPDP Act 2023
  };

  // 6. Update Micro-Batch Roster
  const updatedStudents = [
    ...batch.enrolledStudents,
    {
      studentUid,
      studentName: studentProfile.displayName,
      enrolledAt: nowIso
    }
  ];

  const updatedBatch: MicroBatchRoster = {
    ...batch,
    enrolledStudents: updatedStudents,
    isFull: updatedStudents.length >= MAX_BATCH_CAPACITY
  };

  // 7. Transition Lead Record to Terminal State ENROLLED
  const updatedLead: LeadRecord = {
    ...lead,
    currentState: "ENROLLED",
    stateEnteredAt: nowIso,
    updatedAt: nowIso,
    enrolledStudentUid: studentUid,
    assignedBatchId: batch.batchId,
    history: [
      {
        transitionId: `TR-ENROLL-${Date.now()}`,
        fromState: lead.currentState,
        toState: "ENROLLED",
        timestamp: nowIso,
        actor: actorRole,
        actorName,
        notes: `Enrolled into ${batch.batchName} (${updatedBatch.enrolledStudents.length}/5). Student UID: ${studentUid}`
      },
      ...lead.history
    ]
  };

  // 8. Hydrate AcademyOS Access Record (Preserving Sibling Accounts)
  const approvedEmailRecord = hydrateApprovedRecord(studentProfile, existingApprovedRecord);

  return {
    studentProfile,
    updatedBatch,
    updatedLead,
    approvedEmailRecord
  };
}

/**
 * Generates a RFC 4180 CSV export of the student roster, protected against Formula Injection (CWE-1236).
 */
export function generateRosterCsv(
  batch: MicroBatchRoster,
  profiles: EnrolledStudentProfile[]
): string {
  const headers = [
    "Student UID",
    "Student Name",
    "Parent Email",
    "Emergency Mobile",
    "Batch Name",
    "Schedule",
    "Venue",
    "Course",
    "Levels",
    "Status",
    "Enrollment Date",
    "DPDP Retention Status"
  ];

  const headerRow = headers.map(h => formatCellForCsvExport(h)).join(",");

  const rows = profiles.map(p => {
    return [
      formatCellForCsvExport(p.studentUid),
      formatCellForCsvExport(p.displayName),
      formatCellForCsvExport(p.parentEmail),
      formatCellForCsvExport(p.emergencyPhone),
      formatCellForCsvExport(batch.batchName),
      formatCellForCsvExport(batch.schedule),
      formatCellForCsvExport(batch.venue === "offline_wakad" ? "Wakad Center (Bungalow No. 3)" : "Online Live"),
      formatCellForCsvExport(p.enrolledCourse),
      formatCellForCsvExport(p.assignedLevels.join("; ")),
      formatCellForCsvExport(p.status),
      formatCellForCsvExport(p.enrollmentDate),
      formatCellForCsvExport("EXEMPT (Active Student)")
    ].join(",");
  });

  return [headerRow, ...rows].join("\r\n");
}

/**
 * Verifies statutory DPDP retention exemption for active enrolled students.
 */
export function verifyStudentRetentionExemption(profile: EnrolledStudentProfile): {
  exempt: boolean;
  reason: string;
} {
  if (profile.retentionExempt && profile.status === "ACTIVE") {
    return {
      exempt: true,
      reason: "Exempt from 90-day prospective purge: Active enrolled student educational record (DPDP Act 2023 Sec 6/9)."
    };
  }
  return {
    exempt: false,
    reason: "Student record is not actively enrolled; subject to standard retention review."
  };
}
