/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { RotateCcw, HelpCircle, Star, Sparkles, Hash } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../lib/LanguageContext";

interface RodState {
  upper: boolean; // true if active (slid down to divider)
  lowerCount: number; // 0 to 4 (number of beads slid up to divider)
}

export default function InteractiveAbacus() {
  const { language, t, formatNumber } = useLanguage();
  // 7 rods: Indices 0 (Thousands) to 6 (Thousandths) from left to right
  const [rods, setRods] = useState<RodState[]>([
    { upper: false, lowerCount: 0 },
    { upper: false, lowerCount: 0 },
    { upper: false, lowerCount: 0 },
    { upper: false, lowerCount: 0 },
    { upper: false, lowerCount: 0 },
    { upper: false, lowerCount: 0 },
    { upper: false, lowerCount: 0 },
  ]);

  const [showGuide, setShowGuide] = useState(false);
  const [customInput, setCustomInput] = useState("");

  // Flashcard Game Mode States
  const [isFlashcardMode, setIsFlashcardMode] = useState<boolean>(false);
  const [flashcardTarget, setFlashcardTarget] = useState<number | null>(null);
  const [showFlashcardBeads, setShowFlashcardBeads] = useState<boolean>(false);
  const [flashcardGuess, setFlashcardGuess] = useState<string>("");
  const [flashcardFeedback, setFlashcardFeedback] = useState<string>("");
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);
  const [flashcardAttempts, setFlashcardAttempts] = useState<number>(0);
  const [flashcardScore, setFlashcardScore] = useState<number>(0);

  // Toggle upper bead (value 5)
  const toggleUpper = (rodIdx: number) => {
    setRods((prev) => {
      const next = [...prev];
      next[rodIdx] = { ...next[rodIdx], upper: !next[rodIdx].upper };
      return next;
    });
  };

  // Set lower beads count (value 1-4)
  const setLowerCount = (rodIdx: number, val: number) => {
    setRods((prev) => {
      const next = [...prev];
      const currentCount = next[rodIdx].lowerCount;
      const nextCount = currentCount === val ? val - 1 : val;
      next[rodIdx] = { ...next[rodIdx], lowerCount: Math.max(0, nextCount) };
      return next;
    });
  };

  // Set abacus to a specific number supporting decimals up to 9999.999
  const setAbacusNumber = (num: number) => {
    const clamped = Math.max(0, Math.min(9999.999, num));
    const d0 = Math.floor(clamped / 1000) % 10;
    const d1 = Math.floor(clamped / 100) % 10;
    const d2 = Math.floor(clamped / 10) % 10;
    const d3 = Math.floor(clamped) % 10;
    const d4 = Math.floor(clamped * 10) % 10;
    const d5 = Math.floor(clamped * 100) % 10;
    const d6 = Math.round(clamped * 1000) % 10;

    const digits = [d0, d1, d2, d3, d4, d5, d6];
    const nextRods = digits.map((digit) => {
      const upper = digit >= 5;
      const lowerCount = digit % 5;
      return { upper, lowerCount };
    });
    setRods(nextRods);
  };

  // Reset abacus to 0
  const resetAbacus = () => {
    setRods([
      { upper: false, lowerCount: 0 },
      { upper: false, lowerCount: 0 },
      { upper: false, lowerCount: 0 },
      { upper: false, lowerCount: 0 },
      { upper: false, lowerCount: 0 },
      { upper: false, lowerCount: 0 },
      { upper: false, lowerCount: 0 },
    ]);
    setCustomInput("");
  };

  // Reset Flashcard Session
  const resetFlashcardSession = () => {
    setFlashcardAttempts(0);
    setFlashcardScore(0);
    setFlashcardTarget(null);
    setFlashcardFeedback("");
  };

  // Calculate values
  const getRodValue = (rod: RodState) => {
    return (rod.upper ? 5 : 0) + rod.lowerCount;
  };

  const totalValue = rods.reduce((acc, rod, idx) => {
    let multiplier = 1;
    if (idx === 0) multiplier = 1000;
    else if (idx === 1) multiplier = 100;
    else if (idx === 2) multiplier = 10;
    else if (idx === 3) multiplier = 1;
    else if (idx === 4) multiplier = 0.1;
    else if (idx === 5) multiplier = 0.01;
    else if (idx === 6) multiplier = 0.001;
    return acc + getRodValue(rod) * multiplier;
  }, 0);

  const displayTotal = parseFloat(totalValue.toFixed(3));

  const handleCustomInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(customInput);
    if (!isNaN(val)) {
      setAbacusNumber(val);
    }
  };

  // Start the photographic memory game loop
  const startFlashcardChallenge = () => {
    // Increment attempts
    setFlashcardAttempts((prev) => prev + 1);

    // Generate random target number (limited to 99 for standard testing)
    const target = Math.floor(Math.random() * 99) + 1;
    setFlashcardTarget(target);
    setFlashcardGuess("");
    setFlashcardFeedback("");
    setIsCountingDown(true);

    // Set abacus to represent target number
    const clamped = Math.max(0, Math.min(9999.999, target));
    const d0 = Math.floor(clamped / 1000) % 10;
    const d1 = Math.floor(clamped / 100) % 10;
    const d2 = Math.floor(clamped / 10) % 10;
    const d3 = Math.floor(clamped) % 10;
    const d4 = Math.floor(clamped * 10) % 10;
    const d5 = Math.floor(clamped * 100) % 10;
    const d6 = Math.round(clamped * 1000) % 10;

    const digits = [d0, d1, d2, d3, d4, d5, d6];
    const nextRods = digits.map((digit) => {
      const upper = digit >= 5;
      const lowerCount = digit % 5;
      return { upper, lowerCount };
    });
    setRods(nextRods);
    setShowFlashcardBeads(true);

    // Flash beads for 1.5 seconds, then hide them
    setTimeout(() => {
      setShowFlashcardBeads(false);
      setIsCountingDown(false);
      // Reset abacus rods so player cannot read/count them
      setRods([
        { upper: false, lowerCount: 0 },
        { upper: false, lowerCount: 0 },
        { upper: false, lowerCount: 0 },
        { upper: false, lowerCount: 0 },
        { upper: false, lowerCount: 0 },
        { upper: false, lowerCount: 0 },
        { upper: false, lowerCount: 0 },
      ]);
    }, 1500);
  };

  // Submit player guess
  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guessVal = parseInt(flashcardGuess, 10);
    if (isNaN(guessVal)) return;

    if (guessVal === flashcardTarget) {
      setFlashcardFeedback("correct");
      setFlashcardScore((prev) => prev + 1);
    } else {
      setFlashcardFeedback("wrong");
    }
  };

  const examples = [
    { label: `${t("abacusExamplesTitle").includes("उदाहरण") ? "संख्या ०.०५" : t("abacusExamplesTitle").includes("उदाहरणे") ? "संख्या ०.०५" : "Number 0.05"}`, val: 0.05 },
    { label: `${t("abacusExamplesTitle").includes("उदाहरण") ? "संख्या ७.५" : t("abacusExamplesTitle").includes("उदाहरणे") ? "संख्या ७.५" : "Number 7.5"}`, val: 7.5 },
    { label: `${t("abacusExamplesTitle").includes("उदाहरण") ? "संख्या १२.३४" : t("abacusExamplesTitle").includes("उदाहरणे") ? "संख्या १२.३४" : "Number 12.34"}`, val: 12.34 },
    { label: `${t("abacusExamplesTitle").includes("उदाहरण") ? "संख्या ३५०.१" : t("abacusExamplesTitle").includes("उदाहरणे") ? "संख्या ३५०.१" : "Number 350.1"}`, val: 350.1 },
    { label: `${t("abacusExamplesTitle").includes("उदाहरण") ? "संख्या २,०२६" : t("abacusExamplesTitle").includes("उदाहरणे") ? "संख्या २,०२६" : "Number 2,026"}`, val: 2026 },
    { label: `${t("abacusExamplesTitle").includes("उदाहरण") ? "संख्या ९,९९९.९९९" : t("abacusExamplesTitle").includes("उदाहरणे") ? "संख्या ९,९९९.९९९" : "Number 9,999.999"}`, val: 9999.999 },
  ];

  // Helper for rod-specific colors as requested: 1st=pink, 2nd=red, 3rd=green, 4th=yellow, 5th=orange, 6th=blue, 7th=white
  const getBeadColor = (rIdx: number, isActive: boolean) => {
    const configs = [
      { // Rod 1: Pink
        active: "bg-pink-600 text-white border-pink-800",
        inactive: "bg-pink-600/30 text-pink-500 border-pink-600/50"
      },
      { // Rod 2: Red
        active: "bg-red-700 text-white border-red-900",
        inactive: "bg-red-700/30 text-red-500 border-red-700/50"
      },
      { // Rod 3: Green
        active: "bg-green-700 text-white border-green-900",
        inactive: "bg-green-700/30 text-green-500 border-green-700/50"
      },
      { // Rod 4: Yellow
        active: "bg-yellow-600 text-white border-yellow-800",
        inactive: "bg-yellow-600/30 text-yellow-500 border-yellow-600/50"
      },
      { // Rod 5: Orange
        active: "bg-orange-600 text-white border-orange-800",
        inactive: "bg-orange-600/30 text-orange-500 border-orange-600/50"
      },
      { // Rod 6: Blue
        active: "bg-blue-700 text-white border-blue-900",
        inactive: "bg-blue-700/30 text-blue-500 border-blue-700/50"
      },
      { // Rod 7: White
        active: "bg-white text-vibrant-dark border-gray-400",
        inactive: "bg-white/30 text-gray-400 border-gray-300"
      }
    ];
    const conf = configs[rIdx] || configs[6];
    return isActive ? conf.active : conf.inactive;
  };

  return (
    <div 
      id="interactive-abacus-widget" 
      className="bg-white border-4 border-vibrant-dark rounded-[36px] p-6 md:p-8 shadow-[8px_8px_0_0_#1A2E35] max-w-4xl mx-auto space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="inline-flex items-center gap-1 text-[10px] text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3 py-1 rounded-full uppercase tracking-wider font-black">
            <Star className="w-3.5 h-3.5 fill-current" /> {t("abacusBadge")}
          </span>
          <h3 className="font-display font-black text-2xl text-vibrant-dark">
            {t("abacusTryBeads")}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-vibrant-teal transition cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{showGuide ? t("abacusHideGuide") : t("abacusHowToUse")}</span>
          </button>
          <button
            onClick={() => { resetAbacus(); resetFlashcardSession(); }}
            className="flex items-center gap-1.5 text-xs font-black text-vibrant-orange hover:text-vibrant-orange/90 transition bg-orange-50 border border-orange-100 px-3 py-2 rounded-xl cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t("abacusReset")}</span>
          </button>
        </div>
      </div>

      {/* Mode Selector Switch */}
      <div className="flex border-2 border-vibrant-dark rounded-2xl overflow-hidden max-w-sm">
        <button
          onClick={() => { setIsFlashcardMode(false); resetAbacus(); resetFlashcardSession(); }}
          className={`flex-1 py-2 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
            !isFlashcardMode ? "bg-vibrant-teal text-white" : "bg-vibrant-cream text-vibrant-dark hover:bg-vibrant-cream/80"
          }`}
        >
          {t("abacusExploreModeBtn")}
        </button>
        <button
          onClick={() => { setIsFlashcardMode(true); resetAbacus(); resetFlashcardSession(); }}
          className={`flex-1 py-2 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
            isFlashcardMode ? "bg-vibrant-orange text-white" : "bg-vibrant-cream text-vibrant-dark hover:bg-vibrant-cream/80"
          }`}
        >
          {t("abacusFlashModeBtn")}
        </button>
      </div>

      {showGuide && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-vibrant-cream border-2 border-dashed border-vibrant-teal/30 p-4 rounded-2xl text-xs text-vibrant-dark font-medium leading-relaxed space-y-2"
        >
          <p className="font-bold text-vibrant-orange">{t("abacusGuideTitle")}</p>
          <ul className="list-disc list-inside space-y-1 text-gray-655">
            <li>{t("abacusGuideStep1")}</li>
            <li>{t("abacusGuideStep2")}</li>
            <li>{t("abacusGuideStep3")}</li>
            <li>{t("abacusGuideStep4")}</li>
          </ul>
        </motion.div>
      )}

      {/* Grid Layout for Abacus and Options */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Hand: Visual Abacus Box */}
        <div className={`lg:col-span-8 bg-black border-4 sm:border-8 border-black rounded-3xl p-3 sm:p-6 shadow-[8px_8px_0_0_#1A2E35] relative overflow-hidden ${
          isFlashcardMode ? "pointer-events-none" : ""
        }`}>
          {/* Header Name on tool */}
          <div className="text-center font-display font-black text-white text-xs sm:text-sm tracking-wider uppercase mb-3">
            Arnav Abacus Academy
          </div>
          
          {/* Column Place Value Labels */}
          <div className="w-full flex justify-around mb-2 px-1 text-center font-black select-none text-white/70">
            <div className="w-9 xs:w-11 sm:w-14 text-[9px] sm:text-[10px] uppercase tracking-wider">{language === "hi" ? "हजार" : language === "mr" ? "हजार" : "Th"}</div>
            <div className="w-9 xs:w-11 sm:w-14 text-[9px] sm:text-[10px] uppercase tracking-wider">{language === "hi" ? "सैकड़ा" : language === "mr" ? "शतक" : "H"}</div>
            <div className="w-9 xs:w-11 sm:w-14 text-[9px] sm:text-[10px] uppercase tracking-wider">{language === "hi" ? "दहाई" : language === "mr" ? "दशक" : "T"}</div>
            <div className="w-9 xs:w-11 sm:w-14 text-[9px] sm:text-[10px] uppercase tracking-wider text-vibrant-gold">{language === "hi" ? "इकाई •" : language === "mr" ? "एकक •" : "O •"}</div>
            <div className="w-9 xs:w-11 sm:w-14 text-[9px] sm:text-[10px] uppercase tracking-wider text-white/50">{language === "hi" ? "दशांश" : language === "mr" ? "दशांश" : "t"}</div>
            <div className="w-9 xs:w-11 sm:w-14 text-[9px] sm:text-[10px] uppercase tracking-wider text-white/50">{language === "hi" ? "शतांश" : language === "mr" ? "शतांश" : "h"}</div>
            <div className="w-9 xs:w-11 sm:w-14 text-[9px] sm:text-[10px] uppercase tracking-wider text-vibrant-gold">{language === "hi" ? "हजारवां •" : language === "mr" ? "हजारवा •" : "th •"}</div>
          </div>

          {/* Rods and Frame container with White Background */}
          <div className="relative h-[240px] border-4 border-black bg-white rounded-xl flex justify-around p-0.5 sm:p-1">
            
            {/* Horizontal Beam/Divider in Black */}
            <div className="absolute top-[68px] left-0 right-0 h-4 bg-black border-y border-black shadow-md z-10 flex items-center justify-around">
              {/* Real-time pinpoint indicators (indices 0, 3, and 6) */}
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white z-20 ${
                    i === 0 || i === 3 || i === 6 ? "opacity-90" : "opacity-0"
                  }`} 
                />
              ))}
            </div>

            {/* Render Rods */}
            {rods.map((rod, rIdx) => {
              const val = getRodValue(rod);
              const beadStyle = getBeadColor(rIdx, true);
              const inactiveBeadStyle = getBeadColor(rIdx, false);

              return (
                <div key={rIdx} className="relative w-9 xs:w-11 sm:w-14 h-full flex flex-col items-center select-none">
                  
                  {/* Black Rod Line */}
                  <div className="absolute top-0 bottom-0 w-0.5 sm:w-1 bg-black rounded-full shadow-sm" />

                  {/* --- UPPER DECK --- */}
                  <div 
                    onClick={() => toggleUpper(rIdx)}
                    className="absolute w-8 xs:w-10 sm:w-12 h-[60px] top-1 cursor-pointer flex items-center justify-center"
                  >
                    <motion.div 
                      animate={{ y: rod.upper ? 20 : -10 }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-7 xs:w-9 sm:w-11 h-6 rounded-full border shadow-md flex items-center justify-center text-[10px] font-black cursor-pointer ${
                        rod.upper ? beadStyle : inactiveBeadStyle
                      }`}
                    >
                      5
                    </motion.div>
                  </div>

                  {/* --- LOWER DECK --- */}
                  <div className="absolute top-[88px] bottom-1 w-8 xs:w-10 sm:w-12 cursor-pointer flex flex-col justify-end items-center pb-3">
                    {[1, 2, 3, 4].map((idx) => {
                      const isActive = rod.lowerCount >= idx;
                      const yOffset = isActive ? -32 : 0;

                      return (
                        <motion.div
                          key={idx}
                          onClick={(e) => {
                             e.stopPropagation();
                             setLowerCount(rIdx, idx);
                          }}
                          animate={{ y: yOffset }}
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.90 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className={`relative w-7 xs:w-9 sm:w-11 h-6 rounded-full border shadow-md flex items-center justify-center text-[9px] font-black cursor-pointer ${
                            isActive ? beadStyle : inactiveBeadStyle
                          }`}
                        >
                          1
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Individual Rod Value Badge (Black style) */}
                  <div className="absolute -bottom-1 bg-black border border-black rounded-md px-1 sm:px-1.5 py-0.5 text-[8px] sm:text-[9px] font-black text-white tracking-tight z-20">
                    {formatNumber(val)}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Overlay for Flashcard Mode when beads are hidden */}
          {isFlashcardMode && !showFlashcardBeads && (
            <div className="absolute inset-0 bg-[#FFFDF9]/95 z-30 flex flex-col items-center justify-center p-6 text-center animate-fade-in pointer-events-auto">
              <div className="text-5xl mb-3">
                {flashcardAttempts === 5 && flashcardFeedback !== "" ? "🏆" : "📸"}
              </div>
              <h4 className="font-display font-black text-lg text-vibrant-dark mb-1">
                {flashcardAttempts === 0 
                  ? (language === "hi" ? "फोटोग्राफिक मेमोरी टेस्ट" : language === "mr" ? "फोटोग्राफिक मेमरी चाचणी" : "Photographic Memory Test")
                  : flashcardAttempts === 5 && flashcardFeedback !== ""
                  ? (language === "hi" ? "सत्र पूर्ण हुआ!" : language === "mr" ? "सत्र पूर्ण झाले!" : "Session Completed!")
                  : (language === "hi" ? "मोतियाँ छिपी हुई हैं!" : language === "mr" ? "मणी लपविलेले आहेत!" : "Beads Hidden!")
                }
              </h4>
              <p className="text-xs text-gray-550 font-semibold max-w-md">
                {flashcardAttempts === 0 
                  ? (language === "hi" 
                      ? "क्या आप गिल्टियों का मान याद रखकर सही संख्या का अनुमान लगा सकते हैं? चुनौती शुरू करने के लिए दाएँ पैनल का उपयोग करें।" 
                      : language === "mr" 
                      ? "तुम्ही मणी लक्षात ठेवून अचूक संख्या ओळखू शकता का? चाचणी सुरू करण्यासाठी उजवे पॅनेल वापरा." 
                      : "Can you memorize the beads and guess the correct value? Use the right panel to start the challenge.")
                  : flashcardAttempts === 5 && flashcardFeedback !== ""
                  ? (language === "hi"
                      ? `आपने 5 में से ${flashcardScore} सही उत्तर दिए। नया सेट खेलने के लिए दाएँ पैनल का उपयोग करें।`
                      : language === "mr"
                      ? `तुम्ही 5 पैकी ${flashcardScore} अचूक उत्तरे दिली. नवीन संच सुरू करण्यासाठी उजवे पॅनेल वापरा.`
                      : `You got ${flashcardScore} out of 5 correct. Use the right panel to start the next set of challenges!`)
                  : (language === "hi"
                      ? "दाएँ पैनल में अपना अनुमान सबमिट करें!"
                      : language === "mr"
                      ? "उजव्या पॅनेलमध्ये तुमचे उत्तर द्या!"
                      : "Submit your guess in the panel on the right!")
                }
              </p>
            </div>
          )}
        </div>

        {/* Right Hand: Controls / Examples Panel */}
        <div className="lg:col-span-4 space-y-6">
          {!isFlashcardMode ? (
            <>
              {/* Example Numbers List */}
              <div className="bg-vibrant-cream border-2 border-vibrant-dark rounded-2xl p-4 space-y-3 shadow-[4px_4px_0_0_#1A2E35]">
                <span className="flex items-center gap-1 text-[10px] text-vibrant-orange font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 fill-current" /> {t("abacusExamplesTitle")}
                </span>
                <p className="text-[11px] text-gray-500 font-semibold leading-tight">
                  {t("abacusExamplesSubtitle")}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {examples.map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setAbacusNumber(item.val)}
                      className="bg-white hover:bg-orange-50 border-2 border-vibrant-dark/80 px-2.5 py-1.5 rounded-xl text-left text-xs font-black text-vibrant-dark transition-all hover:scale-[1.02] shadow-[2px_2px_0_0_#1A2E35] cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Number Input */}
              <div className="bg-vibrant-cream border-2 border-vibrant-dark rounded-2xl p-4 space-y-3 shadow-[4px_4px_0_0_#1A2E35]">
                <span className="flex items-center gap-1 text-[10px] text-vibrant-teal font-black uppercase tracking-wider">
                  <Hash className="w-3.5 h-3.5" /> {t("abacusCustomTitle")}
                </span>
                <p className="text-[11px] text-gray-500 font-semibold leading-tight">
                  {t("abacusCustomSubtitle")}
                </p>
                <form onSubmit={handleCustomInputSubmit} className="flex gap-2">
                  <input
                    type="number"
                    step="0.001"
                    min="0"
                    max="9999.999"
                    placeholder="e.g. 1234.567"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="flex-1 min-w-0 bg-white border-2 border-vibrant-dark px-3 py-2 rounded-xl text-xs font-bold text-vibrant-dark focus:outline-none focus:border-vibrant-teal"
                  />
                  <button
                    type="submit"
                    className="bg-vibrant-teal text-white font-black text-xs px-4 py-2 rounded-xl shadow-[0_3px_0_0_#00897B] active:translate-y-0.5 active:shadow-none transition-all hover:brightness-105 cursor-pointer"
                  >
                    {t("abacusShow")}
                  </button>
                </form>
              </div>
            </>
          ) : (
            /* Flashcard Controls Panel */
            <div className="bg-vibrant-cream border-2 border-vibrant-dark rounded-2xl p-4 space-y-4 shadow-[4px_4px_0_0_#1A2E35]">
              {flashcardAttempts === 0 ? (
                <div className="text-center py-2 space-y-3">
                  <span className="inline-flex items-center gap-1 text-[10px] text-vibrant-orange bg-[#FFEEE5] border border-vibrant-orange/20 px-3 py-1 rounded-full uppercase tracking-wider font-black">
                    {language === "hi" ? "मेमोरी गेम" : language === "mr" ? "मेमरी गेम" : "Memory Game"}
                  </span>
                  <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                    {language === "hi"
                      ? "एबाकस की गिल्टियाँ १.५ सेकंड के लिए फ्लैश होंगी। ५ चुनौतियों के इस सत्र में क्या आप सही संख्या का अनुमान लगा सकते हैं ?"
                      : language === "mr"
                      ? "ॲबॅकस मणी १.५ सेकंदांसाठी दिसतील. ५ आव्हानांच्या या सत्रात तुम्ही अचूक संख्या ओळखू शकता का ?"
                      : "Abacus beads will flash for exactly 1.5 seconds. Can you memorize them and guess the correct value in a session of 5 challenges ?"}
                  </p>
                  <button
                    onClick={startFlashcardChallenge}
                    className="w-full bg-vibrant-orange text-white border-2 border-vibrant-dark font-black py-2.5 rounded-xl shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:bg-vibrant-orange/90 transition-all text-xs uppercase tracking-wider cursor-pointer"
                  >
                    {language === "hi" ? "चुनौती शुरू करें" : language === "mr" ? "चाचणी सुरू करा" : "Start Challenge"}
                  </button>
                </div>
              ) : isCountingDown && showFlashcardBeads ? (
                <div className="text-center py-6 space-y-3 animate-pulse">
                  <span className="inline-flex bg-vibrant-orange text-white font-mono font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider border-2 border-vibrant-dark">
                    {language === "hi" ? `चुनौती ${formatNumber(flashcardAttempts)} / ५` : language === "mr" ? `चाचणी ${formatNumber(flashcardAttempts)} / ५` : `Challenge ${flashcardAttempts} / 5`}
                  </span>
                  <p className="text-xs font-bold text-vibrant-dark">
                    {language === "hi" ? "समय सीमित है!" : language === "mr" ? "वेळ मर्यादित आहे!" : "Look at the abacus!"}
                  </p>
                </div>
              ) : (
                /* Guess Submission / Feedback */
                <div className="space-y-4">
                  <div className="text-center flex justify-between items-center px-1">
                    <span className="inline-flex items-center gap-1 text-[10px] text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3 py-1 rounded-full uppercase tracking-wider font-black">
                      {language === "hi" ? `चुनौती ${formatNumber(flashcardAttempts)} / ५` : language === "mr" ? `चाचणी ${formatNumber(flashcardAttempts)} / ५` : `Challenge ${flashcardAttempts} / 5`}
                    </span>
                    <span className="text-[10px] font-black text-vibrant-dark">
                      {language === "hi" ? `स्कोर: ${formatNumber(flashcardScore)}` : language === "mr" ? `स्कोअर: ${formatNumber(flashcardScore)}` : `Score: ${flashcardScore}`}
                    </span>
                  </div>
                  
                  {/* Guess Input Form (Only if not feedback stage yet) */}
                  {flashcardFeedback === "" && (
                    <form onSubmit={handleGuessSubmit} className="flex gap-2">
                      <input
                        type="number"
                        placeholder="e.g. 42"
                        value={flashcardGuess}
                        onChange={(e) => setFlashcardGuess(e.target.value)}
                        className="flex-1 min-w-0 bg-white border-2 border-vibrant-dark px-3 py-2 rounded-xl text-xs font-bold text-vibrant-dark focus:outline-none focus:border-vibrant-orange"
                      />
                      <button
                        type="submit"
                        className="bg-vibrant-orange text-white font-black text-xs px-4 py-2 rounded-xl shadow-[0_3px_0_0_#D35400] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                      >
                        {language === "hi" ? "जांचें" : language === "mr" ? "तपासा" : "Submit"}
                      </button>
                    </form>
                  )}

                  {/* Feedback status */}
                  {flashcardFeedback !== "" && (
                    <div className={`p-3 rounded-xl border-2 text-xs font-black uppercase tracking-wider animate-fade-in ${
                      flashcardFeedback === "correct"
                        ? "bg-green-50 text-green-700 border-green-600 shadow-[2px_2px_0_0_#155724]"
                        : "bg-red-50 text-red-700 border-red-600 shadow-[2px_2px_0_0_#721c24]"
                    }`}>
                      {flashcardFeedback === "correct" ? (
                        <span>🎯 {language === "hi" ? "सही जवाब!" : language === "mr" ? "अचूक उत्तर!" : "Correct!"}</span>
                      ) : (
                        <span>❌ {language === "hi" ? `गलत! सही ${flashcardTarget} था।` : language === "mr" ? `चूक! अचूक ${flashcardTarget} होते.` : `Wrong! Target was ${flashcardTarget}.`}</span>
                      )}
                    </div>
                  )}

                  {/* Post-submit buttons */}
                  {flashcardFeedback !== "" && (
                    <div className="space-y-2">
                      {flashcardAttempts < 5 ? (
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={startFlashcardChallenge}
                            className="flex-1 bg-vibrant-teal text-white border-2 border-vibrant-dark font-black py-2 rounded-xl shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none transition-all text-xs cursor-pointer text-center"
                          >
                            {language === "hi" ? "अगली चुनौती" : language === "mr" ? "पुढचे आव्हान" : "Next Challenge"}
                          </button>
                          <button
                            onClick={resetFlashcardSession}
                            className="flex-1 bg-white text-vibrant-dark border-2 border-vibrant-dark/20 font-black py-2 rounded-xl hover:border-vibrant-dark transition-all text-xs cursor-pointer text-center"
                          >
                            {language === "hi" ? "रीसेट सत्र" : language === "mr" ? "रीसेट सत्र" : "Reset Session"}
                          </button>
                        </div>
                      ) : (
                        /* Session complete results card */
                        <div className="bg-white border-2 border-vibrant-dark rounded-xl p-3 text-center space-y-3 shadow-[2px_2px_0_0_#1A2E35] animate-fade-in">
                          <p className="text-xs font-black text-vibrant-dark uppercase tracking-wider">
                            {language === "hi" ? "🏆 सत्र समाप्त 🏆" : language === "mr" ? "🏆 सत्र पूर्ण झाले 🏆" : "🏆 Session Finished 🏆"}
                          </p>
                          <p className="text-xs text-gray-550 font-bold leading-normal">
                            {language === "hi"
                              ? `परिणाम: आपने ५ में से ${formatNumber(flashcardScore)} सही अनुमान लगाए!`
                              : language === "mr"
                              ? `निकाल: तुम्ही ५ पैकी ${formatNumber(flashcardScore)} अचूक अंदाज लावले!`
                              : `Result: You guessed ${flashcardScore} / 5 challenges correctly!`}
                          </p>
                          <button
                            onClick={() => {
                              resetFlashcardSession();
                              document.getElementById("speed-challenge-widget-section")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="w-full text-center text-xs font-black text-vibrant-orange hover:text-vibrant-orange/80 transition cursor-pointer underline block font-display"
                          >
                            → {t("bookFreeDemo")}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Calculated Value Display - Only visible in Explore Mode */}
      {!isFlashcardMode && (
        <div className="bg-vibrant-cream border-2 border-dashed border-vibrant-teal/30 rounded-2xl p-4 text-center">
          <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            {t("abacusComputedTitle")}
          </span>
          <span className="font-display font-black text-4xl md:text-5xl text-vibrant-dark block tracking-tight my-1">
            {formatNumber(displayTotal.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 }))}
          </span>
          <p className="text-xs text-gray-400 font-semibold leading-relaxed">
            {t("abacusComputedSubtitle")}
          </p>
        </div>
      )}
    </div>
  );
}
