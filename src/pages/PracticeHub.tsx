/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ABACUS_QUESTION_SETS, VEDIC_QUESTION_SETS } from "../data/practiceData";
import { PracticeCategory, PracticeMode } from "../types";
import { Calculator, Zap, Clock, CheckCircle2, ArrowRight, BookOpen, Sparkles, Flame, Rocket, Trophy, Award, Star } from "lucide-react";

export default function PracticeHub() {
  const [activeCategory, setActiveCategory] = useState<PracticeCategory>("abacus");
  const [selectedMode, setSelectedMode] = useState<PracticeMode>("exam");
  const navigate = useNavigate();

  const currentSets = activeCategory === "abacus" ? ABACUS_QUESTION_SETS : VEDIC_QUESTION_SETS;

  const handleStartSet = (setId: string) => {
    navigate(`/practice/session?setId=${setId}&mode=${selectedMode}`);
  };

  const modeOptions: { mode: PracticeMode; label: string; timeText: string; icon: React.ReactNode; color: string; badge: string }[] = [
    {
      mode: "exam",
      label: "Standard Test (20 Qs)",
      timeText: "4 Mins Timeline",
      icon: <Clock className="w-4 h-4 text-amber-400" />,
      color: "bg-slate-900 text-white border-slate-900",
      badge: "4 Min Timed"
    },
    {
      mode: "instant",
      label: "Instant Feedback (20 Qs)",
      timeText: "4 Mins + Per Q Feedback",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      color: "bg-emerald-600 text-white border-emerald-600",
      badge: "Instant Check"
    },
    {
      mode: "speed-100-5m",
      label: "100 Qs Speed Sprint",
      timeText: "100 Qs in 5 Mins",
      icon: <Rocket className="w-4 h-4 text-orange-400 animate-bounce" />,
      color: "bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500",
      badge: "🚀 100 Qs in 5 Min"
    },
    {
      mode: "speed-100-10m",
      label: "100 Qs Speed Marathon",
      timeText: "100 Qs in 10 Mins",
      icon: <Zap className="w-4 h-4 text-yellow-300" />,
      color: "bg-gradient-to-r from-purple-700 to-indigo-700 text-white border-purple-500",
      badge: "⚡ 100 Qs in 10 Min"
    },
    {
      mode: "speed-200-20m",
      label: "200 Qs Ultimate Sprint",
      timeText: "200 Qs in 20 Mins",
      icon: <Flame className="w-4 h-4 text-red-400 animate-pulse" />,
      color: "bg-gradient-to-r from-red-600 to-rose-700 text-white border-red-500",
      badge: "🔥 200 Qs in 20 Min"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* High Energy Hero Header */}
      <section className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white py-14 px-4 md:px-8 border-b border-purple-900/40 relative overflow-hidden">
        
        {/* Decorative background glow circles */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            🌟 High-Energy Speed & Accuracy Zone
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white mb-3 leading-tight">
            Abacus & Vedic Math <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-teal-300">Practice Hub</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
            Boost visual confidence, eliminate finger counting, and calculate faster than a calculator! Choose your speed sprint challenge below.
          </p>

          {/* Motivational Cheer Badge Bar */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-3 text-xs font-bold text-amber-200">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-lg flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" /> 4-Min Timed Drills
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-lg flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5 text-orange-400" /> 100 & 200 Questions Speed Sprints
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-lg flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-yellow-400" /> Instant Verification & Analysis
            </span>
          </div>
        </div>
      </section>

      {/* Main Practice Control Hub */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-5 md:p-8">
          
          {/* Category Tabs: Abacus vs Vedic Math */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2 w-full max-w-md shadow-inner">
              <button
                onClick={() => setActiveCategory("abacus")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-sm md:text-base transition-all ${
                  activeCategory === "abacus"
                    ? "bg-vibrant-orange text-white shadow-md scale-102"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Calculator className="w-5 h-5" />
                Abacus Practice
              </button>
              <button
                onClick={() => setActiveCategory("vedic")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-sm md:text-base transition-all ${
                  activeCategory === "vedic"
                    ? "bg-vibrant-teal text-white shadow-md scale-102"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Zap className="w-5 h-5" />
                Vedic Math Practice
              </button>
            </div>
          </div>

          {/* Mode Selector Header & Buttons (Supports 4-min test & 100/200 speed sprints) */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 rounded-2xl text-white mb-8 border border-indigo-800/50 shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 border-b border-indigo-800/60 pb-3">
              <div>
                <h3 className="font-black text-base md:text-lg flex items-center gap-2 text-amber-300">
                  <Flame className="w-5 h-5 text-orange-400 animate-bounce" />
                  Select Practice Challenge Mode:
                </h3>
                <p className="text-xs text-slate-300">Choose your test duration & speed target before starting any question set.</p>
              </div>
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                5 Modes Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {modeOptions.map((opt) => {
                const isSelected = selectedMode === opt.mode;
                return (
                  <button
                    key={opt.mode}
                    onClick={() => setSelectedMode(opt.mode)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? `${opt.color} ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900 scale-102 shadow-lg`
                        : "bg-white/10 text-slate-200 border-white/15 hover:bg-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 font-black text-xs">
                      {opt.icon}
                      <span>{opt.badge}</span>
                    </div>
                    <span className="text-[11px] opacity-80 font-medium">{opt.timeText}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Sets Grid */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-vibrant-orange" />
                Level-Wise Question Sets ({currentSets.length})
              </h2>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Active Mode: <span className="font-bold text-slate-800">{modeOptions.find(m => m.mode === selectedMode)?.badge}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentSets.map((set) => {
                const questionCountDisplay = selectedMode.startsWith("speed-100")
                  ? 100
                  : selectedMode === "speed-200-20m"
                  ? 200
                  : 20;

                const timerDisplay = selectedMode === "speed-100-5m"
                  ? "5 Mins"
                  : selectedMode === "speed-100-10m"
                  ? "10 Mins"
                  : selectedMode === "speed-200-20m"
                  ? "20 Mins"
                  : "4 Mins";

                return (
                  <div
                    key={set.id}
                    className="bg-white border-2 border-slate-200 hover:border-vibrant-orange/60 rounded-2xl p-6 transition-all hover:shadow-xl flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-bl-full pointer-events-none"></div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-orange-100 text-orange-800 text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider">
                          {set.level}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-600 font-bold bg-slate-100 px-2.5 py-1 rounded-md">
                          <Clock className="w-3.5 h-3.5 text-vibrant-orange" />
                          {timerDisplay} ({questionCountDisplay} Qs)
                        </span>
                      </div>

                      <h3 className="font-black text-slate-900 text-base leading-snug group-hover:text-vibrant-orange transition-colors mb-2">
                        {set.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {set.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">
                        Topic: <span className="text-slate-800 font-bold">{set.topic.split(". ")[1] || set.topic}</span>
                      </span>
                      <button
                        onClick={() => handleStartSet(set.id)}
                        className="bg-vibrant-orange hover:bg-vibrant-orange/90 text-white text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                      >
                        Start Sprint
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
