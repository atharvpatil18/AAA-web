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

const CLOUD_URL_PRIMARY = "https://jsonblob.com/api/jsonBlob/019fa81d-0104-7348-beae-a82900883473";
const CLOUD_URL_SECONDARY = "https://jsonblob.com/api/jsonBlob/019f9065-ec4f-7d60-b80c-07b7f039afe6";
const CLOUD_URL = CLOUD_URL_PRIMARY;

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

/** Get the cloud URL — exported so Showcase can use the same endpoint for applauds */
export function getCloudUrl(): string {
  return CLOUD_URL;
}

const DEFAULT_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "anaya-pagar-state-champion",
    studentName: "Anaya Pagar",
    studentPhotoUrl: "/logo.png",
    ageYears: 9,
    schoolName: "EuroSchool Wakad, Pune",
    location: "Wakad, Pune",
    course: "abacus",
    courseLevel: "Level 4 Abacus & Mental Math",
    eventLevel: "national_state",
    highlight: "State Mental Math Gold Medalist • 100 Qs in 5 Mins",
    eventDateFormatted: "15-Feb-25",
    storyType: "transformation",
    beforeText: "Struggled with finger-counting and math anxiety during timed school tests.",
    afterText: "Mastered 5-rod Soroban bead visualization at AAA Wakad. Solves 100 sums in 5 mins with 100% accuracy!",
    aiGeneratedStory: "Anaya Pagar joined Arnav Abacus Academy (Wakad, Pune) struggling with mental arithmetic confidence. Through structured Soroban bead visualization and 3-mode speed drills under Founder Neha Patil, Anaya developed photographic number memory. She achieved 1st Rank Gold Medal at the State Level Mental Arithmetic Championship, solving 100 problems in under 5 minutes with zero errors!",
    publishedAt: "2025-02-15T10:00:00.000Z",
    likesCount: 84,
    featured: true
  },
  {
    id: "arnav-patil-international-champion",
    studentName: "Arnav Patil",
    studentPhotoUrl: "/images/international_abacus_champion.webp",
    ageYears: 9,
    schoolName: "Wisdom World School, Wakad",
    location: "Wakad, Pune",
    course: "abacus",
    courseLevel: "Grand Master Level 8",
    eventLevel: "international",
    highlight: "Grand Master International Abacus Champion",
    eventDateFormatted: "20-Jan-25",
    storyType: "competition",
    aiGeneratedStory: "Arnav Patil represented India at the International Abacus & Mental Arithmetic Competition. Honored by Hon. Dr. Kiran Bedi and IIVA Leadership for reciting table multiples up to 855 in 60 seconds with zero errors.",
    publishedAt: "2025-01-20T10:00:00.000Z",
    likesCount: 142,
    featured: true
  },
  {
    id: "spriha-kamat-best-student",
    studentName: "Spriha Kamat",
    studentPhotoUrl: "/images/best_student_spriha_kamat_2025_2026.webp",
    ageYears: 8,
    schoolName: "Indira National School, Wakad",
    location: "Wakad, Pune",
    course: "abacus",
    courseLevel: "Level 3 Abacus",
    eventLevel: "academy_level",
    highlight: "Best Student of the Year Award 2025-2026",
    eventDateFormatted: "10-Jan-25",
    storyType: "competition",
    aiGeneratedStory: "Spriha Kamat demonstrated extraordinary dedication, completing 500+ speed math drills with 99.4% accuracy across the academic year at Arnav Abacus Academy.",
    publishedAt: "2025-01-10T10:00:00.000Z",
    likesCount: 68,
    featured: true
  },
  {
    id: "shreshth-gupta-1st-rank",
    studentName: "Shreshth Gupta",
    studentPhotoUrl: "/images/shreshth_gupta_champion_2025.webp",
    ageYears: 10,
    schoolName: "Mount Litera Zee School, Pune",
    location: "Wakad, Pune",
    course: "abacus",
    courseLevel: "Level 5 Abacus",
    eventLevel: "international",
    highlight: "1st Rank International Abacus Trophy Winner",
    eventDateFormatted: "18-Dec-24",
    storyType: "competition",
    aiGeneratedStory: "Shreshth Gupta clinched 1st Rank at the International Abacus Speed Competition, completing 100 multi-digit operations in under 4 minutes flat.",
    publishedAt: "2024-12-18T10:00:00.000Z",
    likesCount: 95,
    featured: true
  }
];

export function getSuccessStories(): SuccessStory[] {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    // Legacy key fallbacks in case story was saved under v1 or unversioned key
    if (!raw) raw = localStorage.getItem("aaa_published_success_stories_v1");
    if (!raw) raw = localStorage.getItem("aaa_published_success_stories");
    if (!raw) {
      // Initialize with DEFAULT_SUCCESS_STORIES (includes Anaya Deshmukh)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SUCCESS_STORIES)); } catch {}
      return DEFAULT_SUCCESS_STORIES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SUCCESS_STORIES)); } catch {}
      return DEFAULT_SUCCESS_STORIES;
    }
    const cleaned = parsed.filter((s) => s && s.id && !s.id.startsWith("test_"));
    if (cleaned.length === 0) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SUCCESS_STORIES)); } catch {}
      return DEFAULT_SUCCESS_STORIES;
    }
    // Check if Anaya Deshmukh exists, if not, prepend Anaya story to ensure it is always available
    const hasAnaya = cleaned.some((s) => s.studentName && s.studentName.toLowerCase().includes("anaya"));
    if (!hasAnaya) {
      cleaned.unshift(DEFAULT_SUCCESS_STORIES[0]);
    }
    // Migrate to v2 key
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned)); } catch {}
    return cleaned;
  } catch (e) {
    console.error("Error reading success stories:", e);
    return DEFAULT_SUCCESS_STORIES;
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
 * Strip base64 photos from stories before cloud upload.
 * Base64 images are several MB — they silently fail on cloud PUT.
 */
function stripBase64(stories: SuccessStory[]): SuccessStory[] {
  return stories.map((s) => ({
    ...s,
    studentPhotoUrl: s.studentPhotoUrl?.startsWith("data:") ? "/logo.png" : (s.studentPhotoUrl || "/logo.png"),
    // Also strip promptUsed to save space
    promptUsed: undefined,
  }));
}

/**
 * Push the full local story list to the cloud so any device can read them.
 * Uses READ-MODIFY-WRITE to preserve applaud counts stored in the same blob.
 */
export async function syncSuccessStoriesToCloud(): Promise<void> {
  const stories = getSuccessStories();
  const storiesForCloud = stripBase64(stories);

  let lastError: Error | null = null;
  const urlsToTry = [CLOUD_URL_PRIMARY, CLOUD_URL_SECONDARY];

  for (const url of urlsToTry) {
    try {
      // First read current cloud data to preserve applauds
      let existingApplauds: Record<string, number> = {};
      try {
        const getRes = await fetch(url, { headers: { Accept: "application/json" } });
        if (getRes.ok) {
          const current = await getRes.json();
          existingApplauds = current?.applauds || {};
        }
      } catch { /* ignore read failure — just overwrite */ }

      const body = JSON.stringify({ stories: storiesForCloud, applauds: existingApplauds });
      const sizeKB = Math.round(new Blob([body]).size / 1024);
      console.log(`[Cloud Sync] PUT ${stories.length} stories (${sizeKB} KB) to ${url}...`);

      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body,
      });

      if (res.ok) {
        console.log(`[Cloud Sync] ✅ ${stories.length} stories synced successfully to ${url}.`);
        return; // Success!
      } else if (res.status === 429) {
        console.warn(`[Cloud Sync] Endpoint ${url} rate-limited (HTTP 429). Retrying after 1.5s delay...`);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const retryRes = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body,
        });
        if (retryRes.ok) {
          console.log(`[Cloud Sync] ✅ ${stories.length} stories synced successfully after 429 retry.`);
          return;
        } else {
          lastError = new Error(`HTTP 429: Too Many Requests`);
        }
      } else {
        const errText = await res.text().catch(() => "");
        console.warn(`[Cloud Sync] Endpoint ${url} returned HTTP ${res.status}:`, errText);
        lastError = new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
    } catch (e: any) {
      console.warn(`[Cloud Sync] Failed connecting to ${url}:`, e);
      lastError = e instanceof Error ? e : new Error(String(e));
    }
  }

  if (lastError) {
    throw lastError;
  }
}

/**
 * Fetch stories from cloud, merge with localStorage, return merged list.
 * Called on Showcase page mount so parents see all stories on any device.
 */
export async function fetchSuccessStoriesFromCloud(): Promise<SuccessStory[]> {
  const local = getSuccessStories();
  try {
    const res = await fetch(CLOUD_URL, { headers: { Accept: "application/json" } });
    let cloud: SuccessStory[] = [];
    if (res.ok) {
      const payload = await res.json();
      const rawStories = payload?.stories || [];
      cloud = (Array.isArray(rawStories) ? rawStories : []).filter(
        (s) => s && s.id && !s.id.startsWith("test_") && s.studentName && s.highlight
      );
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

    return merged;
  } catch (e) {
    console.warn("[Cloud Fetch] Error:", e);
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
