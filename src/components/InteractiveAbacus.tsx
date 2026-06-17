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
  const { t } = useLanguage();
  // 5 rods: Indices 0 (ten-thousands) to 4 (ones) from left to right
  const [rods, setRods] = useState<RodState[]>([
    { upper: false, lowerCount: 0 },
    { upper: false, lowerCount: 0 },
    { upper: false, lowerCount: 0 },
    { upper: false, lowerCount: 0 },
    { upper: false, lowerCount: 0 },
  ]);

  const [showGuide, setShowGuide] = useState(false);
  const [customInput, setCustomInput] = useState("");

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

  // Set abacus to a specific number
  const setAbacusNumber = (num: number) => {
    const clamped = Math.max(0, Math.min(99999, num));
    const digits = clamped.toString().padStart(5, "0").split("").map(Number);
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
    ]);
    setCustomInput("");
  };

  // Calculate values
  const getRodValue = (rod: RodState) => {
    return (rod.upper ? 5 : 0) + rod.lowerCount;
  };

  const totalValue = rods.reduce((acc, rod, idx) => {
    const power = 4 - idx; // left is 10^4, right is 10^0
    return acc + getRodValue(rod) * Math.pow(10, power);
  }, 0);

  const handleCustomInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customInput, 10);
    if (!isNaN(val)) {
      setAbacusNumber(val);
    }
  };

  const examples = [
    { label: `${t("abacusExamplesTitle").includes("उदाहरण") ? "संख्या ७" : t("abacusExamplesTitle").includes("उदाहरणे") ? "संख्या ७" : "Number 7"}`, val: 7 },
    { label: `${t("abacusExamplesTitle").includes("उदाहरण") ? "संख्या १२" : t("abacusExamplesTitle").includes("उदाहरणे") ? "संख्या १२" : "Number 12"}`, val: 12 },
    { label: `${t("abacusExamplesTitle").includes("उदाहरण") ? "संख्या ९९" : t("abacusExamplesTitle").includes("उदाहरणे") ? "संख्या ९९" : "Number 99"}`, val: 99 },
    { label: `${t("abacusExamplesTitle").includes("उदाहरण") ? "संख्या ३५०" : t("abacusExamplesTitle").includes("उदाहरणे") ? "संख्या ३५०" : "Number 350"}`, val: 350 },
    { label: `${t("abacusExamplesTitle").includes("उदाहरण") ? "संख्या २,०२६" : t("abacusExamplesTitle").includes("उदाहरणे") ? "संख्या २,०२६" : "Number 2,026"}`, val: 2026 },
    { label: `${t("abacusExamplesTitle").includes("उदाहरण") ? "संख्या ९९,९९९" : t("abacusExamplesTitle").includes("उदाहरणे") ? "संख्या ९९,९९९" : "Number 99,999"}`, val: 99999 },
  ];

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
            onClick={resetAbacus}
            className="flex items-center gap-1.5 text-xs font-black text-vibrant-orange hover:text-vibrant-orange/90 transition bg-orange-50 border border-orange-100 px-3 py-2 rounded-xl cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t("abacusReset")}</span>
          </button>
        </div>
      </div>

      {showGuide && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-vibrant-cream border-2 border-vibrant-dark/20 p-4 rounded-2xl text-xs text-vibrant-dark font-medium leading-relaxed space-y-2"
        >
          <p className="font-bold text-vibrant-orange">{t("abacusGuideTitle")}</p>
          <ul className="list-disc list-inside space-y-1 text-gray-650">
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
        <div className="lg:col-span-8 bg-[#5C3A21] border-4 sm:border-8 border-[#3D2513] rounded-3xl p-2 sm:p-6 shadow-[inset_0_4px_12px_rgba(0,0,0,0.5)] relative overflow-hidden">
          
          {/* Rods and Frame container */}
          <div className="relative h-[240px] border-4 border-[#2C190D] bg-[#1E1108] rounded-xl flex justify-around p-0.5 sm:p-1">
            
            {/* Horizontal Beam/Divider */}
            <div className="absolute top-[68px] left-0 right-0 h-4 bg-[#4A2C18] border-y-2 border-[#2C190D] shadow-md z-10 flex items-center justify-around">
              {/* Real-time pinpoint indicators */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-vibrant-gold opacity-50 z-20" />
              ))}
            </div>

            {/* Render Rods */}
            {rods.map((rod, rIdx) => {
              const val = getRodValue(rod);

              return (
                <div key={rIdx} className="relative w-9 xs:w-12 sm:w-16 h-full flex flex-col items-center select-none">
                  
                  {/* Metallic Rod Line */}
                  <div className="absolute top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-r from-gray-400 via-gray-100 to-gray-500 rounded-full shadow-sm" />

                  {/* --- UPPER DECK --- */}
                  <div 
                    onClick={() => toggleUpper(rIdx)}
                    className="absolute w-8 xs:w-10 sm:w-12 h-[60px] top-1 cursor-pointer flex items-center justify-center"
                  >
                    <motion.div 
                      animate={{ y: rod.upper ? 20 : -10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-7 xs:w-9 sm:w-11 h-6 rounded-full border border-amber-950 shadow-md flex items-center justify-center text-[10px] font-black cursor-pointer ${
                        rod.upper
                          ? "bg-gradient-to-b from-vibrant-teal via-[#7CEFE0] to-[#00897B] text-teal-950/70"
                          : "bg-gradient-to-b from-[#B07D3E] via-[#F4C178] to-[#99652B] text-amber-950/70"
                      }`}
                    >
                      5
                    </motion.div>
                  </div>

                  {/* --- LOWER DECK --- */}
                  <div className="absolute top-[88px] bottom-1 w-8 xs:w-10 sm:w-12 cursor-pointer flex flex-col justify-end items-center pb-3">
                    {[1, 2, 3, 4].map((idx) => {
                      const isActive = rod.lowerCount >= idx;
                      // Move active beads up to the divider (32px translation to prevent overlapping)
                      const yOffset = isActive ? -32 : 0;

                      return (
                        <motion.div
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLowerCount(rIdx, idx);
                          }}
                          animate={{ y: yOffset }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className={`relative w-7 xs:w-9 sm:w-11 h-6 rounded-full border border-amber-950 shadow-md flex items-center justify-center text-[9px] font-black cursor-pointer ${
                            isActive 
                              ? "bg-gradient-to-b from-vibrant-teal via-[#7CEFE0] to-[#00897B] text-teal-950/70"
                              : "bg-gradient-to-b from-[#A5784A] via-[#E8B682] to-[#8C5D30] text-amber-950/70"
                          }`}
                        >
                          1
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Individual Rod Value Badge */}
                  <div className="absolute -bottom-1 bg-[#2C190D] border border-amber-950/50 rounded-md px-1 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-black text-vibrant-gold tracking-tight z-20">
                    {val}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Right Hand: Examples & Custom Numbers Panel */}
        <div className="lg:col-span-4 space-y-6">
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
                min="0"
                max="99999"
                placeholder="e.g. 54321"
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
        </div>

      </div>

      {/* Dynamic Calculated Value Display */}
      <div className="bg-vibrant-cream border-2 border-vibrant-dark rounded-2xl p-4 text-center">
        <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          {t("abacusComputedTitle")}
        </span>
        <span className="font-display font-black text-4xl md:text-5xl text-vibrant-dark block tracking-tight my-1">
          {totalValue.toLocaleString("en-IN")}
        </span>
        <p className="text-xs text-gray-400 font-semibold leading-relaxed">
          {t("abacusComputedSubtitle")}
        </p>
      </div>
    </div>
  );
}
