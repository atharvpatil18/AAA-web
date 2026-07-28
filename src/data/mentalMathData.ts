/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionSet, Question } from "../types";

// Seeded pseudo-random number generator for reproducible sets
function randomInt(min: number, max: number, seedOffset = 0): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generate Mental Math Questions for Grade 4 (Olympiad Syllabus Aligned)
 */
export function generateGrade4OlympiadQuestions(count: number = 10): Question[] {
  const questions: Question[] = [];

  const generators = [
    // 1. Number & Number Names: Expanded Form / Place Value
    (id: number): Question => {
      const val = randomInt(100, 999);
      const hundreds = Math.floor(val / 100) * 100;
      const tens = Math.floor((val % 100) / 10) * 10;
      const ones = val % 10;
      const missingPart = pickRandom(["hundreds", "tens", "ones"]);
      
      if (missingPart === "hundreds") {
        return {
          id,
          expression: `? + ${tens} + ${ones} = ${val}`,
          correctAnswer: hundreds,
          conceptTag: "Expanded Form (< 1000)",
          explanation: `${val} in expanded form is ${hundreds} + ${tens} + ${ones}. So missing value is ${hundreds}.`
        };
      } else if (missingPart === "tens") {
        return {
          id,
          expression: `${hundreds} + ? + ${ones} = ${val}`,
          correctAnswer: tens,
          conceptTag: "Expanded Form (< 1000)",
          explanation: `${val} in expanded form is ${hundreds} + ${tens} + ${ones}. So missing value is ${tens}.`
        };
      } else {
        return {
          id,
          expression: `${hundreds} + ${tens} + ? = ${val}`,
          correctAnswer: ones,
          conceptTag: "Expanded Form (< 1000)",
          explanation: `${val} in expanded form is ${hundreds} + ${tens} + ${ones}. So missing value is ${ones}.`
        };
      }
    },

    // 2. Pictorial Cubes / HTO Representation
    (id: number): Question => {
      const h = randomInt(1, 9);
      const t = randomInt(0, 9);
      const o = randomInt(0, 9);
      const total = h * 100 + t * 10 + o;
      return {
        id,
        expression: `${h} Hundreds + ${t} Tens + ${o} Ones = ?`,
        correctAnswer: total,
        conceptTag: "HTO Place Value",
        explanation: `${h} x 100 + ${t} x 10 + ${o} x 1 = ${total}.`
      };
    },

    // 3. Ascending / Descending & Comparison
    (id: number): Question => {
      const num1 = randomInt(100, 999);
      const num2 = randomInt(100, 999);
      const maxVal = Math.max(num1, num2);
      return {
        id,
        expression: `Which is LARGER: ${num1} or ${num2}?`,
        correctAnswer: maxVal,
        conceptTag: "Number Comparison (< 1000)",
        explanation: `Comparing ${num1} and ${num2}, the larger number is ${maxVal}.`
      };
    },

    // 4. Step / Skip Counting
    (id: number): Question => {
      const step = pickRandom([5, 10, 20, 25, 50]);
      const start = randomInt(10, 50) * step;
      const next1 = start + step;
      const next2 = next1 + step;
      const target = next2 + step;
      return {
        id,
        expression: `Complete skip counting pattern: ${start}, ${next1}, ${next2}, ?`,
        correctAnswer: target,
        conceptTag: "Skip Counting",
        explanation: `The series increases by ${step} each step. ${next2} + ${step} = ${target}.`
      };
    },

    // 5. 3-Digit Addition & Subtraction with Borrowing/Carry
    (id: number): Question => {
      const isAdd = Math.random() > 0.5;
      if (isAdd) {
        const a = randomInt(150, 499);
        const b = randomInt(150, 499);
        return {
          id,
          expression: `${a} + ${b} = ?`,
          correctAnswer: a + b,
          conceptTag: "3-Digit Addition (Carry Over)",
          explanation: `${a} + ${b} = ${a + b}.`
        };
      } else {
        const b = randomInt(150, 450);
        const ans = randomInt(150, 450);
        const a = b + ans;
        return {
          id,
          expression: `${a} - ${b} = ?`,
          correctAnswer: ans,
          conceptTag: "3-Digit Subtraction (Borrowing)",
          explanation: `${a} - ${b} = ${ans}.`
        };
      }
    },

    // 6. Missing Number in Addition/Subtraction
    (id: number): Question => {
      const a = randomInt(200, 700);
      const b = randomInt(100, 250);
      const sum = a + b;
      return {
        id,
        expression: `${a} + ? = ${sum}`,
        correctAnswer: b,
        conceptTag: "Missing Number Equation",
        explanation: `Missing number = ${sum} - ${a} = ${b}.`
      };
    },

    // 7. Multiplication Tables (2 to 20)
    (id: number): Question => {
      const table = randomInt(2, 20);
      const multiplier = randomInt(3, 12);
      return {
        id,
        expression: `${table} x ${multiplier} = ?`,
        correctAnswer: table * multiplier,
        conceptTag: "Multiplication Tables (2-20)",
        explanation: `${table} multiplied by ${multiplier} equals ${table * multiplier}.`
      };
    },

    // 8. Word Terms Vocabulary (Double, Half, Thrice, Dozen, Pair, Score, Century)
    (id: number): Question => {
      const vocabType = pickRandom(["double", "half", "thrice", "dozen", "score", "century"]);
      if (vocabType === "double") {
        const n = randomInt(12, 85);
        return {
          id,
          expression: `What is DOUBLE of ${n}?`,
          correctAnswer: n * 2,
          conceptTag: "Vocabulary Math (Double)",
          explanation: `Double of ${n} = ${n} x 2 = ${n * 2}.`
        };
      } else if (vocabType === "half") {
        const n = randomInt(10, 90) * 2;
        return {
          id,
          expression: `What is HALF of ${n}?`,
          correctAnswer: n / 2,
          conceptTag: "Vocabulary Math (Half)",
          explanation: `Half of ${n} = ${n} / 2 = ${n / 2}.`
        };
      } else if (vocabType === "thrice") {
        const n = randomInt(10, 30);
        return {
          id,
          expression: `What is THRICE of ${n}?`,
          correctAnswer: n * 3,
          conceptTag: "Vocabulary Math (Thrice)",
          explanation: `Thrice of ${n} = ${n} x 3 = ${n * 3}.`
        };
      } else if (vocabType === "dozen") {
        const count = randomInt(2, 9);
        return {
          id,
          expression: `How many items are in ${count} DOZENS? (1 Dozen = 12)`,
          correctAnswer: count * 12,
          conceptTag: "Vocabulary Math (Dozen)",
          explanation: `${count} dozens = ${count} x 12 = ${count * 12}.`
        };
      } else if (vocabType === "score") {
        const count = randomInt(2, 5);
        return {
          id,
          expression: `How many items are in ${count} SCORES? (1 Score = 20)`,
          correctAnswer: count * 20,
          conceptTag: "Vocabulary Math (Score)",
          explanation: `${count} scores = ${count} x 20 = ${count * 20}.`
        };
      } else {
        const count = randomInt(2, 5);
        return {
          id,
          expression: `How many runs are in ${count} CENTURIES? (1 Century = 100)`,
          correctAnswer: count * 100,
          conceptTag: "Vocabulary Math (Century)",
          explanation: `${count} centuries = ${count} x 100 = ${count * 100}.`
        };
      }
    },

    // 9. Factors & Multiples
    (id: number): Question => {
      const base = pickRandom([3, 4, 6, 7, 8, 9, 12, 15]);
      const k = randomInt(4, 9);
      const multiple = base * k;
      return {
        id,
        expression: `Is ${multiple} a multiple of ${base}? Enter 1 for YES, 0 for NO.`,
        correctAnswer: 1,
        conceptTag: "Factors & Multiples",
        explanation: `${multiple} = ${base} x ${k}, so ${multiple} is indeed a multiple of ${base}.`
      };
    },

    // 10. Fractions - Like Fractions Addition / Subtraction
    (id: number): Question => {
      const denom = pickRandom([5, 6, 8, 10, 12]);
      const num1 = randomInt(1, Math.floor(denom / 2));
      const num2 = randomInt(1, Math.floor(denom / 2));
      const sumNum = num1 + num2;
      return {
        id,
        expression: `(${num1}/${denom}) + (${num2}/${denom}) = ?/${denom}. Find the missing NUMERATOR.`,
        correctAnswer: sumNum,
        conceptTag: "Like Fractions Addition",
        explanation: `With same denominator (${denom}), numerators add directly: ${num1} + ${num2} = ${sumNum}.`
      };
    },

    // 11. Measurement Conversions (Length, Weight, Capacity, Time)
    (id: number): Question => {
      const type = pickRandom(["length", "weight", "capacity", "time"]);
      if (type === "length") {
        const m = randomInt(3, 15);
        return {
          id,
          expression: `Convert ${m} meters (m) to centimeters (cm). (1 m = 100 cm)`,
          correctAnswer: m * 100,
          conceptTag: "Measurement Conversion (Length)",
          explanation: `${m} m = ${m} x 100 cm = ${m * 100} cm.`
        };
      } else if (type === "weight") {
        const kg = randomInt(2, 9);
        return {
          id,
          expression: `Convert ${kg} kilograms (kg) to grams (g). (1 kg = 1000 g)`,
          correctAnswer: kg * 1000,
          conceptTag: "Measurement Conversion (Weight)",
          explanation: `${kg} kg = ${kg} x 1000 g = ${kg * 1000} g.`
        };
      } else if (type === "capacity") {
        const l = randomInt(2, 8);
        return {
          id,
          expression: `Convert ${l} Liters (L) to milliliters (mL). (1 L = 1000 mL)`,
          correctAnswer: l * 1000,
          conceptTag: "Measurement Conversion (Capacity)",
          explanation: `${l} L = ${l} x 1000 mL = ${l * 1000} mL.`
        };
      } else {
        const hrs = randomInt(2, 6);
        return {
          id,
          expression: `Convert ${hrs} Hours to Minutes. (1 Hour = 60 Mins)`,
          correctAnswer: hrs * 60,
          conceptTag: "Measurement Conversion (Time)",
          explanation: `${hrs} Hours = ${hrs} x 60 Mins = ${hrs * 60} Minutes.`
        };
      }
    },

    // 12. Geometry & Angles
    (id: number): Question => {
      const angleQ = pickRandom([
        { expr: "How many degrees are in a RIGHT ANGLE?", ans: 90, desc: "A right angle is exactly 90 degrees." },
        { expr: "How many degrees are in a STRAIGHT ANGLE?", ans: 180, desc: "A straight angle is exactly 180 degrees." },
        { expr: "How many sides does a HEXAGON have?", ans: 6, desc: "A hexagon has 6 sides." },
        { expr: "How many faces does a CUBE have?", ans: 6, desc: "A cube has 6 square faces." },
        { expr: "How many vertices does a TRIANGLE have?", ans: 3, desc: "A triangle has 3 vertices (corners)." }
      ]);
      return {
        id,
        expression: angleQ.expr,
        correctAnswer: angleQ.ans,
        conceptTag: "Geometry & Shapes",
        explanation: angleQ.desc
      };
    }
  ];

  for (let i = 1; i <= count; i++) {
    const fn = generators[(i - 1) % generators.length];
    questions.push(fn(i));
  }

  return questions;
}

/**
 * Static & Dynamic Question Sets for Grade 1 through Grade 9
 */
export const MENTAL_QUESTION_SETS: QuestionSet[] = [
  {
    id: "mental-olympiad-g1",
    title: "Grade 1 - Mental Math Fundamentals",
    category: "mental",
    level: "Grade 1",
    topic: "Single-Digit Speed, Skip Counting & Shapes",
    description: "Foundational mental math drill aligned with Mental Maths Olympiad Grade 1 syllabus.",
    questionCount: 10,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "7 + 8 = ?", correctAnswer: 15, conceptTag: "Single Digit Addition", explanation: "7 + 8 = 15." },
      { id: 2, expression: "16 - 9 = ?", correctAnswer: 7, conceptTag: "Single Digit Subtraction", explanation: "16 - 9 = 7." },
      { id: 3, expression: "Skip count by 2s: 2, 4, 6, 8, ?", correctAnswer: 10, conceptTag: "Skip Counting", explanation: "Next number is 8 + 2 = 10." },
      { id: 4, expression: "How many sides does a TRIANGLE have?", correctAnswer: 3, conceptTag: "2D Shapes", explanation: "A triangle has 3 sides." },
      { id: 5, expression: "What is DOUBLE of 6?", correctAnswer: 12, conceptTag: "Double Concept", explanation: "Double of 6 = 6 + 6 = 12." },
      { id: 6, expression: "5 + ? = 12", correctAnswer: 7, conceptTag: "Missing Addend", explanation: "12 - 5 = 7." },
      { id: 7, expression: "Number Name: Twenty-Four = ?", correctAnswer: 24, conceptTag: "Number Names", explanation: "Twenty-Four is 24." },
      { id: 8, expression: "10 + 10 + 5 = ?", correctAnswer: 25, conceptTag: "Tens Addition", explanation: "20 + 5 = 25." },
      { id: 9, expression: "Which is LARGER: 19 or 27?", correctAnswer: 27, conceptTag: "Number Comparison", explanation: "27 is greater than 19." },
      { id: 10, expression: "Half of 10 is ?", correctAnswer: 5, conceptTag: "Half Concept", explanation: "Half of 10 = 5." }
    ]
  },
  {
    id: "mental-olympiad-g2",
    title: "Grade 2 - Speed & Place Value",
    category: "mental",
    level: "Grade 2",
    topic: "2-Digit Addition/Subtraction, Place Value & Tables",
    description: "Mental Maths Olympiad Grade 2 baseline speed check.",
    questionCount: 10,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "45 + 34 = ?", correctAnswer: 79, conceptTag: "2-Digit Addition", explanation: "45 + 34 = 79." },
      { id: 2, expression: "80 - 25 = ?", correctAnswer: 55, conceptTag: "2-Digit Subtraction", explanation: "80 - 25 = 55." },
      { id: 3, expression: "5 x 7 = ?", correctAnswer: 35, conceptTag: "Multiplication Table 5", explanation: "5 x 7 = 35." },
      { id: 4, expression: "In 384, what is the PLACE VALUE of 8?", correctAnswer: 80, conceptTag: "Place Value", explanation: "8 is in the tens place, so place value is 80." },
      { id: 5, expression: "How many items make 1 DOZEN?", correctAnswer: 12, conceptTag: "Vocabulary Math", explanation: "1 Dozen = 12." },
      { id: 6, expression: "20 + ? = 65", correctAnswer: 45, conceptTag: "Missing Addend", explanation: "65 - 20 = 45." },
      { id: 7, expression: "What is HALF of 48?", correctAnswer: 24, conceptTag: "Half Concept", explanation: "48 / 2 = 24." },
      { id: 8, expression: "Convert 2 Meters to Centimeters (1 m = 100 cm)", correctAnswer: 200, conceptTag: "Measurement", explanation: "2 m = 200 cm." },
      { id: 9, expression: "Which is SMALLER: 142 or 124?", correctAnswer: 124, conceptTag: "Comparison", explanation: "124 is smaller than 142." },
      { id: 10, expression: "3 x 9 = ?", correctAnswer: 27, conceptTag: "Multiplication Table 3", explanation: "3 x 9 = 27." }
    ]
  },
  {
    id: "mental-olympiad-g3",
    title: "Grade 3 - Number Bonds & Fractions",
    category: "mental",
    level: "Grade 3",
    topic: "3-Digit Mental Math, Tables 2-12, Fractions & Time",
    description: "Olympiad challenge drill for Grade 3 math champions.",
    questionCount: 10,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "125 + 275 = ?", correctAnswer: 400, conceptTag: "3-Digit Number Bonds", explanation: "125 + 275 = 400." },
      { id: 2, expression: "12 x 8 = ?", correctAnswer: 96, conceptTag: "Multiplication Table 12", explanation: "12 x 8 = 96." },
      { id: 3, expression: "500 - 185 = ?", correctAnswer: 315, conceptTag: "3-Digit Subtraction", explanation: "500 - 185 = 315." },
      { id: 4, expression: "How many minutes are in 3 HOURS?", correctAnswer: 180, conceptTag: "Time Conversion", explanation: "3 x 60 = 180 Mins." },
      { id: 5, expression: "What is THRICE of 15?", correctAnswer: 45, conceptTag: "Vocabulary Math", explanation: "15 x 3 = 45." },
      { id: 6, expression: "Identify numerator in fraction 3/8", correctAnswer: 3, conceptTag: "Fractions", explanation: "In 3/8, the top number 3 is the numerator." },
      { id: 7, expression: "7 x 9 = ?", correctAnswer: 63, conceptTag: "Multiplication Table 7", explanation: "7 x 9 = 63." },
      { id: 8, expression: "Expanded form: 400 + ? + 7 = 497", correctAnswer: 90, conceptTag: "Expanded Form", explanation: "497 = 400 + 90 + 7." },
      { id: 9, expression: "How many sides does a PENTAGON have?", correctAnswer: 5, conceptTag: "Geometry", explanation: "A pentagon has 5 sides." },
      { id: 10, expression: "What is DOUBLE of 75?", correctAnswer: 150, conceptTag: "Double Concept", explanation: "75 x 2 = 150." }
    ]
  },
  {
    id: "mental-olympiad-g4",
    title: "Grade 4 - Comprehensive Olympiad Drill",
    category: "mental",
    level: "Grade 4",
    topic: "Class 4 Complete Syllabus (Numbers, Operations, Fractions, Conversions & Geometry)",
    description: "Strictly aligned with Mental Maths Olympiad Class 4 syllabus.",
    questionCount: 10,
    timeLimitSeconds: 240,
    questions: generateGrade4OlympiadQuestions(10)
  },
  {
    id: "mental-olympiad-g5",
    title: "Grade 5 - Decimals, Percent & Factors",
    category: "mental",
    level: "Grade 5",
    topic: "Multiplication Tables 2-20, Decimals, BODMAS & LCM",
    description: "Mental Maths Olympiad Grade 5 prep.",
    questionCount: 10,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "16 x 7 = ?", correctAnswer: 112, conceptTag: "Speed Multiplication", explanation: "16 x 7 = 112." },
      { id: 2, expression: "What is 25% of 200?", correctAnswer: 50, conceptTag: "Percentages", explanation: "25% = 1/4th of 200 = 50." },
      { id: 3, expression: "Find LCM of 6 and 8", correctAnswer: 24, conceptTag: "LCM & HCF", explanation: "Least common multiple of 6 and 8 is 24." },
      { id: 4, expression: "BODMAS: 10 + 5 x 4 = ?", correctAnswer: 30, conceptTag: "BODMAS Rule", explanation: "Multiply first: 5 x 4 = 20, then add 10 = 30." },
      { id: 5, expression: "15 x 12 = ?", correctAnswer: 180, conceptTag: "Speed Multiplication", explanation: "15 x 12 = 180." },
      { id: 6, expression: "0.75 + 0.45 = ? (Answer in decimals x 100, e.g. 1.20 -> 120)", correctAnswer: 120, conceptTag: "Decimals Addition", explanation: "0.75 + 0.45 = 1.20." },
      { id: 7, expression: "How many degrees are in a STRAIGHT ANGLE?", correctAnswer: 180, conceptTag: "Geometry Angles", explanation: "A straight angle is 180 degrees." },
      { id: 8, expression: "Perimeter of a square with side 15 cm = ?", correctAnswer: 60, conceptTag: "Mensuration", explanation: "Perimeter = 4 x 15 = 60 cm." },
      { id: 9, expression: "19 x 6 = ?", correctAnswer: 114, conceptTag: "Table 19", explanation: "19 x 6 = 114." },
      { id: 10, expression: "Convert 3.5 kg to grams (1 kg = 1000g)", correctAnswer: 3500, conceptTag: "Measurement", explanation: "3.5 x 1000 = 3500 grams." }
    ]
  },
  {
    id: "mental-olympiad-g6",
    title: "Grade 6 - Ratio, Integers & Prime Factors",
    category: "mental",
    level: "Grade 6",
    topic: "Integers, Ratios, Algebra Basics & Area",
    description: "Mental Maths Olympiad Grade 6 advanced drill.",
    questionCount: 10,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "(-15) + (+28) = ?", correctAnswer: 13, conceptTag: "Integers", explanation: "-15 + 28 = 13." },
      { id: 2, expression: "If Ratio A:B is 2:3 and B = 15, what is A?", correctAnswer: 10, conceptTag: "Ratios", explanation: "3 units = 15 => 1 unit = 5 => 2 units = 10." },
      { id: 3, expression: "18 x 15 = ?", correctAnswer: 270, conceptTag: "Speed Multiplication", explanation: "18 x 15 = 270." },
      { id: 4, expression: "Area of a rectangle with length 14 cm & width 8 cm = ?", correctAnswer: 112, conceptTag: "Area Calculation", explanation: "14 x 8 = 112 sq cm." },
      { id: 5, expression: "Simplify: 4^3 (4 cubed) = ?", correctAnswer: 64, conceptTag: "Exponents", explanation: "4 x 4 x 4 = 64." },
      { id: 6, expression: "Find HCF of 24 and 36", correctAnswer: 12, conceptTag: "HCF", explanation: "Highest common factor of 24 and 36 is 12." },
      { id: 7, expression: "If 3x + 5 = 26, find x", correctAnswer: 7, conceptTag: "Linear Equations", explanation: "3x = 21 => x = 7." },
      { id: 8, expression: "What is 15% of 400?", correctAnswer: 60, conceptTag: "Percentages", explanation: "10% of 400 is 40, 5% is 20 => Total 60." },
      { id: 9, expression: "Complementary angle to 35 degrees = ? (Sum = 90)", correctAnswer: 55, conceptTag: "Angles", explanation: "90 - 35 = 55 degrees." },
      { id: 10, expression: "25 x 24 = ?", correctAnswer: 600, conceptTag: "Vedic Shortcut Math", explanation: "25 x 24 = (25 x 4) x 6 = 100 x 6 = 600." }
    ]
  },
  {
    id: "mental-olympiad-g7",
    title: "Grade 7 - Algebraic & Geometric Agility",
    category: "mental",
    level: "Grade 7",
    topic: "Linear Equations, Triangle Properties, Profit & Loss",
    description: "Grade 7 Olympiad challenge set.",
    questionCount: 10,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "If CP = 400 and SP = 480, find Profit Percentage (%)", correctAnswer: 20, conceptTag: "Profit & Loss", explanation: "Profit = 80. (80/400) x 100 = 20%." },
      { id: 2, expression: "Pythagorean Triple: In a right triangle with legs 6 and 8, Hypotenuse = ?", correctAnswer: 10, conceptTag: "Pythagoras Theorem", explanation: "sqrt(6^2 + 8^2) = sqrt(36 + 64) = 10." },
      { id: 3, expression: "Solve for y: 5y - 12 = 38", correctAnswer: 10, conceptTag: "Linear Equations", explanation: "5y = 50 => y = 10." },
      { id: 4, expression: "Sum of interior angles of a QUADRILATERAL = ?", correctAnswer: 360, conceptTag: "Geometry", explanation: "Sum of angles in 4-sided polygon = 360 degrees." },
      { id: 5, expression: "27 x 11 = ?", correctAnswer: 297, conceptTag: "Vedic 11 Shortcut", explanation: "27 x 11 = 2 (2+7) 7 = 297." },
      { id: 6, expression: "If speed = 60 km/h, distance covered in 2.5 hours = ? km", correctAnswer: 150, conceptTag: "Speed Distance Time", explanation: "Distance = 60 x 2.5 = 150 km." },
      { id: 7, expression: "Supplementary angle to 115 degrees = ? (Sum = 180)", correctAnswer: 65, conceptTag: "Angles", explanation: "180 - 115 = 65 degrees." },
      { id: 8, expression: "What is 35 x 35? (Square of 35)", correctAnswer: 1225, conceptTag: "Vedic Squaring", explanation: "3 x 4 = 12, attach 25 => 1225." },
      { id: 9, expression: "Evaluate: (-4)^3 = ?", correctAnswer: -64, conceptTag: "Negative Exponents", explanation: "-4 x -4 x -4 = -64." },
      { id: 10, expression: "Simple Interest on Rs 1000 at 5% p.a. for 4 years = ?", correctAnswer: 200, conceptTag: "Simple Interest", explanation: "(1000 x 5 x 4) / 100 = 200." }
    ]
  },
  {
    id: "mental-olympiad-g8",
    title: "Grade 8 - Advanced Algebraic Speed",
    category: "mental",
    level: "Grade 8",
    topic: "Exponent Laws, Polynomial Expansion, Volume & Surface Area",
    description: "Grade 8 Olympiad standard drill.",
    questionCount: 10,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Value of (105)^2 using algebraic identity = ?", correctAnswer: 11025, conceptTag: "Algebraic Identities", explanation: "(100+5)^2 = 10000 + 1000 + 25 = 11025." },
      { id: 2, expression: "Cube root of 1728 = ?", correctAnswer: 12, conceptTag: "Cube Roots", explanation: "12 x 12 x 12 = 1728." },
      { id: 3, expression: "Volume of a cube with side 7 cm = ? cm^3", correctAnswer: 343, conceptTag: "Volume", explanation: "7 x 7 x 7 = 343." },
      { id: 4, expression: "If 2^(x+1) = 32, find x", correctAnswer: 4, conceptTag: "Exponents", explanation: "32 = 2^5. So x+1 = 5 => x = 4." },
      { id: 5, expression: "98 x 97 = ? (Vedic Nikhilam Method)", correctAnswer: 9506, conceptTag: "Vedic Multiplication", explanation: "(98-3)(97-2) => 95 | 06 = 9506." },
      { id: 6, expression: "Compound Interest on Rs 10,000 at 10% for 2 years = ?", correctAnswer: 2100, conceptTag: "Compound Interest", explanation: "CI = 10000 x (1.1^2 - 1) = 2100." },
      { id: 7, expression: "Factorize: x^2 - 81 = 0. Find positive root x", correctAnswer: 9, conceptTag: "Quadratic Roots", explanation: "x^2 = 81 => x = 9." },
      { id: 8, expression: "Probability of getting an EVEN number on rolling a fair die (Answer in %)", correctAnswer: 50, conceptTag: "Probability", explanation: "3 even numbers out of 6 => 3/6 = 50%." },
      { id: 9, expression: "Square root of 5625 = ?", correctAnswer: 75, conceptTag: "Square Roots", explanation: "7 x 8 = 56, end 25 => 75." },
      { id: 10, expression: "Sum of interior angles of a REGULAR HEXAGON = ?", correctAnswer: 720, conceptTag: "Polygons", explanation: "(6-2) x 180 = 720 degrees." }
    ]
  },
  {
    id: "mental-olympiad-g9",
    title: "Grade 9 - Elite Olympiad Benchmark",
    category: "mental",
    level: "Grade 9",
    topic: "Number Theory, Coordinate Geometry, Trigonometric Ratios & Quadratics",
    description: "Peak mental agility test for Grade 9 Olympiad aspirants.",
    questionCount: 10,
    timeLimitSeconds: 240,
    questions: [
      { id: 1, expression: "Value of sin(30°) + cos(60°) = ? (Multiply answer by 10, e.g., 1.0 -> 10)", correctAnswer: 10, conceptTag: "Trigonometry", explanation: "sin(30°) = 0.5, cos(60°) = 0.5. Sum = 1.0." },
      { id: 2, expression: "Distance between points (0,0) and (9,12) = ?", correctAnswer: 15, conceptTag: "Coordinate Geometry", explanation: "sqrt(9^2 + 12^2) = sqrt(81 + 144) = sqrt(225) = 15." },
      { id: 3, expression: "If roots of x^2 - 12x + k = 0 are equal, find k", correctAnswer: 36, conceptTag: "Quadratic Discriminant", explanation: "b^2 - 4ac = 0 => 144 - 4k = 0 => k = 36." },
      { id: 4, expression: "103 x 107 = ?", correctAnswer: 11021, conceptTag: "Base Multiplication", explanation: "(103+7)(100) + (3x7) = 11021." },
      { id: 5, expression: "Remainder when 4^100 is divided by 5? (Euler Totient / Pattern)", correctAnswer: 1, conceptTag: "Modular Arithmetic", explanation: "4 = -1 mod 5 => (-1)^100 = 1." },
      { id: 6, expression: "If tan(A) = 4/3, what is sec(A)? (Express as 10 x sec(A), e.g. 5/3 -> 1.666 -> 16.6)", correctAnswer: 16, conceptTag: "Trigonometric Identities", explanation: "sec(A) = sqrt(1 + 16/9) = 5/3 = 1.66." },
      { id: 7, expression: "Sum of roots of quadratic equation 2x^2 - 16x + 9 = 0", correctAnswer: 8, conceptTag: "Vieta's Formulas", explanation: "Sum = -b/a = -(-16)/2 = 8." },
      { id: 8, expression: "What is 999 x 999?", correctAnswer: 998001, conceptTag: "Vedic Multiplication", explanation: "(999-1)|001 = 998001." },
      { id: 9, expression: "Area of triangle with sides 13, 14, 15 (Heron's Formula) = ?", correctAnswer: 84, conceptTag: "Heron's Formula", explanation: "s = 21. sqrt(21 x 8 x 7 x 6) = 84." },
      { id: 10, expression: "Number of diagonals in a 10-sided polygon (Decagon) = ?", correctAnswer: 35, conceptTag: "Combinatorics Geometry", explanation: "n(n-3)/2 = 10(7)/2 = 35." }
    ]
  }
];

export function getMentalQuestionSetById(id: string): QuestionSet | undefined {
  return MENTAL_QUESTION_SETS.find((set) => set.id === id);
}
