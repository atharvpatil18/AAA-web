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

// High-availability persistent cloud endpoint for cross-device attempt synchronization
const CLOUD_SYNC_URL = "https://jsonblob.com/api/jsonBlob/019f9065-ec4f-7d60-b80c-07b7f039afe6";

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
    const res = await fetch(CLOUD_SYNC_URL, { headers: { Accept: "application/json" } });
    let cloudAttempts: AttemptRecord[] = [];
    if (res.ok) {
      const payload = await res.json();
      if (Array.isArray(payload)) {
        cloudAttempts = payload;
      } else if (payload?.attempts && Array.isArray(payload.attempts)) {
        cloudAttempts = payload.attempts;
      } else if (payload?.data?.attempts && Array.isArray(payload.data.attempts)) {
        cloudAttempts = payload.data.attempts;
      }
    }

    const cloudDup = cloudAttempts.some((a) => a.completedAt === attempt.completedAt);
    if (!cloudDup) {
      cloudAttempts.push(attempt);
      await fetch(CLOUD_SYNC_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ attempts: cloudAttempts }),
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
    const res = await fetch(CLOUD_SYNC_URL, { headers: { Accept: "application/json" } });
    if (res.ok) {
      const payload = await res.json();
      let cloudAttempts: AttemptRecord[] = [];
      if (Array.isArray(payload)) {
        cloudAttempts = payload;
      } else if (payload?.attempts && Array.isArray(payload.attempts)) {
        cloudAttempts = payload.attempts;
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

export interface VisitorFeedback {
  id: string;
  guestEmail: string;
  guestName?: string;
  rating: number; // 1 to 5
  message: string;
  sampleScore?: string;
  submittedAt: string;
  timestamp?: number;
}

const FEEDBACK_STORAGE_KEY = "aaa_visitor_feedbacks";
const FEEDBACK_CLOUD_URL = "https://jsonblob.com/api/jsonBlob/019f9065-e9bf-7d21-9a83-c484961c2904";

export function getAllVisitorFeedbacks(): VisitorFeedback[] {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export async function saveVisitorFeedback(
  feedback: Omit<VisitorFeedback, "id" | "submittedAt"> & { id?: string; submittedAt?: string; timestamp?: number }
): Promise<VisitorFeedback> {
  const now = new Date();
  const ts = feedback.timestamp || now.getTime();
  const fullFeedback: VisitorFeedback = {
    id: feedback.id || `fb_${ts}_${Math.random().toString(36).substr(2, 5)}`,
    guestEmail: feedback.guestEmail.trim().toLowerCase(),
    guestName: feedback.guestName?.trim() || feedback.guestEmail.split("@")[0],
    rating: feedback.rating || 5,
    message: feedback.message.trim(),
    sampleScore: feedback.sampleScore,
    submittedAt: feedback.submittedAt || now.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
    timestamp: ts,
  };

  const current = getAllVisitorFeedbacks();
  
  // Check duplicate by ID or same email+message within 5s
  const existsIndex = current.findIndex(
    (f) => f.id === fullFeedback.id || (f.guestEmail === fullFeedback.guestEmail && f.message === fullFeedback.message && Math.abs((f.timestamp || 0) - ts) < 5000)
  );

  if (existsIndex >= 0) {
    current[existsIndex] = fullFeedback;
  } else {
    current.unshift(fullFeedback);
  }

  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(current));

  // Sync to cloud
  try {
    const res = await fetch(FEEDBACK_CLOUD_URL, { headers: { Accept: "application/json" } });
    let cloudList: VisitorFeedback[] = [];
    if (res.ok) {
      const payload = await res.json();
      if (Array.isArray(payload)) cloudList = payload;
      else if (payload?.feedbacks && Array.isArray(payload.feedbacks)) cloudList = payload.feedbacks;
      else if (payload?.data?.feedbacks && Array.isArray(payload.data.feedbacks)) cloudList = payload.data.feedbacks;
    }

    const cIndex = cloudList.findIndex(
      (f) => f.id === fullFeedback.id || (f.guestEmail === fullFeedback.guestEmail && f.message === fullFeedback.message && Math.abs((f.timestamp || 0) - ts) < 5000)
    );
    if (cIndex >= 0) {
      cloudList[cIndex] = fullFeedback;
    } else {
      cloudList.unshift(fullFeedback);
    }

    await fetch(FEEDBACK_CLOUD_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ feedbacks: cloudList }),
    });
  } catch (e) {
    console.warn("Visitor feedback cloud sync warning:", e);
  }

  return fullFeedback;
}

export async function syncVisitorFeedbacksFromCloud(): Promise<VisitorFeedback[]> {
  const localList = getAllVisitorFeedbacks();
  try {
    const res = await fetch(FEEDBACK_CLOUD_URL, { headers: { Accept: "application/json" } });
    if (res.ok) {
      const payload = await res.json();
      let cloudList: VisitorFeedback[] = [];
      if (Array.isArray(payload)) cloudList = payload;
      else if (payload?.feedbacks && Array.isArray(payload.feedbacks)) cloudList = payload.feedbacks;
      else if (payload?.data?.feedbacks && Array.isArray(payload.data.feedbacks)) cloudList = payload.data.feedbacks;

      if (cloudList.length > 0) {
        const map = new Map<string, VisitorFeedback>();
        localList.forEach((fb) => map.set(fb.id || `${fb.guestEmail}_${fb.submittedAt}`, fb));
        cloudList.forEach((fb) => map.set(fb.id || `${fb.guestEmail}_${fb.submittedAt}`, fb));

        const merged = Array.from(map.values()).sort((a, b) => {
          const tA = a.timestamp || (a.submittedAt ? new Date(a.submittedAt).getTime() : 0) || 0;
          const tB = b.timestamp || (b.submittedAt ? new Date(b.submittedAt).getTime() : 0) || 0;
          return tB - tA;
        });

        localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
    }
  } catch (e) {
    console.warn("Cloud feedback sync warning:", e);
  }
  return localList;
}

export async function deleteVisitorFeedback(id: string): Promise<VisitorFeedback[]> {
  const current = getAllVisitorFeedbacks();
  const updated = current.filter((f) => f.id !== id);
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(updated));

  // Sync deletion to cloud
  try {
    await fetch(FEEDBACK_CLOUD_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ feedbacks: updated }),
    });
  } catch (e) {
    console.warn("Visitor feedback cloud deletion warning:", e);
  }

  return updated;
}
