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
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
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
