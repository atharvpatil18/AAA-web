/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Arnav Abacus Academy (AAA) — Discovery Session Academic Schema
 * Governing Determination: MGT-DET-S4-S2-AUTH-01 (Option D: Multi-Track Diagnostic Matrix)
 */

export type DevelopmentalBand = "Exploring" | "Developing" | "Secure" | "Extending";

export type OptionDDimensionId = 
  | "DIM_NUM_SENSE"      // 1. Number Sense & Sensory Anchor
  | "DIM_FINE_MOTOR"     // 2. Fine-Motor Dexterity & Bilateral Coordination
  | "DIM_WORKING_MEMORY" // 3. Working Memory & Mental Storage
  | "DIM_PATTERN_RECOG"  // 4. Pattern Recognition & Complements
  | "DIM_CALC_HABITS"    // 5. Calculation Habits & Verification Reflex
  | "DIM_COG_FLEX";      // 6. Cognitive Flexibility & Self-Correction

export interface DimensionMetadata {
  id: OptionDDimensionId;
  name: string;
  focusArea: string;
  pedagogicalDiagnosticPurpose: string;
}

export interface TriangulatedEvidence {
  teacherObservation: string;       // Direct educator observation during bead manipulation / dictation
  parentContextualInsights: string; // Background from parent on homework habits and math confidence
  studentArtifactNotes: string;     // Observations from worksheet attempts and bead placement accuracy
}

export interface DimensionAssessment {
  dimensionId: OptionDDimensionId;
  dimensionName: string;
  band: DevelopmentalBand;
  evidence: TriangulatedEvidence;
  growthOpportunities: string[];
}

export type RecommendedCourseTrack = 
  | "Abacus Mathematics (Ages 4.5–9)"
  | "Vedic Mathematics (Ages 9–14)"
  | "Mental Mathematics (Ages 6–14)"
  | "School Mathematics (Grades 1–10)"
  | "IPM & Olympiad Mathematics (Grades 2–9)";

export interface CourseTrackRecommendation {
  recommendedCourse: RecommendedCourseTrack;
  initialLevel: string;
  batchPacing: string; // Strictly max 5 students
  recommendedDailyPracticeMins: number;
  diagnosticRationale: string;
  educatorPersonalNote: string;
  evaluator: "Neha Patil (MCA, Certified Trainer)";
}

export interface DimensionDelta {
  dimensionId: OptionDDimensionId;
  dimensionName: string;
  previousBand: DevelopmentalBand;
  currentBand: DevelopmentalBand;
  demonstratedGrowthNote: string;
}

export interface ChildProgressComparison {
  childId: string;
  baselineSessionDate: string;
  currentEvaluationDate: string;
  comparativePrinciple: "Child-vs-Previous-Self"; // Assert zero cohort comparison
  dimensionDeltas: DimensionDelta[];
  trajectorySummary: string;
}

export interface DiscoverySessionRecord {
  sessionId: string;
  childAgeGroup: string;
  evaluator: "Neha Patil (MCA, Certified Trainer)";
  sessionDate: string;
  deliveryMode: "offline_wakad" | "live_online";
  assessments: DimensionAssessment[];
  recommendation: CourseTrackRecommendation;
  progressTracking?: ChildProgressComparison;
}
