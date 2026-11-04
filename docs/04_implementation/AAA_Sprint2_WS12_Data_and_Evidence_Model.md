# AAA SPRINT 2 — WS-12 DATA AND EVIDENCE MODEL
## Discovery Session Schema, Triangulated Evidence & Progress Comparison

**Document Reference:** `AAA-S2-DATA-WS12-01`  
**Phase:** Stage 4 — Sprint 2 Implementation (WS-12 Academic Model)  
**Governing Authority:** Neha Patil (Academic Director) & Nitin Patil (Tech Lead)  
**Date:** 04 November 2026  
**Status:** 🟡 **AUTHORIZED SPECIFICATION**

---

## 1. Core TypeScript Interface Specifications

The authoritative data model governing Discovery Sessions is specified below:

```typescript
/**
 * @license Apache-2.0
 * Arnav Abacus Academy — Discovery Session Academic Schema
 */

export type DevelopmentalBand = "Exploring" | "Developing" | "Secure" | "Extending";

export interface TriangulatedEvidence {
  teacherObservation: string;       // Direct educator observations during bead manipulation
  parentContextualInsights: string; // Parent background on homework habits and math confidence
  studentArtifactNotes: string;     // Observations from worksheet attempts and bead placement
}

export interface DimensionAssessment {
  dimensionId: string;              // e.g. "DIM_NUM_SENSE", "DIM_BEAD_VIS"
  dimensionName: string;            // Human-readable dimension title
  frameworkOption: "A" | "B";       // Tracks Stage 2 Baseline (A) vs Specialized Model (B)
  band: DevelopmentalBand;          // 4 standard developmental bands
  evidence: TriangulatedEvidence;   // 3 evidence sources
  growthOpportunities: string[];    // Encouraging next developmental milestones
}

export interface CourseTrackRecommendation {
  recommendedCourse: 
    | "Abacus Mathematics (Ages 4.5–9)"
    | "Vedic Mathematics (Ages 9–14)"
    | "Mental Mathematics (Ages 6–14)"
    | "School Mathematics (Grades 1–10)"
    | "IPM & Olympiad Mathematics (Grades 2–9)";
  initialLevel: string;             // e.g. "Junior Soroban Level 1", "Foundation Level 1"
  batchPacing: "Standard Pace (Max 5)" | "Intensive Foundation (Max 5)";
  recommendedDailyPracticeMins: number; // e.g. 10 to 15 mins
  educatorPersonalNote: string;     // Personal message signed by Founder Neha Patil
}

export interface ChildProgressComparison {
  childId: string;                  // Anonymized child reference (synthetic or AcademyOS ID)
  baselineSessionDate: string;      // ISO 8601 date of initial discovery session
  currentEvaluationDate: string;    // ISO 8601 date of review session
  dimensionDeltas: {
    dimensionId: string;
    previousBand: DevelopmentalBand;
    currentBand: DevelopmentalBand;
    demonstratedGrowthNote: string;
  }[];
  comparativePrinciple: "Child-vs-Previous-Self"; // Explicitly asserts no cohort comparison
}

export interface DiscoverySessionRecord {
  sessionId: string;                // Format: DISC-YYYY-XXXX
  childAgeGroup: string;            // Categorical age group (e.g. "7-9")
  evaluator: "Neha Patil (MCA, Certified Trainer)"; // Exclusive academic authority
  sessionDate: string;              // ISO 8601 timestamp
  deliveryMode: "offline_wakad" | "live_online";
  assessments: DimensionAssessment[];
  recommendation: CourseTrackRecommendation;
  progressTracking?: ChildProgressComparison;
}
```

---

## 2. Forbidden Attributes Verification

The data model enforces compile-time and runtime exclusion of prohibited metrics:
- ❌ **No `childIntelligenceScore` / `cis`:** Zero aggregated intelligence metrics.
- ❌ **No `percentileRank`:** Zero comparisons against peer cohorts or school groups.
- ❌ **No `clinicalDiagnosticCode`:** Zero medical or neurological classifications.
- ❌ **No Public Exposure:** Records are strictly private to the parent and Academic Director Neha Patil.
