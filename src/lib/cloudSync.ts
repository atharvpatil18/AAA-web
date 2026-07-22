/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AttemptRecord {
  setId: string;
  setTitle: string;
  category: string;
  level: string;
  mode: string;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  scorePercentage: number;
  timeTakenSeconds: number;
  completedAt: string;
  userId: string; // user email
  userName: string;
  userEmail: string;
}

const LOCAL_STORAGE_KEY = "aaa_leaderboard_attempts";

// High-availability public endpoint key prefix for cross-device synchronization
const CLOUD_SYNC_URL = "https://kvdb.io/8xV4kP7N9jL2mQ5w1E3rT/";

/**
 * Save an attempt locally AND sync to the cloud for the student's email across mobile and desktop.
 */
export async function saveStudentAttempt(attempt: AttemptRecord): Promise<void> {
  // 1. Save locally
  let localAttempts: AttemptRecord[] = [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    localAttempts = raw ? JSON.parse(raw) : [];
  } catch (e) {
    localAttempts = [];
  }

  const targetEmail = attempt.userEmail?.toLowerCase().trim() || attempt.userId?.toLowerCase().trim();

  // Deduplicate by completedAt & email
  const isDuplicate = localAttempts.some(
    (a) =>
      a.completedAt === attempt.completedAt &&
      (a.userEmail?.toLowerCase().trim() === targetEmail || a.userId?.toLowerCase().trim() === targetEmail)
  );

  if (!isDuplicate) {
    localAttempts.push(attempt);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localAttempts));
  }

  // 2. Sync attempt to cloud key matching user email
  if (targetEmail && targetEmail !== "guest@arnavabacus.com") {
    try {
      const emailKey = encodeURIComponent(`student_attempts_${targetEmail}`);
      let cloudAttempts: AttemptRecord[] = [];
      try {
        const res = await fetch(`${CLOUD_SYNC_URL}${emailKey}`);
        if (res.ok) {
          cloudAttempts = await res.json();
        }
      } catch (e) {
        cloudAttempts = [];
      }

      const cloudDup = cloudAttempts.some((a) => a.completedAt === attempt.completedAt);
      if (!cloudDup) {
        cloudAttempts.push(attempt);
        await fetch(`${CLOUD_SYNC_URL}${emailKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cloudAttempts),
        });
      }
    } catch (e) {
      console.warn("Cloud sync backup warning:", e);
    }
  }
}

/**
 * Sync & fetch all cloud attempts for a student email across mobile and desktop.
 */
export async function syncStudentAttempts(userEmail?: string): Promise<AttemptRecord[]> {
  let localAttempts: AttemptRecord[] = [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    localAttempts = raw ? JSON.parse(raw) : [];
  } catch (e) {
    localAttempts = [];
  }

  if (!userEmail || userEmail === "guest@arnavabacus.com") {
    return localAttempts;
  }

  const targetEmail = userEmail.trim().toLowerCase();
  const emailKey = encodeURIComponent(`student_attempts_${targetEmail}`);

  try {
    const res = await fetch(`${CLOUD_SYNC_URL}${emailKey}`);
    if (res.ok) {
      const cloudAttempts: AttemptRecord[] = await res.json();
      if (Array.isArray(cloudAttempts) && cloudAttempts.length > 0) {
        // Merge cloud attempts into local attempts (deduplicate)
        const mergedMap = new Map<string, AttemptRecord>();

        localAttempts.forEach((a) => {
          const key = `${a.completedAt}_${(a.userEmail || a.userId)?.toLowerCase().trim()}`;
          mergedMap.set(key, a);
        });

        cloudAttempts.forEach((a) => {
          const key = `${a.completedAt}_${(a.userEmail || a.userId)?.toLowerCase().trim()}`;
          mergedMap.set(key, a);
        });

        const mergedList = Array.from(mergedMap.values());
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mergedList));
        return mergedList;
      }
    }
  } catch (e) {
    console.warn("Cloud sync fetch warning:", e);
  }

  return localAttempts;
}
