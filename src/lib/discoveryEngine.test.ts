/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Arnav Abacus Academy (AAA) — WS-12 Unit Test & Verification Script
 * Governing Determination: MGT-DET-S4-S2-AUTH-01
 * Synthetic Test Data Mandate: Zero Live Minor PII
 */

import {
  evaluateTrackPlacement,
  validateNonClinicalNarrative,
  compareChildProgress,
  OPTION_D_DIMENSIONS
} from "./discoveryEngine";
import { DiscoverySessionRecord, OptionDDimensionId, DevelopmentalBand } from "../types/discovery";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`TEST ASSERTION FAILED: ${message}`);
  }
  console.log(`✓ PASS: ${message}`);
}

console.log("=== AAA WS-12 DISCOVERY FRAMEWORK UNIT TEST SUITE ===");

// 1. Verify 6 Option D Dimensions Exist
const dimensionKeys = Object.keys(OPTION_D_DIMENSIONS) as OptionDDimensionId[];
assert(dimensionKeys.length === 6, "Exactly 6 Option D dimensions must be defined");
assert(OPTION_D_DIMENSIONS.DIM_NUM_SENSE.name === "Number Sense & Sensory Anchor", "D1 title verified");
assert(OPTION_D_DIMENSIONS.DIM_FINE_MOTOR.name === "Fine-Motor Dexterity & Bilateral Coordination", "D2 title verified");
assert(OPTION_D_DIMENSIONS.DIM_WORKING_MEMORY.name === "Working Memory & Mental Storage", "D3 title verified");
assert(OPTION_D_DIMENSIONS.DIM_PATTERN_RECOG.name === "Pattern Recognition & Complements", "D4 title verified");
assert(OPTION_D_DIMENSIONS.DIM_CALC_HABITS.name === "Calculation Habits & Verification Reflex", "D5 title verified");
assert(OPTION_D_DIMENSIONS.DIM_COG_FLEX.name === "Cognitive Flexibility & Self-Correction", "D6 title verified");

// 2. Test Placement Logic: Abacus Mathematics (Age 5, Sensory Dependent)
const abacusBands: Record<OptionDDimensionId, DevelopmentalBand> = {
  DIM_NUM_SENSE: "Exploring",
  DIM_FINE_MOTOR: "Developing",
  DIM_WORKING_MEMORY: "Developing",
  DIM_PATTERN_RECOG: "Developing",
  DIM_CALC_HABITS: "Exploring", // Finger dependent
  DIM_COG_FLEX: "Developing"
};
const abacusRec = evaluateTrackPlacement(5.5, abacusBands);
assert(abacusRec.recommendedCourse === "Abacus Mathematics (Ages 4.5–9)", "Age 5.5 placed into Abacus Mathematics");
assert(abacusRec.initialLevel === "Junior Soroban (Level JR-1)", "Junior age placed into Junior Soroban Level JR-1");
assert(abacusRec.batchPacing === "Small Batch (Maximum 5 Students)", "Batch size strictly asserts Max 5 students");
assert(abacusRec.evaluator === "Neha Patil (MCA, Certified Trainer)", "Evaluator locked to Neha Patil");

// 3. Test Placement Logic: Vedic Mathematics (Age 10, Tables Solid, Needs Speed)
const vedicBands: Record<OptionDDimensionId, DevelopmentalBand> = {
  DIM_NUM_SENSE: "Secure", // Tables 2-9 solid
  DIM_FINE_MOTOR: "Secure",
  DIM_WORKING_MEMORY: "Developing",
  DIM_PATTERN_RECOG: "Developing",
  DIM_CALC_HABITS: "Exploring", // Margin scribbles / transcription slips
  DIM_COG_FLEX: "Developing"
};
const vedicRec = evaluateTrackPlacement(10.5, vedicBands);
assert(vedicRec.recommendedCourse === "Vedic Mathematics (Ages 9–14)", "Age 10.5 placed into Vedic Mathematics");
assert(vedicRec.batchPacing === "Small Batch (Maximum 5 Students)", "Vedic batch asserts Max 5 students");

// 4. Test Placement Logic: IPM & Olympiad Math (Age 9, High Pattern Agility)
const olympiadBands: Record<OptionDDimensionId, DevelopmentalBand> = {
  DIM_NUM_SENSE: "Secure",
  DIM_FINE_MOTOR: "Secure",
  DIM_WORKING_MEMORY: "Secure",
  DIM_PATTERN_RECOG: "Extending", // High pattern agility
  DIM_CALC_HABITS: "Secure",
  DIM_COG_FLEX: "Extending" // High flexibility
};
const olympiadRec = evaluateTrackPlacement(9.0, olympiadBands);
assert(olympiadRec.recommendedCourse === "IPM & Olympiad Mathematics (Grades 2–9)", "High pattern agility placed into IPM Olympiad Track");

// 5. Test Non-Clinical Medical Terms Guard
const cleanText = "Candidate shows enthusiastic spatial visualization and curiosity during bead exploration.";
const cleanCheck = validateNonClinicalNarrative(cleanText);
assert(cleanCheck.valid === true, "Educational positive narrative passes guard");

const clinicalText = "Candidate exhibits ADHD symptoms with dyscalculia deficit.";
const clinicalCheck = validateNonClinicalNarrative(clinicalText);
assert(clinicalCheck.valid === false, "Prohibited medical terms successfully intercepted");
assert(clinicalCheck.violation !== undefined, "Violation message generated");

// 6. Test Child-vs-Previous-Self Progress Tracking
const baselineSession: DiscoverySessionRecord = {
  sessionId: "SYNTH-DISC-001",
  childAgeGroup: "7-9",
  evaluator: "Neha Patil (MCA, Certified Trainer)",
  sessionDate: "2026-08-01T10:00:00Z",
  deliveryMode: "offline_wakad",
  assessments: [
    {
      dimensionId: "DIM_NUM_SENSE",
      dimensionName: "Number Sense & Sensory Anchor",
      band: "Developing",
      evidence: {
        teacherObservation: "Relies on tactile beads to compute sums beyond 10.",
        parentContextualInsights: "Homework takes long due to finger counting.",
        studentArtifactNotes: "Completed Soroban worksheet 1 with 8/10 accuracy."
      },
      growthOpportunities: ["Anzan mental visualization drills"]
    },
    {
      dimensionId: "DIM_CALC_HABITS",
      dimensionName: "Calculation Habits & Verification Reflex",
      band: "Exploring",
      evidence: {
        teacherObservation: "Ticks fingers under desk.",
        parentContextualInsights: "Frustrated with timed school mental tests.",
        studentArtifactNotes: "Finger counting marks visible on margins."
      },
      growthOpportunities: ["Eliminating finger counting via tactile beads"]
    }
  ],
  recommendation: abacusRec
};

const currentSession: DiscoverySessionRecord = {
  ...baselineSession,
  sessionId: "SYNTH-DISC-002",
  sessionDate: "2026-11-01T10:00:00Z",
  assessments: [
    {
      ...baselineSession.assessments[0],
      band: "Secure"
    },
    {
      ...baselineSession.assessments[1],
      band: "Developing"
    }
  ]
};

const progress = compareChildProgress(baselineSession, currentSession, "SYNTH-CHILD-77");
assert(progress.comparativePrinciple === "Child-vs-Previous-Self", "Comparative principle strictly asserts Child-vs-Previous-Self");
assert(progress.dimensionDeltas.length === 2, "Both dimensions evaluated for delta growth");
assert(progress.dimensionDeltas[0].previousBand === "Developing" && progress.dimensionDeltas[0].currentBand === "Secure", "Number sense growth recorded from Developing to Secure");
assert(progress.dimensionDeltas[1].previousBand === "Exploring" && progress.dimensionDeltas[1].currentBand === "Developing", "Calculation habits growth recorded from Exploring to Developing");

console.log("=== ALL 10 WS-12 TEST ASSERTIONS PASSED WITH ZERO DEFECTS ===");
