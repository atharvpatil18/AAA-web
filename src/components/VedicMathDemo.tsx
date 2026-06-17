/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Calculator, HelpCircle, ChevronRight, ChevronLeft, RefreshCw } from "lucide-react";

export default function VedicMathDemo() {
  const [activeSutra, setActiveSutra] = useState<"square" | "cross">("square");

  // Sutra 1 State
  const [squareNum, setSquareNum] = useState<number>(98);

  // Sutra 2 (Cross Multiplication 3x2) State
  const [crossStep, setCrossStep] = useState<number>(0);
  const numA = 123;
  const numB = 45; // represented as 045 for 3x3 general logic, or simple steps for 3x2.
  // 3x2: (123) * (45)
  // Digits: A2 A1 A0 (1 2 3) and B2 B1 B0 (0 4 5)
  // Step 0: Initial state
  // Step 1: Unit digits vertical: 3 * 5 = 15 (5, carry 1)
  // Step 2: Cross tens/units: (2*5) + (3*4) = 10 + 12 = 22 (+ carry 1 = 23 -> 3, carry 2)
  // Step 3: Cross hundreds/units + tens: (1*5) + (2*4) + (3*0) = 5 + 8 + 0 = 13 (+ carry 2 = 15 -> 5, carry 1)
  // Step 4: Cross hundreds/tens: (1*4) + (2*0) = 4 + 0 = 4 (+ carry 1 = 5 -> 5, carry 0)
  // Step 5: Final Result: 5535

  const steps3x2 = [
    {
      title: "Step 1: Multiply Units Vertically",
      formula: "3 × 5 = 15",
      explain: "Multiply the rightmost digits. Write down 5, carry forward 1.",
      highlight: "units",
      result: "Ans: ...5 (Carry: 1)"
    },
    {
      title: "Step 2: Cross-Multiply Tens & Units",
      formula: "(2 × 5) + (3 × 4) = 10 + 12 = 22",
      explain: "Cross-multiply tens and units, then add the previous carry (1) = 23. Write down 3, carry forward 2.",
      highlight: "tens-units",
      result: "Ans: ..35 (Carry: 2)"
    },
    {
      title: "Step 3: Cross-Multiply Hundreds & Units + Tens",
      formula: "(1 × 5) + (2 × 4) = 5 + 8 = 13",
      explain: "Cross-multiply hundreds/units and tens/tens, then add previous carry (2) = 15. Write down 5, carry forward 1.",
      highlight: "hundreds-tens-units",
      result: "Ans: .535 (Carry: 1)"
    },
    {
      title: "Step 4: Cross-Multiply Hundreds & Tens",
      formula: "(1 × 4) = 4",
      explain: "Cross-multiply the leftmost digits, then add previous carry (1) = 5. Write down 5.",
      highlight: "hundreds-tens",
      result: "Ans: 5535 (Carry: 0)"
    },
    {
      title: "Step 5: Perfect Final Answer!",
      formula: "123 × 45 = 5535",
      explain: "All steps complete! Look at how fast you solved a 3-digit by 2-digit multiplication in a single horizontal line.",
      highlight: "all",
      result: "Result: 5535 ✅"
    }
  ];

  // Sutra 1 computations
  const deviation = 100 - squareNum;
  const leftHalf = squareNum - deviation;
  const rightHalfVal = deviation * deviation;
  const rightHalfStr = rightHalfVal < 10 ? `0${rightHalfVal}` : `${rightHalfVal}`;
  const finalSquare = leftHalf * 100 + rightHalfVal;

  return (
    <div className="bg-white border-4 border-vibrant-dark rounded-[32px] overflow-hidden shadow-[8px_8px_0_0_#1A2E35] max-w-3xl mx-auto">
      {/* Tab Selector */}
      <div className="flex border-b-4 border-vibrant-dark bg-vibrant-cream font-bold text-xs uppercase tracking-wider">
        <button
          onClick={() => { setActiveSutra("square"); setCrossStep(0); }}
          className={`flex-1 py-4 text-center border-r-4 border-vibrant-dark transition-all flex items-center justify-center gap-2 ${activeSutra === "square" ? "bg-vibrant-orange text-white" : "hover:bg-vibrant-cream/80 text-vibrant-dark"}`}
        >
          <Sparkles className="w-4 h-4" />
          Sutra 1: Fast Square (90-99)
        </button>
        <button
          onClick={() => setActiveSutra("cross")}
          className={`flex-1 py-4 text-center transition-all flex items-center justify-center gap-2 ${activeSutra === "cross" ? "bg-vibrant-orange text-white" : "hover:bg-vibrant-cream/80 text-vibrant-dark"}`}
        >
          <Calculator className="w-4 h-4" />
          Sutra 2: 3x2 Fast Multiplication
        </button>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Sutra 1 Interface */}
        {activeSutra === "square" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-display font-black text-xl text-vibrant-dark">
                Sutra: Nikhilam Navatashcaramam Dashatah
              </h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Find the square of any number close to base 100 in just 3 seconds by evaluating its deficiency. Try changing the input slider below!
              </p>
            </div>

            {/* Slider control */}
            <div className="bg-slate-50 p-5 rounded-2xl border-2 border-dashed border-slate-200 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-650">Select Number:</span>
                <span className="bg-vibrant-teal text-white text-lg font-black px-4.5 py-1.5 rounded-xl border-2 border-vibrant-dark shadow-[2px_2px_0_0_#1A2E35]">
                  {squareNum}²
                </span>
              </div>
              <input
                type="range"
                min="90"
                max="99"
                value={squareNum}
                onChange={(e) => setSquareNum(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-vibrant-teal"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                <span>90</span>
                <span>95</span>
                <span>99</span>
              </div>
            </div>

            {/* Step Visualization Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#FFF8F0] border-2 border-vibrant-dark p-4.5 rounded-2xl shadow-sm text-center space-y-1">
                <span className="text-[10px] font-black text-vibrant-orange uppercase tracking-wider block">Step 1: Deficiency</span>
                <div className="font-display font-black text-xl text-vibrant-dark">
                  100 - {squareNum} = <span className="text-vibrant-orange">{deviation}</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Find how much the number is below 100</p>
              </div>

              <div className="bg-[#E0FAF5] border-2 border-vibrant-dark p-4.5 rounded-2xl shadow-sm text-center space-y-1">
                <span className="text-[10px] font-black text-vibrant-teal uppercase tracking-wider block">Step 2: Left Half</span>
                <div className="font-display font-black text-xl text-vibrant-dark">
                  {squareNum} - {deviation} = <span className="text-vibrant-teal">{leftHalf}</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Subtract deviation from the number</p>
              </div>

              <div className="bg-[#FFFCE0] border-2 border-vibrant-dark p-4.5 rounded-2xl shadow-sm text-center space-y-1">
                <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider block">Step 3: Right Half</span>
                <div className="font-display font-black text-xl text-vibrant-dark">
                  {deviation}² = <span className="text-amber-700">{rightHalfStr}</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Square the deficiency (keep as 2 digits)</p>
              </div>
            </div>

            {/* Formula Block */}
            <div className="bg-vibrant-dark text-white p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border-2 border-vibrant-dark shadow-md">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-vibrant-gold uppercase tracking-wider block">Combine Parts</span>
                <div className="font-display font-black text-2.5xl leading-none">
                  <span className="text-vibrant-teal">{leftHalf}</span>
                  <span className="text-vibrant-gold"> | </span>
                  <span className="text-vibrant-orange">{rightHalfStr}</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Final Answer</span>
                <div className="font-display font-black text-3xl text-vibrant-gold">
                  {finalSquare}
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
                Sutra: Urdhva Tiryagbhyam (Vertically and Crosswise)
              </h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Multiply any 3-digit number by a 2-digit number (e.g. <span className="text-vibrant-orange font-black">123 × 45</span>) step-by-step using cross-multiplication vector pathways!
              </p>
            </div>

            {/* Interactive Grid Simulation */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50 p-6 rounded-2xl border-2 border-slate-200">
              {/* Digit Alignments */}
              <div className="space-y-3 font-mono font-black text-2xl text-vibrant-dark tracking-widest text-center select-none bg-white p-5 rounded-xl border border-slate-200 shadow-sm min-w-[150px]">
                <div className="flex justify-center gap-4">
                  <span className={steps3x2[crossStep].highlight.includes("hundreds") ? "text-vibrant-orange scale-110 transition-all" : "text-gray-300"}>1</span>
                  <span className={steps3x2[crossStep].highlight.includes("tens") ? "text-vibrant-orange scale-110 transition-all" : "text-gray-400"}>2</span>
                  <span className={steps3x2[crossStep].highlight.includes("units") ? "text-vibrant-orange scale-110 transition-all" : "text-gray-400"}>3</span>
                </div>
                <div className="border-b-4 border-vibrant-dark pb-1 flex justify-center gap-4">
                  <span className="text-gray-200">×</span>
                  <span className="text-gray-200">0</span>
                  <span className={steps3x2[crossStep].highlight.includes("tens") ? "text-vibrant-teal scale-110 transition-all" : "text-gray-400"}>4</span>
                  <span className={steps3x2[crossStep].highlight.includes("units") ? "text-vibrant-teal scale-110 transition-all" : "text-gray-400"}>5</span>
                </div>
                {/* Visual Math Vector Indicators */}
                <div className="text-xs text-slate-400 font-bold select-none h-6 flex items-center justify-center font-sans tracking-normal mt-1">
                  {crossStep === 0 && "↑ Units Only"}
                  {crossStep === 1 && "↖ Cross Tens/Units ↗"}
                  {crossStep === 2 && "↖ Cross Hundreds/Units & Tens ↗"}
                  {crossStep === 3 && "↖ Cross Hundreds/Tens ↗"}
                  {crossStep === 4 && "✅ Done!"}
                </div>
              </div>

              {/* Progress details */}
              <div className="flex-grow space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-vibrant-orange/15 text-vibrant-orange px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
                    Step {crossStep + 1} of 5
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    {steps3x2[crossStep].title}
                  </span>
                </div>
                <div className="font-display font-black text-lg text-vibrant-dark">
                  {steps3x2[crossStep].formula}
                </div>
                <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                  {steps3x2[crossStep].explain}
                </p>
                <div className="bg-vibrant-dark text-vibrant-gold font-mono font-black text-sm p-3 rounded-lg w-fit">
                  {steps3x2[crossStep].result}
                </div>
              </div>
            </div>

            {/* Stepper buttons */}
            <div className="flex justify-between items-center gap-4">
              <button
                disabled={crossStep === 0}
                onClick={() => setCrossStep((prev) => prev - 1)}
                className="px-4 py-2.5 rounded-xl border-2 border-vibrant-dark text-xs font-black uppercase tracking-wider bg-white shadow-[2px_2px_0_0_#1A2E35] disabled:opacity-40 disabled:pointer-events-none active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>

              <button
                onClick={() => setCrossStep(0)}
                className="p-2.5 rounded-xl border-2 border-vibrant-dark text-xs font-black bg-white hover:bg-slate-50 transition-colors"
                title="Reset steps"
              >
                <RefreshCw className="w-4.5 h-4.5 text-gray-500" />
              </button>

              <button
                disabled={crossStep === steps3x2.length - 1}
                onClick={() => setCrossStep((prev) => prev + 1)}
                className="px-5 py-2.5 rounded-xl border-2 border-vibrant-dark text-xs font-black uppercase tracking-wider bg-vibrant-teal text-white shadow-[2px_2px_0_0_#1A2E35] disabled:opacity-40 disabled:pointer-events-none active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
