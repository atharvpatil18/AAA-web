/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Program {
  id: string;
  title: string;
  description: string;
  targetAge: string;
  benefits: string[];
  curriculum: string[];
  tagline: string;
  imageTheme: string; // Tailwind bg-gradient or color scheme
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
}

export interface Campaign {
  slug: string;
  title: string;
  subtitle: string;
  features: string[];
  ctaText: string;
  accentColor: string;
  gradient: string;
}

export interface LeadSubmission {
  parentName: string;
  childAge: string;
  program: string;
}

export type PracticeCategory = "abacus" | "vedic";

export type QuestionCountChoice = 10 | 20 | 50 | 100 | 200;

export type PracticeMode =
  | "exam" // 4 Min Timed
  | "instant" // Instant Feedback
  | "speed-100-5m" // 100 Questions in 5 Mins
  | "speed-100-10m" // 100 Questions in 10 Mins
  | "speed-200-20m"; // 200 Questions in 20 Mins

export interface Question {
  id: number;
  numbers?: number[]; // For abacus vertical stack (e.g. [7, -6, 1, 5, -1, -5])
  expression?: string; // For Vedic math or horizontal math (e.g. "97 x 95")
  correctAnswer: number;
  explanation?: string;
  conceptTag?: string; // e.g. "Small Friends (+4 = +5 - 1)", "Nikhilam Sutra"
}

export interface QuestionSet {
  id: string;
  title: string;
  category: PracticeCategory;
  level: string; // e.g. "JR-1", "JR-2", "Level 1", "Level 2"
  topic: string; // e.g. "Direct Addition & Subtraction", "Small Friends", "Big Friends", "Mix Combo", "Complementary"
  description: string;
  questionCount: number;
  timeLimitSeconds: number; // Default 300s (5 mins)
  questions: Question[];
}

export interface UserAnswer {
  questionId: number;
  answer: string;
  isFlagged: boolean;
  isCorrect?: boolean;
}

export interface PracticeAttemptResult {
  setId: string;
  setTitle: string;
  category: PracticeCategory;
  level: string;
  mode: PracticeMode;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  scorePercentage: number;
  timeTakenSeconds: number;
  completedAt: string;
  userAnswers: Record<number, UserAnswer>;
  questions: Question[];
}

