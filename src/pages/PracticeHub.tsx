/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ABACUS_QUESTION_SETS, VEDIC_QUESTION_SETS } from "../data/practiceData";
import { PracticeCategory, PracticeMode, QuestionCountChoice } from "../types";
import { Calculator, Zap, Clock, CheckCircle2, ArrowRight, BookOpen, Sparkles, Flame, Rocket, Trophy, Award as Medal, Star, Sliders, Layers, User, Calendar, ShieldCheck, ListOrdered, AlertCircle } from "lucide-react";
import { useAuth } from "../lib/AuthContext";

export default function PracticeHub() {
  const { currentUser } = useAuth();
  const [activeCategory, setActiveCategory] = useState<PracticeCategory>("abacus");
  const [selectedMode, setSelectedMode] = useState<PracticeMode>("exam");
  const [selectedCount, setSelectedCount] = useState<QuestionCountChoice>(20);
  const [hubTab, setHubTab] = useState<"sets" | "performance" | "leaderboard" | "admin">("sets");
  const [selectedSetLeaderboard, setSelectedSetLeaderboard] = useState<string>("abacus-jr1-direct-2row");
  const [attemptsList, setAttemptsList] = useState<any[]>([]);
  const navigate = useNavigate();

  // Admin Approved Emails management state
  const [approvedEmails, setApprovedEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [adminSearch, setAdminSearch] = useState("");
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminSuccess, setAdminSuccess] = useState<string | null>(null);

  // Load approved emails list
  useEffect(() => {
    const raw = localStorage.getItem("aaa_approved_emails");
    if (raw) {
      setApprovedEmails(JSON.parse(raw));
    } else {
      const defaultEmails = ["nitinkpatil@gmail.com", "admin@arnavabacus.com"];
      localStorage.setItem("aaa_approved_emails", JSON.stringify(defaultEmails));
      setApprovedEmails(defaultEmails);
    }
  }, [hubTab]);

  // Load real leaderboard attempts (Mock data cleared)
  useEffect(() => {
    const rawAttempts = localStorage.getItem("aaa_leaderboard_attempts");
    if (rawAttempts) {
      try {
        const parsed = JSON.parse(rawAttempts);
        // Filter out any leftover mock entries
        const realOnly = parsed.filter((a: any) => !a.userId?.startsWith("mock_"));
        localStorage.setItem("aaa_leaderboard_attempts", JSON.stringify(realOnly));
        setAttemptsList(realOnly);
      } catch (e) {
        console.error("Failed to parse attempts", e);
        setAttemptsList([]);
      }
    } else {
      localStorage.setItem("aaa_leaderboard_attempts", JSON.stringify([]));
      setAttemptsList([]);
    }
  }, [hubTab]); // refresh list when user switches tabs

  const currentSets = activeCategory === "abacus" ? ABACUS_QUESTION_SETS : VEDIC_QUESTION_SETS;

  const handleStartSet = (setId: string) => {
    navigate(`/practice/session?setId=${setId}&mode=${selectedMode}&count=${selectedCount}`);
  };

  const modeOptions: { mode: PracticeMode; label: string; timeText: string; icon: React.ReactNode; color: string; badge: string }[] = [
    {
      mode: "exam",
      label: "Standard Test",
      timeText: "Timed Timeline Test",
      icon: <Clock className="w-4 h-4 text-amber-400" />,
      color: "bg-slate-900 text-white border-slate-900",
      badge: "Timed Test"
    },
    {
      mode: "instant",
      label: "Instant Feedback",
      timeText: "Verify Answer Per Question",
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
            🌟 High-Energy Abacus & Vedic Math Speed Zone
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white mb-3 leading-tight">
            Abacus & Vedic Math <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-teal-300">Practice Hub</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
            Master JVM-1 Vedic Math & Abacus levels! Choose 10 Questions, 20 Questions, or 50 Questions per set under your favorite mode.
          </p>

          {/* Motivational Cheer Badges */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-3 text-xs font-bold text-amber-200">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-lg flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" /> 10 Qs / 20 Qs / 50 Qs Options
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-lg flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5 text-orange-400" /> JVM-1 Sutras & Conversions
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
          
          {/* Dashboard Navigation Tabs */}
          <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
            <button
              onClick={() => setHubTab("sets")}
              className={`flex items-center gap-2 py-3.5 px-6 font-black text-sm border-b-4 transition-all whitespace-nowrap cursor-pointer ${
                hubTab === "sets"
                  ? "border-vibrant-orange text-vibrant-orange"
                  : "border-transparent text-slate-500 hover:text-slate-850"
              }`}
            >
              <BookOpen className="w-4.5 h-4.5" />
              Practice Topics
            </button>
            <button
              onClick={() => setHubTab("performance")}
              className={`flex items-center gap-2 py-3.5 px-6 font-black text-sm border-b-4 transition-all whitespace-nowrap cursor-pointer ${
                hubTab === "performance"
                  ? "border-vibrant-orange text-vibrant-orange"
                  : "border-transparent text-slate-500 hover:text-slate-850"
              }`}
            >
              <Medal className="w-4.5 h-4.5" />
              My Performance History
            </button>
             <button
              onClick={() => setHubTab("leaderboard")}
              className={`flex items-center gap-2 py-3.5 px-6 font-black text-sm border-b-4 transition-all whitespace-nowrap cursor-pointer ${
                hubTab === "leaderboard"
                  ? "border-vibrant-orange text-vibrant-orange"
                  : "border-transparent text-slate-500 hover:text-slate-850"
              }`}
            >
              <Trophy className="w-4.5 h-4.5" />
              Leaderboards
            </button>
            {currentUser && (currentUser.email === "admin@arnavabacus.com" || currentUser.email === "nitinkpatil@gmail.com") && (
              <button
                onClick={() => setHubTab("admin")}
                className={`flex items-center gap-2 py-3.5 px-6 font-black text-sm border-b-4 transition-all whitespace-nowrap cursor-pointer ${
                  hubTab === "admin"
                    ? "border-vibrant-orange text-vibrant-orange"
                    : "border-transparent text-slate-500 hover:text-slate-850"
                }`}
              >
                <ShieldCheck className="w-4.5 h-4.5" />
                Admin Portal
              </button>
            )}
          </div>

          {/* TAB 1: PRACTICE SETS */}
          {hubTab === "sets" && (
            <div>
              {/* Category Tabs: Abacus vs Vedic Math with Custom Visual Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
                {/* Abacus Practice Card */}
                <div
                  onClick={() => setActiveCategory("abacus")}
                  className={`bg-white rounded-2xl border-2 p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 shadow-sm ${
                    activeCategory === "abacus"
                      ? "border-vibrant-orange ring-4 ring-orange-100 shadow-md scale-102"
                      : "border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100"
                  }`}
                >
                  <span className={`text-base md:text-lg font-black mb-2.5 ${activeCategory === "abacus" ? "text-vibrant-orange" : "text-slate-800"}`}>
                    Abacus Practice
                  </span>
                  <div className="w-full h-32 rounded-xl overflow-hidden border border-slate-200 shadow-xs relative bg-slate-50 flex items-center justify-center">
                    <img
                      src="/images/abacus_practice_tab.jpg"
                      alt="Abacus Practice"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Vedic Maths Practice Card */}
                <div
                  onClick={() => setActiveCategory("vedic")}
                  className={`bg-white rounded-2xl border-2 p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 shadow-sm ${
                    activeCategory === "vedic"
                      ? "border-vibrant-teal ring-4 ring-teal-100 shadow-md scale-102"
                      : "border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100"
                  }`}
                >
                  <span className={`text-base md:text-lg font-black mb-2.5 ${activeCategory === "vedic" ? "text-vibrant-teal" : "text-slate-800"}`}>
                    Vedic Maths Practice
                  </span>
                  <div className="w-full h-32 rounded-xl overflow-hidden border border-slate-200 shadow-xs relative bg-white flex items-center justify-center p-2">
                    <img
                      src="/images/vedic_math_practice_tab.jpg"
                      alt="Vedic Maths Practice"
                      className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Mode Selector Header & Buttons */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 rounded-2xl text-white mb-8 border border-indigo-800/50 shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 border-b border-indigo-800/60 pb-3">
                  <div>
                    <h3 className="font-black text-base md:text-lg flex items-center gap-2 text-amber-300">
                      <Flame className="w-5 h-5 text-orange-400 animate-bounce" />
                      Select Practice Challenge Mode:
                    </h3>
                    <p className="text-xs text-slate-300">Choose mode type and question length (10 Qs, 20 Qs, 50 Qs).</p>
                  </div>
                  
                  {/* Question Count Selector (10 Qs, 20 Qs, 50 Qs) */}
                  <div className="flex items-center gap-2 bg-white/10 p-1 rounded-xl border border-white/20">
                    <span className="text-xs font-bold text-amber-300 px-2 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" /> Qs Count:
                    </span>
                    {([10, 20, 50] as QuestionCountChoice[]).map((count) => (
                      <button
                        key={count}
                        onClick={() => setSelectedCount(count)}
                        className={`px-3 py-1 rounded-lg font-black text-xs transition-all cursor-pointer ${
                          selectedCount === count
                            ? "bg-vibrant-orange text-white shadow-sm"
                            : "text-slate-300 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {count} Qs
                      </button>
                    ))}
                  </div>
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
                    {activeCategory === "vedic" ? "Vedic Math Topics (JVM-1 & Advanced)" : "Abacus Level-Wise Sets"} ({currentSets.length})
                  </h2>
                  <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                    Selected: <span className="font-bold text-slate-800">{selectedCount} Questions</span> per set
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentSets.map((set) => {
                    const effectiveQCount = selectedMode.startsWith("speed-100")
                      ? 100
                      : selectedMode === "speed-200-20m"
                      ? 200
                      : selectedCount;

                    const timerText = selectedMode === "speed-100-5m"
                      ? "5 Mins"
                      : selectedMode === "speed-100-10m"
                      ? "10 Mins"
                      : selectedMode === "speed-200-20m"
                      ? "20 Mins"
                      : selectedCount === 10
                      ? "2 Mins"
                      : selectedCount === 50
                      ? "8 Mins"
                      : "4 Mins";

                    return (
                      <div
                        key={set.id}
                        className="bg-white border-2 border-slate-200 hover:border-vibrant-orange/60 rounded-2xl p-6 transition-all hover:shadow-xl flex flex-col justify-between group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-teal-500/10 to-transparent rounded-bl-full pointer-events-none"></div>

                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="bg-teal-100 text-teal-900 text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider">
                              {set.level}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-slate-600 font-bold bg-slate-100 px-2.5 py-1 rounded-md">
                              <Clock className="w-3.5 h-3.5 text-vibrant-orange" />
                              {timerText} ({effectiveQCount} Qs)
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
                            Topic: <span className="text-slate-800 font-bold">{set.topic}</span>
                          </span>
                          <button
                            onClick={() => handleStartSet(set.id)}
                            className="bg-vibrant-teal hover:bg-vibrant-teal/90 text-white text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                          >
                            Start {effectiveQCount} Qs
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY PERFORMANCE */}
          {hubTab === "performance" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    Your Personal Practice Statistics
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Logged-in student: <span className="font-bold text-slate-800">{currentUser?.name}</span> ({currentUser?.id})
                  </p>
                </div>
              </div>

              {attemptsList.filter((a) => a.userId === currentUser?.id).length === 0 ? (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto">
                  <Medal className="w-12 h-12 text-slate-350 mx-auto mb-3" />
                  <h3 className="text-base font-black text-slate-800">No Attempts Recorded Yet</h3>
                  <p className="text-xs text-slate-500 mt-2 mb-6">
                    Start training in Abacus levels or Vedic mathematics topics to build up your scorecard and track calculations!
                  </p>
                  <button
                    onClick={() => setHubTab("sets")}
                    className="bg-vibrant-orange hover:bg-vibrant-orange/90 text-white text-xs font-black px-5 py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    View Practice Topics
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-white font-black uppercase tracking-wider">
                          <th className="p-4">Practice Topic</th>
                          <th className="p-4">Level</th>
                          <th className="p-4">Mode</th>
                          <th className="p-4 text-center">Score %</th>
                          <th className="p-4 text-center">Correct Qs</th>
                          <th className="p-4 text-center">Time Taken</th>
                          <th className="p-4">Completed Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-250">
                        {attemptsList
                          .filter((a) => a.userId === currentUser?.id)
                          .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
                          .map((attempt, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 font-medium text-slate-700">
                              <td className="p-4 font-bold text-slate-900">{attempt.setTitle}</td>
                              <td className="p-4">
                                <span className="bg-teal-100 text-teal-800 text-[10px] font-black px-2 py-0.5 rounded">
                                  {attempt.level}
                                </span>
                              </td>
                              <td className="p-4 font-mono font-bold uppercase text-[10px] text-slate-500">
                                {attempt.mode}
                              </td>
                              <td className="p-4 text-center">
                                <span
                                  className={`font-black text-sm px-2.5 py-1 rounded-lg ${
                                    attempt.scorePercentage >= 90
                                      ? "bg-emerald-100 text-emerald-800"
                                      : attempt.scorePercentage >= 75
                                      ? "bg-blue-100 text-blue-800"
                                      : attempt.scorePercentage >= 50
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {attempt.scorePercentage}%
                                </span>
                              </td>
                              <td className="p-4 text-center font-bold">
                                {attempt.correctCount} / {attempt.totalQuestions}
                              </td>
                              <td className="p-4 text-center font-mono font-bold text-slate-800">
                                {Math.floor(attempt.timeTakenSeconds / 60)}m {attempt.timeTakenSeconds % 60}s
                              </td>
                              <td className="p-4 text-slate-500 font-mono text-[11px]">
                                {new Date(attempt.completedAt).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LEADERBOARD */}
          {hubTab === "leaderboard" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Trophy className="w-5.5 h-5.5 text-amber-500" />
                    Global Session Leaderboards
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    See who is leading the high score list in the Wakad coaching division.
                  </p>
                </div>

                {/* Session Selector */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-700">Topic:</span>
                  <select
                    value={selectedSetLeaderboard}
                    onChange={(e) => setSelectedSetLeaderboard(e.target.value)}
                    className="bg-white border border-slate-350 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-vibrant-orange/10"
                  >
                    <optgroup label="Abacus Level-Wise Sets">
                      {ABACUS_QUESTION_SETS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title} ({s.level})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Vedic Math Topics">
                      {VEDIC_QUESTION_SETS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title} ({s.level})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Leaderboard calculations */}
              {(() => {
                const filtered = attemptsList
                  .filter((a) => a.setId === selectedSetLeaderboard)
                  .sort((a, b) => {
                    // Sort by score desc, then time Taken asc
                    if (b.scorePercentage !== a.scorePercentage) {
                      return b.scorePercentage - a.scorePercentage;
                    }
                    return a.timeTakenSeconds - b.timeTakenSeconds;
                  });

                if (filtered.length === 0) {
                  return (
                    <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-200">
                      <p className="text-xs text-slate-500 font-bold">No scores posted for this set yet. Be the first to attempt!</p>
                      <button
                        onClick={() => {
                          setHubTab("sets");
                          const matchSet = [...ABACUS_QUESTION_SETS, ...VEDIC_QUESTION_SETS].find(s => s.id === selectedSetLeaderboard);
                          if (matchSet) {
                            setActiveCategory(matchSet.category);
                          }
                        }}
                        className="mt-3 bg-vibrant-teal text-white text-xs font-black px-4 py-2 rounded-xl"
                      >
                        Launch Set Challenge
                      </button>
                    </div>
                  );
                }

                const top3 = filtered.slice(0, 3);
                const isAdmin = currentUser && (currentUser.email === "admin@arnavabacus.com" || currentUser.email === "nitinkpatil@gmail.com");

                return (
                  <div className="space-y-8">
                    {/* Visual Podium for Top 3 performers */}
                    <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-xl mx-auto pt-6 items-end text-center">
                      
                      {/* 2nd Place */}
                      {top3[1] && (
                        <div className="flex flex-col items-center">
                          <div className="relative mb-2">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-200 flex items-center justify-center border-2 border-slate-300 shadow-md">
                              <User className="w-6 h-6 text-slate-600" />
                            </div>
                            <span className="absolute -top-2 -right-2 bg-slate-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-black border border-white">2</span>
                          </div>
                          <span className="text-xs font-black text-slate-800 line-clamp-1">{top3[1].userName}</span>
                          {isAdmin && (
                            <span className="text-[10px] font-mono font-bold text-vibrant-teal block line-clamp-1">
                              {top3[1].userEmail || top3[1].userId}
                            </span>
                          )}
                          <span className="text-[10px] font-bold text-slate-500 font-mono">{top3[1].scorePercentage}% ({Math.floor(top3[1].timeTakenSeconds / 60)}m {top3[1].timeTakenSeconds % 60}s)</span>
                          <div className="w-full bg-slate-200 h-20 md:h-24 rounded-t-xl mt-3 flex items-center justify-center text-slate-600 font-black text-sm shadow-inner">
                            🥈 2nd
                          </div>
                        </div>
                      )}

                      {/* 1st Place */}
                      {top3[0] && (
                        <div className="flex flex-col items-center">
                          <div className="relative mb-2 -mt-4">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-50 flex items-center justify-center border-4 border-amber-400 shadow-lg ring-4 ring-amber-300/30">
                              <User className="w-8 h-8 text-amber-700" />
                            </div>
                            <span className="absolute -top-3 -right-3 bg-amber-400 text-slate-900 rounded-full w-7 h-7 flex items-center justify-center text-sm font-black border-2 border-white animate-bounce shadow">👑</span>
                          </div>
                          <span className="text-xs md:text-sm font-black text-slate-900 line-clamp-1">{top3[0].userName}</span>
                          {isAdmin && (
                            <span className="text-[10px] font-mono font-bold text-vibrant-teal block line-clamp-1">
                              {top3[0].userEmail || top3[0].userId}
                            </span>
                          )}
                          <span className="text-xs font-black text-amber-600 font-mono">{top3[0].scorePercentage}% ({Math.floor(top3[0].timeTakenSeconds / 60)}m {top3[0].timeTakenSeconds % 60}s)</span>
                          <div className="w-full bg-gradient-to-b from-amber-400 to-amber-500 text-slate-900 h-28 md:h-32 rounded-t-2xl mt-3 flex items-center justify-center font-black text-base shadow-lg">
                            🥇 Champion
                          </div>
                        </div>
                      )}

                      {/* 3rd Place */}
                      {top3[2] && (
                        <div className="flex flex-col items-center">
                          <div className="relative mb-2">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-50 flex items-center justify-center border-2 border-orange-300 shadow-md">
                              <User className="w-6 h-6 text-orange-800" />
                            </div>
                            <span className="absolute -top-2 -right-2 bg-orange-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-black border border-white">3</span>
                          </div>
                          <span className="text-xs font-black text-slate-800 line-clamp-1">{top3[2].userName}</span>
                          {isAdmin && (
                            <span className="text-[10px] font-mono font-bold text-vibrant-teal block line-clamp-1">
                              {top3[2].userEmail || top3[2].userId}
                            </span>
                          )}
                          <span className="text-[10px] font-bold text-slate-500 font-mono">{top3[2].scorePercentage}% ({Math.floor(top3[2].timeTakenSeconds / 60)}m {top3[2].timeTakenSeconds % 60}s)</span>
                          <div className="w-full bg-orange-200 h-16 md:h-20 rounded-t-xl mt-3 flex items-center justify-center text-orange-800 font-black text-sm shadow-inner">
                            🥉 3rd
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Full Rankings list */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden max-w-3xl mx-auto">
                      <div className="bg-slate-900 text-white p-4 font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <ListOrdered className="w-4 h-4" /> Full Scoring Table Standings
                      </div>
                      <div className="divide-y divide-slate-150">
                        {filtered.map((item, index) => {
                          const isMe = item.userId === currentUser?.id;
                          return (
                            <div
                              key={index}
                              className={`flex items-center justify-between p-4 transition-colors text-xs font-medium text-slate-700 ${
                                isMe ? "bg-amber-50/50 border-y-2 border-amber-350 font-bold" : "hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <span className={`w-6 text-center font-black ${
                                  index === 0
                                    ? "text-amber-500 text-sm"
                                    : index === 1
                                    ? "text-slate-500 text-sm"
                                    : index === 2
                                    ? "text-orange-500 text-sm"
                                    : "text-slate-400"
                                }`}>
                                  {index + 1}
                                </span>
                                <div className="flex flex-col">
                                  <span className={`text-slate-900 ${isMe ? "font-black" : ""}`}>
                                    {item.userName} {isMe && <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded-md ml-1.5 uppercase">You</span>}
                                  </span>
                                  {isAdmin && (
                                    <span className="text-[10px] font-mono text-vibrant-teal font-bold block">
                                      {item.userEmail || item.userId}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-6">
                                <span className="font-mono text-slate-500">
                                  Time: <span className="text-slate-800 font-black">{Math.floor(item.timeTakenSeconds / 60)}m {item.timeTakenSeconds % 60}s</span>
                                </span>
                                <span className={`font-black text-sm px-2 py-1 rounded ${
                                  item.scorePercentage >= 90
                                    ? "text-emerald-700 bg-emerald-50"
                                    : "text-slate-800 bg-slate-100"
                                }`}>
                                  {item.scorePercentage}% Score
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 4: ADMIN PORTAL */}
          {hubTab === "admin" && currentUser && (currentUser.email === "admin@arnavabacus.com" || currentUser.email === "nitinkpatil@gmail.com") && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-vibrant-teal" />
                    Student Access & Verification Control
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add or remove student email addresses approved to request OTP and log in.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search approved emails..."
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      className="pl-3 pr-8 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:border-vibrant-teal outline-none w-56 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Success / Error Banners */}
              {adminError && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-3.5 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}
              {adminSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3.5 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{adminSuccess}</span>
                </div>
              )}

              {/* Add New Email Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setAdminError(null);
                  setAdminSuccess(null);
                  const emailToAdd = newEmail.trim().toLowerCase();
                  if (!emailToAdd || !emailToAdd.includes("@")) {
                    setAdminError("Please enter a valid email address.");
                    return;
                  }
                  if (approvedEmails.includes(emailToAdd)) {
                    setAdminError("This email address is already approved.");
                    return;
                  }

                  const updatedList = [...approvedEmails, emailToAdd];
                  localStorage.setItem("aaa_approved_emails", JSON.stringify(updatedList));
                  setApprovedEmails(updatedList);
                  setNewEmail("");
                  setAdminSuccess(`Successfully registered ${emailToAdd} to approved student database!`);
                }}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-end gap-4"
              >
                <div className="flex-1 w-full">
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-2">
                    Approve New Student Email Address
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter student email (e.g. rohan.patil@gmail.com)"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:border-vibrant-teal focus:ring-2 focus:ring-vibrant-teal/10 outline-none bg-white transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-vibrant-teal hover:bg-vibrant-teal/90 text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-md active:scale-98 transition-all cursor-pointer whitespace-nowrap"
                >
                  Register Email
                </button>
              </form>

              {/* Email List Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-3 px-6 text-xs font-black text-slate-700 uppercase tracking-wider">
                        Approved Student Email
                      </th>
                      <th className="py-3 px-6 text-xs font-black text-slate-700 uppercase tracking-wider text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const filtered = approvedEmails.filter(email => 
                        email.toLowerCase().includes(adminSearch.toLowerCase().trim())
                      );

                      if (filtered.length === 0) {
                        return (
                          <tr>
                            <td colSpan={2} className="py-8 text-center text-xs font-bold text-slate-400">
                              No approved email matching "{adminSearch}" found.
                            </td>
                          </tr>
                        );
                      }

                      return filtered.map((email, idx) => (
                        <tr key={idx} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 px-6 text-sm font-semibold text-slate-800">
                            {email}
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            {email === "nitinkpatil@gmail.com" || email === "admin@arnavabacus.com" ? (
                              <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-1 rounded-md">
                                Protected Admin
                              </span>
                            ) : (
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to remove ${email} from approved list?`)) {
                                    setAdminError(null);
                                    setAdminSuccess(null);
                                    const updatedList = approvedEmails.filter(e => e !== email);
                                    localStorage.setItem("aaa_approved_emails", JSON.stringify(updatedList));
                                    setApprovedEmails(updatedList);
                                    setAdminSuccess(`Removed ${email} from approved list.`);
                                  }
                                }}
                                className="text-xs font-bold text-red-600 hover:text-red-800 hover:underline cursor-pointer"
                              >
                                Revoke Access
                              </button>
                            )}
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
