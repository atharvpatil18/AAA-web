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

export const CLOUD_SYNC_URL = "https://jsonblob.com/api/jsonBlob/019f9065-eead-71b5-8f27-38e3c8ebc1f4";

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
  {
    email: "nehaatharv@gmail.com",
    studentName: "Leena",
    isAdmin: false,
    permissions: [
      { course: "abacus" as const, levels: ["SR-1", "SR-2"], accessMode: "both" as const },
      { course: "vedic" as const, levels: ["JVM-1"], accessMode: "both" as const },
    ],
  },
];

// BroadcastChannel for real-time cross-tab synchronization
let broadcastChannel: BroadcastChannel | null = null;
try {
  if (typeof BroadcastChannel !== "undefined") {
    broadcastChannel = new BroadcastChannel("aaa_access_control_channel");
    broadcastChannel.onmessage = (event) => {
      if (event.data?.type === "ACCESS_UPDATED" && event.data?.records) {
        localStorage.setItem(ACCESS_DB_KEY, JSON.stringify(event.data.records));
        window.dispatchEvent(new CustomEvent(ACCESS_UPDATED_EVENT));
      }
    };
  }
} catch (e) {
  // BroadcastChannel unavailable
}

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

  // Ensure initial records exist in the list if DB is empty
  if (records.length === 0) {
    records = DEFAULT_INITIAL_RECORDS;
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
 * Asynchronously pushes current approved records to cloud storage.
 */
export async function pushApprovedRecordsToCloud(records?: ApprovedEmailRecord[]): Promise<void> {
  const currentRecords = records || getAllApprovedRecords();
  try {
    await fetch(CLOUD_SYNC_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "aaa_approved_email_access_db",
        data: { records: currentRecords },
      }),
    });

    if (broadcastChannel) {
      broadcastChannel.postMessage({ type: "ACCESS_UPDATED", records: currentRecords });
    }
  } catch (e) {
    console.warn("Failed to push approved records to cloud:", e);
  }
}

/**
 * Downloads and merges approved email records from cloud storage across all devices.
 */
export async function syncApprovedRecordsFromCloud(): Promise<ApprovedEmailRecord[]> {
  const localRecords = getAllApprovedRecords();
  try {
    const res = await fetch(CLOUD_SYNC_URL);
    if (res.ok) {
      const payload = await res.json();
      let cloudRecords: ApprovedEmailRecord[] = [];
      if (Array.isArray(payload)) {
        cloudRecords = payload;
      } else if (payload?.data?.records && Array.isArray(payload.data.records)) {
        cloudRecords = payload.data.records;
      }

      if (cloudRecords.length > 0) {
        const recordMap = new Map<string, ApprovedEmailRecord>();

        // 1. Default initial records first
        DEFAULT_INITIAL_RECORDS.forEach((r) => recordMap.set(r.email.trim().toLowerCase(), r));

        // 2. Cloud records take highest precedence for student updates across devices
        cloudRecords.forEach((r) => {
          if (r && r.email) {
            recordMap.set(r.email.trim().toLowerCase(), r);
          }
        });

        // 3. Ensure root admins always retain admin rights
        SYSTEM_ROOT_ADMINS.forEach((adminEmail) => {
          const cleanAdmin = adminEmail.toLowerCase().trim();
          const existing = recordMap.get(cleanAdmin);
          if (existing) {
            existing.isAdmin = true;
          }
        });

        const merged = Array.from(recordMap.values());
        const currRaw = JSON.stringify(localRecords);
        const nextRaw = JSON.stringify(merged);

        if (currRaw !== nextRaw) {
          localStorage.setItem(ACCESS_DB_KEY, nextRaw);
          window.dispatchEvent(new CustomEvent(ACCESS_UPDATED_EVENT));
          if (broadcastChannel) {
            broadcastChannel.postMessage({ type: "ACCESS_UPDATED", records: merged });
          }
        }
        return merged;
      }
    }
  } catch (e) {
    console.warn("Cloud access sync warning:", e);
  }
  return localRecords;
}

/**
 * Saves or updates an approved email record in localStorage and cloud storage.
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
  pushApprovedRecordsToCloud(records);
}

/**
 * Deletes an approved email record from localStorage and cloud storage.
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
    pushApprovedRecordsToCloud(filtered);
    return true;
  }
  return false;
}
