/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionSet, Question, PracticeMode } from "../types";

export const ABACUS_QUESTION_SETS: QuestionSet[] = [
  // JR-0 Curriculum Sets (Abacus Bead Visual Drills for Beginners)
  {
    id: "abacus-jr0-bead-identification",
    title: "IDENTIFY NUMBER FROM BEADS (1, 2, 3 DIGITS)",
    category: "abacus",
    level: "JR-0",
    topic: "1. Identify Number from Beads (1, 2, 3 Digits)",
    description: "Inspect the rendered Soroban abacus beads across Units, Tens & Hundreds rods and type the correct number.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, correctAnswer: 7, conceptTag: "Bead Identification (1 Digit)" },
      { id: 2, correctAnswer: 34, conceptTag: "Bead Identification (2 Digits)" },
      { id: 3, correctAnswer: 528, conceptTag: "Bead Identification (3 Digits)" },
    ]
  },
  {
    id: "abacus-jr0-bead-representation",
    title: "REPRESENT NUMBER ON ABACUS TOOL (1, 2, 3 DIGITS)",
    category: "abacus",
    level: "JR-0",
    topic: "2. Represent Number on Abacus Tool (1, 2, 3 Digits)",
    description: "Given a target 1, 2, or 3-digit number, click the upper and lower beads on the interactive Soroban tool to match.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, correctAnswer: 4, conceptTag: "Bead Representation (1 Digit)" },
      { id: 2, correctAnswer: 37, conceptTag: "Bead Representation (2 Digits)" },
      { id: 3, correctAnswer: 582, conceptTag: "Bead Representation (3 Digits)" },
    ]
  },
  {
    id: "abacus-jr0-overall",
    title: "JR-0-Overall (Comprehensive Level Master Quiz)",
    category: "abacus",
    level: "JR-0",
    topic: "3. JR-0-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all JR-0 topics: Bead Identification and Bead Representation across 1, 2, and 3 Digits.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, correctAnswer: 7, conceptTag: "JR-0 Overall (Bead Identification)" },
      { id: 2, correctAnswer: 4, conceptTag: "JR-0 Overall (Bead Representation)" },
    ]
  },

  // JR-1 Curriculum Sets (Direct Single Digit Addition & Subtraction without Complements)
  {
    id: "abacus-jr1-direct-3row",
    title: "ADD & SUB SINGLE DIGIT DIRECT (3 ROWS)",
    category: "abacus",
    level: "JR-1",
    topic: "1. Add & Sub Single Digit Direct (3 Rows)",
    description: "Practice 3 rows single-digit direct addition & subtraction without complements. Performed on One's Place Rod (Units Place).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [2, 5, -1], correctAnswer: 6, conceptTag: "One's Place Rod (Direct Single Digit)" },
      { id: 2, numbers: [4, 5, -3], correctAnswer: 6, conceptTag: "One's Place Rod (Direct Single Digit)" },
      { id: 3, numbers: [7, -2, 1], correctAnswer: 6, conceptTag: "One's Place Rod (Direct Single Digit)" },
    ]
  },
  {
    id: "abacus-jr1-direct-4row",
    title: "ADD & SUB SINGLE DIGIT DIRECT (4 ROWS)",
    category: "abacus",
    level: "JR-1",
    topic: "2. Add & Sub Single Digit Direct (4 Rows)",
    description: "Practice 4 rows single-digit direct addition & subtraction without complements. Performed on One's Place Rod (Units Place).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [4, 5, -3, 2], correctAnswer: 8, conceptTag: "One's Place Rod (Direct Single Digit)" },
      { id: 2, numbers: [3, 5, -2, 1], correctAnswer: 7, conceptTag: "One's Place Rod (Direct Single Digit)" },
      { id: 3, numbers: [8, -3, 2, -5], correctAnswer: 2, conceptTag: "One's Place Rod (Direct Single Digit)" },
    ]
  },
  {
    id: "abacus-jr1-direct-5row",
    title: "ADD & SUB SINGLE DIGIT DIRECT (5 ROWS)",
    category: "abacus",
    level: "JR-1",
    topic: "3. Add & Sub Single Digit Direct (5 Rows)",
    description: "Practice 5 rows single-digit direct addition & subtraction without complements. Performed on One's Place Rod (Units Place).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [1, 2, 5, -3, 4], correctAnswer: 9, conceptTag: "One's Place Rod (Direct Single Digit)" },
      { id: 2, numbers: [2, 5, -1, 3, -4], correctAnswer: 5, conceptTag: "One's Place Rod (Direct Single Digit)" },
      { id: 3, numbers: [4, 5, -2, 1, -3], correctAnswer: 5, conceptTag: "One's Place Rod (Direct Single Digit)" },
    ]
  },
  {
    id: "abacus-jr1-overall",
    title: "JR-1-Overall (Comprehensive Level Master Quiz)",
    category: "abacus",
    level: "JR-1",
    topic: "4. JR-1-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all JR-1 topics: Direct Single-Digit Addition & Subtraction across 3 Rows, 4 Rows, and 5 Rows.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [2, 5, -1], correctAnswer: 6, conceptTag: "JR-1 Overall (Direct 3 Rows)" },
      { id: 2, numbers: [4, 5, -3, 2], correctAnswer: 8, conceptTag: "JR-1 Overall (Direct 4 Rows)" },
      { id: 3, numbers: [1, 2, 5, -3, 4], correctAnswer: 9, conceptTag: "JR-1 Overall (Direct 5 Rows)" },
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
  {
    id: "abacus-jr2-overall",
    title: "JR-2-Overall (Comprehensive Level Master Quiz)",
    category: "abacus",
    level: "JR-2",
    topic: "8. JR-2-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all 7 JR-2 topics: Direct Math, +5/-5 Small Friends Complements, +10/-10 Big Friends Complements, and Mixed Combination Complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [7, -6, 1, 5], correctAnswer: 7, conceptTag: "Direct Addition/Subtraction" },
      { id: 2, numbers: [4, 4, -3, 2], correctAnswer: 7, conceptTag: "+5 Complement" },
      { id: 3, numbers: [6, -4, 2, 5], correctAnswer: 9, conceptTag: "-5 Complement" },
      { id: 4, numbers: [9, 9, -5, 2], correctAnswer: 15, conceptTag: "+10 Complement" },
      { id: 5, numbers: [15, -9, 4, 3], correctAnswer: 13, conceptTag: "-10 Complement" },
      { id: 6, numbers: [6, 6, -5, 2], correctAnswer: 9, conceptTag: "+ Mixed Complement" },
      { id: 7, numbers: [13, -6, 4, 5], correctAnswer: 16, conceptTag: "- Mixed Complement" },
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
  {
    id: "abacus-jr3-overall",
    title: "JR-3-Overall (Comprehensive Level Master Quiz)",
    category: "abacus",
    level: "JR-3",
    topic: "6. JR-3-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all JR-3 topics: Single-Digit Direct 6-7 Rows, Double-Digit Direct, Double-Digit Complements (4-7 Rows), and Triple-Digit Complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [2, 5, -1, 3, -4, 2], correctAnswer: 7, conceptTag: "JR-3 Overall" }
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
  {
    id: "abacus-sr1-overall",
    title: "SR-1-Overall (Comprehensive Level Master Quiz)",
    category: "abacus",
    level: "SR-1",
    topic: "8. SR-1-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all SR-1 topics: Single-Digit Direct, +5/-5 Complements, +10/-10 Complements, and Mixed Combination Complements (5-6 Rows).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [2, 5, -1, 3, 4], correctAnswer: 13, conceptTag: "SR-1 Overall" }
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
  },
  {
    id: "abacus-sr2-overall",
    title: "SR-2-Overall (Comprehensive Level Master Quiz)",
    category: "abacus",
    level: "SR-2",
    topic: "5. SR-2-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all SR-2 topics: Double-Digit Direct, Double-Digit All Complements, Single-Digit 7-Row Marathon, and Triple-Digit Complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [42, 35, -21, 15], correctAnswer: 71, conceptTag: "SR-2 Overall" }
    ]
  },

  // SR-3 Curriculum Sets
  {
    id: "abacus-sr3-single-direct-4-5row",
    title: "ADD./ SUB. S.D. 4-5 ROWS ± DIRECT",
    category: "abacus",
    level: "SR-3",
    topic: "1. Add./ Sub. S.D. 4-5 rows ± Direct; (without compliments)",
    description: "Practice Single Digit (S.D.) 4 to 5 rows direct addition & subtraction without complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [2, 5, -1, 3], correctAnswer: 9, conceptTag: "SR-3 Single Direct" },
      { id: 2, numbers: [4, 5, -3, 2, -1], correctAnswer: 7, conceptTag: "SR-3 Single Direct" },
    ]
  },
  {
    id: "abacus-sr3-double-direct-5row",
    title: "ADD./ SUB. 2 D. 5 ROWS ± DIRECT",
    category: "abacus",
    level: "SR-3",
    topic: "2. Add./ Sub. 2 D. 5rows; ± Direct; (without compliments)",
    description: "Practice 2-Digit (2 D.) 5 rows direct addition & subtraction without complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [42, 55, -31, 23, 10], correctAnswer: 99, conceptTag: "SR-3 Double Direct 5 Rows" },
      { id: 2, numbers: [34, 15, 50, -42, 21], correctAnswer: 78, conceptTag: "SR-3 Double Direct 5 Rows" },
    ]
  },
  {
    id: "abacus-sr3-triple-direct-4row",
    title: "ADD./ SUB. 3 D. 4 ROWS ± DIRECT",
    category: "abacus",
    level: "SR-3",
    topic: "3. Add./ Sub. 3 D. 4 rows; ± Direct; (without compliments)",
    description: "Practice 3-Digit (3 D.) 4 rows direct addition & subtraction without complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [421, 555, -321, 234], correctAnswer: 889, conceptTag: "SR-3 Triple Direct 4 Rows" },
      { id: 2, numbers: [342, 150, 505, -421], correctAnswer: 576, conceptTag: "SR-3 Triple Direct 4 Rows" },
    ]
  },
  {
    id: "abacus-sr3-single-plusminus5-6-7row",
    title: "ADD./ SUB. S.D. 6-7 ROWS ± 5 COMPLIMENT",
    category: "abacus",
    level: "SR-3",
    topic: "4. Add./ Sub. S.D. 6-7 rows ± 5 compliment",
    description: "Practice Single Digit 6 to 7 rows using ±5 Small Friends complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [4, 4, -3, 2, 4, -5, 3], correctAnswer: 9, conceptTag: "SR-3 Single ±5 Complement" },
      { id: 2, numbers: [3, 3, 2, -5, 4, 1, -2], correctAnswer: 6, conceptTag: "SR-3 Single ±5 Complement" },
    ]
  },
  {
    id: "abacus-sr3-double-plusminus5-3row",
    title: "ADD./ SUB. 2 D. 3 ROWS ± 5 COMPLIMENT",
    category: "abacus",
    level: "SR-3",
    topic: "5. Add./ Sub. 2 D. 3 rows ± 5 compliment",
    description: "Practice 2-Digit 3 rows using ±5 Small Friends complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [44, 44, -33], correctAnswer: 55, conceptTag: "SR-3 Double ±5 Complement" },
      { id: 2, numbers: [33, 33, 22], correctAnswer: 88, conceptTag: "SR-3 Double ±5 Complement" },
    ]
  },
  {
    id: "abacus-sr3-single-plusminus10-6-7row",
    title: "ADD./ SUB. S.D. 6-7 ROWS ± 10 COMPLIMENT",
    category: "abacus",
    level: "SR-3",
    topic: "6. Add./ Sub. S.D. 6-7 rows ± 10 compliment",
    description: "Practice Single Digit 6 to 7 rows using ±10 Big Friends complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [9, 9, -5, 8, -4, 7, -3], correctAnswer: 21, conceptTag: "SR-3 Single ±10 Complement" },
      { id: 2, numbers: [8, 8, 4, -9, 7, 6, -5], correctAnswer: 19, conceptTag: "SR-3 Single ±10 Complement" },
    ]
  },
  {
    id: "abacus-sr3-single-mixed-6-7row",
    title: "ADD./ SUB. S.D.6-7 ROWS ± MIXED COMPLIMENT",
    category: "abacus",
    level: "SR-3",
    topic: "7. Add./ Sub. S.D.6-7 rows ± Mixed compliment",
    description: "Practice Single Digit 6 to 7 rows using ± Mixed Combination complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [6, 6, -5, 7, -4, 8, -6], correctAnswer: 12, conceptTag: "SR-3 Single ± Mixed Complement" },
      { id: 2, numbers: [7, 7, -5, 8, -6, 9, -7], correctAnswer: 13, conceptTag: "SR-3 Single ± Mixed Complement" },
    ]
  },
  {
    id: "abacus-sr3-overall",
    title: "SR-3-Overall (Comprehensive Level Master Quiz)",
    category: "abacus",
    level: "SR-3",
    topic: "8. SR-3-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all SR-3 topics: Single/Double/Triple Direct, Single/Double ±5 Complements, Single ±10 Complements, and Mixed Drills.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [4, 5, -2, 3], correctAnswer: 10, conceptTag: "SR-3 Overall" }
    ]
  },

  // SR-4 Curriculum Sets (Multiplication Drills)
  {
    id: "abacus-sr4-mult-sd-sd",
    title: "MULTIPLICATION- S D x S D",
    category: "abacus",
    level: "SR-4",
    topic: "8. Multiplication- S D x S D",
    description: "Practice Single Digit × Single Digit multiplication on Abacus (e.g. 7 × 8).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "7 × 8", correctAnswer: 56, conceptTag: "SD × SD Multiplication" },
      { id: 2, expression: "6 × 9", correctAnswer: 54, conceptTag: "SD × SD Multiplication" },
      { id: 3, expression: "9 × 7", correctAnswer: 63, conceptTag: "SD × SD Multiplication" },
    ]
  },
  {
    id: "abacus-sr4-mult-sd-2d",
    title: "MULTIPLICATION- S D x 2 D",
    category: "abacus",
    level: "SR-4",
    topic: "9. Multiplication- S D x 2 D",
    description: "Practice Single Digit × 2 Digit multiplication on Abacus (e.g. 43 × 6).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "43 × 6", correctAnswer: 258, conceptTag: "SD × 2D Multiplication" },
      { id: 2, expression: "75 × 4", correctAnswer: 300, conceptTag: "SD × 2D Multiplication" },
      { id: 3, expression: "82 × 7", correctAnswer: 574, conceptTag: "SD × 2D Multiplication" },
    ]
  },
  {
    id: "abacus-sr4-overall",
    title: "SR-4-Overall (Comprehensive Level Master Quiz)",
    category: "abacus",
    level: "SR-4",
    topic: "3. SR-4-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all SR-4 topics: Single Digit × Single Digit (SD × SD) and Single Digit × Double Digit (SD × 2D) Multiplication.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "7 × 8", correctAnswer: 56, conceptTag: "SR-4 Overall" }
    ]
  },

  // SR-5 Curriculum Sets
  {
    id: "abacus-sr5-single-direct-4-5row",
    title: "ADD./SUB. S. D. 4-5 ROWS ± DIRECT",
    category: "abacus",
    level: "SR-5",
    topic: "1. Add./Sub. S. D. 4-5 rows  ± Direct (without compliments)",
    description: "Practice Single Digit (S.D.) 4 to 5 rows direct addition & subtraction without complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [2, 5, -1, 3], correctAnswer: 9, conceptTag: "SR-5 Single Direct" },
      { id: 2, numbers: [4, 5, -3, 2, -1], correctAnswer: 7, conceptTag: "SR-5 Single Direct" },
    ]
  },
  {
    id: "abacus-sr5-single-plusminus5-6-7row",
    title: "ADD./SUB. S.D. 6-7 ROWS ± 5 COMPLIMENT",
    category: "abacus",
    level: "SR-5",
    topic: "2. Add./Sub. S.D. 6-7 rows ± 5 compliment",
    description: "Practice Single Digit 6 to 7 rows using ±5 Small Friends complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [4, 4, -3, 2, 4, -5, 3], correctAnswer: 9, conceptTag: "SR-5 Single ±5 Complement" },
      { id: 2, numbers: [3, 3, 2, -5, 4, 1, -2], correctAnswer: 6, conceptTag: "SR-5 Single ±5 Complement" },
    ]
  },
  {
    id: "abacus-sr5-single-plusminus10-6-7row",
    title: "ADD./SUB. S.D. 6-7 ROWS ± 10 COMPLIMENT",
    category: "abacus",
    level: "SR-5",
    topic: "3. Add./Sub. S.D. 6-7 rows ± 10 compliment",
    description: "Practice Single Digit 6 to 7 rows using ±10 Big Friends complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [9, 9, -5, 8, -4, 7, -3], correctAnswer: 21, conceptTag: "SR-5 Single ±10 Complement" },
      { id: 2, numbers: [8, 8, 4, -9, 7, 6, -5], correctAnswer: 19, conceptTag: "SR-5 Single ±10 Complement" },
    ]
  },
  {
    id: "abacus-sr5-single-mixed-6-7row",
    title: "ADD./SUB. S.D. 6-7 ROWS ± MIXED COMPLIMENT",
    category: "abacus",
    level: "SR-5",
    topic: "4. Add./Sub. S.D. 6-7 rows ± Mixed compliment",
    description: "Practice Single Digit 6 to 7 rows using ± Mixed Combination complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [6, 6, -5, 7, -4, 8, -6], correctAnswer: 12, conceptTag: "SR-5 Single ± Mixed Complement" },
      { id: 2, numbers: [7, 7, -5, 8, -6, 9, -7], correctAnswer: 13, conceptTag: "SR-5 Single ± Mixed Complement" },
    ]
  },
  {
    id: "abacus-sr5-double-allcomp-5row",
    title: "ADD./SUB. 2 D. 5 ROWS (ALL COMPLIMENTS)",
    category: "abacus",
    level: "SR-5",
    topic: "5. Add./Sub. 2 D. 5 rows (All compliments)",
    description: "Practice 2-Digit (2 D.) 5 rows speed addition & subtraction using all complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [48, 37, -25, 49, 18], correctAnswer: 127, conceptTag: "SR-5 Double All Complements" },
      { id: 2, numbers: [59, 26, -44, 58, -20], correctAnswer: 79, conceptTag: "SR-5 Double All Complements" },
    ]
  },
  {
    id: "abacus-sr5-triple-allcomp-4row",
    title: "ADD./SUB. 3 D. 4 ROWS (ALL COMPLIMENTS)",
    category: "abacus",
    level: "SR-5",
    topic: "6. Add./Sub. 3 D. 4 rows (All compliments)",
    description: "Practice 3-Digit (3 D.) 4 rows speed addition & subtraction using all complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [485, 372, -240, 519], correctAnswer: 1136, conceptTag: "SR-5 Triple All Complements" },
      { id: 2, numbers: [624, 289, -350, 478], correctAnswer: 1041, conceptTag: "SR-5 Triple All Complements" },
    ]
  },
  {
    id: "abacus-sr5-quad-allcomp-4row",
    title: "ADD./SUB. 4 D. 4 ROWS (ALL COMPLIMENTS)",
    category: "abacus",
    level: "SR-5",
    topic: "7. Add./Sub. 4 D. 4 rows (All compliments)",
    description: "Practice 4-Digit (4 D., e.g. 1000-9999) 4 rows speed addition & subtraction using all complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [4852, 3721, -2405, 5194], correctAnswer: 11362, conceptTag: "SR-5 Quad All Complements" },
      { id: 2, numbers: [6248, 2891, -3504, 4783], correctAnswer: 10418, conceptTag: "SR-5 Quad All Complements" },
    ]
  },
  {
    id: "abacus-sr5-overall",
    title: "SR-5-Overall (Comprehensive Level Master Quiz)",
    category: "abacus",
    level: "SR-5",
    topic: "8. SR-5-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all SR-5 topics: Single-Digit Direct/Complements, Double-Digit All Complements, Triple-Digit All Complements, and 4-Digit Quad Math.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [452, 235, -123, 115], correctAnswer: 679, conceptTag: "SR-5 Overall" }
    ]
  },

  // SR-6 Curriculum Sets (Multiplication Drills)
  {
    id: "abacus-sr6-mult-sd-3d",
    title: "MULTIPLICATION  S. D. x 3 D.",
    category: "abacus",
    level: "SR-6",
    topic: "8. Multiplication  S. D. x 3 D.",
    description: "Practice Single Digit × 3 Digit multiplication on Abacus (e.g. 485 × 6).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "485 × 6", correctAnswer: 2910, conceptTag: "SD × 3D Multiplication" },
      { id: 2, expression: "729 × 4", correctAnswer: 2916, conceptTag: "SD × 3D Multiplication" },
      { id: 3, expression: "814 × 7", correctAnswer: 5698, conceptTag: "SD × 3D Multiplication" },
    ]
  },
  {
    id: "abacus-sr6-mult-2d-2d",
    title: "MULTIPLICATION  2 D. x 2 D.",
    category: "abacus",
    level: "SR-6",
    topic: "9. Multiplication  2 D. x 2 D.",
    description: "Practice 2 Digit × 2 Digit multiplication on Abacus (e.g. 43 × 57).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "43 × 57", correctAnswer: 2451, conceptTag: "2D × 2D Multiplication" },
      { id: 2, expression: "68 × 34", correctAnswer: 2312, conceptTag: "2D × 2D Multiplication" },
      { id: 3, expression: "85 × 72", correctAnswer: 6120, conceptTag: "2D × 2D Multiplication" },
    ]
  },
  {
    id: "abacus-sr6-overall",
    title: "SR-6-Overall (Comprehensive Level Master Quiz)",
    category: "abacus",
    level: "SR-6",
    topic: "3. SR-6-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all SR-6 topics: Single Digit × Triple Digit (SD × 3D) and Double Digit × Double Digit (2D × 2D) Multiplication.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "34 × 56", correctAnswer: 1904, conceptTag: "SR-6 Overall" }
    ]
  },

  // SR-7 Curriculum Sets
  {
    id: "abacus-sr7-single-direct-4-5row",
    title: "ADD./SUB. S. D. 4-5 ROWS ± DIRECT",
    category: "abacus",
    level: "SR-7",
    topic: "1. Add./Sub. S. D. 4-5 rows  ± Direct (without compliments)",
    description: "Practice Single Digit (S.D.) 4 to 5 rows direct addition & subtraction without complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [2, 5, -1, 3], correctAnswer: 9, conceptTag: "SR-7 Single Direct" },
      { id: 2, numbers: [4, 5, -3, 2, -1], correctAnswer: 7, conceptTag: "SR-7 Single Direct" },
    ]
  },
  {
    id: "abacus-sr7-single-plusminus5-6-7row",
    title: "ADD./SUB. S.D. 6-7 ROWS ± 5 COMPLIMENT",
    category: "abacus",
    level: "SR-7",
    topic: "2. Add./Sub. S.D. 6-7 rows ± 5 compliment",
    description: "Practice Single Digit 6 to 7 rows using ±5 Small Friends complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [4, 4, -3, 2, 4, -5, 3], correctAnswer: 9, conceptTag: "SR-7 Single ±5 Complement" },
      { id: 2, numbers: [3, 3, 2, -5, 4, 1, -2], correctAnswer: 6, conceptTag: "SR-7 Single ±5 Complement" },
    ]
  },
  {
    id: "abacus-sr7-single-plusminus10-6-7row",
    title: "ADD./SUB. S.D. 6-7 ROWS ± 10 COMPLIMENT",
    category: "abacus",
    level: "SR-7",
    topic: "3. Add./Sub. S.D. 6-7 rows ± 10 compliment",
    description: "Practice Single Digit 6 to 7 rows using ±10 Big Friends complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [9, 9, -5, 8, -4, 7, -3], correctAnswer: 21, conceptTag: "SR-7 Single ±10 Complement" },
      { id: 2, numbers: [8, 8, 4, -9, 7, 6, -5], correctAnswer: 19, conceptTag: "SR-7 Single ±10 Complement" },
    ]
  },
  {
    id: "abacus-sr7-single-mixed-6-7row",
    title: "ADD./SUB. S.D. 6-7 ROWS ± MIXED COMPLIMENT",
    category: "abacus",
    level: "SR-7",
    topic: "4. Add./Sub. S.D. 6-7 rows  ± Mixed compliment",
    description: "Practice Single Digit 6 to 7 rows using ± Mixed Combination complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [6, 6, -5, 7, -4, 8, -6], correctAnswer: 12, conceptTag: "SR-7 Single ± Mixed Complement" },
      { id: 2, numbers: [7, 7, -5, 8, -6, 9, -7], correctAnswer: 13, conceptTag: "SR-7 Single ± Mixed Complement" },
    ]
  },
  {
    id: "abacus-sr7-double-allcomp-5row",
    title: "ADD./SUB. 2D - 5 ROWS (ALL COMPLIMENTS)",
    category: "abacus",
    level: "SR-7",
    topic: "5. Add./Sub. 2D - 5 rows (All compliments)",
    description: "Practice 2 Digit (2D) 5 rows speed addition & subtraction using all complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [48, 37, -25, 49, 18], correctAnswer: 127, conceptTag: "SR-7 Double 5 Rows All Complements" },
      { id: 2, numbers: [59, 26, -44, 58, -20], correctAnswer: 79, conceptTag: "SR-7 Double 5 Rows All Complements" },
    ]
  },
  {
    id: "abacus-sr7-triple-allcomp-5row",
    title: "ADD./SUB. 3D - 5 ROWS (ALL COMPLIMENTS)",
    category: "abacus",
    level: "SR-7",
    topic: "6. Add./Sub. 3D - 5 rows (All compliments)",
    description: "Practice 3 Digit (3D) 5 rows speed addition & subtraction using all complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [485, 372, -240, 519, 120], correctAnswer: 1256, conceptTag: "SR-7 Triple 5 Rows All Complements" },
      { id: 2, numbers: [624, 289, -350, 478, -210], correctAnswer: 831, conceptTag: "SR-7 Triple 5 Rows All Complements" },
    ]
  },
  {
    id: "abacus-sr7-quad-allcomp-5row",
    title: "ADD./SUB. 4D - 5 ROWS (ALL COMPLIMENTS)",
    category: "abacus",
    level: "SR-7",
    topic: "7. Add./Sub. 4D - 5 rows (All compliments)",
    description: "Practice 4 Digit (4D, e.g. 1000-9999) 5 rows speed addition & subtraction using all complements.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [4852, 3721, -2405, 5194, 1205], correctAnswer: 12567, conceptTag: "SR-7 Quad 5 Rows All Complements" },
      { id: 2, numbers: [6248, 2891, -3504, 4783, -2100], correctAnswer: 8318, conceptTag: "SR-7 Quad 5 Rows All Complements" },
    ]
  },
  {
    id: "abacus-sr7-overall",
    title: "SR-7-Overall (Comprehensive Level Master Quiz)",
    category: "abacus",
    level: "SR-7",
    topic: "8. SR-7-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all SR-7 topics: Single-Digit Direct/Complements, Double-Digit 5-Row, Triple-Digit 5-Row, and Quad 4-Digit 5-Row Endurance Sums.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [1452, 2378, -1205, 3110, 4200], correctAnswer: 9935, conceptTag: "SR-7 Overall" }
    ]
  },

  // SR-8 Curriculum Sets (Division Master Drills)
  {
    id: "abacus-sr8-div-2d-1d",
    title: "DIVISION 2D ÷ 1D",
    category: "abacus",
    level: "SR-8",
    topic: "1. Division 2D ÷ 1D",
    description: "Practice 2 Digit ÷ 1 Digit exact division on Abacus (e.g. 84 ÷ 4 = 21).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "84 ÷ 4", correctAnswer: 21, conceptTag: "2D ÷ 1D Division" },
      { id: 2, expression: "96 ÷ 3", correctAnswer: 32, conceptTag: "2D ÷ 1D Division" },
      { id: 3, expression: "75 ÷ 5", correctAnswer: 15, conceptTag: "2D ÷ 1D Division" },
    ]
  },
  {
    id: "abacus-sr8-div-3d-1d",
    title: "DIVISION  3D ÷ 1D",
    category: "abacus",
    level: "SR-8",
    topic: "11. Division  3D ÷ 1D",
    description: "Practice 3 Digit ÷ 1 Digit exact division on Abacus (e.g. 468 ÷ 6 = 78).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "468 ÷ 6", correctAnswer: 78, conceptTag: "3D ÷ 1D Division" },
      { id: 2, expression: "924 ÷ 4", correctAnswer: 231, conceptTag: "3D ÷ 1D Division" },
      { id: 3, expression: "855 ÷ 9", correctAnswer: 95, conceptTag: "3D ÷ 1D Division" },
    ]
  },
  {
    id: "abacus-sr8-div-4d-1d",
    title: "DIVISION  4D ÷ 1D",
    category: "abacus",
    level: "SR-8",
    topic: "12. Division  4D ÷ 1D",
    description: "Practice 4 Digit ÷ 1 Digit exact division on Abacus (e.g. 3456 ÷ 4 = 864).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "3456 ÷ 4", correctAnswer: 864, conceptTag: "4D ÷ 1D Division" },
      { id: 2, expression: "7290 ÷ 9", correctAnswer: 810, conceptTag: "4D ÷ 1D Division" },
      { id: 3, expression: "5425 ÷ 5", correctAnswer: 1085, conceptTag: "4D ÷ 1D Division" },
    ]
  },
  {
    id: "abacus-sr8-overall",
    title: "SR-8-Overall (Comprehensive Level Master Quiz)",
    category: "abacus",
    level: "SR-8",
    topic: "6. SR-8-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all SR-8 topics: Soroban Division (2D÷1D, 3D÷1D, 4D÷1D) and Advanced Multiplications (SD×3D, 2D×2D).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "144 ÷ 12", correctAnswer: 12, conceptTag: "SR-8 Overall" }
    ]
  },

  // SR-9 Curriculum Set (Decimals Drill)
  {
    id: "abacus-sr9-decimal-3d-4d-3row",
    title: "ADD./SUB. 3D & 4 D. - 3 ROWS DECIMALS",
    category: "abacus",
    level: "SR-9",
    topic: "13.Add./Sub.  3D & 4 D. - 3 rows Decimals (All compliments)",
    description: "Practice 3D & 4D 3-row decimal addition and subtraction with all complements (e.g. 45.2 + 37.8 - 12.5).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [45.2, 37.8, -12.5], correctAnswer: 70.5, conceptTag: "SR-9 Decimal Math" },
      { id: 2, numbers: [128.4, 256.7, -94.2], correctAnswer: 290.9, conceptTag: "SR-9 Decimal Math" },
      { id: 3, numbers: [452.8, 381.5, -210.3], correctAnswer: 624, conceptTag: "SR-9 Decimal Math" },
    ]
  },
  {
    id: "abacus-sr9-overall",
    title: "SR-9-Overall (Comprehensive Level Master Quiz)",
    category: "abacus",
    level: "SR-9",
    topic: "2. SR-9-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all SR-9 topics: 3-Digit and 4-Digit 3-Row Decimal Addition & Subtraction (All Complements).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, numbers: [45.2, 37.8, -12.5], correctAnswer: 70.5, conceptTag: "SR-9 Overall" }
    ]
  },

  // SR-10 Curriculum Sets
  {
    id: "abacus-sr10-decimal-mult",
    title: "DECIMALS MULTIPLICATION",
    category: "abacus",
    level: "SR-10",
    topic: "14, Decimals Multiplication",
    description: "Practice multiplication with decimal numbers (e.g. 4.5 × 1.2 = 5.4).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "4.5 × 1.2", correctAnswer: 5.4, conceptTag: "Decimal Multiplication" },
      { id: 2, expression: "3.6 × 2.5", correctAnswer: 9, conceptTag: "Decimal Multiplication" },
      { id: 3, expression: "7.2 × 1.5", correctAnswer: 10.8, conceptTag: "Decimal Multiplication" },
    ]
  },
  {
    id: "abacus-sr10-decimal-div",
    title: "DECIMAL DIVISION",
    category: "abacus",
    level: "SR-10",
    topic: "15. Decimal Division",
    description: "Practice division resulting in or involving decimals (e.g. 7.5 ÷ 1.5 = 5).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "7.5 ÷ 1.5", correctAnswer: 5, conceptTag: "Decimal Division" },
      { id: 2, expression: "12.6 ÷ 0.3", correctAnswer: 42, conceptTag: "Decimal Division" },
      { id: 3, expression: "9.6 ÷ 1.2", correctAnswer: 8, conceptTag: "Decimal Division" },
    ]
  },
  {
    id: "abacus-sr10-hcf",
    title: "HCF (HIGHEST COMMON FACTOR)",
    category: "abacus",
    level: "SR-10",
    topic: "16. HCF",
    description: "Find the Highest Common Factor (HCF) of two numbers (e.g. HCF of 24 & 36 = 12).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "HCF of 24 & 36", correctAnswer: 12, conceptTag: "HCF Calculation" },
      { id: 2, expression: "HCF of 18 & 45", correctAnswer: 9, conceptTag: "HCF Calculation" },
      { id: 3, expression: "HCF of 32 & 48", correctAnswer: 16, conceptTag: "HCF Calculation" },
    ]
  },
  {
    id: "abacus-sr10-percentage",
    title: "PERCENTAGE",
    category: "abacus",
    level: "SR-10",
    topic: "17. Percentage",
    description: "Calculate percentages mentally on Abacus (e.g. 25% of 160 = 40).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "25% of 160", correctAnswer: 40, conceptTag: "Percentage Calculation" },
      { id: 2, expression: "15% of 200", correctAnswer: 30, conceptTag: "Percentage Calculation" },
      { id: 3, expression: "50% of 340", correctAnswer: 170, conceptTag: "Percentage Calculation" },
    ]
  },
  {
    id: "abacus-sr10-lcm",
    title: "LCM (LOWEST COMMON MULTIPLE)",
    category: "abacus",
    level: "SR-10",
    topic: "18. LCM",
    description: "Find the Lowest Common Multiple (LCM) of two numbers (e.g. LCM of 12 & 18 = 36).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "LCM of 12 & 18", correctAnswer: 36, conceptTag: "LCM Calculation" },
      { id: 2, expression: "LCM of 8 & 12", correctAnswer: 24, conceptTag: "LCM Calculation" },
      { id: 3, expression: "LCM of 15 & 20", correctAnswer: 60, conceptTag: "LCM Calculation" },
    ]
  },
  {
    id: "abacus-sr10-square-root",
    title: "SQUARE ROOT",
    category: "abacus",
    level: "SR-10",
    topic: "19. Square root",
    description: "Calculate square roots of perfect squares mentally on Abacus (e.g. √1225 = 35).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "√1225", correctAnswer: 35, conceptTag: "Square Root Calculation" },
      { id: 2, expression: "√784", correctAnswer: 28, conceptTag: "Square Root Calculation" },
      { id: 3, expression: "√2025", correctAnswer: 45, conceptTag: "Square Root Calculation" },
    ]
  },
  {
    id: "abacus-sr10-overall",
    title: "SR-10-Overall (Comprehensive Level Master Quiz)",
    category: "abacus",
    level: "SR-10",
    topic: "7. SR-10-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all SR-10 topics: Decimal Multiplication, Decimal Division, HCF, Percentage, LCM, and Square Root Calculations.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "√1225", correctAnswer: 35, conceptTag: "SR-10 Overall" }
    ]
  }
];

export const VEDIC_QUESTION_SETS: QuestionSet[] = [
  // ==========================================
  // SVM-6 LEVEL (Senior Vedic Math Level 6 - 40 Topics - Supreme Master Suite)
  // ==========================================
  {
    id: "svm6-mult-nines-equal",
    title: "SVM-6: Multiplication by number of 9's (Equal 9's)",
    category: "vedic",
    level: "SVM-6",
    topic: "Multiplication by number of 9's (Equal 9's)",
    description: "Ekanyunena Purvena sutra when multiplier has equal count of 9s as multiplicand digits.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "456 × 999", correctAnswer: 455544, conceptTag: "(456-1) | 999-455 = 455544", explanation: "455544" },
      { id: 2, expression: "782 × 999", correctAnswer: 781217, conceptTag: "(782-1) | 999-781 = 781217", explanation: "781217" },
      { id: 3, expression: "34 × 99", correctAnswer: 3366, conceptTag: "(34-1) | (99-33) = 3366", explanation: "3366" },
      { id: 4, expression: "87 × 99", correctAnswer: 8613, conceptTag: "(87-1) | (99-86) = 8613", explanation: "8613" },
      { id: 5, expression: "6234 × 9999", correctAnswer: 62333765, conceptTag: "(6234-1) | (9999-6233) = 62333765", explanation: "62333765" },
      { id: 6, expression: "512 × 999", correctAnswer: 511488, conceptTag: "(512-1) | 999-511 = 511488", explanation: "511488" },
      { id: 7, expression: "29 × 99", correctAnswer: 2871, conceptTag: "(29-1) | (99-28) = 2871", explanation: "2871" },
      { id: 8, expression: "64 × 99", correctAnswer: 6336, conceptTag: "(64-1) | (99-63) = 6336", explanation: "6336" },
      { id: 9, expression: "1234 × 9999", correctAnswer: 12338765, conceptTag: "(1234-1) | (9999-1233) = 12338765", explanation: "12338765" },
      { id: 10, expression: "987 × 999", correctAnswer: 986013, conceptTag: "(987-1) | (999-986) = 986013", explanation: "986013" },
    ]
  },
  {
    id: "svm6-mult-nines-more",
    title: "SVM-6: Multiplication by number of 9's (More 9's)",
    category: "vedic",
    level: "SVM-6",
    topic: "Multiplication by number of 9's (More 9's)",
    description: "Ekanyunena Purvena with padded zeros when multiplier has more 9s than multiplicand digits.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "43 × 999", correctAnswer: 42957, conceptTag: "043 x 999 = (043-1) | (999-042) = 42957", explanation: "42957" },
      { id: 2, expression: "56 × 999", correctAnswer: 55944, conceptTag: "056 x 999 = (056-1) | (999-055) = 55944", explanation: "55944" },
      { id: 3, expression: "7 × 99", correctAnswer: 693, conceptTag: "07 x 99 = (07-1) | (99-06) = 693", explanation: "693" },
      { id: 4, expression: "8 × 99", correctAnswer: 792, conceptTag: "08 x 99 = (08-1) | (99-07) = 792", explanation: "792" },
      { id: 5, expression: "234 × 9999", correctAnswer: 2339765, conceptTag: "0234 x 9999 = 2339765", explanation: "2339765" },
      { id: 6, expression: "82 × 999", correctAnswer: 81918, conceptTag: "082 x 999 = 81918", explanation: "81918" },
      { id: 7, expression: "9 × 999", correctAnswer: 8991, conceptTag: "009 x 999 = 8991", explanation: "8991" },
      { id: 8, expression: "15 × 9999", correctAnswer: 149985, conceptTag: "0015 x 9999 = 149985", explanation: "149985" },
      { id: 9, expression: "31 × 999", correctAnswer: 30969, conceptTag: "031 x 999 = 30969", explanation: "30969" },
      { id: 10, expression: "68 × 9999", correctAnswer: 679932, conceptTag: "0068 x 9999 = 679932", explanation: "679932" },
    ]
  },
  {
    id: "svm6-mult-3x3",
    title: "SVM-6: Multiplication General Method (3 D x 3 D)",
    category: "vedic",
    level: "SVM-6",
    topic: "Multiplication General Method (3 D x 3 D)",
    description: "Vedic Urdhva Tiryagbhyam general crosswise multiplication for 3-digit x 3-digit numbers.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "123 × 231", correctAnswer: 28413, conceptTag: "Urdhva 3x3 algorithm = 28413", explanation: "28413" },
      { id: 2, expression: "214 × 312", correctAnswer: 66768, conceptTag: "Urdhva 3x3 algorithm = 66768", explanation: "66768" },
      { id: 3, expression: "105 × 213", correctAnswer: 22365, conceptTag: "Urdhva 3x3 algorithm = 22365", explanation: "22365" },
      { id: 4, expression: "312 × 142", correctAnswer: 44304, conceptTag: "Urdhva 3x3 algorithm = 44304", explanation: "44304" },
      { id: 5, expression: "204 × 132", correctAnswer: 26928, conceptTag: "Urdhva 3x3 algorithm = 26928", explanation: "26928" },
      { id: 6, expression: "413 × 201", correctAnswer: 83013, conceptTag: "Urdhva 3x3 algorithm = 83013", explanation: "83013" },
      { id: 7, expression: "132 × 121", correctAnswer: 15972, conceptTag: "Urdhva 3x3 algorithm = 15972", explanation: "15972" },
      { id: 8, expression: "221 × 314", correctAnswer: 69394, conceptTag: "Urdhva 3x3 algorithm = 69394", explanation: "69394" },
      { id: 9, expression: "305 × 112", correctAnswer: 34160, conceptTag: "Urdhva 3x3 algorithm = 34160", explanation: "34160" },
      { id: 10, expression: "421 × 132", correctAnswer: 55572, conceptTag: "Urdhva 3x3 algorithm = 55572", explanation: "55572" },
    ]
  },
  {
    id: "svm6-div-flag",
    title: "SVM-6: Division General Method [Flag Method]",
    category: "vedic",
    level: "SVM-6",
    topic: "Division General Method [Flag Method]",
    description: "Vedic Dhwajanka (Flag Digit Division Method) universal division algorithm.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "4382 ÷ 53 (Quotient)", correctAnswer: 82, conceptTag: "Dhwajanka Flag division: Q = 82, R = 36", explanation: "Q = 82" },
      { id: 2, expression: "4382 ÷ 53 (Remainder)", correctAnswer: 36, conceptTag: "Dhwajanka Flag division: Q = 82, R = 36", explanation: "R = 36" },
      { id: 3, expression: "1234 ÷ 42 (Quotient)", correctAnswer: 29, conceptTag: "Dhwajanka Flag division: Q = 29, R = 16", explanation: "Q = 29" },
      { id: 4, expression: "1234 ÷ 42 (Remainder)", correctAnswer: 16, conceptTag: "Dhwajanka Flag division: Q = 29, R = 16", explanation: "R = 16" },
      { id: 5, expression: "2456 ÷ 31 (Quotient)", correctAnswer: 79, conceptTag: "Dhwajanka Flag division: Q = 79, R = 7", explanation: "Q = 79" },
      { id: 6, expression: "3578 ÷ 62 (Quotient)", correctAnswer: 57, conceptTag: "Dhwajanka Flag division: Q = 57, R = 44", explanation: "Q = 57" },
      { id: 7, expression: "1894 ÷ 23 (Quotient)", correctAnswer: 82, conceptTag: "Dhwajanka Flag division: Q = 82, R = 8", explanation: "Q = 82" },
      { id: 8, expression: "2784 ÷ 32 (Quotient)", correctAnswer: 87, conceptTag: "Dhwajanka Flag division: Q = 87, R = 0", explanation: "Q = 87" },
      { id: 9, expression: "3192 ÷ 42 (Quotient)", correctAnswer: 76, conceptTag: "Dhwajanka Flag division: Q = 76, R = 0", explanation: "Q = 76" },
      { id: 10, expression: "4524 ÷ 52 (Quotient)", correctAnswer: 87, conceptTag: "Dhwajanka Flag division: Q = 87, R = 0", explanation: "Q = 87" },
    ]
  },
  {
    id: "svm6-squares-duplex",
    title: "SVM-6: Squares by Duplex Method",
    category: "vedic",
    level: "SVM-6",
    topic: "Squares by Duplex Method",
    description: "Vedic Dwandwa Yoga (Duplex Squaring Sutra): D(a)=a^2, D(ab)=2ab, D(abc)=2ac+b^2.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "43² by Duplex", correctAnswer: 1849, conceptTag: "D(4)|D(43)|D(3) = 16 | 24 | 9 = 1849", explanation: "1849" },
      { id: 2, expression: "62² by Duplex", correctAnswer: 3844, conceptTag: "D(6)|D(62)|D(2) = 36 | 24 | 4 = 3844", explanation: "3844" },
      { id: 3, expression: "74² by Duplex", correctAnswer: 5476, conceptTag: "D(7)|D(74)|D(4) = 49 | 56 | 16 = 5476", explanation: "5476" },
      { id: 4, expression: "83² by Duplex", correctAnswer: 6889, conceptTag: "D(8)|D(83)|D(3) = 64 | 48 | 9 = 6889", explanation: "6889" },
      { id: 5, expression: "35² by Duplex", correctAnswer: 1225, conceptTag: "D(3)|D(35)|D(5) = 9 | 30 | 25 = 1225", explanation: "1225" },
      { id: 6, expression: "92² by Duplex", correctAnswer: 8464, conceptTag: "D(9)|D(92)|D(2) = 81 | 36 | 4 = 8464", explanation: "8464" },
      { id: 7, expression: "51² by Duplex", correctAnswer: 2601, conceptTag: "D(5)|D(51)|D(1) = 25 | 10 | 1 = 2601", explanation: "2601" },
      { id: 8, expression: "24² by Duplex", correctAnswer: 576, conceptTag: "D(2)|D(24)|D(4) = 4 | 16 | 16 = 576", explanation: "576" },
      { id: 9, expression: "67² by Duplex", correctAnswer: 4489, conceptTag: "D(6)|D(67)|D(7) = 36 | 84 | 49 = 4489", explanation: "4489" },
      { id: 10, expression: "85² by Duplex", correctAnswer: 7225, conceptTag: "D(8)|D(85)|D(5) = 64 | 80 | 25 = 7225", explanation: "7225" },
    ]
  },
  {
    id: "svm6-add-squares",
    title: "SVM-6: Addition of Squares",
    category: "vedic",
    level: "SVM-6",
    topic: "Addition of Squares",
    description: "Rapid Vedic computation of sum of two squares (a^2 + b^2).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "12² + 15²", correctAnswer: 369, conceptTag: "144 + 225 = 369", explanation: "369" },
      { id: 2, expression: "14² + 16²", correctAnswer: 452, conceptTag: "196 + 256 = 452", explanation: "452" },
      { id: 3, expression: "25² + 15²", correctAnswer: 850, conceptTag: "625 + 225 = 850", explanation: "850" },
      { id: 4, expression: "18² + 24²", correctAnswer: 900, conceptTag: "324 + 576 = 900", explanation: "900" },
      { id: 5, expression: "30² + 40²", correctAnswer: 2500, conceptTag: "900 + 1600 = 2500", explanation: "2500" },
      { id: 6, expression: "11² + 13²", correctAnswer: 290, conceptTag: "121 + 169 = 290", explanation: "290" },
      { id: 7, expression: "20² + 21²", correctAnswer: 841, conceptTag: "400 + 441 = 841", explanation: "841" },
      { id: 8, expression: "16² + 12²", correctAnswer: 400, conceptTag: "256 + 144 = 400", explanation: "400" },
      { id: 9, expression: "35² + 25²", correctAnswer: 1850, conceptTag: "1225 + 625 = 1850", explanation: "1850" },
      { id: 10, expression: "45² + 15²", correctAnswer: 2250, conceptTag: "2025 + 225 = 2250", explanation: "2250" },
    ]
  },
  {
    id: "svm6-square-roots",
    title: "SVM-6: Square Roots of Exact Squares",
    category: "vedic",
    level: "SVM-6",
    topic: "Square Roots of Exact Squares",
    description: "Vedic Vilokanam (Observation Method) for square roots of perfect squares up to 10000.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "√1849", correctAnswer: 43, conceptTag: "Ends in 9 (3 or 7), near 1600 (40) -> 43", explanation: "43" },
      { id: 2, expression: "√3844", correctAnswer: 62, conceptTag: "Ends in 4 (2 or 8), near 3600 (60) -> 62", explanation: "62" },
      { id: 3, expression: "√5476", correctAnswer: 74, conceptTag: "Ends in 6 (4 or 6), near 4900 (70) -> 74", explanation: "74" },
      { id: 4, expression: "√6889", correctAnswer: 83, conceptTag: "Ends in 9 (3 or 7), near 6400 (80) -> 83", explanation: "83" },
      { id: 5, expression: "√2809", correctAnswer: 53, conceptTag: "Ends in 9 (3 or 7), near 2500 (50) -> 53", explanation: "53" },
      { id: 6, expression: "√7225", correctAnswer: 85, conceptTag: "Ends in 25 (5), 8x9=72 -> 85", explanation: "85" },
      { id: 7, expression: "√9025", correctAnswer: 95, conceptTag: "Ends in 25 (5), 9x10=90 -> 95", explanation: "95" },
      { id: 8, expression: "√3136", correctAnswer: 56, conceptTag: "Ends in 6 (4 or 6), near 2500 (50) -> 56", explanation: "56" },
      { id: 9, expression: "√4489", correctAnswer: 67, conceptTag: "Ends in 9 (3 or 7), near 3600 (60) -> 67", explanation: "67" },
      { id: 10, expression: "√9604", correctAnswer: 98, conceptTag: "Ends in 4 (2 or 8), near 8100 (90) -> 98", explanation: "98" },
    ]
  },
  {
    id: "svm6-cubes",
    title: "SVM-6: CUBES",
    category: "vedic",
    level: "SVM-6",
    topic: "CUBES",
    description: "Vedic Yavadunam & ratio cubing sutra for 2-digit numbers: (N + 2d) | 3d^2 | d^3.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "12³", correctAnswer: 1728, conceptTag: "12³ = 1728", explanation: "1728" },
      { id: 2, expression: "13³", correctAnswer: 2197, conceptTag: "13³ = 2197", explanation: "2197" },
      { id: 3, expression: "14³", correctAnswer: 2744, conceptTag: "14³ = 2744", explanation: "2744" },
      { id: 4, expression: "15³", correctAnswer: 3375, conceptTag: "15³ = 3375", explanation: "3375" },
      { id: 5, expression: "16³", correctAnswer: 4096, conceptTag: "16³ = 4096", explanation: "4096" },
      { id: 6, expression: "17³", correctAnswer: 4913, conceptTag: "17³ = 4913", explanation: "4913" },
      { id: 7, expression: "18³", correctAnswer: 5832, conceptTag: "18³ = 5832", explanation: "5832" },
      { id: 8, expression: "19³", correctAnswer: 6859, conceptTag: "19³ = 6859", explanation: "6859" },
      { id: 9, expression: "20³", correctAnswer: 8000, conceptTag: "20³ = 8000", explanation: "8000" },
      { id: 10, expression: "21³", correctAnswer: 9261, conceptTag: "21³ = 9261", explanation: "9261" },
    ]
  },
  {
    id: "svm6-cube-roots",
    title: "SVM-6: Cube Roots of Exact Cubes",
    category: "vedic",
    level: "SVM-6",
    topic: "Cube Roots of Exact Cubes",
    description: "Vedic Vilokanam (Observation Method) for cube roots of perfect cubes up to 1,000,000.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "∛1728", correctAnswer: 12, conceptTag: "Ends in 8 (unit 2), group 1 -> 12", explanation: "12" },
      { id: 2, expression: "∛2197", correctAnswer: 13, conceptTag: "Ends in 7 (unit 3), group 2 -> 13", explanation: "13" },
      { id: 3, expression: "∛2744", correctAnswer: 14, conceptTag: "Ends in 4 (unit 4), group 2 -> 14", explanation: "14" },
      { id: 4, expression: "∛3375", correctAnswer: 15, conceptTag: "Ends in 5 (unit 5), group 3 -> 15", explanation: "15" },
      { id: 5, expression: "∛4096", correctAnswer: 16, conceptTag: "Ends in 6 (unit 6), group 4 -> 16", explanation: "16" },
      { id: 6, expression: "∛4913", correctAnswer: 17, conceptTag: "Ends in 3 (unit 7), group 4 -> 17", explanation: "17" },
      { id: 7, expression: "∛5832", correctAnswer: 18, conceptTag: "Ends in 2 (unit 8), group 5 -> 18", explanation: "18" },
      { id: 8, expression: "∛6859", correctAnswer: 19, conceptTag: "Ends in 9 (unit 9), group 6 -> 19", explanation: "19" },
      { id: 9, expression: "∛9261", correctAnswer: 21, conceptTag: "Ends in 1 (unit 1), group 9 -> 21", explanation: "21" },
      { id: 10, expression: "∛12167", correctAnswer: 23, conceptTag: "Ends in 7 (unit 3), group 12 -> 23", explanation: "23" },
    ]
  },
  {
    id: "svm6-fourth-power",
    title: "SVM-6: Fourth Power 2 Digit Number",
    category: "vedic",
    level: "SVM-6",
    topic: "Fourth Power 2 Digit Number",
    description: "Vedic binomial ratio expansion for 4th power of 2-digit number (a+b)^4.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "12⁴", correctAnswer: 20736, conceptTag: "12⁴ = 20736", explanation: "20736" },
      { id: 2, expression: "11⁴", correctAnswer: 14641, conceptTag: "11⁴ = 14641", explanation: "14641" },
      { id: 3, expression: "13⁴", correctAnswer: 28561, conceptTag: "13⁴ = 28561", explanation: "28561" },
      { id: 4, expression: "14⁴", correctAnswer: 38416, conceptTag: "14⁴ = 38416", explanation: "38416" },
      { id: 5, expression: "15⁴", correctAnswer: 50625, conceptTag: "15⁴ = 50625", explanation: "50625" },
      { id: 6, expression: "16⁴", correctAnswer: 65536, conceptTag: "16⁴ = 65536", explanation: "65536" },
      { id: 7, expression: "17⁴", correctAnswer: 83521, conceptTag: "17⁴ = 83521", explanation: "83521" },
      { id: 8, expression: "18⁴", correctAnswer: 104976, conceptTag: "18⁴ = 104976", explanation: "104976" },
      { id: 9, expression: "19⁴", correctAnswer: 130321, conceptTag: "19⁴ = 130321", explanation: "130321" },
      { id: 10, expression: "20⁴", correctAnswer: 160000, conceptTag: "20⁴ = 160000", explanation: "160000" },
    ]
  },
  {
    id: "vedic-svm6-overall",
    title: "SVM-6-Overall (Comprehensive Level Master Quiz)",
    category: "vedic",
    level: "SVM-6",
    topic: "15. SVM-6-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all Senior Vedic Math Level 6 topics: Supreme Master Suite.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "456 × 999", correctAnswer: 455544, conceptTag: "SVM-6 Overall" }
    ]
  },

  // ==========================================
  // SVM-5 LEVEL (Senior Vedic Math Level 5 - 35 Topics - Grand Master Suite)
  // ==========================================
  {
    id: "svm5-sub-nikhilam",
    title: "SVM-5: Subtraction ( all from 9 last from 10)",
    category: "vedic",
    level: "SVM-5",
    topic: "Subtraction ( all from 9 last from 10)",
    description: "Nikhilam Navatashcaramam Dashatah subtraction from round bases (100, 1000, 10000).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "1000 - 456", correctAnswer: 544, conceptTag: "(9-4)(9-5)(10-6) = 544", explanation: "544" },
      { id: 2, expression: "1000 - 328", correctAnswer: 672, conceptTag: "(9-3)(9-2)(10-8) = 672", explanation: "672" },
      { id: 3, expression: "10000 - 6427", correctAnswer: 3573, conceptTag: "(9-6)(9-4)(9-2)(10-7) = 3573", explanation: "3573" },
      { id: 4, expression: "10000 - 8193", correctAnswer: 1807, conceptTag: "(9-8)(9-1)(9-9)(10-3) = 1807", explanation: "1807" },
      { id: 5, expression: "100 - 67", correctAnswer: 33, conceptTag: "(9-6)(10-7) = 33", explanation: "33" },
      { id: 6, expression: "100 - 42", correctAnswer: 58, conceptTag: "(9-4)(10-2) = 58", explanation: "58" },
      { id: 7, expression: "1000 - 789", correctAnswer: 211, conceptTag: "(9-7)(9-8)(10-9) = 211", explanation: "211" },
      { id: 8, expression: "10000 - 2534", correctAnswer: 7466, conceptTag: "(9-2)(9-5)(9-3)(10-4) = 7466", explanation: "7466" },
      { id: 9, expression: "100000 - 43825", correctAnswer: 56175, conceptTag: "(9-4)(9-3)(9-8)(9-2)(10-5) = 56175", explanation: "56175" },
      { id: 10, expression: "1000 - 105", correctAnswer: 895, conceptTag: "(9-1)(9-0)(10-5) = 895", explanation: "895" },
    ]
  },
  {
    id: "svm5-vinculum",
    title: "SVM-5: Vinculum",
    category: "vedic",
    level: "SVM-5",
    topic: "Vinculum",
    description: "Convert numbers with digits > 5 into vinculum (bar digit) representation.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Vinculum form of 18", correctAnswer: 22, conceptTag: "18 = 20 - 2 = 2̄2", explanation: "20 - 2 = 18 (Represented as 20 - 2)" },
      { id: 2, expression: "Vinculum form of 19", correctAnswer: 21, conceptTag: "19 = 20 - 1 = 21̄", explanation: "20 - 1 = 19" },
      { id: 3, expression: "Vinculum form of 28", correctAnswer: 32, conceptTag: "28 = 30 - 2", explanation: "30 - 2 = 28" },
      { id: 4, expression: "Vinculum form of 39", correctAnswer: 41, conceptTag: "39 = 40 - 1", explanation: "40 - 1 = 39" },
      { id: 5, expression: "Vinculum form of 47", correctAnswer: 53, conceptTag: "47 = 50 - 3", explanation: "50 - 3 = 47" },
      { id: 6, expression: "Vinculum form of 58", correctAnswer: 62, conceptTag: "58 = 60 - 2", explanation: "60 - 2 = 58" },
      { id: 7, expression: "Vinculum form of 69", correctAnswer: 71, conceptTag: "69 = 70 - 1", explanation: "70 - 1 = 69" },
      { id: 8, expression: "Vinculum form of 78", correctAnswer: 82, conceptTag: "78 = 80 - 2", explanation: "80 - 2 = 78" },
      { id: 9, expression: "Vinculum form of 89", correctAnswer: 91, conceptTag: "89 = 90 - 1", explanation: "90 - 1 = 89" },
      { id: 10, expression: "Vinculum form of 98", correctAnswer: 102, conceptTag: "98 = 100 - 2", explanation: "100 - 2 = 98" },
    ]
  },
  {
    id: "svm5-devinculate",
    title: "SVM-5: Devinculate",
    category: "vedic",
    level: "SVM-5",
    topic: "Devinculate",
    description: "Convert vinculum bar numbers back to standard positive decimal numbers.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Devinculate 2̄2 (20 - 2)", correctAnswer: 18, conceptTag: "20 - 2 = 18", explanation: "18" },
      { id: 2, expression: "Devinculate 3̄1 (30 - 1)", correctAnswer: 29, conceptTag: "30 - 1 = 29", explanation: "29" },
      { id: 3, expression: "Devinculate 5̄3 (50 - 3)", correctAnswer: 47, conceptTag: "50 - 3 = 47", explanation: "47" },
      { id: 4, expression: "Devinculate 10̄2 (100 - 2)", correctAnswer: 98, conceptTag: "100 - 2 = 98", explanation: "98" },
      { id: 5, expression: "Devinculate 4̄2 (40 - 2)", correctAnswer: 38, conceptTag: "40 - 2 = 38", explanation: "38" },
      { id: 6, expression: "Devinculate 6̄1 (60 - 1)", correctAnswer: 59, conceptTag: "60 - 1 = 59", explanation: "59" },
      { id: 7, expression: "Devinculate 8̄2 (80 - 2)", correctAnswer: 78, conceptTag: "80 - 2 = 78", explanation: "78" },
      { id: 8, expression: "Devinculate 9̄1 (90 - 1)", correctAnswer: 89, conceptTag: "90 - 1 = 89", explanation: "89" },
      { id: 9, expression: "Devinculate 100̄3 (1000 - 3)", correctAnswer: 997, conceptTag: "1000 - 3 = 997", explanation: "997" },
      { id: 10, expression: "Devinculate 50̄2 (500 - 2)", correctAnswer: 498, conceptTag: "500 - 2 = 498", explanation: "498" },
    ]
  },
  {
    id: "svm5-div-9",
    title: "SVM-5: Division by 9",
    category: "vedic",
    level: "SVM-5",
    topic: "Division by 9",
    description: "Vedic Paravartya division shortcut for division by 9.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "124 ÷ 9 (Quotient)", correctAnswer: 13, conceptTag: "124 ÷ 9 = Q: 13, R: 7", explanation: "Q = 13" },
      { id: 2, expression: "124 ÷ 9 (Remainder)", correctAnswer: 7, conceptTag: "124 ÷ 9 = Q: 13, R: 7", explanation: "R = 7" },
      { id: 3, expression: "213 ÷ 9 (Quotient)", correctAnswer: 23, conceptTag: "213 ÷ 9 = Q: 23, R: 6", explanation: "Q = 23" },
      { id: 4, expression: "213 ÷ 9 (Remainder)", correctAnswer: 6, conceptTag: "213 ÷ 9 = Q: 23, R: 6", explanation: "R = 6" },
      { id: 5, expression: "142 ÷ 9 (Quotient)", correctAnswer: 15, conceptTag: "142 ÷ 9 = Q: 15, R: 7", explanation: "Q = 15" },
      { id: 6, expression: "312 ÷ 9 (Quotient)", correctAnswer: 34, conceptTag: "312 ÷ 9 = Q: 34, R: 6", explanation: "Q = 34" },
      { id: 7, expression: "411 ÷ 9 (Quotient)", correctAnswer: 45, conceptTag: "411 ÷ 9 = Q: 45, R: 6", explanation: "Q = 45" },
      { id: 8, expression: "503 ÷ 9 (Quotient)", correctAnswer: 55, conceptTag: "503 ÷ 9 = Q: 55, R: 8", explanation: "Q = 55" },
      { id: 9, expression: "111 ÷ 9 (Quotient)", correctAnswer: 12, conceptTag: "111 ÷ 9 = Q: 12, R: 3", explanation: "Q = 12" },
      { id: 10, expression: "222 ÷ 9 (Quotient)", correctAnswer: 24, conceptTag: "222 ÷ 9 = Q: 24, R: 6", explanation: "Q = 24" },
    ]
  },
  {
    id: "svm5-div-above-100",
    title: "SVM-5: Division by number above base 100",
    category: "vedic",
    level: "SVM-5",
    topic: "Division by number above base 100",
    description: "Vedic Paravartya Yojayet (Transpose and Apply) division for divisors near 100+.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "1243 ÷ 102 (Quotient)", correctAnswer: 12, conceptTag: "1243 ÷ 102 = Q: 12, R: 19", explanation: "Q = 12" },
      { id: 2, expression: "1243 ÷ 102 (Remainder)", correctAnswer: 19, conceptTag: "1243 ÷ 102 = Q: 12, R: 19", explanation: "R = 19" },
      { id: 3, expression: "1354 ÷ 103 (Quotient)", correctAnswer: 13, conceptTag: "1354 ÷ 103 = Q: 13, R: 15", explanation: "Q = 13" },
      { id: 4, expression: "1354 ÷ 103 (Remainder)", correctAnswer: 15, conceptTag: "1354 ÷ 103 = Q: 13, R: 15", explanation: "R = 15" },
      { id: 5, expression: "1456 ÷ 104 (Quotient)", correctAnswer: 14, conceptTag: "1456 ÷ 104 = Q: 14, R: 0", explanation: "Q = 14" },
      { id: 6, expression: "1575 ÷ 105 (Quotient)", correctAnswer: 15, conceptTag: "1575 ÷ 105 = Q: 15, R: 0", explanation: "Q = 15" },
      { id: 7, expression: "1133 ÷ 101 (Quotient)", correctAnswer: 11, conceptTag: "1133 ÷ 101 = Q: 11, R: 22", explanation: "Q = 11" },
      { id: 8, expression: "1236 ÷ 103 (Quotient)", correctAnswer: 12, conceptTag: "1236 ÷ 103 = Q: 12, R: 0", explanation: "Q = 12" },
      { id: 9, expression: "1428 ÷ 102 (Quotient)", correctAnswer: 14, conceptTag: "1428 ÷ 102 = Q: 14, R: 0", explanation: "Q = 14" },
      { id: 10, expression: "1545 ÷ 103 (Quotient)", correctAnswer: 15, conceptTag: "1545 ÷ 103 = Q: 15, R: 0", explanation: "Q = 15" },
    ]
  },
  {
    id: "svm5-div-base-below",
    title: "SVM-5: Division Base Method (Below Base)",
    category: "vedic",
    level: "SVM-5",
    topic: "Division Base Method (Below Base)",
    description: "Vedic Nikhilam division method for divisors below base (8, 9, 88, 97, 888, 989).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "111 ÷ 89 (Quotient)", correctAnswer: 1, conceptTag: "111 ÷ 89 = Q: 1, R: 22", explanation: "Q = 1" },
      { id: 2, expression: "111 ÷ 89 (Remainder)", correctAnswer: 22, conceptTag: "111 ÷ 89 = Q: 1, R: 22", explanation: "R = 22" },
      { id: 3, expression: "123 ÷ 97 (Quotient)", correctAnswer: 1, conceptTag: "123 ÷ 97 = Q: 1, R: 26", explanation: "Q = 1" },
      { id: 4, expression: "123 ÷ 97 (Remainder)", correctAnswer: 26, conceptTag: "123 ÷ 97 = Q: 1, R: 26", explanation: "R = 26" },
      { id: 5, expression: "234 ÷ 98 (Quotient)", correctAnswer: 2, conceptTag: "234 ÷ 98 = Q: 2, R: 38", explanation: "Q = 2" },
      { id: 6, expression: "234 ÷ 98 (Remainder)", correctAnswer: 38, conceptTag: "234 ÷ 98 = Q: 2, R: 38", explanation: "R = 38" },
      { id: 7, expression: "312 ÷ 96 (Quotient)", correctAnswer: 3, conceptTag: "312 ÷ 96 = Q: 3, R: 24", explanation: "Q = 3" },
      { id: 8, expression: "312 ÷ 96 (Remainder)", correctAnswer: 24, conceptTag: "312 ÷ 96 = Q: 3, R: 24", explanation: "R = 24" },
      { id: 9, expression: "415 ÷ 95 (Quotient)", correctAnswer: 4, conceptTag: "415 ÷ 95 = Q: 4, R: 35", explanation: "Q = 4" },
      { id: 10, expression: "415 ÷ 95 (Remainder)", correctAnswer: 35, conceptTag: "415 ÷ 95 = Q: 4, R: 35", explanation: "R = 35" },
    ]
  },
  {
    id: "svm5-squares-base",
    title: "SVM-5: Squares (Base Method)",
    category: "vedic",
    level: "SVM-5",
    topic: "Squares (Base Method)",
    description: "Vedic Yavadunam Tavadunikritya squaring sutra: (N + d) | d^2.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "107²", correctAnswer: 11449, conceptTag: "(107+7) | (7^2) = 114 | 49", explanation: "11449" },
      { id: 2, expression: "108²", correctAnswer: 11664, conceptTag: "(108+8) | (8^2) = 116 | 64", explanation: "11664" },
      { id: 3, expression: "104²", correctAnswer: 10816, conceptTag: "(104+4) | (4^2) = 108 | 16", explanation: "10816" },
      { id: 4, expression: "103²", correctAnswer: 10609, conceptTag: "(103+3) | (3^2) = 106 | 09", explanation: "10609" },
      { id: 5, expression: "96²", correctAnswer: 9216, conceptTag: "(96-4) | (4^2) = 92 | 16", explanation: "9216" },
      { id: 6, expression: "97²", correctAnswer: 9409, conceptTag: "(97-3) | (3^2) = 94 | 09", explanation: "9409" },
      { id: 7, expression: "98²", correctAnswer: 9604, conceptTag: "(98-2) | (2^2) = 96 | 04", explanation: "9604" },
      { id: 8, expression: "95²", correctAnswer: 9025, conceptTag: "(95-5) | (5^2) = 90 | 25", explanation: "9025" },
      { id: 9, expression: "112²", correctAnswer: 12544, conceptTag: "(112+12) | (12^2) = 124 | 144 -> 12544", explanation: "12544" },
      { id: 10, expression: "93²", correctAnswer: 8649, conceptTag: "(93-7) | (7^2) = 86 | 49", explanation: "8649" },
    ]
  },
  {
    id: "svm5-squares-end-5",
    title: "SVM-5: Square of number ending with 5",
    category: "vedic",
    level: "SVM-5",
    topic: "Square of number ending with 5",
    description: "Ekadhikena Purvena squaring sutra: (A x (A+1)) | 25.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "65²", correctAnswer: 4225, conceptTag: "(6x7) | 25 = 4225", explanation: "6x7=42 -> 4225" },
      { id: 2, expression: "75²", correctAnswer: 5625, conceptTag: "(7x8) | 25 = 5625", explanation: "7x8=56 -> 5625" },
      { id: 3, expression: "85²", correctAnswer: 7225, conceptTag: "(8x9) | 25 = 7225", explanation: "8x9=72 -> 7225" },
      { id: 4, expression: "95²", correctAnswer: 9025, conceptTag: "(9x10) | 25 = 9025", explanation: "9x10=90 -> 9025" },
      { id: 5, expression: "105²", correctAnswer: 11025, conceptTag: "(10x11) | 25 = 11025", explanation: "10x11=110 -> 11025" },
      { id: 6, expression: "115²", correctAnswer: 13225, conceptTag: "(11x12) | 25 = 13225", explanation: "11x12=132 -> 13225" },
      { id: 7, expression: "125²", correctAnswer: 15625, conceptTag: "(12x13) | 25 = 15625", explanation: "12x13=156 -> 15625" },
      { id: 8, expression: "45²", correctAnswer: 2025, conceptTag: "(4x5) | 25 = 2025", explanation: "4x5=20 -> 2025" },
      { id: 9, expression: "35²", correctAnswer: 1225, conceptTag: "(3x4) | 25 = 1225", explanation: "3x4=12 -> 1225" },
      { id: 10, expression: "25²", correctAnswer: 625, conceptTag: "(2x3) | 25 = 625", explanation: "2x3=6 -> 625" },
    ]
  },
  {
    id: "svm5-squares-start-5",
    title: "SVM-5: Square of number starting with 5",
    category: "vedic",
    level: "SVM-5",
    topic: "Square of number starting with 5",
    description: "Vedic 5-prefix squaring sutra: (25 + U) | U^2.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "53²", correctAnswer: 2809, conceptTag: "(25+3) | (3^2) = 28 | 09", explanation: "25+3=28, 3^2=09 -> 2809" },
      { id: 2, expression: "54²", correctAnswer: 2916, conceptTag: "(25+4) | (4^2) = 29 | 16", explanation: "25+4=29, 4^2=16 -> 2916" },
      { id: 3, expression: "56²", correctAnswer: 3136, conceptTag: "(25+6) | (6^2) = 31 | 36", explanation: "25+6=31, 6^2=36 -> 3136" },
      { id: 4, expression: "57²", correctAnswer: 3249, conceptTag: "(25+7) | (7^2) = 32 | 49", explanation: "25+7=32, 7^2=49 -> 3249" },
      { id: 5, expression: "58²", correctAnswer: 3364, conceptTag: "(25+8) | (8^2) = 33 | 64", explanation: "25+8=33, 8^2=64 -> 3364" },
      { id: 6, expression: "59²", correctAnswer: 3481, conceptTag: "(25+9) | (9^2) = 34 | 81", explanation: "25+9=34, 9^2=81 -> 3481" },
      { id: 7, expression: "51²", correctAnswer: 2601, conceptTag: "(25+1) | (1^2) = 26 | 01", explanation: "25+1=26, 1^2=01 -> 2601" },
      { id: 8, expression: "52²", correctAnswer: 2704, conceptTag: "(25+2) | (2^2) = 27 | 04", explanation: "25+2=27, 2^2=04 -> 2704" },
      { id: 9, expression: "55²", correctAnswer: 3025, conceptTag: "(25+5) | (5^2) = 30 | 25", explanation: "25+5=30, 5^2=25 -> 3025" },
      { id: 10, expression: "50²", correctAnswer: 2500, conceptTag: "(25+0) | (0^2) = 25 | 00", explanation: "2500" },
    ]
  },
  {
    id: "vedic-svm5-overall",
    title: "SVM-5-Overall (Comprehensive Level Master Quiz)",
    category: "vedic",
    level: "SVM-5",
    topic: "15. SVM-5-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all Senior Vedic Math Level 5 topics: Grand Master Suite.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "992 × 995", correctAnswer: 987040, conceptTag: "SVM-5 Overall" }
    ]
  },

  // ==========================================
  // SVM-4 LEVEL (Senior Vedic Math Level 4 - 20 Topics - Above 12 yrs. Advanced Suite)
  // ==========================================
  {
    id: "svm4-mult-11-multiples",
    title: "SVM-4: Multiplication by 11 and multiples of 11",
    category: "vedic",
    level: "SVM-4",
    topic: "Multiplication by 11 and multiples of 11",
    description: "Multiplication by 11 and its multiples (22, 33, 44...99).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "43 × 33", correctAnswer: 1419, conceptTag: "(43 x 11) x 3 = 473 x 3", explanation: "473 x 3 = 1419" },
      { id: 2, expression: "52 × 22", correctAnswer: 1144, conceptTag: "(52 x 11) x 2 = 572 x 2", explanation: "572 x 2 = 1144" },
      { id: 3, expression: "34 × 44", correctAnswer: 1496, conceptTag: "(34 x 11) x 4 = 374 x 4", explanation: "374 x 4 = 1496" },
      { id: 4, expression: "25 × 55", correctAnswer: 1375, conceptTag: "(25 x 11) x 5 = 275 x 5", explanation: "275 x 5 = 1375" },
      { id: 5, expression: "18 × 66", correctAnswer: 1188, conceptTag: "(18 x 11) x 6 = 198 x 6", explanation: "198 x 6 = 1188" },
      { id: 6, expression: "24 × 77", correctAnswer: 1848, conceptTag: "(24 x 11) x 7 = 264 x 7", explanation: "264 x 7 = 1848" },
      { id: 7, expression: "32 × 88", correctAnswer: 2816, conceptTag: "(32 x 11) x 8 = 352 x 8", explanation: "352 x 8 = 2816" },
      { id: 8, expression: "15 × 99", correctAnswer: 1485, conceptTag: "(15 x 11) x 9 = 165 x 9", explanation: "165 x 9 = 1485" },
      { id: 9, expression: "62 × 11", correctAnswer: 682, conceptTag: "6 | (6+2) | 2 = 682", explanation: "6 | 8 | 2 = 682" },
      { id: 10, expression: "45 × 22", correctAnswer: 990, conceptTag: "(45 x 11) x 2 = 495 x 2", explanation: "495 x 2 = 990" },
    ]
  },
  {
    id: "svm4-mult-teens",
    title: "SVM-4: Multiplication by 12 to 19",
    category: "vedic",
    level: "SVM-4",
    topic: "Multiplication by 12 to 19",
    description: "Vedic teens multiplier rule for 12, 13, 14, 15, 16, 17, 18, 19.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "64 × 14", correctAnswer: 896, conceptTag: "64 x 14 = 896", explanation: "64 x 14 = 896" },
      { id: 2, expression: "43 × 12", correctAnswer: 516, conceptTag: "43 x 12 = 516", explanation: "43 x 12 = 516" },
      { id: 3, expression: "35 × 13", correctAnswer: 455, conceptTag: "35 x 13 = 455", explanation: "35 x 13 = 455" },
      { id: 4, expression: "52 × 15", correctAnswer: 780, conceptTag: "52 x 15 = 780", explanation: "52 x 15 = 780" },
      { id: 5, expression: "48 × 16", correctAnswer: 768, conceptTag: "48 x 16 = 768", explanation: "48 x 16 = 768" },
      { id: 6, expression: "32 × 17", correctAnswer: 544, conceptTag: "32 x 17 = 544", explanation: "32 x 17 = 544" },
      { id: 7, expression: "25 × 18", correctAnswer: 450, conceptTag: "25 x 18 = 450", explanation: "25 x 18 = 450" },
      { id: 8, expression: "31 × 19", correctAnswer: 589, conceptTag: "31 x 19 = 589", explanation: "31 x 19 = 589" },
      { id: 9, expression: "72 × 13", correctAnswer: 936, conceptTag: "72 x 13 = 936", explanation: "72 x 13 = 936" },
      { id: 10, expression: "84 × 12", correctAnswer: 1008, conceptTag: "84 x 12 = 1008", explanation: "84 x 12 = 1008" },
    ]
  },
  {
    id: "svm4-mult-111",
    title: "SVM-4: Multiplication by 111",
    category: "vedic",
    level: "SVM-4",
    topic: "Multiplication by 111",
    description: "Vedic triple sandwich sum rule for 111.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "324 × 111", correctAnswer: 35964, conceptTag: "3 | 5 | 9 | 6 | 4 = 35964", explanation: "35964" },
      { id: 2, expression: "123 × 111", correctAnswer: 13653, conceptTag: "1 | 3 | 6 | 5 | 3 = 13653", explanation: "13653" },
      { id: 3, expression: "214 × 111", correctAnswer: 23754, conceptTag: "2 | 3 | 7 | 5 | 4 = 23754", explanation: "23754" },
      { id: 4, expression: "412 × 111", correctAnswer: 45732, conceptTag: "4 | 5 | 7 | 3 | 2 = 45732", explanation: "45732" },
      { id: 5, expression: "531 × 111", correctAnswer: 58941, conceptTag: "5 | 8 | 9 | 4 | 1 = 58941", explanation: "58941" },
      { id: 6, expression: "142 × 111", correctAnswer: 15762, conceptTag: "1 | 5 | 7 | 6 | 2 = 15762", explanation: "15762" },
      { id: 7, expression: "315 × 111", correctAnswer: 34965, conceptTag: "3 | 4 | 9 | 6 | 5 = 34965", explanation: "34965" },
      { id: 8, expression: "421 × 111", correctAnswer: 46731, conceptTag: "4 | 6 | 7 | 3 | 1 = 46731", explanation: "46731" },
      { id: 9, expression: "513 × 111", correctAnswer: 56943, conceptTag: "5 | 6 | 9 | 4 | 3 = 56943", explanation: "56943" },
      { id: 10, expression: "231 × 111", correctAnswer: 25641, conceptTag: "2 | 5 | 6 | 4 | 1 = 25641", explanation: "25641" },
    ]
  },
  {
    id: "svm4-mult-222-999",
    title: "SVM-4: Multiplication by 222 to 999",
    category: "vedic",
    level: "SVM-4",
    topic: "Multiplication by 222 to 999",
    description: "Multiply by 111 and scale by single-digit multiplier (222, 333, 444...999).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "213 × 444", correctAnswer: 94572, conceptTag: "(213 x 111) x 4 = 23643 x 4", explanation: "23643 x 4 = 94572" },
      { id: 2, expression: "123 × 222", correctAnswer: 27306, conceptTag: "(123 x 111) x 2 = 13653 x 2", explanation: "13653 x 2 = 27306" },
      { id: 3, expression: "214 × 333", correctAnswer: 71262, conceptTag: "(214 x 111) x 3 = 23754 x 3", explanation: "23754 x 3 = 71262" },
      { id: 4, expression: "112 × 555", correctAnswer: 62160, conceptTag: "(112 x 111) x 5 = 12432 x 5", explanation: "12432 x 5 = 62160" },
      { id: 5, expression: "121 × 666", correctAnswer: 80586, conceptTag: "(121 x 111) x 6 = 13431 x 6", explanation: "13431 x 6 = 80586" },
      { id: 6, expression: "103 × 777", correctAnswer: 80031, conceptTag: "(103 x 111) x 7 = 11433 x 7", explanation: "11433 x 7 = 80031" },
      { id: 7, expression: "111 × 888", correctAnswer: 98568, conceptTag: "(111 x 111) x 8 = 12321 x 8", explanation: "12321 x 8 = 98568" },
      { id: 8, expression: "105 × 999", correctAnswer: 104895, conceptTag: "(105 x 111) x 9 = 11655 x 9", explanation: "11655 x 9 = 104895" },
      { id: 9, expression: "132 × 222", correctAnswer: 29304, conceptTag: "(132 x 111) x 2 = 14652 x 2", explanation: "14652 x 2 = 29304" },
      { id: 10, expression: "203 × 333", correctAnswer: 67599, conceptTag: "(203 x 111) x 3 = 22533 x 3", explanation: "22533 x 3 = 67599" },
    ]
  },
  {
    id: "svm4-base-below-10",
    title: "SVM-4: Base Method Multiplication - Below Base 10",
    category: "vedic",
    level: "SVM-4",
    topic: "Base Method Multiplication - Below Base 10",
    description: "Vedic Nikhilam multiplication for numbers below base 10 (deficits).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "8 × 7", correctAnswer: 56, conceptTag: "(8-3) | (-2 x -3) = 5 | 6", explanation: "Deficits -2 & -3 -> 56" },
      { id: 2, expression: "9 × 8", correctAnswer: 72, conceptTag: "(9-2) | (-1 x -2) = 7 | 2", explanation: "Deficits -1 & -2 -> 72" },
      { id: 3, expression: "7 × 7", correctAnswer: 49, conceptTag: "(7-3) | (-3 x -3) = 4 | 9", explanation: "Deficits -3 & -3 -> 49" },
      { id: 4, expression: "9 × 6", correctAnswer: 54, conceptTag: "(9-4) | (-1 x -4) = 5 | 4", explanation: "Deficits -1 & -4 -> 54" },
      { id: 5, expression: "8 × 6", correctAnswer: 48, conceptTag: "(8-4) | (-2 x -4) = 4 | 8", explanation: "Deficits -2 & -4 -> 48" },
      { id: 6, expression: "7 × 6", correctAnswer: 42, conceptTag: "(7-4) | (-3 x -4) = 3 | 12 -> 42", explanation: "Deficits -3 & -4 -> 42" },
      { id: 7, expression: "9 × 9", correctAnswer: 81, conceptTag: "(9-1) | (-1 x -1) = 8 | 1", explanation: "Deficits -1 & -1 -> 81" },
      { id: 8, expression: "8 × 8", correctAnswer: 64, conceptTag: "(8-2) | (-2 x -2) = 6 | 4", explanation: "Deficits -2 & -2 -> 64" },
      { id: 9, expression: "9 × 5", correctAnswer: 45, conceptTag: "(9-5) | (-1 x -5) = 4 | 5", explanation: "Deficits -1 & -5 -> 45" },
      { id: 10, expression: "8 × 5", correctAnswer: 40, conceptTag: "(8-5) | (-2 x -5) = 3 | 10 -> 40", explanation: "Deficits -2 & -5 -> 40" },
    ]
  },
  {
    id: "svm4-base-below-20-90",
    title: "SVM-4: Base Method Multiplication - Below Base 20-90",
    category: "vedic",
    level: "SVM-4",
    topic: "Base Method Multiplication - Below Base 20-90",
    description: "Vedic Nikhilam sub-base multiplication for working bases 20, 30, 40...90.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "48 × 47", correctAnswer: 2256, conceptTag: "Base 50: 5 x (48-3) | (-2 x -3) = 225 | 6", explanation: "5 x 45 = 225, 2x3=6 -> 2256" },
      { id: 2, expression: "18 × 17", correctAnswer: 306, conceptTag: "Base 20: 2 x (18-3) | (-2 x -3) = 30 | 6", explanation: "2 x 15 = 30, 2x3=6 -> 306" },
      { id: 3, expression: "29 × 28", correctAnswer: 812, conceptTag: "Base 30: 3 x (29-2) | (-1 x -2) = 81 | 2", explanation: "3 x 27 = 81, 1x2=2 -> 812" },
      { id: 4, expression: "38 × 37", correctAnswer: 1406, conceptTag: "Base 40: 4 x (38-3) | (-2 x -3) = 140 | 6", explanation: "4 x 35 = 140, 2x3=6 -> 1406" },
      { id: 5, expression: "59 × 58", correctAnswer: 3422, conceptTag: "Base 60: 6 x (59-2) | (-1 x -2) = 342 | 2", explanation: "6 x 57 = 342, 1x2=2 -> 3422" },
      { id: 6, expression: "68 × 67", correctAnswer: 4556, conceptTag: "Base 70: 7 x (68-3) | (-2 x -3) = 455 | 6", explanation: "7 x 65 = 455, 2x3=6 -> 4556" },
      { id: 7, expression: "79 × 78", correctAnswer: 6162, conceptTag: "Base 80: 8 x (79-2) | (-1 x -2) = 616 | 2", explanation: "8 x 77 = 616, 1x2=2 -> 6162" },
      { id: 8, expression: "88 × 87", correctAnswer: 7656, conceptTag: "Base 90: 9 x (88-3) | (-2 x -3) = 765 | 6", explanation: "9 x 85 = 765, 2x3=6 -> 7656" },
      { id: 9, expression: "49 × 48", correctAnswer: 2352, conceptTag: "Base 50: 5 x (49-2) | (-1 x -2) = 235 | 2", explanation: "5 x 47 = 235, 1x2=2 -> 2352" },
      { id: 10, expression: "39 × 38", correctAnswer: 1482, conceptTag: "Base 40: 4 x (39-2) | (-1 x -2) = 148 | 2", explanation: "4 x 37 = 148, 1x2=2 -> 1482" },
    ]
  },
  {
    id: "svm4-base-below-100",
    title: "SVM-4: Base Method Multiplication - Below Base 100",
    category: "vedic",
    level: "SVM-4",
    topic: "Base Method Multiplication - Below Base 100",
    description: "Vedic Nikhilam multiplication for numbers below base 100.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "96 × 93", correctAnswer: 8928, conceptTag: "(96-7) | (-4 x -7) = 89 | 28", explanation: "96 - 7 = 89, 4 x 7 = 28 -> 8928" },
      { id: 2, expression: "97 × 94", correctAnswer: 9118, conceptTag: "(97-6) | (-3 x -6) = 91 | 18", explanation: "97 - 6 = 91, 3 x 6 = 18 -> 9118" },
      { id: 3, expression: "98 × 95", correctAnswer: 9310, conceptTag: "(98-5) | (-2 x -5) = 93 | 10", explanation: "98 - 5 = 93, 2 x 5 = 10 -> 9310" },
      { id: 4, expression: "99 × 92", correctAnswer: 9108, conceptTag: "(99-8) | (-1 x -8) = 91 | 08", explanation: "99 - 8 = 91, 1 x 8 = 08 -> 9108" },
      { id: 5, expression: "95 × 91", correctAnswer: 8645, conceptTag: "(95-9) | (-5 x -9) = 86 | 45", explanation: "95 - 9 = 86, 5 x 9 = 45 -> 8645" },
      { id: 6, expression: "94 × 92", correctAnswer: 8648, conceptTag: "(94-8) | (-6 x -8) = 86 | 48", explanation: "94 - 8 = 86, 6 x 8 = 48 -> 8648" },
      { id: 7, expression: "97 × 97", correctAnswer: 9409, conceptTag: "(97-3) | (-3 x -3) = 94 | 09", explanation: "97 - 3 = 94, 3 x 3 = 09 -> 9409" },
      { id: 8, expression: "98 × 98", correctAnswer: 9604, conceptTag: "(98-2) | (-2 x -2) = 96 | 04", explanation: "98 - 2 = 96, 2 x 2 = 04 -> 9604" },
      { id: 9, expression: "96 × 96", correctAnswer: 9216, conceptTag: "(96-4) | (-4 x -4) = 92 | 16", explanation: "96 - 4 = 92, 4 x 4 = 16 -> 9216" },
      { id: 10, expression: "95 × 95", correctAnswer: 9025, conceptTag: "(95-5) | (-5 x -5) = 90 | 25", explanation: "95 - 5 = 90, 5 x 5 = 25 -> 9025" },
    ]
  },
  {
    id: "svm4-base-below-200-900",
    title: "SVM-4: Base Method Multiplication - Below Base 200-900",
    category: "vedic",
    level: "SVM-4",
    topic: "Base Method Multiplication - Below Base 200-900",
    description: "Vedic Nikhilam sub-base multiplication for working bases 200, 300...900.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "196 × 195", correctAnswer: 38220, conceptTag: "Base 200: 2 x (196-5) | (4x5) = 382 | 20", explanation: "2 x 191 = 382, 4x5=20 -> 38220" },
      { id: 2, expression: "297 × 296", correctAnswer: 87912, conceptTag: "Base 300: 3 x (297-4) | (3x4) = 879 | 12", explanation: "3 x 293 = 879, 3x4=12 -> 87912" },
      { id: 3, expression: "398 × 395", correctAnswer: 157210, conceptTag: "Base 400: 4 x (398-5) | (2x5) = 1572 | 10", explanation: "4 x 393 = 1572, 2x5=10 -> 157210" },
      { id: 4, expression: "496 × 494", correctAnswer: 245024, conceptTag: "Base 500: 5 x (496-6) | (4x6) = 2450 | 24", explanation: "5 x 490 = 2450, 4x6=24 -> 245024" },
      { id: 5, expression: "597 × 595", correctAnswer: 355215, conceptTag: "Base 600: 6 x (597-5) | (3x5) = 3552 | 15", explanation: "6 x 592 = 3552, 3x5=15 -> 355215" },
      { id: 6, expression: "698 × 696", correctAnswer: 485808, conceptTag: "Base 700: 7 x (698-4) | (2x4) = 4858 | 08", explanation: "7 x 694 = 4858, 2x4=08 -> 485808" },
      { id: 7, expression: "796 × 795", correctAnswer: 632820, conceptTag: "Base 800: 8 x (796-5) | (4x5) = 6328 | 20", explanation: "8 x 791 = 6328, 4x5=20 -> 632820" },
      { id: 8, expression: "898 × 897", correctAnswer: 805506, conceptTag: "Base 900: 9 x (898-3) | (2x3) = 8055 | 06", explanation: "9 x 895 = 8055, 2x3=06 -> 805506" },
      { id: 9, expression: "198 × 197", correctAnswer: 39006, conceptTag: "Base 200: 2 x (198-3) | (2x3) = 390 | 06", explanation: "2 x 195 = 390, 2x3=06 -> 39006" },
      { id: 10, expression: "298 × 295", correctAnswer: 87910, conceptTag: "Base 300: 3 x (298-5) | (2x5) = 879 | 10", explanation: "3 x 293 = 879, 2x5=10 -> 87910" },
    ]
  },
  {
    id: "svm4-base-above-10",
    title: "SVM-4: Base Method Multiplication - Above Base 10",
    category: "vedic",
    level: "SVM-4",
    topic: "Base Method Multiplication - Above Base 10",
    description: "Vedic Nikhilam multiplication for numbers above base 10 (surpluses).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "13 × 14", correctAnswer: 182, conceptTag: "(13+4) | (3 x 4) = 17 | 12 -> 182", explanation: "17 | 12 -> 182" },
      { id: 2, expression: "12 × 13", correctAnswer: 156, conceptTag: "(12+3) | (2 x 3) = 15 | 6", explanation: "15 | 6 = 156" },
      { id: 3, expression: "14 × 15", correctAnswer: 210, conceptTag: "(14+5) | (4 x 5) = 19 | 20 -> 210", explanation: "19 | 20 -> 210" },
      { id: 4, expression: "11 × 16", correctAnswer: 176, conceptTag: "(11+6) | (1 x 6) = 17 | 6", explanation: "17 | 6 = 176" },
      { id: 5, expression: "12 × 17", correctAnswer: 204, conceptTag: "(12+7) | (2 x 7) = 19 | 14 -> 204", explanation: "19 | 14 -> 204" },
      { id: 6, expression: "13 × 18", correctAnswer: 234, conceptTag: "(13+8) | (3 x 8) = 21 | 24 -> 234", explanation: "21 | 24 -> 234" },
      { id: 7, expression: "14 × 16", correctAnswer: 224, conceptTag: "(14+6) | (4 x 6) = 20 | 24 -> 224", explanation: "20 | 24 -> 224" },
      { id: 8, expression: "15 × 15", correctAnswer: 225, conceptTag: "(15+5) | (5 x 5) = 20 | 25 -> 225", explanation: "20 | 25 -> 225" },
      { id: 9, expression: "12 × 19", correctAnswer: 228, conceptTag: "(12+9) | (2 x 9) = 21 | 18 -> 228", explanation: "21 | 18 -> 228" },
      { id: 10, expression: "13 × 13", correctAnswer: 169, conceptTag: "(13+3) | (3 x 3) = 16 | 9", explanation: "16 | 9 = 169" },
    ]
  },
  {
    id: "svm4-base-above-20-90",
    title: "SVM-4: Base Method Multiplication - Above Base 20-90",
    category: "vedic",
    level: "SVM-4",
    topic: "Base Method Multiplication - Above Base 20-90",
    description: "Vedic Nikhilam sub-base multiplication for numbers above working bases 20, 30...90.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "53 × 54", correctAnswer: 2862, conceptTag: "Base 50: 5 x (53+4) | (3x4) = 285 | 12 -> 2862", explanation: "5 x 57 = 285, 3x4=12 -> 2862" },
      { id: 2, expression: "22 × 23", correctAnswer: 506, conceptTag: "Base 20: 2 x (22+3) | (2x3) = 50 | 6", explanation: "2 x 25 = 50, 2x3=6 -> 506" },
      { id: 3, expression: "31 × 34", correctAnswer: 1054, conceptTag: "Base 30: 3 x (31+4) | (1x4) = 105 | 4", explanation: "3 x 35 = 105, 1x4=4 -> 1054" },
      { id: 4, expression: "42 × 43", correctAnswer: 1806, conceptTag: "Base 40: 4 x (42+3) | (2x3) = 180 | 6", explanation: "4 x 45 = 180, 2x3=6 -> 1806" },
      { id: 5, expression: "62 × 63", correctAnswer: 3906, conceptTag: "Base 60: 6 x (62+3) | (2x3) = 390 | 6", explanation: "6 x 65 = 390, 2x3=6 -> 3906" },
      { id: 6, expression: "71 × 74", correctAnswer: 5254, conceptTag: "Base 70: 7 x (71+4) | (1x4) = 525 | 4", explanation: "7 x 75 = 525, 1x4=4 -> 5254" },
      { id: 7, expression: "82 × 83", correctAnswer: 6806, conceptTag: "Base 80: 8 x (82+3) | (2x3) = 680 | 6", explanation: "8 x 85 = 680, 2x3=6 -> 6806" },
      { id: 8, expression: "91 × 94", correctAnswer: 8554, conceptTag: "Base 90: 9 x (91+4) | (1x4) = 855 | 4", explanation: "9 x 95 = 855, 1x4=4 -> 8554" },
      { id: 9, expression: "51 × 56", correctAnswer: 2856, conceptTag: "Base 50: 5 x (51+6) | (1x6) = 285 | 6", explanation: "5 x 57 = 285, 1x6=6 -> 2856" },
      { id: 10, expression: "41 × 45", correctAnswer: 1845, conceptTag: "Base 40: 4 x (41+5) | (1x5) = 184 | 5", explanation: "4 x 46 = 184, 1x5=5 -> 1845" },
    ]
  },
  {
    id: "svm4-base-above-100",
    title: "SVM-4: Base Method Multiplication - Above Base 100",
    category: "vedic",
    level: "SVM-4",
    topic: "Base Method Multiplication - Above Base 100",
    description: "Vedic Nikhilam multiplication for numbers above base 100.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "108 × 107", correctAnswer: 11556, conceptTag: "(108+7) | (8 x 7) = 115 | 56", explanation: "108 + 7 = 115, 8 x 7 = 56 -> 11556" },
      { id: 2, expression: "104 × 105", correctAnswer: 10920, conceptTag: "(104+5) | (4 x 5) = 109 | 20", explanation: "104 + 5 = 109, 4 x 5 = 20 -> 10920" },
      { id: 3, expression: "103 × 106", correctAnswer: 10918, conceptTag: "(103+6) | (3 x 6) = 109 | 18", explanation: "103 + 6 = 109, 3 x 6 = 18 -> 10918" },
      { id: 4, expression: "102 × 109", correctAnswer: 11118, conceptTag: "(102+9) | (2 x 9) = 111 | 18", explanation: "102 + 9 = 111, 2 x 9 = 18 -> 11118" },
      { id: 5, expression: "107 × 109", correctAnswer: 11663, conceptTag: "(107+9) | (7 x 9) = 116 | 63", explanation: "107 + 9 = 116, 7 x 9 = 63 -> 11663" },
      { id: 6, expression: "106 × 108", correctAnswer: 11448, conceptTag: "(106+8) | (6 x 8) = 114 | 48", explanation: "106 + 8 = 114, 6 x 8 = 48 -> 11448" },
      { id: 7, expression: "103 × 103", correctAnswer: 10609, conceptTag: "(103+3) | (3 x 3) = 106 | 09", explanation: "103 + 3 = 106, 3 x 3 = 09 -> 10609" },
      { id: 8, expression: "105 × 105", correctAnswer: 11025, conceptTag: "(105+5) | (5 x 5) = 110 | 25", explanation: "105 + 5 = 110, 5 x 5 = 25 -> 11025" },
      { id: 9, expression: "112 × 104", correctAnswer: 11648, conceptTag: "(112+4) | (12 x 4) = 116 | 48", explanation: "112 + 4 = 116, 12 x 4 = 48 -> 11648" },
      { id: 10, expression: "115 × 103", correctAnswer: 11845, conceptTag: "(115+3) | (15 x 3) = 118 | 45", explanation: "115 + 3 = 118, 15 x 3 = 45 -> 11845" },
    ]
  },
  {
    id: "svm4-base-above-200-900",
    title: "SVM-4: Base Method Multiplication - Above Base 200-900",
    category: "vedic",
    level: "SVM-4",
    topic: "Base Method Multiplication - Above Base 200-900",
    description: "Vedic Nikhilam sub-base multiplication for numbers above working bases 200, 300...900.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "206 × 208", correctAnswer: 42848, conceptTag: "Base 200: 2 x (206+8) | (6x8) = 428 | 48", explanation: "2 x 214 = 428, 6x8=48 -> 42848" },
      { id: 2, expression: "304 × 305", correctAnswer: 92720, conceptTag: "Base 300: 3 x (304+5) | (4x5) = 927 | 20", explanation: "3 x 309 = 927, 4x5=20 -> 92720" },
      { id: 3, expression: "403 × 406", correctAnswer: 163618, conceptTag: "Base 400: 4 x (403+6) | (3x6) = 1636 | 18", explanation: "4 x 409 = 1636, 3x6=18 -> 163618" },
      { id: 4, expression: "502 × 507", correctAnswer: 254514, conceptTag: "Base 500: 5 x (502+7) | (2x7) = 2545 | 14", explanation: "5 x 509 = 2545, 2x7=14 -> 254514" },
      { id: 5, expression: "605 × 606", correctAnswer: 366630, conceptTag: "Base 600: 6 x (605+6) | (5x6) = 3666 | 30", explanation: "6 x 611 = 3666, 5x6=30 -> 366630" },
      { id: 6, expression: "704 × 708", correctAnswer: 498432, conceptTag: "Base 700: 7 x (704+8) | (4x8) = 4984 | 32", explanation: "7 x 712 = 4984, 4x8=32 -> 498432" },
      { id: 7, expression: "803 × 809", correctAnswer: 649627, conceptTag: "Base 800: 8 x (803+9) | (3x9) = 6496 | 27", explanation: "8 x 812 = 6496, 3x9=27 -> 649627" },
      { id: 8, expression: "902 × 905", correctAnswer: 816310, conceptTag: "Base 900: 9 x (902+5) | (2x5) = 8163 | 10", explanation: "9 x 907 = 8163, 2x5=10 -> 816310" },
      { id: 9, expression: "205 × 205", correctAnswer: 42025, conceptTag: "Base 200: 2 x (205+5) | (5x5) = 420 | 25", explanation: "2 x 210 = 420, 5x5=25 -> 42025" },
      { id: 10, expression: "302 × 308", correctAnswer: 93016, conceptTag: "Base 300: 3 x (302+8) | (2x8) = 930 | 16", explanation: "3 x 310 = 930, 2x8=16 -> 93016" },
    ]
  },
  {
    id: "svm4-base-mixed",
    title: "SVM-4: Base method when one number is above & other is below the same base",
    category: "vedic",
    level: "SVM-4",
    topic: "Base method when one number is above & other is below the same base",
    description: "Vedic mixed Nikhilam method with surplus (+s) and deficit (-d).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "104 × 97", correctAnswer: 10088, conceptTag: "100 + 4, 100 - 3 -> 10100 - 12 = 10088", explanation: "101 x 100 - 12 = 10088" },
      { id: 2, expression: "105 × 96", correctAnswer: 10080, conceptTag: "100 + 5, 100 - 4 -> 10100 - 20 = 10080", explanation: "101 x 100 - 20 = 10080" },
      { id: 3, expression: "108 × 95", correctAnswer: 10260, conceptTag: "100 + 8, 100 - 5 -> 10300 - 40 = 10260", explanation: "103 x 100 - 40 = 10260" },
      { id: 4, expression: "103 × 98", correctAnswer: 10094, conceptTag: "100 + 3, 100 - 2 -> 10100 - 6 = 10094", explanation: "101 x 100 - 6 = 10094" },
      { id: 5, expression: "106 × 94", correctAnswer: 9964, conceptTag: "100 + 6, 100 - 6 -> 10000 - 36 = 9964", explanation: "100 x 100 - 36 = 9964" },
      { id: 6, expression: "107 × 93", correctAnswer: 9951, conceptTag: "100 + 7, 100 - 7 -> 10000 - 49 = 9951", explanation: "100 x 100 - 49 = 9951" },
      { id: 7, expression: "12 × 9", correctAnswer: 108, conceptTag: "10 + 2, 10 - 1 -> 110 - 2 = 108", explanation: "11 x 10 - 2 = 108" },
      { id: 8, expression: "14 × 8", correctAnswer: 112, conceptTag: "10 + 4, 10 - 2 -> 120 - 8 = 112", explanation: "12 x 10 - 8 = 112" },
      { id: 9, expression: "15 × 7", correctAnswer: 105, conceptTag: "10 + 5, 10 - 3 -> 120 - 15 = 105", explanation: "12 x 10 - 15 = 105" },
      { id: 10, expression: "102 × 95", correctAnswer: 9690, conceptTag: "100 + 2, 100 - 5 -> 9700 - 10 = 9690", explanation: "97 x 100 - 10 = 9690" },
    ]
  },
  {
    id: "svm4-base-diff-below",
    title: "SVM-4: When Bases are different but both numbers are below base",
    category: "vedic",
    level: "SVM-4",
    topic: "When Bases are different but both numbers are below base",
    description: "Vedic Nikhilam ratio multiplication when bases differ (e.g., Base 10 & Base 100).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "98 × 980", correctAnswer: 96040, conceptTag: "Ratio 10: 980 - 20 = 960 -> 96040", explanation: "96040" },
      { id: 2, expression: "97 × 970", correctAnswer: 94090, conceptTag: "Ratio 10: 970 - 30 = 940 -> 94090", explanation: "94090" },
      { id: 3, expression: "96 × 960", correctAnswer: 92160, conceptTag: "Ratio 10: 960 - 40 = 920 -> 92160", explanation: "92160" },
      { id: 4, expression: "95 × 950", correctAnswer: 90250, conceptTag: "Ratio 10: 950 - 50 = 900 -> 90250", explanation: "90250" },
      { id: 5, expression: "8 × 98", correctAnswer: 784, conceptTag: "Base 10 & 100 ratio: 8 x 98 = 784", explanation: "784" },
      { id: 6, expression: "9 × 97", correctAnswer: 873, conceptTag: "Base 10 & 100 ratio: 9 x 97 = 873", explanation: "873" },
      { id: 7, expression: "7 × 96", correctAnswer: 672, conceptTag: "Base 10 & 100 ratio: 7 x 96 = 672", explanation: "672" },
      { id: 8, expression: "6 × 95", correctAnswer: 570, conceptTag: "Base 10 & 100 ratio: 6 x 95 = 570", explanation: "570" },
      { id: 9, expression: "99 × 990", correctAnswer: 98010, conceptTag: "Ratio 10: 990 - 10 = 980 -> 98010", explanation: "98010" },
      { id: 10, expression: "94 × 940", correctAnswer: 88360, conceptTag: "Ratio 10: 940 - 60 = 880 -> 88360", explanation: "88360" },
    ]
  },
  {
    id: "svm4-base-diff-above",
    title: "SVM-4: When Bases are different but both numbers are above base",
    category: "vedic",
    level: "SVM-4",
    topic: "When Bases are different but both numbers are above base",
    description: "Vedic Nikhilam ratio multiplication when bases differ above base (e.g., 102 x 1030).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "102 × 1030", correctAnswer: 105060, conceptTag: "Ratio 10: 1030 + 20 = 1050 -> 105060", explanation: "105060" },
      { id: 2, expression: "104 × 1020", correctAnswer: 106080, conceptTag: "Ratio 10: 1020 + 40 = 1060 -> 106080", explanation: "106080" },
      { id: 3, expression: "105 × 1010", correctAnswer: 106050, conceptTag: "Ratio 10: 1010 + 50 = 1060 -> 106050", explanation: "106050" },
      { id: 4, expression: "103 × 1040", correctAnswer: 107120, conceptTag: "Ratio 10: 1040 + 30 = 1070 -> 107120", explanation: "107120" },
      { id: 5, expression: "12 × 104", correctAnswer: 1248, conceptTag: "Base 10 & 100 ratio: 12 x 104 = 1248", explanation: "1248" },
      { id: 6, expression: "13 × 105", correctAnswer: 1365, conceptTag: "Base 10 & 100 ratio: 13 x 105 = 1365", explanation: "1365" },
      { id: 7, expression: "14 × 102", correctAnswer: 1428, conceptTag: "Base 10 & 100 ratio: 14 x 102 = 1428", explanation: "1428" },
      { id: 8, expression: "15 × 103", correctAnswer: 1545, conceptTag: "Base 10 & 100 ratio: 15 x 103 = 1545", explanation: "1545" },
      { id: 9, expression: "106 × 1020", correctAnswer: 108120, conceptTag: "Ratio 10: 1020 + 60 = 1080 -> 108120", explanation: "108120" },
      { id: 10, expression: "108 × 1010", correctAnswer: 109080, conceptTag: "Ratio 10: 1010 + 80 = 1090 -> 109080", explanation: "109080" },
    ]
  },
  {
    id: "svm4-special-unit-10",
    title: "SVM-4: If the sum of unit digits is 10 and rest place digits are same",
    category: "vedic",
    level: "SVM-4",
    topic: "If the sum of unit digits is 10 and rest place digits are same",
    description: "Vedic Antyayordashake'pi Sutra: (A x (A+1)) | (U1 x U2).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "73 × 77", correctAnswer: 5621, conceptTag: "(7x8) | (3x7) = 56 | 21", explanation: "7x8=56, 3x7=21 -> 5621" },
      { id: 2, expression: "43 × 47", correctAnswer: 2021, conceptTag: "(4x5) | (3x7) = 20 | 21", explanation: "4x5=20, 3x7=21 -> 2021" },
      { id: 3, expression: "62 × 68", correctAnswer: 4216, conceptTag: "(6x7) | (2x8) = 42 | 16", explanation: "6x7=42, 2x8=16 -> 4216" },
      { id: 4, expression: "81 × 89", correctAnswer: 7209, conceptTag: "(8x9) | (1x9) = 72 | 09", explanation: "8x9=72, 1x9=09 -> 7209" },
      { id: 5, expression: "35 × 35", correctAnswer: 1225, conceptTag: "(3x4) | (5x5) = 12 | 25", explanation: "3x4=12, 5x5=25 -> 1225" },
      { id: 6, expression: "74 × 76", correctAnswer: 5624, conceptTag: "(7x8) | (4x6) = 56 | 24", explanation: "7x8=56, 4x6=24 -> 5624" },
      { id: 7, expression: "93 × 97", correctAnswer: 9021, conceptTag: "(9x10) | (3x7) = 90 | 21", explanation: "9x10=90, 3x7=21 -> 9021" },
      { id: 8, expression: "52 × 58", correctAnswer: 3016, conceptTag: "(5x6) | (2x8) = 30 | 16", explanation: "5x6=30, 2x8=16 -> 3016" },
      { id: 9, expression: "113 × 117", correctAnswer: 13221, conceptTag: "(11x12) | (3x7) = 132 | 21", explanation: "11x12=132, 3x7=21 -> 13221" },
      { id: 10, expression: "24 × 26", correctAnswer: 624, conceptTag: "(2x3) | (4x6) = 6 | 24", explanation: "2x3=6, 4x6=24 -> 624" },
    ]
  },
  {
    id: "svm4-special-tens-10",
    title: "SVM-4: If the sum of ten's place digit is 10 and one's place digits are same",
    category: "vedic",
    level: "SVM-4",
    topic: "If the sum of ten's place digit is 10 and one's place digits are same",
    description: "Vedic reverse special sutra: (T1 x T2 + U) | (U x U).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "36 × 76", correctAnswer: 2736, conceptTag: "(3x7 + 6) | (6x6) = 27 | 36", explanation: "21+6=27, 6x6=36 -> 2736" },
      { id: 2, expression: "46 × 66", correctAnswer: 3036, conceptTag: "(4x6 + 6) | (6x6) = 30 | 36", explanation: "24+6=30, 6x6=36 -> 3036" },
      { id: 3, expression: "37 × 77", correctAnswer: 2849, conceptTag: "(3x7 + 7) | (7x7) = 28 | 49", explanation: "21+7=28, 7x7=49 -> 2849" },
      { id: 4, expression: "28 × 88", correctAnswer: 2464, conceptTag: "(2x8 + 8) | (8x8) = 24 | 64", explanation: "16+8=24, 8x8=64 -> 2464" },
      { id: 5, expression: "15 × 95", correctAnswer: 1425, conceptTag: "(1x9 + 5) | (5x5) = 14 | 25", explanation: "9+5=14, 5x5=25 -> 1425" },
      { id: 6, expression: "54 × 54", correctAnswer: 2916, conceptTag: "(5x5 + 4) | (4x4) = 29 | 16", explanation: "25+4=29, 4x4=16 -> 2916" },
      { id: 7, expression: "63 × 43", correctAnswer: 2709, conceptTag: "(6x4 + 3) | (3x3) = 27 | 09", explanation: "24+3=27, 3x3=09 -> 2709" },
      { id: 8, expression: "72 × 32", correctAnswer: 2304, conceptTag: "(7x3 + 2) | (2x2) = 23 | 04", explanation: "21+2=23, 2x2=04 -> 2304" },
      { id: 9, expression: "81 × 21", correctAnswer: 1701, conceptTag: "(8x2 + 1) | (1x1) = 17 | 01", explanation: "16+1=17, 1x1=01 -> 1701" },
      { id: 10, expression: "48 × 68", correctAnswer: 3264, conceptTag: "(4x6 + 8) | (8x8) = 32 | 64", explanation: "24+8=32, 8x8=64 -> 3264" },
    ]
  },
  {
    id: "svm4-mult-9",
    title: "SVM-4: Multiplication by 9",
    category: "vedic",
    level: "SVM-4",
    topic: "Multiplication by 9",
    description: "Instant multiplication by 9 using Ekanyunena or (N x 10) - N.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "86 × 9", correctAnswer: 774, conceptTag: "860 - 86 = 774", explanation: "860 - 86 = 774" },
      { id: 2, expression: "74 × 9", correctAnswer: 666, conceptTag: "740 - 74 = 666", explanation: "740 - 74 = 666" },
      { id: 3, expression: "48 × 9", correctAnswer: 432, conceptTag: "480 - 48 = 432", explanation: "480 - 48 = 432" },
      { id: 4, expression: "85 × 9", correctAnswer: 765, conceptTag: "850 - 85 = 765", explanation: "850 - 85 = 765" },
      { id: 5, expression: "93 × 9", correctAnswer: 837, conceptTag: "930 - 93 = 837", explanation: "930 - 93 = 837" },
      { id: 6, expression: "126 × 9", correctAnswer: 1134, conceptTag: "1260 - 126 = 1134", explanation: "1260 - 126 = 1134" },
      { id: 7, expression: "245 × 9", correctAnswer: 2205, conceptTag: "2450 - 245 = 2205", explanation: "2450 - 245 = 2205" },
      { id: 8, expression: "378 × 9", correctAnswer: 3402, conceptTag: "3780 - 378 = 3402", explanation: "3780 - 378 = 3402" },
      { id: 9, expression: "469 × 9", correctAnswer: 4221, conceptTag: "4690 - 469 = 4221", explanation: "4690 - 469 = 4221" },
      { id: 10, expression: "582 × 9", correctAnswer: 5238, conceptTag: "5820 - 582 = 5238", explanation: "5820 - 582 = 5238" },
    ]
  },
  {
    id: "svm4-mult-end-9",
    title: "SVM-4: Multiplication of Number Ending with 9 i.e. 19- 99",
    category: "vedic",
    level: "SVM-4",
    topic: "Multiplication of Number Ending with 9 i.e. 19- 99",
    description: "Vedic base scaling shortcut for 19, 29, 39, 49, 59, 69, 79, 89, 99.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "42 × 39", correctAnswer: 1638, conceptTag: "(42 x 40) - 42", explanation: "1680 - 42 = 1638" },
      { id: 2, expression: "34 × 29", correctAnswer: 986, conceptTag: "(34 x 30) - 34", explanation: "1020 - 34 = 986" },
      { id: 3, expression: "25 × 19", correctAnswer: 475, conceptTag: "(25 x 20) - 25", explanation: "500 - 25 = 475" },
      { id: 4, expression: "18 × 49", correctAnswer: 882, conceptTag: "(18 x 50) - 18", explanation: "900 - 18 = 882" },
      { id: 5, expression: "35 × 59", correctAnswer: 2065, conceptTag: "(35 x 60) - 35", explanation: "2100 - 35 = 2065" },
      { id: 6, expression: "24 × 69", correctAnswer: 1656, conceptTag: "(24 x 70) - 24", explanation: "1680 - 24 = 1656" },
      { id: 7, expression: "16 × 79", correctAnswer: 1264, conceptTag: "(16 x 80) - 16", explanation: "1280 - 16 = 1264" },
      { id: 8, expression: "28 × 89", correctAnswer: 2492, conceptTag: "(28 x 90) - 28", explanation: "2520 - 28 = 2492" },
      { id: 9, expression: "45 × 99", correctAnswer: 4455, conceptTag: "(45 x 100) - 45", explanation: "4500 - 45 = 4455" },
      { id: 10, expression: "62 × 39", correctAnswer: 2418, conceptTag: "(62 x 40) - 62", explanation: "2480 - 62 = 2418" },
    ]
  },
  {
    id: "svm4-mult-2x2-general",
    title: "SVM-4: General Method (2 digit x 2 digit)",
    category: "vedic",
    level: "SVM-4",
    topic: "General Method (2 digit x 2 digit)",
    description: "Vedic Urdhva Tiryagbhyam (Vertically and Crosswise) for 2D x 2D.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "54 × 36", correctAnswer: 1944, conceptTag: "(5x3) | (5x6 + 4x3) | (4x6)", explanation: "15 | 42 | 24 -> 1944" },
      { id: 2, expression: "23 × 45", correctAnswer: 1035, conceptTag: "(2x4) | (2x5 + 3x4) | (3x5)", explanation: "8 | 22 | 15 -> 1035" },
      { id: 3, expression: "34 × 26", correctAnswer: 884, conceptTag: "(3x2) | (3x6 + 4x2) | (4x6)", explanation: "6 | 26 | 24 -> 884" },
      { id: 4, expression: "42 × 31", correctAnswer: 1302, conceptTag: "(4x3) | (4x1 + 2x3) | (2x1)", explanation: "12 | 10 | 2 -> 1302" },
      { id: 5, expression: "53 × 24", correctAnswer: 1272, conceptTag: "(5x2) | (5x4 + 3x2) | (3x4)", explanation: "10 | 26 | 12 -> 1272" },
      { id: 6, expression: "61 × 35", correctAnswer: 2135, conceptTag: "(6x3) | (6x5 + 1x3) | (1x5)", explanation: "18 | 33 | 5 -> 2135" },
      { id: 7, expression: "72 × 43", correctAnswer: 3096, conceptTag: "(7x4) | (7x3 + 2x4) | (2x3)", explanation: "28 | 29 | 6 -> 3096" },
      { id: 8, expression: "84 × 15", correctAnswer: 1260, conceptTag: "(8x1) | (8x5 + 4x1) | (4x5)", explanation: "8 | 44 | 20 -> 1260" },
      { id: 9, expression: "92 × 27", correctAnswer: 2484, conceptTag: "(9x2) | (9x7 + 2x2) | (2x7)", explanation: "18 | 67 | 14 -> 2484" },
      { id: 10, expression: "47 × 63", correctAnswer: 2961, conceptTag: "(4x6) | (4x3 + 7x6) | (7x3)", explanation: "24 | 54 | 21 -> 2961" },
    ]
  },
  {
    id: "vedic-svm4-overall",
    title: "SVM-4-Overall (Comprehensive Level Master Quiz)",
    category: "vedic",
    level: "SVM-4",
    topic: "16. SVM-4-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all Senior Vedic Math Level 4 topics: Advanced Multiplication Suite.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "97 × 96", correctAnswer: 9312, conceptTag: "SVM-4 Overall" }
    ]
  },

  // ==========================================
  // SVM-3 LEVEL (Senior Vedic Math Level 3 - 24 Topics)
  // ==========================================
  {
    id: "svm3-mult-11",
    title: "SVM-3: Multiplication by 11",
    category: "vedic",
    level: "SVM-3",
    topic: "Multiplication by 11",
    description: "Vedic sandwich rule for 11 multiplication.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "43 × 11", correctAnswer: 473, conceptTag: "4 | (4+3) | 3 = 473", explanation: "4 | 7 | 3 = 473" },
      { id: 2, expression: "52 × 11", correctAnswer: 572, conceptTag: "5 | (5+2) | 2 = 572", explanation: "5 | 7 | 2 = 572" },
      { id: 3, expression: "68 × 11", correctAnswer: 748, conceptTag: "6 | (6+8) | 8 = 748", explanation: "6 | 14 | 8 -> 748" },
      { id: 4, expression: "84 × 11", correctAnswer: 924, conceptTag: "8 | (8+4) | 4 = 924", explanation: "8 | 12 | 4 -> 924" },
      { id: 5, expression: "123 × 11", correctAnswer: 1353, conceptTag: "1 | (1+2) | (2+3) | 3", explanation: "1 | 3 | 5 | 3 = 1353" },
      { id: 6, expression: "245 × 11", correctAnswer: 2695, conceptTag: "2 | (2+4) | (4+5) | 5", explanation: "2 | 6 | 9 | 5 = 2695" },
      { id: 7, expression: "378 × 11", correctAnswer: 4158, conceptTag: "3 | (3+7) | (7+8) | 8", explanation: "3 | 10 | 15 | 8 -> 4158" },
      { id: 8, expression: "462 × 11", correctAnswer: 5082, conceptTag: "4 | (4+6) | (6+2) | 2", explanation: "4 | 10 | 8 | 2 -> 5082" },
      { id: 9, expression: "591 × 11", correctAnswer: 6501, conceptTag: "5 | (5+9) | (9+1) | 1", explanation: "5 | 14 | 10 | 1 -> 6501" },
      { id: 10, expression: "726 × 11", correctAnswer: 7986, conceptTag: "7 | (7+2) | (2+6) | 6", explanation: "7 | 9 | 8 | 6 = 7986" },
    ]
  },
  {
    id: "svm3-mult-multiples-11",
    title: "SVM-3: Multiplication by Multiples of 11 ( 11,22,33,44......99)",
    category: "vedic",
    level: "SVM-3",
    topic: "Multiplication by Multiples of 11 ( 11,22,33,44......99)",
    description: "Multiply by 11 and scale by single-digit multiplier (22, 33, 44, 55, 66, 77, 88, 99).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "34 × 22", correctAnswer: 748, conceptTag: "(34 x 11) x 2 = 374 x 2", explanation: "374 x 2 = 748" },
      { id: 2, expression: "25 × 33", correctAnswer: 825, conceptTag: "(25 x 11) x 3 = 275 x 3", explanation: "275 x 3 = 825" },
      { id: 3, expression: "16 × 44", correctAnswer: 704, conceptTag: "(16 x 11) x 4 = 176 x 4", explanation: "176 x 4 = 704" },
      { id: 4, expression: "42 × 55", correctAnswer: 2310, conceptTag: "(42 x 11) x 5 = 462 x 5", explanation: "462 x 5 = 2310" },
      { id: 5, expression: "18 × 66", correctAnswer: 1188, conceptTag: "(18 x 11) x 6 = 198 x 6", explanation: "198 x 6 = 1188" },
      { id: 6, expression: "24 × 77", correctAnswer: 1848, conceptTag: "(24 x 11) x 7 = 264 x 7", explanation: "264 x 7 = 1848" },
      { id: 7, expression: "32 × 88", correctAnswer: 2816, conceptTag: "(32 x 11) x 8 = 352 x 8", explanation: "352 x 8 = 2816" },
      { id: 8, expression: "15 × 99", correctAnswer: 1485, conceptTag: "(15 x 11) x 9 = 165 x 9", explanation: "165 x 9 = 1485" },
      { id: 9, expression: "28 × 22", correctAnswer: 616, conceptTag: "(28 x 11) x 2 = 308 x 2", explanation: "308 x 2 = 616" },
      { id: 10, expression: "45 × 33", correctAnswer: 1485, conceptTag: "(45 x 11) x 3 = 495 x 3", explanation: "495 x 3 = 1485" },
    ]
  },
  {
    id: "svm3-mult-111",
    title: "SVM-3: Multiplication by 111",
    category: "vedic",
    level: "SVM-3",
    topic: "Multiplication by 111",
    description: "Vedic triple sandwich sum rule for 111.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "324 × 111", correctAnswer: 35964, conceptTag: "3 | (3+2) | (3+2+4) | (2+4) | 4", explanation: "3 | 5 | 9 | 6 | 4 = 35964" },
      { id: 2, expression: "123 × 111", correctAnswer: 13653, conceptTag: "1 | (1+2) | (1+2+3) | (2+3) | 3", explanation: "1 | 3 | 6 | 5 | 3 = 13653" },
      { id: 3, expression: "214 × 111", correctAnswer: 23754, conceptTag: "2 | (2+1) | (2+1+4) | (1+4) | 4", explanation: "2 | 3 | 7 | 5 | 4 = 23754" },
      { id: 4, expression: "412 × 111", correctAnswer: 45732, conceptTag: "4 | (4+1) | (4+1+2) | (1+2) | 2", explanation: "4 | 5 | 7 | 3 | 2 = 45732" },
      { id: 5, expression: "531 × 111", correctAnswer: 58941, conceptTag: "5 | (5+3) | (5+3+1) | (3+1) | 1", explanation: "5 | 8 | 9 | 4 | 1 = 58941" },
      { id: 6, expression: "142 × 111", correctAnswer: 15762, conceptTag: "1 | (1+4) | (1+4+2) | (4+2) | 2", explanation: "1 | 5 | 7 | 6 | 2 = 15762" },
      { id: 7, expression: "235 × 111", correctAnswer: 26085, conceptTag: "2 | (2+3) | (2+3+5) | (3+5) | 5", explanation: "2 | 5 | 10 | 8 | 5 -> 26085" },
      { id: 8, expression: "315 × 111", correctAnswer: 34965, conceptTag: "3 | (3+1) | (3+1+5) | (1+5) | 5", explanation: "3 | 4 | 9 | 6 | 5 = 34965" },
      { id: 9, expression: "421 × 111", correctAnswer: 46731, conceptTag: "4 | (4+2) | (4+2+1) | (2+1) | 1", explanation: "4 | 6 | 7 | 3 | 1 = 46731" },
      { id: 10, expression: "513 × 111", correctAnswer: 56943, conceptTag: "5 | (5+1) | (5+1+3) | (1+3) | 3", explanation: "5 | 6 | 9 | 4 | 3 = 56943" },
    ]
  },
  {
    id: "svm3-mult-multiples-111",
    title: "SVM-3: Multiplication by Multiples of 111 ( 111,222,333,444......999)",
    category: "vedic",
    level: "SVM-3",
    topic: "Multiplication by Multiples of 111 ( 111,222,333,444......999)",
    description: "Multiply by 111 and scale by single-digit multiplier.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "123 × 222", correctAnswer: 27306, conceptTag: "(123 x 111) x 2 = 13653 x 2", explanation: "13653 x 2 = 27306" },
      { id: 2, expression: "214 × 333", correctAnswer: 71262, conceptTag: "(214 x 111) x 3 = 23754 x 3", explanation: "23754 x 3 = 71262" },
      { id: 3, expression: "102 × 444", correctAnswer: 45288, conceptTag: "(102 x 111) x 4 = 11322 x 4", explanation: "11322 x 4 = 45288" },
      { id: 4, expression: "112 × 555", correctAnswer: 62160, conceptTag: "(112 x 111) x 5 = 12432 x 5", explanation: "12432 x 5 = 62160" },
      { id: 5, expression: "121 × 666", correctAnswer: 80586, conceptTag: "(121 x 111) x 6 = 13431 x 6", explanation: "13431 x 6 = 80586" },
      { id: 6, expression: "103 × 777", correctAnswer: 80031, conceptTag: "(103 x 111) x 7 = 11433 x 7", explanation: "11433 x 7 = 80031" },
      { id: 7, expression: "111 × 888", correctAnswer: 98568, conceptTag: "(111 x 111) x 8 = 12321 x 8", explanation: "12321 x 8 = 98568" },
      { id: 8, expression: "105 × 999", correctAnswer: 104895, conceptTag: "(105 x 111) x 9 = 11655 x 9", explanation: "11655 x 9 = 104895" },
      { id: 9, expression: "132 × 222", correctAnswer: 29304, conceptTag: "(132 x 111) x 2 = 14652 x 2", explanation: "14652 x 2 = 29304" },
      { id: 10, expression: "203 × 333", correctAnswer: 67599, conceptTag: "(203 x 111) x 3 = 22533 x 3", explanation: "22533 x 3 = 67599" },
    ]
  },
  {
    id: "svm3-special-unit-10",
    title: "SVM-3: If the sum of the Unit Place digit is 10 and rest place Digits are same",
    category: "vedic",
    level: "SVM-3",
    topic: "If the sum of the Unit Place digit is 10 and rest place Digits are same",
    description: "Vedic Antyayordashake'pi Sutra: (A x (A+1)) | (U1 x U2).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "43 × 47", correctAnswer: 2021, conceptTag: "(4x5) | (3x7) = 20 | 21", explanation: "4x5=20, 3x7=21 -> 2021" },
      { id: 2, expression: "62 × 68", correctAnswer: 4216, conceptTag: "(6x7) | (2x8) = 42 | 16", explanation: "6x7=42, 2x8=16 -> 4216" },
      { id: 3, expression: "81 × 89", correctAnswer: 7209, conceptTag: "(8x9) | (1x9) = 72 | 09", explanation: "8x9=72, 1x9=09 -> 7209" },
      { id: 4, expression: "35 × 35", correctAnswer: 1225, conceptTag: "(3x4) | (5x5) = 12 | 25", explanation: "3x4=12, 5x5=25 -> 1225" },
      { id: 5, expression: "74 × 76", correctAnswer: 5624, conceptTag: "(7x8) | (4x6) = 56 | 24", explanation: "7x8=56, 4x6=24 -> 5624" },
      { id: 6, expression: "93 × 97", correctAnswer: 9021, conceptTag: "(9x10) | (3x7) = 90 | 21", explanation: "9x10=90, 3x7=21 -> 9021" },
      { id: 7, expression: "52 × 58", correctAnswer: 3016, conceptTag: "(5x6) | (2x8) = 30 | 16", explanation: "5x6=30, 2x8=16 -> 3016" },
      { id: 8, expression: "113 × 117", correctAnswer: 13221, conceptTag: "(11x12) | (3x7) = 132 | 21", explanation: "11x12=132, 3x7=21 -> 13221" },
      { id: 9, expression: "24 × 26", correctAnswer: 624, conceptTag: "(2x3) | (4x6) = 6 | 24", explanation: "2x3=6, 4x6=24 -> 624" },
      { id: 10, expression: "65 × 65", correctAnswer: 4225, conceptTag: "(6x7) | (5x5) = 42 | 25", explanation: "6x7=42, 5x5=25 -> 4225" },
    ]
  },
  {
    id: "svm3-special-tens-10",
    title: "SVM-3: If the sum of the Tens Place digit is 10 and Unit place Digits are same",
    category: "vedic",
    level: "SVM-3",
    topic: "If the sum of the Tens Place digit is 10 and Unit place Digits are same",
    description: "Vedic reverse special sutra: (T1 x T2 + U) | (U x U).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "46 × 66", correctAnswer: 3036, conceptTag: "(4x6 + 6) | (6x6) = 30 | 36", explanation: "24+6=30, 6x6=36 -> 3036" },
      { id: 2, expression: "37 × 77", correctAnswer: 2849, conceptTag: "(3x7 + 7) | (7x7) = 28 | 49", explanation: "21+7=28, 7x7=49 -> 2849" },
      { id: 3, expression: "28 × 88", correctAnswer: 2464, conceptTag: "(2x8 + 8) | (8x8) = 24 | 64", explanation: "16+8=24, 8x8=64 -> 2464" },
      { id: 4, expression: "15 × 95", correctAnswer: 1425, conceptTag: "(1x9 + 5) | (5x5) = 14 | 25", explanation: "9+5=14, 5x5=25 -> 1425" },
      { id: 5, expression: "54 × 54", correctAnswer: 2916, conceptTag: "(5x5 + 4) | (4x4) = 29 | 16", explanation: "25+4=29, 4x4=16 -> 2916" },
      { id: 6, expression: "63 × 43", correctAnswer: 2709, conceptTag: "(6x4 + 3) | (3x3) = 27 | 09", explanation: "24+3=27, 3x3=09 -> 2709" },
      { id: 7, expression: "72 × 32", correctAnswer: 2304, conceptTag: "(7x3 + 2) | (2x2) = 23 | 04", explanation: "21+2=23, 2x2=04 -> 2304" },
      { id: 8, expression: "81 × 21", correctAnswer: 1701, conceptTag: "(8x2 + 1) | (1x1) = 17 | 01", explanation: "16+1=17, 1x1=01 -> 1701" },
      { id: 9, expression: "96 × 16", correctAnswer: 1536, conceptTag: "(9x1 + 6) | (6x6) = 15 | 36", explanation: "9+6=15, 6x6=36 -> 1536" },
      { id: 10, expression: "48 × 68", correctAnswer: 3264, conceptTag: "(4x6 + 8) | (8x8) = 32 | 64", explanation: "24+8=32, 8x8=64 -> 3264" },
    ]
  },
  {
    id: "svm3-add-base",
    title: "SVM-3: Addition Base Method",
    category: "vedic",
    level: "SVM-3",
    topic: "Addition Base Method",
    description: "Vedic base rounding addition by rounding terms to 10 or 100.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "78 + 96", correctAnswer: 174, conceptTag: "80 + 100 - 6 = 174", explanation: "80 + 100 - 6 = 174" },
      { id: 2, expression: "89 + 47", correctAnswer: 136, conceptTag: "90 + 47 - 1 = 136", explanation: "90 + 47 - 1 = 136" },
      { id: 3, expression: "68 + 79", correctAnswer: 147, conceptTag: "68 + 80 - 1 = 147", explanation: "68 + 80 - 1 = 147" },
      { id: 4, expression: "98 + 56", correctAnswer: 154, conceptTag: "100 + 56 - 2 = 154", explanation: "100 + 56 - 2 = 154" },
      { id: 5, expression: "197 + 84", correctAnswer: 281, conceptTag: "200 + 84 - 3 = 281", explanation: "200 + 84 - 3 = 281" },
      { id: 6, expression: "298 + 145", correctAnswer: 443, conceptTag: "300 + 145 - 2 = 443", explanation: "300 + 145 - 2 = 443" },
      { id: 7, expression: "395 + 260", correctAnswer: 655, conceptTag: "400 + 260 - 5 = 655", explanation: "400 + 260 - 5 = 655" },
      { id: 8, expression: "499 + 382", correctAnswer: 881, conceptTag: "500 + 382 - 1 = 881", explanation: "500 + 382 - 1 = 881" },
      { id: 9, expression: "596 + 215", correctAnswer: 811, conceptTag: "600 + 215 - 4 = 811", explanation: "600 + 215 - 4 = 811" },
      { id: 10, expression: "798 + 154", correctAnswer: 952, conceptTag: "800 + 154 - 2 = 952", explanation: "800 + 154 - 2 = 952" },
    ]
  },
  {
    id: "svm3-sub-base",
    title: "SVM-3: Subtraction Base Method",
    category: "vedic",
    level: "SVM-3",
    topic: "Subtraction Base Method",
    description: "Vedic base rounding subtraction.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "145 - 88", correctAnswer: 57, conceptTag: "145 - 100 + 12 = 57", explanation: "145 - 100 + 12 = 57" },
      { id: 2, expression: "234 - 97", correctAnswer: 137, conceptTag: "234 - 100 + 3 = 137", explanation: "234 - 100 + 3 = 137" },
      { id: 3, expression: "362 - 198", correctAnswer: 164, conceptTag: "362 - 200 + 2 = 164", explanation: "362 - 200 + 2 = 164" },
      { id: 4, expression: "425 - 295", correctAnswer: 130, conceptTag: "425 - 300 + 5 = 130", explanation: "425 - 300 + 5 = 130" },
      { id: 5, expression: "512 - 396", correctAnswer: 116, conceptTag: "512 - 400 + 4 = 116", explanation: "512 - 400 + 4 = 116" },
      { id: 6, expression: "650 - 499", correctAnswer: 151, conceptTag: "650 - 500 + 1 = 151", explanation: "650 - 500 + 1 = 151" },
      { id: 7, expression: "735 - 598", correctAnswer: 137, conceptTag: "735 - 600 + 2 = 137", explanation: "735 - 600 + 2 = 137" },
      { id: 8, expression: "840 - 697", correctAnswer: 143, conceptTag: "840 - 700 + 3 = 143", explanation: "840 - 700 + 3 = 143" },
      { id: 9, expression: "915 - 795", correctAnswer: 120, conceptTag: "915 - 800 + 5 = 120", explanation: "915 - 800 + 5 = 120" },
      { id: 10, expression: "1050 - 898", correctAnswer: 152, conceptTag: "1050 - 900 + 2 = 152", explanation: "1050 - 900 + 2 = 152" },
    ]
  },
  {
    id: "svm3-mult-6-odd",
    title: "SVM-3: Multiplication by 6 ( Odd Numbers )",
    category: "vedic",
    level: "SVM-3",
    topic: "Multiplication by 6 ( Odd Numbers )",
    description: "Vedic half and add rule (N x 5) + N for odd numbers.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "35 × 6", correctAnswer: 210, conceptTag: "(35 x 5) + 35 = 175 + 35", explanation: "175 + 35 = 210" },
      { id: 2, expression: "47 × 6", correctAnswer: 282, conceptTag: "(47 x 5) + 47 = 235 + 47", explanation: "235 + 47 = 282" },
      { id: 3, expression: "63 × 6", correctAnswer: 378, conceptTag: "(63 x 5) + 63 = 315 + 63", explanation: "315 + 63 = 378" },
      { id: 4, expression: "75 × 6", correctAnswer: 450, conceptTag: "(75 x 5) + 75 = 375 + 75", explanation: "375 + 75 = 450" },
      { id: 5, expression: "89 × 6", correctAnswer: 534, conceptTag: "(89 x 5) + 89 = 445 + 89", explanation: "445 + 89 = 534" },
      { id: 6, expression: "125 × 6", correctAnswer: 750, conceptTag: "(125 x 5) + 125 = 625 + 125", explanation: "625 + 125 = 750" },
      { id: 7, expression: "237 × 6", correctAnswer: 1422, conceptTag: "(237 x 5) + 237", explanation: "1185 + 237 = 1422" },
      { id: 8, expression: "349 × 6", correctAnswer: 2094, conceptTag: "(349 x 5) + 349", explanation: "1745 + 349 = 2094" },
      { id: 9, expression: "453 × 6", correctAnswer: 2718, conceptTag: "(453 x 5) + 453", explanation: "2265 + 453 = 2718" },
      { id: 10, expression: "567 × 6", correctAnswer: 3402, conceptTag: "(567 x 5) + 567", explanation: "2835 + 567 = 3402" },
    ]
  },
  {
    id: "svm3-digital-root",
    title: "SVM-3: Digital Root",
    category: "vedic",
    level: "SVM-3",
    topic: "Digital Root",
    description: "Vedic Beejank (sum of digits reduced to single digit).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Digital Root of 487", correctAnswer: 1, conceptTag: "4+8+7 = 19 -> 1+9 = 10 -> 1", explanation: "19 -> 10 -> 1" },
      { id: 2, expression: "Digital Root of 356", correctAnswer: 5, conceptTag: "3+5+6 = 14 -> 1+4 = 5", explanation: "14 -> 5" },
      { id: 3, expression: "Digital Root of 789", correctAnswer: 6, conceptTag: "7+8+9 = 24 -> 2+4 = 6", explanation: "24 -> 6" },
      { id: 4, expression: "Digital Root of 1234", correctAnswer: 1, conceptTag: "1+2+3+4 = 10 -> 1", explanation: "10 -> 1" },
      { id: 5, expression: "Digital Root of 5678", correctAnswer: 8, conceptTag: "5+6+7+8 = 26 -> 2+6 = 8", explanation: "26 -> 8" },
      { id: 6, expression: "Digital Root of 9999", correctAnswer: 9, conceptTag: "9+9+9+9 = 36 -> 3+6 = 9", explanation: "36 -> 9" },
      { id: 7, expression: "Digital Root of 4321", correctAnswer: 1, conceptTag: "4+3+2+1 = 10 -> 1", explanation: "10 -> 1" },
      { id: 8, expression: "Digital Root of 8765", correctAnswer: 8, conceptTag: "8+7+6+5 = 26 -> 8", explanation: "26 -> 8" },
      { id: 9, expression: "Digital Root of 2468", correctAnswer: 2, conceptTag: "2+4+6+8 = 20 -> 2", explanation: "20 -> 2" },
      { id: 10, expression: "Digital Root of 13579", correctAnswer: 7, conceptTag: "1+3+5+7+9 = 25 -> 7", explanation: "25 -> 7" },
    ]
  },
  {
    id: "svm3-div-2",
    title: "SVM-3: Divisibility by 2",
    category: "vedic",
    level: "SVM-3",
    topic: "Divisibility by 2",
    description: "Check if number is divisible by 2 (1 = Yes, 0 = No).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Is 348 divisible by 2? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "Unit digit 8 is even", explanation: "Ends in 8 -> Yes (1)" },
      { id: 2, expression: "Is 573 divisible by 2? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "Unit digit 3 is odd", explanation: "Ends in 3 -> No (0)" },
      { id: 3, expression: "Is 890 divisible by 2? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "Unit digit 0 is even", explanation: "Ends in 0 -> Yes (1)" },
      { id: 4, expression: "Is 1255 divisible by 2? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "Unit digit 5 is odd", explanation: "Ends in 5 -> No (0)" },
      { id: 5, expression: "Is 4672 divisible by 2? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "Unit digit 2 is even", explanation: "Ends in 2 -> Yes (1)" },
      { id: 6, expression: "Is 9841 divisible by 2? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "Unit digit 1 is odd", explanation: "Ends in 1 -> No (0)" },
      { id: 7, expression: "Is 3204 divisible by 2? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "Unit digit 4 is even", explanation: "Ends in 4 -> Yes (1)" },
      { id: 8, expression: "Is 7777 divisible by 2? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "Unit digit 7 is odd", explanation: "Ends in 7 -> No (0)" },
      { id: 9, expression: "Is 6000 divisible by 2? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "Unit digit 0 is even", explanation: "Ends in 0 -> Yes (1)" },
      { id: 10, expression: "Is 8529 divisible by 2? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "Unit digit 9 is odd", explanation: "Ends in 9 -> No (0)" },
    ]
  },
  {
    id: "svm3-div-5",
    title: "SVM-3: Divisibility by 5",
    category: "vedic",
    level: "SVM-3",
    topic: "Divisibility by 5",
    description: "Check if number is divisible by 5 (1 = Yes, 0 = No).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Is 475 divisible by 5? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "Unit digit 5", explanation: "Ends in 5 -> Yes (1)" },
      { id: 2, expression: "Is 682 divisible by 5? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "Unit digit 2", explanation: "Ends in 2 -> No (0)" },
      { id: 3, expression: "Is 1290 divisible by 5? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "Unit digit 0", explanation: "Ends in 0 -> Yes (1)" },
      { id: 4, expression: "Is 3414 divisible by 5? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "Unit digit 4", explanation: "Ends in 4 -> No (0)" },
      { id: 5, expression: "Is 5685 divisible by 5? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "Unit digit 5", explanation: "Ends in 5 -> Yes (1)" },
      { id: 6, expression: "Is 7891 divisible by 5? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "Unit digit 1", explanation: "Ends in 1 -> No (0)" },
      { id: 7, expression: "Is 9000 divisible by 5? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "Unit digit 0", explanation: "Ends in 0 -> Yes (1)" },
      { id: 8, expression: "Is 2348 divisible by 5? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "Unit digit 8", explanation: "Ends in 8 -> No (0)" },
      { id: 9, expression: "Is 6540 divisible by 5? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "Unit digit 0", explanation: "Ends in 0 -> Yes (1)" },
      { id: 10, expression: "Is 8123 divisible by 5? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "Unit digit 3", explanation: "Ends in 3 -> No (0)" },
    ]
  },
  {
    id: "svm3-div-10",
    title: "SVM-3: Divisibility by 10",
    category: "vedic",
    level: "SVM-3",
    topic: "Divisibility by 10",
    description: "Check if number is divisible by 10 (1 = Yes, 0 = No).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Is 890 divisible by 10? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "Unit digit 0", explanation: "Ends in 0 -> Yes (1)" },
      { id: 2, expression: "Is 435 divisible by 10? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "Unit digit 5", explanation: "Ends in 5 -> No (0)" },
      { id: 3, expression: "Is 1500 divisible by 10? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "Unit digit 0", explanation: "Ends in 0 -> Yes (1)" },
      { id: 4, expression: "Is 2764 divisible by 10? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "Unit digit 4", explanation: "Ends in 4 -> No (0)" },
      { id: 5, expression: "Is 3890 divisible by 10? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "Unit digit 0", explanation: "Ends in 0 -> Yes (1)" },
      { id: 6, expression: "Is 5412 divisible by 10? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "Unit digit 2", explanation: "Ends in 2 -> No (0)" },
      { id: 7, expression: "Is 7600 divisible by 10? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "Unit digit 0", explanation: "Ends in 0 -> Yes (1)" },
      { id: 8, expression: "Is 8925 divisible by 10? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "Unit digit 5", explanation: "Ends in 5 -> No (0)" },
      { id: 9, expression: "Is 9990 divisible by 10? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "Unit digit 0", explanation: "Ends in 0 -> Yes (1)" },
      { id: 10, expression: "Is 1234 divisible by 10? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "Unit digit 4", explanation: "Ends in 4 -> No (0)" },
    ]
  },
  {
    id: "svm3-div-3",
    title: "SVM-3: Divisibility by 3",
    category: "vedic",
    level: "SVM-3",
    topic: "Divisibility by 3",
    description: "Check if number is divisible by 3 (1 = Yes, 0 = No).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Is 513 divisible by 3? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "5+1+3 = 9 (Divisible)", explanation: "9 ÷ 3 = 3 -> Yes (1)" },
      { id: 2, expression: "Is 428 divisible by 3? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "4+2+8 = 14 (Not Divisible)", explanation: "14 ÷ 3 has remainder -> No (0)" },
      { id: 3, expression: "Is 729 divisible by 3? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "7+2+9 = 18 (Divisible)", explanation: "18 ÷ 3 = 6 -> Yes (1)" },
      { id: 4, expression: "Is 1025 divisible by 3? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "1+0+2+5 = 8", explanation: "8 ÷ 3 has remainder -> No (0)" },
      { id: 5, expression: "Is 2346 divisible by 3? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "2+3+4+6 = 15 (Divisible)", explanation: "15 ÷ 3 = 5 -> Yes (1)" },
      { id: 6, expression: "Is 3581 divisible by 3? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "3+5+8+1 = 17", explanation: "17 ÷ 3 has remainder -> No (0)" },
      { id: 7, expression: "Is 4443 divisible by 3? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "4+4+4+3 = 15 (Divisible)", explanation: "15 ÷ 3 = 5 -> Yes (1)" },
      { id: 8, expression: "Is 6122 divisible by 3? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "6+1+2+2 = 11", explanation: "11 ÷ 3 has remainder -> No (0)" },
      { id: 9, expression: "Is 8103 divisible by 3? (1=Yes, 0=No)", correctAnswer: 1, conceptTag: "8+1+0+3 = 12 (Divisible)", explanation: "12 ÷ 3 = 4 -> Yes (1)" },
      { id: 10, expression: "Is 9541 divisible by 3? (1=Yes, 0=No)", correctAnswer: 0, conceptTag: "9+5+4+1 = 19", explanation: "19 ÷ 3 has remainder -> No (0)" },
    ]
  },
  {
    id: "svm3-mult-125",
    title: "SVM-3: Multiplication by 125",
    category: "vedic",
    level: "SVM-3",
    topic: "Multiplication by 125",
    description: "Divide by 8 and scale by 1000 (N x 1000 / 8).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "64 × 125", correctAnswer: 8000, conceptTag: "64 ÷ 8 = 8 -> 8000", explanation: "64 / 8 = 8 -> 8000" },
      { id: 2, expression: "48 × 125", correctAnswer: 6000, conceptTag: "48 ÷ 8 = 6 -> 6000", explanation: "48 / 8 = 6 -> 6000" },
      { id: 3, expression: "88 × 125", correctAnswer: 11000, conceptTag: "88 ÷ 8 = 11 -> 11000", explanation: "88 / 8 = 11 -> 11000" },
      { id: 4, expression: "128 × 125", correctAnswer: 16000, conceptTag: "128 ÷ 8 = 16 -> 16000", explanation: "128 / 8 = 16 -> 16000" },
      { id: 5, expression: "160 × 125", correctAnswer: 20000, conceptTag: "160 ÷ 8 = 20 -> 20000", explanation: "160 / 8 = 20 -> 20000" },
      { id: 6, expression: "248 × 125", correctAnswer: 31000, conceptTag: "248 ÷ 8 = 31 -> 31000", explanation: "248 / 8 = 31 -> 31000" },
      { id: 7, expression: "320 × 125", correctAnswer: 40000, conceptTag: "320 ÷ 8 = 40 -> 40000", explanation: "320 / 8 = 40 -> 40000" },
      { id: 8, expression: "408 × 125", correctAnswer: 51000, conceptTag: "408 ÷ 8 = 51 -> 51000", explanation: "408 / 8 = 51 -> 51000" },
      { id: 9, expression: "560 × 125", correctAnswer: 70000, conceptTag: "560 ÷ 8 = 70 -> 70000", explanation: "560 / 8 = 70 -> 70000" },
      { id: 10, expression: "728 × 125", correctAnswer: 91000, conceptTag: "728 ÷ 8 = 91 -> 91000", explanation: "728 / 8 = 91 -> 91000" },
    ]
  },
  {
    id: "svm3-mult-2x2-general",
    title: "SVM-3: Multiplication 2x2 ( General Method )",
    category: "vedic",
    level: "SVM-3",
    topic: "Multiplication 2x2 ( General Method )",
    description: "Vedic Urdhva Tiryagbhyam (Vertically and Crosswise).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "23 × 45", correctAnswer: 1035, conceptTag: "(2x4) | (2x5 + 3x4) | (3x5)", explanation: "8 | 22 | 15 -> 1035" },
      { id: 2, expression: "34 × 26", correctAnswer: 884, conceptTag: "(3x2) | (3x6 + 4x2) | (4x6)", explanation: "6 | 26 | 24 -> 884" },
      { id: 3, expression: "42 × 31", correctAnswer: 1302, conceptTag: "(4x3) | (4x1 + 2x3) | (2x1)", explanation: "12 | 10 | 2 -> 1302" },
      { id: 4, expression: "53 × 24", correctAnswer: 1272, conceptTag: "(5x2) | (5x4 + 3x2) | (3x4)", explanation: "10 | 26 | 12 -> 1272" },
      { id: 5, expression: "61 × 35", correctAnswer: 2135, conceptTag: "(6x3) | (6x5 + 1x3) | (1x5)", explanation: "18 | 33 | 5 -> 2135" },
      { id: 6, expression: "72 × 43", correctAnswer: 3096, conceptTag: "(7x4) | (7x3 + 2x4) | (2x3)", explanation: "28 | 29 | 6 -> 3096" },
      { id: 7, expression: "84 × 15", correctAnswer: 1260, conceptTag: "(8x1) | (8x5 + 4x1) | (4x5)", explanation: "8 | 44 | 20 -> 1260" },
      { id: 8, expression: "92 × 27", correctAnswer: 2484, conceptTag: "(9x2) | (9x7 + 2x2) | (2x7)", explanation: "18 | 67 | 14 -> 2484" },
      { id: 9, expression: "36 × 52", correctAnswer: 1872, conceptTag: "(3x5) | (3x2 + 6x5) | (6x2)", explanation: "15 | 36 | 12 -> 1872" },
      { id: 10, expression: "47 × 63", correctAnswer: 2961, conceptTag: "(4x6) | (4x3 + 7x6) | (7x3)", explanation: "24 | 54 | 21 -> 2961" },
    ]
  },
  {
    id: "svm3-div-125",
    title: "SVM-3: Division by 125",
    category: "vedic",
    level: "SVM-3",
    topic: "Division by 125",
    description: "Multiply by 8 and divide by 1000 (N x 8 / 1000).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "375 ÷ 125", correctAnswer: 3, conceptTag: "(375 x 8) ÷ 1000 = 3000 ÷ 1000", explanation: "3000 / 1000 = 3" },
      { id: 2, expression: "625 ÷ 125", correctAnswer: 5, conceptTag: "(625 x 8) ÷ 1000 = 5000 ÷ 1000", explanation: "5000 / 1000 = 5" },
      { id: 3, expression: "875 ÷ 125", correctAnswer: 7, conceptTag: "(875 x 8) ÷ 1000 = 7000 ÷ 1000", explanation: "7000 / 1000 = 7" },
      { id: 4, expression: "1125 ÷ 125", correctAnswer: 9, conceptTag: "(1125 x 8) ÷ 1000 = 9000 ÷ 1000", explanation: "9000 / 1000 = 9" },
      { id: 5, expression: "1625 ÷ 125", correctAnswer: 13, conceptTag: "(1625 x 8) ÷ 1000 = 13000 ÷ 1000", explanation: "13000 / 1000 = 13" },
      { id: 6, expression: "2250 ÷ 125", correctAnswer: 18, conceptTag: "(2250 x 8) ÷ 1000 = 18000 ÷ 1000", explanation: "18000 / 1000 = 18" },
      { id: 7, expression: "3125 ÷ 125", correctAnswer: 25, conceptTag: "(3125 x 8) ÷ 1000 = 25000 ÷ 1000", explanation: "25000 / 1000 = 25" },
      { id: 8, expression: "4500 ÷ 125", correctAnswer: 36, conceptTag: "(4500 x 8) ÷ 1000 = 36000 ÷ 1000", explanation: "36000 / 1000 = 36" },
      { id: 9, expression: "5875 ÷ 125", correctAnswer: 47, conceptTag: "(5875 x 8) ÷ 1000 = 47000 ÷ 1000", explanation: "47000 / 1000 = 47" },
      { id: 10, expression: "7250 ÷ 125", correctAnswer: 58, conceptTag: "(7250 x 8) ÷ 1000 = 58000 ÷ 1000", explanation: "58000 / 1000 = 58" },
    ]
  },
  {
    id: "svm3-mult-1001-3d",
    title: "SVM-3: Multiplication 1001 ( For 101 to 998 )",
    category: "vedic",
    level: "SVM-3",
    topic: "Multiplication 1001 ( For 101 to 998 )",
    description: "Vedic double pattern repeat rule: ABC x 1001 = ABCABC.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "475 × 1001", correctAnswer: 475475, conceptTag: "ABC x 1001 = ABCABC", explanation: "475475" },
      { id: 2, expression: "234 × 1001", correctAnswer: 234234, conceptTag: "ABC x 1001 = ABCABC", explanation: "234234" },
      { id: 3, expression: "689 × 1001", correctAnswer: 689689, conceptTag: "ABC x 1001 = ABCABC", explanation: "689689" },
      { id: 4, expression: "312 × 1001", correctAnswer: 312312, conceptTag: "ABC x 1001 = ABCABC", explanation: "312312" },
      { id: 5, expression: "850 × 1001", correctAnswer: 850850, conceptTag: "ABC x 1001 = ABCABC", explanation: "850850" },
      { id: 6, expression: "145 × 1001", correctAnswer: 145145, conceptTag: "ABC x 1001 = ABCABC", explanation: "145145" },
      { id: 7, expression: "567 × 1001", correctAnswer: 567567, conceptTag: "ABC x 1001 = ABCABC", explanation: "567567" },
      { id: 8, expression: "791 × 1001", correctAnswer: 791791, conceptTag: "ABC x 1001 = ABCABC", explanation: "791791" },
      { id: 9, expression: "923 × 1001", correctAnswer: 923923, conceptTag: "ABC x 1001 = ABCABC", explanation: "923923" },
      { id: 10, expression: "380 × 1001", correctAnswer: 380380, conceptTag: "ABC x 1001 = ABCABC", explanation: "380380" },
    ]
  },
  {
    id: "svm3-mult-1001-4d",
    title: "SVM-3: Multiplication 1001 ( For 1001 to 1998 )",
    category: "vedic",
    level: "SVM-3",
    topic: "Multiplication 1001 ( For 1001 to 1998 )",
    description: "ABCD x 1001 = (ABCD x 1000) + ABCD.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "1234 × 1001", correctAnswer: 1235234, conceptTag: "1234000 + 1234 = 1235234", explanation: "1234000 + 1234 = 1235234" },
      { id: 2, expression: "1456 × 1001", correctAnswer: 1457456, conceptTag: "1456000 + 1456 = 1457456", explanation: "1456000 + 1456 = 1457456" },
      { id: 3, expression: "1680 × 1001", correctAnswer: 1681680, conceptTag: "1680000 + 1680 = 1681680", explanation: "1680000 + 1680 = 1681680" },
      { id: 4, expression: "1125 × 1001", correctAnswer: 1126125, conceptTag: "1125000 + 1125 = 1126125", explanation: "1125000 + 1125 = 1126125" },
      { id: 5, expression: "1350 × 1001", correctAnswer: 1351350, conceptTag: "1350000 + 1350 = 1351350", explanation: "1350000 + 1350 = 1351350" },
      { id: 6, expression: "1520 × 1001", correctAnswer: 1521520, conceptTag: "1520000 + 1520 = 1521520", explanation: "1520000 + 1520 = 1521520" },
      { id: 7, expression: "1789 × 1001", correctAnswer: 1790789, conceptTag: "1789000 + 1789 = 1790789", explanation: "1789000 + 1789 = 1790789" },
      { id: 8, expression: "1890 × 1001", correctAnswer: 1891890, conceptTag: "1890000 + 1890 = 1891890", explanation: "1890000 + 1890 = 1891890" },
      { id: 9, expression: "1050 × 1001", correctAnswer: 1051050, conceptTag: "1050000 + 1050 = 1051050", explanation: "1050000 + 1050 = 1051050" },
      { id: 10, expression: "1998 × 1001", correctAnswer: 1999998, conceptTag: "1998000 + 1998 = 1999998", explanation: "1998000 + 1998 = 1999998" },
    ]
  },
  {
    id: "svm3-mult-teens",
    title: "SVM-3: Multiplication by 12, 13, 14.........19",
    category: "vedic",
    level: "SVM-3",
    topic: "Multiplication by 12, 13, 14.........19",
    description: "Vedic teen multiplier shortcut: multiply digit by teen unit and add neighbor.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "43 × 12", correctAnswer: 516, conceptTag: "43 x 12 = 516", explanation: "43 x 12 = 516" },
      { id: 2, expression: "35 × 13", correctAnswer: 455, conceptTag: "35 x 13 = 455", explanation: "35 x 13 = 455" },
      { id: 3, expression: "28 × 14", correctAnswer: 392, conceptTag: "28 x 14 = 392", explanation: "28 x 14 = 392" },
      { id: 4, expression: "42 × 15", correctAnswer: 630, conceptTag: "42 x 15 = 630", explanation: "42 x 15 = 630" },
      { id: 5, expression: "54 × 16", correctAnswer: 864, conceptTag: "54 x 16 = 864", explanation: "54 x 16 = 864" },
      { id: 6, expression: "32 × 17", correctAnswer: 544, conceptTag: "32 x 17 = 544", explanation: "32 x 17 = 544" },
      { id: 7, expression: "25 × 18", correctAnswer: 450, conceptTag: "25 x 18 = 450", explanation: "25 x 18 = 450" },
      { id: 8, expression: "31 × 19", correctAnswer: 589, conceptTag: "31 x 19 = 589", explanation: "31 x 19 = 589" },
      { id: 9, expression: "62 × 12", correctAnswer: 744, conceptTag: "62 x 12 = 744", explanation: "62 x 12 = 744" },
      { id: 10, expression: "41 × 14", correctAnswer: 574, conceptTag: "41 x 14 = 574", explanation: "41 x 14 = 574" },
    ]
  },
  {
    id: "svm3-mult-teens-100",
    title: "SVM-3: Multiplication by 112, 113, 114.........119",
    category: "vedic",
    level: "SVM-3",
    topic: "Multiplication by 112, 113, 114.........119",
    description: "Vedic base 100 teen extension multiplication.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "104 × 112", correctAnswer: 11648, conceptTag: "(104+12) | (4x12) = 116 | 48", explanation: "104+12=116, 4x12=48 -> 11648" },
      { id: 2, expression: "105 × 113", correctAnswer: 11865, conceptTag: "(105+13) | (5x13) = 118 | 65", explanation: "105+13=118, 5x13=65 -> 11865" },
      { id: 3, expression: "103 × 114", correctAnswer: 11742, conceptTag: "(103+14) | (3x14) = 117 | 42", explanation: "103+14=117, 3x14=42 -> 11742" },
      { id: 4, expression: "106 × 115", correctAnswer: 12190, conceptTag: "(106+15) | (6x15) = 121 | 90", explanation: "106+15=121, 6x15=90 -> 12190" },
      { id: 5, expression: "102 × 116", correctAnswer: 11832, conceptTag: "(102+16) | (2x16) = 118 | 32", explanation: "102+16=118, 2x16=32 -> 11832" },
      { id: 6, expression: "104 × 117", correctAnswer: 12168, conceptTag: "(104+17) | (4x17) = 121 | 68", explanation: "104+17=121, 4x17=68 -> 12168" },
      { id: 7, expression: "105 × 118", correctAnswer: 12390, conceptTag: "(105+18) | (5x18) = 123 | 90", explanation: "105+18=123, 5x18=90 -> 12390" },
      { id: 8, expression: "103 × 119", correctAnswer: 12257, conceptTag: "(103+19) | (3x19) = 122 | 57", explanation: "103+19=122, 3x19=57 -> 12257" },
      { id: 9, expression: "108 × 112", correctAnswer: 12096, conceptTag: "(108+12) | (8x12) = 120 | 96", explanation: "108+12=120, 8x12=96 -> 12096" },
      { id: 10, expression: "107 × 113", correctAnswer: 12091, conceptTag: "(107+13) | (7x13) = 120 | 91", explanation: "107+13=120, 7x13=91 -> 12091" },
    ]
  },
  {
    id: "svm3-mult-teens-1000",
    title: "SVM-3: Multiplication by 1112, 1113, 1114.........1119",
    category: "vedic",
    level: "SVM-3",
    topic: "Multiplication by 1112, 1113, 1114.........1119",
    description: "Vedic base 1000 teen extension multiplication.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "1005 × 1112", correctAnswer: 1117560, conceptTag: "(1005+112) | (5x112)", explanation: "1005+112=1117, 5x112=560 -> 1117560" },
      { id: 2, expression: "1004 × 1113", correctAnswer: 1117452, conceptTag: "(1004+113) | (4x113)", explanation: "1004+113=1117, 4x113=452 -> 1117452" },
      { id: 3, expression: "1003 × 1114", correctAnswer: 1117342, conceptTag: "(1003+114) | (3x114)", explanation: "1003+114=1117, 3x114=342 -> 1117342" },
      { id: 4, expression: "1002 × 1115", correctAnswer: 1117230, conceptTag: "(1002+115) | (2x115)", explanation: "1002+115=1117, 2x115=230 -> 1117230" },
      { id: 5, expression: "1006 × 1116", correctAnswer: 1122696, conceptTag: "(1006+116) | (6x116)", explanation: "1006+116=1122, 6x116=696 -> 1122696" },
      { id: 6, expression: "1003 × 1117", correctAnswer: 1120351, conceptTag: "(1003+117) | (3x117)", explanation: "1003+117=1120, 3x117=351 -> 1120351" },
      { id: 7, expression: "1004 × 1118", correctAnswer: 1122472, conceptTag: "(1004+118) | (4x118)", explanation: "1004+118=1122, 4x118=472 -> 1122472" },
      { id: 8, expression: "1002 × 1119", correctAnswer: 1121238, conceptTag: "(1002+119) | (2x119)", explanation: "1002+119=1121, 2x119=238 -> 1121238" },
      { id: 9, expression: "1008 × 1112", correctAnswer: 1120896, conceptTag: "(1008+112) | (8x112)", explanation: "1008+112=1120, 8x112=896 -> 1120896" },
      { id: 10, expression: "1005 × 1114", correctAnswer: 1119570, conceptTag: "(1005+114) | (5x114)", explanation: "1005+114=1119, 5x114=570 -> 1119570" },
    ]
  },
  {
    id: "svm3-mult-nines",
    title: "SVM-3: Multiplication by Number of 9",
    category: "vedic",
    level: "SVM-3",
    topic: "Multiplication by Number of 9",
    description: "Vedic Ekanyunena Purvena rule for 9s multipliers.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "68 × 99", correctAnswer: 6732, conceptTag: "(68-1) | (99-67) = 6732", explanation: "67 | 32 = 6732" },
      { id: 2, expression: "84 × 99", correctAnswer: 8316, conceptTag: "(84-1) | (99-83) = 8316", explanation: "83 | 16 = 8316" },
      { id: 3, expression: "345 × 999", correctAnswer: 344655, conceptTag: "(345-1) | (999-344)", explanation: "344 | 655 = 344655" },
      { id: 4, expression: "512 × 999", correctAnswer: 511488, conceptTag: "(512-1) | (999-511)", explanation: "511 | 488 = 511488" },
      { id: 5, expression: "789 × 999", correctAnswer: 788211, conceptTag: "(789-1) | (999-788)", explanation: "788 | 211 = 788211" },
      { id: 6, expression: "45 × 99", correctAnswer: 4455, conceptTag: "(45-1) | (99-44)", explanation: "44 | 55 = 4455" },
      { id: 7, expression: "92 × 99", correctAnswer: 9108, conceptTag: "(92-1) | (99-91)", explanation: "91 | 08 = 9108" },
      { id: 8, expression: "123 × 999", correctAnswer: 122877, conceptTag: "(123-1) | (999-122)", explanation: "122 | 877 = 122877" },
      { id: 9, expression: "678 × 999", correctAnswer: 677322, conceptTag: "(678-1) | (999-677)", explanation: "677 | 322 = 677322" },
      { id: 10, expression: "856 × 999", correctAnswer: 855144, conceptTag: "(856-1) | (999-855)", explanation: "855 | 144 = 855144" },
    ]
  },
  {
    id: "svm3-grid-3x3",
    title: "SVM-3: Grid 3x3",
    category: "vedic",
    level: "SVM-3",
    topic: "Grid 3x3",
    description: "Vedic spatial 3x3 matrix arithmetic and magic square properties.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Row 1 sum in Magic Square (8,1,6 / 3,5,7 / 4,9,2)", correctAnswer: 15, conceptTag: "8 + 1 + 6 = 15", explanation: "8 + 1 + 6 = 15" },
      { id: 2, expression: "Row 2 sum in Magic Square (8,1,6 / 3,5,7 / 4,9,2)", correctAnswer: 15, conceptTag: "3 + 5 + 7 = 15", explanation: "3 + 5 + 7 = 15" },
      { id: 3, expression: "Diagonal sum in Magic Square (8,1,6 / 3,5,7 / 4,9,2)", correctAnswer: 15, conceptTag: "8 + 5 + 2 = 15", explanation: "8 + 5 + 2 = 15" },
      { id: 4, expression: "Center element in 3x3 Magic Square (Sum=15)", correctAnswer: 5, conceptTag: "15 / 3 = 5", explanation: "Center element = 15 / 3 = 5" },
      { id: 5, expression: "Total cells in a 3 × 3 Grid", correctAnswer: 9, conceptTag: "3 x 3 = 9 cells", explanation: "3 x 3 = 9" },
      { id: 6, expression: "Sum of all numbers 1 to 9 in 3x3 Grid", correctAnswer: 45, conceptTag: "9(10)/2 = 45", explanation: "Sum = 45" },
      { id: 7, expression: "Magic Constant for 3x3 grid with center 10", correctAnswer: 30, conceptTag: "Center x 3 = 30", explanation: "30" },
      { id: 8, expression: "Row 3 sum in Magic Square (8,1,6 / 3,5,7 / 4,9,2)", correctAnswer: 15, conceptTag: "4 + 9 + 2 = 15", explanation: "4 + 9 + 2 = 15" },
      { id: 9, expression: "Column 1 sum in Magic Square (8,1,6 / 3,5,7 / 4,9,2)", correctAnswer: 15, conceptTag: "8 + 3 + 4 = 15", explanation: "8 + 3 + 4 = 15" },
      { id: 10, expression: "Column 3 sum in Magic Square (8,1,6 / 3,5,7 / 4,9,2)", correctAnswer: 15, conceptTag: "6 + 7 + 2 = 15", explanation: "6 + 7 + 2 = 15" },
    ]
  },
  {
    id: "vedic-svm3-overall",
    title: "SVM-3-Overall (Comprehensive Level Master Quiz)",
    category: "vedic",
    level: "SVM-3",
    topic: "12. SVM-3-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all Senior Vedic Math Level 3 topics: Urdhva Tiryagbhyam, Beejank, Divisibility Rules.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "23 × 27", correctAnswer: 621, conceptTag: "SVM-3 Overall" }
    ]
  },

  // ==========================================
  // SVM-2 LEVEL (Senior Vedic Math Level 2 - 24 Topics)
  // ==========================================
  {
    id: "svm2-mult-9",
    title: "SVM-2: Multiplication by 9",
    category: "vedic",
    level: "SVM-2",
    topic: "Multiplication by 9",
    description: "Instant multiplication by 9 using Ekanyunena or (N x 10) - N.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "74 × 9", correctAnswer: 666, conceptTag: "740 - 74 = 666", explanation: "740 - 74 = 666" },
      { id: 2, expression: "48 × 9", correctAnswer: 432, conceptTag: "480 - 48 = 432", explanation: "480 - 48 = 432" },
      { id: 3, expression: "85 × 9", correctAnswer: 765, conceptTag: "850 - 85 = 765", explanation: "850 - 85 = 765" },
      { id: 4, expression: "93 × 9", correctAnswer: 837, conceptTag: "930 - 93 = 837", explanation: "930 - 93 = 837" },
      { id: 5, expression: "126 × 9", correctAnswer: 1134, conceptTag: "1260 - 126 = 1134", explanation: "1260 - 126 = 1134" },
      { id: 6, expression: "245 × 9", correctAnswer: 2205, conceptTag: "2450 - 245 = 2205", explanation: "2450 - 245 = 2205" },
      { id: 7, expression: "378 × 9", correctAnswer: 3402, conceptTag: "3780 - 378 = 3402", explanation: "3780 - 378 = 3402" },
      { id: 8, expression: "469 × 9", correctAnswer: 4221, conceptTag: "4690 - 469 = 4221", explanation: "4690 - 469 = 4221" },
      { id: 9, expression: "582 × 9", correctAnswer: 5238, conceptTag: "5820 - 582 = 5238", explanation: "5820 - 582 = 5238" },
      { id: 10, expression: "695 × 9", correctAnswer: 6255, conceptTag: "6950 - 695 = 6255", explanation: "6950 - 695 = 6255" },
    ]
  },
  {
    id: "svm2-mult-end-9-2d",
    title: "SVM-2: Multiplication by number ending with 9 (19-99)",
    category: "vedic",
    level: "SVM-2",
    topic: "Multiplication by number ending with 9 ( 19-99)",
    description: "Vedic base scaling shortcut for 19, 29, 39, 49, 59, 69, 79, 89, 99.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "34 × 29", correctAnswer: 986, conceptTag: "(34 x 30) - 34", explanation: "1020 - 34 = 986" },
      { id: 2, expression: "25 × 19", correctAnswer: 475, conceptTag: "(25 x 20) - 25", explanation: "500 - 25 = 475" },
      { id: 3, expression: "42 × 39", correctAnswer: 1638, conceptTag: "(42 x 40) - 42", explanation: "1680 - 42 = 1638" },
      { id: 4, expression: "18 × 49", correctAnswer: 882, conceptTag: "(18 x 50) - 18", explanation: "900 - 18 = 882" },
      { id: 5, expression: "35 × 59", correctAnswer: 2065, conceptTag: "(35 x 60) - 35", explanation: "2100 - 35 = 2065" },
      { id: 6, expression: "24 × 69", correctAnswer: 1656, conceptTag: "(24 x 70) - 24", explanation: "1680 - 24 = 1656" },
      { id: 7, expression: "16 × 79", correctAnswer: 1264, conceptTag: "(16 x 80) - 16", explanation: "1280 - 16 = 1264" },
      { id: 8, expression: "28 × 89", correctAnswer: 2492, conceptTag: "(28 x 90) - 28", explanation: "2520 - 28 = 2492" },
      { id: 9, expression: "45 × 99", correctAnswer: 4455, conceptTag: "(45 x 100) - 45", explanation: "4500 - 45 = 4455" },
      { id: 10, expression: "62 × 39", correctAnswer: 2418, conceptTag: "(62 x 40) - 62", explanation: "2480 - 62 = 2418" },
    ]
  },
  {
    id: "svm2-mult-end-9-3d",
    title: "SVM-2: Multiplication by number ending with 9 (199-999)",
    category: "vedic",
    level: "SVM-2",
    topic: "Multiplication by number ending with 9 (199-999)",
    description: "Vedic base scaling shortcut for 199, 299, 399, 499, 999.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "25 × 199", correctAnswer: 4975, conceptTag: "(25 x 200) - 25", explanation: "5000 - 25 = 4975" },
      { id: 2, expression: "18 × 299", correctAnswer: 5382, conceptTag: "(18 x 300) - 18", explanation: "5400 - 18 = 5382" },
      { id: 3, expression: "14 × 399", correctAnswer: 5586, conceptTag: "(14 x 400) - 14", explanation: "5600 - 14 = 5586" },
      { id: 4, expression: "32 × 199", correctAnswer: 6368, conceptTag: "(32 x 200) - 32", explanation: "6400 - 32 = 6368" },
      { id: 5, expression: "16 × 499", correctAnswer: 7984, conceptTag: "(16 x 500) - 16", explanation: "8000 - 16 = 7984" },
      { id: 6, expression: "78 × 999", correctAnswer: 77922, conceptTag: "(78 x 1000) - 78", explanation: "78000 - 78 = 77922" },
      { id: 7, expression: "45 × 199", correctAnswer: 8955, conceptTag: "(45 x 200) - 45", explanation: "9000 - 45 = 8955" },
      { id: 8, expression: "22 × 299", correctAnswer: 6578, conceptTag: "(22 x 300) - 22", explanation: "6600 - 22 = 6578" },
      { id: 9, expression: "35 × 999", correctAnswer: 34965, conceptTag: "(35 x 1000) - 35", explanation: "35000 - 35 = 34965" },
      { id: 10, expression: "12 × 499", correctAnswer: 5988, conceptTag: "(12 x 500) - 12", explanation: "6000 - 12 = 5988" },
    ]
  },
  {
    id: "svm2-mult-5",
    title: "SVM-2: Multiplication by 5",
    category: "vedic",
    level: "SVM-2",
    topic: "Multiplication by 5",
    description: "Half the number and scale by 10 (N x 10 / 2).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "48 × 5", correctAnswer: 240, conceptTag: "48 ÷ 2 = 24 -> 240", explanation: "48 / 2 = 24 -> 240" },
      { id: 2, expression: "86 × 5", correctAnswer: 430, conceptTag: "86 ÷ 2 = 43 -> 430", explanation: "86 / 2 = 43 -> 430" },
      { id: 3, expression: "124 × 5", correctAnswer: 620, conceptTag: "124 ÷ 2 = 62 -> 620", explanation: "124 / 2 = 62 -> 620" },
      { id: 4, expression: "248 × 5", correctAnswer: 1240, conceptTag: "248 ÷ 2 = 124 -> 1240", explanation: "248 / 2 = 124 -> 1240" },
      { id: 5, expression: "37 × 5", correctAnswer: 185, conceptTag: "37 ÷ 2 = 18.5 -> 185", explanation: "37 x 5 = 185" },
      { id: 6, expression: "564 × 5", correctAnswer: 2820, conceptTag: "564 ÷ 2 = 282 -> 2820", explanation: "564 / 2 = 282 -> 2820" },
      { id: 7, expression: "782 × 5", correctAnswer: 3910, conceptTag: "782 ÷ 2 = 391 -> 3910", explanation: "782 / 2 = 391 -> 3910" },
      { id: 8, expression: "936 × 5", correctAnswer: 4680, conceptTag: "936 ÷ 2 = 468 -> 4680", explanation: "936 / 2 = 468 -> 4680" },
      { id: 9, expression: "85 × 5", correctAnswer: 425, conceptTag: "85 ÷ 2 = 42.5 -> 425", explanation: "85 x 5 = 425" },
      { id: 10, expression: "1456 × 5", correctAnswer: 7280, conceptTag: "1456 ÷ 2 = 728 -> 7280", explanation: "1456 / 2 = 728 -> 7280" },
    ]
  },
  {
    id: "svm2-mult-6-even",
    title: "SVM-2: Multiplication by 6 (Even Number)",
    category: "vedic",
    level: "SVM-2",
    topic: "Multiplication by 6 ( Even Number )",
    description: "Vedic even digit shortcut for 6 multiplication.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "48 × 6", correctAnswer: 288, conceptTag: "(48 x 5) + 48 = 240 + 48", explanation: "240 + 48 = 288" },
      { id: 2, expression: "84 × 6", correctAnswer: 504, conceptTag: "(84 x 5) + 84 = 420 + 84", explanation: "420 + 84 = 504" },
      { id: 3, expression: "62 × 6", correctAnswer: 372, conceptTag: "(62 x 5) + 62 = 310 + 62", explanation: "310 + 62 = 372" },
      { id: 4, expression: "76 × 6", correctAnswer: 456, conceptTag: "(76 x 5) + 76 = 380 + 76", explanation: "380 + 76 = 456" },
      { id: 5, expression: "94 × 6", correctAnswer: 564, conceptTag: "(94 x 5) + 94 = 470 + 94", explanation: "470 + 94 = 564" },
      { id: 6, expression: "128 × 6", correctAnswer: 768, conceptTag: "(128 x 5) + 128 = 640 + 128", explanation: "640 + 128 = 768" },
      { id: 7, expression: "246 × 6", correctAnswer: 1476, conceptTag: "(246 x 5) + 246", explanation: "1230 + 246 = 1476" },
      { id: 8, expression: "384 × 6", correctAnswer: 2304, conceptTag: "(384 x 5) + 384", explanation: "1920 + 384 = 2304" },
      { id: 9, expression: "462 × 6", correctAnswer: 2772, conceptTag: "(462 x 5) + 462", explanation: "2310 + 462 = 2772" },
      { id: 10, expression: "586 × 6", correctAnswer: 3516, conceptTag: "(586 x 5) + 586", explanation: "2930 + 586 = 3516" },
    ]
  },
  {
    id: "svm2-mult-15",
    title: "SVM-2: Multiplication by 15",
    category: "vedic",
    level: "SVM-2",
    topic: "Multiplication by 15",
    description: "Add half the number then scale by 10 (N + N/2) x 10.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "42 × 15", correctAnswer: 630, conceptTag: "(42 + 21) x 10 = 630", explanation: "(42 + 21) x 10 = 630" },
      { id: 2, expression: "64 × 15", correctAnswer: 960, conceptTag: "(64 + 32) x 10 = 960", explanation: "(64 + 32) x 10 = 960" },
      { id: 3, expression: "86 × 15", correctAnswer: 1290, conceptTag: "(86 + 43) x 10 = 1290", explanation: "(86 + 43) x 10 = 1290" },
      { id: 4, expression: "124 × 15", correctAnswer: 1860, conceptTag: "(124 + 62) x 10 = 1860", explanation: "(124 + 62) x 10 = 1860" },
      { id: 5, expression: "168 × 15", correctAnswer: 2520, conceptTag: "(168 + 84) x 10 = 2520", explanation: "(168 + 84) x 10 = 2520" },
      { id: 6, expression: "240 × 15", correctAnswer: 3600, conceptTag: "(240 + 120) x 10 = 3600", explanation: "(240 + 120) x 10 = 3600" },
      { id: 7, expression: "380 × 15", correctAnswer: 5700, conceptTag: "(380 + 190) x 10 = 5700", explanation: "(380 + 190) x 10 = 5700" },
      { id: 8, expression: "460 × 15", correctAnswer: 6900, conceptTag: "(460 + 230) x 10 = 6900", explanation: "(460 + 230) x 10 = 6900" },
      { id: 9, expression: "540 × 15", correctAnswer: 8100, conceptTag: "(540 + 270) x 10 = 8100", explanation: "(540 + 270) x 10 = 8100" },
      { id: 10, expression: "720 × 15", correctAnswer: 10800, conceptTag: "(720 + 360) x 10 = 10800", explanation: "(720 + 360) x 10 = 10800" },
    ]
  },
  {
    id: "svm2-mult-25",
    title: "SVM-2: Multiplication by 25",
    category: "vedic",
    level: "SVM-2",
    topic: "Multiplication by 25",
    description: "Divide by 4 and scale by 100 (N x 100 / 4).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "64 × 25", correctAnswer: 1600, conceptTag: "64 ÷ 4 = 16 -> 1600", explanation: "64 / 4 = 16 -> 1600" },
      { id: 2, expression: "48 × 25", correctAnswer: 1200, conceptTag: "48 ÷ 4 = 12 -> 1200", explanation: "48 / 4 = 12 -> 1200" },
      { id: 3, expression: "84 × 25", correctAnswer: 2100, conceptTag: "84 ÷ 4 = 21 -> 2100", explanation: "84 / 4 = 21 -> 2100" },
      { id: 4, expression: "128 × 25", correctAnswer: 3200, conceptTag: "128 ÷ 4 = 32 -> 3200", explanation: "128 / 4 = 32 -> 3200" },
      { id: 5, expression: "164 × 25", correctAnswer: 4100, conceptTag: "164 ÷ 4 = 41 -> 4100", explanation: "164 / 4 = 41 -> 4100" },
      { id: 6, expression: "248 × 25", correctAnswer: 6200, conceptTag: "248 ÷ 4 = 62 -> 6200", explanation: "248 / 4 = 62 -> 6200" },
      { id: 7, expression: "360 × 25", correctAnswer: 9000, conceptTag: "360 ÷ 4 = 90 -> 9000", explanation: "360 / 4 = 90 -> 9000" },
      { id: 8, expression: "444 × 25", correctAnswer: 11100, conceptTag: "444 ÷ 4 = 111 -> 11100", explanation: "444 / 4 = 111 -> 11100" },
      { id: 9, expression: "520 × 25", correctAnswer: 13000, conceptTag: "520 ÷ 4 = 130 -> 13000", explanation: "520 / 4 = 130 -> 13000" },
      { id: 10, expression: "760 × 25", correctAnswer: 19000, conceptTag: "760 ÷ 4 = 190 -> 19000", explanation: "760 / 4 = 190 -> 19000" },
    ]
  },
  {
    id: "svm2-mult-50",
    title: "SVM-2: Multiplication by 50",
    category: "vedic",
    level: "SVM-2",
    topic: "Multiplication by 50",
    description: "Divide by 2 and scale by 100 (N x 100 / 2).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "36 × 50", correctAnswer: 1800, conceptTag: "36 ÷ 2 = 18 -> 1800", explanation: "36 / 2 = 18 -> 1800" },
      { id: 2, expression: "64 × 50", correctAnswer: 3200, conceptTag: "64 ÷ 2 = 32 -> 3200", explanation: "64 / 2 = 32 -> 3200" },
      { id: 3, expression: "82 × 50", correctAnswer: 4100, conceptTag: "82 ÷ 2 = 41 -> 4100", explanation: "82 / 2 = 41 -> 4100" },
      { id: 4, expression: "124 × 50", correctAnswer: 6200, conceptTag: "124 ÷ 2 = 62 -> 6200", explanation: "124 / 2 = 62 -> 6200" },
      { id: 5, expression: "248 × 50", correctAnswer: 12400, conceptTag: "248 ÷ 2 = 124 -> 12400", explanation: "248 / 2 = 124 -> 12400" },
      { id: 6, expression: "356 × 50", correctAnswer: 17800, conceptTag: "356 ÷ 2 = 178 -> 17800", explanation: "356 / 2 = 178 -> 17800" },
      { id: 7, expression: "482 × 50", correctAnswer: 24100, conceptTag: "482 ÷ 2 = 241 -> 24100", explanation: "482 / 2 = 241 -> 24100" },
      { id: 8, expression: "564 × 50", correctAnswer: 28200, conceptTag: "564 ÷ 2 = 282 -> 28200", explanation: "564 / 2 = 282 -> 28200" },
      { id: 9, expression: "678 × 50", correctAnswer: 33900, conceptTag: "678 ÷ 2 = 339 -> 33900", explanation: "678 / 2 = 339 -> 33900" },
      { id: 10, expression: "892 × 50", correctAnswer: 44600, conceptTag: "892 ÷ 2 = 446 -> 44600", explanation: "892 / 2 = 446 -> 44600" },
    ]
  },
  {
    id: "svm2-div-5",
    title: "SVM-2: Division by 5",
    category: "vedic",
    level: "SVM-2",
    topic: "Division by 5",
    description: "Double the number and divide by 10 (N x 2 / 10).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "135 ÷ 5", correctAnswer: 27, conceptTag: "(135 x 2) ÷ 10 = 270 ÷ 10", explanation: "270 / 10 = 27" },
      { id: 2, expression: "245 ÷ 5", correctAnswer: 49, conceptTag: "(245 x 2) ÷ 10 = 490 ÷ 10", explanation: "490 / 10 = 49" },
      { id: 3, expression: "380 ÷ 5", correctAnswer: 76, conceptTag: "(380 x 2) ÷ 10 = 760 ÷ 10", explanation: "760 / 10 = 76" },
      { id: 4, expression: "465 ÷ 5", correctAnswer: 93, conceptTag: "(465 x 2) ÷ 10 = 930 ÷ 10", explanation: "930 / 10 = 93" },
      { id: 5, expression: "570 ÷ 5", correctAnswer: 114, conceptTag: "(570 x 2) ÷ 10 = 1140 ÷ 10", explanation: "1140 / 10 = 114" },
      { id: 6, expression: "685 ÷ 5", correctAnswer: 137, conceptTag: "(685 x 2) ÷ 10 = 1370 ÷ 10", explanation: "1370 / 10 = 137" },
      { id: 7, expression: "790 ÷ 5", correctAnswer: 158, conceptTag: "(790 x 2) ÷ 10 = 1580 ÷ 10", explanation: "1580 / 10 = 158" },
      { id: 8, expression: "845 ÷ 5", correctAnswer: 169, conceptTag: "(845 x 2) ÷ 10 = 1690 ÷ 10", explanation: "1690 / 10 = 169" },
      { id: 9, expression: "930 ÷ 5", correctAnswer: 186, conceptTag: "(930 x 2) ÷ 10 = 1860 ÷ 10", explanation: "1860 / 10 = 186" },
      { id: 10, expression: "1250 ÷ 5", correctAnswer: 250, conceptTag: "(1250 x 2) ÷ 10 = 2500 ÷ 10", explanation: "2500 / 10 = 250" },
    ]
  },
  {
    id: "svm2-div-9",
    title: "SVM-2: Division by 9",
    category: "vedic",
    level: "SVM-2",
    topic: "Division by 9",
    description: "Vedic Paravartya / Nikhilam division by 9 (Quotient and Remainder).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "123 ÷ 9 (Quotient)", correctAnswer: 13, conceptTag: "1 | (1+2=3) -> Q=13, R=6", explanation: "123 = 9 x 13 + 6" },
      { id: 2, expression: "214 ÷ 9 (Quotient)", correctAnswer: 23, conceptTag: "2 | (2+1=3) -> Q=23, R=7", explanation: "214 = 9 x 23 + 7" },
      { id: 3, expression: "312 ÷ 9 (Quotient)", correctAnswer: 34, conceptTag: "3 | (3+1=4) -> Q=34, R=6", explanation: "312 = 9 x 34 + 6" },
      { id: 4, expression: "104 ÷ 9 (Quotient)", correctAnswer: 11, conceptTag: "1 | (1+0=1) -> Q=11, R=5", explanation: "104 = 9 x 11 + 5" },
      { id: 5, expression: "411 ÷ 9 (Quotient)", correctAnswer: 45, conceptTag: "4 | (4+1=5) -> Q=45, R=6", explanation: "411 = 9 x 45 + 6" },
      { id: 6, expression: "131 ÷ 9 (Quotient)", correctAnswer: 14, conceptTag: "1 | (1+3=4) -> Q=14, R=5", explanation: "131 = 9 x 14 + 5" },
      { id: 7, expression: "220 ÷ 9 (Quotient)", correctAnswer: 24, conceptTag: "2 | (2+2=4) -> Q=24, R=4", explanation: "220 = 9 x 24 + 4" },
      { id: 8, expression: "502 ÷ 9 (Quotient)", correctAnswer: 55, conceptTag: "5 | (5+0=5) -> Q=55, R=7", explanation: "502 = 9 x 55 + 7" },
      { id: 9, expression: "610 ÷ 9 (Quotient)", correctAnswer: 67, conceptTag: "6 | (6+1=7) -> Q=67, R=7", explanation: "610 = 9 x 67 + 7" },
      { id: 10, expression: "701 ÷ 9 (Quotient)", correctAnswer: 77, conceptTag: "7 | (7+0=7) -> Q=77, R=8", explanation: "701 = 9 x 77 + 8" },
    ]
  },
  {
    id: "svm2-div-8",
    title: "SVM-2: Division by 8",
    category: "vedic",
    level: "SVM-2",
    topic: "Division by 8",
    description: "Vedic Nikhilam division by 8 using complement +2.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "122 ÷ 8 (Quotient)", correctAnswer: 15, conceptTag: "122 = 8 x 15 + 2", explanation: "122 = 8 x 15 + 2" },
      { id: 2, expression: "204 ÷ 8 (Quotient)", correctAnswer: 25, conceptTag: "204 = 8 x 25 + 4", explanation: "204 = 8 x 25 + 4" },
      { id: 3, expression: "315 ÷ 8 (Quotient)", correctAnswer: 39, conceptTag: "315 = 8 x 39 + 3", explanation: "315 = 8 x 39 + 3" },
      { id: 4, expression: "140 ÷ 8 (Quotient)", correctAnswer: 17, conceptTag: "140 = 8 x 17 + 4", explanation: "140 = 8 x 17 + 4" },
      { id: 5, expression: "410 ÷ 8 (Quotient)", correctAnswer: 51, conceptTag: "410 = 8 x 51 + 2", explanation: "410 = 8 x 51 + 2" },
      { id: 6, expression: "502 ÷ 8 (Quotient)", correctAnswer: 62, conceptTag: "502 = 8 x 62 + 6", explanation: "502 = 8 x 62 + 6" },
      { id: 7, expression: "614 ÷ 8 (Quotient)", correctAnswer: 76, conceptTag: "614 = 8 x 76 + 6", explanation: "614 = 8 x 76 + 6" },
      { id: 8, expression: "730 ÷ 8 (Quotient)", correctAnswer: 91, conceptTag: "730 = 8 x 91 + 2", explanation: "730 = 8 x 91 + 2" },
      { id: 9, expression: "825 ÷ 8 (Quotient)", correctAnswer: 103, conceptTag: "825 = 8 x 103 + 1", explanation: "825 = 8 x 103 + 1" },
      { id: 10, expression: "910 ÷ 8 (Quotient)", correctAnswer: 113, conceptTag: "910 = 8 x 113 + 6", explanation: "910 = 8 x 113 + 6" },
    ]
  },
  {
    id: "svm2-div-99",
    title: "SVM-2: Division by 99",
    category: "vedic",
    level: "SVM-2",
    topic: "Division by 99",
    description: "Vedic Nikhilam base 100 division by 99.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "1234 ÷ 99 (Quotient)", correctAnswer: 12, conceptTag: "12 | 34 -> Q=12, R=12+34=46", explanation: "1234 = 99 x 12 + 46" },
      { id: 2, expression: "2345 ÷ 99 (Quotient)", correctAnswer: 23, conceptTag: "23 | 45 -> Q=23, R=23+45=68", explanation: "2345 = 99 x 23 + 68" },
      { id: 3, expression: "3412 ÷ 99 (Quotient)", correctAnswer: 34, conceptTag: "34 | 12 -> Q=34, R=34+12=46", explanation: "3412 = 99 x 34 + 46" },
      { id: 4, expression: "1520 ÷ 99 (Quotient)", correctAnswer: 15, conceptTag: "15 | 20 -> Q=15, R=15+20=35", explanation: "1520 = 99 x 15 + 35" },
      { id: 5, expression: "4125 ÷ 99 (Quotient)", correctAnswer: 41, conceptTag: "41 | 25 -> Q=41, R=41+25=66", explanation: "4125 = 99 x 41 + 66" },
      { id: 6, expression: "5210 ÷ 99 (Quotient)", correctAnswer: 52, conceptTag: "52 | 10 -> Q=52, R=52+10=62", explanation: "5210 = 99 x 52 + 62" },
      { id: 7, expression: "6130 ÷ 99 (Quotient)", correctAnswer: 61, conceptTag: "61 | 30 -> Q=61, R=61+30=91", explanation: "6130 = 99 x 61 + 91" },
      { id: 8, expression: "7015 ÷ 99 (Quotient)", correctAnswer: 70, conceptTag: "70 | 15 -> Q=70, R=70+15=85", explanation: "7015 = 99 x 70 + 85" },
      { id: 9, expression: "8105 ÷ 99 (Quotient)", correctAnswer: 81, conceptTag: "81 | 05 -> Q=81, R=81+5=86", explanation: "8105 = 99 x 81 + 86" },
      { id: 10, expression: "9004 ÷ 99 (Quotient)", correctAnswer: 90, conceptTag: "90 | 04 -> Q=90, R=90+4=94", explanation: "9004 = 99 x 90 + 94" },
    ]
  },
  {
    id: "svm2-div-100",
    title: "SVM-2: Division by 100",
    category: "vedic",
    level: "SVM-2",
    topic: "Division by 100",
    description: "Shift decimal point 2 places left.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "745 ÷ 100", correctAnswer: 7.45, conceptTag: "÷ 100", explanation: "745 ÷ 100 = 7.45" },
      { id: 2, expression: "1280 ÷ 100", correctAnswer: 12.8, conceptTag: "÷ 100", explanation: "1280 ÷ 100 = 12.8" },
      { id: 3, expression: "3550 ÷ 100", correctAnswer: 35.5, conceptTag: "÷ 100", explanation: "3550 ÷ 100 = 35.5" },
      { id: 4, expression: "6825 ÷ 100", correctAnswer: 68.25, conceptTag: "÷ 100", explanation: "6825 ÷ 100 = 68.25" },
      { id: 5, expression: "8900 ÷ 100", correctAnswer: 89, conceptTag: "÷ 100", explanation: "8900 ÷ 100 = 89" },
      { id: 6, expression: "450 ÷ 100", correctAnswer: 4.5, conceptTag: "÷ 100", explanation: "450 ÷ 100 = 4.5" },
      { id: 7, expression: "9275 ÷ 100", correctAnswer: 92.75, conceptTag: "÷ 100", explanation: "9275 ÷ 100 = 92.75" },
      { id: 8, expression: "14500 ÷ 100", correctAnswer: 145, conceptTag: "÷ 100", explanation: "14500 ÷ 100 = 145" },
      { id: 9, expression: "3780 ÷ 100", correctAnswer: 37.8, conceptTag: "÷ 100", explanation: "3780 ÷ 100 = 37.8" },
      { id: 10, expression: "5000 ÷ 100", correctAnswer: 50, conceptTag: "÷ 100", explanation: "5000 ÷ 100 = 50" },
    ]
  },
  {
    id: "svm2-div-1000",
    title: "SVM-2: Division by 1000",
    category: "vedic",
    level: "SVM-2",
    topic: "Division by 1000",
    description: "Shift decimal point 3 places left.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "6850 ÷ 1000", correctAnswer: 6.85, conceptTag: "÷ 1000", explanation: "6850 ÷ 1000 = 6.85" },
      { id: 2, expression: "14500 ÷ 1000", correctAnswer: 14.5, conceptTag: "÷ 1000", explanation: "14500 ÷ 1000 = 14.5" },
      { id: 3, expression: "28750 ÷ 1000", correctAnswer: 28.75, conceptTag: "÷ 1000", explanation: "28750 ÷ 1000 = 28.75" },
      { id: 4, expression: "35000 ÷ 1000", correctAnswer: 35, conceptTag: "÷ 1000", explanation: "35000 ÷ 1000 = 35" },
      { id: 5, expression: "42800 ÷ 1000", correctAnswer: 42.8, conceptTag: "÷ 1000", explanation: "42800 ÷ 1000 = 42.8" },
      { id: 6, expression: "7500 ÷ 1000", correctAnswer: 7.5, conceptTag: "÷ 1000", explanation: "7500 ÷ 1000 = 7.5" },
      { id: 7, expression: "93250 ÷ 1000", correctAnswer: 93.25, conceptTag: "÷ 1000", explanation: "93250 ÷ 1000 = 93.25" },
      { id: 8, expression: "120000 ÷ 1000", correctAnswer: 120, conceptTag: "÷ 1000", explanation: "120000 ÷ 1000 = 120" },
      { id: 9, expression: "54300 ÷ 1000", correctAnswer: 54.3, conceptTag: "÷ 1000", explanation: "54300 ÷ 1000 = 54.3" },
      { id: 10, expression: "80000 ÷ 1000", correctAnswer: 80, conceptTag: "÷ 1000", explanation: "80000 ÷ 1000 = 80" },
    ]
  },
  {
    id: "svm2-div-25",
    title: "SVM-2: Division by 25",
    category: "vedic",
    level: "SVM-2",
    topic: "Division by 25",
    description: "Quadruple the number and divide by 100 (N x 4 / 100).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "325 ÷ 25", correctAnswer: 13, conceptTag: "(325 x 4) ÷ 100 = 1300 ÷ 100", explanation: "1300 / 100 = 13" },
      { id: 2, expression: "450 ÷ 25", correctAnswer: 18, conceptTag: "(450 x 4) ÷ 100 = 1800 ÷ 100", explanation: "1800 / 100 = 18" },
      { id: 3, expression: "675 ÷ 25", correctAnswer: 27, conceptTag: "(675 x 4) ÷ 100 = 2700 ÷ 100", explanation: "2700 / 100 = 27" },
      { id: 4, expression: "850 ÷ 25", correctAnswer: 34, conceptTag: "(850 x 4) ÷ 100 = 3400 ÷ 100", explanation: "3400 / 100 = 34" },
      { id: 5, expression: "1125 ÷ 25", correctAnswer: 45, conceptTag: "(1125 x 4) ÷ 100 = 4500 ÷ 100", explanation: "4500 / 100 = 45" },
      { id: 6, expression: "1400 ÷ 25", correctAnswer: 56, conceptTag: "(1400 x 4) ÷ 100 = 5600 ÷ 100", explanation: "5600 / 100 = 56" },
      { id: 7, expression: "1750 ÷ 25", correctAnswer: 70, conceptTag: "(1750 x 4) ÷ 100 = 7000 ÷ 100", explanation: "7000 / 100 = 70" },
      { id: 8, expression: "2250 ÷ 25", correctAnswer: 90, conceptTag: "(2250 x 4) ÷ 100 = 9000 ÷ 100", explanation: "9000 / 100 = 90" },
      { id: 9, expression: "2875 ÷ 25", correctAnswer: 115, conceptTag: "(2875 x 4) ÷ 100 = 11500 ÷ 100", explanation: "11500 / 100 = 115" },
      { id: 10, expression: "3500 ÷ 25", correctAnswer: 140, conceptTag: "(3500 x 4) ÷ 100 = 14000 ÷ 100", explanation: "14000 / 100 = 140" },
    ]
  },
  {
    id: "svm2-div-50",
    title: "SVM-2: Division by 50",
    category: "vedic",
    level: "SVM-2",
    topic: "Division by 50",
    description: "Double the number and divide by 100 (N x 2 / 100).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "450 ÷ 50", correctAnswer: 9, conceptTag: "(450 x 2) ÷ 100 = 900 ÷ 100", explanation: "900 / 100 = 9" },
      { id: 2, expression: "750 ÷ 50", correctAnswer: 15, conceptTag: "(750 x 2) ÷ 100 = 1500 ÷ 100", explanation: "1500 / 100 = 15" },
      { id: 3, expression: "1250 ÷ 50", correctAnswer: 25, conceptTag: "(1250 x 2) ÷ 100 = 2500 ÷ 100", explanation: "2500 / 100 = 25" },
      { id: 4, expression: "1850 ÷ 50", correctAnswer: 37, conceptTag: "(1850 x 2) ÷ 100 = 3700 ÷ 100", explanation: "3700 / 100 = 37" },
      { id: 5, expression: "2450 ÷ 50", correctAnswer: 49, conceptTag: "(2450 x 2) ÷ 100 = 4900 ÷ 100", explanation: "4900 / 100 = 49" },
      { id: 6, expression: "3200 ÷ 50", correctAnswer: 64, conceptTag: "(3200 x 2) ÷ 100 = 6400 ÷ 100", explanation: "6400 / 100 = 64" },
      { id: 7, expression: "4150 ÷ 50", correctAnswer: 83, conceptTag: "(4150 x 2) ÷ 100 = 8300 ÷ 100", explanation: "8300 / 100 = 83" },
      { id: 8, expression: "5300 ÷ 50", correctAnswer: 106, conceptTag: "(5300 x 2) ÷ 100 = 10600 ÷ 100", explanation: "10600 / 100 = 106" },
      { id: 9, expression: "6750 ÷ 50", correctAnswer: 135, conceptTag: "(6750 x 2) ÷ 100 = 13500 ÷ 100", explanation: "13500 / 100 = 135" },
      { id: 10, expression: "8400 ÷ 50", correctAnswer: 168, conceptTag: "(8400 x 2) ÷ 100 = 16800 ÷ 100", explanation: "16800 / 100 = 168" },
    ]
  },
  {
    id: "svm2-sub-100",
    title: "SVM-2: Subtraction from 100",
    category: "vedic",
    level: "SVM-2",
    topic: "Subtraction from 100",
    description: "Nikhilam Sutra (All from 9 and last from 10).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "100 - 37", correctAnswer: 63, conceptTag: "(9-3) | (10-7) = 63", explanation: "9-3=6, 10-7=3 -> 63" },
      { id: 2, expression: "100 - 48", correctAnswer: 52, conceptTag: "(9-4) | (10-8) = 52", explanation: "9-4=5, 10-8=2 -> 52" },
      { id: 3, expression: "100 - 64", correctAnswer: 36, conceptTag: "(9-6) | (10-4) = 36", explanation: "9-6=3, 10-4=6 -> 36" },
      { id: 4, expression: "100 - 82", correctAnswer: 18, conceptTag: "(9-8) | (10-2) = 18", explanation: "9-8=1, 10-2=8 -> 18" },
      { id: 5, expression: "100 - 19", correctAnswer: 81, conceptTag: "(9-1) | (10-9) = 81", explanation: "9-1=8, 10-9=1 -> 81" },
      { id: 6, expression: "100 - 73", correctAnswer: 27, conceptTag: "(9-7) | (10-3) = 27", explanation: "9-7=2, 10-3=7 -> 27" },
      { id: 7, expression: "100 - 55", correctAnswer: 45, conceptTag: "(9-5) | (10-5) = 45", explanation: "9-5=4, 10-5=5 -> 45" },
      { id: 8, expression: "100 - 26", correctAnswer: 74, conceptTag: "(9-2) | (10-6) = 74", explanation: "9-2=7, 10-6=4 -> 74" },
      { id: 9, expression: "100 - 91", correctAnswer: 9, conceptTag: "(9-9) | (10-1) = 09", explanation: "9-9=0, 10-1=9 -> 9" },
      { id: 10, expression: "100 - 43", correctAnswer: 57, conceptTag: "(9-4) | (10-3) = 57", explanation: "9-4=5, 10-3=7 -> 57" },
    ]
  },
  {
    id: "svm2-sub-100-decimal",
    title: "SVM-2: Subtraction from 100 & Decimal Subtraction",
    category: "vedic",
    level: "SVM-2",
    topic: "Subtraction from 100 & Decimal Subtraction",
    description: "Nikhilam Sutra applied to 100 with decimals.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "100 - 45.65", correctAnswer: 54.35, conceptTag: "Nikhilam Decimals", explanation: "9-4=5, 9-5=4 . 9-6=3, 10-5=5 -> 54.35" },
      { id: 2, expression: "100 - 28.40", correctAnswer: 71.6, conceptTag: "Nikhilam Decimals", explanation: "100 - 28.40 = 71.60" },
      { id: 3, expression: "100 - 62.75", correctAnswer: 37.25, conceptTag: "Nikhilam Decimals", explanation: "100 - 62.75 = 37.25" },
      { id: 4, expression: "100 - 17.85", correctAnswer: 82.15, conceptTag: "Nikhilam Decimals", explanation: "100 - 17.85 = 82.15" },
      { id: 5, expression: "100 - 83.20", correctAnswer: 16.8, conceptTag: "Nikhilam Decimals", explanation: "100 - 83.20 = 16.80" },
      { id: 6, expression: "100 - 39.50", correctAnswer: 60.5, conceptTag: "Nikhilam Decimals", explanation: "100 - 39.50 = 60.50" },
      { id: 7, expression: "100 - 74.15", correctAnswer: 25.85, conceptTag: "Nikhilam Decimals", explanation: "100 - 74.15 = 25.85" },
      { id: 8, expression: "100 - 51.90", correctAnswer: 48.1, conceptTag: "Nikhilam Decimals", explanation: "100 - 51.90 = 48.10" },
      { id: 9, expression: "100 - 12.35", correctAnswer: 87.65, conceptTag: "Nikhilam Decimals", explanation: "100 - 12.35 = 87.65" },
      { id: 10, expression: "100 - 94.80", correctAnswer: 5.2, conceptTag: "Nikhilam Decimals", explanation: "100 - 94.80 = 5.20" },
    ]
  },
  {
    id: "svm2-sub-1000",
    title: "SVM-2: Subtraction from 1000",
    category: "vedic",
    level: "SVM-2",
    topic: "Subtraction from 1000",
    description: "Nikhilam Sutra for 3-digit subtraction from 1000.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "1000 - 468", correctAnswer: 532, conceptTag: "(9-4) | (9-6) | (10-8)", explanation: "9-4=5, 9-6=3, 10-8=2 -> 532" },
      { id: 2, expression: "1000 - 275", correctAnswer: 725, conceptTag: "(9-2) | (9-7) | (10-5)", explanation: "9-2=7, 9-7=2, 10-5=5 -> 725" },
      { id: 3, expression: "1000 - 684", correctAnswer: 316, conceptTag: "(9-6) | (9-8) | (10-4)", explanation: "9-6=3, 9-8=1, 10-4=6 -> 316" },
      { id: 4, expression: "1000 - 819", correctAnswer: 181, conceptTag: "(9-8) | (9-1) | (10-9)", explanation: "9-8=1, 9-1=8, 10-9=1 -> 181" },
      { id: 5, expression: "1000 - 153", correctAnswer: 847, conceptTag: "(9-1) | (9-5) | (10-3)", explanation: "9-1=8, 9-5=4, 10-3=7 -> 847" },
      { id: 6, expression: "1000 - 392", correctAnswer: 608, conceptTag: "(9-3) | (9-9) | (10-2)", explanation: "9-3=6, 9-9=0, 10-2=8 -> 608" },
      { id: 7, expression: "1000 - 540", correctAnswer: 460, conceptTag: "(9-5) | (10-4) | 0", explanation: "9-5=4, 10-4=6 -> 460" },
      { id: 8, expression: "1000 - 726", correctAnswer: 274, conceptTag: "(9-7) | (9-2) | (10-6)", explanation: "9-7=2, 9-2=7, 10-6=4 -> 274" },
      { id: 9, expression: "1000 - 905", correctAnswer: 95, conceptTag: "(9-9) | (9-0) | (10-5)", explanation: "9-9=0, 9-0=9, 10-5=5 -> 95" },
      { id: 10, expression: "1000 - 637", correctAnswer: 363, conceptTag: "(9-6) | (9-3) | (10-7)", explanation: "9-6=3, 9-3=6, 10-7=3 -> 363" },
    ]
  },
  {
    id: "svm2-sub-1000-decimal",
    title: "SVM-2: Subtraction from 1000 & Decimal Subtraction",
    category: "vedic",
    level: "SVM-2",
    topic: "Subtraction from 100 & Decimal Subtraction",
    description: "Nikhilam Sutra applied to 1000 with decimals.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "1000 - 234.75", correctAnswer: 765.25, conceptTag: "Nikhilam 1000 Decimals", explanation: "1000 - 234.75 = 765.25" },
      { id: 2, expression: "1000 - 456.50", correctAnswer: 543.5, conceptTag: "Nikhilam 1000 Decimals", explanation: "1000 - 456.50 = 543.50" },
      { id: 3, expression: "1000 - 682.25", correctAnswer: 317.75, conceptTag: "Nikhilam 1000 Decimals", explanation: "1000 - 682.25 = 317.75" },
      { id: 4, expression: "1000 - 189.40", correctAnswer: 810.6, conceptTag: "Nikhilam 1000 Decimals", explanation: "1000 - 189.40 = 810.60" },
      { id: 5, expression: "1000 - 725.80", correctAnswer: 274.2, conceptTag: "Nikhilam 1000 Decimals", explanation: "1000 - 725.80 = 274.20" },
      { id: 6, expression: "1000 - 340.15", correctAnswer: 659.85, conceptTag: "Nikhilam 1000 Decimals", explanation: "1000 - 340.15 = 659.85" },
      { id: 7, expression: "1000 - 515.60", correctAnswer: 484.4, conceptTag: "Nikhilam 1000 Decimals", explanation: "1000 - 515.60 = 484.40" },
      { id: 8, expression: "1000 - 890.35", correctAnswer: 109.65, conceptTag: "Nikhilam 1000 Decimals", explanation: "1000 - 890.35 = 109.65" },
      { id: 9, expression: "1000 - 128.90", correctAnswer: 871.1, conceptTag: "Nikhilam 1000 Decimals", explanation: "1000 - 128.90 = 871.10" },
      { id: 10, expression: "1000 - 945.50", correctAnswer: 54.5, conceptTag: "Nikhilam 1000 Decimals", explanation: "1000 - 945.50 = 54.50" },
    ]
  },
  {
    id: "svm2-add-time",
    title: "SVM-2: Addition of Time",
    category: "vedic",
    level: "SVM-2",
    topic: "Addition of Time",
    description: "Vedic base 60 addition for hours and minutes.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "3h 45m + 2h 35m", correctAnswer: 6.2, conceptTag: "45+35=80m -> 1h 20m", explanation: "3h+2h+1h 20m = 6h 20m" },
      { id: 2, expression: "4h 50m + 1h 25m", correctAnswer: 6.15, conceptTag: "50+25=75m -> 1h 15m", explanation: "4h+1h+1h 15m = 6h 15m" },
      { id: 3, expression: "2h 40m + 3h 30m", correctAnswer: 6.1, conceptTag: "40+30=70m -> 1h 10m", explanation: "2h+3h+1h 10m = 6h 10m" },
      { id: 4, expression: "5h 15m + 2h 55m", correctAnswer: 8.1, conceptTag: "15+55=70m -> 1h 10m", explanation: "5h+2h+1h 10m = 8h 10m" },
      { id: 5, expression: "1h 35m + 4h 40m", correctAnswer: 6.15, conceptTag: "35+40=75m -> 1h 15m", explanation: "1h+4h+1h 15m = 6h 15m" },
      { id: 6, expression: "3h 50m + 3h 45m", correctAnswer: 7.35, conceptTag: "50+45=95m -> 1h 35m", explanation: "3h+3h+1h 35m = 7h 35m" },
      { id: 7, expression: "2h 25m + 5h 45m", correctAnswer: 8.1, conceptTag: "25+45=70m -> 1h 10m", explanation: "2h+5h+1h 10m = 8h 10m" },
      { id: 8, expression: "4h 40m + 2h 40m", correctAnswer: 7.2, conceptTag: "40+40=80m -> 1h 20m", explanation: "4h+2h+1h 20m = 7h 20m" },
      { id: 9, expression: "6h 10m + 1h 55m", correctAnswer: 8.05, conceptTag: "10+55=65m -> 1h 05m", explanation: "6h+1h+1h 05m = 8h 05m" },
      { id: 10, expression: "3h 30m + 4h 45m", correctAnswer: 8.15, conceptTag: "30+45=75m -> 1h 15m", explanation: "3h+4h+1h 15m = 8h 15m" },
    ]
  },
  {
    id: "svm2-sub-time",
    title: "SVM-2: Subtraction of Time",
    category: "vedic",
    level: "SVM-2",
    topic: "Subtraction of Time",
    description: "Vedic base 60 borrowing for hours and minutes.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "5h 15m - 2h 40m", correctAnswer: 2.35, conceptTag: "Borrow 60m: 75-40=35m", explanation: "4h 75m - 2h 40m = 2h 35m" },
      { id: 2, expression: "6h 10m - 3h 45m", correctAnswer: 2.25, conceptTag: "Borrow 60m: 70-45=25m", explanation: "5h 70m - 3h 45m = 2h 25m" },
      { id: 3, expression: "4h 20m - 1h 50m", correctAnswer: 2.3, conceptTag: "Borrow 60m: 80-50=30m", explanation: "3h 80m - 1h 50m = 2h 30m" },
      { id: 4, expression: "7h 05m - 4h 35m", correctAnswer: 2.3, conceptTag: "Borrow 60m: 65-35=30m", explanation: "6h 65m - 4h 35m = 2h 30m" },
      { id: 5, expression: "8h 15m - 3h 40m", correctAnswer: 4.35, conceptTag: "Borrow 60m: 75-40=35m", explanation: "7h 75m - 3h 40m = 4h 35m" },
      { id: 6, expression: "5h 30m - 2h 45m", correctAnswer: 2.45, conceptTag: "Borrow 60m: 90-45=45m", explanation: "4h 90m - 2h 45m = 2h 45m" },
      { id: 7, expression: "9h 10m - 5h 30m", correctAnswer: 3.4, conceptTag: "Borrow 60m: 70-30=40m", explanation: "8h 70m - 5h 30m = 3h 40m" },
      { id: 8, expression: "6h 25m - 1h 55m", correctAnswer: 4.3, conceptTag: "Borrow 60m: 85-55=30m", explanation: "5h 85m - 1h 55m = 4h 30m" },
      { id: 9, expression: "7h 40m - 3h 50m", correctAnswer: 3.5, conceptTag: "Borrow 60m: 100-50=50m", explanation: "6h 100m - 3h 50m = 3h 50m" },
      { id: 10, expression: "4h 05m - 2h 20m", correctAnswer: 1.45, conceptTag: "Borrow 60m: 65-20=45m", explanation: "3h 65m - 2h 20m = 1h 45m" },
    ]
  },
  {
    id: "svm2-count-rectangles",
    title: "SVM-2: Count the Number of Rectangle",
    category: "vedic",
    level: "SVM-2",
    topic: "Count the Number of Rectangle",
    description: "Spatial formula [r(r+1)/2] x [c(c+1)/2] for rectangular grids.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Rectangles in 3 × 3 Grid", correctAnswer: 36, conceptTag: "(1+2+3) x (1+2+3) = 6 x 6", explanation: "6 x 6 = 36 rectangles" },
      { id: 2, expression: "Rectangles in 2 × 3 Grid", correctAnswer: 18, conceptTag: "(1+2) x (1+2+3) = 3 x 6", explanation: "3 x 6 = 18 rectangles" },
      { id: 3, expression: "Rectangles in 3 × 4 Grid", correctAnswer: 60, conceptTag: "(1+2+3) x (1+2+3+4) = 6 x 10", explanation: "6 x 10 = 60 rectangles" },
      { id: 4, expression: "Rectangles in 4 × 4 Grid", correctAnswer: 100, conceptTag: "(1+2+3+4) x (1+2+3+4) = 10 x 10", explanation: "10 x 10 = 100 rectangles" },
      { id: 5, expression: "Rectangles in 2 × 4 Grid", correctAnswer: 30, conceptTag: "(1+2) x (1+2+3+4) = 3 x 10", explanation: "3 x 10 = 30 rectangles" },
      { id: 6, expression: "Rectangles in 3 × 5 Grid", correctAnswer: 90, conceptTag: "(1+2+3) x (1+2+3+4+5) = 6 x 15", explanation: "6 x 15 = 90 rectangles" },
      { id: 7, expression: "Rectangles in 4 × 5 Grid", correctAnswer: 150, conceptTag: "(1+2+3+4) x (1+2+3+4+5) = 10 x 15", explanation: "10 x 15 = 150 rectangles" },
      { id: 8, expression: "Rectangles in 5 × 5 Grid", correctAnswer: 225, conceptTag: "(15) x (15) = 225", explanation: "15 x 15 = 225 rectangles" },
      { id: 9, expression: "Rectangles in 2 × 5 Grid", correctAnswer: 45, conceptTag: "(3) x (15) = 45", explanation: "3 x 15 = 45 rectangles" },
      { id: 10, expression: "Rectangles in 3 × 6 Grid", correctAnswer: 126, conceptTag: "(6) x (21) = 126", explanation: "6 x 21 = 126 rectangles" },
    ]
  },
  {
    id: "svm2-count-squares",
    title: "SVM-2: Count the Number of Squares",
    category: "vedic",
    level: "SVM-2",
    topic: "Count the Number of Squares",
    description: "Spatial grid formula sum of r x c for squares.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Squares in 3 × 3 Grid", correctAnswer: 14, conceptTag: "3x3 + 2x2 + 1x1 = 9+4+1", explanation: "9 + 4 + 1 = 14 squares" },
      { id: 2, expression: "Squares in 4 × 4 Grid", correctAnswer: 30, conceptTag: "16 + 9 + 4 + 1 = 30", explanation: "16 + 9 + 4 + 1 = 30 squares" },
      { id: 3, expression: "Squares in 2 × 3 Grid", correctAnswer: 8, conceptTag: "2x3 + 1x2 = 6 + 2 = 8", explanation: "6 + 2 = 8 squares" },
      { id: 4, expression: "Squares in 3 × 4 Grid", correctAnswer: 20, conceptTag: "3x4 + 2x3 + 1x2 = 12+6+2", explanation: "12 + 6 + 2 = 20 squares" },
      { id: 5, expression: "Squares in 5 × 5 Grid", correctAnswer: 55, conceptTag: "25+16+9+4+1 = 55", explanation: "25 + 16 + 9 + 4 + 1 = 55 squares" },
      { id: 6, expression: "Squares in 2 × 4 Grid", correctAnswer: 11, conceptTag: "2x4 + 1x3 = 8 + 3 = 11", explanation: "8 + 3 = 11 squares" },
      { id: 7, expression: "Squares in 4 × 5 Grid", correctAnswer: 40, conceptTag: "4x5 + 3x4 + 2x3 + 1x2", explanation: "20 + 12 + 6 + 2 = 40 squares" },
      { id: 8, expression: "Squares in 3 × 5 Grid", correctAnswer: 26, conceptTag: "3x5 + 2x4 + 1x3 = 15+8+3", explanation: "15 + 8 + 3 = 26 squares" },
      { id: 9, expression: "Squares in 6 × 6 Grid", correctAnswer: 91, conceptTag: "36+25+16+9+4+1 = 91", explanation: "36 + 25 + 16 + 9 + 4 + 1 = 91 squares" },
      { id: 10, expression: "Squares in 2 × 5 Grid", correctAnswer: 14, conceptTag: "2x5 + 1x4 = 10 + 4 = 14", explanation: "10 + 4 = 14 squares" },
    ]
  },
  {
    id: "vedic-svm2-overall",
    title: "SVM-2-Overall (Comprehensive Level Master Quiz)",
    category: "vedic",
    level: "SVM-2",
    topic: "15. SVM-2-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all Senior Vedic Math Level 2 topics: Special Multiplications, Division Sutras, Time Arithmetic.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "123 ÷ 9", correctAnswer: 13, conceptTag: "SVM-2 Overall" }
    ]
  },

  // ==========================================
  // SVM-1 LEVEL (Senior Vedic Math Level 1 - 25 Topics)
  // ==========================================
  {
    id: "svm1-addition",
    title: "SVM-1: Multi-Digit Addition",
    category: "vedic",
    level: "SVM-1",
    topic: "Addition",
    description: "Multi-digit left-to-right Vedic addition drills.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "158 + 247", correctAnswer: 405, conceptTag: "Left to Right Addition", explanation: "100+200=300, 50+40=90, 8+7=15 -> 300+90+15 = 405" },
      { id: 2, expression: "264 + 389", correctAnswer: 653, conceptTag: "Left to Right Addition", explanation: "200+300=500, 60+80=140, 4+9=13 -> 500+140+13 = 653" },
      { id: 3, expression: "437 + 285", correctAnswer: 722, conceptTag: "Left to Right Addition", explanation: "400+200=600, 30+80=110, 7+5=12 -> 600+110+12 = 722" },
      { id: 4, expression: "582 + 369", correctAnswer: 951, conceptTag: "Left to Right Addition", explanation: "500+300=800, 80+60=140, 2+9=11 -> 800+140+11 = 951" },
      { id: 5, expression: "649 + 278", correctAnswer: 927, conceptTag: "Left to Right Addition", explanation: "600+200=800, 40+70=110, 9+8=17 -> 800+110+17 = 927" },
      { id: 6, expression: "715 + 496", correctAnswer: 1211, conceptTag: "Left to Right Addition", explanation: "700+400=1100, 10+90=100, 5+6=11 -> 1100+100+11 = 1211" },
      { id: 7, expression: "834 + 579", correctAnswer: 1413, conceptTag: "Left to Right Addition", explanation: "800+500=1300, 30+70=100, 4+9=13 -> 1300+100+13 = 1413" },
      { id: 8, expression: "928 + 685", correctAnswer: 1613, conceptTag: "Left to Right Addition", explanation: "900+600=1500, 20+80=100, 8+5=13 -> 1500+100+13 = 1613" },
      { id: 9, expression: "376 + 549", correctAnswer: 925, conceptTag: "Left to Right Addition", explanation: "300+500=800, 70+40=110, 6+9=15 -> 800+110+15 = 925" },
      { id: 10, expression: "489 + 673", correctAnswer: 1162, conceptTag: "Left to Right Addition", explanation: "400+600=1000, 80+70=150, 9+3=12 -> 1000+150+12 = 1162" },
    ]
  },
  {
    id: "svm1-ekadhik",
    title: "SVM-1: Ekadhik Sutra",
    category: "vedic",
    level: "SVM-1",
    topic: "Ekadhik",
    description: "One more than previous digit for 3-digit and 4-digit numbers.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Ekadhik of 499", correctAnswer: 500, conceptTag: "499 + 1 = 500", explanation: "499 + 1 = 500" },
      { id: 2, expression: "Ekadhik of 1289", correctAnswer: 1290, conceptTag: "1289 + 1 = 1290", explanation: "1289 + 1 = 1290" },
      { id: 3, expression: "Ekadhik of 3450", correctAnswer: 3451, conceptTag: "3450 + 1 = 3451", explanation: "3450 + 1 = 3451" },
      { id: 4, expression: "Ekadhik of 9999", correctAnswer: 10000, conceptTag: "9999 + 1 = 10000", explanation: "9999 + 1 = 10000" },
      { id: 5, expression: "Ekadhik of 6749", correctAnswer: 6750, conceptTag: "6749 + 1 = 6750", explanation: "6749 + 1 = 6750" },
      { id: 6, expression: "Ekadhik of 8099", correctAnswer: 8100, conceptTag: "8099 + 1 = 8100", explanation: "8099 + 1 = 8100" },
      { id: 7, expression: "Ekadhik of 2399", correctAnswer: 2400, conceptTag: "2399 + 1 = 2400", explanation: "2399 + 1 = 2400" },
      { id: 8, expression: "Ekadhik of 5689", correctAnswer: 5690, conceptTag: "5689 + 1 = 5690", explanation: "5689 + 1 = 5690" },
      { id: 9, expression: "Ekadhik of 7499", correctAnswer: 7500, conceptTag: "7499 + 1 = 7500", explanation: "7499 + 1 = 7500" },
      { id: 10, expression: "Ekadhik of 9199", correctAnswer: 9200, conceptTag: "9199 + 1 = 9200", explanation: "9199 + 1 = 9200" },
    ]
  },
  {
    id: "svm1-ekanyunena",
    title: "SVM-1: Ekanyunena Sutra",
    category: "vedic",
    level: "SVM-1",
    topic: "Ekanyunena",
    description: "One less than previous digit for 3-digit and 4-digit numbers.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Ekanyunena of 1000", correctAnswer: 999, conceptTag: "1000 - 1 = 999", explanation: "1000 - 1 = 999" },
      { id: 2, expression: "Ekanyunena of 2500", correctAnswer: 2499, conceptTag: "2500 - 1 = 2499", explanation: "2500 - 1 = 2499" },
      { id: 3, expression: "Ekanyunena of 4310", correctAnswer: 4309, conceptTag: "4310 - 1 = 4309", explanation: "4310 - 1 = 4309" },
      { id: 4, expression: "Ekanyunena of 6000", correctAnswer: 5999, conceptTag: "6000 - 1 = 5999", explanation: "6000 - 1 = 5999" },
      { id: 5, expression: "Ekanyunena of 7890", correctAnswer: 7889, conceptTag: "7890 - 1 = 7889", explanation: "7890 - 1 = 7889" },
      { id: 6, expression: "Ekanyunena of 8200", correctAnswer: 8199, conceptTag: "8200 - 1 = 8199", explanation: "8200 - 1 = 8199" },
      { id: 7, expression: "Ekanyunena of 3400", correctAnswer: 3399, conceptTag: "3400 - 1 = 3399", explanation: "3400 - 1 = 3399" },
      { id: 8, expression: "Ekanyunena of 9000", correctAnswer: 8999, conceptTag: "9000 - 1 = 8999", explanation: "9000 - 1 = 8999" },
      { id: 9, expression: "Ekanyunena of 5100", correctAnswer: 5099, conceptTag: "5100 - 1 = 5099", explanation: "5100 - 1 = 5099" },
      { id: 10, expression: "Ekanyunena of 1500", correctAnswer: 1499, conceptTag: "1500 - 1 = 1499", explanation: "1500 - 1 = 1499" },
    ]
  },
  {
    id: "svm1-balancing",
    title: "SVM-1: Balancing (Thumb Rule)",
    category: "vedic",
    level: "SVM-1",
    topic: "Balancing ( Thumb Rule )",
    description: "4-partition Balancing Rule drills.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Balance: 4 | 18 | 9", correctAnswer: 589, conceptTag: "Balancing Rule", explanation: "4 | 18 | 9 -> (4+1) | 8 | 9 = 589" },
      { id: 2, expression: "Balance: 6 | 24 | 15 | 8", correctAnswer: 8558, conceptTag: "4-Partition Balancing", explanation: "Right=8. Next=15 (keep 5, carry 1). Next=24+1=25 (keep 5, carry 2). Left=6+2=8 -> 8558" },
      { id: 3, expression: "Balance: 5 | 16 | 23 | 7", correctAnswer: 6837, conceptTag: "4-Partition Balancing", explanation: "5 | 16 | 23 | 7 -> 6837" },
      { id: 4, expression: "Balance: 3 | 27 | 14 | 9", correctAnswer: 5849, conceptTag: "4-Partition Balancing", explanation: "3 | 27 | 14 | 9 -> 5849" },
      { id: 5, expression: "Balance: 7 | 19 | 35 | 4", correctAnswer: 9254, conceptTag: "4-Partition Balancing", explanation: "7 | 19 | 35 | 4 -> 9254" },
      { id: 6, expression: "Balance: 2 | 31 | 18 | 6", correctAnswer: 5286, conceptTag: "4-Partition Balancing", explanation: "2 | 31 | 18 | 6 -> 5286" },
      { id: 7, expression: "Balance: 8 | 15 | 29 | 3", correctAnswer: 9793, conceptTag: "4-Partition Balancing", explanation: "8 | 15 | 29 | 3 -> 9793" },
      { id: 8, expression: "Balance: 4 | 22 | 16 | 5", correctAnswer: 6365, conceptTag: "4-Partition Balancing", explanation: "4 | 22 | 16 | 5 -> 6365" },
      { id: 9, expression: "Balance: 6 | 13 | 42 | 8", correctAnswer: 7728, conceptTag: "4-Partition Balancing", explanation: "6 | 13 | 42 | 8 -> 7728" },
      { id: 10, expression: "Balance: 9 | 17 | 25 | 2", correctAnswer: 10952, conceptTag: "4-Partition Balancing", explanation: "9 | 17 | 25 | 2 -> 10952" },
    ]
  },
  {
    id: "svm1-dodging-table",
    title: "SVM-1: Dodging Tables (12-25)",
    category: "vedic",
    level: "SVM-1",
    topic: "Dodging Table",
    description: "Instant mental recall of table facts up to 25.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "23 × 7", correctAnswer: 161, conceptTag: "Table 23", explanation: "20x7 + 3x7 = 140 + 21 = 161" },
      { id: 2, expression: "24 × 8", correctAnswer: 192, conceptTag: "Table 24", explanation: "20x8 + 4x8 = 160 + 32 = 192" },
      { id: 3, expression: "22 × 9", correctAnswer: 198, conceptTag: "Table 22", explanation: "20x9 + 2x9 = 180 + 18 = 198" },
      { id: 4, expression: "25 × 7", correctAnswer: 175, conceptTag: "Table 25", explanation: "25 x 7 = 175" },
      { id: 5, expression: "21 × 8", correctAnswer: 168, conceptTag: "Table 21", explanation: "20x8 + 1x8 = 160 + 8 = 168" },
      { id: 6, expression: "24 × 6", correctAnswer: 144, conceptTag: "Table 24", explanation: "20x6 + 4x6 = 120 + 24 = 144" },
      { id: 7, expression: "23 × 9", correctAnswer: 207, conceptTag: "Table 23", explanation: "20x9 + 3x9 = 180 + 27 = 207" },
      { id: 8, expression: "22 × 7", correctAnswer: 154, conceptTag: "Table 22", explanation: "20x7 + 2x7 = 140 + 14 = 154" },
      { id: 9, expression: "25 × 9", correctAnswer: 225, conceptTag: "Table 25", explanation: "25 x 9 = 225" },
      { id: 10, expression: "21 × 9", correctAnswer: 189, conceptTag: "Table 21", explanation: "20x9 + 1x9 = 180 + 9 = 189" },
    ]
  },
  {
    id: "svm1-table-formation",
    title: "SVM-1: Table Formation",
    category: "vedic",
    level: "SVM-1",
    topic: "Table Formation",
    description: "Construct any 2-digit table using Vedic partitioning and balancing.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Table of 74: 74 × 6", correctAnswer: 444, conceptTag: "(7x6) | (4x6) = 42 | 24", explanation: "42 | 24 -> (42+2) | 4 = 444" },
      { id: 2, expression: "Table of 63: 63 × 7", correctAnswer: 441, conceptTag: "(6x7) | (3x7) = 42 | 21", explanation: "42 | 21 -> (42+2) | 1 = 441" },
      { id: 3, expression: "Table of 82: 82 × 8", correctAnswer: 656, conceptTag: "(8x8) | (2x8) = 64 | 16", explanation: "64 | 16 -> (64+1) | 6 = 656" },
      { id: 4, expression: "Table of 94: 94 × 7", correctAnswer: 658, conceptTag: "(9x7) | (4x7) = 63 | 28", explanation: "63 | 28 -> (63+2) | 8 = 658" },
      { id: 5, expression: "Table of 56: 56 × 8", correctAnswer: 448, conceptTag: "(5x8) | (6x8) = 40 | 48", explanation: "40 | 48 -> (40+4) | 8 = 448" },
      { id: 6, expression: "Table of 47: 47 × 9", correctAnswer: 423, conceptTag: "(4x9) | (7x9) = 36 | 63", explanation: "36 | 63 -> (36+6) | 3 = 423" },
      { id: 7, expression: "Table of 85: 85 × 7", correctAnswer: 595, conceptTag: "(8x7) | (5x7) = 56 | 35", explanation: "56 | 35 -> (56+3) | 5 = 595" },
      { id: 8, expression: "Table of 76: 76 × 8", correctAnswer: 608, conceptTag: "(7x8) | (6x8) = 56 | 48", explanation: "56 | 48 -> (56+4) | 8 = 608" },
      { id: 9, expression: "Table of 93: 93 × 9", correctAnswer: 837, conceptTag: "(9x9) | (3x9) = 81 | 27", explanation: "81 | 27 -> (81+2) | 7 = 837" },
      { id: 10, expression: "Table of 68: 68 × 9", correctAnswer: 612, conceptTag: "(6x9) | (8x9) = 54 | 72", explanation: "54 | 72 -> (54+7) | 2 = 612" },
    ]
  },
  {
    id: "svm1-mult-start-1",
    title: "SVM-1: Multiplication - Number Starting with 1",
    category: "vedic",
    level: "SVM-1",
    topic: "Multiplication - Number Starting with 1",
    description: "Teens multiplication with larger carry overs.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "17 × 14", correctAnswer: 238, conceptTag: "(17+4) | (7x4) = 21 | 28", explanation: "21 | 28 -> (21+2) | 8 = 238" },
      { id: 2, expression: "18 × 16", correctAnswer: 288, conceptTag: "(18+6) | (8x6) = 24 | 48", explanation: "24 | 48 -> (24+4) | 8 = 288" },
      { id: 3, expression: "19 × 17", correctAnswer: 323, conceptTag: "(19+7) | (9x7) = 26 | 63", explanation: "26 | 63 -> (26+6) | 3 = 323" },
      { id: 4, expression: "16 × 19", correctAnswer: 304, conceptTag: "(16+9) | (6x9) = 25 | 54", explanation: "25 | 54 -> (25+5) | 4 = 304" },
      { id: 5, expression: "18 × 17", correctAnswer: 306, conceptTag: "(18+7) | (8x7) = 25 | 56", explanation: "25 | 56 -> (25+5) | 6 = 306" },
      { id: 6, expression: "19 × 18", correctAnswer: 342, conceptTag: "(19+8) | (9x8) = 27 | 72", explanation: "27 | 72 -> (27+7) | 2 = 342" },
      { id: 7, expression: "17 × 16", correctAnswer: 272, conceptTag: "(17+6) | (7x6) = 23 | 42", explanation: "23 | 42 -> (23+4) | 2 = 272" },
      { id: 8, expression: "19 × 19", correctAnswer: 361, conceptTag: "(19+9) | (9x9) = 28 | 81", explanation: "28 | 81 -> (28+8) | 1 = 361" },
      { id: 9, expression: "18 × 18", correctAnswer: 324, conceptTag: "(18+8) | (8x8) = 26 | 64", explanation: "26 | 64 -> (26+6) | 4 = 324" },
      { id: 10, expression: "17 × 17", correctAnswer: 289, conceptTag: "(17+7) | (7x7) = 24 | 49", explanation: "24 | 49 -> (24+4) | 9 = 289" },
    ]
  },
  {
    id: "svm1-mult-end-1",
    title: "SVM-1: Multiplication - Number Ending with 1",
    category: "vedic",
    level: "SVM-1",
    topic: "Multiplication - Number Ending with 1",
    description: "N1 x M1 shortcut for larger 2-digit numbers.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "71 × 41", correctAnswer: 2911, conceptTag: "(7x4) | (7+4) | 1", explanation: "28 | 11 | 1 -> 29 | 1 | 1 = 2911" },
      { id: 2, expression: "81 × 51", correctAnswer: 4131, conceptTag: "(8x5) | (8+5) | 1", explanation: "40 | 13 | 1 -> 41 | 3 | 1 = 4131" },
      { id: 3, expression: "91 × 41", correctAnswer: 3731, conceptTag: "(9x4) | (9+4) | 1", explanation: "36 | 13 | 1 -> 37 | 3 | 1 = 3731" },
      { id: 4, expression: "61 × 71", correctAnswer: 4331, conceptTag: "(6x7) | (6+7) | 1", explanation: "42 | 13 | 1 -> 43 | 3 | 1 = 4331" },
      { id: 5, expression: "81 × 61", correctAnswer: 4941, conceptTag: "(8x6) | (8+6) | 1", explanation: "48 | 14 | 1 -> 49 | 4 | 1 = 4941" },
      { id: 6, expression: "91 × 71", correctAnswer: 6461, conceptTag: "(9x7) | (9+7) | 1", explanation: "63 | 16 | 1 -> 64 | 6 | 1 = 6461" },
      { id: 7, expression: "81 × 81", correctAnswer: 6561, conceptTag: "(8x8) | (8+8) | 1", explanation: "64 | 16 | 1 -> 65 | 6 | 1 = 6561" },
      { id: 8, expression: "91 × 81", correctAnswer: 7371, conceptTag: "(9x8) | (9+8) | 1", explanation: "72 | 17 | 1 -> 73 | 7 | 1 = 7371" },
      { id: 9, expression: "91 × 91", correctAnswer: 8281, conceptTag: "(9x9) | (9+9) | 1", explanation: "81 | 18 | 1 -> 82 | 8 | 1 = 8281" },
      { id: 10, expression: "71 × 71", correctAnswer: 5041, conceptTag: "(7x7) | (7+7) | 1", explanation: "49 | 14 | 1 -> 50 | 4 | 1 = 5041" },
    ]
  },
  {
    id: "svm1-mult-11",
    title: "SVM-1: Multiplication by 11",
    category: "vedic",
    level: "SVM-1",
    topic: "Multiplication by 11",
    description: "Vedic sandwich trick for 3-digit and 4-digit numbers by 11.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "354 × 11", correctAnswer: 3894, conceptTag: "3 | (3+5) | (5+4) | 4", explanation: "3 | 8 | 9 | 4 = 3894" },
      { id: 2, expression: "468 × 11", correctAnswer: 5148, conceptTag: "4 | (4+6) | (6+8) | 8", explanation: "4 | 10 | 14 | 8 -> 5148" },
      { id: 3, expression: "579 × 11", correctAnswer: 6369, conceptTag: "5 | (5+7) | (7+9) | 9", explanation: "5 | 12 | 16 | 9 -> 6369" },
      { id: 4, expression: "682 × 11", correctAnswer: 7502, conceptTag: "6 | (6+8) | (8+2) | 2", explanation: "6 | 14 | 10 | 2 -> 7502" },
      { id: 5, expression: "739 × 11", correctAnswer: 8129, conceptTag: "7 | (7+3) | (3+9) | 9", explanation: "7 | 10 | 12 | 9 -> 8129" },
      { id: 6, expression: "847 × 11", correctAnswer: 9317, conceptTag: "8 | (8+4) | (4+7) | 7", explanation: "8 | 12 | 11 | 7 -> 9317" },
      { id: 7, expression: "956 × 11", correctAnswer: 10516, conceptTag: "9 | (9+5) | (5+6) | 6", explanation: "9 | 14 | 11 | 6 -> 10516" },
      { id: 8, expression: "1234 × 11", correctAnswer: 13574, conceptTag: "1 | (1+2) | (2+3) | (3+4) | 4", explanation: "1 | 3 | 5 | 7 | 4 = 13574" },
      { id: 9, expression: "2468 × 11", correctAnswer: 27148, conceptTag: "2 | (2+4) | (4+6) | (6+8) | 8", explanation: "2 | 6 | 10 | 14 | 8 -> 27148" },
      { id: 10, expression: "3579 × 11", correctAnswer: 39369, conceptTag: "3 | (3+5) | (5+7) | (7+9) | 9", explanation: "3 | 8 | 12 | 16 | 9 -> 39369" },
    ]
  },
  {
    id: "svm1-mult-multiples-11",
    title: "SVM-1: Multiplication by Multiples of 11",
    category: "vedic",
    level: "SVM-1",
    topic: "Multiplication by Multiples of 11",
    description: "Multiply by 22, 33, 44, 55, 66, 77, 88, 99.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "32 × 44", correctAnswer: 1408, conceptTag: "(32 x 4) x 11 = 128 x 11", explanation: "128 x 11 = 1408" },
      { id: 2, expression: "24 × 55", correctAnswer: 1320, conceptTag: "(24 x 5) x 11 = 120 x 11", explanation: "120 x 11 = 1320" },
      { id: 3, expression: "18 × 66", correctAnswer: 1188, conceptTag: "(18 x 6) x 11 = 108 x 11", explanation: "108 x 11 = 1188" },
      { id: 4, expression: "25 × 77", correctAnswer: 1925, conceptTag: "(25 x 7) x 11 = 175 x 11", explanation: "175 x 11 = 1925" },
      { id: 5, expression: "16 × 88", correctAnswer: 1408, conceptTag: "(16 x 8) x 11 = 128 x 11", explanation: "128 x 11 = 1408" },
      { id: 6, expression: "23 × 99", correctAnswer: 2277, conceptTag: "(23 x 9) x 11 = 207 x 11", explanation: "207 x 11 = 2277" },
      { id: 7, expression: "35 × 33", correctAnswer: 1155, conceptTag: "(35 x 3) x 11 = 105 x 11", explanation: "105 x 11 = 1155" },
      { id: 8, expression: "42 × 44", correctAnswer: 1848, conceptTag: "(42 x 4) x 11 = 168 x 11", explanation: "168 x 11 = 1848" },
      { id: 9, expression: "15 × 88", correctAnswer: 1320, conceptTag: "(15 x 8) x 11 = 120 x 11", explanation: "120 x 11 = 1320" },
      { id: 10, expression: "27 × 66", correctAnswer: 1782, conceptTag: "(27 x 6) x 11 = 162 x 11", explanation: "162 x 11 = 1782" },
    ]
  },
  {
    id: "svm1-mult-101",
    title: "SVM-1: Multiplication by 101",
    category: "vedic",
    level: "SVM-1",
    topic: "Multiplication by 101",
    description: "Instant repeat rule for 2-digit and 3-digit 101 multiplication.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "89 × 101", correctAnswer: 8989, conceptTag: "AB x 101 = ABAB", explanation: "89 x 101 = 8989" },
      { id: 2, expression: "97 × 101", correctAnswer: 9797, conceptTag: "AB x 101 = ABAB", explanation: "97 x 101 = 9797" },
      { id: 3, expression: "156 × 101", correctAnswer: 15756, conceptTag: "(156+1) | 56", explanation: "(156+1) | 56 = 15756" },
      { id: 4, expression: "267 × 101", correctAnswer: 26967, conceptTag: "(267+2) | 67", explanation: "(267+2) | 67 = 26967" },
      { id: 5, expression: "378 × 101", correctAnswer: 38178, conceptTag: "(378+3) | 78", explanation: "(378+3) | 78 = 38178" },
      { id: 6, expression: "489 × 101", correctAnswer: 49389, conceptTag: "(489+4) | 89", explanation: "(489+4) | 89 = 49389" },
      { id: 7, expression: "592 × 101", correctAnswer: 59792, conceptTag: "(592+5) | 92", explanation: "(592+5) | 92 = 59792" },
      { id: 8, expression: "684 × 101", correctAnswer: 69084, conceptTag: "(684+6) | 84", explanation: "(684+6) | 84 = 69084" },
      { id: 9, expression: "795 × 101", correctAnswer: 80295, conceptTag: "(795+7) | 95", explanation: "(795+7) | 95 = 80295" },
      { id: 10, expression: "846 × 101", correctAnswer: 85446, conceptTag: "(846+8) | 46", explanation: "(846+8) | 46 = 85446" },
    ]
  },
  {
    id: "svm1-paise-to-rupees",
    title: "SVM-1: Convert Paise into Rupees",
    category: "vedic",
    level: "SVM-1",
    topic: "Convert Paise into Rupees",
    description: "Convert paise to rupees by dividing by 100.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "725 Paise = ₹ ?", correctAnswer: 7.25, conceptTag: "÷ 100", explanation: "725 ÷ 100 = ₹ 7.25" },
      { id: 2, expression: "450 Paise = ₹ ?", correctAnswer: 4.5, conceptTag: "÷ 100", explanation: "450 ÷ 100 = ₹ 4.50" },
      { id: 3, expression: "975 Paise = ₹ ?", correctAnswer: 9.75, conceptTag: "÷ 100", explanation: "975 ÷ 100 = ₹ 9.75" },
      { id: 4, expression: "1250 Paise = ₹ ?", correctAnswer: 12.5, conceptTag: "÷ 100", explanation: "1250 ÷ 100 = ₹ 12.50" },
      { id: 5, expression: "3500 Paise = ₹ ?", correctAnswer: 35, conceptTag: "÷ 100", explanation: "3500 ÷ 100 = ₹ 35.00" },
      { id: 6, expression: "80 Paise = ₹ ?", correctAnswer: 0.8, conceptTag: "÷ 100", explanation: "80 ÷ 100 = ₹ 0.80" },
      { id: 7, expression: "2475 Paise = ₹ ?", correctAnswer: 24.75, conceptTag: "÷ 100", explanation: "2475 ÷ 100 = ₹ 24.75" },
      { id: 8, expression: "6800 Paise = ₹ ?", correctAnswer: 68, conceptTag: "÷ 100", explanation: "6800 ÷ 100 = ₹ 68.00" },
      { id: 9, expression: "1525 Paise = ₹ ?", correctAnswer: 15.25, conceptTag: "÷ 100", explanation: "1525 ÷ 100 = ₹ 15.25" },
      { id: 10, expression: "5000 Paise = ₹ ?", correctAnswer: 50, conceptTag: "÷ 100", explanation: "5000 ÷ 100 = ₹ 50.00" },
    ]
  },
  {
    id: "svm1-cm-to-m",
    title: "SVM-1: Convert Centimeter into Meter",
    category: "vedic",
    level: "SVM-1",
    topic: "Convert Centimeter into Meter",
    description: "Convert cm to meters by dividing by 100.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "840 cm = ? m", correctAnswer: 8.4, conceptTag: "÷ 100", explanation: "840 ÷ 100 = 8.4 m" },
      { id: 2, expression: "350 cm = ? m", correctAnswer: 3.5, conceptTag: "÷ 100", explanation: "350 ÷ 100 = 3.5 m" },
      { id: 3, expression: "925 cm = ? m", correctAnswer: 9.25, conceptTag: "÷ 100", explanation: "925 ÷ 100 = 9.25 m" },
      { id: 4, expression: "1500 cm = ? m", correctAnswer: 15, conceptTag: "÷ 100", explanation: "1500 ÷ 100 = 15 m" },
      { id: 5, expression: "2450 cm = ? m", correctAnswer: 24.5, conceptTag: "÷ 100", explanation: "2450 ÷ 100 = 24.5 m" },
      { id: 6, expression: "75 cm = ? m", correctAnswer: 0.75, conceptTag: "÷ 100", explanation: "75 ÷ 100 = 0.75 m" },
      { id: 7, expression: "680 cm = ? m", correctAnswer: 6.8, conceptTag: "÷ 100", explanation: "680 ÷ 100 = 6.8 m" },
      { id: 8, expression: "4200 cm = ? m", correctAnswer: 42, conceptTag: "÷ 100", explanation: "4200 ÷ 100 = 42 m" },
      { id: 9, expression: "1875 cm = ? m", correctAnswer: 18.75, conceptTag: "÷ 100", explanation: "1875 ÷ 100 = 18.75 m" },
      { id: 10, expression: "5000 cm = ? m", correctAnswer: 50, conceptTag: "÷ 100", explanation: "5000 ÷ 100 = 50 m" },
    ]
  },
  {
    id: "svm1-g-to-kg",
    title: "SVM-1: Convert Gram into Kilogram",
    category: "vedic",
    level: "SVM-1",
    topic: "Convert Gram into Kilogram",
    description: "Convert grams to kg by dividing by 1000.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "6750 g = ? kg", correctAnswer: 6.75, conceptTag: "÷ 1000", explanation: "6750 ÷ 1000 = 6.75 kg" },
      { id: 2, expression: "2500 g = ? kg", correctAnswer: 2.5, conceptTag: "÷ 1000", explanation: "2500 ÷ 1000 = 2.5 kg" },
      { id: 3, expression: "8200 g = ? kg", correctAnswer: 8.2, conceptTag: "÷ 1000", explanation: "8200 ÷ 1000 = 8.2 kg" },
      { id: 4, expression: "4500 g = ? kg", correctAnswer: 4.5, conceptTag: "÷ 1000", explanation: "4500 ÷ 1000 = 4.5 kg" },
      { id: 5, expression: "1250 g = ? kg", correctAnswer: 1.25, conceptTag: "÷ 1000", explanation: "1250 ÷ 1000 = 1.25 kg" },
      { id: 6, expression: "750 g = ? kg", correctAnswer: 0.75, conceptTag: "÷ 1000", explanation: "750 ÷ 1000 = 0.75 kg" },
      { id: 7, expression: "9800 g = ? kg", correctAnswer: 9.8, conceptTag: "÷ 1000", explanation: "9800 ÷ 1000 = 9.8 kg" },
      { id: 8, expression: "15000 g = ? kg", correctAnswer: 15, conceptTag: "÷ 1000", explanation: "15000 ÷ 1000 = 15 kg" },
      { id: 9, expression: "3450 g = ? kg", correctAnswer: 3.45, conceptTag: "÷ 1000", explanation: "3450 ÷ 1000 = 3.45 kg" },
      { id: 10, expression: "20000 g = ? kg", correctAnswer: 20, conceptTag: "÷ 1000", explanation: "20000 ÷ 1000 = 20 kg" },
    ]
  },
  {
    id: "svm1-ml-to-l",
    title: "SVM-1: Convert Millilitre into Litre",
    category: "vedic",
    level: "SVM-1",
    topic: "Convert Millilitre into Litre",
    description: "Convert mL to litres by dividing by 1000.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "1500 mL = ? L", correctAnswer: 1.5, conceptTag: "÷ 1000", explanation: "1500 ÷ 1000 = 1.5 L" },
      { id: 2, expression: "4200 mL = ? L", correctAnswer: 4.2, conceptTag: "÷ 1000", explanation: "4200 ÷ 1000 = 4.2 L" },
      { id: 3, expression: "7800 mL = ? L", correctAnswer: 7.8, conceptTag: "÷ 1000", explanation: "7800 ÷ 1000 = 7.8 L" },
      { id: 4, expression: "2250 mL = ? L", correctAnswer: 2.25, conceptTag: "÷ 1000", explanation: "2250 ÷ 1000 = 2.25 L" },
      { id: 5, expression: "6500 mL = ? L", correctAnswer: 6.5, conceptTag: "÷ 1000", explanation: "6500 ÷ 1000 = 6.5 L" },
      { id: 6, expression: "500 mL = ? L", correctAnswer: 0.5, conceptTag: "÷ 1000", explanation: "500 ÷ 1000 = 0.5 L" },
      { id: 7, expression: "8900 mL = ? L", correctAnswer: 8.9, conceptTag: "÷ 1000", explanation: "8900 ÷ 1000 = 8.9 L" },
      { id: 8, expression: "12000 mL = ? L", correctAnswer: 12, conceptTag: "÷ 1000", explanation: "12000 ÷ 1000 = 12 L" },
      { id: 9, expression: "3750 mL = ? L", correctAnswer: 3.75, conceptTag: "÷ 1000", explanation: "3750 ÷ 1000 = 3.75 L" },
      { id: 10, expression: "25000 mL = ? L", correctAnswer: 25, conceptTag: "÷ 1000", explanation: "25000 ÷ 1000 = 25 L" },
    ]
  },
  {
    id: "svm1-m-to-km",
    title: "SVM-1: Convert Meter into Kilometer",
    category: "vedic",
    level: "SVM-1",
    topic: "Convert Meter into Kilometer",
    description: "Convert meters to km by dividing by 1000.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "9200 m = ? km", correctAnswer: 9.2, conceptTag: "÷ 1000", explanation: "9200 ÷ 1000 = 9.2 km" },
      { id: 2, expression: "7800 m = ? km", correctAnswer: 7.8, conceptTag: "÷ 1000", explanation: "7800 ÷ 1000 = 7.8 km" },
      { id: 3, expression: "4500 m = ? km", correctAnswer: 4.5, conceptTag: "÷ 1000", explanation: "4500 ÷ 1000 = 4.5 km" },
      { id: 4, expression: "1750 m = ? km", correctAnswer: 1.75, conceptTag: "÷ 1000", explanation: "1750 ÷ 1000 = 1.75 km" },
      { id: 5, expression: "6300 m = ? km", correctAnswer: 6.3, conceptTag: "÷ 1000", explanation: "6300 ÷ 1000 = 6.3 km" },
      { id: 6, expression: "250 m = ? km", correctAnswer: 0.25, conceptTag: "÷ 1000", explanation: "250 ÷ 1000 = 0.25 km" },
      { id: 7, expression: "8400 m = ? km", correctAnswer: 8.4, conceptTag: "÷ 1000", explanation: "8400 ÷ 1000 = 8.4 km" },
      { id: 8, expression: "16000 m = ? km", correctAnswer: 16, conceptTag: "÷ 1000", explanation: "16000 ÷ 1000 = 16 km" },
      { id: 9, expression: "3250 m = ? km", correctAnswer: 3.25, conceptTag: "÷ 1000", explanation: "3250 ÷ 1000 = 3.25 km" },
      { id: 10, expression: "50000 m = ? km", correctAnswer: 50, conceptTag: "÷ 1000", explanation: "50000 ÷ 1000 = 50 km" },
    ]
  },
  {
    id: "svm1-l-to-kl",
    title: "SVM-1: Convert Litre into Kilolitre",
    category: "vedic",
    level: "SVM-1",
    topic: "Convert Litre into Kilolitre",
    description: "Convert litres to kL by dividing by 1000.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "3400 L = ? kL", correctAnswer: 3.4, conceptTag: "÷ 1000", explanation: "3400 ÷ 1000 = 3.4 kL" },
      { id: 2, expression: "5000 L = ? kL", correctAnswer: 5, conceptTag: "÷ 1000", explanation: "5000 ÷ 1000 = 5 kL" },
      { id: 3, expression: "8700 L = ? kL", correctAnswer: 8.7, conceptTag: "÷ 1000", explanation: "8700 ÷ 1000 = 8.7 kL" },
      { id: 4, expression: "2150 L = ? kL", correctAnswer: 2.15, conceptTag: "÷ 1000", explanation: "2150 ÷ 1000 = 2.15 kL" },
      { id: 5, expression: "6900 L = ? kL", correctAnswer: 6.9, conceptTag: "÷ 1000", explanation: "6900 ÷ 1000 = 6.9 kL" },
      { id: 6, expression: "800 L = ? kL", correctAnswer: 0.8, conceptTag: "÷ 1000", explanation: "800 ÷ 1000 = 0.8 kL" },
      { id: 7, expression: "9300 L = ? kL", correctAnswer: 9.3, conceptTag: "÷ 1000", explanation: "9300 ÷ 1000 = 9.3 kL" },
      { id: 8, expression: "14000 L = ? kL", correctAnswer: 14, conceptTag: "÷ 1000", explanation: "14000 ÷ 1000 = 14 kL" },
      { id: 9, expression: "4850 L = ? kL", correctAnswer: 4.85, conceptTag: "÷ 1000", explanation: "4850 ÷ 1000 = 4.85 kL" },
      { id: 10, expression: "30000 L = ? kL", correctAnswer: 30, conceptTag: "÷ 1000", explanation: "30000 ÷ 1000 = 30 kL" },
    ]
  },
  {
    id: "svm1-rupees-to-paise",
    title: "SVM-1: Convert Rupees into Paise",
    category: "vedic",
    level: "SVM-1",
    topic: "Convert Rupees into Paise",
    description: "Convert rupees to paise by multiplying by 100.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "₹ 12.50 = ? Paise", correctAnswer: 1250, conceptTag: "× 100", explanation: "12.50 × 100 = 1250 Paise" },
      { id: 2, expression: "₹ 8.75 = ? Paise", correctAnswer: 875, conceptTag: "× 100", explanation: "8.75 × 100 = 875 Paise" },
      { id: 3, expression: "₹ 15.00 = ? Paise", correctAnswer: 1500, conceptTag: "× 100", explanation: "15.00 × 100 = 1500 Paise" },
      { id: 4, expression: "₹ 24.25 = ? Paise", correctAnswer: 2425, conceptTag: "× 100", explanation: "24.25 × 100 = 2425 Paise" },
      { id: 5, expression: "₹ 45.50 = ? Paise", correctAnswer: 4550, conceptTag: "× 100", explanation: "45.50 × 100 = 4550 Paise" },
      { id: 6, expression: "₹ 0.90 = ? Paise", correctAnswer: 90, conceptTag: "× 100", explanation: "0.90 × 100 = 90 Paise" },
      { id: 7, expression: "₹ 62.80 = ? Paise", correctAnswer: 6280, conceptTag: "× 100", explanation: "62.80 × 100 = 6280 Paise" },
      { id: 8, expression: "₹ 100.00 = ? Paise", correctAnswer: 10000, conceptTag: "× 100", explanation: "100.00 × 100 = 10000 Paise" },
      { id: 9, expression: "₹ 38.40 = ? Paise", correctAnswer: 3840, conceptTag: "× 100", explanation: "38.40 × 100 = 3840 Paise" },
      { id: 10, expression: "₹ 75.25 = ? Paise", correctAnswer: 7525, conceptTag: "× 100", explanation: "75.25 × 100 = 7525 Paise" },
    ]
  },
  {
    id: "svm1-m-to-cm",
    title: "SVM-1: Convert Meter into Centimeter",
    category: "vedic",
    level: "SVM-1",
    topic: "Convert Meter into Centimeter",
    description: "Convert meters to cm by multiplying by 100.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "6.5 m = ? cm", correctAnswer: 650, conceptTag: "× 100", explanation: "6.5 × 100 = 650 cm" },
      { id: 2, expression: "4.25 m = ? cm", correctAnswer: 425, conceptTag: "× 100", explanation: "4.25 × 100 = 425 cm" },
      { id: 3, expression: "12 m = ? cm", correctAnswer: 1200, conceptTag: "× 100", explanation: "12 × 100 = 1200 cm" },
      { id: 4, expression: "8.7 m = ? cm", correctAnswer: 870, conceptTag: "× 100", explanation: "8.7 × 100 = 870 cm" },
      { id: 5, expression: "15.5 m = ? cm", correctAnswer: 1550, conceptTag: "× 100", explanation: "15.5 × 100 = 1550 cm" },
      { id: 6, expression: "0.85 m = ? cm", correctAnswer: 85, conceptTag: "× 100", explanation: "0.85 × 100 = 85 cm" },
      { id: 7, expression: "24.8 m = ? cm", correctAnswer: 2480, conceptTag: "× 100", explanation: "24.8 × 100 = 2480 cm" },
      { id: 8, expression: "35 m = ? cm", correctAnswer: 3500, conceptTag: "× 100", explanation: "35 × 100 = 3500 cm" },
      { id: 9, expression: "9.15 m = ? cm", correctAnswer: 915, conceptTag: "× 100", explanation: "9.15 × 100 = 915 cm" },
      { id: 10, expression: "50 m = ? cm", correctAnswer: 5000, conceptTag: "× 100", explanation: "50 × 100 = 5000 cm" },
    ]
  },
  {
    id: "svm1-kg-to-g",
    title: "SVM-1: Convert Kilogram into Gram",
    category: "vedic",
    level: "SVM-1",
    topic: "Convert Kilogram into Gram",
    description: "Convert kg to grams by multiplying by 1000.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "4.2 kg = ? g", correctAnswer: 4200, conceptTag: "× 1000", explanation: "4.2 × 1000 = 4200 g" },
      { id: 2, expression: "6.75 kg = ? g", correctAnswer: 6750, conceptTag: "× 1000", explanation: "6.75 × 1000 = 6750 g" },
      { id: 3, expression: "15 kg = ? g", correctAnswer: 15000, conceptTag: "× 1000", explanation: "15 × 1000 = 15000 g" },
      { id: 4, expression: "8.5 kg = ? g", correctAnswer: 8500, conceptTag: "× 1000", explanation: "8.5 × 1000 = 8500 g" },
      { id: 5, expression: "2.45 kg = ? g", correctAnswer: 2450, conceptTag: "× 1000", explanation: "2.45 × 1000 = 2450 g" },
      { id: 6, expression: "0.75 kg = ? g", correctAnswer: 750, conceptTag: "× 1000", explanation: "0.75 × 1000 = 750 g" },
      { id: 7, expression: "12.8 kg = ? g", correctAnswer: 12800, conceptTag: "× 1000", explanation: "12.8 × 1000 = 12800 g" },
      { id: 8, expression: "25 kg = ? g", correctAnswer: 25000, conceptTag: "× 1000", explanation: "25 × 1000 = 25000 g" },
      { id: 9, expression: "9.35 kg = ? g", correctAnswer: 9350, conceptTag: "× 1000", explanation: "9.35 × 1000 = 9350 g" },
      { id: 10, expression: "40 kg = ? g", correctAnswer: 40000, conceptTag: "× 1000", explanation: "40 × 1000 = 40000 g" },
    ]
  },
  {
    id: "svm1-l-to-ml",
    title: "SVM-1: Convert Litre into Millilitre",
    category: "vedic",
    level: "SVM-1",
    topic: "Convert Litre into Millilitre",
    description: "Convert litres to mL by multiplying by 1000.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "8.5 L = ? mL", correctAnswer: 8500, conceptTag: "× 1000", explanation: "8.5 × 1000 = 8500 mL" },
      { id: 2, expression: "3.25 L = ? mL", correctAnswer: 3250, conceptTag: "× 1000", explanation: "3.25 × 1000 = 3250 mL" },
      { id: 3, expression: "14 L = ? mL", correctAnswer: 14000, conceptTag: "× 1000", explanation: "14 × 1000 = 14000 mL" },
      { id: 4, expression: "6.8 L = ? mL", correctAnswer: 6800, conceptTag: "× 1000", explanation: "6.8 × 1000 = 6800 mL" },
      { id: 5, expression: "2.75 L = ? mL", correctAnswer: 2750, conceptTag: "× 1000", explanation: "2.75 × 1000 = 2750 mL" },
      { id: 6, expression: "0.5 L = ? mL", correctAnswer: 500, conceptTag: "× 1000", explanation: "0.5 × 1000 = 500 mL" },
      { id: 7, expression: "11.4 L = ? mL", correctAnswer: 11400, conceptTag: "× 1000", explanation: "11.4 × 1000 = 11400 mL" },
      { id: 8, expression: "20 L = ? mL", correctAnswer: 20000, conceptTag: "× 1000", explanation: "20 × 1000 = 20000 mL" },
      { id: 9, expression: "5.65 L = ? mL", correctAnswer: 5650, conceptTag: "× 1000", explanation: "5.65 × 1000 = 5650 mL" },
      { id: 10, expression: "35 L = ? mL", correctAnswer: 35000, conceptTag: "× 1000", explanation: "35 × 1000 = 35000 mL" },
    ]
  },
  {
    id: "svm1-km-to-m",
    title: "SVM-1: Convert Kilometer into Meter",
    category: "vedic",
    level: "SVM-1",
    topic: "Convert Kilometer into Meter",
    description: "Convert km to meters by multiplying by 1000.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "3.7 km = ? m", correctAnswer: 3700, conceptTag: "× 1000", explanation: "3.7 × 1000 = 3700 m" },
      { id: 2, expression: "5.25 km = ? m", correctAnswer: 5250, conceptTag: "× 1000", explanation: "5.25 × 1000 = 5250 m" },
      { id: 3, expression: "18 km = ? m", correctAnswer: 18000, conceptTag: "× 1000", explanation: "18 × 1000 = 18000 m" },
      { id: 4, expression: "9.4 km = ? m", correctAnswer: 9400, conceptTag: "× 1000", explanation: "9.4 × 1000 = 9400 m" },
      { id: 5, expression: "1.85 km = ? m", correctAnswer: 1850, conceptTag: "× 1000", explanation: "1.85 × 1000 = 1850 m" },
      { id: 6, expression: "0.6 km = ? m", correctAnswer: 600, conceptTag: "× 1000", explanation: "0.6 × 1000 = 600 m" },
      { id: 7, expression: "14.2 km = ? m", correctAnswer: 14200, conceptTag: "× 1000", explanation: "14.2 × 1000 = 14200 m" },
      { id: 8, expression: "30 km = ? m", correctAnswer: 30000, conceptTag: "× 1000", explanation: "30 × 1000 = 30000 m" },
      { id: 9, expression: "7.15 km = ? m", correctAnswer: 7150, conceptTag: "× 1000", explanation: "7.15 × 1000 = 7150 m" },
      { id: 10, expression: "45 km = ? m", correctAnswer: 45000, conceptTag: "× 1000", explanation: "45 × 1000 = 45000 m" },
    ]
  },
  {
    id: "svm1-kl-to-l",
    title: "SVM-1: Convert Kilolitre into Litre",
    category: "vedic",
    level: "SVM-1",
    topic: "Convert Kilolitre into Litre",
    description: "Convert kL to litres by multiplying by 1000.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "5.1 kL = ? L", correctAnswer: 5100, conceptTag: "× 1000", explanation: "5.1 × 1000 = 5100 L" },
      { id: 2, expression: "2.75 kL = ? L", correctAnswer: 2750, conceptTag: "× 1000", explanation: "2.75 × 1000 = 2750 L" },
      { id: 3, expression: "16 kL = ? L", correctAnswer: 16000, conceptTag: "× 1000", explanation: "16 × 1000 = 16000 L" },
      { id: 4, expression: "8.3 kL = ? L", correctAnswer: 8300, conceptTag: "× 1000", explanation: "8.3 × 1000 = 8300 L" },
      { id: 5, expression: "4.45 kL = ? L", correctAnswer: 4450, conceptTag: "× 1000", explanation: "4.45 × 1000 = 4450 L" },
      { id: 6, expression: "0.9 kL = ? L", correctAnswer: 900, conceptTag: "× 1000", explanation: "0.9 × 1000 = 900 L" },
      { id: 7, expression: "12.6 kL = ? L", correctAnswer: 12600, conceptTag: "× 1000", explanation: "12.6 × 1000 = 12600 L" },
      { id: 8, expression: "25 kL = ? L", correctAnswer: 25000, conceptTag: "× 1000", explanation: "25 × 1000 = 25000 L" },
      { id: 9, expression: "6.85 kL = ? L", correctAnswer: 6850, conceptTag: "× 1000", explanation: "6.85 × 1000 = 6850 L" },
      { id: 10, expression: "40 kL = ? L", correctAnswer: 40000, conceptTag: "× 1000", explanation: "40 × 1000 = 40000 L" },
    ]
  },
  {
    id: "svm1-count-triangles",
    title: "SVM-1: Count the number of Triangle",
    category: "vedic",
    level: "SVM-1",
    topic: "Count the number of Triangle",
    description: "Advanced spatial counting for multi-layered triangles.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Triangles: Base = 4, Horizontal Layers = 3", correctAnswer: 30, conceptTag: "(1+2+3+4) x 3 = 30", explanation: "10 x 3 = 30 triangles" },
      { id: 2, expression: "Triangles: Base = 5, Horizontal Layers = 3", correctAnswer: 45, conceptTag: "(1+2+3+4+5) x 3 = 45", explanation: "15 x 3 = 45 triangles" },
      { id: 3, expression: "Triangles: Base = 6, Horizontal Layers = 2", correctAnswer: 42, conceptTag: "(1+2+3+4+5+6) x 2 = 42", explanation: "21 x 2 = 42 triangles" },
      { id: 4, expression: "Triangles: Base = 4, Horizontal Layers = 4", correctAnswer: 40, conceptTag: "(1+2+3+4) x 4 = 40", explanation: "10 x 4 = 40 triangles" },
      { id: 5, expression: "Triangles: Base = 5, Horizontal Layers = 4", correctAnswer: 60, conceptTag: "(1+2+3+4+5) x 4 = 60", explanation: "15 x 4 = 60 triangles" },
      { id: 6, expression: "Triangles: Base = 3, Horizontal Layers = 5", correctAnswer: 30, conceptTag: "(1+2+3) x 5 = 30", explanation: "6 x 5 = 30 triangles" },
      { id: 7, expression: "Triangles: Base = 6, Horizontal Layers = 3", correctAnswer: 63, conceptTag: "(1+2+3+4+5+6) x 3 = 63", explanation: "21 x 3 = 63 triangles" },
      { id: 8, expression: "Triangles: Base = 4, Horizontal Layers = 5", correctAnswer: 50, conceptTag: "(1+2+3+4) x 5 = 50", explanation: "10 x 5 = 50 triangles" },
      { id: 9, expression: "Triangles: Base = 5, Horizontal Layers = 5", correctAnswer: 75, conceptTag: "(1+2+3+4+5) x 5 = 75", explanation: "15 x 5 = 75 triangles" },
      { id: 10, expression: "Triangles: Base = 6, Horizontal Layers = 4", correctAnswer: 84, conceptTag: "(1+2+3+4+5+6) x 4 = 84", explanation: "21 x 4 = 84 triangles" },
    ]
  },
  {
    id: "svm1-count-circles",
    title: "SVM-1: Count the number of Circles",
    category: "vedic",
    level: "SVM-1",
    topic: "Count the number of Circles",
    description: "Advanced concentric & grid circle pattern counting.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "3 Concentric sets of 4 rings each", correctAnswer: 12, conceptTag: "3 x 4 Concentric Rings", explanation: "3 x 4 = 12 circles" },
      { id: 2, expression: "6 × 6 Grid of independent circles", correctAnswer: 36, conceptTag: "Grid Count 6x6", explanation: "6 x 6 = 36 circles" },
      { id: 3, expression: "1 Center Circle + 3 Concentric Rings of 6 circles each", correctAnswer: 19, conceptTag: "Center + 3x6 Rings", explanation: "1 + 18 = 19 circles" },
      { id: 4, expression: "4 Concentric sets of 5 rings each", correctAnswer: 20, conceptTag: "4 x 5 Concentric Rings", explanation: "4 x 5 = 20 circles" },
      { id: 5, expression: "7 × 7 Grid of independent circles", correctAnswer: 49, conceptTag: "Grid Count 7x7", explanation: "7 x 7 = 49 circles" },
      { id: 6, expression: "1 Center Circle + 4 Concentric Rings of 5 circles each", correctAnswer: 21, conceptTag: "Center + 4x5 Rings", explanation: "1 + 20 = 21 circles" },
      { id: 7, expression: "8 × 8 Grid of independent circles", correctAnswer: 64, conceptTag: "Grid Count 8x8", explanation: "8 x 8 = 64 circles" },
      { id: 8, expression: "5 Concentric sets of 6 rings each", correctAnswer: 30, conceptTag: "5 x 6 Concentric Rings", explanation: "5 x 6 = 30 circles" },
      { id: 9, expression: "1 Center Circle + 3 Concentric Rings of 8 circles each", correctAnswer: 25, conceptTag: "Center + 3x8 Rings", explanation: "1 + 24 = 25 circles" },
      { id: 10, expression: "10 × 10 Grid of independent circles", correctAnswer: 100, conceptTag: "Grid Count 10x10", explanation: "10 x 10 = 100 circles" },
    ]
  },
  {
    id: "vedic-svm1-overall",
    title: "SVM-1-Overall (Comprehensive Level Master Quiz)",
    category: "vedic",
    level: "SVM-1",
    topic: "10. SVM-1-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all Senior Vedic Math Level 1 topics: Table Formation, Unit Conversions, Multiplications.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "5.4 m = ? cm", correctAnswer: 540, conceptTag: "SVM-1 Overall" }
    ]
  },

  // ==========================================
  // SVM-0 LEVEL (Senior Vedic Math Level 0)
  // ==========================================
  {
    id: "svm0-addition",
    title: "SVM-0: Rapid Addition",
    category: "vedic",
    level: "SVM-0",
    topic: "Addition",
    description: "Fast left-to-right Vedic addition drills.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "48 + 37", correctAnswer: 85, conceptTag: "Left to Right Addition", explanation: "40+30=70, 8+7=15 -> 70+15 = 85" },
      { id: 2, expression: "59 + 26", correctAnswer: 85, conceptTag: "Left to Right Addition", explanation: "50+20=70, 9+6=15 -> 70+15 = 85" },
      { id: 3, expression: "64 + 49", correctAnswer: 113, conceptTag: "Left to Right Addition", explanation: "60+40=100, 4+9=13 -> 100+13 = 113" },
      { id: 4, expression: "78 + 35", correctAnswer: 113, conceptTag: "Left to Right Addition", explanation: "70+30=100, 8+5=13 -> 100+13 = 113" },
      { id: 5, expression: "83 + 57", correctAnswer: 140, conceptTag: "Left to Right Addition", explanation: "80+50=130, 3+7=10 -> 130+10 = 140" },
      { id: 6, expression: "96 + 48", correctAnswer: 144, conceptTag: "Left to Right Addition", explanation: "90+40=130, 6+8=14 -> 130+14 = 144" },
      { id: 7, expression: "29 + 63", correctAnswer: 92, conceptTag: "Left to Right Addition", explanation: "20+60=80, 9+3=12 -> 80+12 = 92" },
      { id: 8, expression: "47 + 85", correctAnswer: 132, conceptTag: "Left to Right Addition", explanation: "40+80=120, 7+5=12 -> 120+12 = 132" },
      { id: 9, expression: "74 + 68", correctAnswer: 142, conceptTag: "Left to Right Addition", explanation: "70+60=130, 4+8=12 -> 130+12 = 142" },
      { id: 10, expression: "89 + 77", correctAnswer: 166, conceptTag: "Left to Right Addition", explanation: "80+70=150, 9+7=16 -> 150+16 = 166" },
    ]
  },
  {
    id: "svm0-ekadhik",
    title: "SVM-0: Ekadhik Sutra",
    category: "vedic",
    level: "SVM-0",
    topic: "Ekadhik",
    description: "One more than the previous digit (Ekadhikena Purvena).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Ekadhik of 7", correctAnswer: 8, conceptTag: "7 + 1 = 8", explanation: "Ekadhik of 7 = 7 + 1 = 8" },
      { id: 2, expression: "Ekadhik of 19", correctAnswer: 20, conceptTag: "19 + 1 = 20", explanation: "Ekadhik of 19 = 19 + 1 = 20" },
      { id: 3, expression: "Ekadhik of 45", correctAnswer: 46, conceptTag: "45 + 1 = 46", explanation: "Ekadhik of 45 = 45 + 1 = 46" },
      { id: 4, expression: "Ekadhik of 89", correctAnswer: 90, conceptTag: "89 + 1 = 90", explanation: "Ekadhik of 89 = 89 + 1 = 90" },
      { id: 5, expression: "Ekadhik of 134", correctAnswer: 135, conceptTag: "134 + 1 = 135", explanation: "Ekadhik of 134 = 134 + 1 = 135" },
      { id: 6, expression: "Ekadhik of 999", correctAnswer: 1000, conceptTag: "999 + 1 = 1000", explanation: "Ekadhik of 999 = 999 + 1 = 1000" },
      { id: 7, expression: "Ekadhik of 68", correctAnswer: 69, conceptTag: "68 + 1 = 69", explanation: "Ekadhik of 68 = 68 + 1 = 69" },
      { id: 8, expression: "Ekadhik of 249", correctAnswer: 250, conceptTag: "249 + 1 = 250", explanation: "Ekadhik of 249 = 249 + 1 = 250" },
      { id: 9, expression: "Ekadhik of 73", correctAnswer: 74, conceptTag: "73 + 1 = 74", explanation: "Ekadhik of 73 = 73 + 1 = 74" },
      { id: 10, expression: "Ekadhik of 519", correctAnswer: 520, conceptTag: "519 + 1 = 520", explanation: "Ekadhik of 519 = 519 + 1 = 520" },
    ]
  },
  {
    id: "svm0-ekanyunena",
    title: "SVM-0: Ekanyunena Sutra",
    category: "vedic",
    level: "SVM-0",
    topic: "Ekanyunena",
    description: "One less than the previous digit (Ekanyunena Purvena).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Ekanyunena of 9", correctAnswer: 8, conceptTag: "9 - 1 = 8", explanation: "Ekanyunena of 9 = 9 - 1 = 8" },
      { id: 2, expression: "Ekanyunena of 50", correctAnswer: 49, conceptTag: "50 - 1 = 49", explanation: "Ekanyunena of 50 = 50 - 1 = 49" },
      { id: 3, expression: "Ekanyunena of 74", correctAnswer: 73, conceptTag: "74 - 1 = 73", explanation: "Ekanyunena of 74 = 74 - 1 = 73" },
      { id: 4, expression: "Ekanyunena of 100", correctAnswer: 99, conceptTag: "100 - 1 = 99", explanation: "Ekanyunena of 100 = 100 - 1 = 99" },
      { id: 5, expression: "Ekanyunena of 628", correctAnswer: 627, conceptTag: "628 - 1 = 627", explanation: "Ekanyunena of 628 = 628 - 1 = 627" },
      { id: 6, expression: "Ekanyunena of 430", correctAnswer: 429, conceptTag: "430 - 1 = 429", explanation: "Ekanyunena of 430 = 430 - 1 = 429" },
      { id: 7, expression: "Ekanyunena of 88", correctAnswer: 87, conceptTag: "88 - 1 = 87", explanation: "Ekanyunena of 88 = 88 - 1 = 87" },
      { id: 8, expression: "Ekanyunena of 1000", correctAnswer: 999, conceptTag: "1000 - 1 = 999", explanation: "Ekanyunena of 1000 = 1000 - 1 = 999" },
      { id: 9, expression: "Ekanyunena of 351", correctAnswer: 350, conceptTag: "351 - 1 = 350", explanation: "Ekanyunena of 351 = 351 - 1 = 350" },
      { id: 10, expression: "Ekanyunena of 90", correctAnswer: 89, conceptTag: "90 - 1 = 89", explanation: "Ekanyunena of 90 = 90 - 1 = 89" },
    ]
  },
  {
    id: "svm0-balancing",
    title: "SVM-0: Balancing (Thumb Rule)",
    category: "vedic",
    level: "SVM-0",
    topic: "Balancing ( Thumb Rule )",
    description: "Vedic balancing rule for multi-partition numbers.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Balance: 3 | 14 | 5", correctAnswer: 445, conceptTag: "Balancing Rule", explanation: "3 | 14 | 5 -> (3+1) | 4 | 5 = 445" },
      { id: 2, expression: "Balance: 4 | 12 | 9", correctAnswer: 529, conceptTag: "Balancing Rule", explanation: "4 | 12 | 9 -> (4+1) | 2 | 9 = 529" },
      { id: 3, expression: "Balance: 5 | 18 | 4", correctAnswer: 684, conceptTag: "Balancing Rule", explanation: "5 | 18 | 4 -> (5+1) | 8 | 4 = 684" },
      { id: 4, expression: "Balance: 7 | 25 | 6", correctAnswer: 956, conceptTag: "Balancing Rule", explanation: "7 | 25 | 6 -> (7+2) | 5 | 6 = 956" },
      { id: 5, expression: "Balance: 2 | 19 | 8", correctAnswer: 398, conceptTag: "Balancing Rule", explanation: "2 | 19 | 8 -> (2+1) | 9 | 8 = 398" },
      { id: 6, expression: "Balance: 6 | 17 | 3", correctAnswer: 773, conceptTag: "Balancing Rule", explanation: "6 | 17 | 3 -> (6+1) | 7 | 3 = 773" },
      { id: 7, expression: "Balance: 8 | 16 | 7", correctAnswer: 967, conceptTag: "Balancing Rule", explanation: "8 | 16 | 7 -> (8+1) | 6 | 7 = 967" },
      { id: 8, expression: "Balance: 1 | 24 | 9", correctAnswer: 349, conceptTag: "Balancing Rule", explanation: "1 | 24 | 9 -> (1+2) | 4 | 9 = 349" },
      { id: 9, expression: "Balance: 5 | 21 | 2", correctAnswer: 712, conceptTag: "Balancing Rule", explanation: "5 | 21 | 2 -> (5+2) | 1 | 2 = 712" },
      { id: 10, expression: "Balance: 9 | 13 | 4", correctAnswer: 1034, conceptTag: "Balancing Rule", explanation: "9 | 13 | 4 -> (9+1) | 3 | 4 = 1034" },
    ]
  },
  {
    id: "svm0-dodging-table",
    title: "SVM-0: Dodging Tables",
    category: "vedic",
    level: "SVM-0",
    topic: "Dodging Table",
    description: "Split-second multiplication table drills.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "14 × 7", correctAnswer: 98, conceptTag: "Table 14", explanation: "10x7 + 4x7 = 70 + 28 = 98" },
      { id: 2, expression: "16 × 8", correctAnswer: 128, conceptTag: "Table 16", explanation: "10x8 + 6x8 = 80 + 48 = 128" },
      { id: 3, expression: "17 × 6", correctAnswer: 102, conceptTag: "Table 17", explanation: "10x6 + 7x6 = 60 + 42 = 102" },
      { id: 4, expression: "18 × 9", correctAnswer: 162, conceptTag: "Table 18", explanation: "10x9 + 8x9 = 90 + 72 = 162" },
      { id: 5, expression: "19 × 7", correctAnswer: 133, conceptTag: "Table 19", explanation: "10x7 + 9x7 = 70 + 63 = 133" },
      { id: 6, expression: "13 × 9", correctAnswer: 117, conceptTag: "Table 13", explanation: "10x9 + 3x9 = 90 + 27 = 117" },
      { id: 7, expression: "15 × 8", correctAnswer: 120, conceptTag: "Table 15", explanation: "15 x 8 = 120" },
      { id: 8, expression: "17 × 9", correctAnswer: 153, conceptTag: "Table 17", explanation: "10x9 + 7x9 = 90 + 63 = 153" },
      { id: 9, expression: "18 × 7", correctAnswer: 126, conceptTag: "Table 18", explanation: "10x7 + 8x7 = 70 + 56 = 126" },
      { id: 10, expression: "19 × 8", correctAnswer: 152, conceptTag: "Table 19", explanation: "10x8 + 9x8 = 80 + 72 = 152" },
    ]
  },
  {
    id: "svm0-mult-start-1",
    title: "SVM-0: Multiplication - Number Starting with 1",
    category: "vedic",
    level: "SVM-0",
    topic: "Multiplication - Number Starting with 1",
    description: "Teens multiplication shortcut (1N x 1M).",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "12 × 14", correctAnswer: 168, conceptTag: "(12+4) | (2x4) = 16 | 8", explanation: "(12+4) | (2x4) = 168" },
      { id: 2, expression: "13 × 15", correctAnswer: 195, conceptTag: "(13+5) | (3x5) = 18 | 15", explanation: "18 | 15 -> (18+1) | 5 = 195" },
      { id: 3, expression: "14 × 16", correctAnswer: 224, conceptTag: "(14+6) | (4x6) = 20 | 24", explanation: "20 | 24 -> (20+2) | 4 = 224" },
      { id: 4, expression: "12 × 17", correctAnswer: 204, conceptTag: "(12+7) | (2x7) = 19 | 14", explanation: "19 | 14 -> (19+1) | 4 = 204" },
      { id: 5, expression: "15 × 16", correctAnswer: 240, conceptTag: "(15+6) | (5x6) = 21 | 30", explanation: "21 | 30 -> (21+3) | 0 = 240" },
      { id: 6, expression: "13 × 17", correctAnswer: 221, conceptTag: "(13+7) | (3x7) = 20 | 21", explanation: "20 | 21 -> (20+2) | 1 = 221" },
      { id: 7, expression: "14 × 18", correctAnswer: 252, conceptTag: "(14+8) | (4x8) = 22 | 32", explanation: "22 | 32 -> (22+3) | 2 = 252" },
      { id: 8, expression: "16 × 17", correctAnswer: 272, conceptTag: "(16+7) | (6x7) = 23 | 42", explanation: "23 | 42 -> (23+4) | 2 = 272" },
      { id: 9, expression: "12 × 18", correctAnswer: 216, conceptTag: "(12+8) | (2x8) = 20 | 16", explanation: "20 | 16 -> (20+1) | 6 = 216" },
      { id: 10, expression: "15 × 18", correctAnswer: 270, conceptTag: "(15+8) | (5x8) = 23 | 40", explanation: "23 | 40 -> (23+4) | 0 = 270" },
    ]
  },
  {
    id: "svm0-mult-end-1",
    title: "SVM-0: Multiplication - Number Ending with 1",
    category: "vedic",
    level: "SVM-0",
    topic: "Multiplication - Number Ending with 1",
    description: "N1 x M1 multiplication shortcut.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "21 × 31", correctAnswer: 651, conceptTag: "(2x3) | (2+3) | 1", explanation: "6 | 5 | 1 = 651" },
      { id: 2, expression: "31 × 41", correctAnswer: 1271, conceptTag: "(3x4) | (3+4) | 1", explanation: "12 | 7 | 1 = 1271" },
      { id: 3, expression: "51 × 31", correctAnswer: 1581, conceptTag: "(5x3) | (5+3) | 1", explanation: "15 | 8 | 1 = 1581" },
      { id: 4, expression: "61 × 21", correctAnswer: 1281, conceptTag: "(6x2) | (6+2) | 1", explanation: "12 | 8 | 1 = 1281" },
      { id: 5, expression: "41 × 61", correctAnswer: 2501, conceptTag: "(4x6) | (4+6) | 1", explanation: "24 | 10 | 1 -> 25 | 0 | 1 = 2501" },
      { id: 6, expression: "71 × 31", correctAnswer: 2201, conceptTag: "(7x3) | (7+3) | 1", explanation: "21 | 10 | 1 -> 22 | 0 | 1 = 2201" },
      { id: 7, expression: "81 × 21", correctAnswer: 1701, conceptTag: "(8x2) | (8+2) | 1", explanation: "16 | 10 | 1 -> 17 | 0 | 1 = 1701" },
      { id: 8, expression: "51 × 41", correctAnswer: 2091, conceptTag: "(5x4) | (5+4) | 1", explanation: "20 | 9 | 1 = 2091" },
      { id: 9, expression: "91 × 31", correctAnswer: 2821, conceptTag: "(9x3) | (9+3) | 1", explanation: "27 | 12 | 1 -> 28 | 2 | 1 = 2821" },
      { id: 10, expression: "61 × 51", correctAnswer: 3111, conceptTag: "(6x5) | (6+5) | 1", explanation: "30 | 11 | 1 -> 31 | 1 | 1 = 3111" },
    ]
  },
  {
    id: "svm0-mult-11",
    title: "SVM-0: Multiplication by 11",
    category: "vedic",
    level: "SVM-0",
    topic: "Multiplication by 11",
    description: "Instant Vedic sandwich trick for multiplying any number by 11.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "35 × 11", correctAnswer: 385, conceptTag: "3 | (3+5) | 5 = 385", explanation: "3 | 8 | 5 = 385" },
      { id: 2, expression: "42 × 11", correctAnswer: 462, conceptTag: "4 | (4+2) | 2 = 462", explanation: "4 | 6 | 2 = 462" },
      { id: 3, expression: "63 × 11", correctAnswer: 693, conceptTag: "6 | (6+3) | 3 = 693", explanation: "6 | 9 | 3 = 693" },
      { id: 4, expression: "75 × 11", correctAnswer: 825, conceptTag: "7 | (7+5) | 5 = 825", explanation: "7 | 12 | 5 -> 825" },
      { id: 5, expression: "84 × 11", correctAnswer: 924, conceptTag: "8 | (8+4) | 4 = 924", explanation: "8 | 12 | 4 -> 924" },
      { id: 6, expression: "96 × 11", correctAnswer: 1056, conceptTag: "9 | (9+6) | 6 = 1056", explanation: "9 | 15 | 6 -> 1056" },
      { id: 7, expression: "54 × 11", correctAnswer: 594, conceptTag: "5 | (5+4) | 4 = 594", explanation: "5 | 9 | 4 = 594" },
      { id: 8, expression: "123 × 11", correctAnswer: 1353, conceptTag: "1 | (1+2) | (2+3) | 3", explanation: "1 | 3 | 5 | 3 = 1353" },
      { id: 9, expression: "245 × 11", correctAnswer: 2695, conceptTag: "2 | (2+4) | (4+5) | 5", explanation: "2 | 6 | 9 | 5 = 2695" },
      { id: 10, expression: "314 × 11", correctAnswer: 3454, conceptTag: "3 | (3+1) | (1+4) | 4", explanation: "3 | 4 | 5 | 4 = 3454" },
    ]
  },
  {
    id: "svm0-mult-multiples-11",
    title: "SVM-0: Multiplication by Multiples of 11",
    category: "vedic",
    level: "SVM-0",
    topic: "Multiplication by Multiples of 11",
    description: "Multiply numbers by 22, 33, 44, 55 instantly.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "14 × 22", correctAnswer: 308, conceptTag: "(14 x 2) x 11 = 28 x 11", explanation: "28 x 11 = 308" },
      { id: 2, expression: "21 × 33", correctAnswer: 693, conceptTag: "(21 x 3) x 11 = 63 x 11", explanation: "63 x 11 = 693" },
      { id: 3, expression: "15 × 44", correctAnswer: 660, conceptTag: "(15 x 4) x 11 = 60 x 11", explanation: "60 x 11 = 660" },
      { id: 4, expression: "23 × 33", correctAnswer: 759, conceptTag: "(23 x 3) x 11 = 69 x 11", explanation: "69 x 11 = 759" },
      { id: 5, expression: "12 × 55", correctAnswer: 660, conceptTag: "(12 x 5) x 11 = 60 x 11", explanation: "60 x 11 = 660" },
      { id: 6, expression: "31 × 22", correctAnswer: 682, conceptTag: "(31 x 2) x 11 = 62 x 11", explanation: "62 x 11 = 682" },
      { id: 7, expression: "42 × 22", correctAnswer: 924, conceptTag: "(42 x 2) x 11 = 84 x 11", explanation: "84 x 11 = 924" },
      { id: 8, expression: "24 × 33", correctAnswer: 792, conceptTag: "(24 x 3) x 11 = 72 x 11", explanation: "72 x 11 = 792" },
      { id: 9, expression: "13 × 66", correctAnswer: 858, conceptTag: "(13 x 6) x 11 = 78 x 11", explanation: "78 x 11 = 858" },
      { id: 10, expression: "25 × 44", correctAnswer: 1100, conceptTag: "(25 x 4) x 11 = 100 x 11", explanation: "100 x 11 = 1100" },
    ]
  },
  {
    id: "svm0-mult-101",
    title: "SVM-0: Multiplication by 101",
    category: "vedic",
    level: "SVM-0",
    topic: "Multiplication by 101",
    description: "Instant repeat rule for 101 multiplication.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "34 × 101", correctAnswer: 3434, conceptTag: "AB x 101 = ABAB", explanation: "34 x 101 = 3434" },
      { id: 2, expression: "57 × 101", correctAnswer: 5757, conceptTag: "AB x 101 = ABAB", explanation: "57 x 101 = 5757" },
      { id: 3, expression: "68 × 101", correctAnswer: 6868, conceptTag: "AB x 101 = ABAB", explanation: "68 x 101 = 6868" },
      { id: 4, expression: "82 × 101", correctAnswer: 8282, conceptTag: "AB x 101 = ABAB", explanation: "82 x 101 = 8282" },
      { id: 5, expression: "93 × 101", correctAnswer: 9393, conceptTag: "AB x 101 = ABAB", explanation: "93 x 101 = 9393" },
      { id: 6, expression: "45 × 101", correctAnswer: 4545, conceptTag: "AB x 101 = ABAB", explanation: "45 x 101 = 4545" },
      { id: 7, expression: "123 × 101", correctAnswer: 12423, conceptTag: "(123+1) | 23", explanation: "(123+1) | 23 = 12423" },
      { id: 8, expression: "234 × 101", correctAnswer: 23634, conceptTag: "(234+2) | 34", explanation: "(234+2) | 34 = 23634" },
      { id: 9, expression: "345 × 101", correctAnswer: 34845, conceptTag: "(345+3) | 45", explanation: "(345+3) | 45 = 34845" },
      { id: 10, expression: "456 × 101", correctAnswer: 46056, conceptTag: "(456+4) | 56", explanation: "(456+4) | 56 = 46056" },
    ]
  },
  {
    id: "svm0-count-triangles",
    title: "SVM-0: Count the number of Triangle",
    category: "vedic",
    level: "SVM-0",
    topic: "Count the number of Triangle",
    description: "Vedic spatial counting formulas for divided triangles.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Triangles in Base = 2 partitions", correctAnswer: 3, conceptTag: "1 + 2 = 3", explanation: "1 + 2 = 3 triangles" },
      { id: 2, expression: "Triangles in Base = 3 partitions", correctAnswer: 6, conceptTag: "1 + 2 + 3 = 6", explanation: "1 + 2 + 3 = 6 triangles" },
      { id: 3, expression: "Triangles in Base = 4 partitions", correctAnswer: 10, conceptTag: "1 + 2 + 3 + 4 = 10", explanation: "1 + 2 + 3 + 4 = 10 triangles" },
      { id: 4, expression: "Triangles in Base = 5 partitions", correctAnswer: 15, conceptTag: "1 + 2 + 3 + 4 + 5 = 15", explanation: "1 + 2 + 3 + 4 + 5 = 15 triangles" },
      { id: 5, expression: "Triangles in Base = 6 partitions", correctAnswer: 21, conceptTag: "n(n+1)/2 = 6x7/2 = 21", explanation: "1 + 2 + 3 + 4 + 5 + 6 = 21 triangles" },
      { id: 6, expression: "Triangles in Base = 3 with 2 horizontal layers", correctAnswer: 12, conceptTag: "(1+2+3) x 2 = 12", explanation: "6 x 2 = 12 triangles" },
      { id: 7, expression: "Triangles in Base = 4 with 2 horizontal layers", correctAnswer: 20, conceptTag: "(1+2+3+4) x 2 = 20", explanation: "10 x 2 = 20 triangles" },
      { id: 8, expression: "Triangles in Base = 5 with 2 horizontal layers", correctAnswer: 30, conceptTag: "(1+2+3+4+5) x 2 = 30", explanation: "15 x 2 = 30 triangles" },
      { id: 9, expression: "Triangles in Base = 3 with 3 horizontal layers", correctAnswer: 18, conceptTag: "(1+2+3) x 3 = 18", explanation: "6 x 3 = 18 triangles" },
      { id: 10, expression: "Triangles in Base = 4 with 3 horizontal layers", correctAnswer: 30, conceptTag: "(1+2+3+4) x 3 = 30", explanation: "10 x 3 = 30 triangles" },
    ]
  },
  {
    id: "svm0-count-circles",
    title: "SVM-0: Count the number of Circles",
    category: "vedic",
    level: "SVM-0",
    topic: "Count the number of Circles",
    description: "Concentric & grid circle counting drills.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Concentric circles with 3 layers", correctAnswer: 3, conceptTag: "Concentric Rings Count", explanation: "3 concentric layers = 3 circles" },
      { id: 2, expression: "Concentric circles with 5 layers", correctAnswer: 5, conceptTag: "Concentric Rings Count", explanation: "5 concentric layers = 5 circles" },
      { id: 3, expression: "1 Center Circle + 4 surrounding ring circles", correctAnswer: 5, conceptTag: "Central + Ring", explanation: "1 + 4 = 5 circles" },
      { id: 4, expression: "1 Center Circle + 6 surrounding ring circles", correctAnswer: 7, conceptTag: "Central + Ring", explanation: "1 + 6 = 7 circles" },
      { id: 5, expression: "3 × 3 Grid of independent circles", correctAnswer: 9, conceptTag: "Grid Count 3x3", explanation: "3 x 3 = 9 circles" },
      { id: 6, expression: "4 × 4 Grid of independent circles", correctAnswer: 16, conceptTag: "Grid Count 4x4", explanation: "4 x 4 = 16 circles" },
      { id: 7, expression: "2 Concentric sets of 3 circles each", correctAnswer: 6, conceptTag: "Multiple Sets", explanation: "3 + 3 = 6 circles" },
      { id: 8, expression: "1 Center Circle + 2 Concentric Rings of 4 circles each", correctAnswer: 9, conceptTag: "Center + 2x4 Rings", explanation: "1 + 4 + 4 = 9 circles" },
      { id: 9, expression: "5 × 5 Grid of independent circles", correctAnswer: 25, conceptTag: "Grid Count 5x5", explanation: "5 x 5 = 25 circles" },
      { id: 10, expression: "1 Center Circle + 8 surrounding ring circles", correctAnswer: 9, conceptTag: "Central + Ring", explanation: "1 + 8 = 9 circles" },
    ]
  },
  {
    id: "vedic-svm0-overall",
    title: "SVM-0-Overall (Comprehensive Level Master Quiz)",
    category: "vedic",
    level: "SVM-0",
    topic: "9. SVM-0-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all Senior Vedic Math Level 0 topics: Foundation Sutras, Ekadhik, Ekanyunena, Balancing Rule.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "35 × 35", correctAnswer: 1225, conceptTag: "SVM-0 Overall" }
    ]
  },

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
  },
  {
    id: "vedic-jvm1-overall",
    title: "JVM-1-Overall (Comprehensive Level Master Quiz)",
    category: "vedic",
    level: "JVM-1",
    topic: "11. JVM-1-Overall: Combined All-Topics Quiz",
    description: "Comprehensive master quiz combining all Junior Vedic Math Level 1 topics: Rapid Addition, Ekadhikena, Ekanyunena, Dodging Tables, Multiplications, Unit Conversions.",
    questionCount: 20,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "45 × 11", correctAnswer: 495, conceptTag: "JVM-1 Overall" }
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
 * Checks if adding or subtracting single-digit 'n' from 'currentVal' can be performed
 * DIRECTLY on the One's Place Rod of a 1-upper / 4-lower Soroban abacus WITHOUT COMPLEMENTS.
 */
export function isValidDirectOnesMove(currentVal: number, n: number): boolean {
  if (n === 0) return false;
  const nextVal = currentVal + n;
  if (nextVal < 0 || nextVal > 9) return false;

  const currentUpper = currentVal >= 5 ? 1 : 0;
  const currentLower = currentVal % 5;

  if (n > 0) {
    if (n < 5) {
      return currentLower + n <= 4;
    } else {
      const lowerNeeded = n - 5;
      return currentUpper === 0 && currentLower + lowerNeeded <= 4;
    }
  } else {
    const absN = Math.abs(n);
    if (absN < 5) {
      return currentLower >= absN;
    } else {
      const lowerSub = absN - 5;
      return currentUpper === 1 && currentLower >= lowerSub;
    }
  }
}

/**
 * Dynamic math question generator for Abacus JR-1, JR-2, JR-3, SR-1, SR-2 topic sets.
 * Generates deterministic numbers for a given attempt seed.
 */
export function generateDynamicAbacusQuestion(setId: string, qId: number, seed: string = "attempt_default"): Question | null {
  if (
    !setId.startsWith("abacus-jr0-") &&
    !setId.startsWith("abacus-jr1-") &&
    !setId.startsWith("abacus-jr2-") &&
    !setId.startsWith("abacus-jr3-") &&
    !setId.startsWith("abacus-sr1-") &&
    !setId.startsWith("abacus-sr2-") &&
    !setId.startsWith("abacus-sr3-") &&
    !setId.startsWith("abacus-sr4-") &&
    !setId.startsWith("abacus-sr5-") &&
    !setId.startsWith("abacus-sr6-") &&
    !setId.startsWith("abacus-sr7-") &&
    !setId.startsWith("abacus-sr8-") &&
    !setId.startsWith("abacus-sr9-") &&
    !setId.startsWith("abacus-sr10-")
  ) return null;

  const rng = createPRNG(`${seed}_${setId}_${qId}`);

  // JR-0 Bead Identification & Representation Generators
  if (setId === "abacus-jr0-bead-identification" || setId === "abacus-jr0-bead-representation") {
    let targetNum = 0;
    let tag = "";
    if (qId <= 6) {
      targetNum = Math.floor(rng() * 9) + 1; // 1..9
      tag = "1 Digit";
    } else if (qId <= 14) {
      targetNum = Math.floor(rng() * 90) + 10; // 10..99
      tag = "2 Digits";
    } else {
      targetNum = Math.floor(rng() * 900) + 100; // 100..999
      tag = "3 Digits";
    }

    const isIdent = setId === "abacus-jr0-bead-identification";
    return {
      id: qId,
      correctAnswer: targetNum,
      conceptTag: `JR-0 Bead ${isIdent ? "Identification" : "Representation"} (${tag})`,
    };
  }

  // SR-10 Generators
  if (setId === "abacus-sr10-decimal-mult") {
    const num1 = Math.round((Math.floor(rng() * 89) + 11) / 10 * 10) / 10;
    const num2 = Math.round((Math.floor(rng() * 89) + 11) / 10 * 10) / 10;
    const ans = Math.round(num1 * num2 * 100) / 100;
    return {
      id: qId,
      expression: `${num1} × ${num2}`,
      correctAnswer: ans,
      conceptTag: "Decimal Multiplication"
    };
  }

  if (setId === "abacus-sr10-decimal-div") {
    const divisor = Math.round((Math.floor(rng() * 45) + 5) / 10 * 10) / 10;
    const quotient = Math.floor(rng() * 49) + 2;
    const dividend = Math.round(divisor * quotient * 100) / 100;
    return {
      id: qId,
      expression: `${dividend} ÷ ${divisor}`,
      correctAnswer: quotient,
      conceptTag: "Decimal Division"
    };
  }

  if (setId === "abacus-sr10-hcf") {
    const hcfVal = Math.floor(rng() * 14) + 2;
    const pairs = [[2, 3], [3, 4], [3, 5], [2, 5], [4, 5], [3, 7], [5, 7]];
    const pair = pairs[Math.floor(rng() * pairs.length)];
    const n1 = hcfVal * pair[0];
    const n2 = hcfVal * pair[1];
    return {
      id: qId,
      expression: `HCF of ${n1} & ${n2}`,
      correctAnswer: hcfVal,
      conceptTag: "HCF Calculation"
    };
  }

  if (setId === "abacus-sr10-percentage") {
    const percentages = [5, 10, 15, 20, 25, 30, 40, 50, 60, 75];
    const p = percentages[Math.floor(rng() * percentages.length)];
    const base = (Math.floor(rng() * 20) + 1) * 20;
    const ans = Math.round((p / 100) * base);
    return {
      id: qId,
      expression: `${p}% of ${base}`,
      correctAnswer: ans,
      conceptTag: "Percentage Calculation"
    };
  }

  if (setId === "abacus-sr10-lcm") {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const smallPairs = [[6, 8], [8, 12], [12, 15], [9, 12], [10, 15], [12, 16], [14, 21], [15, 25]];
    const pair = smallPairs[Math.floor(rng() * smallPairs.length)];
    const n1 = pair[0];
    const n2 = pair[1];
    const lcmVal = (n1 * n2) / gcd(n1, n2);
    return {
      id: qId,
      expression: `LCM of ${n1} & ${n2}`,
      correctAnswer: lcmVal,
      conceptTag: "LCM Calculation"
    };
  }

  if (setId === "abacus-sr10-square-root") {
    const root = Math.floor(rng() * 85) + 12;
    const sq = root * root;
    return {
      id: qId,
      expression: `√${sq}`,
      correctAnswer: root,
      conceptTag: "Square Root Calculation"
    };
  }

  // SR-9 Decimal Generator
  if (setId === "abacus-sr9-decimal-3d-4d-3row") {
    for (let attempt = 0; attempt < 50; attempt++) {
      const is4D = rng() > 0.5;
      const minVal = is4D ? 1000 : 100;
      const maxVal = is4D ? 8999 : 899;

      const n1Raw = Math.floor(rng() * (maxVal - minVal + 1)) + minVal;
      const n2Raw = Math.floor(rng() * (maxVal - minVal + 1)) + minVal;
      const n3Raw = Math.floor(rng() * (maxVal - minVal + 1)) + minVal;

      const n1 = Math.round((n1Raw / 10) * 10) / 10;
      let n2 = Math.round((n2Raw / 10) * 10) / 10;
      let n3 = Math.round((n3Raw / 10) * 10) / 10;

      if (rng() > 0.4) n2 = -n2;
      if (rng() > 0.5) n3 = -n3;

      const total = Math.round((n1 + n2 + n3) * 10) / 10;
      if (total >= 0 && total <= 99999) {
        return {
          id: qId,
          numbers: [n1, n2, n3],
          correctAnswer: total,
          conceptTag: "SR-9 3D/4D Decimal Math"
        };
      }
    }
    return {
      id: qId,
      numbers: [145.2, 237.8, -120.5],
      correctAnswer: 262.5,
      conceptTag: "SR-9 Decimal Math"
    };
  }

  // SR-4 & SR-6 & SR-8 Multiplication / Division Generators
  if (setId === "abacus-sr4-mult-sd-sd") {
    const num1 = Math.floor(rng() * 8) + 2; // 2..9
    const num2 = Math.floor(rng() * 8) + 2; // 2..9
    return {
      id: qId,
      expression: `${num1} × ${num2}`,
      correctAnswer: num1 * num2,
      conceptTag: "SD × SD Multiplication"
    };
  }

  if (setId === "abacus-sr4-mult-sd-2d") {
    const num1 = Math.floor(rng() * 8) + 2; // 2..9
    const num2 = Math.floor(rng() * 89) + 11; // 11..99
    return {
      id: qId,
      expression: `${num2} × ${num1}`,
      correctAnswer: num1 * num2,
      conceptTag: "SD × 2D Multiplication"
    };
  }

  if (setId === "abacus-sr6-mult-sd-3d" || setId === "abacus-sr8-mult-sd-3d") {
    const num1 = Math.floor(rng() * 8) + 2; // 2..9
    const num2 = Math.floor(rng() * 899) + 101; // 101..999
    return {
      id: qId,
      expression: `${num2} × ${num1}`,
      correctAnswer: num1 * num2,
      conceptTag: "SD × 3D Multiplication"
    };
  }

  if (setId === "abacus-sr6-mult-2d-2d" || setId === "abacus-sr8-mult-2d-2d") {
    const num1 = Math.floor(rng() * 89) + 11; // 11..99
    const num2 = Math.floor(rng() * 89) + 11; // 11..99
    return {
      id: qId,
      expression: `${num1} × ${num2}`,
      correctAnswer: num1 * num2,
      conceptTag: "2D × 2D Multiplication"
    };
  }

  if (setId === "abacus-sr8-div-2d-1d") {
    const divisor = Math.floor(rng() * 8) + 2; // 2..9
    const quotient = Math.floor(rng() * 89) + 11; // 11..99
    const dividend = divisor * quotient;
    return {
      id: qId,
      expression: `${dividend} ÷ ${divisor}`,
      correctAnswer: quotient,
      conceptTag: "2D ÷ 1D Division"
    };
  }

  if (setId === "abacus-sr8-div-3d-1d") {
    const divisor = Math.floor(rng() * 8) + 2; // 2..9
    let quotient = Math.floor(rng() * 89) + 11; // 11..99
    let dividend = divisor * quotient;
    if (dividend < 100) {
      dividend += divisor * 20;
      quotient = Math.floor(dividend / divisor);
    }
    return {
      id: qId,
      expression: `${dividend} ÷ ${divisor}`,
      correctAnswer: quotient,
      conceptTag: "3D ÷ 1D Division"
    };
  }

  if (setId === "abacus-sr8-div-4d-1d") {
    const divisor = Math.floor(rng() * 8) + 2; // 2..9
    let quotient = Math.floor(rng() * 899) + 101; // 101..999
    let dividend = divisor * quotient;
    if (dividend < 1000) {
      dividend += divisor * 200;
      quotient = Math.floor(dividend / divisor);
    }
    return {
      id: qId,
      expression: `${dividend} ÷ ${divisor}`,
      correctAnswer: quotient,
      conceptTag: "4D ÷ 1D Division"
    };
  }

  let rowCount = 4;
  let digitsMode: "single" | "double" | "triple" | "quad" = "single";
  let formulaType: "direct" | "plus5" | "minus5" | "plus10" | "minus10" | "plusMixed" | "minusMixed" | "allComp" = "direct";

  // JR-1 Topics (3 Rows, 4 Rows, 5 Rows Direct Addition/Subtraction without Complements on One's Rod)
  if (setId === "abacus-jr1-direct-3row") {
    rowCount = 3;
    digitsMode = "single";
    formulaType = "direct";
  } else if (setId === "abacus-jr1-direct-4row") {
    rowCount = 4;
    digitsMode = "single";
    formulaType = "direct";
  } else if (setId === "abacus-jr1-direct-5row") {
    rowCount = 5;
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
  // SR-3 Topics
  else if (setId === "abacus-sr3-single-direct-4-5row") {
    rowCount = rng() > 0.5 ? 5 : 4;
    digitsMode = "single";
    formulaType = "direct";
  } else if (setId === "abacus-sr3-double-direct-5row") {
    rowCount = 5;
    digitsMode = "double";
    formulaType = "direct";
  } else if (setId === "abacus-sr3-triple-direct-4row") {
    rowCount = 4;
    digitsMode = "triple";
    formulaType = "direct";
  } else if (setId === "abacus-sr3-single-plusminus5-6-7row") {
    rowCount = rng() > 0.5 ? 7 : 6;
    digitsMode = "single";
    formulaType = "plus5";
  } else if (setId === "abacus-sr3-double-plusminus5-3row") {
    rowCount = 3;
    digitsMode = "double";
    formulaType = "plus5";
  } else if (setId === "abacus-sr3-single-plusminus10-6-7row") {
    rowCount = rng() > 0.5 ? 7 : 6;
    digitsMode = "single";
    formulaType = "plus10";
  } else if (setId === "abacus-sr3-single-mixed-6-7row") {
    rowCount = rng() > 0.5 ? 7 : 6;
    digitsMode = "single";
    formulaType = "plusMixed";
  }
  // SR-5 Topics
  else if (setId === "abacus-sr5-single-direct-4-5row") {
    rowCount = rng() > 0.5 ? 5 : 4;
    digitsMode = "single";
    formulaType = "direct";
  } else if (setId === "abacus-sr5-single-plusminus5-6-7row") {
    rowCount = rng() > 0.5 ? 7 : 6;
    digitsMode = "single";
    formulaType = "plus5";
  } else if (setId === "abacus-sr5-single-plusminus10-6-7row") {
    rowCount = rng() > 0.5 ? 7 : 6;
    digitsMode = "single";
    formulaType = "plus10";
  } else if (setId === "abacus-sr5-single-mixed-6-7row") {
    rowCount = rng() > 0.5 ? 7 : 6;
    digitsMode = "single";
    formulaType = "plusMixed";
  } else if (setId === "abacus-sr5-double-allcomp-5row") {
    rowCount = 5;
    digitsMode = "double";
    formulaType = "allComp";
  } else if (setId === "abacus-sr5-triple-allcomp-4row") {
    rowCount = 4;
    digitsMode = "triple";
    formulaType = "allComp";
  } else if (setId === "abacus-sr5-quad-allcomp-4row") {
    rowCount = 4;
    digitsMode = "quad";
    formulaType = "allComp";
  }
  // SR-7 Topics
  else if (setId === "abacus-sr7-single-direct-4-5row") {
    rowCount = rng() > 0.5 ? 5 : 4;
    digitsMode = "single";
    formulaType = "direct";
  } else if (setId === "abacus-sr7-single-plusminus5-6-7row") {
    rowCount = rng() > 0.5 ? 7 : 6;
    digitsMode = "single";
    formulaType = "plus5";
  } else if (setId === "abacus-sr7-single-plusminus10-6-7row") {
    rowCount = rng() > 0.5 ? 7 : 6;
    digitsMode = "single";
    formulaType = "plus10";
  } else if (setId === "abacus-sr7-single-mixed-6-7row") {
    rowCount = rng() > 0.5 ? 7 : 6;
    digitsMode = "single";
    formulaType = "plusMixed";
  } else if (setId === "abacus-sr7-double-allcomp-5row") {
    rowCount = 5;
    digitsMode = "double";
    formulaType = "allComp";
  } else if (setId === "abacus-sr7-triple-allcomp-5row") {
    rowCount = 5;
    digitsMode = "triple";
    formulaType = "allComp";
  } else if (setId === "abacus-sr7-quad-allcomp-5row") {
    rowCount = 5;
    digitsMode = "quad";
    formulaType = "allComp";
  }

  const isJR1 = setId.startsWith("abacus-jr1-");

  // Attempt up to 50 times to generate a valid sequence
  for (let attempt = 0; attempt < 50; attempt++) {
    const numbers: number[] = [];
    let minStart = 1;
    let maxStart = 8;
    if (digitsMode === "double") {
      minStart = 11;
      maxStart = 89;
    } else if (digitsMode === "triple") {
      minStart = 111;
      maxStart = 888;
    } else if (digitsMode === "quad") {
      minStart = 1111;
      maxStart = 8888;
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
      } else if (digitsMode === "quad") {
        minVal = -8888;
        maxVal = 8888;
      }

      for (let subAttempt = 0; subAttempt < 40; subAttempt++) {
        let n = Math.floor(rng() * (maxVal - minVal + 1)) + minVal;
        if (n === 0) continue;

        if (digitsMode === "double" && Math.abs(n) < 10) continue;
        if (digitsMode === "triple" && Math.abs(n) < 100) continue;
        if (digitsMode === "quad" && Math.abs(n) < 1000) continue;

        // Strict physical Soroban bead validation for JR-1 direct ones rod
        if (isJR1) {
          if (isValidDirectOnesMove(currentTotal, n)) {
            candidate = n;
            break;
          }
        } else {
          const nextTotal = currentTotal + n;
          if (nextTotal >= 0) {
            candidate = n;
            break;
          }
        }
      }

      if (candidate === null) break;
      numbers.push(candidate);
      currentTotal += candidate;
    }

    if (numbers.length === rowCount && currentTotal >= 0 && currentTotal <= 99999) {
      return {
        id: qId,
        numbers,
        correctAnswer: currentTotal,
        conceptTag: isJR1 ? "One's Place Rod (Direct Single Digit)" : `Abacus JR ${digitsMode.toUpperCase()}`
      };
    }
  }

  // Fallback safe sequence if candidate loop exhausted
  const fallbackNumbers =
    rowCount === 3
      ? [2, 5, -1]
      : rowCount === 4
      ? [2, 5, -1, 3]
      : [1, 3, 5, -2];

  const fallbackAns = fallbackNumbers.reduce((a, b) => a + b, 0);

  return {
    id: qId,
    numbers: digitsMode === "quad" ? [4852, 3721, -2405, 5194] : digitsMode === "triple" ? [452, 235, -123, 115] : digitsMode === "double" ? [42, 35, -21, 15] : fallbackNumbers,
    correctAnswer: digitsMode === "quad" ? 11362 : digitsMode === "triple" ? 679 : digitsMode === "double" ? 71 : fallbackAns,
    conceptTag: isJR1 ? "One's Place Rod (Direct Single Digit)" : "Abacus Practice"
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

  if (setId.endsWith("-overall")) {
    const allSets = getAllQuestionSets();
    const siblingSets = allSets.filter(
      (s) => s.category === base.category && s.level === base.level && !s.id.endsWith("-overall")
    );

    if (siblingSets.length > 0) {
      for (let i = 0; i < targetCount; i++) {
        const sibling = siblingSets[i % siblingSets.length];
        const dynamicQ = generateDynamicAbacusQuestion(sibling.id, i + 1, seed);

        if (dynamicQ) {
          expandedQuestions.push({
            ...dynamicQ,
            id: i + 1,
            conceptTag: `${base.level} Overall [${sibling.title}]`,
          });
        } else if (sibling.questions && sibling.questions.length > 0) {
          const siblingQ = sibling.questions[i % sibling.questions.length];
          expandedQuestions.push({
            ...siblingQ,
            id: i + 1,
            conceptTag: `${base.level} Overall [${sibling.title}]`,
          });
        } else {
          const baseQ = base.questions[i % base.questions.length];
          expandedQuestions.push({
            ...baseQ,
            id: i + 1,
          });
        }
      }
    }
  }

  if (setId === "abacus-sr-mixed-direct") {
    for (let i = 0; i < targetCount; i++) {
      const targetSubSet = i % 2 === 0 ? "abacus-sr1-single-direct-5-6row" : "abacus-sr2-double-direct";
      const dynamicQ = generateDynamicAbacusQuestion(targetSubSet, i + 1, seed);
      if (dynamicQ) {
        expandedQuestions.push({
          ...dynamicQ,
          id: i + 1,
          conceptTag: i % 2 === 0 ? "Single Digit Direct (5-6 Rows)" : "Double Digit Direct (4-5 Rows)",
        });
      } else {
        expandedQuestions.push({
          id: i + 1,
          numbers: i % 2 === 0 ? [2, 5, -1, 3] : [24, 15, -12, 30],
          correctAnswer: i % 2 === 0 ? 9 : 57,
          conceptTag: i % 2 === 0 ? "Single Digit Direct" : "Double Digit Direct",
        });
      }
    }
  }

  if (expandedQuestions.length === 0) {
    for (let i = 0; i < targetCount; i++) {
      const dynamicQ = generateDynamicAbacusQuestion(setId, i + 1, seed);
      if (dynamicQ) {
        expandedQuestions.push(dynamicQ);
      } else {
        const hasBaseQuestions = Array.isArray(base?.questions) && base.questions.length > 0;
        const baseQ = hasBaseQuestions
          ? base.questions[i % base.questions.length]
          : { id: i + 1, numbers: [2, 5, -1], correctAnswer: 6, conceptTag: "Speed Practice Drill" };

        const fallbackNumbers = baseQ.numbers || (baseQ.expression ? undefined : [2, 5, -1]);
        const fallbackExpression = baseQ.expression || (!baseQ.numbers ? "5 + 3" : undefined);
        const fallbackAns = typeof baseQ.correctAnswer === "number" ? baseQ.correctAnswer : (fallbackNumbers ? fallbackNumbers.reduce((a, b) => a + b, 0) : 8);

        expandedQuestions.push({
          ...baseQ,
          id: i + 1,
          numbers: fallbackNumbers,
          expression: fallbackExpression,
          correctAnswer: fallbackAns,
          conceptTag: baseQ.conceptTag || "Practice Question",
        });
      }
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
