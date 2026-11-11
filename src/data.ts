/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Program, Campaign } from "./types";

export const PROGRAMS: Program[] = [
  {
    id: "abacus",
    title: "Abacus Mathematics",
    tagline: "Structured Soroban methodology & whole-brain photographic visualization",
    targetAge: "Target Age: 4.5 - 9 Years",
    description: "The Japanese Soroban abacus is a time-tested instrument that transforms mechanical calculations into mental bead visualization. Children develop spatial storage, arithmetical speed, concentration, and concrete number confidence with zero finger counting.",
    benefits: [
      "Triggers whole brain development through bilateral left-right hemisphere activation",
      "Increases calculation speed and precision matching calculator efficiency",
      "Promotes photographic memory and long-term visualization storage",
      "Eliminates finger counting and fear of heavy numbers",
      "Eight-level structured progression with certified milestones"
    ],
    curriculum: [
      "Soroban Bead Mechanics & Place Values",
      "Addition & Subtraction Complements (Friends of 5 & 10)",
      "Anzan (Mental Bead Visualization)",
      "Multiplication & Division Fundamentals",
      "Speed Sprint Drills & Level Certifications"
    ],
    imageTheme: "orange"
  },
  {
    id: "vedic-math",
    title: "Vedic Mathematics",
    tagline: "Speed calculation shortcuts based on the 16 sacred sutras",
    targetAge: "Target Age: 9 - 14 Years",
    description: "Originating from ancient Indian mathematical treatises, Vedic Mathematics is a systematic framework of mental calculation shortcuts. It empowers middle and high school students to compute 10x to 15x faster, eliminating laborious scrap work and exam calculation fatigue.",
    benefits: [
      "Accelerates numerical evaluations by 10x to 15x",
      "Builds an elite speed and verification edge for school exams and Olympiads",
      "Dramatically minimizes rough workspace scribble errors",
      "Cross-multiplication, squaring, and dividing verification techniques",
      "Eliminates maths anxiety through intuitive mathematical patterns"
    ],
    curriculum: [
      "16 Vedic Sutras & Sub-Sutras",
      "Vertically & Crosswise Multiplication",
      "Instantaneous Square Roots & Cube Roots",
      "Algebraic Shortcuts & Factorisation",
      "Divisibility, Fractions & Verification Checks"
    ],
    imageTheme: "amber"
  },
  {
    id: "mental-math",
    title: "Mental Mathematics",
    tagline: "Cognitive agility, place-value intuition & rapid recall",
    targetAge: "Target Age: 6 - 14 Years",
    description: "Our Mental Mathematics curriculum develops rapid numerical reflexes, working memory, and place-value estimation. Designed to bridge the gap between classroom theory and timed calculations, ensuring children solve arithmetic with speed and joy.",
    benefits: [
      "Fosters rapid mental arithmetic without rough scrap-work dependency",
      "Strengthens working memory and auditory calculation reflexes",
      "Completely eliminates silly arithmetic slips under test conditions",
      "Builds intuitive estimation and percentage calculation agility",
      "Dedicated micro-batches (maximum 5 students per batch) for personalized educator pacing"
    ],
    curriculum: [
      "Number Sense & Base-10 Complements",
      "Left-to-Right Mental Arithmetic",
      "Table Agility & Factor Decomposition",
      "Fractions, Decimals & Percentage Shortcuts",
      "Timed Mental Agility Sprint Rounds"
    ],
    imageTheme: "indigo"
  },
  {
    id: "school-math",
    title: "School Mathematics Foundation",
    tagline: "Academic grade boosters aligned with CBSE, ICSE & State Boards",
    targetAge: "Target Grade: Class 5 - 10",
    description: "Aligned with CBSE, ICSE, and Maharashtra State Board curriculums, this program strengthens conceptual foundations and step-by-step problem-solving discipline. We provide systematic revision worksheets and regular mock diagnostics to ensure academic top scores.",
    benefits: [
      "Establishes precise conceptual logic and textbook syllabus mastery",
      "Ensures neat step-by-step presentation aligned with board rubrics",
      "Weekly mock-test evaluations and transparent parent progress reviews",
      "Targeted remedial mentorship to resolve individual learning gaps",
      "Dedicated micro-batches (maximum 5 students per batch) provide focused educator attention"
    ],
    curriculum: [
      "Board-Aligned Algebra & Linear Equations",
      "Geometry Proofs & Mensuration Concepts",
      "Number Systems, Fractions & Decimals",
      "Commercial Mathematics & Statistics",
      "Quarterly & Annual Board Exam Simulations"
    ],
    imageTheme: "orange"
  },
  {
    id: "ipm-olympiad",
    title: "IPM & Olympiad Mathematics",
    tagline: "Competitive exam excellence, HOTS & Olympiad readiness",
    targetAge: "Target Grade: Class 2 - 9",
    description: "Specialized competitive coaching preparing young minds for the Institute for Promotion of Mathematics (IPM), SOF International Mathematics Olympiad (IMO), and state talent searches. Focuses on non-routine reasoning, problem decomposition, and competitive time management.",
    benefits: [
      "Nurtures Higher-Order Thinking Skills (HOTS) and logical reasoning",
      "Past 10-year question paper analysis and Olympiad pattern exposure",
      "Option elimination strategies and timed sprint management",
      "Proven student achievement record at state and national competitions",
      "Dedicated micro-batches (maximum 5 students per batch) ensuring active articulation of reasoning"
    ],
    curriculum: [
      "Non-Routine Word Problem Decomposition",
      "Number Patterns, Sequences & Modular Arithmetic",
      "Combinatorics, Probability & Logic Puzzles",
      "Geometry Visualization & Coordinate Basics",
      "Full-Length Timed Olympiad Simulation Rounds"
    ],
    imageTheme: "amber"
  }
];

export const CAMPAIGNS: Record<string, Campaign> = {
  "math-phobia": {
    slug: "math-phobia",
    title: "Is Your Child Afraid of Math?",
    subtitle: "Turn Math Fear into Math Fun with Our Proven bead-visualization and Indian Vedic calculation shortcuts.",
    features: [
      "Fun & Interactive Learning style",
      "No More finger counting stress",
      "Build foundational number sense and math confidence",
      "Personalized 1-on-1 feedback attention"
    ],
    ctaText: "Book Parent Counselling Session",
    accentColor: "text-orange-600 bg-orange-50 hover:bg-orange-100",
    gradient: "from-orange-600 to-amber-500"
  },
  "competitive-exam": {
    slug: "competitive-exam",
    title: "Ace Competitive Exams with Speed Math",
    subtitle: "Give your child the elite calculation speed advantage in Olympiads, IPM, and scholarship exams.",
    features: [
      "Evaluate digits 10-15x faster",
      "Accuracy optimization checklists",
      "Precision time-management techniques",
      "Continuous simulated mock-assessments"
    ],
    ctaText: "Book Parent Counselling Session",
    accentColor: "text-amber-600 bg-amber-50 hover:bg-amber-100",
    gradient: "from-amber-600 to-yellow-500"
  },
  "brain-development": {
    slug: "brain-development",
    title: "Whole-Brain Development Through Abacus",
    subtitle: "Activate left and right brain hemispheres during the critical cognitive growth window (ages 4.5–9).",
    features: [
      "Photographic memory cultivation",
      "Laser-sharp auditory concentration",
      "Zero finger-counting dependency",
      "Certified 8-level Soroban pathway"
    ],
    ctaText: "Book Parent Counselling Session",
    accentColor: "text-teal-600 bg-teal-50 hover:bg-teal-100",
    gradient: "from-teal-600 to-emerald-500"
  }
};
