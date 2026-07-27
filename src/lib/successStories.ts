/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SuccessStory {
  id: string;
  studentName: string;
  studentPhotoUrl: string; // Base64 or image URL
  achievementTitle: string; // e.g. "Abacus Level 3 Champion • 100% Speed Drill"
  ageOrGrade?: string; // e.g. "Age 8 • Wakad Branch"
  promptUsed?: string; // Admin prompt
  aiGeneratedStory: string;
  publishedAt: string;
  likesCount: number;
  featured?: boolean;
}

const STORAGE_KEY = "aaa_published_success_stories";

const INITIAL_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "story-1",
    studentName: "Arnav Patil",
    studentPhotoUrl: "/logo.png",
    achievementTitle: "Grand Master Abacus Speed Champion • 100 Qs in 120s",
    ageOrGrade: "Age 9 • Level 4 Abacus • Wakad Pune",
    promptUsed: "Arnav Patreon solved 100 questions in 2 minutes with 100% accuracy",
    aiGeneratedStory: "Arnav demonstrated phenomenal mental agility by calculating 100 complex single and double-digit addition/subtraction problems in under 2 minutes with 100% precision. His dedication to Soroban bead visualization has significantly boosted his cognitive focus, memory recall, and photographic math confidence!",
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    likesCount: 42,
    featured: true,
  },
  {
    id: "story-2",
    studentName: "Ananya Sharma",
    studentPhotoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80",
    achievementTitle: "Vedic Math Speed Specialist • 98% Accuracy Diploma",
    ageOrGrade: "Age 11 • Grade 6 • Wakad Pune",
    promptUsed: "Ananya mastered 3-digit multiplication shortcuts in 4 weeks",
    aiGeneratedStory: "Through systematic practice at Arnav Abacus Academy, Ananya mastered high-speed Vedic mental multiplication strategies. She went from basic calculations to computing 3-digit cross-multiplications mentally in under 5 seconds, earning high honors from the Academic Board!",
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
    achievementTitle: story.achievementTitle.trim(),
    ageOrGrade: story.ageOrGrade?.trim() || "Wakad Pune Branch",
    promptUsed: story.promptUsed?.trim() || "",
    aiGeneratedStory: story.aiGeneratedStory.trim(),
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
