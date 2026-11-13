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

/**
 * Localizes student awards / competition highlights for Marathi and Hindi views
 */
export function localizeHighlight(text: string, lang: string, formatNum?: (v: string | number) => string): string {
  if (!text || lang === "en") return text;
  
  const dictMr: Record<string, string> = {
    "Grand Master International Abacus Champion": "ग्रँड मास्टर आंतरराष्ट्रीय ॲबॅकस चॅम्पियन",
    "Best Student of the Year Award 2025-2026": "सर्वोत्कृष्ट विद्यार्थी पुरस्कार २०२५-२०२६",
    "Best Student of the Year Award": "सर्वोत्कृष्ट विद्यार्थी पुरस्कार",
    "1st Place International Abacus Competition": "प्रथम क्रमांक आंतरराष्ट्रीय ॲबॅकस स्पर्धा",
    "National Abacus Champion": "राष्ट्रीय ॲबॅकस चॅम्पियन",
    "State Level Vedic Math Champion": "राज्यस्तरीय वैदिक गणित चॅम्पियन",
    "100/100 Perfect Score Runner Level 1": "१००/१०० परिपूर्ण गुण - रनर पातळी १",
    "State Level Mental Math Gold Medalist": "राज्यस्तरीय मेंटल मॅथ सुवर्णपदक विजेता",
    "International Champion": "आंतरराष्ट्रीय चॅम्पियन",
    "National Champion": "राष्ट्रीय चॅम्पियन",
  };

  const dictHi: Record<string, string> = {
    "Grand Master International Abacus Champion": "ग्रैंड मास्टर अंतर्राष्ट्रीय अबैकस चैंपियन",
    "Best Student of the Year Award 2025-2026": "वर्ष का सर्वश्रेष्ठ छात्र पुरस्कार २०२५-२०२६",
    "Best Student of the Year Award": "वर्ष का सर्वश्रेष्ठ छात्र पुरस्कार",
    "1st Place International Abacus Competition": "प्रथम स्थान अंतर्राष्ट्रीय अबैकस प्रतियोगिता",
    "National Abacus Champion": "राष्ट्रीय अबैकस चैंपियन",
    "State Level Vedic Math Champion": "राज्य स्तरीय वैदिक गणित चैंपियन",
    "100/100 Perfect Score Runner Level 1": "१००/१०० शत-प्रतिशत स्कोर - रनर स्तर १",
    "State Level Mental Math Gold Medalist": "राज्य स्तरीय मेंटल मैथ स्वर्ण पदक विजेता",
    "International Champion": "अंतर्राष्ट्रीय चैंपियन",
    "National Champion": "राष्ट्रीय चैंपियन",
  };

  const dict = lang === "mr" ? dictMr : dictHi;
  if (dict[text]) return dict[text];

  let res = text;
  Object.entries(dict).forEach(([k, v]) => {
    if (res.includes(k)) {
      res = res.replace(k, v);
    }
  });

  if (formatNum) {
    res = formatNum(res);
  }
  return res;
}

/**
 * Safely resolves and normalizes a student photo URL.
 * Ensures root-relative leading slash, handles webp/jpg fallbacks, and auto-maps known academy star students.
 */
export function resolveStudentPhoto(url?: string, name?: string): string {
  const trimmedUrl = (url || "").trim();
  const trimmedName = (name || "").toLowerCase().trim();

  // If no URL or default logo placeholder, auto-map known academy champions
  if (!trimmedUrl || trimmedUrl === "/logo.png" || trimmedUrl === "logo.png") {
    if (trimmedName.includes("arnav")) return "/arnav_patil_international_1st_2025.webp";
    if (trimmedName.includes("spriha")) return "/best_student_spriha_kamat_2025_2026.webp";
    if (trimmedName.includes("shreshth")) return "/shreshth_gupta_champion_2025.webp";
    if (trimmedName.includes("hitanshi")) return "/hitanshi_collage.webp";
    if (trimmedName.includes("anaya")) return "/iiva_state_champions_2026.jpg";
    if (trimmedName.includes("devaansh")) return "/devaansh_runner_level_1.webp";
    if (trimmedName.includes("sushmit")) return "/sushmit_championship_birthday.webp";
    return "/logo.png";
  }

  // Preserve absolute HTTP/HTTPS URLs and base64 data URIs
  if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://") || trimmedUrl.startsWith("data:")) {
    return trimmedUrl;
  }

  // Ensure root-relative leading slash to avoid Vite SPA route collision
  const cleanUrl = trimmedUrl.startsWith("/") ? trimmedUrl : `/${trimmedUrl}`;

  // If stored path does not match standard file patterns, auto-correct for known champions
  if (trimmedName.includes("arnav") && !cleanUrl.includes("arnav") && !cleanUrl.includes("international_abacus_champion")) {
    return "/arnav_patil_international_1st_2025.webp";
  }
  if (trimmedName.includes("spriha") && !cleanUrl.includes("spriha")) {
    return "/best_student_spriha_kamat_2025_2026.webp";
  }
  if (trimmedName.includes("shreshth") && !cleanUrl.includes("shreshth")) {
    return "/shreshth_gupta_champion_2025.webp";
  }

  return cleanUrl;
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
    
    // Deduplicate and filter invalid test stories
    const seen = new Set<string>();
    const cleaned = parsed.filter((s) => {
      if (!s || !s.id || s.id.startsWith("test_") || !s.studentName) return false;
      const sName = (s.studentName || "").toLowerCase().trim();
      if (sName.includes("deshmukh") || sName.includes("test")) return false;
      const key = `${sName}_${(s.highlight || "").toLowerCase().trim()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map((s) => ({
      ...s,
      studentPhotoUrl: resolveStudentPhoto(s.studentPhotoUrl, s.studentName),
    }));
    
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
      cloud = (Array.isArray(rawStories) ? rawStories : [])
        .filter((s) => s && s.id && !s.id.startsWith("test_") && s.studentName && s.highlight)
        .map((s) => ({
          ...s,
          studentPhotoUrl: resolveStudentPhoto(s.studentPhotoUrl, s.studentName),
        }));
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
