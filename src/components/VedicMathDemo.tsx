/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Calculator, HelpCircle, ChevronRight, ChevronLeft, RefreshCw } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

export default function VedicMathDemo() {
  const { language, t, formatNumber } = useLanguage();
  const [activeSutra, setActiveSutra] = useState<"square" | "cross" | "ekadhikena">("square");
  const [showFormula, setShowFormula] = useState(false);

  // Sutra 1 State
  const [squareNum, setSquareNum] = useState<number>(98);

  // Sutra 2 (Cross Multiplication 3x2) State
  const [crossStep, setCrossStep] = useState<number>(0);
  const numA = 123;
  const numB = 45;

  // Sutra 3 (Ekadhikena Purvena) State
  const [fiveNum, setFiveNum] = useState<number>(35);

  const steps3x2 = [
    {
      title: t("vedic3x2Step1Title"),
      formula: "3 × 5 = 15",
      explain: t("vedic3x2Step1Explain"),
      highlight: "units",
      result: t("vedic3x2Step1Result")
    },
    {
      title: t("vedic3x2Step2Title"),
      formula: "(2 × 5) + (3 × 4) = 10 + 12 = 22",
      explain: t("vedic3x2Step2Explain"),
      highlight: "tens-units",
      result: t("vedic3x2Step2Result")
    },
    {
      title: t("vedic3x2Step3Title"),
      formula: "(1 × 5) + (2 × 4) = 5 + 8 = 13",
      explain: t("vedic3x2Step3Explain"),
      highlight: "hundreds-tens-units",
      result: t("vedic3x2Step3Result")
    },
    {
      title: t("vedic3x2Step4Title"),
      formula: "(1 × 4) = 4",
      explain: t("vedic3x2Step4Explain"),
      highlight: "hundreds-tens",
      result: t("vedic3x2Step4Result")
    },
    {
      title: t("vedic3x2Step5Title"),
      formula: "123 × 45 = 5535",
      explain: t("vedic3x2Step5Explain"),
      highlight: "all",
      result: t("vedic3x2Step5Result")
    }
  ];

  // Sutra 1 computations
  const deviation = 100 - squareNum;
  const leftHalf = squareNum - deviation;
  const rightHalfVal = deviation * deviation;
  const rightHalfStr = rightHalfVal < 10 ? `0${rightHalfVal}` : `${rightHalfVal}`;
  const finalSquare = leftHalf * 100 + rightHalfVal;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 max-w-3xl mx-auto">
      {/* Tab Selector */}
      <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => { setActiveSutra("square"); setCrossStep(0); }}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none ${
            activeSutra === "square" 
              ? "bg-vibrant-teal text-white shadow-sm" 
              : "bg-white border border-slate-200 hover:border-slate-350 text-vibrant-dark"
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          {t("vedicTabSquaring")}
        </button>
        <button
          onClick={() => { setActiveSutra("cross"); }}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none ${
            activeSutra === "cross" 
              ? "bg-vibrant-teal text-white shadow-sm" 
              : "bg-white border border-slate-200 hover:border-slate-350 text-vibrant-dark"
          }`}
        >
          <Calculator className="w-4 h-4 shrink-0" />
          {t("vedicTabMult")}
        </button>
        <button
          onClick={() => { setActiveSutra("ekadhikena"); }}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none ${
            activeSutra === "ekadhikena" 
              ? "bg-vibrant-teal text-white shadow-sm" 
              : "bg-white border border-slate-200 hover:border-slate-350 text-vibrant-dark"
          }`}
        >
          <Sparkles className="w-4 h-4 text-vibrant-gold shrink-0" />
          {t("vedicTabEndingFive")}
        </button>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Sutra 1 Interface */}
        {activeSutra === "square" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-display font-black text-xl text-vibrant-dark">
                {t("vedicTitle")}
              </h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                {t("vedicSubtitle")}
              </p>
            </div>

            {/* Slider control */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-605">
                  {t("vedicSelectNumberLabel")}
                </span>
                <span className="bg-vibrant-teal text-white text-lg font-bold px-4 py-1 rounded-xl shadow-xs">
                  {formatNumber(squareNum)}²
                </span>
              </div>
              <input
                type="range"
                min="91"
                max="99"
                value={squareNum}
                onChange={(e) => setSquareNum(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-vibrant-teal"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                <span>{formatNumber(91)}</span>
                <span>{formatNumber(95)}</span>
                <span>{formatNumber(99)}</span>
              </div>
            </div>

            {/* Step Visualization Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#FFF8F0]/70 border border-orange-100 p-4.5 rounded-2xl text-center space-y-1 hover-material-card">
                <span className="text-[10px] font-black text-vibrant-orange uppercase tracking-wider block">
                  {t("vedicStep1DeficiencyTitle")}
                </span>
                <div className="font-display font-black text-xl text-vibrant-dark">
                  {formatNumber(100)} - {formatNumber(squareNum)} = <span className="text-vibrant-orange">{formatNumber(deviation)}</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">
                  {t("vedicStep1DeficiencyDesc")}
                </p>
              </div>

              <div className="bg-[#E0FAF5]/70 border border-teal-100 p-4.5 rounded-2xl text-center space-y-1 hover-material-card">
                <span className="text-[10px] font-black text-vibrant-teal uppercase tracking-wider block">
                  {t("vedicStep2LeftTitle")}
                </span>
                <div className="font-display font-black text-xl text-vibrant-dark">
                  {formatNumber(squareNum)} - {formatNumber(deviation)} = <span className="text-vibrant-teal">{formatNumber(leftHalf)}</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">
                  {t("vedicStep2LeftDesc")}
                </p>
              </div>

              <div className="bg-[#FFFCE0]/70 border border-amber-200 p-4.5 rounded-2xl text-center space-y-1 hover-material-card">
                <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider block">
                  {t("vedicStep3RightTitle")}
                </span>
                <div className="font-display font-black text-xl text-vibrant-dark">
                  {formatNumber(deviation)}² = <span className="text-amber-700">{formatNumber(rightHalfStr)}</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">
                  {t("vedicStep3RightDesc")}
                </p>
              </div>
            </div>

            {/* Formula Block */}
            <div aria-live="polite" className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800 shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-vibrant-gold uppercase tracking-wider block animate-pulse">
                  {t("vedicCombinePartsTitle")}
                </span>
                <div className="font-display font-black text-2.5xl leading-none">
                  <span className="text-vibrant-teal">{formatNumber(leftHalf)}</span>
                  <span className="text-vibrant-gold"> | </span>
                  <span className="text-vibrant-orange">{formatNumber(rightHalfStr)}</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                  {t("vedicFinalAnswerLabel")}
                </span>
                <div className="font-display font-black text-3xl text-vibrant-gold">
                  {formatNumber(finalSquare)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sutra 2 Interface */}
        {activeSutra === "cross" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-display font-black text-xl text-vibrant-dark">
                {t("vedicCrossTitle")}
              </h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                {t("vedicCrossSubtitle")}
              </p>
            </div>

            {/* Interactive Grid Simulation */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              {/* Digit Alignments */}
              <div className="space-y-3 font-mono font-black text-2xl text-vibrant-dark tracking-widest text-center select-none bg-white p-5 rounded-2xl border border-slate-100 shadow-xs min-w-[150px]">
                <div className="flex justify-center gap-4">
                  <span className={steps3x2[crossStep].highlight.includes("hundreds") ? "text-vibrant-orange scale-110 transition-all" : "text-gray-300"}>{formatNumber(1)}</span>
                  <span className={steps3x2[crossStep].highlight.includes("tens") ? "text-vibrant-orange scale-110 transition-all" : "text-gray-400"}>{formatNumber(2)}</span>
                  <span className={steps3x2[crossStep].highlight.includes("units") ? "text-vibrant-orange scale-110 transition-all" : "text-gray-400"}>{formatNumber(3)}</span>
                </div>
                <div className="border-b-2 border-slate-200 pb-1 flex justify-center gap-4">
                  <span className="text-gray-200">×</span>
                  <span className="text-gray-200">{formatNumber(0)}</span>
                  <span className={steps3x2[crossStep].highlight.includes("tens") ? "text-vibrant-teal scale-110 transition-all" : "text-gray-400"}>{formatNumber(4)}</span>
                  <span className={steps3x2[crossStep].highlight.includes("units") ? "text-vibrant-teal scale-110 transition-all" : "text-gray-400"}>{formatNumber(5)}</span>
                </div>
                {/* Visual Math Vector Indicators */}
                <div className="text-xs text-slate-400 font-bold select-none h-6 flex items-center justify-center font-sans tracking-normal mt-1">
                  {crossStep === 0 && t("vedicCrossStep1Vector")}
                  {crossStep === 1 && t("vedicCrossStep2Vector")}
                  {crossStep === 2 && t("vedicCrossStep3Vector")}
                  {crossStep === 3 && t("vedicCrossStep4Vector")}
                  {crossStep === 4 && t("vedicCrossStep5Vector")}
                </div>
              </div>

              {/* Progress details */}
              <div className="flex-grow space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-vibrant-orange/10 text-vibrant-orange px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
                    {t("vedicCrossStepOfTotal").replace("{current}", formatNumber(crossStep + 1))}
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    {steps3x2[crossStep].title}
                  </span>
                </div>
                <div className="font-display font-black text-lg text-vibrant-dark">
                  {formatNumber(steps3x2[crossStep].formula)}
                </div>
                <p className="text-xs text-gray-605 font-semibold leading-relaxed">
                  {formatNumber(steps3x2[crossStep].explain)}
                </p>
                <div className="bg-slate-900 text-vibrant-gold font-mono font-black text-sm p-3 rounded-xl w-fit">
                  {formatNumber(steps3x2[crossStep].result)}
                </div>
              </div>
            </div>

            {/* Stepper buttons */}
            <div className="flex justify-between items-center gap-4">
              <button
                disabled={crossStep === 0}
                onClick={() => setCrossStep((prev) => prev - 1)}
                className="px-5 py-2.5 rounded-full border border-slate-200 hover:border-slate-350 text-xs font-bold uppercase tracking-wider bg-white text-vibrant-dark disabled:opacity-40 disabled:pointer-events-none active:scale-97 transition-all flex items-center gap-1 cursor-pointer focus:outline-none"
              >
                <ChevronLeft className="w-4 h-4" /> {t("vedicBtnPrev")}
              </button>

              <button
                onClick={() => setCrossStep(0)}
                className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none"
                title="Reset steps"
              >
                <RefreshCw className="w-4.5 h-4.5 text-gray-500" />
              </button>

              <button
                disabled={crossStep === steps3x2.length - 1}
                onClick={() => setCrossStep((prev) => prev + 1)}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-vibrant-teal text-white shadow-xs hover:shadow-md disabled:opacity-40 disabled:pointer-events-none active:scale-97 transition-all flex items-center gap-1 cursor-pointer focus:outline-none"
              >
                {t("vedicBtnNext")} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Sutra 3 Interface */}
        {activeSutra === "ekadhikena" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-display font-black text-xl text-vibrant-dark">
                {t("vedicEkadhikenaTitle")}
              </h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                {t("vedicEkadhikenaSubtitle")}
              </p>
            </div>

            {/* Quick Picker */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-3">
              <span className="text-xs font-bold text-gray-605 block">
                {t("vedicSelectNumberLabel")}
              </span>
              <div className="flex flex-wrap gap-2">
                {[15, 25, 35, 45, 55, 65, 75, 85, 95].map((n) => (
                  <button
                    key={n}
                    onClick={() => setFiveNum(n)}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer focus:outline-none ${
                      fiveNum === n
                        ? "bg-vibrant-orange text-white border-vibrant-orange shadow-sm"
                        : "bg-white text-vibrant-dark border-slate-200 hover:border-slate-350 hover:bg-slate-50"
                    }`}
                  >
                    {formatNumber(n)}
                  </button>
                ))}
              </div>
            </div>

            {/* Step computations */}
            {(() => {
              const firstDigit = Math.floor(fiveNum / 10);
              const leftPart = firstDigit * (firstDigit + 1);
              const finalSquare = fiveNum * fiveNum;

              return (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#FFF8F0]/70 border border-orange-100 p-4.5 rounded-2xl text-center space-y-1 hover-material-card">
                      <span className="text-[10px] font-black text-vibrant-orange uppercase tracking-wider block">
                        {t("vedicEkadhikenaStep1Title")}
                      </span>
                      <div className="font-display font-black text-xl text-vibrant-dark">
                        {formatNumber(firstDigit)}
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {t("vedicEkadhikenaStep1Desc")}
                      </p>
                    </div>

                    <div className="bg-[#E0FAF5]/70 border border-teal-100 p-4.5 rounded-2xl text-center space-y-1 hover-material-card">
                      <span className="text-[10px] font-black text-vibrant-teal uppercase tracking-wider block">
                        {t("vedicEkadhikenaStep2Title")}
                      </span>
                      <div className="font-display font-black text-xl text-vibrant-dark text-center">
                        {formatNumber(firstDigit)} × ({formatNumber(firstDigit)} + {formatNumber(1)}) = <span className="text-vibrant-teal">{formatNumber(leftPart)}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {t("vedicEkadhikenaStep2Desc")}
                      </p>
                    </div>

                    <div className="bg-[#FFFCE0]/70 border border-amber-200 p-4.5 rounded-2xl text-center space-y-1 hover-material-card">
                      <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider block">
                        {t("vedicEkadhikenaStep3Title")}
                      </span>
                      <div className="font-display font-black text-xl text-amber-700">
                        {formatNumber(5)}² = {formatNumber(25)}
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {t("vedicEkadhikenaStep3Desc")}
                      </p>
                    </div>
                  </div>

                  {/* Combined Results */}
                  <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800 shadow-sm">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-vibrant-gold uppercase tracking-wider block animate-pulse">
                        {t("vedicCombinePartsTitle")}
                      </span>
                      <div className="font-display font-black text-2.5xl leading-none">
                        <span className="text-vibrant-teal">{formatNumber(leftPart)}</span>
                        <span className="text-vibrant-gold"> | </span>
                        <span className="text-vibrant-orange">{formatNumber(25)}</span>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                        {t("vedicFinalAnswerLabel")}
                      </span>
                      <div className="font-display font-black text-3xl text-vibrant-gold">
                        {formatNumber(fiveNum)}² = {formatNumber(finalSquare)}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Toggle Math Formula Button */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={() => setShowFormula(!showFormula)}
            aria-expanded={showFormula}
            className="text-xs font-black text-vibrant-teal hover:text-vibrant-teal/80 transition-colors flex items-center gap-1.5 cursor-pointer focus:outline-none"
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            {showFormula 
              ? t("vedicHideFormulaBtn")
              : t("vedicShowFormulaBtn")
            }
          </button>
          
          {showFormula && (
            <div className="mt-4 bg-slate-50 border border-slate-150 p-5 rounded-2xl text-xs md:text-sm text-vibrant-dark space-y-3 shadow-xs">
              <h4 className="font-black text-xs md:text-sm text-vibrant-teal">
                {t("vedicProofHeading")}
              </h4>
              {activeSutra === "square" && (
                <p className="leading-relaxed font-semibold">
                  {t("vedicProofSquare")}
                </p>
              )}
              {activeSutra === "cross" && (
                <p className="leading-relaxed font-semibold">
                  {t("vedicProofCross")}
                </p>
              )}
              {activeSutra === "ekadhikena" && (
                <p className="leading-relaxed font-semibold">
                  {t("vedicProofEkadhikena")}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
