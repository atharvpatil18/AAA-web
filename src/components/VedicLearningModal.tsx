/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, BookOpen, Sparkles, CheckCircle, ArrowRight, Lightbulb, Zap, HelpCircle } from "lucide-react";

interface VedicLearningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartPractice: () => void;
  topicTitle: string;
  topicId: string;
}

interface TopicContent {
  sutraName: string;
  englishMeaning: string;
  summary: string;
  keySteps: string[];
  workedExample: {
    problem: string;
    steps: { label: string; detail: string }[];
    finalAnswer: string;
  };
  warmupQuestions: {
    question: string;
    options: (number | string)[];
    correct: number | string;
    explanation: string;
  }[];
  visualType?: "triangle" | "circle" | "rectangle" | "square" | "grid3x3" | "none";
}

const TOPIC_LESSONS: Record<string, TopicContent> = {
  "5 compliment": {
    sutraName: "Soroban 5-Complement Small Friends (五の補数 - Goshin)",
    englishMeaning: "Using upper bead (Goda = 5) when lower beads (Ichidama = 1) are busy",
    summary: "On the Japanese Soroban (算盤), when you lack sufficient lower beads (Ichidama) to add, move the upper bead (Goda = 5) DOWN to the beam with your index finger, and move the Small Friend complement lower beads DOWN away from the beam: +4 = +5 - 1, +3 = +5 - 2, +2 = +5 - 3, +1 = +5 - 4.",
    keySteps: [
      "+4 = Move Goda (+5) DOWN to beam, Move 1 Ichidama (-1) DOWN",
      "+3 = Move Goda (+5) DOWN to beam, Move 2 Ichidama (-2) DOWN",
      "+2 = Move Goda (+5) DOWN to beam, Move 3 Ichidama (-3) DOWN",
      "+1 = Move Goda (+5) DOWN to beam, Move 4 Ichidama (-4) DOWN",
      "Finger rule: Use Index finger for upper bead (Goda) and all subtraction movements."
    ],
    workedExample: {
      problem: "Calculate 4 + 3 on Soroban",
      steps: [
        { label: "Step 1: Set 4 (Ichidama)", detail: "Move 4 lower beads UP to beam using THUMB." },
        { label: "Step 2: Add 3 (Goshin formula: +5 - 2)", detail: "Move upper bead (Goda) DOWN (+5) & move 2 lower beads DOWN (-2) using INDEX FINGER." }
      ],
      finalAnswer: "7"
    },
    warmupQuestions: [
      {
        question: "In Soroban Goshin (5-Complement), what is the formula for +3?",
        options: ["+5 - 2", "+5 - 1", "+10 - 7", "+5 - 3"],
        correct: "+5 - 2",
        explanation: "Soroban Small Friend formula for +3 is +5 - 2."
      },
      {
        question: "Which finger is used on Soroban to move lower beads (Ichidama) UP to the beam?",
        options: ["Thumb", "Index Finger", "Middle Finger", "Ring Finger"],
        correct: "Thumb",
        explanation: "Soroban technique uses the Thumb exclusively for pushing lower beads (Ichidama) UP."
      }
    ]
  },
  "10 compliment": {
    sutraName: "Soroban 10-Complement Big Friends (十の補数 - Jushin)",
    englishMeaning: "Carrying 1 bead to the left rod (+10) when current rod reaches capacity",
    summary: "When a Soroban rod reaches 9 and cannot fit more beads, add 1 bead UP to the next left rod (+10) using your thumb, and subtract the Big Friend complement on the current rod using your index finger: +9 = +10 - 1, +8 = +10 - 2, +7 = +10 - 3 ... +1 = +10 - 9.",
    keySteps: [
      "+9 = Add 1 on left rod (+10), Subtract 1 on current rod (-1)",
      "+8 = Add 1 on left rod (+10), Subtract 2 on current rod (-2)",
      "+7 = Add 1 on left rod (+10), Subtract 3 on current rod (-3)",
      "+6 = Add 1 on left rod (+10), Subtract 4 on current rod (-4)",
      "Subtraction Jushin: -9 = -10 + 1, -8 = -10 + 2, -7 = -10 + 3, -6 = -10 + 4."
    ],
    workedExample: {
      problem: "Calculate 9 + 4 on Soroban",
      steps: [
        { label: "Step 1: Set 9", detail: "Upper bead (Goda) DOWN + 4 lower beads (Ichidama) UP." },
        { label: "Step 2: Add 4 (Jushin formula: +10 - 6)", detail: "Add 1 lower bead UP on left rod (+10), clear current rod (-6)." }
      ],
      finalAnswer: "13"
    },
    warmupQuestions: [
      {
        question: "In Soroban Jushin (10-Complement), what is the formula for +8?",
        options: ["+10 - 2", "+5 - 2", "+10 - 8", "+10 - 3"],
        correct: "+10 - 2",
        explanation: "Soroban Big Friend formula for +8 is +10 - 2."
      },
      {
        question: "Calculate 8 + 7 using Soroban Big Friend Jushin:",
        options: [14, 15, 16, 13],
        correct: 15,
        explanation: "8 + (+10 - 3) = 15."
      }
    ]
  },
  "Mixed compliment": {
    sutraName: "Soroban Combination Friends (複合補数 - Shingoshin)",
    englishMeaning: "Combining upper bead (Goda) and left rod (+10) together",
    summary: "Used when adding 6, 7, 8, 9 and lower beads on the current rod are busy: +6 = +10 - 5 + 1, +7 = +10 - 5 + 2, +8 = +10 - 5 + 3, +9 = +10 - 5 + 4.",
    keySteps: [
      "+6 = Add 1 on left rod (+10), Move Goda UP (-5), Add 1 Ichidama (+1)",
      "+7 = Add 1 on left rod (+10), Move Goda UP (-5), Add 2 Ichidama (+2)",
      "+8 = Add 1 on left rod (+10), Move Goda UP (-5), Add 3 Ichidama (+3)",
      "+9 = Add 1 on left rod (+10), Move Goda UP (-5), Add 4 Ichidama (+4)"
    ],
    workedExample: {
      problem: "Calculate 6 + 7 on Soroban",
      steps: [
        { label: "Step 1: Set 6", detail: "Upper bead (Goda) DOWN + 1 lower bead (Ichidama) UP." },
        { label: "Step 2: Add 7 (Shingoshin formula: +10 - 5 + 2)", detail: "Left rod +10, Upper bead UP (-5), 2 lower beads UP (+2)." }
      ],
      finalAnswer: "13"
    },
    warmupQuestions: [
      {
        question: "In Soroban Shingoshin (Combination), what is the formula for +7?",
        options: ["+10 - 5 + 2", "+10 - 3", "+5 - 2", "+10 - 5 + 3"],
        correct: "+10 - 5 + 2",
        explanation: "Combination formula for +7 is +10 - 5 + 2."
      },
      {
        question: "Calculate 7 + 8 using Soroban Combination formula:",
        options: [14, 15, 16, 17],
        correct: 15,
        explanation: "7 + (+10 - 5 + 3) = 15."
      }
    ]
  },
  "Direct": {
    sutraName: "Soroban Direct Bead Method (直接 - Chokusetsu)",
    englishMeaning: "Direct bead manipulation without complements",
    summary: "On the Soroban, direct addition/subtraction moves upper beads (Goda = 5) or lower beads (Ichidama = 1) directly toward or away from the horizontal beam (Reiki).",
    keySteps: [
      "Add lower beads (Ichidama): Push UP toward beam using THUMB.",
      "Add upper bead (Goda): Push DOWN toward beam using INDEX FINGER.",
      "Subtract lower beads: Push DOWN away from beam using INDEX FINGER.",
      "Subtract upper bead: Push UP away from beam using INDEX FINGER."
    ],
    workedExample: {
      problem: "Calculate 2 + 5 - 1 directly on Soroban",
      steps: [
        { label: "Step 1: Push 2 lower beads UP (Thumb)", detail: "Value = 2" },
        { label: "Step 2: Push 1 upper bead DOWN (Index Finger)", detail: "Value = 7" },
        { label: "Step 3: Push 1 lower bead DOWN (Index Finger)", detail: "Value = 6" }
      ],
      finalAnswer: "6"
    },
    warmupQuestions: [
      {
        question: "What is the total value when 1 Goda (upper bead) and 3 Ichidama (lower beads) touch the beam?",
        options: [7, 8, 9, 6],
        correct: 8,
        explanation: "Goda (5) + 3 Ichidama (3) = 8."
      },
      {
        question: "Calculate 4 + 5 - 2 directly on Soroban:",
        options: [6, 7, 8, 5],
        correct: 7,
        explanation: "4 + 5 - 2 = 7."
      }
    ]
  },
  "Division": {
    sutraName: "Soroban Division (算盤割り算 - Wazan)",
    englishMeaning: "Setting dividend, quotient rods, and product subtraction",
    summary: "Set dividend on rightmost rods and divisor on left rods. Determine quotient digit, place on quotient rod, and subtract product (Quotient x Divisor) using Soroban complements.",
    keySteps: [
      "Set divisor on left rod, dividend on right rods.",
      "Estimate quotient digit.",
      "Place quotient digit on assigned quotient rod.",
      "Subtract product (Quotient x Divisor) from dividend rods using Jushin / Goshin."
    ],
    workedExample: {
      problem: "Divide 48 ÷ 6 on Soroban",
      steps: [
        { label: "Step 1: Set 48 on Rods 2 & 1", detail: "Dividend = 48" },
        { label: "Step 2: Quotient digit 8", detail: "8 x 6 = 48" },
        { label: "Step 3: Subtract 48", detail: "48 - 48 = 0" }
      ],
      finalAnswer: "Quotient = 8, Remainder = 0"
    },
    warmupQuestions: [
      {
        question: "What is 36 ÷ 4 on Soroban Wazan?",
        options: [8, 9, 7, 6],
        correct: 9,
        explanation: "36 ÷ 4 = 9."
      },
      {
        question: "What is 144 ÷ 12?",
        options: [11, 12, 13, 14],
        correct: 12,
        explanation: "144 ÷ 12 = 12."
      }
    ]
  },
  "Multiplication": {
    sutraName: "Soroban Multiplication (算盤掛け算 - Kazan)",
    englishMeaning: "Partial products on assigned Soroban rods",
    summary: "Multiplication on Soroban breaks multiplicand into digits. Multiply each digit by multiplier and add partial products to target rods using Soroban complements.",
    keySteps: [
      "Assign rods: Multiplicand (left), Multiplier (right), Product (center).",
      "Multiply Tens digit x Multiplier -> place on Rods 3 & 2.",
      "Multiply Unit digit x Multiplier -> place on Rods 2 & 1.",
      "Add products using Goshin & Jushin bead complements."
    ],
    workedExample: {
      problem: "Calculate 34 x 6 on Soroban Kazan",
      steps: [
        { label: "Step 1: 3 x 6", detail: "18 on Rods 3 & 2 (180)" },
        { label: "Step 2: 4 x 6", detail: "24 on Rods 2 & 1" },
        { label: "Step 3: Add partial products", detail: "180 + 24 = 204" }
      ],
      finalAnswer: "204"
    },
    warmupQuestions: [
      {
        question: "What is 42 x 5 on Soroban Kazan?",
        options: [200, 210, 220, 190],
        correct: 210,
        explanation: "40x5=200 + 2x5=10 -> 210."
      },
      {
        question: "What is 25 x 4?",
        options: [100, 90, 110, 80],
        correct: 100,
        explanation: "25 x 4 = 100."
      }
    ]
  },
  "Percentage": {
    sutraName: "Abacus Percentage Scaling",
    englishMeaning: "Rate per hundred formula (N x P / 100)",
    summary: "Percentage represents parts per 100. Calculate by multiplying number N by percentage rate P on abacus rods, then shift decimal 2 rods left.",
    keySteps: [
      "Multiply Number N by Percentage rate P: (N x P).",
      "Divide by 100 (shift decimal point 2 rods left)."
    ],
    workedExample: {
      problem: "Find 15% of 400",
      steps: [
        { label: "Step 1: Multiply 400 x 15", detail: "400 x 15 = 6000" },
        { label: "Step 2: Divide by 100", detail: "6000 ÷ 100 = 60" }
      ],
      finalAnswer: "60"
    },
    warmupQuestions: [
      {
        question: "What is 20% of 250?",
        options: [40, 50, 60, 45],
        correct: 50,
        explanation: "(250 x 20) ÷ 100 = 5000 ÷ 100 = 50."
      },
      {
        question: "What is 10% of 850?",
        options: [85, 8.5, 850, 75],
        correct: 85,
        explanation: "850 x 10 / 100 = 85."
      }
    ]
  },
  "Square root": {
    sutraName: "Abacus Square Root Extraction",
    englishMeaning: "2-rod pairing square root method",
    summary: "Group digits into pairs from right. Find nearest square for left group, set root digit, and subtract square. Double the root and divide remainder.",
    keySteps: [
      "Pair digits from right.",
      "Find largest root digit r such that r² <= left pair.",
      "Subtract r² and bring down next pair.",
      "Determine next root digit."
    ],
    workedExample: {
      problem: "Find √2025 on Abacus",
      steps: [
        { label: "Step 1: Pair 20 | 25", detail: "Nearest square to 20 is 16 (4²)" },
        { label: "Step 2: Remainder 425", detail: "Root ends in 5 -> 45" },
        { label: "Step 3: Verification", detail: "45 x 45 = 2025" }
      ],
      finalAnswer: "45"
    },
    warmupQuestions: [
      {
        question: "What is √1225?",
        options: [35, 25, 45, 30],
        correct: 35,
        explanation: "3x4=12 -> 35."
      },
      {
        question: "What is √3025?",
        options: [55, 45, 65, 50],
        correct: 55,
        explanation: "5x6=30 -> 55."
      }
    ]
  },
  "Division General Method [Flag Method]": {
    sutraName: "Dhwajanka Division Sutra",
    englishMeaning: "Flag-Digit Division Method",
    summary: "Universal Vedic division method for any divisor (e.g. 53, 42, 312). Divisor is split into Main divisor (d1) and Flag digit (d2). At each step, adjust dividend by subtracting (Quotient digit x Flag digit).",
    keySteps: [
      "Split divisor: Main divisor d1 on bottom, Flag digit d2 on top.",
      "Partition dividend by number of flag digits.",
      "Divide by main divisor d1 to get quotient digit q.",
      "Adjust next dividend digit: Gross dividend - (q x d2)."
    ],
    workedExample: {
      problem: "Divide 4382 ÷ 53",
      steps: [
        { label: "Step 1: Main=5, Flag=3", detail: "43 ÷ 5 = Q:8, R:3" },
        { label: "Step 2: Gross remainder 38", detail: "Adjusted = 38 - (8 x 3) = 38 - 24 = 14" },
        { label: "Step 3: 14 ÷ 5", detail: "Q:2, R:4" },
        { label: "Step 4: Final remainder from 42", detail: "Adjusted = 42 - (2 x 3) = 36" }
      ],
      finalAnswer: "Quotient = 82, Remainder = 36"
    },
    warmupQuestions: [
      {
        question: "What is the Quotient of 1234 ÷ 42 using Flag Method?",
        options: [29, 28, 30, 27],
        correct: 29,
        explanation: "Quotient = 29, Remainder = 16."
      },
      {
        question: "What is the Remainder of 4382 ÷ 53?",
        options: [36, 34, 38, 32],
        correct: 36,
        explanation: "Remainder = 36."
      }
    ]
  },
  "Squares by Duplex Method": {
    sutraName: "Dwandwa Yoga (Duplex Squaring)",
    englishMeaning: "The Duplex Combination Formula",
    summary: "Duplex formula: D(a) = a², D(ab) = 2ab, D(abc) = 2ac + b². To square any number, calculate duplexes of all digit groups from left to right and combine with carry over.",
    keySteps: [
      "D(a) = a² for single digit.",
      "D(ab) = 2 x a x b for 2 digits.",
      "D(abc) = 2 x a x c + b² for 3 digits.",
      "Sum duplex columns with carry over."
    ],
    workedExample: {
      problem: "Calculate 43² using Duplex Method",
      steps: [
        { label: "Step 1: D(4)", detail: "4² = 16" },
        { label: "Step 2: D(43)", detail: "2 x 4 x 3 = 24" },
        { label: "Step 3: D(3)", detail: "3² = 9" },
        { label: "Step 4: Combine with carry", detail: "16 | 24 | 9 -> 1849" }
      ],
      finalAnswer: "1849"
    },
    warmupQuestions: [
      {
        question: "What is D(43)?",
        options: [24, 12, 16, 25],
        correct: 24,
        explanation: "D(43) = 2 x 4 x 3 = 24."
      },
      {
        question: "What is 62² using Duplex?",
        options: [3844, 3834, 3854, 3744],
        correct: 3844,
        explanation: "D(6)|D(62)|D(2) = 36 | 24 | 4 = 3844."
      }
    ]
  },
  "Square Roots of Exact Squares": {
    sutraName: "Vilokanam Square Root Observation",
    englishMeaning: "By Observation & Last Digit Matching",
    summary: "Determine square roots of perfect squares up to 10,000 instantly by pairing digits from right and matching the last digit.",
    keySteps: [
      "Pair digits from right: e.g. 18 | 49.",
      "First group 18 -> tens digit = 4 (since 4²=16 < 18).",
      "Last digit 9 -> unit digit is 3 or 7.",
      "Check 4 x 5 = 20 > 18 -> choose smaller unit 3 -> 43."
    ],
    workedExample: {
      problem: "Find √1849",
      steps: [
        { label: "Step 1: Pair 18 | 49", detail: "Nearest square to 18 is 16 (4)" },
        { label: "Step 2: Unit digit options for 9", detail: "3 or 7" },
        { label: "Step 3: Compare 4 x 5 = 20", detail: "18 < 20 -> select 3 -> 43" }
      ],
      finalAnswer: "43"
    },
    warmupQuestions: [
      {
        question: "What is √3844?",
        options: [62, 68, 64, 66],
        correct: 62,
        explanation: "Ends in 4 (2 or 8), near 3600 (60) -> 62."
      },
      {
        question: "What is √5476?",
        options: [74, 76, 72, 78],
        correct: 74,
        explanation: "Ends in 6 (4 or 6), near 4900 (70) -> 74."
      }
    ]
  },
  "CUBES": {
    sutraName: "Yavadunam & Ratio Cubing Sutra",
    englishMeaning: "Whatever the extent of deficiency/excess, cube formula",
    summary: "For numbers near 10 (e.g. 12³), excess d = +2. LHS = (N + 2d) = 16, Middle = (3 x d²) = 12, RHS = (d³) = 8. Combine with carry: 16 | 12 | 8 -> 1728.",
    keySteps: [
      "Deviation d = Number - Base 10.",
      "Left part = Number + 2d.",
      "Middle part = 3 x d².",
      "Right part = d³."
    ],
    workedExample: {
      problem: "Calculate 12³",
      steps: [
        { label: "Step 1: Deviation d", detail: "12 - 10 = 2" },
        { label: "Step 2: Left part", detail: "12 + 2(2) = 16" },
        { label: "Step 3: Middle part", detail: "3 x 2² = 12" },
        { label: "Step 4: Right part & carry", detail: "2³ = 8 -> 16 | 12 | 8 = 1728" }
      ],
      finalAnswer: "1728"
    },
    warmupQuestions: [
      {
        question: "What is 13³?",
        options: [2197, 2187, 2207, 2177],
        correct: 2197,
        explanation: "13³ = 2197."
      },
      {
        question: "What is 15³?",
        options: [3375, 3365, 3385, 3275],
        correct: 3375,
        explanation: "15³ = 3375."
      }
    ]
  },
  "Cube Roots of Exact Cubes": {
    sutraName: "Vilokanam Cube Root Observation",
    englishMeaning: "Instant Cube Root by 3-digit Grouping",
    summary: "Find cube roots of perfect cubes up to 1,000,000 instantly. Last digit uniquely determines unit digit (1->1, 2->8, 3->7, 4->4, 5->5, 6->6, 7->3, 8->2, 9->9).",
    keySteps: [
      "Group digits in 3s from right: e.g. 1 | 728.",
      "Last digit 8 -> unit digit = 2.",
      "First group 1 -> tens digit = 1 (1³=1)."
    ],
    workedExample: {
      problem: "Find ∛1728",
      steps: [
        { label: "Step 1: Grouping 1 | 728", detail: "Last digit 8 -> Unit digit = 2" },
        { label: "Step 2: First group 1", detail: "Largest cube <= 1 is 1³ = 1 -> Tens digit = 1" }
      ],
      finalAnswer: "12"
    },
    warmupQuestions: [
      {
        question: "What is ∛2744?",
        options: [14, 16, 12, 18],
        correct: 14,
        explanation: "Ends in 4 (4), group 2 -> 14."
      },
      {
        question: "What is ∛4913?",
        options: [17, 13, 19, 15],
        correct: 17,
        explanation: "Ends in 3 (7), group 4 -> 17."
      }
    ]
  },
  "Fourth Power 2 Digit Number": {
    sutraName: "Vedic Binomial 4th Power Ratio",
    englishMeaning: "Pascal's 4th Power Ratio (1 4 6 4 1)",
    summary: "For 2-digit number (a+b)⁴, columns are a⁴ | 4a³b | 6a²b² | 4ab³ | b⁴. Combine from right with carry over.",
    keySteps: [
      "Calculate terms: a⁴, 4a³b, 6a²b², 4ab³, b⁴.",
      "Combine columns from right to left with carry over."
    ],
    workedExample: {
      problem: "Calculate 12⁴",
      steps: [
        { label: "Step 1: Terms for a=1, b=2", detail: "1⁴=1 | 4(1)(2)=8 | 6(1)(4)=24 | 4(1)(8)=32 | 2⁴=16" },
        { label: "Step 2: Combine with carry", detail: "1 | 8 | 24 | 32 | 16 = 20736" }
      ],
      finalAnswer: "20736"
    },
    warmupQuestions: [
      {
        question: "What is 11⁴?",
        options: [14641, 14541, 14741, 13641],
        correct: 14641,
        explanation: "1 | 4 | 6 | 4 | 1 = 14641."
      },
      {
        question: "What is 12⁴?",
        options: [20736, 20636, 20836, 19736],
        correct: 20736,
        explanation: "20736."
      }
    ]
  },
  "Subtraction ( all from 9 last from 10)": {
    sutraName: "Nikhilam Navatashcaramam Dashatah",
    englishMeaning: "All from 9 and the last from 10",
    summary: "To subtract any number from a base of 10, 100, 1000, subtract every digit from 9 except the last non-zero digit which is subtracted from 10.",
    keySteps: [
      "Subtract the first digit from 9.",
      "Subtract intermediate digits from 9.",
      "Subtract the last non-zero digit from 10."
    ],
    workedExample: {
      problem: "Calculate 1000 - 456",
      steps: [
        { label: "Step 1: First digit from 9", detail: "9 - 4 = 5" },
        { label: "Step 2: Second digit from 9", detail: "9 - 5 = 4" },
        { label: "Step 3: Last digit from 10", detail: "10 - 6 = 4" }
      ],
      finalAnswer: "544"
    },
    warmupQuestions: [
      {
        question: "What is 1000 - 328 using Nikhilam?",
        options: [672, 682, 662, 674],
        correct: 672,
        explanation: "(9-3)(9-2)(10-8) = 672."
      },
      {
        question: "What is 10000 - 6427?",
        options: [3563, 3573, 3583, 3473],
        correct: 3573,
        explanation: "(9-6)(9-4)(9-2)(10-7) = 3573."
      }
    ]
  },
  "Vinculum": {
    sutraName: "Vinculum Bar Number Conversion",
    englishMeaning: "Expressing large digits (>5) as negative bar digits",
    summary: "Digits larger than 5 are replaced by their 10's complement with a bar, and the left neighbor digit is incremented by 1.",
    keySteps: [
      "Identify digits greater than 5.",
      "Replace unit digit U with (10 - U) and put a bar line over it.",
      "Add 1 to the next left digit."
    ],
    workedExample: {
      problem: "Convert 18 into Vinculum form",
      steps: [
        { label: "Step 1: Unit 8 > 5", detail: "10 - 8 = 2 (bar 2)" },
        { label: "Step 2: Add 1 to left digit 1", detail: "1 + 1 = 2" },
        { label: "Step 3: Combine", detail: "20 - 2 = 18" }
      ],
      finalAnswer: "18"
    },
    warmupQuestions: [
      {
        question: "What is the Vinculum form of 28?",
        options: [30 - 2, 20 - 2, 30 + 2, 28],
        correct: 30 - 2,
        explanation: "28 = 30 - 2."
      },
      {
        question: "What is the Vinculum form of 47?",
        options: [50 - 3, 40 - 3, 50 + 3, 47],
        correct: 50 - 3,
        explanation: "47 = 50 - 3."
      }
    ]
  },
  "Devinculate": {
    sutraName: "Devinculation (Bar to Standard Number)",
    englishMeaning: "Converting bar digits back to positive decimal integers",
    summary: "To devinculate, subtract bar digit from 10 (or 9) and decrement the left neighbor digit by 1.",
    keySteps: [
      "Identify bar digits.",
      "Subtract rightmost bar digit from 10.",
      "Subtract preceding bar digits from 9.",
      "Decrement the first non-bar digit on the left by 1."
    ],
    workedExample: {
      problem: "Devinculate 3̄1 (30 - 1)",
      steps: [
        { label: "Step 1: Unit bar digit 1", detail: "10 - 1 = 9" },
        { label: "Step 2: Left digit 3", detail: "3 - 1 = 2" }
      ],
      finalAnswer: "29"
    },
    warmupQuestions: [
      {
        question: "Devinculate 5̄3 (50 - 3):",
        options: [47, 48, 46, 45],
        correct: 47,
        explanation: "50 - 3 = 47."
      },
      {
        question: "Devinculate 10̄2 (100 - 2):",
        options: [98, 97, 99, 96],
        correct: 98,
        explanation: "100 - 2 = 98."
      }
    ]
  },
  "Division by number above base 100": {
    sutraName: "Paravartya Yojayet (Base 100 Division)",
    englishMeaning: "Transpose and Apply",
    summary: "For divisor 102 (base 100, surplus +02), transpose surplus to negative bar digits (-0, -2). Multiply quotient digits and add down.",
    keySteps: [
      "Base = 100. Transpose divisor surplus +02 -> -0, -2.",
      "Partition dividend: Quotient | Remainder (2 rightmost digits).",
      "Multiply quotient digit by transposed digits and add down."
    ],
    workedExample: {
      problem: "Divide 1243 ÷ 102",
      steps: [
        { label: "Step 1: Transposed divisor", detail: "102 -> -0, -2" },
        { label: "Step 2: First quotient digit 1", detail: "1 x (-0, -2) = 0, -2" },
        { label: "Step 3: Second digit 2 - 0 = 2", detail: "2 x (-0, -2) = 0, -4" },
        { label: "Step 4: Remainder sum", detail: "43 - 24 = 19" }
      ],
      finalAnswer: "Quotient = 12, Remainder = 19"
    },
    warmupQuestions: [
      {
        question: "What is the Quotient of 1354 ÷ 103?",
        options: [13, 14, 12, 15],
        correct: 13,
        explanation: "Quotient = 13, Remainder = 15."
      },
      {
        question: "What is the Remainder of 1243 ÷ 102?",
        options: [19, 18, 20, 17],
        correct: 19,
        explanation: "Remainder = 19."
      }
    ]
  },
  "Squares (Base Method)": {
    sutraName: "Yavadunam Tavadunikritya Varganchana Yojayet",
    englishMeaning: "Whatever the extent of deficiency/excess, lessen/increase by that extent & set up square",
    summary: "To square a number near base 100 (e.g. 107 or 96), LHS = Number + Deviation, RHS = Deviation^2.",
    keySteps: [
      "Find deviation d from base 100.",
      "LHS = Number + deviation d.",
      "RHS = deviation d^2 (2 digits)."
    ],
    workedExample: {
      problem: "Calculate 107² using Base Method",
      steps: [
        { label: "Step 1: Deviation d", detail: "107 - 100 = +7" },
        { label: "Step 2: LHS", detail: "107 + 7 = 114" },
        { label: "Step 3: RHS d²", detail: "7² = 49" }
      ],
      finalAnswer: "11449"
    },
    warmupQuestions: [
      {
        question: "What is 108²?",
        options: [11664, 11654, 11674, 11564],
        correct: 11664,
        explanation: "(108+8) | (8²) = 11664."
      },
      {
        question: "What is 96²?",
        options: [9216, 9226, 9206, 9116],
        correct: 9216,
        explanation: "(96-4) | (4²) = 9216."
      }
    ]
  },
  "Square of number ending with 5": {
    sutraName: "Ekadhikena Purvena (Squaring 5s)",
    englishMeaning: "By one more than the previous one",
    summary: "For numbers ending with 5 (e.g. 65²), LHS = Tens digit x (Tens digit + 1), RHS = 25.",
    keySteps: [
      "Multiply left part A by (A + 1).",
      "Append 25 to the right: (A x (A+1)) | 25."
    ],
    workedExample: {
      problem: "Calculate 65²",
      steps: [
        { label: "Step 1: Left part 6 x (6+1)", detail: "6 x 7 = 42" },
        { label: "Step 2: Right part 25", detail: "Append 25" }
      ],
      finalAnswer: "4225"
    },
    warmupQuestions: [
      {
        question: "What is 75²?",
        options: [5625, 5615, 5635, 5525],
        correct: 5625,
        explanation: "(7x8) | 25 = 5625."
      },
      {
        question: "What is 105²?",
        options: [11025, 11015, 11035, 10925],
        correct: 11025,
        explanation: "(10x11) | 25 = 11025."
      }
    ]
  },
  "Square of number starting with 5": {
    sutraName: "5-Prefix Squaring Shortcut",
    englishMeaning: "50-series fast squaring rule",
    summary: "For 2-digit numbers starting with 5 (5U²), LHS = (25 + U), RHS = U².",
    keySteps: [
      "LHS = 25 + Unit digit U.",
      "RHS = Unit digit U² (2 digits)."
    ],
    workedExample: {
      problem: "Calculate 53²",
      steps: [
        { label: "Step 1: LHS (25 + 3)", detail: "25 + 3 = 28" },
        { label: "Step 2: RHS (3²)", detail: "3² = 09" }
      ],
      finalAnswer: "2809"
    },
    warmupQuestions: [
      {
        question: "What is 54²?",
        options: [2916, 2926, 2906, 2816],
        correct: 2916,
        explanation: "(25+4) | (4²) = 2916."
      },
      {
        question: "What is 57²?",
        options: [3249, 3239, 3259, 3149],
        correct: 3249,
        explanation: "(25+7) | (7²) = 3249."
      }
    ]
  },
  "Below Base 10": {
    sutraName: "Nikhilam Navatashcaramam Dashatah (Base 10)",
    englishMeaning: "All from 9 and the last from 10 (Deficits below 10)",
    summary: "For numbers below base 10 (e.g. 8 x 7), write deficits -2 and -3. Left part = Cross-subtract (8-3=5), Right part = Product of deficits (-2 x -3 = 6) -> 56.",
    keySteps: [
      "Find deficits from 10: 8 -> -2, 7 -> -3.",
      "Cross subtract: (8 - 3) = 5.",
      "Multiply deficits: (-2) x (-3) = 6.",
      "Combine: 56."
    ],
    workedExample: {
      problem: "Calculate 8 x 7 using Nikhilam Base 10",
      steps: [
        { label: "Step 1: Deficits", detail: "8 (-2), 7 (-3)" },
        { label: "Step 2: Cross-subtract", detail: "8 - 3 = 5" },
        { label: "Step 3: Deficit product", detail: "-2 x -3 = 6" }
      ],
      finalAnswer: "56"
    },
    warmupQuestions: [
      {
        question: "What is 9 x 8 using Nikhilam Base 10?",
        options: [72, 74, 76, 70],
        correct: 72,
        explanation: "Deficits -1 & -2. (9-2) | (-1x-2) = 72."
      },
      {
        question: "What is 7 x 7?",
        options: [47, 49, 51, 45],
        correct: 49,
        explanation: "Deficits -3 & -3. (7-3) | (-3x-3) = 49."
      }
    ]
  },
  "Below Base 20-90": {
    sutraName: "Nikhilam Sub-Base Method (Working Base 10k)",
    englishMeaning: "Scale LHS by working base factor k",
    summary: "For numbers near working base 50 (e.g. 48 x 47), deficits from 50 are -2 & -3. LHS = 5 x (48-3) = 225, RHS = (-2 x -3) = 6 -> 2256.",
    keySteps: [
      "Identify working base WB = 10 x k (e.g., 50 = 10 x 5).",
      "Find deficits from WB.",
      "Cross-subtract and multiply LHS by factor k.",
      "Multiply deficits for RHS."
    ],
    workedExample: {
      problem: "Calculate 48 x 47 using Sub-Base 50",
      steps: [
        { label: "Step 1: Working Base", detail: "WB = 50 = 10 x 5. Deficits: 48 (-2), 47 (-3)" },
        { label: "Step 2: LHS with factor 5", detail: "5 x (48 - 3) = 5 x 45 = 225" },
        { label: "Step 3: RHS deficit product", detail: "-2 x -3 = 6" }
      ],
      finalAnswer: "2256"
    },
    warmupQuestions: [
      {
        question: "What is 18 x 17 using Base 20?",
        options: [296, 306, 316, 286],
        correct: 306,
        explanation: "2 x (18-3) = 30, (-2x-3) = 6 -> 306."
      },
      {
        question: "What is 29 x 28 using Base 30?",
        options: [802, 812, 822, 792],
        correct: 812,
        explanation: "3 x (29-2) = 81, (-1x-2) = 2 -> 812."
      }
    ]
  },
  "Below Base 100": {
    sutraName: "Nikhilam Base 100 Method",
    englishMeaning: "Cross subtract deficits from 100",
    summary: "For numbers near 100 (e.g. 96 x 93), deficits are -04 & -07. LHS = (96-7) = 89, RHS = (04 x 07) = 28 -> 8928.",
    keySteps: [
      "Find deficits from 100 (2 digits): 96 (-04), 93 (-07).",
      "Cross-subtract: 96 - 7 = 89.",
      "Multiply deficits: 4 x 7 = 28.",
      "Combine: 8928."
    ],
    workedExample: {
      problem: "Calculate 96 x 93",
      steps: [
        { label: "Step 1: Deficits from 100", detail: "-04 and -07" },
        { label: "Step 2: Cross-subtract", detail: "96 - 7 = 89" },
        { label: "Step 3: Product of deficits", detail: "4 x 7 = 28" }
      ],
      finalAnswer: "8928"
    },
    warmupQuestions: [
      {
        question: "What is 97 x 94?",
        options: [9108, 9118, 9128, 9138],
        correct: 9118,
        explanation: "(97-6) | (3x6) = 9118."
      },
      {
        question: "What is 98 x 95?",
        options: [9310, 9320, 9300, 9330],
        correct: 9310,
        explanation: "(98-5) | (2x5) = 9310."
      }
    ]
  },
  "Below Base 200-900": {
    sutraName: "Nikhilam Sub-Base Method (Working Base 100k)",
    englishMeaning: "Scale LHS by working base factor k",
    summary: "For numbers near 200 (e.g. 196 x 195), deficits from 200 are -04 & -05. LHS = 2 x (196-5) = 382, RHS = (04 x 05) = 20 -> 38220.",
    keySteps: [
      "Working base WB = 100 x k (e.g. 200 = 100 x 2).",
      "Find deficits from WB: 196 (-04), 195 (-05).",
      "Multiply LHS by factor k: 2 x (196-5) = 382.",
      "Multiply deficits: 4 x 5 = 20 -> 38220."
    ],
    workedExample: {
      problem: "Calculate 196 x 195",
      steps: [
        { label: "Step 1: Working base", detail: "200 = 100 x 2. Deficits: -04 & -05" },
        { label: "Step 2: LHS x 2", detail: "2 x (196 - 5) = 2 x 191 = 382" },
        { label: "Step 3: RHS product", detail: "4 x 5 = 20" }
      ],
      finalAnswer: "38220"
    },
    warmupQuestions: [
      {
        question: "What is 297 x 296 using Base 300?",
        options: [87912, 87922, 87902, 87932],
        correct: 87912,
        explanation: "3 x (297-4) = 879, (3x4) = 12 -> 87912."
      },
      {
        question: "What is 398 x 395 using Base 400?",
        options: [157210, 157220, 157200, 157230],
        correct: 157210,
        explanation: "4 x (398-5) = 1572, (2x5) = 10 -> 157210."
      }
    ]
  },
  "Above Base 10": {
    sutraName: "Nikhilam Surplus Method (Base 10)",
    englishMeaning: "Cross-add surpluses above base 10",
    summary: "For numbers above 10 (e.g. 13 x 14), surpluses are +3 and +4. LHS = (13+4) = 17, RHS = (3 x 4) = 12. Carry 1 -> 182.",
    keySteps: [
      "Find surpluses from 10: 13 (+3), 14 (+4).",
      "Cross-add: (13 + 4) = 17.",
      "Multiply surpluses: 3 x 4 = 12.",
      "Carry over tens digit: 17 + 1 | 2 = 182."
    ],
    workedExample: {
      problem: "Calculate 13 x 14",
      steps: [
        { label: "Step 1: Surpluses", detail: "+3 and +4" },
        { label: "Step 2: Cross-add", detail: "13 + 4 = 17" },
        { label: "Step 3: Surplus product & carry", detail: "3 x 4 = 12 -> (17+1) | 2 = 182" }
      ],
      finalAnswer: "182"
    },
    warmupQuestions: [
      {
        question: "What is 12 x 13?",
        options: [146, 156, 166, 136],
        correct: 156,
        explanation: "(12+3) | (2x3) = 156."
      },
      {
        question: "What is 14 x 15?",
        options: [200, 210, 220, 190],
        correct: 210,
        explanation: "(14+5) | (4x5) = 19 | 20 -> 210."
      }
    ]
  },
  "Above Base 100": {
    sutraName: "Nikhilam Surplus Method (Base 100)",
    englishMeaning: "Cross-add surpluses above base 100",
    summary: "For numbers above 100 (e.g. 108 x 107), surpluses are +08 and +07. LHS = (108+7) = 115, RHS = (08 x 07) = 56 -> 11556.",
    keySteps: [
      "Find surpluses from 100 (2 digits): 108 (+08), 107 (+07).",
      "Cross-add: 108 + 7 = 115.",
      "Multiply surpluses: 8 x 7 = 56.",
      "Combine: 11556."
    ],
    workedExample: {
      problem: "Calculate 108 x 107",
      steps: [
        { label: "Step 1: Surpluses", detail: "+08 and +07" },
        { label: "Step 2: Cross-add", detail: "108 + 7 = 115" },
        { label: "Step 3: Product of surpluses", detail: "8 x 7 = 56" }
      ],
      finalAnswer: "11556"
    },
    warmupQuestions: [
      {
        question: "What is 104 x 105?",
        options: [10910, 10920, 10930, 10900],
        correct: 10920,
        explanation: "(104+5) | (4x5) = 10920."
      },
      {
        question: "What is 103 x 106?",
        options: [10908, 10918, 10928, 10898],
        correct: 10918,
        explanation: "(103+6) | (3x6) = 10918."
      }
    ]
  },
  "Base method when one number is above & other is below": {
    sutraName: "Nikhilam Mixed Base Method (Vinculum Subtraction)",
    englishMeaning: "One number has surplus (+s), other has deficit (-d)",
    summary: "For 104 x 97 (Base 100), 104 has +4 surplus, 97 has -3 deficit. LHS = (104 - 3) = 101 hundred = 10100. RHS = (4 x -3) = -12. Result = 10100 - 12 = 10088.",
    keySteps: [
      "Find surplus (+4) and deficit (-3).",
      "Cross calculate LHS: 104 - 3 = 101.",
      "Scale LHS by base: 101 x 100 = 10100.",
      "Subtract positive product of surplus and deficit: 10100 - (4 x 3) = 10088."
    ],
    workedExample: {
      problem: "Calculate 104 x 97",
      steps: [
        { label: "Step 1: Deviation", detail: "104 (+4), 97 (-3)" },
        { label: "Step 2: Cross sum x Base", detail: "(104 - 3) x 100 = 10100" },
        { label: "Step 3: Subtract product", detail: "10100 - (4 x 3) = 10100 - 12 = 10088" }
      ],
      finalAnswer: "10088"
    },
    warmupQuestions: [
      {
        question: "What is 105 x 96?",
        options: [10070, 10080, 10090, 10060],
        correct: 10080,
        explanation: "(105-4)x100 - (5x4) = 10100 - 20 = 10080."
      },
      {
        question: "What is 12 x 9?",
        options: [106, 108, 110, 104],
        correct: 108,
        explanation: "(12-1)x10 - (2x1) = 110 - 2 = 108."
      }
    ]
  },
  "When Bases are different but both numbers are below": {
    sutraName: "Nikhilam Different Base Ratio Method (Both Below)",
    englishMeaning: "Adjust smaller/larger number by base ratio multiplier",
    summary: "When multiplying 98 (Base 100, deficit -2) and 980 (Base 1000, deficit -20), ratio of bases is 10. LHS = 980 - (2 x 10) = 960. RHS = (-2 x -20) = 40 (3 digits: 040) -> 96040.",
    keySteps: [
      "Find base ratio R = Base2 / Base1 = 1000 / 100 = 10.",
      "Scale smaller deficit by R: -2 x 10 = -20.",
      "LHS = 980 - 20 = 960.",
      "RHS = -2 x -20 = 40 (padded to 3 digits) -> 96040."
    ],
    workedExample: {
      problem: "Calculate 98 x 980",
      steps: [
        { label: "Step 1: Bases & deficits", detail: "98 (Base 100, d=-2), 980 (Base 1000, d=-20)" },
        { label: "Step 2: Cross subtract with ratio 10", detail: "980 - (2 x 10) = 960" },
        { label: "Step 3: Deficit product", detail: "-2 x -20 = 40 -> 96040" }
      ],
      finalAnswer: "96040"
    },
    warmupQuestions: [
      {
        question: "What is 97 x 970?",
        options: [94080, 94090, 94100, 94070],
        correct: 94090,
        explanation: "970 - 30 = 940, (-3 x -30) = 90 -> 94090."
      },
      {
        question: "What is 96 x 960?",
        options: [92150, 92160, 92170, 92140],
        correct: 92160,
        explanation: "960 - 40 = 920, (-4 x -40) = 160 -> 92160."
      }
    ]
  },
  "When Bases are different but both numbers are above": {
    sutraName: "Nikhilam Different Base Ratio Method (Both Above)",
    englishMeaning: "Adjust surplus by base ratio multiplier for different bases",
    summary: "When multiplying 102 (Base 100, surplus +2) and 1030 (Base 1000, surplus +30), ratio R = 10. LHS = 1030 + (2 x 10) = 1050. RHS = (2 x 30) = 60 (3 digits: 060) -> 105060.",
    keySteps: [
      "Find base ratio R = Base2 / Base1 = 1000 / 100 = 10.",
      "Scale smaller surplus by R: +2 x 10 = +20.",
      "LHS = 1030 + 20 = 1050.",
      "RHS = 2 x 30 = 60 -> 105060."
    ],
    workedExample: {
      problem: "Calculate 102 x 1030",
      steps: [
        { label: "Step 1: Surpluses & ratio", detail: "102 (+2), 1030 (+30), Ratio = 10" },
        { label: "Step 2: Cross add with ratio", detail: "1030 + (2 x 10) = 1050" },
        { label: "Step 3: Surplus product", detail: "2 x 30 = 60 -> 105060" }
      ],
      finalAnswer: "105060"
    },
    warmupQuestions: [
      {
        question: "What is 104 x 1020?",
        options: [106070, 106080, 106090, 106060],
        correct: 106080,
        explanation: "1020 + 40 = 1060, (4 x 20) = 80 -> 106080."
      },
      {
        question: "What is 105 x 1010?",
        options: [106040, 106050, 106060, 106030],
        correct: 106050,
        explanation: "1010 + 50 = 1060, (5 x 10) = 50 -> 106050."
      }
    ]
  },
  "Multiplication by 111": {
    sutraName: "Vedic Triple Sandwich Sum Rule",
    englishMeaning: "Left digit | Pair sum | Triple sum | Pair sum | Right digit",
    summary: "Multiplying by 111 extends the 11 sandwich rule by adding digits in groups of up to 3 from right to left.",
    keySteps: [
      "Write rightmost digit.",
      "Add rightmost 2 digits.",
      "Add all 3 digits.",
      "Add leftmost 2 digits.",
      "Write leftmost digit (carrying any overflows)."
    ],
    workedExample: {
      problem: "Calculate 324 x 111",
      steps: [
        { label: "Step 1: Partition sums", detail: "3 | (3+2=5) | (3+2+4=9) | (2+4=6) | 4" },
        { label: "Step 2: Combine digits", detail: "3 | 5 | 9 | 6 | 4 = 35964" }
      ],
      finalAnswer: "35964"
    },
    warmupQuestions: [
      {
        question: "What is 123 x 111?",
        options: [13553, 13653, 13753, 13453],
        correct: 13653,
        explanation: "1 | (1+2=3) | (1+2+3=6) | (2+3=5) | 3 = 13653."
      },
      {
        question: "What is 214 x 111?",
        options: [23654, 23754, 23854, 23554],
        correct: 23754,
        explanation: "2 | (2+1=3) | (2+1+4=7) | (1+4=5) | 4 = 23754."
      }
    ]
  },
  "If the sum of the Unit Place digit is 10": {
    sutraName: "Antyayordashake'pi Sutra",
    englishMeaning: "When unit digits sum to 10 and left digits are identical",
    summary: "For numbers like 43 x 47 where unit digits sum to 10 (3+7=10) and tens digits are equal (4=4), multiply left digit by its successor: A x (A+1), and right digits together: U1 x U2.",
    keySteps: [
      "Left part = Tens digit x (Tens digit + 1): 4 x 5 = 20.",
      "Right part = Unit digit 1 x Unit digit 2: 3 x 7 = 21.",
      "Combine left and right parts: 2021."
    ],
    workedExample: {
      problem: "Calculate 62 x 68",
      steps: [
        { label: "Step 1: Tens part", detail: "6 x (6 + 1) = 6 x 7 = 42" },
        { label: "Step 2: Units part", detail: "2 x 8 = 16" },
        { label: "Step 3: Combine", detail: "42 | 16 = 4216" }
      ],
      finalAnswer: "4216"
    },
    warmupQuestions: [
      {
        question: "What is 43 x 47?",
        options: [2011, 2021, 2031, 2001],
        correct: 2021,
        explanation: "(4x5) | (3x7) = 2021."
      },
      {
        question: "What is 81 x 89?",
        options: [7209, 7219, 7290, 7109],
        correct: 7209,
        explanation: "(8x9) | (1x9) = 7209."
      }
    ]
  },
  "If the sum of the Tens Place digit is 10": {
    sutraName: "Vedic Reverse Special Sutra",
    englishMeaning: "When tens digits sum to 10 and unit digits are identical",
    summary: "For numbers like 46 x 66 where tens digits sum to 10 (4+6=10) and unit digits are identical (6=6), compute Left = (T1 x T2 + U) and Right = U x U.",
    keySteps: [
      "Left part = (Tens 1 x Tens 2) + Unit digit: (4 x 6) + 6 = 30.",
      "Right part = Unit digit x Unit digit: 6 x 6 = 36.",
      "Combine parts: 3036."
    ],
    workedExample: {
      problem: "Calculate 37 x 77",
      steps: [
        { label: "Step 1: Left part", detail: "(3 x 7) + 7 = 21 + 7 = 28" },
        { label: "Step 2: Right part", detail: "7 x 7 = 49" },
        { label: "Step 3: Combine", detail: "28 | 49 = 2849" }
      ],
      finalAnswer: "2849"
    },
    warmupQuestions: [
      {
        question: "What is 46 x 66?",
        options: [3026, 3036, 3046, 3016],
        correct: 3036,
        explanation: "(4x6+6) | (6x6) = 3036."
      },
      {
        question: "What is 28 x 88?",
        options: [2454, 2464, 2474, 2444],
        correct: 2464,
        explanation: "(2x8+8) | (8x8) = 2464."
      }
    ]
  },
  "Addition Base Method": {
    sutraName: "Vedic Base Rounding Addition",
    englishMeaning: "Round terms up to nearest round base (10, 100) and adjust",
    summary: "When adding numbers near round bases (e.g. 78 + 96), round 78 -> 80 and 96 -> 100, add bases (180), then subtract total excess (2+4=6) -> 174.",
    keySteps: [
      "Round terms to nearest base: 78 -> 80 (excess 2), 96 -> 100 (excess 4).",
      "Add rounded base numbers: 80 + 100 = 180.",
      "Subtract total excess: 180 - (2 + 4) = 174."
    ],
    workedExample: {
      problem: "Calculate 197 + 84 mentally",
      steps: [
        { label: "Step 1: Round term", detail: "197 = 200 - 3" },
        { label: "Step 2: Add base", detail: "200 + 84 = 284" },
        { label: "Step 3: Adjust excess", detail: "284 - 3 = 281" }
      ],
      finalAnswer: "281"
    },
    warmupQuestions: [
      {
        question: "What is 78 + 96 using Base Addition?",
        options: [164, 174, 184, 172],
        correct: 174,
        explanation: "80 + 100 - 6 = 174."
      },
      {
        question: "What is 298 + 145?",
        options: [441, 443, 445, 442],
        correct: 443,
        explanation: "300 + 145 - 2 = 443."
      }
    ]
  },
  "Subtraction Base Method": {
    sutraName: "Vedic Base Rounding Subtraction",
    englishMeaning: "Round subtrahend up to round base and add back complement",
    summary: "To subtract a number near 100 (e.g. 145 - 88), subtract 100 (145 - 100 = 45) and add back complement (12) -> 57.",
    keySteps: [
      "Round subtrahend to base: 88 -> 100 (complement 12).",
      "Subtract base: 145 - 100 = 45.",
      "Add complement back: 45 + 12 = 57."
    ],
    workedExample: {
      problem: "Calculate 234 - 97",
      steps: [
        { label: "Step 1: Round 97 -> 100", detail: "Complement of 97 is 3" },
        { label: "Step 2: Subtract base", detail: "234 - 100 = 134" },
        { label: "Step 3: Add complement", detail: "134 + 3 = 137" }
      ],
      finalAnswer: "137"
    },
    warmupQuestions: [
      {
        question: "What is 145 - 88?",
        options: [55, 57, 59, 53],
        correct: 57,
        explanation: "145 - 100 + 12 = 57."
      },
      {
        question: "What is 362 - 198?",
        options: [162, 164, 166, 160],
        correct: 164,
        explanation: "362 - 200 + 2 = 164."
      }
    ]
  },
  "Digital Root": {
    sutraName: "Vedic Beejank (Casting out 9s)",
    englishMeaning: "Sum of digits reduced to a single digit modulo 9",
    summary: "Beejank is the single digit obtained by repeatedly summing the digits of a number. Treat 9 as 0 to cast out nines quickly.",
    keySteps: [
      "Sum digits of number.",
      "If sum >= 10, sum digits again.",
      "Ignore any 9s or digit combinations summing to 9."
    ],
    workedExample: {
      problem: "Find Digital Root of 487",
      steps: [
        { label: "Step 1: Sum digits", detail: "4 + 8 + 7 = 19" },
        { label: "Step 2: Reduce sum", detail: "1 + 9 = 10" },
        { label: "Step 3: Final single digit", detail: "1 + 0 = 1" }
      ],
      finalAnswer: "1"
    },
    warmupQuestions: [
      {
        question: "What is Digital Root of 356?",
        options: [4, 5, 6, 7],
        correct: 5,
        explanation: "3+5+6 = 14 -> 1+4 = 5."
      },
      {
        question: "What is Digital Root of 789?",
        options: [5, 6, 7, 8],
        correct: 6,
        explanation: "7+8+9 = 24 -> 2+4 = 6."
      }
    ]
  },
  "Multiplication by 125": {
    sutraName: "Octal Base Scale Rule",
    englishMeaning: "Divide by 8 and scale by 1000",
    summary: "Since 125 = 1000 / 8, multiply N by 125 by taking (N ÷ 8) and appending three zeros.",
    keySteps: [
      "Divide N by 8: (N ÷ 8).",
      "Multiply by 1000 (append 000)."
    ],
    workedExample: {
      problem: "Calculate 64 x 125",
      steps: [
        { label: "Step 1: Divide by 8", detail: "64 ÷ 8 = 8" },
        { label: "Step 2: Scale by 1000", detail: "8 -> 8000" }
      ],
      finalAnswer: "8000"
    },
    warmupQuestions: [
      {
        question: "What is 48 x 125?",
        options: [5000, 6000, 7000, 4000],
        correct: 6000,
        explanation: "48 ÷ 8 = 6 -> 6000."
      },
      {
        question: "What is 128 x 125?",
        options: [15000, 16000, 17000, 14000],
        correct: 16000,
        explanation: "128 ÷ 8 = 16 -> 16000."
      }
    ]
  },
  "Multiplication 2x2 ( General Method )": {
    sutraName: "Urdhva Tiryagbhyam",
    englishMeaning: "Vertically and Crosswise",
    summary: "The universal Vedic multiplication algorithm for 2-digit numbers (AB x CD): 1) Right vertical: B x D. 2) Crosswise sum: (A x D + B x C). 3) Left vertical: A x C.",
    keySteps: [
      "Step 1: Vertical right: B x D.",
      "Step 2: Crosswise: (A x D) + (B x C).",
      "Step 3: Vertical left: A x C.",
      "Combine parts with carry over."
    ],
    workedExample: {
      problem: "Calculate 23 x 45 using Urdhva Tiryagbhyam",
      steps: [
        { label: "Step 1: Right vertical", detail: "3 x 5 = 15 (write 5, carry 1)" },
        { label: "Step 2: Crosswise sum", detail: "(2 x 5) + (3 x 4) = 10 + 12 = 22 + 1 = 23 (write 3, carry 2)" },
        { label: "Step 3: Left vertical", detail: "(2 x 4) + 2 = 8 + 2 = 10" }
      ],
      finalAnswer: "1035"
    },
    warmupQuestions: [
      {
        question: "What is 34 x 26 using Crosswise multiplication?",
        options: [874, 884, 894, 864],
        correct: 884,
        explanation: "(3x2) | (3x6+4x2) | (4x6) -> 6 | 26 | 24 = 884."
      },
      {
        question: "What is 42 x 31?",
        options: [1292, 1302, 1312, 1282],
        correct: 1302,
        explanation: "(4x3) | (4x1+2x3) | (2x1) -> 12 | 10 | 2 = 1302."
      }
    ]
  },
  "Division by 125": {
    sutraName: "Octal Double Scale Rule",
    englishMeaning: "Multiply by 8 and divide by 1000",
    summary: "Since dividing by 125 is equivalent to dividing by 1000/8, multiply dividend by 8 and shift decimal 3 places left.",
    keySteps: [
      "Multiply dividend N by 8: (N x 8).",
      "Shift decimal point 3 places left (divide by 1000)."
    ],
    workedExample: {
      problem: "Divide 375 ÷ 125",
      steps: [
        { label: "Step 1: Multiply by 8", detail: "375 x 8 = 3000" },
        { label: "Step 2: Divide by 1000", detail: "3000 ÷ 1000 = 3" }
      ],
      finalAnswer: "3"
    },
    warmupQuestions: [
      {
        question: "What is 625 ÷ 125?",
        options: [4, 5, 6, 7],
        correct: 5,
        explanation: "(625 x 8) ÷ 1000 = 5000 ÷ 1000 = 5."
      },
      {
        question: "What is 1125 ÷ 125?",
        options: [8, 9, 10, 11],
        correct: 9,
        explanation: "(1125 x 8) ÷ 1000 = 9000 ÷ 1000 = 9."
      }
    ]
  },
  "Multiplication 1001 ( For 101 to 998 )": {
    sutraName: "Double Pattern Repeat Rule",
    englishMeaning: "Repeat 3-digit number twice (ABCABC)",
    summary: "Multiplying any 3-digit number ABC by 1001 simply duplicates the 3 digits: ABC x 1001 = ABCABC.",
    keySteps: [
      "Identify 3-digit number ABC.",
      "Write ABC twice: ABCABC."
    ],
    workedExample: {
      problem: "Calculate 475 x 1001",
      steps: [
        { label: "Step 1: Identify ABC", detail: "ABC = 475" },
        { label: "Step 2: Repeat twice", detail: "475 -> 475475" }
      ],
      finalAnswer: "475475"
    },
    warmupQuestions: [
      {
        question: "What is 234 x 1001?",
        options: [2341001, 234234, 234000, 234432],
        correct: 234234,
        explanation: "ABC x 1001 = ABCABC = 234234."
      },
      {
        question: "What is 689 x 1001?",
        options: [689689, 689001, 689986, 689100],
        correct: 689689,
        explanation: "689 x 1001 = 689689."
      }
    ]
  },
  "Grid 3x3": {
    sutraName: "Spatial 3x3 Matrix Arithmetic & Magic Constant",
    englishMeaning: "Sum of rows, columns, and diagonals in a 3x3 matrix",
    summary: "A 3x3 magic square with 9 distinct numbers has equal row sums, column sums, and diagonal sums equal to Magic Constant M = 3 x Center Element.",
    keySteps: [
      "Identify center element C.",
      "Magic sum M = 3 x C.",
      "All 3 rows, 3 columns, and 2 diagonals sum to M."
    ],
    workedExample: {
      problem: "Find Magic Constant M for 3x3 grid with center 5 (numbers 1-9)",
      steps: [
        { label: "Step 1: Center element C", detail: "C = 5" },
        { label: "Step 2: Multiply by 3", detail: "M = 3 x 5 = 15" }
      ],
      finalAnswer: "15"
    },
    warmupQuestions: [
      {
        question: "In a 3x3 Magic Square with numbers 1 to 9, what is the sum of any row?",
        options: [12, 15, 18, 20],
        correct: 15,
        explanation: "Magic constant = 3 x 5 = 15."
      },
      {
        question: "If the center of a 3x3 magic square is 10, what is the row sum?",
        options: [25, 30, 35, 40],
        correct: 30,
        explanation: "3 x 10 = 30."
      }
    ],
    visualType: "grid3x3"
  },
  "Multiplication by 9": {
    sutraName: "Ekanyunena Purvena / Base 10 Shortcut",
    englishMeaning: "Multiply by 10 then subtract the original number",
    summary: "Multiplying any number by 9 is equivalent to multiplying by 10 and subtracting the original number (N x 10 - N).",
    keySteps: [
      "Append a 0 to the number: N -> N0.",
      "Subtract the original number N from N0.",
      "Example: 74 x 9 = 740 - 74 = 666."
    ],
    workedExample: {
      problem: "Calculate 85 x 9 mentally",
      steps: [
        { label: "Step 1: Multiply by 10", detail: "85 x 10 = 850" },
        { label: "Step 2: Subtract original", detail: "850 - 85 = 765" }
      ],
      finalAnswer: "765"
    },
    warmupQuestions: [
      {
        question: "What is 48 x 9?",
        options: [422, 432, 442, 412],
        correct: 432,
        explanation: "480 - 48 = 432."
      },
      {
        question: "What is 126 x 9?",
        options: [1124, 1134, 1144, 1114],
        correct: 1134,
        explanation: "1260 - 126 = 1134."
      }
    ]
  },
  "Multiplication by number ending with 9": {
    sutraName: "Base 10x / 100x Scaling Shortcut",
    englishMeaning: "Multiply by the next round ten/hundred then subtract original number",
    summary: "For numbers ending in 9 (e.g. 19, 29, 49, 199, 999), multiply by the next round number (20, 30, 50, 200, 1000) and subtract the original number.",
    keySteps: [
      "Identify the next round base: (99 -> 100, 29 -> 30, 199 -> 200).",
      "Multiply by round base: N x Base.",
      "Subtract N from the product."
    ],
    workedExample: {
      problem: "Calculate 34 x 29",
      steps: [
        { label: "Step 1: Round base", detail: "29 is 30 - 1, so multiply 34 x 30" },
        { label: "Step 2: Calculate product", detail: "34 x 30 = 1020" },
        { label: "Step 3: Subtract original", detail: "1020 - 34 = 986" }
      ],
      finalAnswer: "986"
    },
    warmupQuestions: [
      {
        question: "What is 25 x 19?",
        options: [465, 475, 485, 455],
        correct: 475,
        explanation: "(25 x 20) - 25 = 500 - 25 = 475."
      },
      {
        question: "What is 25 x 199?",
        options: [4965, 4975, 4985, 4955],
        correct: 4975,
        explanation: "(25 x 200) - 25 = 5000 - 25 = 4975."
      }
    ]
  },
  "Multiplication by 5": {
    sutraName: "Half and Scale Rule",
    englishMeaning: "Divide by 2 and multiply by 10",
    summary: "Since 5 = 10 / 2, multiply any number by 5 by taking half of the number and multiplying by 10.",
    keySteps: [
      "Divide number N by 2: (N ÷ 2).",
      "If N is even, append 0.",
      "If N is odd, append 5."
    ],
    workedExample: {
      problem: "Calculate 248 x 5",
      steps: [
        { label: "Step 1: Divide by 2", detail: "248 ÷ 2 = 124" },
        { label: "Step 2: Append 0", detail: "124 -> 1240" }
      ],
      finalAnswer: "1240"
    },
    warmupQuestions: [
      {
        question: "What is 86 x 5?",
        options: [420, 430, 440, 410],
        correct: 430,
        explanation: "86 ÷ 2 = 43 -> 430."
      },
      {
        question: "What is 37 x 5?",
        options: [175, 185, 195, 165],
        correct: 185,
        explanation: "37 ÷ 2 = 18.5 -> 185."
      }
    ]
  },
  "Multiplication by 6 ( Even Number )": {
    sutraName: "Vedic Even Digit 6 Shortcut",
    englishMeaning: "Add (N x 5) + N or use even digit rule",
    summary: "To multiply an even number N by 6, compute (N x 5) + N.",
    keySteps: [
      "Calculate N x 5 using the half rule.",
      "Add N to the result: (N x 5) + N."
    ],
    workedExample: {
      problem: "Calculate 48 x 6",
      steps: [
        { label: "Step 1: 48 x 5", detail: "48 ÷ 2 = 24 -> 240" },
        { label: "Step 2: Add 48", detail: "240 + 48 = 288" }
      ],
      finalAnswer: "288"
    },
    warmupQuestions: [
      {
        question: "What is 84 x 6?",
        options: [494, 504, 514, 484],
        correct: 504,
        explanation: "(84 x 5) + 84 = 420 + 84 = 504."
      },
      {
        question: "What is 62 x 6?",
        options: [362, 372, 382, 352],
        correct: 372,
        explanation: "(62 x 5) + 62 = 310 + 62 = 372."
      }
    ]
  },
  "Multiplication by 15": {
    sutraName: "N + Half N Rule",
    englishMeaning: "Add half of number to itself, then scale by 10",
    summary: "Since 15 = 10 x 1.5, multiply N by 15 by calculating (N + N/2) x 10.",
    keySteps: [
      "Find half of the number: N / 2.",
      "Add half to the original number: N + N/2.",
      "Multiply by 10."
    ],
    workedExample: {
      problem: "Calculate 42 x 15",
      steps: [
        { label: "Step 1: Half of 42", detail: "42 ÷ 2 = 21" },
        { label: "Step 2: Add to original", detail: "42 + 21 = 63" },
        { label: "Step 3: Scale by 10", detail: "63 x 10 = 630" }
      ],
      finalAnswer: "630"
    },
    warmupQuestions: [
      {
        question: "What is 64 x 15?",
        options: [950, 960, 970, 940],
        correct: 960,
        explanation: "(64 + 32) x 10 = 960."
      },
      {
        question: "What is 124 x 15?",
        options: [1850, 1860, 1870, 1840],
        correct: 1860,
        explanation: "(124 + 62) x 10 = 1860."
      }
    ]
  },
  "Multiplication by 25": {
    sutraName: "Quarter and Scale Rule (Base 100)",
    englishMeaning: "Divide by 4 and scale by 100",
    summary: "Since 25 = 100 / 4, multiply any number N by 25 by dividing N by 4 and appending two zeros.",
    keySteps: [
      "Divide N by 4: (N ÷ 4).",
      "Multiply result by 100 (append 00)."
    ],
    workedExample: {
      problem: "Calculate 64 x 25",
      steps: [
        { label: "Step 1: Divide by 4", detail: "64 ÷ 4 = 16" },
        { label: "Step 2: Scale by 100", detail: "16 -> 1600" }
      ],
      finalAnswer: "1600"
    },
    warmupQuestions: [
      {
        question: "What is 48 x 25?",
        options: [1100, 1200, 1300, 1400],
        correct: 1200,
        explanation: "48 ÷ 4 = 12 -> 1200."
      },
      {
        question: "What is 128 x 25?",
        options: [3100, 3200, 3300, 3000],
        correct: 3200,
        explanation: "128 ÷ 4 = 32 -> 3200."
      }
    ]
  },
  "Multiplication by 50": {
    sutraName: "Half and Scale Rule (Base 100)",
    englishMeaning: "Divide by 2 and scale by 100",
    summary: "Since 50 = 100 / 2, multiply any number N by 50 by dividing N by 2 and appending two zeros.",
    keySteps: [
      "Divide N by 2: (N ÷ 2).",
      "Multiply result by 100 (append 00)."
    ],
    workedExample: {
      problem: "Calculate 36 x 50",
      steps: [
        { label: "Step 1: Divide by 2", detail: "36 ÷ 2 = 18" },
        { label: "Step 2: Scale by 100", detail: "18 -> 1800" }
      ],
      finalAnswer: "1800"
    },
    warmupQuestions: [
      {
        question: "What is 64 x 50?",
        options: [3100, 3200, 3300, 3000],
        correct: 3200,
        explanation: "64 ÷ 2 = 32 -> 3200."
      },
      {
        question: "What is 124 x 50?",
        options: [6100, 6200, 6300, 6000],
        correct: 6200,
        explanation: "124 ÷ 2 = 62 -> 6200."
      }
    ]
  },
  "Division by 5": {
    sutraName: "Double & Decimal Shift Rule",
    englishMeaning: "Double the number and divide by 10",
    summary: "Since dividing by 5 is equivalent to dividing by 10/2, double the dividend and shift decimal 1 place left.",
    keySteps: [
      "Multiply dividend N by 2: (N x 2).",
      "Shift decimal 1 place left (divide by 10)."
    ],
    workedExample: {
      problem: "Divide 135 ÷ 5",
      steps: [
        { label: "Step 1: Double the number", detail: "135 x 2 = 270" },
        { label: "Step 2: Divide by 10", detail: "270 ÷ 10 = 27" }
      ],
      finalAnswer: "27"
    },
    warmupQuestions: [
      {
        question: "What is 245 ÷ 5?",
        options: [48, 49, 50, 47],
        correct: 49,
        explanation: "(245 x 2) ÷ 10 = 490 ÷ 10 = 49."
      },
      {
        question: "What is 465 ÷ 5?",
        options: [92, 93, 94, 91],
        correct: 93,
        explanation: "(465 x 2) ÷ 10 = 930 ÷ 10 = 93."
      }
    ]
  },
  "Division by 9": {
    sutraName: "Nikhilam / Paravartya Division by 9",
    englishMeaning: "Quotient is running sum of digits; Remainder is sum of all digits",
    summary: "In Vedic Math, dividing a 3-digit number ABC by 9 yields Quotient = A | (A+B) and Remainder = A+B+C.",
    keySteps: [
      "Left digit A becomes the first digit of Quotient.",
      "Middle digit of Quotient = (A + B).",
      "Remainder R = (A + B + C)."
    ],
    workedExample: {
      problem: "Divide 123 ÷ 9",
      steps: [
        { label: "Step 1: Quotient calculation", detail: "1 | (1 + 2) = 13" },
        { label: "Step 2: Remainder calculation", detail: "1 + 2 + 3 = 6" }
      ],
      finalAnswer: "Quotient = 13, Remainder = 6"
    },
    warmupQuestions: [
      {
        question: "Find Quotient for 214 ÷ 9:",
        options: [22, 23, 24, 25],
        correct: 23,
        explanation: "Quotient = 2 | (2+1) = 23, R = 7."
      },
      {
        question: "Find Quotient for 312 ÷ 9:",
        options: [33, 34, 35, 36],
        correct: 34,
        explanation: "Quotient = 3 | (3+1) = 34, R = 6."
      }
    ]
  },
  "Division by 25": {
    sutraName: "Quadruple & Scale Rule (Base 100)",
    englishMeaning: "Multiply by 4 and divide by 100",
    summary: "Since dividing by 25 is equivalent to dividing by 100/4, multiply the dividend by 4 and shift the decimal 2 places left.",
    keySteps: [
      "Multiply dividend N by 4: (N x 4).",
      "Shift decimal point 2 places left (divide by 100)."
    ],
    workedExample: {
      problem: "Divide 325 ÷ 25",
      steps: [
        { label: "Step 1: Multiply by 4", detail: "325 x 4 = 1300" },
        { label: "Step 2: Divide by 100", detail: "1300 ÷ 100 = 13" }
      ],
      finalAnswer: "13"
    },
    warmupQuestions: [
      {
        question: "What is 450 ÷ 25?",
        options: [16, 18, 20, 22],
        correct: 18,
        explanation: "(450 x 4) ÷ 100 = 1800 ÷ 100 = 18."
      },
      {
        question: "What is 850 ÷ 25?",
        options: [32, 34, 36, 38],
        correct: 34,
        explanation: "(850 x 4) ÷ 100 = 3400 ÷ 100 = 34."
      }
    ]
  },
  "Division by 50": {
    sutraName: "Double & Scale Rule (Base 100)",
    englishMeaning: "Multiply by 2 and divide by 100",
    summary: "Since dividing by 50 is equivalent to dividing by 100/2, multiply the dividend by 2 and shift decimal 2 places left.",
    keySteps: [
      "Multiply dividend N by 2: (N x 2).",
      "Shift decimal point 2 places left (divide by 100)."
    ],
    workedExample: {
      problem: "Divide 450 ÷ 50",
      steps: [
        { label: "Step 1: Multiply by 2", detail: "450 x 2 = 900" },
        { label: "Step 2: Divide by 100", detail: "900 ÷ 100 = 9" }
      ],
      finalAnswer: "9"
    },
    warmupQuestions: [
      {
        question: "What is 750 ÷ 50?",
        options: [13, 14, 15, 16],
        correct: 15,
        explanation: "(750 x 2) ÷ 100 = 1500 ÷ 100 = 15."
      },
      {
        question: "What is 1250 ÷ 50?",
        options: [23, 24, 25, 26],
        correct: 25,
        explanation: "(1250 x 2) ÷ 100 = 2500 ÷ 100 = 25."
      }
    ]
  },
  "Subtraction from 100": {
    sutraName: "Nikhilam Navatashcaramam Dashatah",
    englishMeaning: "All from 9 and the last from 10",
    summary: "To subtract a 2-digit number AB from 100, subtract the tens digit A from 9, and the ones digit B from 10.",
    keySteps: [
      "Left digit = (9 - A).",
      "Right digit = (10 - B).",
      "Example: 100 - 37 -> (9-3) | (10-7) = 63."
    ],
    workedExample: {
      problem: "Calculate 100 - 48",
      steps: [
        { label: "Step 1: Tens digit from 9", detail: "9 - 4 = 5" },
        { label: "Step 2: Units digit from 10", detail: "10 - 8 = 2" }
      ],
      finalAnswer: "52"
    },
    warmupQuestions: [
      {
        question: "What is 100 - 64?",
        options: [34, 36, 38, 32],
        correct: 36,
        explanation: "(9-6) | (10-4) = 36."
      },
      {
        question: "What is 100 - 82?",
        options: [16, 18, 20, 14],
        correct: 18,
        explanation: "(9-8) | (10-2) = 18."
      }
    ]
  },
  "Subtraction from 1000": {
    sutraName: "Nikhilam Navatashcaramam Dashatah (Base 1000)",
    englishMeaning: "All from 9 and the last from 10",
    summary: "To subtract a 3-digit number ABC from 1000, subtract A from 9, B from 9, and C from 10.",
    keySteps: [
      "Hundreds digit = (9 - A).",
      "Tens digit = (9 - B).",
      "Units digit = (10 - C)."
    ],
    workedExample: {
      problem: "Calculate 1000 - 468",
      steps: [
        { label: "Step 1: Hundreds from 9", detail: "9 - 4 = 5" },
        { label: "Step 2: Tens from 9", detail: "9 - 6 = 3" },
        { label: "Step 3: Units from 10", detail: "10 - 8 = 2" }
      ],
      finalAnswer: "532"
    },
    warmupQuestions: [
      {
        question: "What is 1000 - 275?",
        options: [715, 725, 735, 745],
        correct: 725,
        explanation: "(9-2) | (9-7) | (10-5) = 725."
      },
      {
        question: "What is 1000 - 684?",
        options: [306, 316, 326, 336],
        correct: 316,
        explanation: "(9-6) | (9-8) | (10-4) = 316."
      }
    ]
  },
  "Addition of Time": {
    sutraName: "Base 60 Carry Over Rule",
    englishMeaning: "Add hours & minutes separately; carry over 60 minutes as 1 hour",
    summary: "When adding time expressions (Hours & Minutes), add hours together and minutes together. If minutes >= 60, subtract 60 from minutes and add 1 to hours.",
    keySteps: [
      "Sum Hours: H1 + H2.",
      "Sum Minutes: M1 + M2.",
      "If M1 + M2 >= 60, subtract 60 and add 1 to Hours."
    ],
    workedExample: {
      problem: "Calculate 3h 45m + 2h 35m",
      steps: [
        { label: "Step 1: Sum Minutes", detail: "45m + 35m = 80m" },
        { label: "Step 2: Convert Minutes", detail: "80m = 1h 20m" },
        { label: "Step 3: Sum Hours", detail: "3h + 2h + 1h = 6h 20m" }
      ],
      finalAnswer: "6h 20m"
    },
    warmupQuestions: [
      {
        question: "What is 4h 50m + 1h 25m?",
        options: ["6h 15m", "6h 25m", "5h 75m", "6h 05m"],
        correct: "6h 15m",
        explanation: "50+25=75m -> 1h 15m. Total = 6h 15m."
      },
      {
        question: "What is 2h 40m + 3h 30m?",
        options: ["5h 70m", "6h 10m", "6h 20m", "5h 10m"],
        correct: "6h 10m",
        explanation: "40+30=70m -> 1h 10m. Total = 6h 10m."
      }
    ]
  },
  "Subtraction of Time": {
    sutraName: "Base 60 Borrowing Rule",
    englishMeaning: "Borrow 1 hour as 60 minutes when subtracting minutes",
    summary: "When subtracting time expressions, if minutes in the top term are smaller than bottom term, borrow 1 hour from hours and add 60 to minutes.",
    keySteps: [
      "Check if M1 < M2.",
      "If M1 < M2, reduce H1 by 1 and add 60 to M1: (M1 + 60 - M2).",
      "Subtract hours: (H1 - 1 - H2)."
    ],
    workedExample: {
      problem: "Calculate 5h 15m - 2h 40m",
      steps: [
        { label: "Step 1: Borrow 60m", detail: "15m < 40m, so 5h 15m -> 4h 75m" },
        { label: "Step 2: Subtract Minutes", detail: "75m - 40m = 35m" },
        { label: "Step 3: Subtract Hours", detail: "4h - 2h = 2h 35m" }
      ],
      finalAnswer: "2h 35m"
    },
    warmupQuestions: [
      {
        question: "What is 6h 10m - 3h 45m?",
        options: ["2h 25m", "2h 35m", "3h 25m", "2h 15m"],
        correct: "2h 25m",
        explanation: "5h 70m - 3h 45m = 2h 25m."
      },
      {
        question: "What is 4h 20m - 1h 50m?",
        options: ["2h 30m", "2h 40m", "3h 30m", "2h 20m"],
        correct: "2h 30m",
        explanation: "3h 80m - 1h 50m = 2h 30m."
      }
    ]
  },
  "Count the Number of Rectangle": {
    sutraName: "Spatial Grid Product Formula",
    englishMeaning: "Total Rectangles = [r(r+1)/2] x [c(c+1)/2]",
    summary: "For a grid of r rows and c columns, the total number of rectangles is the product of the sums of row numbers and column numbers.",
    keySteps: [
      "Sum row indices: 1 + 2 + ... + r = r(r+1)/2.",
      "Sum column indices: 1 + 2 + ... + c = c(c+1)/2.",
      "Multiply both sums together: Row Sum x Col Sum."
    ],
    workedExample: {
      problem: "Count total rectangles in a 3 x 3 Grid",
      steps: [
        { label: "Step 1: Row Sum (3 rows)", detail: "1 + 2 + 3 = 6" },
        { label: "Step 2: Column Sum (3 cols)", detail: "1 + 2 + 3 = 6" },
        { label: "Step 3: Multiply", detail: "6 x 6 = 36 Rectangles" }
      ],
      finalAnswer: "36 Rectangles"
    },
    warmupQuestions: [
      {
        question: "How many rectangles are in a 2 x 3 Grid?",
        options: [12, 15, 18, 20],
        correct: 18,
        explanation: "(1+2) x (1+2+3) = 3 x 6 = 18 rectangles."
      },
      {
        question: "How many rectangles are in a 3 x 4 Grid?",
        options: [50, 60, 70, 48],
        correct: 60,
        explanation: "(1+2+3) x (1+2+3+4) = 6 x 10 = 60 rectangles."
      }
    ],
    visualType: "rectangle"
  },
  "Count the Number of Squares": {
    sutraName: "Spatial Square Grid Sum Formula",
    englishMeaning: "Total Squares = sum of r x c down to 1 x 1",
    summary: "For a grid of r rows and c columns, total squares = (r x c) + (r-1)(c-1) + (r-2)(c-2) + ... down to 1.",
    keySteps: [
      "Multiply dimensions: r x c.",
      "Decrement both dimensions by 1 and multiply: (r-1) x (c-1).",
      "Sum all products until one dimension reaches 1."
    ],
    workedExample: {
      problem: "Count total squares in a 3 x 3 Grid",
      steps: [
        { label: "Step 1: 3x3 Squares", detail: "3 x 3 = 9" },
        { label: "Step 2: 2x2 Squares", detail: "2 x 2 = 4" },
        { label: "Step 3: 1x1 Squares", detail: "1 x 1 = 1" },
        { label: "Step 4: Sum", detail: "9 + 4 + 1 = 14 Squares" }
      ],
      finalAnswer: "14 Squares"
    },
    warmupQuestions: [
      {
        question: "How many squares are in a 4 x 4 Grid?",
        options: [25, 30, 35, 40],
        correct: 30,
        explanation: "16 + 9 + 4 + 1 = 30 squares."
      },
      {
        question: "How many squares are in a 2 x 3 Grid?",
        options: [6, 8, 10, 12],
        correct: 8,
        explanation: "(2x3) + (1x2) = 6 + 2 = 8 squares."
      }
    ],
    visualType: "square"
  },
  "Table Formation": {
    sutraName: "Vedic Digit Partitioning & Balancing Rule",
    englishMeaning: "Construct any 2-digit multiplication table instantly",
    summary: "Vedic Table Formation constructs multiplication tables for any 2-digit number (e.g., 74) without memorization by writing single-digit multiplication tables side-by-side and applying the Balancing Rule.",
    keySteps: [
      "Partition the 2-digit number AB into Tens (A) and Ones (B).",
      "Multiply A and B by the desired multiplier k: (A x k) | (B x k).",
      "Apply the Balancing Rule: keep unit digit of (B x k) and carry over its tens digit to (A x k)."
    ],
    workedExample: {
      problem: "Construct 74 x 6 using Vedic Table Formation",
      steps: [
        { label: "Step 1: Partition Digits", detail: "7 | 4" },
        { label: "Step 2: Multiply by 6", detail: "(7 x 6) | (4 x 6) = 42 | 24" },
        { label: "Step 3: Apply Balancing Rule", detail: "42 | 24 -> (42 + 2) | 4 = 444" }
      ],
      finalAnswer: "444"
    },
    warmupQuestions: [
      {
        question: "Using Table Formation, what is 63 x 7?",
        options: [431, 441, 451, 421],
        correct: 441,
        explanation: "(6x7) | (3x7) = 42 | 21 -> (42+2) | 1 = 441."
      },
      {
        question: "Using Table Formation, what is 82 x 8?",
        options: [646, 656, 666, 636],
        correct: 656,
        explanation: "(8x8) | (2x8) = 64 | 16 -> (64+1) | 6 = 656."
      }
    ]
  },
  "Convert Paise into Rupees": {
    sutraName: "Place Value Shift (Dividing by 100)",
    englishMeaning: "Shift decimal point 2 places to the left",
    summary: "Since ₹ 1 = 100 Paise, convert Paise to Rupees by dividing by 100 (shifting the decimal 2 places leftwards).",
    keySteps: [
      "Identify paise amount.",
      "Divide by 100: (Paise ÷ 100).",
      "Place decimal point 2 digits from the right: e.g. 725 Paise -> ₹ 7.25."
    ],
    workedExample: {
      problem: "Convert 1250 Paise into Rupees",
      steps: [
        { label: "Step 1: Identify rule", detail: "₹ 1 = 100 Paise, so divide by 100" },
        { label: "Step 2: Shift decimal", detail: "1250 ÷ 100 = 12.50" }
      ],
      finalAnswer: "₹ 12.50"
    },
    warmupQuestions: [
      {
        question: "Convert 450 Paise into Rupees:",
        options: [4.5, 45, 0.45, 450],
        correct: 4.5,
        explanation: "450 ÷ 100 = ₹ 4.50."
      },
      {
        question: "Convert 975 Paise into Rupees:",
        options: [97.5, 9.75, 0.975, 975],
        correct: 9.75,
        explanation: "975 ÷ 100 = ₹ 9.75."
      }
    ]
  },
  "Convert Centimeter into Meter": {
    sutraName: "Place Value Shift (Dividing by 100)",
    englishMeaning: "Shift decimal point 2 places to the left",
    summary: "Since 1 Meter = 100 Centimeters, convert cm to meters by dividing by 100.",
    keySteps: [
      "Identify centimeter value.",
      "Divide by 100: (cm ÷ 100).",
      "Example: 840 cm = 8.4 m."
    ],
    workedExample: {
      problem: "Convert 350 cm into meters",
      steps: [
        { label: "Step 1: Formula", detail: "1 m = 100 cm" },
        { label: "Step 2: Divide", detail: "350 ÷ 100 = 3.5 m" }
      ],
      finalAnswer: "3.5 m"
    },
    warmupQuestions: [
      {
        question: "Convert 925 cm into meters:",
        options: [9.25, 92.5, 0.925, 925],
        correct: 9.25,
        explanation: "925 ÷ 100 = 9.25 m."
      },
      {
        question: "Convert 1500 cm into meters:",
        options: [1.5, 15, 150, 0.15],
        correct: 15,
        explanation: "1500 ÷ 100 = 15 m."
      }
    ]
  },
  "Convert Gram into Kilogram": {
    sutraName: "Place Value Shift (Dividing by 1000)",
    englishMeaning: "Shift decimal point 3 places to the left",
    summary: "Since 1 kg = 1000 g, convert grams to kilograms by dividing by 1000.",
    keySteps: [
      "Identify grams value.",
      "Divide by 1000: (g ÷ 1000).",
      "Example: 6750 g = 6.75 kg."
    ],
    workedExample: {
      problem: "Convert 2500 g into kilograms",
      steps: [
        { label: "Step 1: Formula", detail: "1 kg = 1000 g" },
        { label: "Step 2: Divide", detail: "2500 ÷ 1000 = 2.5 kg" }
      ],
      finalAnswer: "2.5 kg"
    },
    warmupQuestions: [
      {
        question: "Convert 4500 g into kg:",
        options: [45, 4.5, 0.45, 450],
        correct: 4.5,
        explanation: "4500 ÷ 1000 = 4.5 kg."
      },
      {
        question: "Convert 1250 g into kg:",
        options: [12.5, 1.25, 0.125, 125],
        correct: 1.25,
        explanation: "1250 ÷ 1000 = 1.25 kg."
      }
    ]
  },
  "Convert Millilitre into Litre": {
    sutraName: "Place Value Shift (Dividing by 1000)",
    englishMeaning: "Shift decimal point 3 places to the left",
    summary: "Since 1 Litre = 1000 Millilitres, convert mL to litres by dividing by 1000.",
    keySteps: [
      "Identify mL value.",
      "Divide by 1000: (mL ÷ 1000).",
      "Example: 1500 mL = 1.5 L."
    ],
    workedExample: {
      problem: "Convert 4200 mL into litres",
      steps: [
        { label: "Step 1: Formula", detail: "1 L = 1000 mL" },
        { label: "Step 2: Divide", detail: "4200 ÷ 1000 = 4.2 L" }
      ],
      finalAnswer: "4.2 L"
    },
    warmupQuestions: [
      {
        question: "Convert 7800 mL into Litres:",
        options: [78, 7.8, 0.78, 780],
        correct: 7.8,
        explanation: "7800 ÷ 1000 = 7.8 L."
      },
      {
        question: "Convert 500 mL into Litres:",
        options: [5, 0.5, 0.05, 50],
        correct: 0.5,
        explanation: "500 ÷ 1000 = 0.5 L."
      }
    ]
  },
  "Convert Meter into Kilometer": {
    sutraName: "Place Value Shift (Dividing by 1000)",
    englishMeaning: "Shift decimal point 3 places to the left",
    summary: "Since 1 Kilometer = 1000 Meters, convert meters to kilometers by dividing by 1000.",
    keySteps: [
      "Identify meters value.",
      "Divide by 1000: (m ÷ 1000).",
      "Example: 9200 m = 9.2 km."
    ],
    workedExample: {
      problem: "Convert 7800 m into km",
      steps: [
        { label: "Step 1: Formula", detail: "1 km = 1000 m" },
        { label: "Step 2: Divide", detail: "7800 ÷ 1000 = 7.8 km" }
      ],
      finalAnswer: "7.8 km"
    },
    warmupQuestions: [
      {
        question: "Convert 4500 m into km:",
        options: [45, 4.5, 0.45, 450],
        correct: 4.5,
        explanation: "4500 ÷ 1000 = 4.5 km."
      },
      {
        question: "Convert 16000 m into km:",
        options: [1.6, 16, 160, 0.16],
        correct: 16,
        explanation: "16000 ÷ 1000 = 16 km."
      }
    ]
  },
  "Convert Litre into Kilolitre": {
    sutraName: "Place Value Shift (Dividing by 1000)",
    englishMeaning: "Shift decimal point 3 places to the left",
    summary: "Since 1 Kilolitre = 1000 Litres, convert L to kL by dividing by 1000.",
    keySteps: [
      "Identify litres value.",
      "Divide by 1000: (L ÷ 1000).",
      "Example: 3400 L = 3.4 kL."
    ],
    workedExample: {
      problem: "Convert 5000 L into kL",
      steps: [
        { label: "Step 1: Formula", detail: "1 kL = 1000 L" },
        { label: "Step 2: Divide", detail: "5000 ÷ 1000 = 5 kL" }
      ],
      finalAnswer: "5 kL"
    },
    warmupQuestions: [
      {
        question: "Convert 8700 L into kL:",
        options: [87, 8.7, 0.87, 870],
        correct: 8.7,
        explanation: "8700 ÷ 1000 = 8.7 kL."
      },
      {
        question: "Convert 14000 L into kL:",
        options: [1.4, 14, 140, 0.14],
        correct: 14,
        explanation: "14000 ÷ 1000 = 14 kL."
      }
    ]
  },
  "Convert Rupees into Paise": {
    sutraName: "Place Value Shift (Multiplying by 100)",
    englishMeaning: "Multiply by 100 / shift decimal 2 places right",
    summary: "Since ₹ 1 = 100 Paise, convert Rupees to Paise by multiplying by 100.",
    keySteps: [
      "Identify rupees amount.",
      "Multiply by 100: (Rupees x 100).",
      "Example: ₹ 12.50 = 1250 Paise."
    ],
    workedExample: {
      problem: "Convert ₹ 8.75 into Paise",
      steps: [
        { label: "Step 1: Formula", detail: "₹ 1 = 100 Paise" },
        { label: "Step 2: Multiply", detail: "8.75 x 100 = 875 Paise" }
      ],
      finalAnswer: "875 Paise"
    },
    warmupQuestions: [
      {
        question: "Convert ₹ 15.00 into Paise:",
        options: [150, 1500, 15000, 15],
        correct: 1500,
        explanation: "15 x 100 = 1500 Paise."
      },
      {
        question: "Convert ₹ 24.25 into Paise:",
        options: [242.5, 2425, 24250, 24.25],
        correct: 2425,
        explanation: "24.25 x 100 = 2425 Paise."
      }
    ]
  },
  "Convert Meter into Centimeter": {
    sutraName: "Place Value Shift (Multiplying by 100)",
    englishMeaning: "Multiply by 100 / append 2 zeros",
    summary: "Since 1 m = 100 cm, convert meters to centimeters by multiplying by 100.",
    keySteps: [
      "Identify meters value.",
      "Multiply by 100: (m x 100).",
      "Example: 6.5 m = 650 cm."
    ],
    workedExample: {
      problem: "Convert 4.25 m into cm",
      steps: [
        { label: "Step 1: Formula", detail: "1 m = 100 cm" },
        { label: "Step 2: Multiply", detail: "4.25 x 100 = 425 cm" }
      ],
      finalAnswer: "425 cm"
    },
    warmupQuestions: [
      {
        question: "Convert 12 m into cm:",
        options: [120, 1200, 12000, 1.2],
        correct: 1200,
        explanation: "12 x 100 = 1200 cm."
      },
      {
        question: "Convert 8.7 m into cm:",
        options: [87, 870, 8700, 0.87],
        correct: 870,
        explanation: "8.7 x 100 = 870 cm."
      }
    ]
  },
  "Convert Kilogram into Gram": {
    sutraName: "Place Value Shift (Multiplying by 1000)",
    englishMeaning: "Multiply by 1000 / append 3 zeros",
    summary: "Since 1 kg = 1000 g, convert kilograms to grams by multiplying by 1000.",
    keySteps: [
      "Identify kg value.",
      "Multiply by 1000: (kg x 1000).",
      "Example: 4.2 kg = 4200 g."
    ],
    workedExample: {
      problem: "Convert 6.75 kg into grams",
      steps: [
        { label: "Step 1: Formula", detail: "1 kg = 1000 g" },
        { label: "Step 2: Multiply", detail: "6.75 x 1000 = 6750 g" }
      ],
      finalAnswer: "6750 g"
    },
    warmupQuestions: [
      {
        question: "Convert 15 kg into grams:",
        options: [1500, 15000, 150000, 150],
        correct: 15000,
        explanation: "15 x 1000 = 15000 g."
      },
      {
        question: "Convert 2.45 kg into grams:",
        options: [245, 2450, 24500, 24.5],
        correct: 2450,
        explanation: "2.45 x 1000 = 2450 g."
      }
    ]
  },
  "Convert Litre into Millilitre": {
    sutraName: "Place Value Shift (Multiplying by 1000)",
    englishMeaning: "Multiply by 1000 / append 3 zeros",
    summary: "Since 1 L = 1000 mL, convert litres to millilitres by multiplying by 1000.",
    keySteps: [
      "Identify Litres value.",
      "Multiply by 1000: (L x 1000).",
      "Example: 8.5 L = 8500 mL."
    ],
    workedExample: {
      problem: "Convert 3.25 L into mL",
      steps: [
        { label: "Step 1: Formula", detail: "1 L = 1000 mL" },
        { label: "Step 2: Multiply", detail: "3.25 x 1000 = 3250 mL" }
      ],
      finalAnswer: "3250 mL"
    },
    warmupQuestions: [
      {
        question: "Convert 14 L into mL:",
        options: [1400, 14000, 140000, 140],
        correct: 14000,
        explanation: "14 x 1000 = 14000 mL."
      },
      {
        question: "Convert 6.8 L into mL:",
        options: [680, 6800, 68000, 68],
        correct: 6800,
        explanation: "6.8 x 1000 = 6800 mL."
      }
    ]
  },
  "Convert Kilometer into Meter": {
    sutraName: "Place Value Shift (Multiplying by 1000)",
    englishMeaning: "Multiply by 1000 / append 3 zeros",
    summary: "Since 1 km = 1000 m, convert kilometers to meters by multiplying by 1000.",
    keySteps: [
      "Identify km value.",
      "Multiply by 1000: (km x 1000).",
      "Example: 3.7 km = 3700 m."
    ],
    workedExample: {
      problem: "Convert 5.25 km into meters",
      steps: [
        { label: "Step 1: Formula", detail: "1 km = 1000 m" },
        { label: "Step 2: Multiply", detail: "5.25 x 1000 = 5250 m" }
      ],
      finalAnswer: "5250 m"
    },
    warmupQuestions: [
      {
        question: "Convert 18 km into meters:",
        options: [1800, 18000, 180000, 180],
        correct: 18000,
        explanation: "18 x 1000 = 18000 m."
      },
      {
        question: "Convert 9.4 km into meters:",
        options: [940, 9400, 94000, 94],
        correct: 9400,
        explanation: "9.4 x 1000 = 9400 m."
      }
    ]
  },
  "Convert Kilolitre into Litre": {
    sutraName: "Place Value Shift (Multiplying by 1000)",
    englishMeaning: "Multiply by 1000 / append 3 zeros",
    summary: "Since 1 kL = 1000 L, convert kilolitres to litres by multiplying by 1000.",
    keySteps: [
      "Identify kL value.",
      "Multiply by 1000: (kL x 1000).",
      "Example: 5.1 kL = 5100 L."
    ],
    workedExample: {
      problem: "Convert 2.75 kL into litres",
      steps: [
        { label: "Step 1: Formula", detail: "1 kL = 1000 L" },
        { label: "Step 2: Multiply", detail: "2.75 x 1000 = 2750 L" }
      ],
      finalAnswer: "2750 L"
    },
    warmupQuestions: [
      {
        question: "Convert 16 kL into litres:",
        options: [1600, 16000, 160000, 160],
        correct: 16000,
        explanation: "16 x 1000 = 16000 L."
      },
      {
        question: "Convert 8.3 kL into litres:",
        options: [830, 8300, 83000, 83],
        correct: 8300,
        explanation: "8.3 x 1000 = 8300 L."
      }
    ]
  },
  Addition: {
    sutraName: "Ekadhikena Purvena & Left-to-Right Partition",
    englishMeaning: "Add left digits (tens/hundreds) first, then right digits",
    summary: "Vedic addition computes left-to-right to align with human speech and mental estimation, eliminating scratch-work carries.",
    keySteps: [
      "Break double-digit numbers into Tens and Ones (e.g. 58 + 37 -> 50+30 and 8+7).",
      "Add the Tens column mentally: 50 + 30 = 80.",
      "Add the Ones column mentally: 8 + 7 = 15.",
      "Combine the two parts: 80 + 15 = 95."
    ],
    workedExample: {
      problem: "Calculate 68 + 47 mentally",
      steps: [
        { label: "Step 1: Tens Addition", detail: "60 + 40 = 100" },
        { label: "Step 2: Ones Addition", detail: "8 + 7 = 15" },
        { label: "Step 3: Combine", detail: "100 + 15 = 115" }
      ],
      finalAnswer: "115"
    },
    warmupQuestions: [
      {
        question: "What is 47 + 38 using Left-to-Right addition?",
        options: [75, 85, 95, 81],
        correct: 85,
        explanation: "40+30=70, 7+8=15 -> 70+15 = 85."
      },
      {
        question: "What is 76 + 59?",
        options: [125, 135, 145, 131],
        correct: 135,
        explanation: "70+50=120, 6+9=15 -> 120+15 = 135."
      }
    ]
  },
  Ekadhik: {
    sutraName: "Ekadhikena Purvena",
    englishMeaning: "One more than the previous digit",
    summary: "Ekadhik is the foundational Vedic concept of incrementing a digit or number by exactly 1. It is denoted with a dot above the digit.",
    keySteps: [
      "Identify the digit or number given.",
      "Add 1 to the digit/number: (N + 1).",
      "If marked over a specific digit in a multi-digit number (e.g., 4̇5), increment that specific digit by 1 (4̇5 -> 55)."
    ],
    workedExample: {
      problem: "Find Ekadhik of 89 and Ekadhik of 4 in number 247 (represented as 24̇7)",
      steps: [
        { label: "Part A: Ekadhik of 89", detail: "89 + 1 = 90" },
        { label: "Part B: Ekadhik of digit 4 in 247", detail: "Digit 4 becomes 5 -> Result = 257" }
      ],
      finalAnswer: "90 (for 89) & 257 (for 24̇7)"
    },
    warmupQuestions: [
      {
        question: "What is Ekadhik of 199?",
        options: [198, 200, 201, 190],
        correct: 200,
        explanation: "Ekadhik of 199 = 199 + 1 = 200."
      },
      {
        question: "What is Ekadhik of 73?",
        options: [72, 74, 75, 83],
        correct: 74,
        explanation: "Ekadhik of 73 = 73 + 1 = 74."
      }
    ]
  },
  Ekanyunena: {
    sutraName: "Ekanyunena Purvena",
    englishMeaning: "One less than the previous digit",
    summary: "Ekanyunena is the Vedic concept of decrementing a number or digit by 1. It is denoted with a dot below the digit.",
    keySteps: [
      "Identify the given number.",
      "Subtract 1 from the number: (N - 1).",
      "Used extensively as the left-hand rule in multiplication by 9s, 99s, and 999s."
    ],
    workedExample: {
      problem: "Find Ekanyunena of 400 and Ekanyunena of 75",
      steps: [
        { label: "Part A: Ekanyunena of 400", detail: "400 - 1 = 399" },
        { label: "Part B: Ekanyunena of 75", detail: "75 - 1 = 74" }
      ],
      finalAnswer: "399 and 74"
    },
    warmupQuestions: [
      {
        question: "What is Ekanyunena of 500?",
        options: [499, 501, 490, 400],
        correct: 499,
        explanation: "500 - 1 = 499."
      },
      {
        question: "What is Ekanyunena of 88?",
        options: [89, 87, 78, 86],
        correct: 87,
        explanation: "88 - 1 = 87."
      }
    ]
  },
  "Balancing ( Thumb Rule )": {
    sutraName: "Balancing Rule (Thumb Rule)",
    englishMeaning: "Right-to-left single-digit retention and carry over",
    summary: "The Balancing Rule converts multi-partition expressions (e.g. 4 | 14 | 6) into a single unified decimal number by carrying over tens digits to the left.",
    keySteps: [
      "Write partitions separated by vertical lines: A | B | C.",
      "Keep only the unit digit of the rightmost partition.",
      "Add the tens digit of that partition to the partition immediately to its left.",
      "Repeat moving leftwards until all partitions are balanced."
    ],
    workedExample: {
      problem: "Balance the expression 3 | 14 | 8",
      steps: [
        { label: "Step 1: Rightmost partition (8)", detail: "Units = 8, Tens = 0. Partition stay: 8" },
        { label: "Step 2: Middle partition (14)", detail: "Keep unit 4. Carry tens 1 leftward to 3." },
        { label: "Step 3: Leftmost partition (3 + 1)", detail: "3 + 1 = 4." },
        { label: "Final Combined Result", detail: "4 | 4 | 8 -> 448" }
      ],
      finalAnswer: "448"
    },
    warmupQuestions: [
      {
        question: "Balance the expression: 5 | 18 | 4",
        options: [584, 684, 5184, 694],
        correct: 684,
        explanation: "Right = 4. Middle = 18 (keep 8, carry 1). Left = 5 + 1 = 6. Answer = 684."
      },
      {
        question: "Balance the expression: 7 | 25 | 9",
        options: [959, 7259, 949, 779],
        correct: 959,
        explanation: "Right = 9. Middle = 25 (keep 5, carry 2). Left = 7 + 2 = 9. Answer = 959."
      }
    ]
  },
  "Dodging Table": {
    sutraName: "Instant Recall & Mental Partitioning",
    englishMeaning: "Split-second multiplication tables from 12 to 19",
    summary: "Dodging tables test speed memory and mental partitioning for tables 12 to 19 without relying on sequential recitation.",
    keySteps: [
      "Decompose teen multiplier: e.g. 17 x 8 -> (10 x 8) + (7 x 8).",
      "Multiply 10s: 80.",
      "Multiply 7s: 56.",
      "Sum together: 80 + 56 = 136."
    ],
    workedExample: {
      problem: "What is 18 x 7?",
      steps: [
        { label: "Partition 1", detail: "10 x 7 = 70" },
        { label: "Partition 2", detail: "8 x 7 = 56" },
        { label: "Sum", detail: "70 + 56 = 126" }
      ],
      finalAnswer: "126"
    },
    warmupQuestions: [
      {
        question: "What is 16 x 8?",
        options: [118, 128, 138, 148],
        correct: 128,
        explanation: "(10x8) + (6x8) = 80 + 48 = 128."
      },
      {
        question: "What is 19 x 7?",
        options: [133, 143, 123, 153],
        correct: 133,
        explanation: "(10x7) + (9x7) = 70 + 63 = 133."
      }
    ]
  },
  "Multiplication - Number Starting with 1": {
    sutraName: "1N x 1M Teens Multiplication Shortcut",
    englishMeaning: "Multiply numbers between 11 and 19 instantly",
    summary: "When both numbers are in the teens (11-19), add the second number's unit digit to the first number, then append the product of their unit digits.",
    keySteps: [
      "Formula: (First Number + Unit Digit of Second Number) | (Product of Unit Digits).",
      "Calculate Left Part: (1A + B).",
      "Calculate Right Part: (A x B).",
      "Apply Balancing Rule if Right Part is >= 10."
    ],
    workedExample: {
      problem: "Multiply 14 x 13",
      steps: [
        { label: "Step 1: Left Part", detail: "14 + 3 = 17" },
        { label: "Step 2: Right Part", detail: "4 x 3 = 12" },
        { label: "Step 3: Combine & Balance", detail: "17 | 12 -> (17 + 1) | 2 = 182" }
      ],
      finalAnswer: "182"
    },
    warmupQuestions: [
      {
        question: "What is 12 x 14?",
        options: [158, 168, 178, 148],
        correct: 168,
        explanation: "(12 + 4) | (2 x 4) = 16 | 8 = 168."
      },
      {
        question: "What is 15 x 13?",
        options: [185, 195, 205, 175],
        correct: 195,
        explanation: "(15 + 3) | (5 x 3) = 18 | 15 -> (18+1) | 5 = 195."
      }
    ]
  },
  "Multiplication - Number Ending with 1": {
    sutraName: "N1 x M1 Shortcut",
    englishMeaning: "Multiply numbers ending in 1 (21, 31, 41, 51...)",
    summary: "When multiplying numbers ending in 1, the unit digit is always 1, the tens digit is the sum of tens digits, and hundreds is product of tens digits.",
    keySteps: [
      "Formula for A1 x B1:",
      "Unit digit = 1.",
      "Middle Part = Tens sum (A + B).",
      "Left Part = Tens product (A x B).",
      "Combine: (A x B) | (A + B) | 1 (balance if A + B >= 10)."
    ],
    workedExample: {
      problem: "Multiply 41 x 31",
      steps: [
        { label: "Step 1: Left Part (Product of Tens)", detail: "4 x 3 = 12" },
        { label: "Step 2: Middle Part (Sum of Tens)", detail: "4 + 3 = 7" },
        { label: "Step 3: Right Part (Always 1)", detail: "1" },
        { label: "Combined Result", detail: "12 | 7 | 1 = 1271" }
      ],
      finalAnswer: "1271"
    },
    warmupQuestions: [
      {
        question: "What is 51 x 31?",
        options: [1581, 1571, 1681, 1481],
        correct: 1581,
        explanation: "(5x3) | (5+3) | 1 = 15 | 8 | 1 = 1581."
      },
      {
        question: "What is 61 x 21?",
        options: [1281, 1261, 1381, 1271],
        correct: 1281,
        explanation: "(6x2) | (6+2) | 1 = 12 | 8 | 1 = 1281."
      }
    ]
  },
  "Multiplication by 11": {
    sutraName: "Antyayor Dasake'pi (Sandwich Rule)",
    englishMeaning: "Sandwich adjacent digit sums between outer digits",
    summary: "To multiply any number by 11, write the outer digits at both ends and insert the sums of adjacent pairs in the middle.",
    keySteps: [
      "Write rightmost digit as the rightmost digit of answer.",
      "Add adjacent pairs of digits moving right to left: (d1 + d2), (d2 + d3)...",
      "Write leftmost digit as leftmost digit of answer (plus any carry).",
      "Example for 2-digit AB x 11: A | (A + B) | B."
    ],
    workedExample: {
      problem: "Multiply 75 x 11",
      steps: [
        { label: "Step 1: Right Digit", detail: "5" },
        { label: "Step 2: Middle Sum", detail: "7 + 5 = 12 (keep 2, carry 1)" },
        { label: "Step 3: Left Digit", detail: "7 + 1 = 8" },
        { label: "Combined Result", detail: "825" }
      ],
      finalAnswer: "825"
    },
    warmupQuestions: [
      {
        question: "What is 43 x 11?",
        options: [463, 473, 483, 453],
        correct: 473,
        explanation: "4 | (4+3) | 3 = 473."
      },
      {
        question: "What is 245 x 11?",
        options: [2695, 2595, 2685, 2795],
        correct: 2695,
        explanation: "2 | (2+4) | (4+5) | 5 = 2 | 6 | 9 | 5 = 2695."
      }
    ]
  },
  "Multiplication by Multiples of 11": {
    sutraName: "Factor & Sandwich Rule",
    englishMeaning: "Multiply by single-digit factor first, then apply 11 sandwich rule",
    summary: "To multiply by 22, 33, 44, 55, etc., split the multiplier into (Single Digit x 11). Multiply the main number first, then apply the 11 shortcut.",
    keySteps: [
      "Example N x 33: Rewrite as (N x 3) x 11.",
      "Multiply N by single digit: X = N x 3.",
      "Apply 11 Sandwich Rule to X: X x 11."
    ],
    workedExample: {
      problem: "Calculate 23 x 33",
      steps: [
        { label: "Step 1: Multiply by 3", detail: "23 x 3 = 69" },
        { label: "Step 2: Apply 11 Rule to 69", detail: "6 | (6+9) | 9 = 6 | 15 | 9 -> (6+1) | 5 | 9 = 759" }
      ],
      finalAnswer: "759"
    },
    warmupQuestions: [
      {
        question: "What is 14 x 22?",
        options: [298, 308, 318, 288],
        correct: 308,
        explanation: "(14 x 2) x 11 = 28 x 11 = 2 | (2+8) | 8 = 308."
      },
      {
        question: "What is 21 x 44?",
        options: [924, 914, 934, 884],
        correct: 924,
        explanation: "(21 x 4) x 11 = 84 x 11 = 8 | (8+4) | 4 = 924."
      }
    ]
  },
  "Multiplication by 101": {
    sutraName: "Double Repeat & Base Shift Rule",
    englishMeaning: "Repeat 2-digit number twice (AB -> ABAB)",
    summary: "Multiplying any 2-digit number AB by 101 simply repeats the number twice: AB x 101 = ABAB.",
    keySteps: [
      "For 2-Digit Numbers AB x 101: Write AB twice -> ABAB (e.g. 54 x 101 = 5454).",
      "For 3-Digit Numbers ABC x 101: (ABC + A) | BC (e.g. 135 x 101 = (135+1) | 35 = 13635)."
    ],
    workedExample: {
      problem: "Calculate 73 x 101 and 142 x 101",
      steps: [
        { label: "Part A: 73 x 101 (2-Digit)", detail: "Repeat twice -> 7373" },
        { label: "Part B: 142 x 101 (3-Digit)", detail: "(142 + 1) | 42 = 14342" }
      ],
      finalAnswer: "7373 and 14342"
    },
    warmupQuestions: [
      {
        question: "What is 86 x 101?",
        options: [8686, 8616, 8606, 8866],
        correct: 8686,
        explanation: "2-digit number repeat rule: 86 x 101 = 8686."
      },
      {
        question: "What is 49 x 101?",
        options: [4949, 4909, 4994, 4099],
        correct: 4949,
        explanation: "49 x 101 = 4949."
      }
    ]
  },
  "Count the number of Triangle": {
    sutraName: "Spatial Base Partitioning Formula",
    englishMeaning: "Total triangles = n(n+1)/2",
    summary: "When a major triangle is divided vertically into n base segments from its apex, the total number of triangles is the sum of numbers 1 to n.",
    keySteps: [
      "Count the small inner triangles along the base line: 1, 2, 3, ... n.",
      "Use formula: Total = 1 + 2 + ... + n = n(n+1)/2.",
      "If there are h horizontal lines cutting across, multiply by h: Total = [n(n+1)/2] x h."
    ],
    workedExample: {
      problem: "Count total triangles if the base is divided into 4 segments with 2 horizontal layers.",
      steps: [
        { label: "Step 1: Single Layer Base Sum", detail: "1 + 2 + 3 + 4 = 10 triangles" },
        { label: "Step 2: Multiply by Horizontal Layers (2)", detail: "10 x 2 = 20 total triangles" }
      ],
      finalAnswer: "20 Triangles"
    },
    warmupQuestions: [
      {
        question: "A triangle is divided into 3 vertical base sections. How many total triangles exist?",
        options: [5, 6, 7, 8],
        correct: 6,
        explanation: "Formula: 1 + 2 + 3 = 6 triangles."
      },
      {
        question: "A triangle has 4 base sections and 1 main base (1 horizontal layer). How many triangles?",
        options: [8, 10, 12, 14],
        correct: 10,
        explanation: "1 + 2 + 3 + 4 = 10 triangles."
      }
    ],
    visualType: "triangle"
  },
  "Count the number of Circles": {
    sutraName: "Symmetric Grid & Ring Counting",
    englishMeaning: "Count concentric rings & central grid symmetry",
    summary: "Counting circles in Vedic Geometry relies on identifying concentric rings or grid rows without double-counting overlapping circles.",
    keySteps: [
      "For Concentric Circles: Count rings from innermost to outermost layer.",
      "For Overlapping / Grid Circles: Count row-by-row or quadrant by quadrant and multiply by symmetry.",
      "Verify central circle + surround ring circles."
    ],
    workedExample: {
      problem: "How many circles exist in a concentric set with 5 layers plus 4 outer surrounding non-overlapping circles?",
      steps: [
        { label: "Step 1: Concentric Layers", detail: "5 circles" },
        { label: "Step 2: Outer Surround Circles", detail: "4 circles" },
        { label: "Step 3: Total Count", detail: "5 + 4 = 9 circles" }
      ],
      finalAnswer: "9 Circles"
    },
    warmupQuestions: [
      {
        question: "How many circles are in 4 concentric rings plus 1 central circle?",
        options: [4, 5, 6, 7],
        correct: 5,
        explanation: "1 center + 4 concentric rings = 5 circles."
      },
      {
        question: "In a 3x3 grid of distinct circles, how many total circles are there?",
        options: [6, 9, 12, 8],
        correct: 9,
        explanation: "3 rows x 3 columns = 9 circles."
      }
    ],
    visualType: "circle"
  }
};

interface VedicLearningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartPractice: () => void;
  topicTitle: string;
  topicId: string;
  category?: string;
  level?: string;
}

export default function VedicLearningModal({
  isOpen,
  onClose,
  onStartPractice,
  topicTitle,
  topicId,
  category,
  level,
}: VedicLearningModalProps) {
  const [activeTab, setActiveTab] = useState<"sutra" | "example" | "quiz">("sutra");
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<number, number | string>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  if (!isOpen) return null;

  // Determine if current set is Abacus Math vs Vedic Math
  const isAbacus =
    category === "abacus" ||
    level?.startsWith("JR") ||
    level?.startsWith("SR") ||
    topicId.toLowerCase().startsWith("jr") ||
    topicId.toLowerCase().startsWith("sr") ||
    topicId.toLowerCase().startsWith("abacus") ||
    topicTitle.toLowerCase().includes("abacus") ||
    topicTitle.toLowerCase().includes("soroban") ||
    topicTitle.toLowerCase().includes("bead") ||
    topicTitle.toLowerCase().includes("friend") ||
    topicTitle.toLowerCase().includes("complement") ||
    topicTitle.toLowerCase().includes("compliment") ||
    topicTitle.toLowerCase().includes("direct") ||
    topicTitle.toLowerCase().includes("add & sub");

  // Match lesson content key
  const matchedKey = Object.keys(TOPIC_LESSONS).find(
    (key) => topicTitle.toLowerCase().includes(key.toLowerCase()) || topicId.toLowerCase().includes(key.toLowerCase())
  ) || (isAbacus ? "Direct" : "Addition");

  const lesson = TOPIC_LESSONS[matchedKey];

  const handleSelectQuizOption = (qIdx: number, opt: number | string) => {
    setUserQuizAnswers((prev) => ({ ...prev, [qIdx]: opt }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-slate-900 border border-purple-500/30 rounded-2xl max-w-3xl w-full text-slate-100 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-6 border-b border-purple-500/20 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-400/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              {isAbacus ? "Abacus Math Concept Learning" : "Vedic Math Sutra Learning"}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-400" />
            {topicTitle}
          </h2>
          <p className="text-purple-200/90 text-sm mt-1">
            {isAbacus ? "Soroban Method: " : "Sutra: "}
            <span className="font-semibold text-amber-300">{lesson.sutraName}</span> — "{lesson.englishMeaning}"
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 border-b border-purple-500/20">
            <button
              onClick={() => setActiveTab("sutra")}
              className={`pb-2.5 px-4 text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
                activeTab === "sutra"
                  ? "border-purple-400 text-purple-300"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Lightbulb className="w-4 h-4" /> {isAbacus ? "1. Concept Breakdown" : "1. Sutra Breakdown"}
            </button>
            <button
              onClick={() => setActiveTab("example")}
              className={`pb-2.5 px-4 text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
                activeTab === "example"
                  ? "border-purple-400 text-purple-300"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Zap className="w-4 h-4" /> 2. Worked Example
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`pb-2.5 px-4 text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
                activeTab === "quiz"
                  ? "border-purple-400 text-purple-300"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <HelpCircle className="w-4 h-4" /> 3. Warmup Quiz
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {activeTab === "sutra" && (
            <div className="space-y-6">
              {/* Concept Summary Box */}
              <div className="p-4 bg-purple-950/40 border border-purple-500/30 rounded-xl">
                <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Core Concept Overview
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">{lesson.summary}</p>
              </div>

              {/* Geometry Visual Diagram (if applicable) */}
              {lesson.visualType === "triangle" && (
                <div className="p-4 bg-slate-950 border border-purple-500/20 rounded-xl text-center">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase mb-3">Interactive Spatial Diagram: Triangle Base Partitioning</h4>
                  <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200">
                    <polygon points="100,20 20,180 180,180" fill="none" stroke="#a855f7" strokeWidth="3" />
                    <line x1="100" y1="20" x2="73" y2="180" stroke="#c084fc" strokeWidth="2" strokeDasharray="4" />
                    <line x1="100" y1="20" x2="127" y2="180" stroke="#c084fc" strokeWidth="2" strokeDasharray="4" />
                    <text x="45" y="165" fill="#fde047" fontSize="14" fontWeight="bold">1</text>
                    <text x="96" y="165" fill="#fde047" fontSize="14" fontWeight="bold">2</text>
                    <text x="148" y="165" fill="#fde047" fontSize="14" fontWeight="bold">3</text>
                  </svg>
                  <p className="text-xs text-purple-300 mt-2 font-mono">3 Base partitions: Total Triangles = 1 + 2 + 3 = 6</p>
                </div>
              )}

              {lesson.visualType === "circle" && (
                <div className="p-4 bg-slate-950 border border-purple-500/20 rounded-xl text-center">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase mb-3">Interactive Spatial Diagram: Concentric & Grid Rings</h4>
                  <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#a855f7" strokeWidth="2" />
                    <circle cx="100" cy="100" r="55" fill="none" stroke="#c084fc" strokeWidth="2" />
                    <circle cx="100" cy="100" r="30" fill="none" stroke="#e879f9" strokeWidth="2" />
                    <circle cx="100" cy="100" r="10" fill="#fde047" />
                  </svg>
                  <p className="text-xs text-purple-300 mt-2 font-mono">1 Center + 3 Concentric Rings = 4 Total Circles</p>
                </div>
              )}

              {lesson.visualType === "rectangle" && (
                <div className="p-4 bg-slate-950 border border-purple-500/20 rounded-xl text-center">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase mb-3">Interactive Spatial Diagram: Grid Rectangles (3 x 3)</h4>
                  <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200">
                    <rect x="20" y="20" width="160" height="160" fill="none" stroke="#a855f7" strokeWidth="3" />
                    <line x1="73.3" y1="20" x2="73.3" y2="180" stroke="#c084fc" strokeWidth="2" />
                    <line x1="126.6" y1="20" x2="126.6" y2="180" stroke="#c084fc" strokeWidth="2" />
                    <line x1="20" y1="73.3" x2="180" y2="73.3" stroke="#c084fc" strokeWidth="2" />
                    <line x1="20" y1="126.6" x2="180" y2="126.6" stroke="#c084fc" strokeWidth="2" />
                    <text x="100" y="105" textAnchor="middle" fill="#fde047" fontSize="14" fontWeight="bold">36 Rectangles</text>
                  </svg>
                  <p className="text-xs text-purple-300 mt-2 font-mono">Row Sum (1+2+3=6) × Col Sum (1+2+3=6) = 36 Total Rectangles</p>
                </div>
              )}

              {lesson.visualType === "square" && (
                <div className="p-4 bg-slate-950 border border-purple-500/20 rounded-xl text-center">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase mb-3">Interactive Spatial Diagram: Grid Squares (3 x 3)</h4>
                  <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200">
                    <rect x="20" y="20" width="160" height="160" fill="none" stroke="#e879f9" strokeWidth="3" />
                    <line x1="73.3" y1="20" x2="73.3" y2="180" stroke="#a855f7" strokeWidth="2" strokeDasharray="4" />
                    <line x1="126.6" y1="20" x2="126.6" y2="180" stroke="#a855f7" strokeWidth="2" strokeDasharray="4" />
                    <line x1="20" y1="73.3" x2="180" y2="73.3" stroke="#a855f7" strokeWidth="2" strokeDasharray="4" />
                    <line x1="20" y1="126.6" x2="180" y2="126.6" stroke="#a855f7" strokeWidth="2" strokeDasharray="4" />
                    <text x="100" y="105" textAnchor="middle" fill="#fde047" fontSize="14" fontWeight="bold">14 Squares</text>
                  </svg>
                  <p className="text-xs text-purple-300 mt-2 font-mono">3x3 (9) + 2x2 (4) + 1x1 (1) = 14 Total Squares</p>
                </div>
              )}

              {lesson.visualType === "grid3x3" && (
                <div className="p-4 bg-slate-950 border border-purple-500/20 rounded-xl text-center">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase mb-3">Interactive Spatial Diagram: 3x3 Magic Grid Matrix</h4>
                  <div className="grid grid-cols-3 gap-1.5 w-44 mx-auto p-2 bg-slate-900 border border-purple-500/40 rounded-lg">
                    {[8, 1, 6, 3, 5, 7, 4, 9, 2].map((num, i) => (
                      <div key={i} className={`h-12 flex items-center justify-center font-extrabold text-base rounded border ${i === 4 ? 'bg-amber-500/20 text-amber-300 border-amber-400/50' : 'bg-slate-800 text-purple-200 border-slate-700'}`}>
                        {num}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-purple-300 mt-2 font-mono">Row / Col / Diagonal Sum = 15 | Center = 5 (Magic Constant M = 3 x 5)</p>
                </div>
              )}

              {/* Step-by-Step Rules */}
              <div>
                <h3 className="text-base font-semibold text-slate-100 mb-3">Rule Breakdown & Steps</h3>
                <div className="space-y-3">
                  {lesson.keySteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
                      <span className="w-6 h-6 rounded-full bg-purple-600/40 text-purple-300 border border-purple-400/30 flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-slate-200 text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "example" && (
            <div className="space-y-6">
              <div className="p-4 bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 rounded-xl">
                <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Worked Problem</span>
                <h3 className="text-xl font-bold text-amber-300 mt-1">{lesson.workedExample.problem}</h3>
              </div>

              <div className="space-y-3">
                {lesson.workedExample.steps.map((st, idx) => (
                  <div key={idx} className="p-4 bg-slate-800/70 border border-slate-700 rounded-xl flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-semibold text-purple-300">{st.label}</h4>
                      <p className="text-slate-300 text-sm font-mono mt-0.5">{st.detail}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  </div>
                ))}
              </div>

              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center justify-between">
                <span className="text-sm font-semibold text-emerald-300">Final Answer</span>
                <span className="text-2xl font-extrabold text-emerald-200 font-mono">{lesson.workedExample.finalAnswer}</span>
              </div>
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="space-y-6">
              <p className="text-sm text-slate-300">Test your understanding with these 2 quick warmup questions before starting the timed practice session!</p>

              {lesson.warmupQuestions.map((q, qIdx) => (
                <div key={qIdx} className="p-4 bg-slate-800/60 border border-slate-700 rounded-xl space-y-3">
                  <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                    <span className="w-5 h-5 bg-purple-500/20 text-purple-300 rounded-full flex items-center justify-center text-xs">
                      Q{qIdx + 1}
                    </span>
                    {q.question}
                  </h4>

                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt) => {
                      const isSelected = userQuizAnswers[qIdx] === opt;
                      const isCorrect = opt === q.correct;

                      let btnStyle = "bg-slate-700/60 hover:bg-slate-700 text-slate-200 border-slate-600";
                      if (showQuizResults) {
                        if (isCorrect) btnStyle = "bg-emerald-900/60 text-emerald-200 border-emerald-500";
                        else if (isSelected) btnStyle = "bg-rose-900/60 text-rose-200 border-rose-500";
                      } else if (isSelected) {
                        btnStyle = "bg-purple-600 text-white border-purple-400";
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelectQuizOption(qIdx, opt)}
                          disabled={showQuizResults}
                          className={`py-2 px-3 rounded-lg border text-sm font-mono transition text-left ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showQuizResults && (
                    <div className="p-2.5 bg-slate-900/90 border border-purple-500/20 rounded-lg text-xs text-purple-200 font-sans mt-2">
                      💡 <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                {!showQuizResults ? (
                  <button
                    onClick={() => setShowQuizResults(true)}
                    disabled={Object.keys(userQuizAnswers).length < lesson.warmupQuestions.length}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition"
                  >
                    Check Warmup Answers
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowQuizResults(false);
                      setUserQuizAnswers({});
                    }}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm transition"
                  >
                    Reset Warmup
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-slate-950 border-t border-purple-500/20 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-400 hover:text-white text-sm font-semibold transition"
          >
            Close Lesson
          </button>

          <button
            onClick={() => {
              onClose();
              onStartPractice();
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-purple-600/30 flex items-center gap-2 transition"
          >
            Start Practice Drills <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
