/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getCustomizedSet } from "../data/practiceData";
import { UserAnswer, PracticeMode, Question } from "../types";
import { Flag, ArrowLeft, ArrowRight, Clock, CheckCircle, HelpCircle, LayoutGrid, Sparkles, Trophy, Zap, Flame, Smile, Check, ChevronDown, ChevronUp, Rocket } from "lucide-react";
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

  // Ensure guest user credential exists in localStorage for uninterrupted guest practice session
  useEffect(() => {
    if (!currentUser && !localStorage.getItem("aaa_guest_user")) {
      localStorage.setItem("aaa_guest_user", JSON.stringify({ email: "guest_visitor@arnavabacus.com", name: "Guest Student" }));
    }
  }, [currentUser]);

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
  const [timeRemaining, setTimeRemaining] = useState<number>(questionSet?.timeLimitSeconds || 240);
  const [isFinished, setIsFinished] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [instantFeedback, setInstantFeedback] = useState<{ isCorrect: boolean; message: string; cheer: string } | null>(null);
  const [mobileNavExpanded, setMobileNavExpanded] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentQuestion: Question | undefined = questionSet?.questions?.[currentIndex];

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
    if (!currentQuestion) return;
    const existing = userAnswers[currentQuestion.id];
    setCurrentInput(existing?.answer || "");
    setInstantFeedback(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, currentQuestion?.id]);

  const handleInputChange = (val: string) => {
    if (!currentQuestion) return;
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
    if (!currentQuestion) return;
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
    if (!currentInput || !currentQuestion) return;
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

  if (!questionSet || !questionSet.questions || questionSet.questions.length === 0 || !currentQuestion) {
    return (
      <div className="bg-slate-50 min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 max-w-md w-full text-center shadow-xl space-y-4">
          <div className="bg-amber-100 text-amber-900 p-4 rounded-2xl font-black text-base flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-amber-600 animate-bounce" />
            Loading Speed Practice Quiz...
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Preparing your dynamic calculations drill. If the drill doesn't open automatically, click reload below.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3 rounded-xl text-xs transition-all shadow-md cursor-pointer"
          >
            Reload Quiz Session
          </button>
          <button
            onClick={() => navigate("/practice")}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer"
          >
            Back to Practice Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen max-h-screen max-w-vw overflow-hidden bg-slate-100 flex flex-col font-sans select-none">
      
      {/* 1. Sleek Compact Top Focus Header (52px height) */}
      <header className="h-13 bg-slate-900 text-white px-3 sm:px-6 flex items-center justify-between shrink-0 shadow-md border-b border-slate-800 z-20">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-vibrant-orange text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
            <Zap className="w-4.5 h-4.5 fill-current text-white" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="font-black text-xs sm:text-sm text-slate-100 truncate">{questionSet.title}</span>
              <span className="hidden md:inline-block bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                {questionSet.level}
              </span>
            </div>
            <span className="hidden sm:block text-[10px] text-slate-400 truncate">
              {questionSet.topic} • {questionSet.questions.length} Questions
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-amber-300 px-3 py-1 rounded-xl text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
            <span>{answeredCount} / {questionSet.questions.length} Solved</span>
          </div>

          <button
            onClick={() => navigate("/practice")}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Exit Drill</span>
          </button>
        </div>
      </header>

      {/* 2. Main Full-Height Viewport Container */}
      <div className="flex-1 min-h-0 overflow-hidden relative">
        
        {/* DESKTOP LAYOUT (lg+) */}
        <div className="hidden lg:grid grid-cols-12 h-full p-4 gap-4 overflow-hidden">
          
          {/* Left Main Quiz Panel (8/12 or 9/12 cols) */}
          <div className="col-span-8 xl:col-span-9 flex flex-col h-full min-h-0 gap-3">
            
            {/* Question Info & Flag Header */}
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-xs flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black uppercase text-slate-400">Question</span>
                <span className="font-black text-slate-900 text-xl">
                  {currentIndex + 1} <span className="text-xs font-bold text-slate-400">/ {questionSet.questions.length}</span>
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
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
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-xl border transition cursor-pointer ${
                  userAnswers[currentQuestion.id]?.isFlagged
                    ? "bg-amber-100 border-amber-300 text-amber-800"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${userAnswers[currentQuestion.id]?.isFlagged ? "fill-amber-600 text-amber-600" : ""}`} />
                {userAnswers[currentQuestion.id]?.isFlagged ? "Flagged" : "Flag"}
              </button>
            </div>

            {/* Center Cyan Question Canvas - Dynamic Flex Grow (No Scroll Needed!) */}
            <div className="bg-[#dff0f2] border-2 border-[#bcdfe3] rounded-2xl p-4 flex-1 min-h-0 flex flex-col items-center justify-center relative shadow-xs overflow-y-auto">
              
              {/* JR-1 Rod Guide */}
              {setId.startsWith("abacus-jr1-") && (
                <div className="bg-teal-700 text-white px-3 py-1 rounded-xl mb-2 text-xs font-bold shadow-xs">
                  🧮 Tool Guide: Use One's Place Rod (Units)
                </div>
              )}

              {/* Encouragement Banner */}
              <div className="bg-white/80 backdrop-blur-xs border border-teal-200 text-teal-800 text-[11px] font-bold px-3.5 py-0.5 rounded-full mb-2 shrink-0 flex items-center gap-1.5 shadow-xs">
                <Smile className="w-3.5 h-3.5 text-orange-500" />
                <span>Focus & Calculate with Photographic Confidence!</span>
              </div>

              {/* Soroban Bead Canvas / Numbers / Expression Container */}
              <div className="my-auto flex flex-col items-center justify-center py-1">
                {(setId === "abacus-jr0-bead-identification" || (setId === "abacus-jr0-overall" && currentQuestion.conceptTag?.includes("Identification"))) && (
                  <div className="flex flex-col items-center">
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

                {(setId === "abacus-jr0-bead-representation" || (setId === "abacus-jr0-overall" && currentQuestion.conceptTag?.includes("Representation"))) && (
                  <div className="flex flex-col items-center">
                    <div className="text-center bg-gradient-to-r from-amber-500 to-orange-500 text-white p-2 rounded-xl mb-1 shadow-xs max-w-xs">
                      <span className="text-[10px] uppercase font-bold text-amber-100 block">Target Number</span>
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

                {setId !== "abacus-jr0-bead-identification" && setId !== "abacus-jr0-bead-representation" && !(setId === "abacus-jr0-overall" && (currentQuestion.conceptTag?.includes("Identification") || currentQuestion.conceptTag?.includes("Representation"))) && (
                  currentQuestion.numbers ? (
                    <div className="flex flex-col items-end text-2xl xl:text-3xl font-black text-slate-900 font-mono tracking-wider space-y-0 bg-white/80 px-5 py-2.5 rounded-xl border border-teal-200/80 shadow-xs">
                      {currentQuestion.numbers.map((num, idx) => (
                        <div key={idx} className="leading-tight">
                          {num > 0 ? num : `- ${Math.abs(num)}`}
                        </div>
                      ))}
                      <div className="w-full border-b-3 border-slate-900 my-0.5"></div>
                    </div>
                  ) : (
                    <div className="text-2xl xl:text-3xl font-black text-slate-900 font-mono tracking-wide bg-white/80 px-6 py-3 rounded-xl border border-teal-200/80 shadow-xs">
                      {currentQuestion.expression || "5 + 3"} = ?
                    </div>
                  )
                )}
              </div>

              {/* Answer Input Box */}
              <div className="w-full max-w-xs shrink-0 flex flex-col items-center gap-2 mt-auto pt-1">
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
                  className="w-full bg-white border-3 border-teal-500 focus:border-vibrant-orange text-center text-2xl font-black py-1.5 rounded-xl shadow-inner focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all"
                />

                {mode === "instant" && (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!currentInput}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-xs py-1.5 rounded-xl transition shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Verify Answer
                  </button>
                )}

                {instantFeedback && (
                  <div
                    className={`text-xs font-black px-3 py-1 rounded-xl w-full text-center shadow-xs animate-pulse ${
                      instantFeedback.isCorrect ? "bg-emerald-100 text-emerald-900 border border-emerald-300" : "bg-red-100 text-red-900 border border-red-300"
                    }`}
                  >
                    {instantFeedback.message}
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Controls Bar */}
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-xs flex items-center justify-between shrink-0">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 font-bold px-4 py-1.5 rounded-xl text-xs transition border border-slate-300 cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              <span className="text-xs font-black text-slate-700">
                Question {currentIndex + 1} of {questionSet.questions.length}
              </span>

              {currentIndex < questionSet.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="bg-vibrant-orange hover:bg-vibrant-orange/90 text-white font-black px-6 py-1.5 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="bg-gradient-to-r from-orange-600 to-slate-900 hover:from-orange-700 text-white font-black px-5 py-1.5 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-lg animate-pulse"
                >
                  Finish & Submit Attempt 🚀
                </button>
              )}
            </div>

          </div>

          {/* Right Sidebar: Navigation Grid & Timer (4/12 or 3/12 cols) */}
          <div className="col-span-4 xl:col-span-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-full min-h-0 overflow-hidden">
            
            <div className="shrink-0">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                  <LayoutGrid className="w-4 h-4 text-slate-500" />
                  Quiz navigation
                </h3>
              </div>

              <div className="flex items-center justify-between bg-orange-50/80 border border-orange-200 rounded-xl p-2.5 mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-500 shrink-0" /> Time Remaining
                </span>
                <span className="text-sm font-black font-mono text-orange-600 bg-white px-2 py-0.5 rounded border border-orange-200 shadow-xs">
                  {formatTime(timeRemaining)}
                </span>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full mb-2 overflow-hidden border border-slate-200">
                <div
                  className="bg-gradient-to-r from-orange-500 to-amber-500 h-full transition-all duration-300"
                  style={{ width: `${((questionSet.timeLimitSeconds - timeRemaining) / questionSet.timeLimitSeconds) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Grid Numbers Scroll Area */}
            <div className="flex-1 min-h-0 overflow-y-auto pr-1 my-1">
              <div className="grid grid-cols-5 gap-1.5">
                {questionSet.questions.map((q, idx) => {
                  const uAns = userAnswers[q.id];
                  const isCurrent = idx === currentIndex;
                  const isAnswered = uAns?.answer && uAns.answer.trim() !== "";
                  const isFlagged = uAns?.isFlagged;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 rounded-lg border font-extrabold text-xs transition flex items-center justify-center relative cursor-pointer ${
                        isCurrent
                          ? "ring-2 ring-vibrant-orange ring-offset-1 border-vibrant-orange font-black text-slate-950 bg-amber-300 shadow-sm"
                          : isAnswered
                          ? "bg-slate-200 border-slate-300 text-slate-900 font-bold"
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

            {/* Sidebar Sticky Submit Button */}
            <div className="shrink-0 pt-2.5 border-t border-slate-100">
              <button
                onClick={() => setShowConfirmModal(true)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-2.5 rounded-xl text-xs transition shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Finish & Submit Attempt</span>
                <Rocket className="w-4 h-4 text-amber-400 fill-amber-400" />
              </button>
            </div>

          </div>

        </div>

        {/* MOBILE LAYOUT (<lg) */}
        <div className="lg:hidden flex flex-col h-full min-h-0 p-2 gap-2 overflow-hidden bg-slate-50">
          
          {/* Top Mobile Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-2 shrink-0 flex items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
              <Clock className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            <span className="text-xs font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
              Q {currentIndex + 1} / {questionSet.questions.length}
            </span>

            <button
              onClick={() => setShowConfirmModal(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs px-3 py-1 rounded-lg shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Submit</span>
              <Rocket className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </button>
          </div>

          {/* Horizontal Scrollable Question Selector Bar */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 shrink-0 no-scrollbar">
            {questionSet.questions.map((q, idx) => {
              const uAns = userAnswers[q.id];
              const isCurrent = idx === currentIndex;
              const isAnswered = uAns?.answer && uAns.answer.trim() !== "";
              const isFlagged = uAns?.isFlagged;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`min-w-[34px] h-8 rounded-lg border font-black text-xs transition flex items-center justify-center relative cursor-pointer shrink-0 ${
                    isCurrent
                      ? "bg-amber-400 border-amber-500 text-slate-950 ring-2 ring-amber-400/50 font-black"
                      : isAnswered
                      ? "bg-slate-200 border-slate-300 text-slate-900"
                      : "bg-white border-slate-300 text-slate-600"
                  }`}
                >
                  <span>{idx + 1}</span>
                  {isFlagged && (
                    <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Question Canvas */}
          <div className="bg-[#dff0f2] border-2 border-[#bcdfe3] rounded-2xl p-2.5 flex-1 min-h-0 flex flex-col items-center justify-center relative shadow-xs overflow-y-auto">
            <div className="bg-white/80 border border-teal-200 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 shrink-0 flex items-center gap-1">
              <Smile className="w-3 h-3 text-orange-500" />
              <span>Focus & Calculate!</span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center py-1">
              {(setId === "abacus-jr0-bead-identification" || (setId === "abacus-jr0-overall" && currentQuestion.conceptTag?.includes("Identification"))) && (
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full mb-1">
                    🔍 Identify Number:
                  </span>
                  <SorobanQuizBeadCanvas
                    value={currentQuestion.correctAnswer}
                    digitsCount={currentQuestion.correctAnswer >= 100 ? 3 : currentQuestion.correctAnswer >= 10 ? 2 : 1}
                    interactive={false}
                    showDigitsFooter={false}
                  />
                </div>
              )}

              {(setId === "abacus-jr0-bead-representation" || (setId === "abacus-jr0-overall" && currentQuestion.conceptTag?.includes("Representation"))) && (
                <div className="flex flex-col items-center">
                  <div className="text-center bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-xl mb-1 shadow-xs">
                    <span className="text-[9px] uppercase font-bold text-amber-100 block">Target Number</span>
                    <span className="text-xl font-black font-mono">{currentQuestion.correctAnswer}</span>
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

              {setId !== "abacus-jr0-bead-identification" && setId !== "abacus-jr0-bead-representation" && !(setId === "abacus-jr0-overall" && (currentQuestion.conceptTag?.includes("Identification") || currentQuestion.conceptTag?.includes("Representation"))) && (
                currentQuestion.numbers ? (
                  <div className="flex flex-col items-end text-2xl font-black text-slate-900 font-mono tracking-wider space-y-0 bg-white/80 px-4 py-2 rounded-xl border border-teal-200/80 shadow-xs">
                    {currentQuestion.numbers.map((num, idx) => (
                      <div key={idx} className="leading-tight">
                        {num > 0 ? num : `- ${Math.abs(num)}`}
                      </div>
                    ))}
                    <div className="w-full border-b-3 border-slate-900 my-0.5"></div>
                  </div>
                ) : (
                  <div className="text-2xl font-black text-slate-900 font-mono tracking-wide bg-white/80 px-4 py-2 rounded-xl border border-teal-200/80 shadow-xs">
                    {currentQuestion.expression || "5 + 3"} = ?
                  </div>
                )
              )}
            </div>

            {/* Mobile Answer Input Box */}
            <div className="w-full max-w-[220px] shrink-0 flex flex-col items-center gap-1.5 mt-auto pt-1">
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
                className="w-full bg-white border-2 border-teal-500 focus:border-vibrant-orange text-center text-xl font-black py-1 rounded-xl shadow-inner focus:outline-none transition-all"
              />

              {mode === "instant" && (
                <button
                  onClick={handleCheckAnswer}
                  disabled={!currentInput}
                  className="w-full bg-emerald-600 text-white font-black text-xs py-1 rounded-lg shadow-xs flex items-center justify-center gap-1"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Verify
                </button>
              )}

              {instantFeedback && (
                <div
                  className={`text-[10px] font-black px-2 py-0.5 rounded-lg w-full text-center ${
                    instantFeedback.isCorrect ? "bg-emerald-100 text-emerald-900" : "bg-red-100 text-red-900"
                  }`}
                >
                  {instantFeedback.message}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <div className="shrink-0 flex items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl p-1.5 shadow-xs">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="bg-slate-100 disabled:opacity-40 text-slate-800 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 border border-slate-300 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Prev
            </button>

            <button
              onClick={toggleFlag}
              className={`p-1.5 rounded-lg border text-xs font-bold cursor-pointer ${
                userAnswers[currentQuestion.id]?.isFlagged
                  ? "bg-amber-100 border-amber-300 text-amber-800"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}
            >
              <Flag className={`w-4 h-4 ${userAnswers[currentQuestion.id]?.isFlagged ? "fill-amber-600 text-amber-600" : ""}`} />
            </button>

            {currentIndex < questionSet.questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="flex-1 max-w-[140px] bg-vibrant-orange hover:bg-vibrant-orange/90 text-white font-black py-1.5 rounded-lg text-xs flex items-center justify-center gap-1 shadow-md cursor-pointer"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="flex-1 bg-gradient-to-r from-orange-600 to-slate-900 text-white font-black py-1.5 rounded-lg text-xs flex items-center justify-center gap-1 shadow-md cursor-pointer"
              >
                Submit 🚀
              </button>
            )}
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
