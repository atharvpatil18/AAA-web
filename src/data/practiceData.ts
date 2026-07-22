/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionSet, Question, PracticeMode } from "../types";

export const ABACUS_QUESTION_SETS: QuestionSet[] = [
  // JR-1 Curriculum Set
  {
    id: "abacus-jr1-direct-3-4-5row",
    title: "ADD./ SUB. S.D. 3-4-5 ROWS ± DIRECT",
    category: "abacus",
    level: "JR-1",
    topic: "1. Add./ Sub. S.D. 3-4-5 rows  ± Direct (without compliments)",
    description: "Practice Single Digit (S.D.) 3, 4, or 5 rows direct addition and subtraction (without complements).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [2, 5, -1], correctAnswer: 6, conceptTag: "JR-1 Direct 3 Rows" },
      { id: 2, numbers: [4, 5, -3, 2], correctAnswer: 8, conceptTag: "JR-1 Direct 4 Rows" },
      { id: 3, numbers: [1, 2, 5, -3, 4], correctAnswer: 9, conceptTag: "JR-1 Direct 5 Rows" },
    ]
  },
  {
    id: "abacus-jr2-direct-4row",
    title: "ADD & SUB DIRECT (SINGLE DIGIT), 4 ROWS",
    category: "abacus",
    level: "JR-2",
    topic: "1. ADD & SUB DIRECT (SINGLE DIGIT), 4 ROWS",
    description: "Practice direct single-digit addition and subtraction with 4 rows of numbers.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [7, -6, 1, 5], correctAnswer: 7, conceptTag: "Direct Addition/Subtraction" },
      { id: 2, numbers: [4, -2, 1, 5], correctAnswer: 8, conceptTag: "Direct Addition/Subtraction" },
      { id: 3, numbers: [8, -3, 2, -5], correctAnswer: 2, conceptTag: "Direct Addition/Subtraction" },
      { id: 4, numbers: [3, 5, -2, 1], correctAnswer: 7, conceptTag: "Direct Addition/Subtraction" },
      { id: 5, numbers: [9, -5, 1, 3], correctAnswer: 8, conceptTag: "Direct Addition/Subtraction" },
    ]
  },
  {
    id: "abacus-jr2-plus5-comp",
    title: "ADD & SUB (SINGLE DIGIT), +5 COMP (4-5 ROWS)",
    category: "abacus",
    level: "JR-2",
    topic: "2. ADD & SUB (SINGLE DIGIT), +5 COMP (4-5 ROWS)",
    description: "Practice Small Friends addition complement formulas (+4=+5-1, +3=+5-2, +2=+5-3, +1=+5-4).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [4, 4, -3, 2], correctAnswer: 7, conceptTag: "+5 Complement" },
      { id: 2, numbers: [3, 3, 2, -5], correctAnswer: 3, conceptTag: "+5 Complement" },
      { id: 3, numbers: [2, 4, -5, 3], correctAnswer: 4, conceptTag: "+5 Complement" },
      { id: 4, numbers: [4, 1, 4, -5], correctAnswer: 4, conceptTag: "+5 Complement" },
      { id: 5, numbers: [1, 4, 3, -5], correctAnswer: 3, conceptTag: "+5 Complement" },
    ]
  },
  {
    id: "abacus-jr2-minus5-comp",
    title: "ADD & SUB (SINGLE DIGIT), -5 COMP (4-5 ROWS)",
    category: "abacus",
    level: "JR-2",
    topic: "3. ADD & SUB (SINGLE DIGIT), -5 COMP (4-5 ROWS)",
    description: "Practice Small Friends subtraction complement formulas (-4=-5+1, -3=-5+2, -2=-5+3, -1=-5+4).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [6, -4, 2, 5], correctAnswer: 9, conceptTag: "-5 Complement" },
      { id: 2, numbers: [7, -3, 1, 4], correctAnswer: 9, conceptTag: "-5 Complement" },
      { id: 3, numbers: [5, -2, 3, -5], correctAnswer: 1, conceptTag: "-5 Complement" },
      { id: 4, numbers: [8, -4, 2, -5], correctAnswer: 1, conceptTag: "-5 Complement" },
      { id: 5, numbers: [5, -1, 4, -3], correctAnswer: 5, conceptTag: "-5 Complement" },
    ]
  },
  {
    id: "abacus-jr2-plus10-comp",
    title: "ADD & SUB (SINGLE DIGIT), +10 COMP (4 ROWS)",
    category: "abacus",
    level: "JR-2",
    topic: "4. ADD & SUB (SINGLE DIGIT), +10 COMP (4 ROWS)",
    description: "Practice Big Friends addition complement formulas (+9=+10-1, +8=+10-2, +7=+10-3...).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [9, 9, -5, 2], correctAnswer: 15, conceptTag: "+10 Complement" },
      { id: 2, numbers: [8, 8, 3, -4], correctAnswer: 15, conceptTag: "+10 Complement" },
      { id: 3, numbers: [7, 7, -3, 5], correctAnswer: 16, conceptTag: "+10 Complement" },
      { id: 4, numbers: [6, 6, 2, -5], correctAnswer: 9, conceptTag: "+10 Complement" },
      { id: 5, numbers: [5, 5, 4, -3], correctAnswer: 11, conceptTag: "+10 Complement" },
    ]
  },
  {
    id: "abacus-jr2-minus10-comp",
    title: "ADD & SUB (SINGLE DIGIT), -10 COMP (4-5 ROWS)",
    category: "abacus",
    level: "JR-2",
    topic: "5. ADD & SUB (SINGLE DIGIT), -10 COMP (4-5 ROWS)",
    description: "Practice Big Friends subtraction complement formulas (-9=-10+1, -8=-10+2, -7=-10+3...).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [15, -9, 4, 3], correctAnswer: 13, conceptTag: "-10 Complement" },
      { id: 2, numbers: [14, -8, 5, -2], correctAnswer: 9, conceptTag: "-10 Complement" },
      { id: 3, numbers: [13, -7, 6, -5], correctAnswer: 7, conceptTag: "-10 Complement" },
      { id: 4, numbers: [12, -6, 4, 5], correctAnswer: 15, conceptTag: "-10 Complement" },
      { id: 5, numbers: [11, -5, 8, -4], correctAnswer: 10, conceptTag: "-10 Complement" },
    ]
  },
  {
    id: "abacus-jr2-plus-mixed",
    title: "ADD & SUB (SINGLE DIGIT), + MIXED COMP",
    category: "abacus",
    level: "JR-2",
    topic: "6. ADD & SUB (SINGLE DIGIT), + MIXED COMP",
    description: "Practice Combination Addition formulas (+6=+11-5, +7=+12-5, +8=+13-5, +9=+14-5).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [6, 6, -5, 2], correctAnswer: 9, conceptTag: "+ Mixed Complement" },
      { id: 2, numbers: [7, 7, -5, 3], correctAnswer: 12, conceptTag: "+ Mixed Complement" },
      { id: 3, numbers: [8, 8, -6, 5], correctAnswer: 15, conceptTag: "+ Mixed Complement" },
      { id: 4, numbers: [9, 9, -7, 4], correctAnswer: 15, conceptTag: "+ Mixed Complement" },
      { id: 5, numbers: [5, 6, 7, -8], correctAnswer: 10, conceptTag: "+ Mixed Complement" },
    ]
  },
  {
    id: "abacus-jr2-minus-mixed",
    title: "ADD & SUB (SINGLE DIGIT), - MIXED COMP",
    category: "abacus",
    level: "JR-2",
    topic: "7. ADD & SUB (SINGLE DIGIT), - MIXED COMP",
    description: "Practice Combination Subtraction formulas (-6=-11+5, -7=-12+5, -8=-13+5, -9=-14+5).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [13, -6, 4, 5], correctAnswer: 16, conceptTag: "- Mixed Complement" },
      { id: 2, numbers: [14, -7, 3, -5], correctAnswer: 5, conceptTag: "- Mixed Complement" },
      { id: 3, numbers: [15, -8, 6, -4], correctAnswer: 9, conceptTag: "- Mixed Complement" },
      { id: 4, numbers: [16, -9, 5, 2], correctAnswer: 14, conceptTag: "- Mixed Complement" },
      { id: 5, numbers: [12, -6, 7, -5], correctAnswer: 8, conceptTag: "- Mixed Complement" },
    ]
  },
  // JR-3 Curriculum Sets
  {
    id: "abacus-jr3-single-direct-6-7row",
    title: "SINGLE DIGIT DIRECT SUMS— 6 -7 ROWS",
    category: "abacus",
    level: "JR-3",
    topic: "1. Single digit direct sums— 6 -7rows",
    description: "Practice 6 to 7 rows single digit direct addition and subtraction.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [7, -6, 1, 5, -2, 3, -1], correctAnswer: 7, conceptTag: "Direct 6-7 Rows" },
      { id: 2, numbers: [4, 5, -3, 2, 1, -5, 4], correctAnswer: 8, conceptTag: "Direct 6-7 Rows" },
      { id: 3, numbers: [8, -5, 1, 5, -4, 2, -2], correctAnswer: 5, conceptTag: "Direct 6-7 Rows" },
    ]
  },
  {
    id: "abacus-jr3-double-direct-4row",
    title: "DOUBLE DIGIT DIRECT-4 ROWS",
    category: "abacus",
    level: "JR-3",
    topic: "2. Double digit direct-4 rows",
    description: "Practice 4 rows 2-digit direct addition and subtraction.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [42, 55, -31, 23], correctAnswer: 89, conceptTag: "Double Digit Direct" },
      { id: 2, numbers: [34, 15, 50, -42], correctAnswer: 57, conceptTag: "Double Digit Direct" },
      { id: 3, numbers: [71, -50, 23, 55], correctAnswer: 99, conceptTag: "Double Digit Direct" },
    ]
  },
  {
    id: "abacus-jr3-double-allcomp-4-5row",
    title: "DOUBLE DIGIT ALL COMPLEMENT - 4-5 ROWS",
    category: "abacus",
    level: "JR-3",
    topic: "3. Double digit all complement - 4-5 rows",
    description: "Practice 4-5 rows 2-digit addition and subtraction using all complements (+5, -5, +10, -10, Mixed).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [48, 37, -25, 49], correctAnswer: 109, conceptTag: "Double Digit All Complements" },
      { id: 2, numbers: [59, 26, -44, 58], correctAnswer: 99, conceptTag: "Double Digit All Complements" },
      { id: 3, numbers: [64, 49, -38, 75, -20], correctAnswer: 130, conceptTag: "Double Digit All Complements" },
    ]
  },
  {
    id: "abacus-jr3-double-allcomp-6-7row",
    title: "DOUBLE DIGIT ALL COMPLEMENT - 6-7 ROWS",
    category: "abacus",
    level: "JR-3",
    topic: "4. Double digit all complement - 6-7 rows",
    description: "Practice 6-7 rows 2-digit speed addition and subtraction with all complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [28, 47, -35, 62, 19, -40, 55], correctAnswer: 136, conceptTag: "Double 6-7 Rows Complements" },
      { id: 2, numbers: [54, 38, -27, 49, -15, 63, -20], correctAnswer: 142, conceptTag: "Double 6-7 Rows Complements" },
    ]
  },
  {
    id: "abacus-jr3-triple-allcomp-4-5row",
    title: "TRIPLE DIGIT ALL COMPLEMENTS-4-5 ROWS",
    category: "abacus",
    level: "JR-3",
    topic: "5. Triple digit all Complements-4-5 rows",
    description: "Practice 4-5 rows 3-digit speed addition and subtraction with all complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [485, 372, -240, 519], correctAnswer: 1136, conceptTag: "Triple Digit Complements" },
      { id: 2, numbers: [624, 289, -350, 478, -120], correctAnswer: 921, conceptTag: "Triple Digit Complements" },
    ]
  },

  // SR-1 Curriculum Sets
  {
    id: "abacus-sr1-single-direct-5-6row",
    title: "ADD & SUB SINGLE DIGIT DIRECT (5- 6 ROWS )",
    category: "abacus",
    level: "SR-1",
    topic: "1.Add & sub single digit direct (5- 6 rows )",
    description: "Practice 5 to 6 rows single digit direct addition and subtraction.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [7, -6, 1, 5, -2, 3], correctAnswer: 8, conceptTag: "SR-1 Direct Single" },
      { id: 2, numbers: [4, 5, -3, 2, 1, -5], correctAnswer: 4, conceptTag: "SR-1 Direct Single" },
    ]
  },
  {
    id: "abacus-sr1-single-plus5-5-6row",
    title: "ADD & SUB SINGLE DIGIT +5 COMP(5- 6 ROWS )",
    category: "abacus",
    level: "SR-1",
    topic: "2.Add & sub single digit +5 comp(5- 6 rows )",
    description: "Practice 5-6 rows single digit +5 Small Friends complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [4, 4, -3, 2, 4, -5], correctAnswer: 6, conceptTag: "SR-1 +5 Complement" },
      { id: 2, numbers: [3, 3, 2, -5, 4, 1], correctAnswer: 8, conceptTag: "SR-1 +5 Complement" },
    ]
  },
  {
    id: "abacus-sr1-single-minus5-5-6row",
    title: "ADD & SUB SINGLE DIGIT -5 COMP(5- 6 ROWS )",
    category: "abacus",
    level: "SR-1",
    topic: "3.Add & sub single digit -5 comp(5- 6 rows )",
    description: "Practice 5-6 rows single digit -5 Small Friends complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [6, -4, 2, 5, -3, 1], correctAnswer: 7, conceptTag: "SR-1 -5 Complement" },
      { id: 2, numbers: [7, -3, 1, 4, -2, 2], correctAnswer: 9, conceptTag: "SR-1 -5 Complement" },
    ]
  },
  {
    id: "abacus-sr1-single-plus10-5-6row",
    title: "ADD & SUB SINGLE DIGIT +10 COMP(5-6 ROWS )",
    category: "abacus",
    level: "SR-1",
    topic: "4.Add & sub single digit +10 comp(5-6 rows )",
    description: "Practice 5-6 rows single digit +10 Big Friends complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [9, 9, -5, 2, 8, -4], correctAnswer: 19, conceptTag: "SR-1 +10 Complement" },
      { id: 2, numbers: [8, 8, 3, -4, 7, 2], correctAnswer: 24, conceptTag: "SR-1 +10 Complement" },
    ]
  },
  {
    id: "abacus-sr1-single-minus10-5-6row",
    title: "ADD & SUB SINGLE DIGIT -10 COMP(5-6 ROWS )",
    category: "abacus",
    level: "SR-1",
    topic: "5.Add & sub single digit -10 comp(5-6 rows )",
    description: "Practice 5-6 rows single digit -10 Big Friends complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [15, -9, 4, 3, -7, 5], correctAnswer: 11, conceptTag: "SR-1 -10 Complement" },
      { id: 2, numbers: [14, -8, 5, -2, -6, 4], correctAnswer: 7, conceptTag: "SR-1 -10 Complement" },
    ]
  },
  {
    id: "abacus-sr1-single-plus-mixed-5-6row",
    title: "ADD & SUB SINGLE DIGIT + MIXED COMP(5-6 ROWS )",
    category: "abacus",
    level: "SR-1",
    topic: "6.Add & sub single digit + Mixed comp(5-6 rows )",
    description: "Practice 5-6 rows single digit + Mixed Combination complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [6, 6, -5, 2, 7, -4], correctAnswer: 12, conceptTag: "SR-1 + Mixed Complement" },
      { id: 2, numbers: [7, 7, -5, 3, 8, -6], correctAnswer: 14, conceptTag: "SR-1 + Mixed Complement" },
    ]
  },
  {
    id: "abacus-sr1-single-minus-mixed-5-6row",
    title: "ADD & SUB SINGLE DIGIT - MIXED COMP(5-6 ROWS )",
    category: "abacus",
    level: "SR-1",
    topic: "7.Add & sub single digit - Mixed comp(5-6 rows )",
    description: "Practice 5-6 rows single digit - Mixed Combination complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [13, -6, 4, 5, -7, 2], correctAnswer: 11, conceptTag: "SR-1 - Mixed Complement" },
      { id: 2, numbers: [14, -7, 3, -5, -6, 4], correctAnswer: 3, conceptTag: "SR-1 - Mixed Complement" },
    ]
  },

  // SR-2 Curriculum Sets
  {
    id: "abacus-sr2-double-direct",
    title: "ADD & SUB DOUBLE DIGIT DIRECT",
    category: "abacus",
    level: "SR-2",
    topic: "1.Add & sub double digit direct",
    description: "Practice 2-digit direct addition and subtraction speed drills.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [42, 55, -31, 23, 10], correctAnswer: 99, conceptTag: "SR-2 Double Direct" },
      { id: 2, numbers: [34, 15, 50, -42, 21], correctAnswer: 78, conceptTag: "SR-2 Double Direct" },
    ]
  },
  {
    id: "abacus-sr2-double-allcomp",
    title: "ADD & SUB DOUBLE DIGIT ALL COMPLEMENTS",
    category: "abacus",
    level: "SR-2",
    topic: "2.Add & sub double digit all complements",
    description: "Practice 2-digit addition and subtraction using all complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [48, 37, -25, 49, 18], correctAnswer: 127, conceptTag: "SR-2 Double Complements" },
      { id: 2, numbers: [59, 26, -44, 58, -20], correctAnswer: 79, conceptTag: "SR-2 Double Complements" },
    ]
  },
  {
    id: "abacus-sr2-single-allcomp",
    title: "ADD & SUB SINGLE DIGIT ALL COMPLEMENTS",
    category: "abacus",
    level: "SR-2",
    topic: "3.Add & sub single digit all complements",
    description: "Practice multi-row single digit addition and subtraction with all complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [9, 8, -5, 7, 6, -4, 3], correctAnswer: 24, conceptTag: "SR-2 Single Complements" },
      { id: 2, numbers: [7, 6, -3, 8, 9, -5, 4], correctAnswer: 26, conceptTag: "SR-2 Single Complements" },
    ]
  },
  {
    id: "abacus-sr2-triple-allcomp",
    title: "TRIPLE DIGIT DIRECT SUMS ALL COMPLEMENTS",
    category: "abacus",
    level: "SR-2",
    topic: "4. Triple digit direct sums all complements",
    description: "Practice 3-digit speed addition and subtraction using all complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [485, 372, -240, 519, 120], correctAnswer: 1256, conceptTag: "SR-2 Triple Complements" },
      { id: 2, numbers: [624, 289, -350, 478, -210], correctAnswer: 831, conceptTag: "SR-2 Triple Complements" },
    ]
  }
];

export const VEDIC_QUESTION_SETS: QuestionSet[] = [
  // JVM-1 Modules (from Reference Screenshot)
  {
    id: "jvm1-addition",
    title: "JVM-1: Rapid Addition",
    category: "vedic",
    level: "JVM-1",
    topic: "Addition",
    description: "Fast left-to-right Vedic addition drills.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "48 + 37", correctAnswer: 85, conceptTag: "Left to Right Addition", explanation: "40+30=70, 8+7=15 -> 85" },
      { id: 2, expression: "59 + 26", correctAnswer: 85, conceptTag: "Left to Right Addition" },
      { id: 3, expression: "64 + 49", correctAnswer: 113, conceptTag: "Left to Right Addition" },
      { id: 4, expression: "78 + 35", correctAnswer: 113, conceptTag: "Left to Right Addition" },
      { id: 5, expression: "83 + 57", correctAnswer: 140, conceptTag: "Left to Right Addition" },
      { id: 6, expression: "96 + 48", correctAnswer: 144, conceptTag: "Left to Right Addition" },
      { id: 7, expression: "29 + 63", correctAnswer: 92, conceptTag: "Left to Right Addition" },
      { id: 8, expression: "47 + 85", correctAnswer: 132, conceptTag: "Left to Right Addition" },
      { id: 9, expression: "74 + 68", correctAnswer: 142, conceptTag: "Left to Right Addition" },
      { id: 10, expression: "89 + 77", correctAnswer: 166, conceptTag: "Left to Right Addition" },
    ]
  },
  {
    id: "jvm1-ekadhik",
    title: "JVM-1: Ekadhik Sutra",
    category: "vedic",
    level: "JVM-1",
    topic: "Ekadhik",
    description: "One more than the previous digit (Ekadhikena Purvena).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Ekadhik of 7", correctAnswer: 8, conceptTag: "7 + 1 = 8" },
      { id: 2, expression: "Ekadhik of 19", correctAnswer: 20, conceptTag: "19 + 1 = 20" },
      { id: 3, expression: "Ekadhik of 45", correctAnswer: 46, conceptTag: "45 + 1 = 46" },
      { id: 4, expression: "Ekadhik of 89", correctAnswer: 90, conceptTag: "89 + 1 = 90" },
      { id: 5, expression: "Ekadhik of 134", correctAnswer: 135, conceptTag: "134 + 1 = 135" },
      { id: 6, expression: "Ekadhik of 999", correctAnswer: 1000, conceptTag: "999 + 1 = 1000" },
      { id: 7, expression: "Ekadhik of 68", correctAnswer: 69, conceptTag: "68 + 1 = 69" },
      { id: 8, expression: "Ekadhik of 249", correctAnswer: 250, conceptTag: "249 + 1 = 250" },
      { id: 9, expression: "Ekadhik of 73", correctAnswer: 74, conceptTag: "73 + 1 = 74" },
      { id: 10, expression: "Ekadhik of 519", correctAnswer: 520, conceptTag: "519 + 1 = 520" },
    ]
  },
  {
    id: "jvm1-ekanyunena",
    title: "JVM-1: Ekanyunena Sutra",
    category: "vedic",
    level: "JVM-1",
    topic: "Ekanyunena",
    description: "One less than the previous digit (Ekanyunena Purvena).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Ekanyunena of 9", correctAnswer: 8, conceptTag: "9 - 1 = 8" },
      { id: 2, expression: "Ekanyunena of 50", correctAnswer: 49, conceptTag: "50 - 1 = 49" },
      { id: 3, expression: "Ekanyunena of 74", correctAnswer: 73, conceptTag: "74 - 1 = 73" },
      { id: 4, expression: "Ekanyunena of 100", correctAnswer: 99, conceptTag: "100 - 1 = 99" },
      { id: 5, expression: "Ekanyunena of 628", correctAnswer: 627, conceptTag: "628 - 1 = 627" },
      { id: 6, expression: "Ekanyunena of 430", correctAnswer: 429, conceptTag: "430 - 1 = 429" },
      { id: 7, expression: "Ekanyunena of 88", correctAnswer: 87, conceptTag: "88 - 1 = 87" },
      { id: 8, expression: "Ekanyunena of 1000", correctAnswer: 999, conceptTag: "1000 - 1 = 999" },
      { id: 9, expression: "Ekanyunena of 351", correctAnswer: 350, conceptTag: "351 - 1 = 350" },
      { id: 10, expression: "Ekanyunena of 90", correctAnswer: 89, conceptTag: "90 - 1 = 89" },
    ]
  },
  {
    id: "jvm1-dodging-table",
    title: "JVM-1: Dodging Tables",
    category: "vedic",
    level: "JVM-1",
    topic: "Dodging Table",
    description: "Split-second multiplication table drills.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "14 × 7", correctAnswer: 98, conceptTag: "Table 14" },
      { id: 2, expression: "16 × 8", correctAnswer: 128, conceptTag: "Table 16" },
      { id: 3, expression: "17 × 6", correctAnswer: 102, conceptTag: "Table 17" },
      { id: 4, expression: "18 × 9", correctAnswer: 162, conceptTag: "Table 18" },
      { id: 5, expression: "19 × 7", correctAnswer: 133, conceptTag: "Table 19" },
      { id: 6, expression: "13 × 9", correctAnswer: 117, conceptTag: "Table 13" },
      { id: 7, expression: "15 × 8", correctAnswer: 120, conceptTag: "Table 15" },
      { id: 8, expression: "17 × 9", correctAnswer: 153, conceptTag: "Table 17" },
      { id: 9, expression: "18 × 7", correctAnswer: 126, conceptTag: "Table 18" },
      { id: 10, expression: "19 × 8", correctAnswer: 152, conceptTag: "Table 19" },
    ]
  },
  {
    id: "jvm1-mult-11",
    title: "JVM-1: Multiplication by 11",
    category: "vedic",
    level: "JVM-1",
    topic: "Multiplication by 11",
    description: "Instant Vedic sandwich trick for multiplying any number by 11.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "35 × 11", correctAnswer: 385, conceptTag: "3 | (3+5) | 5 = 385" },
      { id: 2, expression: "42 × 11", correctAnswer: 462, conceptTag: "4 | (4+2) | 2 = 462" },
      { id: 3, expression: "63 × 11", correctAnswer: 693, conceptTag: "6 | (6+3) | 3 = 693" },
      { id: 4, expression: "75 × 11", correctAnswer: 825, conceptTag: "7 | (7+5) | 5 = 825" },
      { id: 5, expression: "84 × 11", correctAnswer: 924, conceptTag: "8 | (8+4) | 4 = 924" },
      { id: 6, expression: "96 × 11", correctAnswer: 1056, conceptTag: "9 | (9+6) | 6 = 1056" },
      { id: 7, expression: "54 × 11", correctAnswer: 594, conceptTag: "5 | (5+4) | 4 = 594" },
      { id: 8, expression: "123 × 11", correctAnswer: 1353, conceptTag: "1 | (1+2) | (2+3) | 3" },
      { id: 9, expression: "245 × 11", correctAnswer: 2695, conceptTag: "2 | (2+4) | (4+5) | 5" },
      { id: 10, expression: "314 × 11", correctAnswer: 3454, conceptTag: "3 | (3+1) | (1+4) | 4" },
    ]
  },
  {
    id: "jvm1-mult-multiples-11",
    title: "JVM-1: Multiplication by Multiples of 11",
    category: "vedic",
    level: "JVM-1",
    topic: "Multiplication by Multiples of 11",
    description: "Multiply numbers by 22, 33, 44, 55 instantly.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "24 × 22", correctAnswer: 528, conceptTag: "(24 × 2) × 11 = 48 × 11 = 528" },
      { id: 2, expression: "15 × 33", correctAnswer: 495, conceptTag: "(15 × 3) × 11 = 45 × 11 = 495" },
      { id: 3, expression: "12 × 44", correctAnswer: 528, conceptTag: "(12 × 4) × 11 = 48 × 11 = 528" },
      { id: 4, expression: "18 × 55", correctAnswer: 990, conceptTag: "(18 × 5) × 11 = 90 × 11 = 990" },
      { id: 5, expression: "32 × 22", correctAnswer: 704, conceptTag: "(32 × 2) × 11 = 64 × 11 = 704" },
      { id: 6, expression: "21 × 33", correctAnswer: 693, conceptTag: "(21 × 3) × 11 = 63 × 11 = 693" },
      { id: 7, expression: "23 × 44", correctAnswer: 1012, conceptTag: "(23 × 4) × 11 = 92 × 11 = 1012" },
      { id: 8, expression: "16 × 55", correctAnswer: 880, conceptTag: "(16 × 5) × 11 = 80 × 11 = 880" },
      { id: 9, expression: "41 × 22", correctAnswer: 902, conceptTag: "(41 × 2) × 11 = 82 × 11 = 902" },
      { id: 10, expression: "25 × 33", correctAnswer: 825, conceptTag: "(25 × 3) × 11 = 75 × 11 = 825" },
    ]
  },
  {
    id: "jvm1-mult-101",
    title: "JVM-1: Multiplication by 101",
    category: "vedic",
    level: "JVM-1",
    topic: "Multiplication by 101",
    description: "Double repeat pattern rule for multiplying 2-digit numbers by 101.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "37 × 101", correctAnswer: 3737, conceptTag: "Repeat digits 37 twice -> 3737" },
      { id: 2, expression: "45 × 101", correctAnswer: 4545, conceptTag: "Repeat digits 45 twice -> 4545" },
      { id: 3, expression: "89 × 101", correctAnswer: 8989, conceptTag: "Repeat digits 89 twice -> 8989" },
      { id: 4, expression: "62 × 101", correctAnswer: 6262, conceptTag: "Repeat digits 62 twice -> 6262" },
      { id: 5, expression: "74 × 101", correctAnswer: 7474, conceptTag: "Repeat digits 74 twice -> 7474" },
      { id: 6, expression: "93 × 101", correctAnswer: 9393, conceptTag: "Repeat digits 93 twice -> 9393" },
      { id: 7, expression: "28 × 101", correctAnswer: 2828, conceptTag: "Repeat digits 28 twice -> 2828" },
      { id: 8, expression: "56 × 101", correctAnswer: 5656, conceptTag: "Repeat digits 56 twice -> 5656" },
      { id: 9, expression: "19 × 101", correctAnswer: 1919, conceptTag: "Repeat digits 19 twice -> 1919" },
      { id: 10, expression: "81 × 101", correctAnswer: 8181, conceptTag: "Repeat digits 81 twice -> 8181" },
    ]
  },
  {
    id: "jvm1-convert-paise-rupees",
    title: "JVM-1: Convert Paise into Rupees",
    category: "vedic",
    level: "JVM-1",
    topic: "Convert Paise into Rupees",
    description: "Convert paise to rupees (Divide by 100).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "500 Paise = ? Rupees", correctAnswer: 5, conceptTag: "500 ÷ 100 = 5" },
      { id: 2, expression: "750 Paise = ? Rupees (in decimals)", correctAnswer: 7.5, conceptTag: "750 ÷ 100 = 7.5" },
      { id: 3, expression: "1200 Paise = ? Rupees", correctAnswer: 12, conceptTag: "1200 ÷ 100 = 12" },
      { id: 4, expression: "2450 Paise = ? Rupees", correctAnswer: 24.5, conceptTag: "2450 ÷ 100 = 24.5" },
      { id: 5, expression: "3000 Paise = ? Rupees", correctAnswer: 30, conceptTag: "3000 ÷ 100 = 30" },
      { id: 6, expression: "4500 Paise = ? Rupees", correctAnswer: 45, conceptTag: "4500 ÷ 100 = 45" },
      { id: 7, expression: "800 Paise = ? Rupees", correctAnswer: 8, conceptTag: "800 ÷ 100 = 8" },
      { id: 8, expression: "1850 Paise = ? Rupees", correctAnswer: 18.5, conceptTag: "1850 ÷ 100 = 18.5" },
      { id: 9, expression: "6000 Paise = ? Rupees", correctAnswer: 60, conceptTag: "6000 ÷ 100 = 60" },
      { id: 10, expression: "950 Paise = ? Rupees", correctAnswer: 9.5, conceptTag: "950 ÷ 100 = 9.5" },
    ]
  },
  {
    id: "jvm1-convert-rupees-paise",
    title: "JVM-1: Convert Rupees into Paise",
    category: "vedic",
    level: "JVM-1",
    topic: "Convert Rupees into Paise",
    description: "Convert rupees to paise (Multiply by 100).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "₹ 8 = ? Paise", correctAnswer: 800, conceptTag: "8 × 100 = 800" },
      { id: 2, expression: "₹ 15 = ? Paise", correctAnswer: 1500, conceptTag: "15 × 100 = 1500" },
      { id: 3, expression: "₹ 24.50 = ? Paise", correctAnswer: 2450, conceptTag: "24.5 × 100 = 2450" },
      { id: 4, expression: "₹ 50 = ? Paise", correctAnswer: 5000, conceptTag: "50 × 100 = 5000" },
      { id: 5, expression: "₹ 7.50 = ? Paise", correctAnswer: 750, conceptTag: "7.5 × 100 = 750" },
      { id: 6, expression: "₹ 12.25 = ? Paise", correctAnswer: 1225, conceptTag: "12.25 × 100 = 1225" },
      { id: 7, expression: "₹ 35 = ? Paise", correctAnswer: 3500, conceptTag: "35 × 100 = 3500" },
      { id: 8, expression: "₹ 9.90 = ? Paise", correctAnswer: 990, conceptTag: "9.9 × 100 = 990" },
      { id: 9, expression: "₹ 62 = ? Paise", correctAnswer: 6200, conceptTag: "62 × 100 = 6200" },
      { id: 10, expression: "₹ 100 = ? Paise", correctAnswer: 10000, conceptTag: "100 × 100 = 10000" },
    ]
  },
  {
    id: "jvm1-convert-cm-m",
    title: "JVM-1: Convert Centimeter into Meter",
    category: "vedic",
    level: "JVM-1",
    topic: "Convert Centimeter into Meter",
    description: "Convert cm to meters (Divide by 100).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "400 cm = ? Meters", correctAnswer: 4, conceptTag: "400 ÷ 100 = 4" },
      { id: 2, expression: "750 cm = ? Meters", correctAnswer: 7.5, conceptTag: "750 ÷ 100 = 7.5" },
      { id: 3, expression: "1500 cm = ? Meters", correctAnswer: 15, conceptTag: "1500 ÷ 100 = 15" },
      { id: 4, expression: "2800 cm = ? Meters", correctAnswer: 28, conceptTag: "2800 ÷ 100 = 28" },
      { id: 5, expression: "600 cm = ? Meters", correctAnswer: 6, conceptTag: "600 ÷ 100 = 6" },
      { id: 6, expression: "350 cm = ? Meters", correctAnswer: 3.5, conceptTag: "350 ÷ 100 = 3.5" },
      { id: 7, expression: "900 cm = ? Meters", correctAnswer: 9, conceptTag: "900 ÷ 100 = 9" },
      { id: 8, expression: "4200 cm = ? Meters", correctAnswer: 42, conceptTag: "4200 ÷ 100 = 42" },
      { id: 9, expression: "1250 cm = ? Meters", correctAnswer: 12.5, conceptTag: "1250 ÷ 100 = 12.5" },
      { id: 10, expression: "8000 cm = ? Meters", correctAnswer: 80, conceptTag: "8000 ÷ 100 = 80" },
    ]
  },
  {
    id: "jvm1-convert-m-cm",
    title: "JVM-1: Convert Meter into Centimeter",
    category: "vedic",
    level: "JVM-1",
    topic: "Convert Meter into Centimeter",
    description: "Convert meters to centimeters (Multiply by 100).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "6 m = ? Centimeters", correctAnswer: 600, conceptTag: "6 × 100 = 600" },
      { id: 2, expression: "14 m = ? Centimeters", correctAnswer: 1400, conceptTag: "14 × 100 = 1400" },
      { id: 3, expression: "8.5 m = ? Centimeters", correctAnswer: 850, conceptTag: "8.5 × 100 = 850" },
      { id: 4, expression: "25 m = ? Centimeters", correctAnswer: 2500, conceptTag: "25 × 100 = 2500" },
      { id: 5, expression: "3.2 m = ? Centimeters", correctAnswer: 320, conceptTag: "3.2 × 100 = 320" },
      { id: 6, expression: "40 m = ? Centimeters", correctAnswer: 4000, conceptTag: "40 × 100 = 4000" },
      { id: 7, expression: "12 m = ? Centimeters", correctAnswer: 1200, conceptTag: "12 × 100 = 1200" },
      { id: 8, expression: "7.8 m = ? Centimeters", correctAnswer: 780, conceptTag: "7.8 × 100 = 780" },
      { id: 9, expression: "50 m = ? Centimeters", correctAnswer: 5000, conceptTag: "50 × 100 = 5000" },
      { id: 10, expression: "100 m = ? Centimeters", correctAnswer: 10000, conceptTag: "100 × 100 = 10000" },
    ]
  },
  {
    id: "jvm1-convert-g-kg",
    title: "JVM-1: Convert Gram into Kilogram",
    category: "vedic",
    level: "JVM-1",
    topic: "Convert Gram into Kilogram",
    description: "Convert grams to kg (Divide by 1000).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "4000 g = ? Kilograms", correctAnswer: 4, conceptTag: "4000 ÷ 1000 = 4" },
      { id: 2, expression: "2500 g = ? Kilograms", correctAnswer: 2.5, conceptTag: "2500 ÷ 1000 = 2.5" },
      { id: 3, expression: "7000 g = ? Kilograms", correctAnswer: 7, conceptTag: "7000 ÷ 1000 = 7" },
      { id: 4, expression: "1500 g = ? Kilograms", correctAnswer: 1.5, conceptTag: "1500 ÷ 1000 = 1.5" },
      { id: 5, expression: "9000 g = ? Kilograms", correctAnswer: 9, conceptTag: "9000 ÷ 1000 = 9" },
      { id: 6, expression: "3500 g = ? Kilograms", correctAnswer: 3.5, conceptTag: "3500 ÷ 1000 = 3.5" },
      { id: 7, expression: "12000 g = ? Kilograms", correctAnswer: 12, conceptTag: "12000 ÷ 1000 = 12" },
      { id: 8, expression: "8500 g = ? Kilograms", correctAnswer: 8.5, conceptTag: "8500 ÷ 1000 = 8.5" },
      { id: 9, expression: "5000 g = ? Kilograms", correctAnswer: 5, conceptTag: "5000 ÷ 1000 = 5" },
      { id: 10, expression: "10000 g = ? Kilograms", correctAnswer: 10, conceptTag: "10000 ÷ 1000 = 10" },
    ]
  },
  {
    id: "jvm1-convert-kg-g",
    title: "JVM-1: Convert Kilogram into Gram",
    category: "vedic",
    level: "JVM-1",
    topic: "Convert Kilogram into Gram",
    description: "Convert kg to grams (Multiply by 1000).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "5 kg = ? Grams", correctAnswer: 5000, conceptTag: "5 × 1000 = 5000" },
      { id: 2, expression: "3.5 kg = ? Grams", correctAnswer: 3500, conceptTag: "3.5 × 1000 = 3500" },
      { id: 3, expression: "12 kg = ? Grams", correctAnswer: 12000, conceptTag: "12 × 1000 = 12000" },
      { id: 4, expression: "8 kg = ? Grams", correctAnswer: 8000, conceptTag: "8 × 1000 = 8000" },
      { id: 5, expression: "2.25 kg = ? Grams", correctAnswer: 2250, conceptTag: "2.25 × 1000 = 2250" },
      { id: 6, expression: "15 kg = ? Grams", correctAnswer: 15000, conceptTag: "15 × 1000 = 15000" },
      { id: 7, expression: "6.5 kg = ? Grams", correctAnswer: 6500, conceptTag: "6.5 × 1000 = 6500" },
      { id: 8, expression: "20 kg = ? Grams", correctAnswer: 20000, conceptTag: "20 × 1000 = 20000" },
      { id: 9, expression: "4.8 kg = ? Grams", correctAnswer: 4800, conceptTag: "4.8 × 1000 = 4800" },
      { id: 10, expression: "50 kg = ? Grams", correctAnswer: 50000, conceptTag: "50 × 1000 = 50000" },
    ]
  },
  {
    id: "jvm1-convert-ml-l",
    title: "JVM-1: Convert Millilitre into Litre",
    category: "vedic",
    level: "JVM-1",
    topic: "Convert Millilitre into Litre",
    description: "Convert ml to litres (Divide by 1000).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "3000 ml = ? Litres", correctAnswer: 3, conceptTag: "3000 ÷ 1000 = 3" },
      { id: 2, expression: "1500 ml = ? Litres", correctAnswer: 1.5, conceptTag: "1500 ÷ 1000 = 1.5" },
      { id: 3, expression: "6000 ml = ? Litres", correctAnswer: 6, conceptTag: "6000 ÷ 1000 = 6" },
      { id: 4, expression: "4500 ml = ? Litres", correctAnswer: 4.5, conceptTag: "4500 ÷ 1000 = 4.5" },
      { id: 5, expression: "8000 ml = ? Litres", correctAnswer: 8, conceptTag: "8000 ÷ 1000 = 8" },
      { id: 6, expression: "2500 ml = ? Litres", correctAnswer: 2.5, conceptTag: "2500 ÷ 1000 = 2.5" },
      { id: 7, expression: "10000 ml = ? Litres", correctAnswer: 10, conceptTag: "10000 ÷ 1000 = 10" },
      { id: 8, expression: "7500 ml = ? Litres", correctAnswer: 7.5, conceptTag: "7500 ÷ 1000 = 7.5" },
      { id: 9, expression: "5000 ml = ? Litres", correctAnswer: 5, conceptTag: "5000 ÷ 1000 = 5" },
      { id: 10, expression: "12000 ml = ? Litres", correctAnswer: 12, conceptTag: "12000 ÷ 1000 = 12" },
    ]
  },
  {
    id: "jvm1-convert-l-ml",
    title: "JVM-1: Convert Litre into Millilitre",
    category: "vedic",
    level: "JVM-1",
    topic: "Convert Litre into Millilitre",
    description: "Convert litres to ml (Multiply by 1000).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "4 l = ? Millilitres", correctAnswer: 4000, conceptTag: "4 × 1000 = 4000" },
      { id: 2, expression: "2.5 l = ? Millilitres", correctAnswer: 2500, conceptTag: "2.5 × 1000 = 2500" },
      { id: 3, expression: "7 l = ? Millilitres", correctAnswer: 7000, conceptTag: "7 × 1000 = 7000" },
      { id: 4, expression: "9.5 l = ? Millilitres", correctAnswer: 9500, conceptTag: "9.5 × 1000 = 9500" },
      { id: 5, expression: "15 l = ? Millilitres", correctAnswer: 15000, conceptTag: "15 × 1000 = 15000" },
      { id: 6, expression: "3.25 l = ? Millilitres", correctAnswer: 3250, conceptTag: "3.25 × 1000 = 3250" },
      { id: 7, expression: "20 l = ? Millilitres", correctAnswer: 20000, conceptTag: "20 × 1000 = 20000" },
      { id: 8, expression: "6.8 l = ? Millilitres", correctAnswer: 6800, conceptTag: "6.8 × 1000 = 6800" },
      { id: 9, expression: "12 l = ? Millilitres", correctAnswer: 12000, conceptTag: "12 × 1000 = 12000" },
      { id: 10, expression: "50 l = ? Millilitres", correctAnswer: 50000, conceptTag: "50 × 1000 = 50000" },
    ]
  },
  {
    id: "jvm1-convert-m-km",
    title: "JVM-1: Convert Meter into Kilometer",
    category: "vedic",
    level: "JVM-1",
    topic: "Convert Meter into Kilometer",
    description: "Convert meters to km (Divide by 1000).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "5000 m = ? Kilometers", correctAnswer: 5, conceptTag: "5000 ÷ 1000 = 5" },
      { id: 2, expression: "2500 m = ? Kilometers", correctAnswer: 2.5, conceptTag: "2500 ÷ 1000 = 2.5" },
      { id: 3, expression: "8000 m = ? Kilometers", correctAnswer: 8, conceptTag: "8000 ÷ 1000 = 8" },
      { id: 4, expression: "12000 m = ? Kilometers", correctAnswer: 12, conceptTag: "12000 ÷ 1000 = 12" },
      { id: 5, expression: "4500 m = ? Kilometers", correctAnswer: 4.5, conceptTag: "4500 ÷ 1000 = 4.5" },
      { id: 6, expression: "15000 m = ? Kilometers", correctAnswer: 15, conceptTag: "15000 ÷ 1000 = 15" },
      { id: 7, expression: "7500 m = ? Kilometers", correctAnswer: 7.5, conceptTag: "7500 ÷ 1000 = 7.5" },
      { id: 8, expression: "20000 m = ? Kilometers", correctAnswer: 20, conceptTag: "20000 ÷ 1000 = 20" },
      { id: 9, expression: "3500 m = ? Kilometers", correctAnswer: 3.5, conceptTag: "3500 ÷ 1000 = 3.5" },
      { id: 10, expression: "9000 m = ? Kilometers", correctAnswer: 9, conceptTag: "9000 ÷ 1000 = 9" },
    ]
  },
  {
    id: "jvm1-convert-km-m",
    title: "JVM-1: Convert Kilometer into Meter",
    category: "vedic",
    level: "JVM-1",
    topic: "Convert Kilometer into Meter",
    description: "Convert km to meters (Multiply by 1000).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "7 km = ? Meters", correctAnswer: 7000, conceptTag: "7 × 1000 = 7000" },
      { id: 2, expression: "4.5 km = ? Meters", correctAnswer: 4500, conceptTag: "4.5 × 1000 = 4500" },
      { id: 3, expression: "15 km = ? Meters", correctAnswer: 15000, conceptTag: "15 × 1000 = 15000" },
      { id: 4, expression: "9.2 km = ? Meters", correctAnswer: 9200, conceptTag: "9.2 × 1000 = 9200" },
      { id: 5, expression: "25 km = ? Meters", correctAnswer: 25000, conceptTag: "25 × 1000 = 25000" },
      { id: 6, expression: "3.75 km = ? Meters", correctAnswer: 3750, conceptTag: "3.75 × 1000 = 3750" },
      { id: 7, expression: "11 km = ? Meters", correctAnswer: 11000, conceptTag: "11 × 1000 = 11000" },
      { id: 8, expression: "6.5 km = ? Meters", correctAnswer: 6500, conceptTag: "6.5 × 1000 = 6500" },
      { id: 9, expression: "40 km = ? Meters", correctAnswer: 40000, conceptTag: "40 × 1000 = 40000" },
      { id: 10, expression: "50 km = ? Meters", correctAnswer: 50000, conceptTag: "50 × 1000 = 50000" },
    ]
  },
  {
    id: "jvm1-convert-l-kl",
    title: "JVM-1: Convert Litre into Kilolitre",
    category: "vedic",
    level: "JVM-1",
    topic: "Convert Litre into Kilolitre",
    description: "Convert litres to kilolitres (Divide by 1000).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "6000 l = ? Kilolitres", correctAnswer: 6, conceptTag: "6000 ÷ 1000 = 6" },
      { id: 2, expression: "3500 l = ? Kilolitres", correctAnswer: 3.5, conceptTag: "3500 ÷ 1000 = 3.5" },
      { id: 3, expression: "9000 l = ? Kilolitres", correctAnswer: 9, conceptTag: "9000 ÷ 1000 = 9" },
      { id: 4, expression: "12000 l = ? Kilolitres", correctAnswer: 12, conceptTag: "12000 ÷ 1000 = 12" },
      { id: 5, expression: "4500 l = ? Kilolitres", correctAnswer: 4.5, conceptTag: "4500 ÷ 1000 = 4.5" },
      { id: 6, expression: "18000 l = ? Kilolitres", correctAnswer: 18, conceptTag: "18000 ÷ 1000 = 18" },
      { id: 7, expression: "7500 l = ? Kilolitres", correctAnswer: 7.5, conceptTag: "7500 ÷ 1000 = 7.5" },
      { id: 8, expression: "25000 l = ? Kilolitres", correctAnswer: 25, conceptTag: "25000 ÷ 1000 = 25" },
      { id: 9, expression: "8000 l = ? Kilolitres", correctAnswer: 8, conceptTag: "8000 ÷ 1000 = 8" },
      { id: 10, expression: "10000 l = ? Kilolitres", correctAnswer: 10, conceptTag: "10000 ÷ 1000 = 10" },
    ]
  },
  {
    id: "jvm1-convert-kl-l",
    title: "JVM-1: Convert Kilolitre into Litre",
    category: "vedic",
    level: "JVM-1",
    topic: "Convert Kilolitre into Litre",
    description: "Convert kilolitres to litres (Multiply by 1000).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "8 kl = ? Litres", correctAnswer: 8000, conceptTag: "8 × 1000 = 8000" },
      { id: 2, expression: "5.5 kl = ? Litres", correctAnswer: 5500, conceptTag: "5.5 × 1000 = 5500" },
      { id: 3, expression: "14 kl = ? Litres", correctAnswer: 14000, conceptTag: "14 × 1000 = 14000" },
      { id: 4, expression: "9.2 kl = ? Litres", correctAnswer: 9200, conceptTag: "9.2 × 1000 = 9200" },
      { id: 5, expression: "20 kl = ? Litres", correctAnswer: 20000, conceptTag: "20 × 1000 = 20000" },
      { id: 6, expression: "4.75 kl = ? Litres", correctAnswer: 4750, conceptTag: "4.75 × 1000 = 4750" },
      { id: 7, expression: "12 kl = ? Litres", correctAnswer: 12000, conceptTag: "12 × 1000 = 12000" },
      { id: 8, expression: "6.5 kl = ? Litres", correctAnswer: 6500, conceptTag: "6.5 × 1000 = 6500" },
      { id: 9, expression: "30 kl = ? Litres", correctAnswer: 30000, conceptTag: "30 × 1000 = 30000" },
      { id: 10, expression: "50 kl = ? Litres", correctAnswer: 50000, conceptTag: "50 × 1000 = 50000" },
    ]
  },
  // Advanced Level Sets
  {
    id: "vedic-level1-nikhilam",
    title: "NIKHILAM SUTRA (BASE 10 & 100 MULTIPLICATION)",
    category: "vedic",
    level: "Level 1",
    topic: "NIKHILAM NAVATASHCARAMAM DASHATAH",
    description: "Rapid mental multiplication for numbers close to base 10, 100, and 1000.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "97 × 95", correctAnswer: 9215, conceptTag: "Base 100 (-3, -5)" },
      { id: 2, expression: "98 × 94", correctAnswer: 9212, conceptTag: "Base 100 (-2, -6)" },
      { id: 3, expression: "96 × 93", correctAnswer: 8928, conceptTag: "Base 100 (-4, -7)" },
      { id: 4, expression: "99 × 91", correctAnswer: 9009, conceptTag: "Base 100 (-1, -9)" },
      { id: 5, expression: "103 × 105", correctAnswer: 10815, conceptTag: "Base 100 Surplus (+3, +5)" },
    ]
  },
  {
    id: "vedic-level1-ekadhikena",
    title: "EKADHIKENA PURVENA (SQUARING ENDING IN 5)",
    category: "vedic",
    level: "Level 1",
    topic: "EKADHIKENA PURVENA",
    description: "Instant 2-second trick to square any number ending in 5.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "15²", correctAnswer: 225, conceptTag: "1 × (1+1) = 2, attach 25" },
      { id: 2, expression: "25²", correctAnswer: 625, conceptTag: "2 × 3 = 6, attach 25" },
      { id: 3, expression: "35²", correctAnswer: 1225, conceptTag: "3 × 4 = 12, attach 25" },
      { id: 4, expression: "45²", correctAnswer: 2025, conceptTag: "4 × 5 = 20, attach 25" },
      { id: 5, expression: "55²", correctAnswer: 3025, conceptTag: "5 × 6 = 30, attach 25" },
    ]
  },
  {
    id: "vedic-level2-urdhva",
    title: "URDHVA TIRYAGBHYAM (CRISS-CROSS MULTIPLICATION)",
    category: "vedic",
    level: "Level 2",
    topic: "URDHVA TIRYAGBHYAM",
    description: "General multiplication sutra for multiplying any 2-digit by 2-digit numbers mentally.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "12 × 13", correctAnswer: 156, conceptTag: "Criss-Cross 2x2" },
      { id: 2, expression: "21 × 31", correctAnswer: 651, conceptTag: "Criss-Cross 2x2" },
      { id: 3, expression: "14 × 12", correctAnswer: 168, conceptTag: "Criss-Cross 2x2" },
      { id: 4, expression: "23 × 12", correctAnswer: 276, conceptTag: "Criss-Cross 2x2" },
      { id: 5, expression: "32 × 21", correctAnswer: 672, conceptTag: "Criss-Cross 2x2" },
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
 * Simple Mulberry32 Seeded Pseudo-Random Number Generator.
 * Guarantees that for a given attempt seed, question generation is 100% deterministic and fixed during the attempt,
 * but changes completely on the next attempt!
 */
function createPRNG(seedStr: string) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = (Math.imul(31, h) + seedStr.charCodeAt(i)) | 0;
  }
  return function() {
    let t = (h += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Dynamic math question generator for Abacus JR-2 topic sets.
 * Generates deterministic numbers for a given attempt seed.
 */
export function generateDynamicAbacusQuestion(setId: string, qId: number, seed: string = "attempt_default"): Question | null {
  if (
    !setId.startsWith("abacus-jr1-") &&
    !setId.startsWith("abacus-jr2-") &&
    !setId.startsWith("abacus-jr3-") &&
    !setId.startsWith("abacus-sr1-") &&
    !setId.startsWith("abacus-sr2-")
  ) return null;

  const rng = createPRNG(`${seed}_${setId}_${qId}`);

  let rowCount = 4;
  let digitsMode: "single" | "double" | "triple" = "single";
  let formulaType: "direct" | "plus5" | "minus5" | "plus10" | "minus10" | "plusMixed" | "minusMixed" | "allComp" = "direct";

  // JR-1 Topic
  if (setId === "abacus-jr1-direct-3-4-5row") {
    const rVal = rng();
    rowCount = rVal < 0.33 ? 3 : rVal < 0.66 ? 4 : 5;
    digitsMode = "single";
    formulaType = "direct";
  } else if (setId === "abacus-jr2-direct-4row") {
    rowCount = 4;
    digitsMode = "single";
    formulaType = "direct";
  } else if (setId === "abacus-jr2-plus5-comp") {
    rowCount = rng() > 0.5 ? 5 : 4;
    digitsMode = "single";
    formulaType = "plus5";
  } else if (setId === "abacus-jr2-minus5-comp") {
    rowCount = rng() > 0.5 ? 5 : 4;
    digitsMode = "single";
    formulaType = "minus5";
  } else if (setId === "abacus-jr2-plus10-comp") {
    rowCount = 4;
    digitsMode = "single";
    formulaType = "plus10";
  } else if (setId === "abacus-jr2-minus10-comp") {
    rowCount = rng() > 0.5 ? 5 : 4;
    digitsMode = "single";
    formulaType = "minus10";
  } else if (setId === "abacus-jr2-plus-mixed") {
    rowCount = rng() > 0.5 ? 5 : 4;
    digitsMode = "single";
    formulaType = "plusMixed";
  } else if (setId === "abacus-jr2-minus-mixed") {
    rowCount = rng() > 0.5 ? 5 : 4;
    digitsMode = "single";
    formulaType = "minusMixed";
  }
  // JR-3 Topics
  else if (setId === "abacus-jr3-single-direct-6-7row") {
    rowCount = rng() > 0.5 ? 7 : 6;
    digitsMode = "single";
    formulaType = "direct";
  } else if (setId === "abacus-jr3-double-direct-4row") {
    rowCount = 4;
    digitsMode = "double";
    formulaType = "direct";
  } else if (setId === "abacus-jr3-double-allcomp-4-5row") {
    rowCount = rng() > 0.5 ? 5 : 4;
    digitsMode = "double";
    formulaType = "allComp";
  } else if (setId === "abacus-jr3-double-allcomp-6-7row") {
    rowCount = rng() > 0.5 ? 7 : 6;
    digitsMode = "double";
    formulaType = "allComp";
  } else if (setId === "abacus-jr3-triple-allcomp-4-5row") {
    rowCount = rng() > 0.5 ? 5 : 4;
    digitsMode = "triple";
    formulaType = "allComp";
  }
  // SR-1 Topics
  else if (setId === "abacus-sr1-single-direct-5-6row") {
    rowCount = rng() > 0.5 ? 6 : 5;
    digitsMode = "single";
    formulaType = "direct";
  } else if (setId === "abacus-sr1-single-plus5-5-6row") {
    rowCount = rng() > 0.5 ? 6 : 5;
    digitsMode = "single";
    formulaType = "plus5";
  } else if (setId === "abacus-sr1-single-minus5-5-6row") {
    rowCount = rng() > 0.5 ? 6 : 5;
    digitsMode = "single";
    formulaType = "minus5";
  } else if (setId === "abacus-sr1-single-plus10-5-6row") {
    rowCount = rng() > 0.5 ? 6 : 5;
    digitsMode = "single";
    formulaType = "plus10";
  } else if (setId === "abacus-sr1-single-minus10-5-6row") {
    rowCount = rng() > 0.5 ? 6 : 5;
    digitsMode = "single";
    formulaType = "minus10";
  } else if (setId === "abacus-sr1-single-plus-mixed-5-6row") {
    rowCount = rng() > 0.5 ? 6 : 5;
    digitsMode = "single";
    formulaType = "plusMixed";
  } else if (setId === "abacus-sr1-single-minus-mixed-5-6row") {
    rowCount = rng() > 0.5 ? 6 : 5;
    digitsMode = "single";
    formulaType = "minusMixed";
  }
  // SR-2 Topics
  else if (setId === "abacus-sr2-double-direct") {
    rowCount = 5;
    digitsMode = "double";
    formulaType = "direct";
  } else if (setId === "abacus-sr2-double-allcomp") {
    rowCount = 5;
    digitsMode = "double";
    formulaType = "allComp";
  } else if (setId === "abacus-sr2-single-allcomp") {
    rowCount = 7;
    digitsMode = "single";
    formulaType = "allComp";
  } else if (setId === "abacus-sr2-triple-allcomp") {
    rowCount = 5;
    digitsMode = "triple";
    formulaType = "allComp";
  }

  // Attempt up to 30 times to generate a valid sequence
  for (let attempt = 0; attempt < 30; attempt++) {
    const numbers: number[] = [];
    let minStart = 1;
    let maxStart = 8;
    if (digitsMode === "double") {
      minStart = 11;
      maxStart = 89;
    } else if (digitsMode === "triple") {
      minStart = 111;
      maxStart = 888;
    }

    let currentTotal = Math.floor(rng() * (maxStart - minStart + 1)) + minStart;
    numbers.push(currentTotal);

    for (let r = 1; r < rowCount; r++) {
      let candidate: number | null = null;
      let minVal = -9;
      let maxVal = 9;
      if (digitsMode === "double") {
        minVal = -89;
        maxVal = 89;
      } else if (digitsMode === "triple") {
        minVal = -888;
        maxVal = 888;
      }

      for (let subAttempt = 0; subAttempt < 25; subAttempt++) {
        let n = Math.floor(rng() * (maxVal - minVal + 1)) + minVal;
        if (n === 0) continue;

        if (digitsMode === "double" && Math.abs(n) < 10) continue;
        if (digitsMode === "triple" && Math.abs(n) < 100) continue;

        const nextTotal = currentTotal + n;
        if (nextTotal >= 0) {
          candidate = n;
          break;
        }
      }

      if (candidate === null) break;
      numbers.push(candidate);
      currentTotal += candidate;
    }

    if (numbers.length === rowCount && currentTotal >= 0) {
      return {
        id: qId,
        numbers,
        correctAnswer: currentTotal,
        conceptTag: `Abacus JR ${digitsMode.toUpperCase()}`
      };
    }
  }

  // Fallback safe sequence if candidate loop exhausted
  return {
    id: qId,
    numbers: digitsMode === "triple" ? [452, 235, -123, 115] : digitsMode === "double" ? [42, 35, -21, 15] : [4, 5, -3, 2],
    correctAnswer: digitsMode === "triple" ? 679 : digitsMode === "double" ? 71 : 8,
    conceptTag: "Abacus Practice"
  };
}

/**
 * Generator helper to expand or trim question sets for speed modes & selected question counts (10, 20, 50, 100, 200)
 */
export function getCustomizedSet(
  setId: string,
  mode: PracticeMode,
  qCountChoice: number = 20,
  seed: string = "attempt_default"
): QuestionSet {
  const base = getQuestionSetById(setId) || ABACUS_QUESTION_SETS[0];

  let targetCount = qCountChoice;
  let timeLimitSeconds = 240; // 4 mins default for 20 Qs

  if (qCountChoice === 10) {
    timeLimitSeconds = 120;
  } else if (qCountChoice === 20) {
    timeLimitSeconds = 240;
  } else if (qCountChoice === 50) {
    timeLimitSeconds = 480;
  }

  // Handle explicit speed sprint modes
  if (mode === "speed-100-5m") {
    targetCount = 100;
    timeLimitSeconds = 300;
  } else if (mode === "speed-100-10m") {
    targetCount = 100;
    timeLimitSeconds = 600;
  } else if (mode === "speed-200-20m") {
    targetCount = 200;
    timeLimitSeconds = 1200;
  }

  // Synthesize questions deterministically for the given attempt seed
  const expandedQuestions: Question[] = [];
  for (let i = 0; i < targetCount; i++) {
    const dynamicQ = generateDynamicAbacusQuestion(setId, i + 1, seed);
    if (dynamicQ) {
      expandedQuestions.push(dynamicQ);
    } else {
      const baseQ = base.questions[i % base.questions.length];
      expandedQuestions.push({
        ...baseQ,
        id: i + 1,
      });
    }
  }

  return {
    ...base,
    title: `${targetCount} Questions - ${base.title}`,
    questionCount: targetCount,
    timeLimitSeconds,
    questions: expandedQuestions,
  };
}
