/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getCustomizedSet } from "../data/practiceData";
import { UserAnswer, PracticeMode, Question } from "../types";
import { Flag, ArrowLeft, ArrowRight, Clock, CheckCircle, HelpCircle, LayoutGrid, Sparkles, Trophy, Zap, Flame, Smile, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import SorobanQuizBeadCanvas from "../components/SorobanQuizBeadCanvas";
import { saveStudentAttempt, saveVisitorFeedback } from "../lib/cloudSync";
import { checkUserAccess } from "../lib/accessControl";

export default function PracticeSession() {
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const setId = searchParams.get("setId") || "abacus-jr2-direct-4row";
  const mode = (searchParams.get("mode") as PracticeMode) || "exam";
  const qCount = Number(searchParams.get("count")) || 20;

  // Stable question set per attempt (questions are fixed during attempt, but different on next attempt)
  const attemptSeedRef = useRef<string>(searchParams.get("seed") || `attempt_${Date.now()}`);
  const [questionSet] = useState(() => getCustomizedSet(setId, mode, qCount, attemptSeedRef.current));

  // Access Guard
  useEffect(() => {
    if (currentUser?.email && questionSet) {
      const access = checkUserAccess(currentUser.email, questionSet.category, questionSet.level, "quiz");
      if (!access.allowed) {
        alert(`Access Restricted: ${access.reason || "Quiz access is restricted for this level."}`);
        navigate("/practice");
      }
    }
  }, [currentUser?.email, questionSet, navigate]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, UserAnswer>>({});
  const [currentInput, setCurrentInput] = useState("");
  const [timeRemaining, setTimeRemaining] = useState<number>(questionSet.timeLimitSeconds);
  const [isFinished, setIsFinished] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [instantFeedback, setInstantFeedback] = useState<{ isCorrect: boolean; message: string; cheer: string } | null>(null);
  const [mobileNavExpanded, setMobileNavExpanded] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentQuestion: Question = questionSet.questions[currentIndex];

  const cheerMessagesCorrect = [
    "🌟 Super Fast Calculation!",
    "⚡ Absolute Math Wizard!",
    "🎉 Spot On! High Accuracy!",
    "🔥 You're On Fire!",
    "💪 Flawless Mental Math!"
  ];

  // Timer Countdown Effect
  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishAttempt();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);

  // Sync input when question index changes
  useEffect(() => {
    const existing = userAnswers[currentQuestion.id];
    setCurrentInput(existing?.answer || "");
    setInstantFeedback(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, currentQuestion.id]);

  const handleInputChange = (val: string) => {
    setCurrentInput(val);
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        answer: val,
        isFlagged: prev[currentQuestion.id]?.isFlagged || false,
        isCorrect: val !== "" ? Number(val) === currentQuestion.correctAnswer : undefined,
      },
    }));
  };

  const toggleFlag = () => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        answer: prev[currentQuestion.id]?.answer || "",
        isFlagged: !prev[currentQuestion.id]?.isFlagged,
      },
    }));
  };

  const handleCheckAnswer = () => {
    if (!currentInput) return;
    const num = Number(currentInput);
    const correct = num === currentQuestion.correctAnswer;
    const randomCheer = cheerMessagesCorrect[Math.floor(Math.random() * cheerMessagesCorrect.length)];
    
    setInstantFeedback({
      isCorrect: correct,
      message: correct
        ? `Correct Answer! ${randomCheer}`
        : `Incorrect. The correct answer is ${currentQuestion.correctAnswer}. Keep going! 💪`,
      cheer: correct ? randomCheer : "Try the next one!",
    });
  };

  const handleFinishAttempt = () => {
    const timeTaken = questionSet.timeLimitSeconds - timeRemaining;
    
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    questionSet.questions.forEach((q) => {
      const uAns = userAnswers[q.id];
      if (!uAns || uAns.answer === "" || uAns.answer === undefined) {
        unansweredCount++;
      } else if (Number(uAns.answer) === q.correctAnswer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / questionSet.questions.length) * 100);

    const resultPayload = {
      setId: questionSet.id,
      setTitle: questionSet.title,
      category: questionSet.category,
      level: questionSet.level,
      mode,
      totalQuestions: questionSet.questions.length,
      correctCount,
      wrongCount,
      unansweredCount,
      scorePercentage,
      timeTakenSeconds: timeTaken,
      completedAt: new Date().toISOString(),
      userAnswers,
      questions: questionSet.questions,
    };

    // Store in global attempts DB and sync across mobile/desktop via student email or guest email
    const guestObj = JSON.parse(localStorage.getItem("aaa_guest_user") || "{}");
    const activeEmail = (currentUser?.email || guestObj.email || "guest_visitor@arnavabacus.com").toLowerCase().trim();
    const activeName = currentUser?.name || guestObj.name || (activeEmail.includes("@") ? activeEmail.split("@")[0] : "Guest Candidate");

    const attemptRecord = {
      ...resultPayload,
      userId: currentUser?.id || activeEmail,
      userName: activeName,
      userEmail: activeEmail,
    };
    saveStudentAttempt(attemptRecord);

    // Auto-record sample visitor test into Admin Visitor Feedback Manager
    if (!currentUser && activeEmail && activeEmail.includes("@")) {
      saveVisitorFeedback({
        guestEmail: activeEmail,
        guestName: activeName,
        rating: scorePercentage >= 75 ? 5 : 4,
        message: `🎯 Completed Sample Practice Drill: ${questionSet.title} (${questionSet.level}) — Score: ${scorePercentage}% (${correctCount}/${questionSet.questions.length} Correct).`,
        sampleScore: `${scorePercentage}% (${correctCount}/${questionSet.questions.length})`,
      });
    }

    sessionStorage.setItem("last_practice_result", JSON.stringify(resultPayload));
    navigate("/practice/results");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const answeredCount = (Object.values(userAnswers) as UserAnswer[]).filter(a => a.answer !== "").length;

  return (
    <div className="bg-slate-50 min-h-screen py-6 px-3 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Breadcrumbs */}
        <div className="text-xs text-slate-500 font-semibold mb-2 flex items-center gap-1 flex-wrap">
          <span className="text-slate-700 hover:underline cursor-pointer" onClick={() => navigate("/practice")}>
            ABPP
          </span>
          <span>/</span>
          <span className="text-slate-700">{questionSet.level}</span>
          <span>/</span>
          <span className="text-slate-700">{questionSet.topic}</span>
          <span>/</span>
          <span className="text-slate-900 font-bold">{questionSet.title}</span>
        </div>

        {/* Page Title & Back Header */}
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span className="bg-vibrant-orange text-white rounded-xl p-2 inline-flex shadow-sm">
                <Zap className="w-5 h-5 md:w-6 md:h-6" />
              </span>
              {questionSet.title}
            </h1>
            <button
              onClick={() => navigate("/practice")}
              className="mt-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Hub
            </button>
          </div>

          {/* High Energy Student Motivation Tag */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-xl text-xs font-black shadow-md flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-200 animate-spin" />
            <span>Power Focus: {answeredCount} / {questionSet.questions.length} Solved</span>
          </div>
        </div>

        {/* Main Quiz View Grid (Mobile Aligned) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-start">
          
          {/* Left + Center: Question Container */}
          <div className="lg:col-span-3 flex flex-col md:flex-row gap-4 items-stretch">
            
            {/* Question Info Card */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 w-full md:w-44 shrink-0 shadow-sm flex flex-row md:flex-col justify-between items-center md:items-start">
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">Question</span>
                <h3 className="font-black text-slate-900 text-2xl md:text-3xl">
                  {currentIndex + 1} <span className="text-xs font-bold text-slate-400">/ {questionSet.questions.length}</span>
                </h3>
                <span
                  className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md mt-1 ${
                    userAnswers[currentQuestion.id]?.answer
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {userAnswers[currentQuestion.id]?.answer ? "✓ Answered" : "Not answered"}
                </span>
              </div>

              <button
                onClick={toggleFlag}
                className={`mt-0 md:mt-4 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  userAnswers[currentQuestion.id]?.isFlagged
                    ? "bg-amber-100 border-amber-300 text-amber-800"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${userAnswers[currentQuestion.id]?.isFlagged ? "fill-amber-600 text-amber-600" : ""}`} />
                {userAnswers[currentQuestion.id]?.isFlagged ? "Flagged" : "Flag"}
              </button>
            </div>

            {/* Cyan Question Canvas (Exact background style from screenshot, mobile & text pad optimized) */}
            <div className="bg-[#dff0f2] border-2 border-[#bcdfe3] rounded-2xl p-3.5 sm:p-5 flex-grow flex flex-col items-center justify-center min-h-[220px] sm:min-h-[280px] relative shadow-sm">
              
              {/* JR-1 Specific One's Place Rod Guidance Banner */}
              {setId.startsWith("abacus-jr1-") && (
                <div className="w-full bg-teal-600/90 text-white px-3 py-1.5 rounded-xl mb-3 flex items-center justify-between shadow-xs border border-teal-500/50 text-xs">
                  <span className="font-black flex items-center gap-1.5 tracking-wide">
                    🧮 Tool Guide: Use One's Place Rod (Units)
                  </span>
                  <span className="text-[10px] font-semibold text-teal-100 hidden sm:inline">
                    Single-Digit Direct Calculation
                  </span>
                </div>
              )}
              
              {/* High-Energy Student Encouragement Banner */}
              <div className="bg-white/80 backdrop-blur-xs border border-teal-200 text-teal-800 text-[11px] font-bold px-3 py-0.5 rounded-full mb-2 flex items-center gap-1.5 shadow-xs">
                <Smile className="w-3.5 h-3.5 text-orange-500" />
                <span>Focus & Calculate with Photographic Confidence!</span>
              </div>

              {/* JR-0 Specific Visual Soroban Bead Canvas */}
              {setId === "abacus-jr0-bead-identification" && (
                <div className="w-full flex flex-col items-center">
                  <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full mb-1">
                    🔍 Identify the Number from the Beads below:
                  </span>
                  <SorobanQuizBeadCanvas
                    value={currentQuestion.correctAnswer}
                    digitsCount={currentQuestion.correctAnswer >= 100 ? 3 : currentQuestion.correctAnswer >= 10 ? 2 : 1}
                    interactive={false}
                    showDigitsFooter={false}
                  />
                </div>
              )}

              {setId === "abacus-jr0-bead-representation" && (
                <div className="w-full flex flex-col items-center">
                  <div className="text-center bg-gradient-to-r from-amber-500 to-orange-500 text-white p-2 rounded-xl mb-1 shadow-xs w-full max-w-xs">
                    <span className="text-[10px] uppercase font-bold text-amber-100 block">Target Number to Represent</span>
                    <span className="text-2xl font-black font-mono tracking-wider">{currentQuestion.correctAnswer}</span>
                  </div>
                  <SorobanQuizBeadCanvas
                    value={Number(currentInput) || 0}
                    digitsCount={currentQuestion.correctAnswer >= 100 ? 3 : currentQuestion.correctAnswer >= 10 ? 2 : 1}
                    interactive={true}
                    showDigitsFooter={true}
                    onChange={(newVal) => handleInputChange(newVal.toString())}
                  />
                </div>
              )}

              {/* Vertical Column Abacus Numbers or Horizontal Vedic Math Expression */}
              {!setId.startsWith("abacus-jr0-") && (
                currentQuestion.numbers ? (
                  <div className="flex flex-col items-end text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-mono tracking-wider space-y-0.5 my-2 bg-white/70 px-5 py-3 rounded-xl border border-teal-200/60 shadow-xs">
                    {currentQuestion.numbers.map((num, idx) => (
                      <div key={idx} className="leading-tight">
                        {num > 0 ? num : `- ${Math.abs(num)}`}
                      </div>
                    ))}
                    <div className="w-full border-b-3 border-slate-900 my-1"></div>
                  </div>
                ) : (
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-mono my-4 tracking-wide bg-white/70 px-5 py-3 rounded-xl border border-teal-200/60 shadow-xs">
                    {currentQuestion.expression} = ?
                  </div>
                )
              )}

              {/* Answer Input Field (Mobile Text Pad Ready) */}
              <div className="mt-1 w-full max-w-xs flex flex-col items-center gap-2">
                <input
                  ref={inputRef}
                  type="number"
                  step="any"
                  inputMode="decimal"
                  placeholder="Type answer"
                  value={currentInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (mode === "instant") handleCheckAnswer();
                      if (currentIndex < questionSet.questions.length - 1) {
                        setCurrentIndex((prev) => prev + 1);
                      } else {
                        setShowConfirmModal(true);
                      }
                    }
                  }}
                  className="w-full bg-white border-3 border-teal-500 focus:border-vibrant-orange text-center text-xl sm:text-2xl font-black py-2 rounded-xl shadow-inner focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all"
                />

                {/* Instant Feedback Controls */}
                {mode === "instant" && (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!currentInput}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-xs py-2 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Verify Answer
                  </button>
                )}

                {/* Feedback Message */}
                {instantFeedback && (
                  <div
                    className={`mt-1 text-xs font-black px-4 py-2 rounded-xl w-full text-center shadow-xs animate-pulse ${
                      instantFeedback.isCorrect ? "bg-emerald-100 text-emerald-900 border border-emerald-300" : "bg-red-100 text-red-900 border border-red-300"
                    }`}
                  >
                    {instantFeedback.message}
                  </div>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="mt-4 flex items-center justify-between w-full pt-3 border-t border-[#c6e5e8]">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="bg-white hover:bg-slate-100 disabled:opacity-40 text-slate-800 font-bold px-3 py-1.5 rounded-xl text-xs border border-slate-300 cursor-pointer flex items-center gap-1 shadow-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Prev
                </button>

                <span className="text-xs font-black text-slate-700">
                  {currentIndex + 1} / {questionSet.questions.length}
                </span>

                {currentIndex < questionSet.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="bg-vibrant-orange hover:bg-vibrant-orange/90 text-white font-black px-4 py-1.5 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1 shadow-md"
                  >
                    Next
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : currentInput.trim() !== "" ? (
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="bg-gradient-to-r from-orange-600 via-amber-600 to-slate-900 hover:from-orange-700 hover:to-slate-950 text-white font-black px-4 py-1.5 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-lg animate-pulse"
                  >
                    Finish & Submit Attempt 🚀
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-vibrant-orange/50 text-white font-black px-4 py-1.5 rounded-xl text-xs cursor-not-allowed flex items-center gap-1 opacity-60"
                  >
                    Next
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>

          </div>

          {/* Right Sidebar: Quiz Navigation Panel (Mobile Responsive & Collapsible for 100/200 Qs) */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b pb-2 mb-3">
                <h3 className="font-black text-slate-900 text-sm sm:text-base">
                  Quiz navigation
                </h3>

                {/* Mobile Toggle Button for Grid */}
                <button
                  onClick={() => setMobileNavExpanded(!mobileNavExpanded)}
                  className="lg:hidden text-xs font-bold text-vibrant-orange flex items-center gap-1"
                >
                  {mobileNavExpanded ? "Collapse Grid" : "Show All Qs"}
                  {mobileNavExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Countdown Timer Bar */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-orange-500" /> Time Remaining
                </span>
                <span className="text-sm font-black font-mono text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                  {formatTime(timeRemaining)}
                </span>
              </div>

              {/* Progress Timeline */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full mb-4 overflow-hidden border border-slate-200">
                <div
                  className="bg-gradient-to-r from-orange-500 to-amber-500 h-full transition-all duration-300"
                  style={{ width: `${((questionSet.timeLimitSeconds - timeRemaining) / questionSet.timeLimitSeconds) * 100}%` }}
                ></div>
              </div>

              {/* Grid Numbers (Scrollable on mobile/large sets) */}
              <div className={`max-h-[260px] lg:max-h-[380px] overflow-y-auto pr-1 ${mobileNavExpanded ? "block" : "hidden lg:block"}`}>
                <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-5 gap-1.5">
                  {questionSet.questions.map((q, idx) => {
                    const uAns = userAnswers[q.id];
                    const isCurrent = idx === currentIndex;
                    const isAnswered = uAns?.answer && uAns.answer.trim() !== "";
                    const isFlagged = uAns?.isFlagged;

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-9 rounded-lg border font-bold text-xs transition-all flex items-center justify-center relative cursor-pointer ${
                          isCurrent
                            ? "ring-2 ring-vibrant-orange ring-offset-1 border-vibrant-orange font-black text-slate-900 bg-orange-100 shadow-sm"
                            : isAnswered
                            ? "bg-slate-200 border-slate-300 text-slate-800"
                            : "bg-white border-slate-300 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <span>{idx + 1}</span>
                        {isFlagged && (
                          <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-amber-500"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowConfirmModal(true)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
              >
                Finish & Submit Attempt 🚀
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Finish Attempt Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="text-xl font-black text-slate-900 mb-2">Submit Practice Sprint?</h3>
            <p className="text-xs text-slate-600 mb-6">
              You have answered <span className="font-bold text-slate-900">{answeredCount}</span> of <span className="font-bold text-slate-900">{questionSet.questions.length}</span> questions. Ready to verify your speed score?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                Continue Test
              </button>
              <button
                onClick={handleFinishAttempt}
                className="px-5 py-2 rounded-xl text-xs font-black bg-vibrant-orange hover:bg-vibrant-orange/90 text-white shadow-md cursor-pointer"
              >
                Submit Now 🎉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
