/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { trackQuizCompletion, trackDemoClick } from "../lib/analytics";
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
  const [step, setStep] = useState<QuizStep>("AGE");
  const [ageInput, setAgeInput] = useState<string>("8");
  const [errorText, setErrorText] = useState("");
  
  const [currentQuestion, setCurrentQuestion] = useState<Question>({ text: "0 + 0", answer: 0 });
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(30); // 30 seconds timer
  const [startTime, setStartTime] = useState<number>(0);
  const [gameResult, setGameResult] = useState<"CORRECT" | "INCORRECT" | "TIMEOUT">("CORRECT");
  const [previousEquation, setPreviousEquation] = useState<string>("");

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate question based on age group
  const generateQuestion = (age: number): Question => {
    if (age < 7) {
      // Age < 7: Simple single-digit addition (e.g. 5 + 3 = 8 or 4 + 2 = 6)
      const num1 = Math.floor(Math.random() * 8) + 1; // 1 to 8
      const num2 = Math.floor(Math.random() * 8) + 1; // 1 to 8
      return {
        text: `${num1} + ${num2}`,
        answer: num1 + num2,
      };
    } else if (age >= 7 && age <= 9) {
      // Age 7-9: Chain additions or sub-chain operations (e.g. 14 - 6 = 8 or 12 + 5 - 3 = 14)
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
      // Age 10+: Mix of multiplication (12 x 4 = ?), division (45 / 5 = ?), or triple-digit addition/subtraction
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        // Multiplications
        const num1 = Math.floor(Math.random() * 12) + 3; // 3 to 14
        const num2 = Math.floor(Math.random() * 8) + 2;  // 2 to 9
        return {
          text: `${num1} × ${num2}`,
          answer: num1 * num2,
        };
      } else if (type === 1) {
        // Division
        const num2 = Math.floor(Math.random() * 9) + 2;  // divisor 2 to 10
        const answerVal = Math.floor(Math.random() * 10) + 3; // result 3 to 12
        const num1 = num2 * answerVal;
        return {
          text: `${num1} ÷ ${num2}`,
          answer: answerVal,
        };
      } else {
        // Triple or double-digit chain
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
      setErrorText("Please enter a valid age between 4 and 16.");
      return;
    }
    setErrorText("");
    
    const initialQuestion = generateQuestion(age);
    setCurrentQuestion(initialQuestion);
    setUserAnswer("");
    setTimeLeft(30);
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
    setPreviousEquation(currentQuestion.text);
    trackQuizCompletion("timeout", parseInt(ageInput, 10), 30);
    setStep("RESULT");
  };

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timerRef.current) clearInterval(timerRef.current);

    const numericAnswer = parseFloat(userAnswer.trim());
    const isCorrect = numericAnswer === currentQuestion.answer;
    
    const duration = Math.round((Date.now() - startTime) / 1000);

    if (isCorrect) {
      setGameResult("CORRECT");
      trackQuizCompletion("correct", parseInt(ageInput, 10), duration);
    } else {
      setGameResult("INCORRECT");
      trackQuizCompletion("incorrect", parseInt(ageInput, 10), duration);
    }
    
    setPreviousEquation(`${currentQuestion.text} = ${currentQuestion.answer}`);
    setStep("RESULT");
  };

  const handleTryAgain = () => {
    setStep("AGE");
    setErrorText("");
    setUserAnswer("");
  };

  const initiateDemoBooking = () => {
    trackDemoClick("quiz_result_cta", { ageGroup: ageInput, quizResult: gameResult });
    
    const message = `Hello Arnav Abacus Academy! My child is ${ageInput} years old. We played your interactive Math Quiz Widget, and the result was: ${gameResult === "CORRECT" ? "Correct" : gameResult === "INCORRECT" ? "Tried Hard" : "Timeout"}. We would love to book a Free Demo Session!`;
    const encoded = encodeURIComponent(message);
    window.location.href = `https://wa.me/919021924968?text=${encoded}`;
  };

  return (
    <div 
      id="speed-challenge-widget" 
      className="bg-vibrant-dark text-white rounded-[32px] border-4 border-vibrant-dark shadow-[12px_12px_0_0_#00897B] p-6 md:p-8 relative overflow-hidden"
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
            <span className="text-[9px] text-[#9ACAC1] font-bold block tracking-widest uppercase">Mental Math Power test</span>
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
                <Sparkles className="w-4 h-4 text-vibrant-gold shrink-0" /> Measure Your Child's Speed!
              </h4>
              <p className="text-xs text-[#A2C4C9] font-medium leading-relaxed">
                Test calculation speeds. Standard calculators are boring! See if your kid can beat the 30-second countdown using mental visualization.
              </p>
            </div>

            <form onSubmit={handleStartGame} className="space-y-4 pt-1">
              <div>
                <label className="block text-[10px] font-black text-[#89B5BC] uppercase tracking-wider mb-2 ml-1">
                  Enter Your Child's Age (Years)
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
                    placeholder="e.g., 8"
                  />
                  <button
                    type="submit"
                    className="bg-vibrant-orange text-white font-black text-xs md:text-sm px-6 rounded-2xl shadow-[0_4px_0_0_#B33A00] active:translate-y-1 active:shadow-none hover:brightness-105 duration-100 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span>Start Challenge</span> <ArrowRight className="w-4 h-4" />
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
            <div className="pt-3 border-t border-[#233C45] grid grid-cols-3 gap-2 text-center text-[10px] text-[#89B5BC] font-semibold">
              <div className="bg-[#122429] border border-[#233C45] p-2 rounded-xl leading-snug">
                <strong className="block text-white">Age 4-6</strong>
                Additions
              </div>
              <div className="bg-[#122429] border border-[#233C45] p-2 rounded-xl leading-snug">
                <strong className="block text-white">Age 7-9</strong>
                Chains (+ / -)
              </div>
              <div className="bg-[#122429] border border-[#233C45] p-2 rounded-xl leading-snug">
                <strong className="block text-white">Age 10+</strong>
                Mult / Division
              </div>
            </div>
          </motion.div>
        )}

        {step === "PLAY" && (
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
                Level Group: Age {ageInput}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-black text-vibrant-orange bg-[#FFF0E0]/25 px-3 py-1 rounded-full border border-vibrant-orange/10">
                <Clock className="w-3.5 h-3.5 animate-pulse text-vibrant-orange" />
                <span>{timeLeft}s remaining</span>
              </div>
            </div>

            {/* Timed Bar */}
            <div className="w-full h-2 bg-[#122429] border border-[#233C45] rounded-full overflow-hidden">
              <div 
                className="h-full bg-vibrant-orange transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              />
            </div>

            {/* Question Display */}
            <div className="bg-[#0D1A1E] border-2 border-[#233C45] rounded-3xl py-10 text-center relative overflow-hidden">
              <div className="absolute top-1.5 left-0 right-0 text-[8px] font-black text-[#89B5BC] tracking-widest uppercase">
                CALCULATE WITHOUT FINGERS
              </div>
              <span className="font-display font-black text-5xl lg:text-6xl text-white tracking-wide block mb-1">
                {currentQuestion.text}
              </span>
              <span className="text-[9px] text-[#89B5BC] font-bold select-none block">
                Visualize the abacus beads mentally!
              </span>
            </div>

            {/* Answer Box */}
            <form onSubmit={handleAnswerSubmit} className="space-y-3">
              <div className="flex gap-2.5">
                <input
                  type="number"
                  required
                  autoFocus
                  placeholder="Type answer here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="flex-1 bg-[#102227] border-2 border-[#233C45] focus:border-vibrant-teal rounded-2xl px-4 py-3 text-sm text-white outline-none transition-all duration-150 font-black"
                />
                <button
                  type="submit"
                  className="bg-vibrant-teal text-white font-black text-xs md:text-sm px-6 rounded-[16px] shadow-[0_4px_0_0_#00897B] active:translate-y-1 active:shadow-none hover:brightness-105 transition-all duration-150 flex items-center justify-center cursor-pointer shrink-0"
                >
                  Confirm
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
            {gameResult === "CORRECT" ? (
              <div className="space-y-2">
                <div className="w-16 h-16 bg-vibrant-teal/10 text-vibrant-teal rounded-full flex items-center justify-center mx-auto mb-2 border border-vibrant-teal/20">
                  <ThumbsUp className="w-8 h-8" />
                </div>
                <h4 className="font-display font-black text-xl text-vibrant-teal">
                  That's Absolutely Correct! 🎉
                </h4>
                <p className="text-xs text-[#A2C4C9] max-w-sm mx-auto leading-relaxed font-semibold">
                  Excellent speed! Your kid has great analytical speed. With proper abacus or Vedic math coaching, their speed will skyrocket instantly!
                </p>
              </div>
            ) : gameResult === "INCORRECT" ? (
              <div className="space-y-2">
                <div className="w-16 h-16 bg-vibrant-orange/10 text-vibrant-orange rounded-full flex items-center justify-center mx-auto mb-2 border border-vibrant-orange/20">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h4 className="font-display font-black text-xl text-vibrant-orange">
                  Great Attempt! 👍
                </h4>
                <p className="text-xs text-[#A2C4C9] max-w-sm mx-auto leading-relaxed font-semibold">
                  The correct equation was <strong className="text-white font-mono">{previousEquation}</strong>. Speed maths classes completely eliminate finger-counting and build amazing analytical accuracy!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-16 h-16 bg-[#122429] text-gray-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-[#233C45]">
                  <Clock className="w-8 h-8 text-[#89B5BC]" />
                </div>
                <h4 className="font-display font-black text-xl text-gray-305">
                  Time's Up! ⏱️
                </h4>
                <p className="text-xs text-[#A2C4C9] max-w-sm mx-auto leading-relaxed font-semibold">
                  Mental visualizations are like calculation muscles — they improve with practice. Offline courses help kids count instantly on the go.
                </p>
              </div>
            )}

            {/* Direct CRM CTA WhatsApp Button */}
            <div className="bg-[#0D1A1E] p-5 rounded-3xl border-2 border-[#233C45] space-y-3 shadow-md">
              <p className="text-[10px] text-vibrant-gold font-black tracking-widest uppercase mb-1">
                ⚡ EXCLUSIVE TRIAL OFFER
              </p>
              <h5 className="font-display text-sm font-black text-white">
                Book Free 100% Personal Skill Evaluation
              </h5>
              <button
                onClick={initiateDemoBooking}
                className="w-full bg-vibrant-orange text-white font-black py-4 rounded-2xl text-xs md:text-sm shadow-[0_4px_0_0_#B33A00] active:translate-y-1 active:shadow-none hover:brightness-105 duration-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                Secure Free Slot on WhatsApp
              </button>
            </div>

            {/* Try again */}
            <button
              onClick={handleTryAgain}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#89B5BC] hover:text-white underline transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Practice another question
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
