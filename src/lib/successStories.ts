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
  aiGeneratedStory: string;      // Main detailed narrative
  beforeText?: string;           // Optional for transformation
  afterText?: string;            // Optional for transformation
  publishedAt: string;
  likesCount: number;
  featured?: boolean;
}

const STORAGE_KEY = "aaa_published_success_stories";

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

const INITIAL_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "story-1",
    studentName: "Arnav Patil",
    studentPhotoUrl: "/logo.png",
    ageYears: 9,
    schoolName: "Vibgyor High School",
    location: "Wakad, Pune",
    course: "abacus",
    courseLevel: "Level 4 Abacus",
    eventLevel: "international",
    highlight: "Grand Master Abacus Speed Champion • 100 Qs in 120s",
    eventDateFormatted: "15-Mar-25",
    storyType: "competition",
    aiGeneratedStory: "Arnav demonstrated phenomenal mental agility by calculating 100 complex single and double-digit addition/subtraction problems in under 2 minutes with 100% precision. His dedication to Soroban bead visualization has significantly boosted his cognitive focus, memory recall, and photographic math confidence!",
    beforeText: "Struggled with homework concentration & exam speed anxiety.",
    afterText: "Calculates 100 sums in under 2 minutes with 100% accuracy!",
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    likesCount: 42,
    featured: true,
  },
  {
    id: "story-2",
    studentName: "Ananya Sharma",
    studentPhotoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80",
    ageYears: 11,
    schoolName: "EuroSchool Wakad",
    location: "Wakad, Pune",
    course: "vedic_math",
    courseLevel: "SVM-1 Senior Vedic",
    eventLevel: "national_state",
    highlight: "Vedic Math Speed Specialist • 98% Accuracy Diploma",
    eventDateFormatted: "10-Feb-25",
    storyType: "transformation",
    aiGeneratedStory: "Through systematic practice at Arnav Abacus Academy, Ananya mastered high-speed Vedic mental multiplication strategies. She went from basic calculations to computing 3-digit cross-multiplications mentally in under 5 seconds, earning high honors from the Academic Board!",
    beforeText: "Relied on long written steps for multiplication & division.",
    afterText: "Computes 3-digit cross multiplications mentally in under 5s!",
    publishedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    likesCount: 38,
    featured: true,
  },
];

export function getSuccessStories(): SuccessStory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SUCCESS_STORIES));
      return INITIAL_SUCCESS_STORIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SUCCESS_STORIES;
  } catch (e) {
    console.error("Error reading success stories:", e);
    return INITIAL_SUCCESS_STORIES;
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
  return updatedStory;
}

export function deleteSuccessStory(id: string): void {
  const stories = getSuccessStories().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
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
