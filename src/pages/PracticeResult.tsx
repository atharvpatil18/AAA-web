/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PracticeAttemptResult } from "../types";
import { Trophy, Clock, CheckCircle2, XCircle, HelpCircle, ArrowLeft, RefreshCw, Star, Sparkles, BookOpen, Flame, Award as Medal, TrendingUp, User, ListOrdered, ShieldCheck, Check, Rocket } from "lucide-react";
import { syncStudentAttempts, AttemptRecord } from "../lib/cloudSync";

export default function PracticeResult() {
  const [result, setResult] = useState<PracticeAttemptResult | null>(null);
  const [allAttempts, setAllAttempts] = useState<AttemptRecord[]>([]);
  const [loadingSync, setLoadingSync] = useState(true);
  const navigate = useNavigate();

  // Guest User credentials
  const guestUserRaw = localStorage.getItem("aaa_guest_user");
  let guestEmail = "";
  let guestName = "";
  if (guestUserRaw) {
    try {
      const g = JSON.parse(guestUserRaw);
      guestEmail = g.email || "";
      guestName = g.name || "";
    } catch (e) {}
  }

  useEffect(() => {
    const data = sessionStorage.getItem("last_practice_result");
    if (data) {
      try {
        setResult(JSON.parse(data));
      } catch (e) {
        console.error("Failed to parse result payload", e);
      }
    }

    async function fetchAttempts() {
      try {
        const records = await syncStudentAttempts(guestEmail);
        setAllAttempts(records);
      } catch (e) {
        console.error("Failed syncing attempts for result page", e);
      } finally {
        setLoadingSync(false);
      }
    }
    fetchAttempts();
  }, [guestEmail]);

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl border border-slate-200 shadow-md max-w-sm">
          <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-800">No Attempt Found</h2>
          <p className="text-xs text-slate-500 my-3">Please start a practice session from the hub first.</p>
          <button
            onClick={() => navigate("/practice")}
            className="bg-vibrant-orange text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
          >
            Go to Practice Hub
          </button>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getCheerTitle = (pct: number) => {
    if (pct >= 90) return "🌟 Outstanding Math Champion! Outstanding Speed & Accuracy!";
    if (pct >= 75) return "⚡ Excellent Job! Super Sharp Mental Calculations!";
    if (pct >= 50) return "💪 Great Progress! Keep Practicing Daily to Reach Top Speed!";
    return "🎯 Good Attempt! Practice Makes Perfect — Retake to Excel!";
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Summary Card */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-400/20 to-transparent rounded-bl-full pointer-events-none"></div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left border-b border-slate-100 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                {result.level} • {result.mode.toUpperCase()} MODE
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {result.setTitle}
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Completed on {new Date(result.completedAt).toLocaleString()}
              </p>
            </div>

            {/* High Energy Score Badge */}
            <div className="flex flex-col items-center bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-5 rounded-2xl min-w-[150px] shadow-lg border border-indigo-800">
              <Trophy className={`w-8 h-8 ${result.scorePercentage >= 75 ? "text-amber-400 animate-bounce" : "text-slate-400"} mb-1`} />
              <span className="text-4xl font-black">{result.scorePercentage}%</span>
              <div className="flex text-amber-400 gap-0.5 mt-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                {result.scorePercentage >= 75 && <Star className="w-3.5 h-3.5 fill-current" />}
                {result.scorePercentage >= 90 && <Star className="w-3.5 h-3.5 fill-current" />}
              </div>
            </div>
          </div>

          {/* Motivational Title Banner */}
          <div className="mt-4 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-teal-500/10 border border-orange-300/60 p-3.5 rounded-xl text-center">
            <p className="text-xs md:text-sm font-black text-slate-900">
              {getCheerTitle(result.scorePercentage)}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center">
              <span className="text-xs text-slate-500 font-bold uppercase block">Correct</span>
              <span className="text-2xl font-black text-emerald-600">{result.correctCount}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center">
              <span className="text-xs text-slate-500 font-bold uppercase block">Incorrect</span>
              <span className="text-2xl font-black text-red-500">{result.wrongCount}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center">
              <span className="text-xs text-slate-500 font-bold uppercase block">Unanswered</span>
              <span className="text-2xl font-black text-slate-600">{result.unansweredCount}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center">
              <span className="text-xs text-slate-500 font-bold uppercase block">Time Taken</span>
              <span className="text-2xl font-black text-teal-600">{formatTime(result.timeTakenSeconds)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-end">
            <button
              onClick={() => navigate("/practice")}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Practice Hub
            </button>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 border-b pb-3">
            <BookOpen className="w-5 h-5 text-vibrant-orange" />
            Question-by-Question Review & Solution Breakdown
          </h2>

          <div className="space-y-4">
            {result.questions.map((q, idx) => {
              const uAns = result.userAnswers[q.id];
              const userVal = uAns?.answer;
              const isCorrect = userVal !== undefined && userVal !== "" && Number(userVal) === q.correctAnswer;
              const isUnanswered = userVal === undefined || userVal === "";

              return (
                <div
                  key={q.id}
                  className={`border-2 rounded-2xl p-4 transition-all ${
                    isCorrect
                      ? "border-emerald-200 bg-emerald-50/40"
                      : isUnanswered
                      ? "border-slate-200 bg-slate-50"
                      : "border-red-200 bg-red-50/40"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-slate-800">Question {idx + 1}</span>
                      {q.conceptTag && (
                        <span className="bg-slate-200 text-slate-800 text-[10px] font-black px-2.5 py-0.5 rounded-md">
                          {q.conceptTag}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-lg flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Correct
                        </span>
                      ) : isUnanswered ? (
                        <span className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5" /> Unanswered
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-xs font-black px-3 py-1 rounded-lg flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 text-red-600" /> Incorrect
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Display */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      {q.numbers ? (
                        <div className="text-sm font-bold text-slate-700 font-mono">
                          Numbers: <span className="font-black text-slate-900 text-base">[{q.numbers.join(", ")}]</span>
                        </div>
                      ) : (
                        <div className="text-base font-black text-slate-900 font-mono">
                          {q.expression}
                        </div>
                      )}

                      {q.explanation && (
                        <div className="mt-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                          <span className="font-bold text-slate-900">Hint / Concept:</span> {q.explanation}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs shrink-0">
                      <div>
                        <span className="text-slate-500 font-bold block">Your Answer:</span>
                        <span className={`font-black text-base ${isCorrect ? "text-emerald-700" : "text-red-600"}`}>
                          {userVal !== undefined && userVal !== "" ? userVal : "—"}
                        </span>
                      </div>

                      <div className="border-l-2 border-slate-300 pl-4">
                        <span className="text-slate-500 font-bold block">Correct Answer:</span>
                        <span className="font-black text-base text-slate-900">{q.correctAnswer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: My Performance History (Filtered for Guest / Current Practice Level) */}
        {(() => {
          const myLevelAttempts = allAttempts.filter((a) => {
            const isSetMatch = a.setId === result.setId || a.level === result.level;
            const isUserMatch = !guestEmail || a.userEmail?.toLowerCase().trim() === guestEmail.toLowerCase().trim() || a.userId?.toLowerCase().trim() === guestEmail.toLowerCase().trim();
            return isSetMatch && isUserMatch;
          });

          const bestScore = myLevelAttempts.reduce((max, a) => Math.max(max, a.scorePercentage), 0);

          return (
            <div className="mt-8 bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase mb-1">
                    <TrendingUp className="w-3 h-3 text-amber-600" /> VISITOR PERFORMANCE TRACKER
                  </div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-500" />
                    My Performance History ({result.level})
                  </h2>
                </div>
                <div className="bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
                  Total Attempts: <span className="font-black text-slate-900">{myLevelAttempts.length || 1}</span>
                </div>
              </div>

              {/* Stat Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-300 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-amber-900 tracking-wider">Current Score</span>
                  <div className="text-2xl font-black text-amber-600 mt-1">{result.scorePercentage}%</div>
                  <p className="text-[10px] text-slate-600 font-semibold mt-0.5">{result.correctCount} / {result.totalQuestions} Questions Correct</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-300 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider">Personal Best Score</span>
                  <div className="text-2xl font-black text-emerald-600 mt-1">{Math.max(bestScore, result.scorePercentage)}%</div>
                  <p className="text-[10px] text-slate-600 font-semibold mt-0.5">Top speed score recorded</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-2 border-indigo-300 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-indigo-900 tracking-wider">Time Taken</span>
                  <div className="text-2xl font-black text-indigo-600 mt-1">{formatTime(result.timeTakenSeconds)}</div>
                  <p className="text-[10px] text-slate-600 font-semibold mt-0.5">Speed test duration</p>
                </div>
              </div>

              {/* Attempt History Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-black uppercase text-[10px] tracking-wider">
                      <th className="p-3">#</th>
                      <th className="p-3">Date & Time</th>
                      <th className="p-3">Score %</th>
                      <th className="p-3">Correct / Wrong</th>
                      <th className="p-3">Time Taken</th>
                      <th className="p-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                    {/* Current attempt row */}
                    <tr className="bg-amber-50/70 font-bold border-l-4 border-amber-500">
                      <td className="p-3 text-amber-900 font-black">LATEST</td>
                      <td className="p-3">{new Date(result.completedAt).toLocaleString()}</td>
                      <td className="p-3">
                        <span className="bg-amber-200 text-amber-950 font-black px-2 py-0.5 rounded">
                          {result.scorePercentage}%
                        </span>
                      </td>
                      <td className="p-3 text-emerald-700 font-bold">
                        {result.correctCount} / {result.wrongCount}
                      </td>
                      <td className="p-3 font-mono">{formatTime(result.timeTakenSeconds)}</td>
                      <td className="p-3 text-right">
                        <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                          Just Completed
                        </span>
                      </td>
                    </tr>

                    {/* Past level attempts */}
                    {myLevelAttempts.map((att, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-3 text-slate-500 font-bold">{i + 1}</td>
                        <td className="p-3">{new Date(att.completedAt).toLocaleString()}</td>
                        <td className="p-3 font-bold text-slate-900">{att.scorePercentage}%</td>
                        <td className="p-3 text-slate-700">{att.correctCount} / {att.wrongCount}</td>
                        <td className="p-3 font-mono">{formatTime(att.timeTakenSeconds)}</td>
                        <td className="p-3 text-right text-emerald-600 font-bold text-[10px]">RECORDED</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}

        {/* SECTION 4: Live Leaderboard (Showing ONLY Current Practice Level) */}
        {(() => {
          const levelLeaderboard = allAttempts
            .filter((a) => a.setId === result.setId || a.level === result.level)
            .sort((a, b) => {
              if (b.scorePercentage !== a.scorePercentage) {
                return b.scorePercentage - a.scorePercentage;
              }
              return a.timeTakenSeconds - b.timeTakenSeconds;
            });

          // Ensure current result is included in leaderboard display
          const hasCurrentInList = levelLeaderboard.some(
            (a) => a.completedAt === result.completedAt
          );

          if (!hasCurrentInList) {
            levelLeaderboard.push({
              setId: result.setId,
              setTitle: result.setTitle,
              category: result.category,
              level: result.level,
              mode: result.mode,
              totalQuestions: result.totalQuestions,
              correctCount: result.correctCount,
              wrongCount: result.wrongCount,
              unansweredCount: result.unansweredCount,
              scorePercentage: result.scorePercentage,
              timeTakenSeconds: result.timeTakenSeconds,
              completedAt: result.completedAt,
              userId: guestEmail || "guest",
              userName: guestName || "Guest Participant",
              userEmail: guestEmail || "guest@sample.com",
            });

            levelLeaderboard.sort((a, b) => {
              if (b.scorePercentage !== a.scorePercentage) {
                return b.scorePercentage - a.scorePercentage;
              }
              return a.timeTakenSeconds - b.timeTakenSeconds;
            });
          }

          const myRankIndex = levelLeaderboard.findIndex(
            (a) => a.completedAt === result.completedAt || (guestEmail && (a.userEmail?.toLowerCase() === guestEmail.toLowerCase() || a.userId?.toLowerCase() === guestEmail.toLowerCase()))
          );

          return (
            <div className="mt-8 bg-slate-900 text-white border-2 border-amber-500/40 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider mb-1">
                    <Trophy className="w-3.5 h-3.5 fill-slate-950" /> PRACTICE LEVEL LEADERBOARD
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                    🏆 Live Leaderboard — {result.setTitle}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Showing top rankings strictly for <strong className="text-amber-400">{result.level} (100 Qs / 10 Mins)</strong>
                  </p>
                </div>

                {myRankIndex >= 0 && (
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 px-4 py-2 rounded-2xl shadow-lg text-center font-black text-xs shrink-0">
                    <span className="text-[10px] uppercase block tracking-wider text-slate-950/80">YOUR RANK</span>
                    <span className="text-lg">#{myRankIndex + 1} of {levelLeaderboard.length}</span>
                  </div>
                )}
              </div>

              {/* Leaderboard Table */}
              <div className="overflow-x-auto border border-slate-800 rounded-2xl relative z-10">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-amber-400 font-black uppercase text-[10px] tracking-wider border-b border-slate-800">
                      <th className="p-3.5 text-center">Rank</th>
                      <th className="p-3.5">Participant Name</th>
                      <th className="p-3.5">Level</th>
                      <th className="p-3.5">Score %</th>
                      <th className="p-3.5">Time Taken</th>
                      <th className="p-3.5 text-right">Date Completed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-medium">
                    {levelLeaderboard.slice(0, 15).map((entry, idx) => {
                      const isMe =
                        entry.completedAt === result.completedAt ||
                        (guestEmail && (entry.userEmail?.toLowerCase() === guestEmail.toLowerCase() || entry.userId?.toLowerCase() === guestEmail.toLowerCase()));

                      return (
                        <tr
                          key={idx}
                          className={`transition-colors ${
                            isMe
                              ? "bg-amber-500/20 text-white font-black border-l-4 border-amber-400 ring-1 ring-amber-400/30"
                              : "hover:bg-slate-800/50 text-slate-300"
                          }`}
                        >
                          <td className="p-3.5 text-center font-black">
                            {idx === 0 ? (
                              <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 text-xs px-2.5 py-0.5 rounded-md shadow">
                                🥇 #1
                              </span>
                            ) : idx === 1 ? (
                              <span className="inline-flex items-center gap-1 bg-slate-300 text-slate-950 text-xs px-2.5 py-0.5 rounded-md shadow">
                                🥈 #2
                              </span>
                            ) : idx === 2 ? (
                              <span className="inline-flex items-center gap-1 bg-amber-700 text-white text-xs px-2.5 py-0.5 rounded-md shadow">
                                🥉 #3
                              </span>
                            ) : (
                              <span className="text-slate-400 font-mono text-xs">#{idx + 1}</span>
                            )}
                          </td>

                          <td className="p-3.5">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-white text-xs">
                                {entry.userName || entry.userEmail?.split("@")[0] || "Guest Participant"}
                              </span>
                              {isMe && (
                                <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.2 rounded uppercase tracking-wider">
                                  YOU
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              {entry.userEmail ? `${entry.userEmail.slice(0, 3)}***@${entry.userEmail.split("@")[1] || ""}` : "Guest Candidate"}
                            </span>
                          </td>

                          <td className="p-3.5">
                            <span className="bg-slate-800 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded border border-slate-700">
                              {entry.level}
                            </span>
                          </td>

                          <td className="p-3.5">
                            <span className={`font-black text-sm ${entry.scorePercentage >= 80 ? "text-emerald-400" : "text-amber-400"}`}>
                              {entry.scorePercentage}%
                            </span>
                          </td>

                          <td className="p-3.5 font-mono text-slate-300">
                            {formatTime(entry.timeTakenSeconds)}
                          </td>

                          <td className="p-3.5 text-right text-[10px] text-slate-400 font-mono">
                            {new Date(entry.completedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}
