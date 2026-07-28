/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SuccessStory {
  id: string;
  studentName: string;
  studentPhotoUrl: string;       // Base64 or image URL
  ageYears?: number;             // e.g. 9
  schoolName?: string;           // e.g. "Vibgyor High School"
  location?: string;             // e.g. "Wakad, Pune"
  course: "abacus" | "vedic_math" | "mental_math" | "school_math" | "competitive_math";
  courseLevel?: string;          // e.g. "Level 4 Abacus", "SVM-1", "JR-2"
  eventLevel: "international" | "national_state" | "academy_level";
  highlight: string;             // e.g. "Grand Master Speed Champion • 100 Qs in 120s"
  eventDateFormatted?: string;   // e.g. "15-Mar-25"
  storyType: "competition" | "transformation" | "gallery";
  promptUsed?: string;           // Admin custom AI command / prompt
  aiGeneratedStory: string;      // Main detailed narrative
  beforeText?: string;           // Optional for transformation
  afterText?: string;            // Optional for transformation
  publishedAt: string;
  likesCount: number;
  featured?: boolean;
}

const STORAGE_KEY = "aaa_published_success_stories_v2";

// Cloud endpoint — reliable restful-api.dev object store (no rate limit bans)
const STORIES_CLOUD_URL = "https://api.restful-api.dev/objects/ff8081819f7e10ae019fa7f5b72e38f1";

/**
 * Format JS Date or YYYY-MM-DD string into dd-mmm-yy (e.g. 15-Mar-25)
 */
export function formatDateToDdMmmYy(dateInput?: string | Date): string {
  if (!dateInput) return "15-Mar-25";
  const dateObj = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(dateObj.getTime())) return "15-Mar-25";

  const day = dateObj.getDate().toString().padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear().toString().slice(-2);

  return `${day}-${month}-${year}`;
}



export function getSuccessStories(): SuccessStory[] {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    // Legacy key fallbacks in case story was saved under v1 or unversioned key
    if (!raw) raw = localStorage.getItem("aaa_published_success_stories_v1");
    if (!raw) raw = localStorage.getItem("aaa_published_success_stories");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const cleaned = parsed.filter((s) => s && s.id && !s.id.startsWith("test_"));
    // Migrate to v2 key
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned)); } catch {}
    return cleaned;
  } catch (e) {
    console.error("Error reading success stories:", e);
    return [];
  }
}

export function saveSuccessStory(story: Omit<SuccessStory, "id" | "publishedAt" | "likesCount"> & { id?: string }): SuccessStory {
  const stories = getSuccessStories();
  const existingIdx = stories.findIndex((s) => s.id === story.id);

  const updatedStory: SuccessStory = {
    id: story.id || `story_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    studentName: story.studentName.trim(),
    studentPhotoUrl: story.studentPhotoUrl || "/logo.png",
    ageYears: story.ageYears || 8,
    schoolName: story.schoolName?.trim() || "Wakad Pune School",
    location: story.location?.trim() || "Wakad, Pune",
    course: story.course || "abacus",
    courseLevel: story.courseLevel?.trim() || "Level 1",
    eventLevel: story.eventLevel || "academy_level",
    highlight: story.highlight.trim(),
    eventDateFormatted: story.eventDateFormatted || formatDateToDdMmmYy(new Date()),
    storyType: story.storyType || "competition",
    aiGeneratedStory: story.aiGeneratedStory.trim(),
    beforeText: story.beforeText?.trim(),
    afterText: story.afterText?.trim(),
    publishedAt: story.id && existingIdx !== -1 ? stories[existingIdx].publishedAt : new Date().toISOString(),
    likesCount: story.id && existingIdx !== -1 ? stories[existingIdx].likesCount : 0,
    featured: story.featured ?? true,
  };

  if (existingIdx !== -1) {
    stories[existingIdx] = updatedStory;
  } else {
    stories.unshift(updatedStory);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  // Auto sync to cloud asynchronously
  syncSuccessStoriesToCloud().catch(() => {});
  return updatedStory;
}

export function deleteSuccessStory(id: string): void {
  const stories = getSuccessStories().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  // Auto sync to cloud asynchronously
  syncSuccessStoriesToCloud().catch(() => {});
}

/**
 * Push the full local story list to the cloud so any device can read them.
 * Called after every save or delete by the admin.
 */
export async function syncSuccessStoriesToCloud(): Promise<void> {
  const stories = getSuccessStories();
  try {
    const res = await fetch(STORIES_CLOUD_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name: "aaa_success_stories", data: { stories } }),
    });
    if (!res.ok) {
      console.warn("Cloud sync HTTP status error:", res.status, res.statusText);
    }
  } catch (e) {
    console.warn("Success stories cloud sync warning:", e);
  }
}

/**
 * Fetch stories from cloud, merge with localStorage, return merged list.
 * Called on Showcase page mount so parents see all stories on any device.
 */
export async function fetchSuccessStoriesFromCloud(): Promise<SuccessStory[]> {
  const local = getSuccessStories();
  try {
    const res = await fetch(STORIES_CLOUD_URL, { headers: { Accept: "application/json" } });
    let cloud: SuccessStory[] = [];
    if (res.ok) {
      const payload = await res.json();
      const rawStories = payload?.data?.stories || payload?.stories || (Array.isArray(payload) ? payload : []);
      cloud = Array.isArray(rawStories) ? rawStories : [];
    }

    // Merge: cloud wins for same id, but keep any local stories missing from cloud
    const map = new Map<string, SuccessStory>();
    local.forEach((s) => map.set(s.id, s));
    cloud.forEach((s) => map.set(s.id, s));
    const merged = Array.from(map.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Persist merged list locally
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(merged)); } catch {}

    // If local had stories missing in cloud, sync merged back to cloud!
    if (merged.length > cloud.length) {
      fetch(STORIES_CLOUD_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: "aaa_success_stories", data: { stories: merged } }),
      }).catch(() => {});
    }

    return merged;
  } catch (e) {
    console.warn("Success stories cloud fetch warning:", e);
    return local;
  }
}

export function incrementStoryLikes(id: string): number {
  const stories = getSuccessStories();
  const story = stories.find((s) => s.id === id);
  if (story) {
    story.likesCount = (story.likesCount || 0) + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
    return story.likesCount;
  }
  return 0;
}
