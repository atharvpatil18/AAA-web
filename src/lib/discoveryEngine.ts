/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Arnav Abacus Academy (AAA) — Discovery Session Diagnostic Engine
 * Governing Determination: MGT-DET-S4-S2-AUTH-01
 * Academic Authority: Neha Patil (Founder & Academic Director)
 */

import {
  DevelopmentalBand,
  OptionDDimensionId,
  DimensionMetadata,
  CourseTrackRecommendation,
  DiscoverySessionRecord,
  ChildProgressComparison,
  DimensionDelta
} from "../types/discovery";

export const OPTION_D_DIMENSIONS: Record<OptionDDimensionId, DimensionMetadata> = {
  DIM_NUM_SENSE: {
    id: "DIM_NUM_SENSE",
    name: "Number Sense & Sensory Anchor",
    focusArea: "Concrete/Tactile vs Abstract/Mental Quantity Representation",
    pedagogicalDiagnosticPurpose: "Identifies whether child requires concrete physical beads or is ready for abstract mental computation."
  },
  DIM_FINE_MOTOR: {
    id: "DIM_FINE_MOTOR",
    name: "Fine-Motor Dexterity & Bilateral Coordination",
    focusArea: "Soroban Tool Grip & Dual-Hand Bead Movement",
    pedagogicalDiagnosticPurpose: "Determines physical readiness for high-speed pencil-holding Soroban manipulation."
  },
  DIM_WORKING_MEMORY: {
    id: "DIM_WORKING_MEMORY",
    name: "Working Memory & Mental Storage",
    focusArea: "Auditory Retention & Intermediate Calculation Holding",
    pedagogicalDiagnosticPurpose: "Assesses Anzan bead visualization potential and single-line cross multiplication capacity."
  },
  DIM_PATTERN_RECOG: {
    id: "DIM_PATTERN_RECOG",
    name: "Pattern Recognition & Complements",
    focusArea: "Friends of 10 / Base Complements & Sequence Detection",
    pedagogicalDiagnosticPurpose: "Prerequisite for Abacus Big Friends and Vedic Nikhilam mental operations."
  },
  DIM_CALC_HABITS: {
    id: "DIM_CALC_HABITS",
    name: "Calculation Habits & Verification Reflex",
    focusArea: "Finger Counting vs Margin Scribbles vs Self-Checking",
    pedagogicalDiagnosticPurpose: "Diagnoses finger-counting dependency to eliminate and need for Beejank reverse verification."
  },
  DIM_COG_FLEX: {
    id: "DIM_COG_FLEX",
    name: "Cognitive Flexibility & Self-Correction",
    focusArea: "Problem Decomposition & Error Resilience Under Testing",
    pedagogicalDiagnosticPurpose: "Differentiates exam anxiety from higher-order thinking (HOTS) readiness."
  }
};

/**
 * Strict runtime list of forbidden medical and clinical diagnosis terms.
 * Mandatory Safeguard: Discovery sessions are strictly non-clinical and educational.
 */
const FORBIDDEN_CLINICAL_TERMS = [
  "adhd",
  "add",
  "dyscalculia",
  "deficit",
  "pathology",
  "syndrome",
  "iq score",
  "child intelligence score",
  "cis score",
  "percentile ranking",
  "cohort percentile"
];

/**
 * Sanitizes and validates that narrative copy contains strictly zero clinical labeling.
 */
export function validateNonClinicalNarrative(narrativeText: string): { valid: boolean; violation?: string } {
  const lower = narrativeText.toLowerCase();
  for (const term of FORBIDDEN_CLINICAL_TERMS) {
    if (lower.includes(term)) {
      return {
        valid: false,
        violation: `Prohibited non-clinical term detected: "${term}". Discovery sessions must use supportive, educational language only.`
      };
    }
  }
  return { valid: true };
}

/**
 * Deterministic diagnostic track recommendation algorithm ratified by Neha Patil.
 */
export function evaluateTrackPlacement(
  ageYears: number,
  bands: Record<OptionDDimensionId, DevelopmentalBand>
): CourseTrackRecommendation {
  const d1 = bands.DIM_NUM_SENSE;
  const d2 = bands.DIM_FINE_MOTOR;
  const d3 = bands.DIM_WORKING_MEMORY;
  const d4 = bands.DIM_PATTERN_RECOG;
  const d5 = bands.DIM_CALC_HABITS;
  const d6 = bands.DIM_COG_FLEX;

  // Rule 1: IPM & Olympiad Mathematics (High Pattern Recognition & Cognitive Flexibility)
  if (
    ageYears >= 7 &&
    (d4 === "Secure" || d4 === "Extending") &&
    (d6 === "Secure" || d6 === "Extending")
  ) {
    return {
      recommendedCourse: "IPM & Olympiad Mathematics (Grades 2–9)",
      initialLevel: ageYears <= 9 ? "Junior Olympiad Milestone (Grades 2–4)" : "Middle School IPM Track (Grades 5–7)",
      batchPacing: "Small Batch (Maximum 5 Students)",
      recommendedDailyPracticeMins: 20,
      diagnosticRationale: "Candidate demonstrates strong pattern recognition and spontaneous problem decomposition, making them an ideal candidate for non-routine competitive mathematics.",
      educatorPersonalNote: "Your child exhibits natural mathematical curiosity. In our micro-batch of 5 students, we will channel this agility into structured IPM and IMO contest decomposition.",
      evaluator: "Neha Patil (MCA, Certified Trainer)"
    };
  }

  // Rule 2: Vedic Mathematics (Ages 9–14, Solid School Basics, Needs Speed & Margin Scribble Elimination)
  if (
    ageYears >= 9 &&
    (d1 === "Secure" || d1 === "Extending") &&
    (d5 === "Exploring" || d5 === "Developing")
  ) {
    return {
      recommendedCourse: "Vedic Mathematics (Ages 9–14)",
      initialLevel: "Level 1: High-Speed Multiplication & Beejank Checks",
      batchPacing: "Small Batch (Maximum 5 Students)",
      recommendedDailyPracticeMins: 15,
      diagnosticRationale: "Candidate has mastered foundational school addition and times tables, but calculation speed is bottlenecked by extensive margin scratch-work and unverified transcription slips.",
      educatorPersonalNote: "Vedic arithmetic will serve as a powerful speed catalyst, replacing margin scribbles with single-line mental calculations and Beejank reverse-checking habits.",
      evaluator: "Neha Patil (MCA, Certified Trainer)"
    };
  }

  // Rule 3: Abacus Mathematics (Ages 4.5–9, Concrete Sensory Anchoring Needed)
  if (
    ageYears <= 9 &&
    (d1 === "Exploring" || d1 === "Developing" || d5 === "Exploring") &&
    (d2 === "Developing" || d2 === "Secure" || d2 === "Extending")
  ) {
    const isJunior = ageYears < 6;
    return {
      recommendedCourse: "Abacus Mathematics (Ages 4.5–9)",
      initialLevel: isJunior ? "Junior Soroban (Level JR-1)" : "Foundation Abacus (Level 1)",
      batchPacing: "Small Batch (Maximum 5 Students)",
      recommendedDailyPracticeMins: 10,
      diagnosticRationale: isJunior
        ? "Young learner with emerging motor coordination. Tactile Soroban beads provide concrete physical anchors for numbers 1 to 100 without digital screen fatigue."
        : "Elementary learner currently relying on finger counting. Physical beads will bridge physical quantities to mental Anzan visualization, permanently eliminating calculation anxiety.",
      educatorPersonalNote: "In our Wakad classroom, we will gently transition your child from finger counting to effortless mental bead visualization in an encouraging, small-batch setting.",
      evaluator: "Neha Patil (MCA, Certified Trainer)"
    };
  }

  // Rule 4: Mental Mathematics (Ages 6–14, Tool-Free Mental Arithmetic & Working Memory Expansion)
  if (
    ageYears >= 6 &&
    (d3 === "Developing" || d5 === "Developing") &&
    (d1 === "Secure" || d1 === "Developing")
  ) {
    return {
      recommendedCourse: "Mental Mathematics (Ages 6–14)",
      initialLevel: "Level 1: Rapid Number Sense & Complements",
      batchPacing: "Small Batch (Maximum 5 Students)",
      recommendedDailyPracticeMins: 15,
      diagnosticRationale: "Candidate has sound basic concepts but encounters working memory overload during multi-step calculations. Needs structured auditory dictation and speed recall training.",
      educatorPersonalNote: "Through progressive mental drills, we will expand your child's auditory retention and arithmetic reflexes, building strong test-taking agility.",
      evaluator: "Neha Patil (MCA, Certified Trainer)"
    };
  }

  // Rule 5: School Mathematics (Concept Decomposition & Board Step Integrity)
  return {
    recommendedCourse: "School Mathematics (Grades 1–10)",
    initialLevel: `Grade ${Math.min(Math.max(Math.round(ageYears - 5), 1), 10)} Concept Reinforcement`,
    batchPacing: "Small Batch (Maximum 5 Students)",
    recommendedDailyPracticeMins: 20,
    diagnosticRationale: "Candidate benefits from step-by-step conceptual decomposition of school board syllabus topics, bridging visual intuition with formal exam presentation.",
    educatorPersonalNote: "We will build conceptual clarity from the ground up, ensuring your child understands the 'why' behind each school formula with zero rote cramming.",
    evaluator: "Neha Patil (MCA, Certified Trainer)"
  };
}

/**
 * Compares two discovery sessions for the same child strictly on a Child-vs-Previous-Self trajectory.
 */
export function compareChildProgress(
  baseline: DiscoverySessionRecord,
  current: DiscoverySessionRecord,
  childId: string
): ChildProgressComparison {
  const deltas: DimensionDelta[] = [];
  const bandRank: Record<DevelopmentalBand, number> = {
    Exploring: 1,
    Developing: 2,
    Secure: 3,
    Extending: 4
  };

  for (const currAssessment of current.assessments) {
    const baseAssessment = baseline.assessments.find(a => a.dimensionId === currAssessment.dimensionId);
    if (baseAssessment) {
      const prevBand = baseAssessment.band;
      const currBand = currAssessment.band;
      const growth = bandRank[currBand] - bandRank[prevBand];

      let note = "Maintained solid competency baseline.";
      if (growth > 0) {
        note = `Progressed from ${prevBand} to ${currBand}, demonstrating enhanced independent confidence.`;
      } else if (growth < 0) {
        note = "Consolidating foundations before advancing to complex multi-step drills.";
      }

      deltas.push({
        dimensionId: currAssessment.dimensionId,
        dimensionName: currAssessment.dimensionName,
        previousBand: prevBand,
        currentBand: currBand,
        demonstratedGrowthNote: note
      });
    }
  }

  return {
    childId,
    baselineSessionDate: baseline.sessionDate,
    currentEvaluationDate: current.sessionDate,
    comparativePrinciple: "Child-vs-Previous-Self",
    dimensionDeltas: deltas,
    trajectorySummary: `Evaluation confirms positive personal growth across ${deltas.filter(d => bandRank[d.currentBand] > bandRank[d.previousBand]).length} cognitive dimensions since initial baseline.`
  };
}
