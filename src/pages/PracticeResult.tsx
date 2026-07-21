/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PracticeAttemptResult } from "../types";
import { Trophy, Clock, CheckCircle2, XCircle, HelpCircle, ArrowLeft, RefreshCw, Star, Sparkles, BookOpen, Flame, Award } from "lucide-react";

export default function PracticeResult() {
  const [result, setResult] = useState<PracticeAttemptResult | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = sessionStorage.getItem("last_practice_result");
    if (data) {
      try {
        setResult(JSON.parse(data));
      } catch (e) {
        console.error("Failed to parse result payload", e);
      }
    }
  }, []);

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
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center shadow-xs">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
              <span className="block text-3xl font-black text-emerald-900">{result.correctCount}</span>
              <span className="text-xs font-bold text-emerald-700">Correct Answers</span>
            </div>

            <div className="bg-red-50 border border-red-200 p-4 rounded-2xl text-center shadow-xs">
              <XCircle className="w-6 h-6 text-red-600 mx-auto mb-1" />
              <span className="block text-3xl font-black text-red-900">{result.wrongCount}</span>
              <span className="text-xs font-bold text-red-700">Incorrect</span>
            </div>

            <div className="bg-slate-100 border border-slate-200 p-4 rounded-2xl text-center shadow-xs">
              <HelpCircle className="w-6 h-6 text-slate-500 mx-auto mb-1" />
              <span className="block text-3xl font-black text-slate-800">{result.unansweredCount}</span>
              <span className="text-xs font-bold text-slate-600">Unanswered</span>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-center shadow-xs">
              <Clock className="w-6 h-6 text-amber-600 mx-auto mb-1" />
              <span className="block text-2xl font-black text-amber-900">{formatTime(result.timeTakenSeconds)}</span>
              <span className="text-xs font-bold text-amber-700">Time Spent</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate(`/practice/session?setId=${result.setId}&mode=${result.mode}`)}
              className="bg-vibrant-orange hover:bg-vibrant-orange/90 text-white font-black px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              Retake Speed Sprint
            </button>

            <button
              onClick={() => navigate("/practice")}
              className="bg-slate-900 hover:bg-slate-800 text-white font-black px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
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

      </div>
    </div>
  );
}
