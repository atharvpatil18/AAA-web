/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Program, Campaign } from "./types";

export const PROGRAMS: Program[] = [
  {
    id: "abacus",
    title: "Abacus Learning Program",
    tagline: "Unleash whole-brain development & photographic visualization",
    targetAge: "Target Age: 4 - 14 Years",
    description: "The abacus is a time-tested mathematical instrument that transforms mechanical calculations into mental visualization. By learning to slide beads, children activate both left and right hemispheres of the brain, creating incredible spatial storage, calculation speeds, and laser-sharp focus.",
    benefits: [
      "Triggers whole brain development through left-right hemisphere integration",
      "Increases calculation speed and precision matching calculator efficiency",
      "Promotes photographic memory and long-term visualization storage",
      "Expands auditory listening capacity and general spatial concentration",
      "Completely eradicates fear of heavy digits and builds concrete academic self-belief"
    ],
    curriculum: [
      "Introduction to Beads",
      "Addition & Subtraction",
      "Visualization Techniques",
      "Multiplication & Division",
      "Decimal calculations"
    ],
    imageTheme: "orange"
  },
  {
    id: "vedic-math",
    title: "Vedic Mathematics Program",
    tagline: "Speed calculation shortcuts based on the 16 sacred sutras",
    targetAge: "Target Age: 10+ Years",
    description: "Originating from ancient Indian mathematical treatises, Vedic Mathematics is a magical system of mental calculation shortcuts. This curriculum empowers older students to compute 10x to 15x faster than standard methods, completely skipping laborious row-by-row scrap computations.",
    benefits: [
      "Accelerates numerical evaluations by 10x to 15x",
      "Builds an elite, unfair calculation speed edge for Olympiads and competitive exams",
      "Dramatically minimizes rough workspace scribble errors",
      "Installs high-speed cross-multiplication & dividing short-checks",
      "Eliminates maths anxiety using high-interest numerical shortcuts"
    ],
    curriculum: [
      "16 Vedic Sutras",
      "High-Speed Multiplication",
      "Square Roots & Cube Roots",
      "Algebraic Shortcuts",
      "Calendar & Divisibility"
    ],
    imageTheme: "amber"
  },
  {
    id: "school-math",
    title: "School Maths & Competitive Excellence",
    tagline: "Academic grade boosters & competitive exam readiness (IPM, Olympiads, Scholarships)",
    targetAge: "Target Grade: Class 1 - 10",
    description: "Aligned with CBSE, ICSE, and State Boards, our curriculum blends fundamental school concepts with advanced problem-solving tools. We prepare students for grade-level exams and competitive benchmarks like IPM, Maths Olympiads, and scholarship evaluations.",
    benefits: [
      "Establishes precise logic, foundational clarity, and competitive readiness",
      "Provides specialized prep worksheets for IPM, Olympiad, and Scholarship exams",
      "Guarantees regular mock-test evaluations and progress metrics",
      "Encourages analytical thinking beyond standard textbook methodologies",
      "Fosters numerical agility, eliminating examination anxiety"
    ],
    curriculum: [
      "IPM & Olympiad Preparation",
      "Algebra & Geometry Foundations",
      "Vedic Calculation Applications",
      "Scholarship Skill-Check Modules",
      "Mensuration & Logic Reasoning"
    ],
    imageTheme: "indigo"
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
      "Boost score confidence in 30 days",
      "Personalized 1-on-1 feedback attention"
    ],
    ctaText: "Book a Free Confidence-Booster Session",
    accentColor: "text-orange-600 bg-orange-50 hover:bg-orange-100",
    gradient: "from-orange-600 to-amber-500"
  },
  "competitive-exam": {
    slug: "competitive-exam",
    title: "Ace Competitive Exams with Speed Math",
    subtitle: "Give your child the elite, unfair calculation speed advantage in Olympiads, JEE, and scholarship exams.",
    features: [
      "Evaluate digits 10-15x faster",
      "Accuracy optimization checklists",
      "Precision time-management techniques",
      "Continuous simulated mock-assessments"
    ],
    ctaText: "Book a Free Speed Assessment",
    accentColor: "text-amber-600 bg-amber-50 hover:bg-amber-100",
    gradient: "from-amber-500 to-yellow-600"
  },
  "brain-development": {
    slug: "brain-development",
    title: "Unlock Your Child's Genius Potential",
    subtitle: "Empower whole brain spatial development and Photographic focus through our certified active abacus methods.",
    features: [
      "Photographic visual memory triggers",
      "Laser-sharp classroom concentration",
      "Multiplied creative logic pathways",
      "Enhanced listening & retention capacity"
    ],
    ctaText: "Book a Free Brain Skills Demo",
    accentColor: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100",
    gradient: "from-indigo-600 to-violet-500"
  }
};
