/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionSet, Question, PracticeMode } from "../types";

export const ABACUS_QUESTION_SETS: QuestionSet[] = [
  {
    id: "abacus-jr2-direct-4row",
    title: "ADD & SUB DIRECT (SINGLE DIGIT), 4 ROWS",
    category: "abacus",
    level: "JR-2",
    topic: "1. ADD & SUB DIRECT (SINGLE DIGIT), 4 ROWS",
    description: "Practice direct single-digit addition and subtraction with 4 rows of numbers.",
    questionCount: 20,
    timeLimitSeconds: 240, // 4 minutes
    questions: [
      { id: 1, numbers: [7, -6, 1, 5], correctAnswer: 7, conceptTag: "Direct Addition/Subtraction" },
      { id: 2, numbers: [4, -2, 1, 5], correctAnswer: 8, conceptTag: "Direct Addition/Subtraction" },
      { id: 3, numbers: [8, -3, 2, -5], correctAnswer: 2, conceptTag: "Direct Addition/Subtraction" },
      { id: 4, numbers: [3, 5, -2, 1], correctAnswer: 7, conceptTag: "Direct Addition/Subtraction" },
      { id: 5, numbers: [9, -5, 1, 3], correctAnswer: 8, conceptTag: "Direct Addition/Subtraction" },
      { id: 6, numbers: [6, 2, -5, 1], correctAnswer: 4, conceptTag: "Direct Addition/Subtraction" },
      { id: 7, numbers: [2, 7, -4, 1], correctAnswer: 6, conceptTag: "Direct Addition/Subtraction" },
      { id: 8, numbers: [5, 3, -6, 2], correctAnswer: 4, conceptTag: "Direct Addition/Subtraction" },
      { id: 9, numbers: [1, 8, -5, 2], correctAnswer: 6, conceptTag: "Direct Addition/Subtraction" },
      { id: 10, numbers: [7, 2, -8, 5], correctAnswer: 6, conceptTag: "Direct Addition/Subtraction" },
      { id: 11, numbers: [4, 5, -3, 2], correctAnswer: 8, conceptTag: "Direct Addition/Subtraction" },
      { id: 12, numbers: [8, -6, 2, 5], correctAnswer: 9, conceptTag: "Direct Addition/Subtraction" },
      { id: 13, numbers: [3, 1, 5, -4], correctAnswer: 5, conceptTag: "Direct Addition/Subtraction" },
      { id: 14, numbers: [9, -7, 2, 5], correctAnswer: 9, conceptTag: "Direct Addition/Subtraction" },
      { id: 15, numbers: [6, -1, 3, -5], correctAnswer: 3, conceptTag: "Direct Addition/Subtraction" },
      { id: 16, numbers: [2, 2, 5, -4], correctAnswer: 5, conceptTag: "Direct Addition/Subtraction" },
      { id: 17, numbers: [5, 4, -8, 3], correctAnswer: 4, conceptTag: "Direct Addition/Subtraction" },
      { id: 18, numbers: [7, 1, -5, 2], correctAnswer: 5, conceptTag: "Direct Addition/Subtraction" },
      { id: 19, numbers: [1, 3, 5, -7], correctAnswer: 2, conceptTag: "Direct Addition/Subtraction" },
      { id: 20, numbers: [8, -5, 1, 5], correctAnswer: 9, conceptTag: "Direct Addition/Subtraction" },
    ]
  },
  {
    id: "abacus-jr2-direct-6row",
    title: "ADD & SUB DIRECT (SINGLE DIGIT), 6 ROWS",
    category: "abacus",
    level: "JR-2",
    topic: "2. ADD & SUB DIRECT (SINGLE DIGIT), 6 ROWS",
    description: "6 rows single-digit direct speed test (as in reference screen).",
    questionCount: 20,
    timeLimitSeconds: 240, // 4 minutes
    questions: [
      { id: 1, numbers: [7, -6, 1, 5, -1, -5], correctAnswer: 1, conceptTag: "Direct 6 Rows" },
      { id: 2, numbers: [4, 5, -2, 1, -3, 2], correctAnswer: 7, conceptTag: "Direct 6 Rows" },
      { id: 3, numbers: [8, -5, 1, 5, -4, 2], correctAnswer: 7, conceptTag: "Direct 6 Rows" },
      { id: 4, numbers: [3, 1, 5, -2, 1, -5], correctAnswer: 3, conceptTag: "Direct 6 Rows" },
      { id: 5, numbers: [9, -6, 1, 5, -7, 2], correctAnswer: 4, conceptTag: "Direct 6 Rows" },
      { id: 6, numbers: [2, 7, -5, 1, 3, -4], correctAnswer: 4, conceptTag: "Direct 6 Rows" },
      { id: 7, numbers: [6, 2, -3, 4, -5, 1], correctAnswer: 5, conceptTag: "Direct 6 Rows" },
      { id: 8, numbers: [1, 3, 5, -6, 1, 5], correctAnswer: 9, conceptTag: "Direct 6 Rows" },
      { id: 9, numbers: [5, 4, -7, 2, 5, -4], correctAnswer: 5, conceptTag: "Direct 6 Rows" },
      { id: 10, numbers: [8, -2, -5, 3, 5, -4], correctAnswer: 5, conceptTag: "Direct 6 Rows" },
      { id: 11, numbers: [7, 1, -5, 1, 5, -2], correctAnswer: 7, conceptTag: "Direct 6 Rows" },
      { id: 12, numbers: [4, -1, 5, -3, 2, 1], correctAnswer: 8, conceptTag: "Direct 6 Rows" },
      { id: 13, numbers: [9, -8, 3, 5, -4, 1], correctAnswer: 6, conceptTag: "Direct 6 Rows" },
      { id: 14, numbers: [3, 5, -6, 2, 5, -1], correctAnswer: 8, conceptTag: "Direct 6 Rows" },
      { id: 15, numbers: [6, -5, 3, 5, -4, 2], correctAnswer: 7, conceptTag: "Direct 6 Rows" },
      { id: 16, numbers: [2, 2, 5, -6, 1, 5], correctAnswer: 9, conceptTag: "Direct 6 Rows" },
      { id: 17, numbers: [8, -3, 4, -5, 1, 2], correctAnswer: 7, conceptTag: "Direct 6 Rows" },
      { id: 18, numbers: [5, 2, -6, 3, 5, -4], correctAnswer: 5, conceptTag: "Direct 6 Rows" },
      { id: 19, numbers: [1, 8, -7, 2, 5, -4], correctAnswer: 5, conceptTag: "Direct 6 Rows" },
      { id: 20, numbers: [7, 2, -5, 1, -4, 3], correctAnswer: 4, conceptTag: "Direct 6 Rows" },
    ]
  },
  {
    id: "abacus-small-friends-plus",
    title: "SMALL FRIENDS (+5 CONCEPT)",
    category: "abacus",
    level: "JR-3",
    topic: "3. SMALL FRIENDS ADDITION (+4=+5-1, +3=+5-2, +2=+5-3, +1=+5-4)",
    description: "Master the 5-bead complement formulas for speed mental arithmetic.",
    questionCount: 20,
    timeLimitSeconds: 240, // 4 minutes
    questions: [
      { id: 1, numbers: [4, 4, -3, 2], correctAnswer: 7, conceptTag: "Small Friend +4 (+5 - 1)", explanation: "4 + 4 (+5 - 1 = 8) - 3 = 5 + 2 = 7" },
      { id: 2, numbers: [3, 3, 2, -5], correctAnswer: 3, conceptTag: "Small Friend +3 (+5 - 2)" },
      { id: 3, numbers: [4, 2, 3, -6], correctAnswer: 3, conceptTag: "Small Friend +2 (+5 - 3)" },
      { id: 4, numbers: [4, 1, 4, -5], correctAnswer: 4, conceptTag: "Small Friend +1 (+5 - 4)" },
      { id: 5, numbers: [2, 3, 4, -7], correctAnswer: 2, conceptTag: "Small Friends Mix" },
      { id: 6, numbers: [1, 4, 3, -5], correctAnswer: 3, conceptTag: "Small Friends Mix" },
      { id: 7, numbers: [4, 3, -2, 4], correctAnswer: 9, conceptTag: "Small Friends Mix" },
      { id: 8, numbers: [3, 4, 2, -5], correctAnswer: 4, conceptTag: "Small Friends Mix" },
      { id: 9, numbers: [2, 4, 3, -8], correctAnswer: 1, conceptTag: "Small Friends Mix" },
      { id: 10, numbers: [4, 2, 2, 1], correctAnswer: 9, conceptTag: "Small Friends Mix" },
      { id: 11, numbers: [3, 2, 4, -6], correctAnswer: 3, conceptTag: "Small Friends Mix" },
      { id: 12, numbers: [1, 3, 4, -5], correctAnswer: 3, conceptTag: "Small Friends Mix" },
      { id: 13, numbers: [4, 4, -5, 3], correctAnswer: 6, conceptTag: "Small Friends Mix" },
      { id: 14, numbers: [2, 2, 4, -3], correctAnswer: 5, conceptTag: "Small Friends Mix" },
      { id: 15, numbers: [3, 4, -5, 4], correctAnswer: 6, conceptTag: "Small Friends Mix" },
      { id: 16, numbers: [4, 1, 3, -2], correctAnswer: 6, conceptTag: "Small Friends Mix" },
      { id: 17, numbers: [2, 3, 3, -4], correctAnswer: 4, conceptTag: "Small Friends Mix" },
      { id: 18, numbers: [1, 4, 4, -5], correctAnswer: 4, conceptTag: "Small Friends Mix" },
      { id: 19, numbers: [3, 3, 3, -6], correctAnswer: 3, conceptTag: "Small Friends Mix" },
      { id: 20, numbers: [4, 3, 2, -5], correctAnswer: 4, conceptTag: "Small Friends Mix" },
    ]
  },
  {
    id: "abacus-big-friends",
    title: "BIG FRIENDS (+10 CONCEPT)",
    category: "abacus",
    level: "SR-1",
    topic: "4. BIG FRIENDS (+9=+10-1, +8=+10-2, +7=+10-3 ...)",
    description: "Master 10-base carrying and borrowing techniques.",
    questionCount: 20,
    timeLimitSeconds: 240, // 4 minutes
    questions: [
      { id: 1, numbers: [9, 9, -5, 2], correctAnswer: 15, conceptTag: "Big Friend +9 (+10 - 1)" },
      { id: 2, numbers: [8, 8, 3, -4], correctAnswer: 15, conceptTag: "Big Friend +8 (+10 - 2)" },
      { id: 3, numbers: [7, 7, -3, 5], correctAnswer: 16, conceptTag: "Big Friend +7 (+10 - 3)" },
      { id: 4, numbers: [6, 6, 4, -5], correctAnswer: 11, conceptTag: "Big Friend +6 (+10 - 4)" },
      { id: 5, numbers: [5, 5, 8, -3], correctAnswer: 15, conceptTag: "Big Friend +5 (+10 - 5)" },
      { id: 6, numbers: [9, 4, 8, -6], correctAnswer: 15, conceptTag: "Big Friends Mix" },
      { id: 7, numbers: [8, 5, 7, -2], correctAnswer: 18, conceptTag: "Big Friends Mix" },
      { id: 8, numbers: [7, 6, 9, -5], correctAnswer: 17, conceptTag: "Big Friends Mix" },
      { id: 9, numbers: [6, 7, 8, -4], correctAnswer: 17, conceptTag: "Big Friends Mix" },
      { id: 10, numbers: [9, 9, 9, -7], correctAnswer: 20, conceptTag: "Big Friends Mix" },
      { id: 11, numbers: [8, 4, 9, -5], correctAnswer: 16, conceptTag: "Big Friends Mix" },
      { id: 12, numbers: [7, 8, 6, -3], correctAnswer: 18, conceptTag: "Big Friends Mix" },
      { id: 13, numbers: [9, 3, 8, -4], correctAnswer: 16, conceptTag: "Big Friends Mix" },
      { id: 14, numbers: [6, 9, 7, -5], correctAnswer: 17, conceptTag: "Big Friends Mix" },
      { id: 15, numbers: [5, 8, 9, -6], correctAnswer: 16, conceptTag: "Big Friends Mix" },
      { id: 16, numbers: [8, 7, 8, -4], correctAnswer: 19, conceptTag: "Big Friends Mix" },
      { id: 17, numbers: [9, 6, 7, -8], correctAnswer: 14, conceptTag: "Big Friends Mix" },
      { id: 18, numbers: [7, 9, 5, -6], correctAnswer: 15, conceptTag: "Big Friends Mix" },
      { id: 19, numbers: [6, 8, 9, -7], correctAnswer: 16, conceptTag: "Big Friends Mix" },
      { id: 20, numbers: [9, 8, 7, -5], correctAnswer: 19, conceptTag: "Big Friends Mix" },
    ]
  },
  {
    id: "abacus-mix-combo",
    title: "MIX COMBO (SMALL + BIG FRIENDS)",
    category: "abacus",
    level: "SR-2",
    topic: "5. MIX COMBO FORMULAS (+6=+11-5, +7=+12-5, +8=+13-5, +9=+14-5)",
    description: "Advanced combination formulas combining 5s and 10s beads.",
    questionCount: 20,
    timeLimitSeconds: 240, // 4 minutes
    questions: [
      { id: 1, numbers: [5, 6, 7, -3], correctAnswer: 15, conceptTag: "Mix Combo Formula" },
      { id: 2, numbers: [6, 7, 8, -4], correctAnswer: 17, conceptTag: "Mix Combo Formula" },
      { id: 3, numbers: [7, 8, 6, -5], correctAnswer: 16, conceptTag: "Mix Combo Formula" },
      { id: 4, numbers: [8, 6, 7, -2], correctAnswer: 19, conceptTag: "Mix Combo Formula" },
      { id: 5, numbers: [9, 7, 6, -4], correctAnswer: 18, conceptTag: "Mix Combo Formula" },
      { id: 6, numbers: [4, 6, 7, 8], correctAnswer: 25, conceptTag: "Mix Combo Formula" },
      { id: 7, numbers: [3, 7, 8, 6], correctAnswer: 24, conceptTag: "Mix Combo Formula" },
      { id: 8, numbers: [2, 8, 6, 7], correctAnswer: 23, conceptTag: "Mix Combo Formula" },
      { id: 9, numbers: [1, 9, 7, 8], correctAnswer: 25, conceptTag: "Mix Combo Formula" },
      { id: 10, numbers: [5, 7, 6, 9], correctAnswer: 27, conceptTag: "Mix Combo Formula" },
      { id: 11, numbers: [6, 6, 7, -5], correctAnswer: 14, conceptTag: "Mix Combo Formula" },
      { id: 12, numbers: [7, 7, 6, -4], correctAnswer: 16, conceptTag: "Mix Combo Formula" },
      { id: 13, numbers: [8, 8, 7, -6], correctAnswer: 17, conceptTag: "Mix Combo Formula" },
      { id: 14, numbers: [9, 6, 8, -5], correctAnswer: 18, conceptTag: "Mix Combo Formula" },
      { id: 15, numbers: [4, 7, 6, 8], correctAnswer: 25, conceptTag: "Mix Combo Formula" },
      { id: 16, numbers: [3, 8, 7, 6], correctAnswer: 24, conceptTag: "Mix Combo Formula" },
      { id: 17, numbers: [2, 9, 6, 7], correctAnswer: 24, conceptTag: "Mix Combo Formula" },
      { id: 18, numbers: [5, 8, 6, 9], correctAnswer: 28, conceptTag: "Mix Combo Formula" },
      { id: 19, numbers: [6, 9, 7, -4], correctAnswer: 18, conceptTag: "Mix Combo Formula" },
      { id: 20, numbers: [7, 6, 8, -5], correctAnswer: 16, conceptTag: "Mix Combo Formula" },
    ]
  }
];

export const VEDIC_QUESTION_SETS: QuestionSet[] = [
  {
    id: "vedic-level1-nikhilam",
    title: "NIKHILAM SUTRA (BASE 10 & 100 MULTIPLICATION)",
    category: "vedic",
    level: "Level 1",
    topic: "1. NIKHILAM NAVATASHCARAMAM DASHATAH (ALL FROM 9, LAST FROM 10)",
    description: "Rapid mental multiplication for numbers close to base 10, 100, and 1000.",
    questionCount: 20,
    timeLimitSeconds: 240, // 4 minutes
    questions: [
      { id: 1, expression: "97 × 95", correctAnswer: 9215, conceptTag: "Base 100 (-3, -5)", explanation: "Deficits: -3, -5. LHS: 97 - 5 = 92. RHS: (-3) × (-5) = 15. Result: 9215" },
      { id: 2, expression: "98 × 94", correctAnswer: 9212, conceptTag: "Base 100 (-2, -6)", explanation: "Deficits: -2, -6. LHS: 98 - 6 = 92. RHS: 2 × 6 = 12. Result: 9212" },
      { id: 3, expression: "96 × 93", correctAnswer: 8928, conceptTag: "Base 100 (-4, -7)", explanation: "Deficits: -4, -7. LHS: 96 - 7 = 89. RHS: 4 × 7 = 28. Result: 8928" },
      { id: 4, expression: "99 × 91", correctAnswer: 9009, conceptTag: "Base 100 (-1, -9)", explanation: "Deficits: -1, -9. LHS: 99 - 9 = 90. RHS: 1 × 9 = 09. Result: 9009" },
      { id: 5, expression: "103 × 105", correctAnswer: 10815, conceptTag: "Base 100 Surplus (+3, +5)", explanation: "Surplus: +3, +5. LHS: 103 + 5 = 108. RHS: 3 × 5 = 15. Result: 10815" },
      { id: 6, expression: "104 × 106", correctAnswer: 11024, conceptTag: "Base 100 Surplus (+4, +6)", explanation: "Surplus: +4, +6. LHS: 104 + 6 = 110. RHS: 4 × 6 = 24. Result: 11024" },
      { id: 7, expression: "102 × 107", correctAnswer: 10914, conceptTag: "Base 100 Surplus (+2, +7)", explanation: "Surplus: +2, +7. LHS: 102 + 7 = 109. RHS: 2 × 7 = 14. Result: 10914" },
      { id: 8, expression: "108 × 109", correctAnswer: 11772, conceptTag: "Base 100 Surplus (+8, +9)", explanation: "Surplus: +8, +9. LHS: 108 + 9 = 117. RHS: 8 × 9 = 72. Result: 11772" },
      { id: 9, expression: "9 × 8", correctAnswer: 72, conceptTag: "Base 10 (-1, -2)" },
      { id: 10, expression: "7 × 8", correctAnswer: 56, conceptTag: "Base 10 (-3, -2)" },
      { id: 11, expression: "92 × 97", correctAnswer: 8924, conceptTag: "Base 100 (-8, -3)" },
      { id: 12, expression: "95 × 94", correctAnswer: 8930, conceptTag: "Base 100 (-5, -6)" },
      { id: 13, expression: "105 × 107", correctAnswer: 11235, conceptTag: "Base 100 (+5, +7)" },
      { id: 14, expression: "109 × 103", correctAnswer: 11227, conceptTag: "Base 100 (+9, +3)" },
      { id: 15, expression: "998 × 995", correctAnswer: 993010, conceptTag: "Base 1000 (-2, -5)" },
      { id: 16, expression: "996 × 997", correctAnswer: 993012, conceptTag: "Base 1000 (-4, -3)" },
      { id: 17, expression: "1004 × 1005", correctAnswer: 1009020, conceptTag: "Base 1000 (+4, +5)" },
      { id: 18, expression: "91 × 98", correctAnswer: 8918, conceptTag: "Base 100 (-9, -2)" },
      { id: 19, expression: "106 × 108", correctAnswer: 11448, conceptTag: "Base 100 (+6, +8)" },
      { id: 20, expression: "94 × 97", correctAnswer: 9118, conceptTag: "Base 100 (-6, -3)" },
    ]
  },
  {
    id: "vedic-level1-ekadhikena",
    title: "EKADHIKENA PURVENA (SQUARING ENDING IN 5)",
    category: "vedic",
    level: "Level 1",
    topic: "2. EKADHIKENA PURVENA (BY ONE MORE THAN THE PREVIOUS ONE)",
    description: "Instant 2-second trick to square any number ending in 5.",
    questionCount: 20,
    timeLimitSeconds: 240, // 4 minutes
    questions: [
      { id: 1, expression: "15²", correctAnswer: 225, conceptTag: "1 × (1+1) = 2, attach 25" },
      { id: 2, expression: "25²", correctAnswer: 625, conceptTag: "2 × 3 = 6, attach 25" },
      { id: 3, expression: "35²", correctAnswer: 1225, conceptTag: "3 × 4 = 12, attach 25" },
      { id: 4, expression: "45²", correctAnswer: 2025, conceptTag: "4 × 5 = 20, attach 25" },
      { id: 5, expression: "55²", correctAnswer: 3025, conceptTag: "5 × 6 = 30, attach 25" },
      { id: 6, expression: "65²", correctAnswer: 4225, conceptTag: "6 × 7 = 42, attach 25" },
      { id: 7, expression: "75²", correctAnswer: 5625, conceptTag: "7 × 8 = 56, attach 25" },
      { id: 8, expression: "85²", correctAnswer: 7225, conceptTag: "8 × 9 = 72, attach 25" },
      { id: 9, expression: "95²", correctAnswer: 9025, conceptTag: "9 × 10 = 90, attach 25" },
      { id: 10, expression: "105²", correctAnswer: 11025, conceptTag: "10 × 11 = 110, attach 25" },
      { id: 11, expression: "115²", correctAnswer: 13225, conceptTag: "11 × 12 = 132, attach 25" },
      { id: 12, expression: "125²", correctAnswer: 15625, conceptTag: "12 × 13 = 156, attach 25" },
      { id: 13, expression: "35 × 35", correctAnswer: 1225, conceptTag: "Ekadhikena Purvena" },
      { id: 14, expression: "45 × 45", correctAnswer: 2025, conceptTag: "Ekadhikena Purvena" },
      { id: 15, expression: "65 × 65", correctAnswer: 4225, conceptTag: "Ekadhikena Purvena" },
      { id: 16, expression: "75 × 75", correctAnswer: 5625, conceptTag: "Ekadhikena Purvena" },
      { id: 17, expression: "85 × 85", correctAnswer: 7225, conceptTag: "Ekadhikena Purvena" },
      { id: 18, expression: "95 × 95", correctAnswer: 9025, conceptTag: "Ekadhikena Purvena" },
      { id: 19, expression: "105 × 105", correctAnswer: 11025, conceptTag: "Ekadhikena Purvena" },
      { id: 20, expression: "115 × 115", correctAnswer: 13225, conceptTag: "Ekadhikena Purvena" },
    ]
  },
  {
    id: "vedic-level2-urdhva",
    title: "URDHVA TIRYAGBHYAM (CRISS-CROSS MULTIPLICATION)",
    category: "vedic",
    level: "Level 2",
    topic: "3. URDHVA TIRYAGBHYAM (VERTICALLY AND CROSSWISE)",
    description: "General multiplication sutra for multiplying any 2-digit by 2-digit numbers mentally.",
    questionCount: 20,
    timeLimitSeconds: 240, // 4 minutes
    questions: [
      { id: 1, expression: "12 × 13", correctAnswer: 156, conceptTag: "Criss-Cross 2x2", explanation: "(1×1) | (1×3 + 2×1) | (2×3) = 1 | 5 | 6 = 156" },
      { id: 2, expression: "21 × 31", correctAnswer: 651, conceptTag: "Criss-Cross 2x2" },
      { id: 3, expression: "14 × 12", correctAnswer: 168, conceptTag: "Criss-Cross 2x2" },
      { id: 4, expression: "23 × 12", correctAnswer: 276, conceptTag: "Criss-Cross 2x2" },
      { id: 5, expression: "32 × 21", correctAnswer: 672, conceptTag: "Criss-Cross 2x2" },
      { id: 6, expression: "41 × 12", correctAnswer: 492, conceptTag: "Criss-Cross 2x2" },
      { id: 7, expression: "22 × 31", correctAnswer: 682, conceptTag: "Criss-Cross 2x2" },
      { id: 8, expression: "13 × 14", correctAnswer: 182, conceptTag: "Criss-Cross 2x2" },
      { id: 9, expression: "31 × 32", correctAnswer: 992, conceptTag: "Criss-Cross 2x2" },
      { id: 10, expression: "51 × 12", correctAnswer: 612, conceptTag: "Criss-Cross 2x2" },
      { id: 11, expression: "24 × 12", correctAnswer: 288, conceptTag: "Criss-Cross 2x2" },
      { id: 12, expression: "33 × 21", correctAnswer: 693, conceptTag: "Criss-Cross 2x2" },
      { id: 13, expression: "42 × 12", correctAnswer: 504, conceptTag: "Criss-Cross 2x2" },
      { id: 14, expression: "15 × 12", correctAnswer: 180, conceptTag: "Criss-Cross 2x2" },
      { id: 15, expression: "23 × 22", correctAnswer: 506, conceptTag: "Criss-Cross 2x2" },
      { id: 16, expression: "34 × 12", correctAnswer: 408, conceptTag: "Criss-Cross 2x2" },
      { id: 17, expression: "52 × 11", correctAnswer: 572, conceptTag: "Criss-Cross 2x2" },
      { id: 18, expression: "61 × 12", correctAnswer: 732, conceptTag: "Criss-Cross 2x2" },
      { id: 19, expression: "71 × 11", correctAnswer: 781, conceptTag: "Criss-Cross 2x2" },
      { id: 20, expression: "82 × 11", correctAnswer: 902, conceptTag: "Criss-Cross 2x2" },
    ]
  }
];

export function getAllQuestionSets(): QuestionSet[] {
  return [...ABACUS_QUESTION_SETS, ...VEDIC_QUESTION_SETS];
}

export function getQuestionSetById(id: string): QuestionSet | undefined {
  return getAllQuestionSets().find(set => set.id === id);
}

/**
 * Generator helper to expand question sets for speed modes:
 * - exam / instant: 20 questions, 4 mins (240s)
 * - speed-100-5m: 100 questions, 5 mins (300s)
 * - speed-100-10m: 100 questions, 10 mins (600s)
 * - speed-200-20m: 200 questions, 20 mins (1200s)
 */
export function getCustomizedSet(setId: string, mode: PracticeMode): QuestionSet {
  const base = getQuestionSetById(setId) || ABACUS_QUESTION_SETS[0];

  let targetCount = 20;
  let timeLimitSeconds = 240; // 4 mins default
  let modeTag = "4-Min Timed Exam";

  if (mode === "speed-100-5m") {
    targetCount = 100;
    timeLimitSeconds = 300; // 5 mins
    modeTag = "100 Qs in 5 Mins Speed Sprint";
  } else if (mode === "speed-100-10m") {
    targetCount = 100;
    timeLimitSeconds = 600; // 10 mins
    modeTag = "100 Qs in 10 Mins Speed Marathon";
  } else if (mode === "speed-200-20m") {
    targetCount = 200;
    timeLimitSeconds = 1200; // 20 mins
    modeTag = "200 Qs in 20 Mins Ultimate Challenge";
  } else if (mode === "instant") {
    targetCount = 20;
    timeLimitSeconds = 240;
    modeTag = "Instant Feedback Mode";
  }

  // Multiply/cycle base questions if needed to reach targetCount
  const expandedQuestions: Question[] = [];
  for (let i = 0; i < targetCount; i++) {
    const baseQ = base.questions[i % base.questions.length];
    expandedQuestions.push({
      ...baseQ,
      id: i + 1,
    });
  }

  return {
    ...base,
    title: `${targetCount} Questions - ${base.title}`,
    questionCount: targetCount,
    timeLimitSeconds,
    questions: expandedQuestions,
  };
}
