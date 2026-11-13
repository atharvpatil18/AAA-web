/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Arnav Abacus Academy (AAA) — Parent Discovery Summary Report Card
 * Governing Determination: MGT-DET-S4-S2-AUTH-01
 * Academic Authority: Neha Patil (Founder & Academic Director)
 */

import React from "react";
import { 
  Sparkles, 
  Award, 
  Users, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Brain,
  BookOpen
} from "lucide-react";
import { DiscoverySessionRecord, DevelopmentalBand } from "../../types/discovery";
import { useLanguage } from "../../lib/LanguageContext";

interface ParentDiscoveryReportCardProps {
  record: DiscoverySessionRecord;
  studentDisplayName?: string;
}

const BAND_COLORS: Record<DevelopmentalBand, { bg: string; text: string; border: string }> = {
  Exploring: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  Developing: { bg: "bg-sky-50", text: "text-sky-800", border: "border-sky-200" },
  Secure: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" },
  Extending: { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-200" }
};

export default function ParentDiscoveryReportCard({
  record,
  studentDisplayName = "Candidate"
}: ParentDiscoveryReportCardProps) {
  const { language } = useLanguage();
  const { recommendation, assessments, progressTracking } = record;

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden max-w-3xl mx-auto my-6 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 md:p-8 relative">
        <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Personalised Learning Discovery Session</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          Diagnostic Observation Summary
        </h3>
        
        <p className="text-xs md:text-sm text-slate-300 mt-1">
          Candidate: <strong className="text-white">{studentDisplayName}</strong> ({record.childAgeGroup} Years) • Evaluated by Founder {language === "mr" ? "नेहा पाटील" : language === "hi" ? "नेहा पाटिल" : "Neha Patil"} at Wakad Center
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
          <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-amber-400" /> Session: {new Date(record.sessionDate).toLocaleDateString()}
          </span>
          <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg">
            <Users className="w-3.5 h-3.5 text-emerald-400" /> Mode: {record.deliveryMode === "offline_wakad" ? "Offline Classroom (Wakad)" : "Live Online"}
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        
        {/* Core Pedagogical Notice */}
        <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 text-xs text-slate-700 leading-relaxed flex items-start gap-3">
          <Brain className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 block font-bold mb-0.5">Educational Philosophy: Growth Over Percentiles</strong>
            Observations evaluate your child across four natural developmental bands (<em>Exploring, Developing, Secure, Extending</em>). We do not rank children or issue comparative percentiles; our focus is celebrating individual progress and providing the right cognitive scaffolding.
          </div>
        </div>

        {/* Six Option D Observation Dimensions */}
        <div className="space-y-4">
          <h4 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-orange-600" />
            <span>The Six Child Development Intelligence Pillars</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assessments.map((item) => {
              const color = BAND_COLORS[item.band];
              return (
                <div 
                  key={item.dimensionId} 
                  className={`p-4 rounded-2xl border ${color.border} ${color.bg} transition-all`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-black text-slate-900 leading-tight">
                      {item.dimensionName}
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${color.border} ${color.text} bg-white`}>
                      {item.band}
                    </span>
                  </div>

                  {/* Triangulated Evidence Snippet */}
                  <div className="text-[11px] text-slate-600 space-y-1">
                    <p><strong>Teacher Note:</strong> {item.evidence.teacherObservation}</p>
                    {item.evidence.studentArtifactNotes && (
                      <p className="text-slate-500 italic"><strong>Artifact:</strong> {item.evidence.studentArtifactNotes}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Course Placement Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-700 space-y-5">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-400/30">
                Official Course Placement
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white mt-2">
                {recommendation.recommendedCourse}
              </h4>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Starting Level: <strong className="text-amber-300">{recommendation.initialLevel}</strong>
              </p>
            </div>
            
            <div className="bg-slate-800/80 border border-slate-700 px-3.5 py-2 rounded-2xl text-right">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Batch Size Pacing</span>
              <span className="text-xs font-black text-emerald-400">{recommendation.batchPacing}</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-slate-200 leading-relaxed">
            <strong className="text-white block font-bold mb-1">Diagnostic Rationale:</strong>
            {recommendation.diagnosticRationale}
          </div>

          <div className="border-t border-slate-700/80 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Recommended Daily Drill: <strong>{recommendation.recommendedDailyPracticeMins} Mins/Day</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Evaluated by {recommendation.evaluator}</span>
            </div>
          </div>

          {/* Educator Handwritten-Style Personal Note */}
          <div className="bg-amber-100/10 border border-amber-400/30 rounded-2xl p-4 text-amber-200 text-xs italic leading-relaxed">
            "{recommendation.educatorPersonalNote}"
            <span className="block not-italic font-bold text-amber-300 text-right mt-2">— {language === "mr" ? "संस्थापिका नेहा पाटील" : language === "hi" ? "संस्थापिका नेहा पाटिल" : "Founder Neha Patil"}</span>
          </div>
        </div>

        {/* Child-vs-Previous-Self Progress Tracker (If Longitudinal) */}
        {progressTracking && (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Personal Progress Tracker (Child-vs-Previous-Self)</span>
              </h4>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Zero Peer Ranking
              </span>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              {progressTracking.trajectorySummary}
            </p>

            <div className="divide-y divide-slate-200/80 text-xs">
              {progressTracking.dimensionDeltas.map(delta => (
                <div key={delta.dimensionId} className="py-2.5 flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-slate-800">{delta.dimensionName}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{delta.previousBand}</span>
                    <span className="text-slate-400">→</span>
                    <span className="font-bold text-emerald-700">{delta.currentBand}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Center Attribution Footer */}
        <div className="border-t border-slate-100 pt-4 flex items-center justify-between flex-wrap gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Arnav Abacus Academy • Wakad Center, Pune • Strictly Private &amp; Confidential</span>
          </div>
          <span>{language === "mr" ? "तक्रार निवारण संपर्क: नितीन पाटील (+९१ ९०२१९ २४९६८)" : language === "hi" ? "शिकायत निवारण संपर्क: नितिन पाटिल (+९१ ९०२१९ २४९६८)" : "Grievance Contact: Nitin Patil (+91 90219 24968)"}</span>
        </div>

      </div>
    </div>
  );
}
