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

export interface VisitorFeedback {
  id: string;
  guestEmail: string;
  guestName?: string;
  rating: number; // 1 to 5
  message: string;
  sampleScore?: string;
  submittedAt: string;
}

const FEEDBACK_STORAGE_KEY = "aaa_visitor_feedbacks";
const FEEDBACK_CLOUD_URL = "https://api.restful-api.dev/objects/ff8081819f7e10ae019f901cda041bef";

export function getAllVisitorFeedbacks(): VisitorFeedback[] {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export async function saveVisitorFeedback(feedback: Omit<VisitorFeedback, "id" | "submittedAt"> & { id?: string; submittedAt?: string }): Promise<VisitorFeedback> {
  const fullFeedback: VisitorFeedback = {
    id: feedback.id || `fb_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    guestEmail: feedback.guestEmail.trim().toLowerCase(),
    guestName: feedback.guestName?.trim() || feedback.guestEmail.split("@")[0],
    rating: feedback.rating || 5,
    message: feedback.message.trim(),
    sampleScore: feedback.sampleScore,
    submittedAt: feedback.submittedAt || new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
  };

  const current = getAllVisitorFeedbacks();
  current.unshift(fullFeedback);
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(current));

  // Sync to cloud
  try {
    const res = await fetch(FEEDBACK_CLOUD_URL);
    let cloudList: VisitorFeedback[] = [];
    if (res.ok) {
      const payload = await res.json();
      if (Array.isArray(payload)) cloudList = payload;
      else if (payload?.data?.feedbacks && Array.isArray(payload.data.feedbacks)) cloudList = payload.data.feedbacks;
    }
    cloudList.unshift(fullFeedback);
    await fetch(FEEDBACK_CLOUD_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "aaa_visitor_feedback",
        data: { feedbacks: cloudList },
      }),
    });
  } catch (e) {
    console.warn("Visitor feedback cloud sync warning:", e);
  }

  return fullFeedback;
}

export async function syncVisitorFeedbacksFromCloud(): Promise<VisitorFeedback[]> {
  const localList = getAllVisitorFeedbacks();
  try {
    const res = await fetch(FEEDBACK_CLOUD_URL);
    if (res.ok) {
      const payload = await res.json();
      let cloudList: VisitorFeedback[] = [];
      if (Array.isArray(payload)) cloudList = payload;
      else if (payload?.data?.feedbacks && Array.isArray(payload.data.feedbacks)) cloudList = payload.data.feedbacks;

      if (cloudList.length > 0) {
        const map = new Map<string, VisitorFeedback>();
        localList.forEach((fb) => map.set(fb.id, fb));
        cloudList.forEach((fb) => map.set(fb.id, fb));
        const merged = Array.from(map.values()).sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "aaa_visitor_feedback",
        data: { feedbacks: updated },
      }),
    });
  } catch (e) {
    console.warn("Visitor feedback cloud deletion warning:", e);
  }

  return updated;
}
