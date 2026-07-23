/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApprovedEmailRecord, AccessFeatureMode } from "../types";

export const ACCESS_DB_KEY = "aaa_approved_email_access_db";
export const ACCESS_UPDATED_EVENT = "aaa_access_updated";

export const SYSTEM_ROOT_ADMINS = [
  "nitinkpatil@gmail.com",
  "admin@arnavabacus.com",
];

export const DEFAULT_ADMIN_EMAILS = SYSTEM_ROOT_ADMINS;

const DEFAULT_INITIAL_RECORDS: ApprovedEmailRecord[] = [
  ...SYSTEM_ROOT_ADMINS.map((email) => ({
    email: email.toLowerCase(),
    studentName: "Administrator",
    isAdmin: true,
    permissions: [
      { course: "abacus" as const, levels: ["ALL"], accessMode: "both" as const },
      { course: "vedic" as const, levels: ["ALL"], accessMode: "both" as const },
    ],
  })),
];

/**
 * Retrieves all approved email records from localStorage.
 * Initializes default records if none exist.
 */
export function getAllApprovedRecords(): ApprovedEmailRecord[] {
  const raw = localStorage.getItem(ACCESS_DB_KEY);
  let records: ApprovedEmailRecord[] = [];
  if (raw) {
    try {
      records = JSON.parse(raw);
    } catch (e) {
      records = [];
    }
  }

  // Ensure root admins exist in the list if DB is empty
  if (records.length === 0) {
    records = [...DEFAULT_INITIAL_RECORDS];
    localStorage.setItem(ACCESS_DB_KEY, JSON.stringify(records));
  }

  return records;
}

/**
 * Gets the record for a specific email.
 */
export function getApprovedRecord(email?: string): ApprovedEmailRecord | null {
  if (!email) return null;
  const cleanEmail = email.trim().toLowerCase();
  const records = getAllApprovedRecords();
  return records.find((r) => r.email.toLowerCase().trim() === cleanEmail) || null;
}

/**
 * Checks whether a given user is an admin.
 * Checks the explicitly saved record in localStorage first.
 */
export function isUserAdmin(email?: string): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  
  const record = getApprovedRecord(cleanEmail);
  if (record) {
    return !!record.isAdmin;
  }

  return SYSTEM_ROOT_ADMINS.map((e) => e.toLowerCase()).includes(cleanEmail);
}

export interface AccessCheckResult {
  allowed: boolean;
  reason?: string;
  accessMode?: AccessFeatureMode;
  isCourseAllowed: boolean;
  isLevelAllowed: boolean;
  isFeatureAllowed: boolean;
}

/**
 * Checks permissions for a specific email, course, level, and feature (quiz vs learn).
 */
export function checkUserAccess(
  email: string | undefined,
  course: "abacus" | "vedic",
  levelId: string,
  feature: "quiz" | "learn"
): AccessCheckResult {
  if (!email) {
    return {
      allowed: false,
      reason: "Login required to access practice menu features.",
      isCourseAllowed: false,
      isLevelAllowed: false,
      isFeatureAllowed: false,
    };
  }

  const cleanEmail = email.trim().toLowerCase();

  // Admin override
  if (isUserAdmin(cleanEmail)) {
    return {
      allowed: true,
      accessMode: "both",
      isCourseAllowed: true,
      isLevelAllowed: true,
      isFeatureAllowed: true,
    };
  }

  const record = getApprovedRecord(cleanEmail);
  if (!record) {
    return {
      allowed: false,
      reason: "Your email address is not registered in the student database.",
      isCourseAllowed: false,
      isLevelAllowed: false,
      isFeatureAllowed: false,
    };
  }

  // Check course permission
  const coursePermissions = record.permissions.filter((p) => p.course === course);
  if (coursePermissions.length === 0) {
    return {
      allowed: false,
      reason: `Access to ${course === "abacus" ? "Abacus" : "Vedic Math"} course is not enabled for your account.`,
      isCourseAllowed: false,
      isLevelAllowed: false,
      isFeatureAllowed: false,
    };
  }

  // Check level permission
  const matchingLevelPerm = coursePermissions.find(
    (p) => p.levels.includes("ALL") || p.levels.includes(levelId)
  );

  if (!matchingLevelPerm) {
    return {
      allowed: false,
      reason: `Level ${levelId} is not assigned to your account.`,
      isCourseAllowed: true,
      isLevelAllowed: false,
      isFeatureAllowed: false,
    };
  }

  // Check feature permission (quiz vs learn)
  const mode = matchingLevelPerm.accessMode;
  let isFeatureAllowed = false;
  if (mode === "both") {
    isFeatureAllowed = true;
  } else if (mode === "quiz" && feature === "quiz") {
    isFeatureAllowed = true;
  } else if (mode === "learn" && feature === "learn") {
    isFeatureAllowed = true;
  }

  if (!isFeatureAllowed) {
    const featureName = feature === "quiz" ? "Quiz / Practice" : "Learn Concepts";
    const allowedName = mode === "quiz" ? "Quiz only" : "Learn only";
    return {
      allowed: false,
      reason: `${featureName} access is disabled. Your account has ${allowedName} access for level ${levelId}.`,
      accessMode: mode,
      isCourseAllowed: true,
      isLevelAllowed: false,
      isFeatureAllowed: false,
    };
  }

  return {
    allowed: true,
    accessMode: mode,
    isCourseAllowed: true,
    isLevelAllowed: true,
    isFeatureAllowed: true,
  };
}

/**
 * Saves or updates an approved email record in localStorage.
 */
export function saveApprovedRecord(record: ApprovedEmailRecord): void {
  const records = getAllApprovedRecords();
  const cleanEmail = record.email.trim().toLowerCase();
  const index = records.findIndex((r) => r.email.trim().toLowerCase() === cleanEmail);

  const normalizedRecord: ApprovedEmailRecord = {
    ...record,
    email: cleanEmail,
    studentName: record.studentName?.trim() || cleanEmail.split("@")[0],
  };

  if (index >= 0) {
    records[index] = normalizedRecord;
  } else {
    records.push(normalizedRecord);
  }

  localStorage.setItem(ACCESS_DB_KEY, JSON.stringify(records));
  window.dispatchEvent(new CustomEvent(ACCESS_UPDATED_EVENT));
}

/**
 * Deletes an approved email record from localStorage.
 */
export function deleteApprovedRecord(email: string): boolean {
  const cleanEmail = email.trim().toLowerCase();

  // Prevent deleting default root admin
  if (cleanEmail === "nitinkpatil@gmail.com" || cleanEmail === "admin@arnavabacus.com") {
    return false;
  }

  const records = getAllApprovedRecords();
  const filtered = records.filter((r) => r.email.trim().toLowerCase() !== cleanEmail);

  if (filtered.length !== records.length) {
    localStorage.setItem(ACCESS_DB_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent(ACCESS_UPDATED_EVENT));
    return true;
  }
  return false;
}
