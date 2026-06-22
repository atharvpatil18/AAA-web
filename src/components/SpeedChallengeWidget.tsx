/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { trackQuizCompletion, trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";
import { 
  Trophy, 
  Clock, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  MessageSquare, 
  Sparkles, 
  AlertCircle,
  ThumbsUp, 
  Heart 
} from "lucide-react";

type QuizStep = "AGE" | "PLAY" | "RESULT";

interface Question {
  text: string;
  answer: number;
}

export default function SpeedChallengeWidget() {
  const { language, t, formatNumber } = useLanguage();
  const [step, setStep] = useState<QuizStep>("AGE");
  const [ageInput, setAgeInput] = useState<string>("8");
  const [errorText, setErrorText] = useState("");
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(45); // 45 seconds total timer for 3 questions
  const [startTime, setStartTime] = useState<number>(0);
  const [totalTimeTaken, setTotalTimeTaken] = useState<number>(0);
  const [gameResult, setGameResult] = useState<"CORRECT" | "INCORRECT" | "TIMEOUT">("CORRECT");

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate question based on age group
  const generateQuestion = (age: number): Question => {
    if (age < 7) {
      // Age < 7: Simple single-digit addition
      const num1 = Math.floor(Math.random() * 8) + 1; // 1 to 8
      const num2 = Math.floor(Math.random() * 8) + 1; // 1 to 8
      return {
        text: `${num1} + ${num2}`,
        answer: num1 + num2,
      };
    } else if (age >= 7 && age <= 9) {
      // Age 7-9: Chain additions or subtraction (e.g. 12 + 5 - 3)
      const isChain = Math.random() > 0.5;
      if (isChain) {
        const num1 = Math.floor(Math.random() * 10) + 5; // 5 to 14
        const num2 = Math.floor(Math.random() * 8) + 2;  // 2 to 9
        const num3 = Math.floor(Math.random() * 5) + 1;  // 1 to 5
        return {
          text: `${num1} + ${num2} - ${num3}`,
          answer: num1 + num2 - num3,
        };
      } else {
        const num1 = Math.floor(Math.random() * 15) + 6; // 6 to 20
        const num2 = Math.floor(Math.random() * 10) + 2; // 2 to 11
        return {
          text: `${num1} - ${num2}`,
          answer: num1 - num2,
        };
      }
    } else {
      // Age 10+: Multiplication or Division or double digit chain
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const num1 = Math.floor(Math.random() * 12) + 3; // 3 to 14
        const num2 = Math.floor(Math.random() * 8) + 2;  // 2 to 9
        return {
          text: `${num1} × ${num2}`,
          answer: num1 * num2,
        };
      } else if (type === 1) {
        const num2 = Math.floor(Math.random() * 9) + 2;  // divisor 2 to 10
        const answerVal = Math.floor(Math.random() * 10) + 3; // result 3 to 12
        const num1 = num2 * answerVal;
        return {
          text: `${num1} ÷ ${num2}`,
          answer: answerVal,
        };
      } else {
        const num1 = Math.floor(Math.random() * 80) + 20; // 20 to 100
        const num2 = Math.floor(Math.random() * 40) + 10; // 10 to 50
        return {
          text: `${num1} + ${num2}`,
          answer: num1 + num2,
        };
      }
    }
  };

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    const age = parseInt(ageInput, 10);
    if (!age || age < 4 || age > 16) {
      setErrorText(t("quizAgeError"));
      return;
    }
    setErrorText("");
    
    // Generate 3 unique questions back-to-back
    const qList = [generateQuestion(age), generateQuestion(age), generateQuestion(age)];
    setQuestions(qList);
    setQuestionIndex(0);
    setCorrectCount(0);
    setUserAnswer("");
    setTimeLeft(45); // 45 seconds total
    setStartTime(Date.now());
    setStep("PLAY");
  };

  // Timer Countdown Logic
  useEffect(() => {
    if (step === "PLAY") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step]);

  const handleTimeout = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameResult("TIMEOUT");
    const duration = Math.round((Date.now() - startTime) / 1000);
    setTotalTimeTaken(duration);
    trackQuizCompletion("timeout", parseInt(ageInput, 10), duration);
    setStep("RESULT");
  };

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const age = parseInt(ageInput, 10);
    const numericAnswer = parseFloat(userAnswer.trim());
    const currentQuestion = questions[questionIndex];
    const isCorrect = numericAnswer === currentQuestion.answer;
    
    let updatedCorrectCount = correctCount;
    if (isCorrect) {
      updatedCorrectCount += 1;
      setCorrectCount(updatedCorrectCount);
    }

    if (questionIndex < 2) {
      // Load next question
      setQuestionIndex(questionIndex + 1);
      setUserAnswer("");
    } else {
      // Completed all 3 questions
      if (timerRef.current) clearInterval(timerRef.current);
      const duration = Math.round((Date.now() - startTime) / 1000);
      setTotalTimeTaken(duration);
      
      const overallResult = updatedCorrectCount === 3 ? "CORRECT" : "INCORRECT";
      setGameResult(overallResult);
      trackQuizCompletion(overallResult === "CORRECT" ? "correct" : "incorrect", age, duration);
      setStep("RESULT");
    }
  };

  const handleTryAgain = () => {
    setStep("AGE");
    setErrorText("");
    setUserAnswer("");
  };

  const initiateDemoBooking = () => {
    trackDemoClick("quiz_result_cta", { ageGroup: ageInput, quizResult: gameResult });
    
    let message = `Hello Arnav Abacus Academy! My child is ${ageInput} years old. We played your interactive Math Quiz Widget, scoring ${correctCount}/3 correct in ${totalTimeTaken} seconds. We would love to book a Free Demo Session!`;
    if (language === "hi") {
      message = `नमस्ते अर्णव एबाकस एकेडमी! मेरा बच्चा ${ageInput} साल का है। हमने आपका इंटरैक्टिव मैथ क्विज़ खेला, जिसमें ${totalTimeTaken} सेकंड में ${correctCount}/3 सही उत्तर दिए। हम एक फ्री डेमो सेशन बुक करना चाहते हैं!`;
    } else if (language === "mr") {
      message = `नमस्कार अर्णव ॲबॅकस अकॅडमी! माझे मूल ${ageInput} वर्षांचे आहे. आम्ही तुमचे गणित क्विझ खेळलो आणि ${totalTimeTaken} सेकंदात ${correctCount}/३ अचूक उत्तरे दिली. आम्हाला मोफत डेमो क्लास बुक करायचा आहे!`;
    }
    
    const encoded = encodeURIComponent(message);
    window.location.href = `https://wa.me/919021924968?text=${encoded}`;
  };

  const currentQuestion = questions[questionIndex];

  return (
    <div 
      id="speed-challenge-widget" 
      className="bg-vibrant-dark text-white rounded-[32px] border-4 border-vibrant-dark shadow-[6px_6px_0_0_#00897B] md:shadow-[12px_12px_0_0_#00897B] p-6 md:p-8 relative overflow-hidden"
    >
      {/* Absolute Aesthetic Particles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-vibrant-teal/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-vibrant-orange/10 rounded-full blur-2xl pointer-events-none" />

      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-[#233C45] pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-vibrant-orange rounded-xl border border-vibrant-dark shadow-sm">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-display font-black text-sm block tracking-wide text-white">Arnav Speed Challenge</span>
            <span className="text-[9px] text-[#9ACAC1] font-bold block tracking-widest uppercase">{t("quizMentalPowerTest")}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-vibrant-gold bg-vibrant-gold/15 border border-vibrant-gold/20 px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
            ★ INTERACTIVE
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === "AGE" && (
          <motion.div
            key="age-step"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <h4 className="font-display font-black text-lg text-white flex items-center gap-1.5 animate-pulse">
                <Sparkles className="w-4 h-4 text-vibrant-gold shrink-0" /> {t("quizMeasureSpeed")}
              </h4>
              <p className="text-xs text-[#A2C4C9] font-medium leading-relaxed">
                {t("quizSubtitle")}
              </p>
            </div>

            <form onSubmit={handleStartGame} className="space-y-4 pt-1">
              <div>
                <label className="block text-[10px] font-black text-[#89B5BC] uppercase tracking-wider mb-2 ml-1">
                  {t("quizAgePrompt")}
                </label>
                <div className="flex gap-2.5">
                  <input
                    type="number"
                    min="4"
                    max="16"
                    required
                    value={ageInput}
                    onChange={(e) => setAgeInput(e.target.value)}
                    className="flex-1 bg-[#102227] border-2 border-[#233C45] focus:border-vibrant-orange rounded-2xl px-4 py-3 text-sm text-white outline-none transition-all duration-200"
                    placeholder={language === "hi" ? "जैसे: 8" : language === "mr" ? "उदा. ८" : "e.g., 8"}
                  />
                  <button
                    type="submit"
                    className="bg-vibrant-orange text-white font-black text-xs md:text-sm px-6 rounded-2xl shadow-[0_4px_0_0_#B33A00] active:translate-y-1 active:shadow-none hover:brightness-105 duration-100 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span>{t("quizStartBtn")}</span> <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {errorText && (
                  <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errorText}
                  </p>
                )}
              </div>
            </form>
            <div className="pt-3 border-t border-[#233C45] grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-[10px] text-[#89B5BC] font-semibold">
              <div className="bg-[#122429] border border-dashed border-vibrant-teal/30 p-2 rounded-xl leading-snug">
                <strong className="block text-white text-[11px] sm:text-[10px]">{t("quizAge4to6")}</strong>
                {t("quizAdditions")}
              </div>
              <div className="bg-[#122429] border border-dashed border-vibrant-teal/30 p-2 rounded-xl leading-snug">
                <strong className="block text-white text-[11px] sm:text-[10px]">{t("quizAge7to9")}</strong>
                {t("quizChains")}
              </div>
              <div className="bg-[#122429] border border-dashed border-vibrant-teal/30 p-2 rounded-xl leading-snug">
                <strong className="block text-white text-[11px] sm:text-[10px]">{t("quizAge10plus")}</strong>
                {t("quizMultDiv")}
              </div>
            </div>
          </motion.div>
        )}

        {step === "PLAY" && currentQuestion && (
          <motion.div
            key="play-step"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="space-y-5"
          >
            {/* Progress indicators & Timer */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#A2C4C9] uppercase tracking-widest font-black">
                {t("quizQuestionOf").replace("{num}", formatNumber(questionIndex + 1)).replace("{age}", formatNumber(ageInput))}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-black text-vibrant-orange bg-[#FFF0E0]/25 px-3 py-1 rounded-full border border-vibrant-orange/10">
                <Clock className="w-3.5 h-3.5 animate-pulse text-vibrant-orange" />
                <span>{formatNumber(timeLeft)}{t("quizTimerRemaining")}</span>
              </div>
            </div>

            {/* Timed Bar */}
            <div className="w-full h-2 bg-[#122429] border border-[#233C45] rounded-full overflow-hidden">
              <div 
                className="h-full bg-vibrant-orange transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / 45) * 100}%` }}
              />
            </div>

            {/* Question Display */}
            <div className="bg-[#0D1A1E] border-2 border-[#233C45] rounded-3xl py-10 text-center relative overflow-hidden">
              <div className="absolute top-1.5 left-0 right-0 text-[8px] font-black text-[#89B5BC] tracking-widest uppercase">
                {t("quizNoFingers")}
              </div>
              <span className="font-display font-black text-5xl lg:text-6xl text-white tracking-wide block mb-1">
                {formatNumber(currentQuestion.text)}
              </span>
              <span className="text-[9px] text-[#89B5BC] font-bold select-none block">
                {language === "hi" ? "मोतियों की कल्पना मन में करें!" : language === "mr" ? "मनातल्या मनात मण्यांची विजुअलाइज करा!" : "Visualize the abacus beads mentally!"}
              </span>
            </div>

            {/* Answer Box */}
            <form onSubmit={handleAnswerSubmit} className="space-y-3">
              <div className="flex gap-2.5">
                <input
                  type="number"
                  required
                  autoFocus
                  placeholder={t("quizTypeAnswer")}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="flex-1 bg-[#102227] border-2 border-[#233C45] focus:border-vibrant-teal rounded-2xl px-4 py-3 text-sm text-white outline-none transition-all duration-150 font-black"
                />
                <button
                  type="submit"
                  className="bg-vibrant-teal text-white font-black text-xs md:text-sm px-6 rounded-[16px] shadow-[0_4px_0_0_#00897B] active:translate-y-1 active:shadow-none hover:brightness-105 transition-all duration-150 flex items-center justify-center cursor-pointer shrink-0"
                >
                  {t("quizConfirm")}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === "RESULT" && (
          <motion.div
            key="result-step"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-5"
          >
            {gameResult === "TIMEOUT" ? (
              <div className="space-y-2">
                <div className="w-16 h-16 bg-[#122429] text-gray-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-[#233C45]">
                  <Clock className="w-8 h-8 text-[#89B5BC]" />
                </div>
                <h4 className="font-display font-black text-xl text-gray-300">
                  {t("quizTimesUp")}
                </h4>
                <p className="text-xs text-[#A2C4C9] max-w-sm mx-auto leading-relaxed font-semibold">
                  {t("quizResultTimeout").replace("{correctCount}", formatNumber(correctCount)).replace("{totalTime}", formatNumber(totalTimeTaken))}
                </p>
              </div>
            ) : correctCount === 3 ? (
              <div className="space-y-2">
                <div className="w-16 h-16 bg-vibrant-teal/10 text-vibrant-teal rounded-full flex items-center justify-center mx-auto mb-2 border border-vibrant-teal/20">
                  <ThumbsUp className="w-8 h-8" />
                </div>
                <h4 className="font-display font-black text-xl text-vibrant-teal">
                  {t("quizPerfectScore")}
                </h4>
                <p className="text-xs text-[#A2C4C9] max-w-sm mx-auto leading-relaxed font-semibold">
                  {t("quizResultPerfect").replace("{totalTime}", formatNumber(totalTimeTaken))}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-16 h-16 bg-vibrant-orange/10 text-vibrant-orange rounded-full flex items-center justify-center mx-auto mb-2 border border-vibrant-orange/20">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h4 className="font-display font-black text-xl text-vibrant-orange">
                  {t("quizAttemptCompleted")}
                </h4>
                <p className="text-xs text-[#A2C4C9] max-w-sm mx-auto leading-relaxed font-semibold">
                  {t("quizResultAttempt").replace("{correctCount}", formatNumber(correctCount)).replace("{totalTime}", formatNumber(totalTimeTaken))}
                </p>
              </div>
            )}

            {/* Direct CRM CTA WhatsApp Button */}
            <div className="bg-[#0D1A1E] p-5 rounded-3xl border-2 border-dashed border-vibrant-teal/30 space-y-3 shadow-md">
              <p className="text-[10px] text-vibrant-gold font-black tracking-widest uppercase mb-1">
                {t("quizExclusiveOffer")}
              </p>
              <h5 className="font-display text-sm font-black text-white">
                {t("quizBookConsult")}
              </h5>
              <button
                onClick={initiateDemoBooking}
                className="w-full bg-vibrant-orange text-white font-black py-4 rounded-2xl text-xs md:text-sm shadow-[0_4px_0_0_#B33A00] active:translate-y-1 active:shadow-none hover:brightness-105 duration-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                {t("quizSecureSlot")}
              </button>
            </div>

            {/* Try again */}
            <button
              onClick={handleTryAgain}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#89B5BC] hover:text-white underline transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> {t("quizPracticeRound")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
