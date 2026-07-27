import React, { useEffect, useRef, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Zap, Flag, ArrowRight, ArrowLeft, Play, Pause, Sparkles } from "lucide-react";
import { useQuizTimer } from "../hooks/useQuizTimer";
import { Question, QuestionSet } from "../types";

export interface SpeedQuizFormProps {
  questionSet: QuestionSet;
  timeLimitSeconds?: number;
  onComplete: (results: {
    userAnswers: Record<number, { questionId: number; answer: string; isCorrect: boolean; isFlagged: boolean }>;
    correctCount: number;
    wrongCount: number;
    unansweredCount: number;
    scorePercentage: number;
    timeTakenSeconds: number;
  }) => void;
  onCancel?: () => void;
}

type QuizFormValues = Record<string, string>;

export default function SpeedQuizForm({
  questionSet,
  timeLimitSeconds = 300,
  onComplete,
  onCancel,
}: SpeedQuizFormProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});

  const inputRef = useRef<HTMLInputElement | null>(null);

  const questions = questionSet?.questions || [];
  const totalQuestions = questions.length || 1;

  // React Hook Form initialization
  const { control, handleSubmit, getValues } = useForm<QuizFormValues>({
    defaultValues: questions.reduce((acc, q) => {
      acc[`q_${q.id}`] = "";
      return acc;
    }, {} as QuizFormValues),
  });

  const onTimeUpRef = useRef<() => void>(() => {});

  // High-precision timer hook
  const timer = useQuizTimer({
    initialSeconds: timeLimitSeconds,
    autoStart: true,
    onTimeUp: () => {
      onTimeUpRef.current();
    },
  });

  const handleFinalSubmit = useCallback(() => {
    const rawAnswers = getValues();
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    const formattedAnswers: Record<number, { questionId: number; answer: string; isCorrect: boolean; isFlagged: boolean }> = {};

    questions.forEach((q) => {
      const userVal = (rawAnswers[`q_${q.id}`] || "").trim();
      const numAns = parseFloat(userVal);
      const isCorrect = !isNaN(numAns) && numAns === q.correctAnswer;

      if (!userVal) {
        unanswered++;
      } else if (isCorrect) {
        correct++;
      } else {
        wrong++;
      }

      formattedAnswers[q.id] = {
        questionId: q.id,
        answer: userVal,
        isCorrect,
        isFlagged: !!flaggedQuestions[q.id],
      };
    });

    const scorePercentage = Math.round((correct / totalQuestions) * 100);

    onComplete({
      userAnswers: formattedAnswers,
      correctCount: correct,
      wrongCount: wrong,
      unansweredCount: unanswered,
      scorePercentage,
      timeTakenSeconds: timer.timeTaken,
    });
  }, [questions, getValues, flaggedQuestions, totalQuestions, onComplete, timer.timeTaken]);

  useEffect(() => {
    onTimeUpRef.current = handleFinalSubmit;
  }, [handleFinalSubmit]);

  const currentQuestion: Question | undefined = questions[currentIndex];
  const progressPercent = Math.min(100, Math.max(0, ((currentIndex + 1) / totalQuestions) * 100));

  // Auto-focus input on question change
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex]);

  const toggleFlag = (qId: number) => {
    setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl text-slate-100 font-sans">
      {/* Header bar with category, title, timer & pause */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>{questionSet?.category || "Practice"} • {questionSet?.level || "Level 1"}</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">{questionSet?.title || "Mental Math Speed Drill"}</h2>
        </div>

        {/* Drift-Free Timer Badge */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-mono text-xl font-bold transition-colors ${
              timer.timeRemaining <= 10
                ? "bg-rose-950/80 text-rose-400 border border-rose-800 animate-pulse"
                : "bg-slate-800/80 text-indigo-300 border border-indigo-500/20"
            }`}
          >
            <Clock className={`w-5 h-5 ${timer.timeRemaining <= 10 ? "text-rose-400" : "text-indigo-400"}`} />
            <span>{timer.formattedTime}</span>
          </div>

          <button
            type="button"
            onClick={() => (timer.isPaused ? timer.resumeTimer() : timer.pauseTimer())}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl transition border border-slate-700 cursor-pointer"
            title={timer.isPaused ? "Resume Timer" : "Pause Timer"}
          >
            {timer.isPaused ? <Play className="w-5 h-5 text-emerald-400" /> : <Pause className="w-5 h-5 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-xs text-slate-400 font-medium">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(progressPercent)}% Progress</span>
        </div>
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main Question Display Box */}
      <div className="my-8 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 md:p-10 text-center relative overflow-hidden">
        {timer.isPaused && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-4">
            <p className="text-xl font-bold text-amber-400">Quiz Paused</p>
            <button
              type="button"
              onClick={timer.resumeTimer}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              Resume Quiz
            </button>
          </div>
        )}

        {/* Flag Toggle Button */}
        <button
          type="button"
          onClick={() => currentQuestion && toggleFlag(currentQuestion.id)}
          className={`absolute top-4 right-4 p-2 rounded-xl border transition cursor-pointer ${
            currentQuestion && flaggedQuestions[currentQuestion.id]
              ? "bg-amber-500/20 border-amber-500 text-amber-400"
              : "bg-slate-800/50 border-slate-700 text-slate-400 hover:text-slate-200"
          }`}
          title="Flag Question for Review"
        >
          <Flag className="w-4 h-4" />
        </button>

        {currentQuestion ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Question Expression / Number Stack */}
              {currentQuestion.numbers && currentQuestion.numbers.length > 0 ? (
                <div className="inline-flex flex-col items-end text-3xl md:text-5xl font-mono font-bold text-cyan-300 tracking-wider bg-slate-900/80 px-8 py-6 rounded-2xl border border-cyan-500/20 shadow-inner">
                  {currentQuestion.numbers.map((num, idx) => (
                    <div key={idx} className={num < 0 ? "text-rose-400" : "text-emerald-300"}>
                      {num > 0 && idx > 0 ? `+${num}` : num}
                    </div>
                  ))}
                  <div className="w-full border-b-4 border-cyan-400 my-2" />
                </div>
              ) : (
                <div className="text-3xl md:text-5xl font-extrabold text-white tracking-wide">
                  {currentQuestion.expression || `Question #${currentQuestion.id}`}
                </div>
              )}

              {/* Input Form Field bound to React Hook Form */}
              <form onSubmit={handleSubmit(handleNext)} className="max-w-xs mx-auto">
                <Controller
                  name={`q_${currentQuestion.id}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      ref={(e) => {
                        field.ref(e);
                        inputRef.current = e;
                      }}
                      type="number"
                      step="any"
                      placeholder="Type answer..."
                      onKeyDown={handleKeyDown}
                      className="w-full px-5 py-4 bg-slate-900 border-2 border-indigo-500/50 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 rounded-2xl text-center text-3xl font-mono font-bold text-white outline-none transition placeholder-slate-600"
                      autoComplete="off"
                    />
                  )}
                />
              </form>
            </motion.div>
          </AnimatePresence>
        ) : (
          <p className="text-slate-400">No question data available.</p>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 rounded-xl font-medium transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition cursor-pointer"
            >
              Exit
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/30 transition cursor-pointer"
          >
            <span>{currentIndex === totalQuestions - 1 ? "Submit Quiz" : "Next"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
