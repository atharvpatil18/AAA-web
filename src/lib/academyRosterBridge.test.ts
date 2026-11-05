/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Arnav Abacus Academy (AAA) — AcademyOS Roster Ingestion Sync Bridge Test Suite
 * Target Specification: AAA-WS18-STEP0-SPEC-01
 * Governing Determination: MGT-DET-S4-S3-STEP0-WS18-08
 */

import {
  createMicroBatch,
  generateStudentUid,
  enrollLeadToRoster,
  hydrateApprovedRecord,
  generateRosterCsv,
  verifyStudentRetentionExemption,
  BatchCapacityExceededError,
  UnauthorizedEnrollmentRoleError,
  InvalidEnrollmentStateError,
  MAX_BATCH_CAPACITY,
  EnrolledStudentProfile
} from "./academyRosterBridge";
import { LeadRecord } from "../types/crm";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

console.log("=== AAA WS-18 ACADEMYOS ROSTER BRIDGE TEST SUITE ===");
console.log("Governing Authority: MGT-DET-S4-S3-STEP0-WS18-08");

// Synthetic Base Lead Fixture (Zero real parent/child data)
function createSyntheticLead(overrides: Partial<LeadRecord> = {}): LeadRecord {
  return {
    leadId: "AAA-LEAD-2026-00042",
    parentName: "Synthetic Parent",
    phone: "9823012345",
    childAgeGroup: "7-9",
    programInterest: "Abacus Mathematics",
    preferredMode: "offline",
    currentState: "DECISION_PENDING",
    serviceConsent: true,
    marketingConsent: true,
    createdAt: "2026-11-05T10:00:00.000Z",
    updatedAt: "2026-11-05T10:00:00.000Z",
    stateEnteredAt: "2026-11-05T10:00:00.000Z",
    rescheduleCount: 0,
    history: [],
    ...overrides
  };
}

// -------------------------------------------------------------
// TC-SYNC-01: Micro-Batch Capacity Constraint (Up to 5 Students)
// -------------------------------------------------------------
console.log("\nRunning TC-SYNC-01: Micro-Batch Capacity Constraint...");
{
  let batch = createMicroBatch({
    batchId: "AAA-BATCH-2026-ABA-WAKAD-01",
    batchName: "Junior Abacus — Weekend Batch A",
    program: "abacus",
    schedule: "Sat & Sun 10:00 AM - 11:30 AM",
    venue: "offline_wakad"
  });

  assert(batch.maxCapacity === 5, "Batch max capacity must strictly equal 5.");
  assert(batch.enrolledStudents.length === 0, "Initial enrolled count must be 0.");
  assert(!batch.isFull, "Initial batch must not be full.");

  // Enroll 5 students sequentially
  for (let i = 1; i <= 5; i++) {
    const lead = createSyntheticLead({
      leadId: `AAA-LEAD-2026-000${i}`,
      phone: `982301234${i}`
    });

    const res = enrollLeadToRoster({
      lead,
      batch,
      parentEmail: `parent${i}@example.com`,
      studentDisplayName: `Student ${i}`,
      assignedLevels: ["JR-0", "JR-1"],
      actorRole: "ACADEMIC_DIRECTOR",
      actorName: "Neha Patil"
    });

    batch = res.updatedBatch;
    assert(batch.enrolledStudents.length === i, `Batch should have ${i} enrolled students.`);
    assert(res.studentProfile.studentUid === `AAA-STD-2026-000${i}`, `UID must be AAA-STD-2026-000${i}.`);
  }

  assert(batch.isFull === true, "Batch must be marked full at exactly 5 students.");
  console.log("✅ TC-SYNC-01 Passed: Batch accommodates exactly 5 students with capacity flag set.");
}

// -------------------------------------------------------------
// TC-SYNC-02: 6th Student Hard Overflow Block
// -------------------------------------------------------------
console.log("\nRunning TC-SYNC-02: 6th Student Hard Overflow Block...");
{
  let batch = createMicroBatch({
    batchId: "AAA-BATCH-2026-ABA-WAKAD-02",
    batchName: "Junior Abacus — Weekend Batch B",
    program: "abacus",
    schedule: "Sat & Sun 11:30 AM - 1:00 PM",
    venue: "offline_wakad"
  });

  // Fill batch to 5
  for (let i = 1; i <= 5; i++) {
    const lead = createSyntheticLead({ leadId: `AAA-LEAD-2026-001${i}` });
    const res = enrollLeadToRoster({
      lead,
      batch,
      parentEmail: `parent${i}@example.com`,
      studentDisplayName: `Student ${i}`,
      assignedLevels: ["JR-0"],
      actorRole: "ACADEMIC_DIRECTOR",
      actorName: "Neha Patil"
    });
    batch = res.updatedBatch;
  }

  let overflowIntercepted = false;
  try {
    const sixthLead = createSyntheticLead({ leadId: "AAA-LEAD-2026-0016" });
    enrollLeadToRoster({
      lead: sixthLead,
      batch,
      parentEmail: "parent6@example.com",
      studentDisplayName: "Student 6",
      assignedLevels: ["JR-0"],
      actorRole: "ACADEMIC_DIRECTOR",
      actorName: "Neha Patil"
    });
  } catch (err: any) {
    if (err instanceof BatchCapacityExceededError) {
      overflowIntercepted = true;
    }
  }

  assert(overflowIntercepted, "6th student must trigger BatchCapacityExceededError.");
  console.log("✅ TC-SYNC-02 Passed: 6th student enrollment strictly blocked by batch capacity guard.");
}

// -------------------------------------------------------------
// TC-SYNC-03: Deterministic Student UID Generation
// -------------------------------------------------------------
console.log("\nRunning TC-SYNC-03: Deterministic Student UID Generation...");
{
  const uid1 = generateStudentUid(2026, 1);
  const uid42 = generateStudentUid(2026, 42);
  const uid999 = generateStudentUid(2026, 999);

  assert(uid1 === "AAA-STD-2026-0001", "UID 1 format mismatch.");
  assert(uid42 === "AAA-STD-2026-0042", "UID 42 format mismatch.");
  assert(uid999 === "AAA-STD-2026-0999", "UID 999 format mismatch.");

  let zeroSeqCaught = false;
  try {
    generateStudentUid(2026, 0);
  } catch {
    zeroSeqCaught = true;
  }
  assert(zeroSeqCaught, "Sequence 0 must be rejected.");
  console.log("✅ TC-SYNC-03 Passed: Monotonic deterministic UID generation validated.");
}

// -------------------------------------------------------------
// TC-SYNC-04: Dual-Identity Decoupling
// -------------------------------------------------------------
console.log("\nRunning TC-SYNC-04: Dual-Identity Decoupling...");
{
  const batch = createMicroBatch({
    batchId: "AAA-BATCH-2026-VED-WAKAD-01",
    batchName: "Junior Vedic Mathematics",
    program: "vedic",
    schedule: "Tue & Thu 5:00 PM - 6:30 PM",
    venue: "offline_wakad"
  });

  const lead = createSyntheticLead({
    leadId: "AAA-LEAD-2026-00500",
    programInterest: "Vedic Mathematics"
  });

  const res = enrollLeadToRoster({
    lead,
    batch,
    parentEmail: "vedicparent@example.com",
    studentDisplayName: "Aarav P.",
    assignedLevels: ["JVM-1"],
    actorRole: "ACADEMIC_DIRECTOR",
    actorName: "Neha Patil"
  });

  assert(res.studentProfile.studentUid === "AAA-STD-2026-0001", "Student UID must be allocated.");
  assert(res.studentProfile.leadReference === "AAA-LEAD-2026-00500", "Lead reference preserved for cross-audit.");
  assert(res.studentProfile.studentUid !== res.studentProfile.leadReference, "Student UID must be decoupled from Lead ID.");
  assert(res.updatedLead.enrolledStudentUid === res.studentProfile.studentUid, "Lead record updated with Student UID.");
  assert(res.updatedLead.currentState === "ENROLLED", "Lead transitioned to terminal state ENROLLED.");

  console.log("✅ TC-SYNC-04 Passed: Dual-identity decoupling successfully established.");
}

// -------------------------------------------------------------
// TC-SYNC-05: Telemetry & Honeypot Shredding
// -------------------------------------------------------------
console.log("\nRunning TC-SYNC-05: Telemetry & Honeypot Shredding...");
{
  const batch = createMicroBatch({
    batchId: "AAA-BATCH-2026-MM-ONLINE-01",
    batchName: "Mental Maths Online Foundation",
    program: "mental",
    schedule: "Mon & Wed 6:00 PM - 7:00 PM",
    venue: "live_online"
  });

  const lead = createSyntheticLead({
    marketingConsent: true
  });

  const res = enrollLeadToRoster({
    lead,
    batch,
    parentEmail: "privacytest@example.com",
    studentDisplayName: "Ananya K.",
    assignedLevels: ["MM-1"],
    actorRole: "ACADEMIC_DIRECTOR",
    actorName: "Neha Patil"
  });

  const profile = res.studentProfile as any;
  assert(profile.marketingConsent === undefined, "Marketing consent must not exist on AcademyOS profile.");
  assert(profile.ipAddressHash === undefined, "IP address hash must not exist on AcademyOS profile.");
  assert(profile.honeypotTriggered === undefined, "Honeypot flags must not exist on AcademyOS profile.");
  console.log("✅ TC-SYNC-05 Passed: Telemetry and prospect metadata shredded during roster hydration.");
}

// -------------------------------------------------------------
// TC-SYNC-06: AcademyOS Permission Hydration (accessControl.ts)
// -------------------------------------------------------------
console.log("\nRunning TC-SYNC-06: AcademyOS Permission Hydration...");
{
  const profile: EnrolledStudentProfile = {
    studentUid: "AAA-STD-2026-0005",
    leadReference: "AAA-LEAD-2026-00042",
    displayName: "Rohan M.",
    parentEmail: "rohan.parent@example.com",
    emergencyPhone: "9823012345",
    assignedBatchId: "AAA-BATCH-2026-ABA-WAKAD-01",
    enrolledCourse: "abacus",
    assignedLevels: ["JR-0", "JR-1"],
    accessMode: "both",
    enrollmentDate: "2026-11-05T12:00:00.000Z",
    status: "ACTIVE",
    retentionExempt: true
  };

  const record = hydrateApprovedRecord(profile);

  assert(record.email === "rohan.parent@example.com", "Approved email must be lowercase normalized.");
  assert(record.studentName === "Rohan M.", "Display name preserved.");
  assert(record.isAdmin === false, "Student must not be admin.");
  assert(record.permissions.length === 1, "Exactly 1 permission record hydrated.");
  assert(record.permissions[0].course === "abacus", "Course permission mapped to abacus.");
  assert(record.permissions[0].levels.includes("JR-0") && record.permissions[0].levels.includes("JR-1"), "Levels assigned correctly.");
  assert(record.permissions[0].accessMode === "both", "Access mode set to both (quiz + learn).");

  console.log("✅ TC-SYNC-06 Passed: ApprovedEmailRecord hydrated conforming to accessControl.ts schema.");
}

// -------------------------------------------------------------
// TC-SYNC-07: Course Level Mapping Integrity
// -------------------------------------------------------------
console.log("\nRunning TC-SYNC-07: Course Level Mapping Integrity...");
{
  const batch = createMicroBatch({
    batchId: "AAA-BATCH-2026-IPM-WAKAD-01",
    batchName: "IPM Olympiad Maths Batch 1",
    program: "olympiad",
    schedule: "Sunday 9:00 AM - 12:00 PM",
    venue: "offline_wakad"
  });

  const lead = createSyntheticLead({
    programInterest: "IPM & Olympiad Mathematics"
  });

  const res = enrollLeadToRoster({
    lead,
    batch,
    parentEmail: "olympiad@example.com",
    studentDisplayName: "Tanvi S.",
    assignedLevels: ["IPM-2", "SOF-IMO"],
    actorRole: "ACADEMIC_DIRECTOR",
    actorName: "Neha Patil"
  });

  assert(res.studentProfile.enrolledCourse === "olympiad", "Mapped course must be olympiad.");
  assert(res.studentProfile.assignedLevels.includes("IPM-2"), "IPM-2 level assigned.");
  console.log("✅ TC-SYNC-07 Passed: Course and diagnostic levels cleanly mapped.");
}

// -------------------------------------------------------------
// TC-SYNC-08: Unauthorized Role Enforcement
// -------------------------------------------------------------
console.log("\nRunning TC-SYNC-08: Unauthorized Role Enforcement...");
{
  const batch = createMicroBatch({
    batchId: "AAA-BATCH-2026-ABA-WAKAD-03",
    batchName: "Senior Abacus Batch",
    program: "abacus",
    schedule: "Sat 4:00 PM - 5:30 PM",
    venue: "offline_wakad"
  });

  const lead = createSyntheticLead();

  let unauthCaught = false;
  try {
    enrollLeadToRoster({
      lead,
      batch,
      parentEmail: "unauth@example.com",
      studentDisplayName: "Unauthorized Test",
      assignedLevels: ["SR-1"],
      actorRole: "SYSTEM_AUTOMATION" as any,
      actorName: "Automated Bot"
    });
  } catch (err: any) {
    if (err instanceof UnauthorizedEnrollmentRoleError) {
      unauthCaught = true;
    }
  }

  assert(unauthCaught, "Non-director role must be blocked from enrollment.");
  console.log("✅ TC-SYNC-08 Passed: Unauthorized role prevented from enrolling students.");
}

// -------------------------------------------------------------
// TC-SYNC-09: CSV Roster Export Formula Neutralization (CWE-1236)
// -------------------------------------------------------------
console.log("\nRunning TC-SYNC-09: CSV Roster Export Formula Neutralization...");
{
  const batch = createMicroBatch({
    batchId: "AAA-BATCH-2026-CSV-TEST",
    batchName: "=cmd|' /C calc'!A0", // Malicious batch name
    program: "abacus",
    schedule: "+91 9999999999", // Formula trigger plus
    venue: "offline_wakad"
  });

  const maliciousProfile: EnrolledStudentProfile = {
    studentUid: "AAA-STD-2026-0099",
    leadReference: "AAA-LEAD-2026-00099",
    displayName: "@MaliciousStudent", // Formula trigger @
    parentEmail: "safe.parent@example.com",
    emergencyPhone: "9823012345",
    assignedBatchId: batch.batchId,
    enrolledCourse: "abacus",
    assignedLevels: ["JR-1"],
    accessMode: "both",
    enrollmentDate: "2026-11-05T12:00:00.000Z",
    status: "ACTIVE",
    retentionExempt: true
  };

  const csv = generateRosterCsv(batch, [maliciousProfile]);

  // Check that dangerous triggers are escaped with single quote
  assert(csv.includes("\"'=cmd|' /C calc'!A0\""), "Malicious batch name must be escaped with single quote.");
  assert(csv.includes("\"'@MaliciousStudent\""), "Student name with @ must be escaped with single quote.");
  assert(csv.includes("\"'+91 9999999999\""), "Schedule with leading + must be escaped with single quote.");

  console.log("✅ TC-SYNC-09 Passed: Formula injection triggers safely neutralized in CSV roster export.");
}

// -------------------------------------------------------------
// TC-SYNC-10: DPDP Retention Exemption Assertion
// -------------------------------------------------------------
console.log("\nRunning TC-SYNC-10: DPDP Retention Exemption Assertion...");
{
  const activeProfile: EnrolledStudentProfile = {
    studentUid: "AAA-STD-2026-0001",
    leadReference: "AAA-LEAD-2026-00001",
    displayName: "Active Student",
    parentEmail: "active@example.com",
    emergencyPhone: "9823012345",
    assignedBatchId: "AAA-BATCH-2026-ABA-01",
    enrolledCourse: "abacus",
    assignedLevels: ["JR-0"],
    accessMode: "both",
    enrollmentDate: "2026-11-05T12:00:00.000Z",
    status: "ACTIVE",
    retentionExempt: true
  };

  const check = verifyStudentRetentionExemption(activeProfile);
  assert(check.exempt === true, "Active enrolled student must be exempt from retention purge.");
  assert(check.reason.includes("DPDP Act 2023 Sec 6/9"), "Legal basis cited accurately.");

  const withdrawnProfile: EnrolledStudentProfile = {
    ...activeProfile,
    status: "WITHDRAWN"
  };
  const withdrawnCheck = verifyStudentRetentionExemption(withdrawnProfile);
  assert(withdrawnCheck.exempt === false, "Withdrawn student is not automatically exempt.");

  console.log("✅ TC-SYNC-10 Passed: DPDP Section 6/9 retention exemption validated.");
}

console.log("\n================================================================");
console.log("🎉 ALL 10/10 WS-18 ACADEMYOS ROSTER BRIDGE TESTS PASSED");
console.log("================================================================");
