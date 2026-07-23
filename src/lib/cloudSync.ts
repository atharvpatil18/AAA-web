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

// High-availability public endpoint for cross-device attempt synchronization
const CLOUD_SYNC_URL = "https://api.restful-api.dev/objects/ff8081819f7e10ae019f8fb6a60a1b6f";

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

  // 2. Sync attempts to cloud
  try {
    const res = await fetch(CLOUD_SYNC_URL);
    let cloudAttempts: AttemptRecord[] = [];
    if (res.ok) {
      const payload = await res.json();
      if (Array.isArray(payload)) {
        cloudAttempts = payload;
      } else if (payload?.data?.attempts && Array.isArray(payload.data.attempts)) {
        cloudAttempts = payload.data.attempts;
      }
    }

    const cloudDup = cloudAttempts.some((a) => a.completedAt === attempt.completedAt);
    if (!cloudDup) {
      cloudAttempts.push(attempt);
      await fetch(CLOUD_SYNC_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "aaa_leaderboard_attempts",
          data: { attempts: cloudAttempts },
        }),
      });
    }
  } catch (e) {
    console.warn("Cloud sync backup warning:", e);
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

  try {
    const res = await fetch(CLOUD_SYNC_URL);
    if (res.ok) {
      const payload = await res.json();
      let cloudAttempts: AttemptRecord[] = [];
      if (Array.isArray(payload)) {
        cloudAttempts = payload;
      } else if (payload?.data?.attempts && Array.isArray(payload.data.attempts)) {
        cloudAttempts = payload.data.attempts;
      }

      if (cloudAttempts.length > 0) {
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
