/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Brain, Star, CheckCircle2, ChevronRight, HelpCircle, Layers } from "lucide-react";

export default function MathComparisonDemo() {
  const [activeTab, setActiveTab] = useState<"abacus" | "vedic" | "school">("abacus");
  const [compStep, setCompStep] = useState<number>(0);

  const data = {
    abacus: {
      title: "Abacus Learning Program",
      age: "4 to 14 Years",
      method: "Tactile Soroban Beads",
      brain: "Right Brain Dominance (Photographic visualization)",
      focus: "Mental arithmetic, absolute speed, focus, spatial recall",
      bullet: "Converts numerical digits into spatial picture forms so children compute at calculator speeds without any scratch worksheets."
    },
    vedic: {
      title: "Vedic Speed Mathematics",
      age: "10+ Years (Middle/High School)",
      method: "16 Sacred Mental Sutras",
      brain: "Left & Right Integration (Pattern recognition & logic)",
      focus: "Olympiad shortcuts, speed checks, algebraic evaluations",
      bullet: "Provides 1-line mental shortcuts for heavy calculations, squares, divisions, and square roots, cutting down scrap computation time by 90%."
    },
    school: {
      title: "School Math & Conceptual Rigor",
      age: "Class 1 to 10 (CBSE/ICSE/State Boards)",
      method: "Pen, Paper & Structural Formulas",
      brain: "Left Brain Dominance (Analytical reasoning & steps)",
      focus: "Logical board presentation, conceptual proofs, grades",
      bullet: "Ensures CBSE academic board alignment and logical step-by-step layout proofs necessary to secure full marks in school examinations."
    }
  };

  const complementarySteps = [
    {
      label: "The Math Challenge",
      text: "Evaluate: (321 × 11) + 89",
      school: "Sets the logical structure: Multiply first, then add.",
      vedic: "Applies the multiplier 11 shortcut (write 3, add 3+2=5, add 2+1=3, write 1) -> 3531.",
      abacus: "Instantly adds 89 mentally using bead visualization (3531 + 89 = 3620).",
      conclusion: "Total Time: Under 3 seconds! 🚀"
    },
    {
      label: "Cross-Checking Work",
      text: "Verify: 98 × 97 = 9506",
      school: "Requires long column multiplication to prove the steps.",
      vedic: "Mentally checks deviation from 100: (98-3)=95 & (2×3)=06 -> 9506.",
      abacus: "Confirms addition speeds, avoiding small carry-forward errors.",
      conclusion: "Result verified in a blink! ✅"
    }
  ];

  return (
    <div className="bg-white border-4 border-vibrant-dark rounded-[32px] overflow-hidden shadow-[8px_8px_0_0_#1A2E35] max-w-4xl mx-auto">
      {/* Visual Header Banner */}
      <div className="bg-vibrant-dark text-white p-6 md:p-8 flex items-center justify-between border-b-4 border-vibrant-dark">
        <div className="space-y-2">
          <span className="text-[10px] bg-vibrant-gold text-vibrant-dark px-3 py-1 rounded-full font-black uppercase tracking-wider">
            Math Synergy System
          </span>
          <h3 className="font-display font-black text-2xl md:text-3xl tracking-tight leading-none text-white">
            Abacus vs Vedic vs School Math
          </h3>
          <p className="text-[#A2C4C9] text-xs font-semibold max-w-xl">
            See how these math methodologies differ, and more importantly, how they synergize to give your child an elite academic advantage.
          </p>
        </div>
        <Layers className="w-12 h-12 text-vibrant-teal hidden sm:block shrink-0 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left column: Tab selector & comparison */}
        <div className="lg:col-span-7 p-6 md:p-8 border-b-4 lg:border-b-0 lg:border-r-4 border-vibrant-dark space-y-6">
          <span className="text-[10px] text-vibrant-orange font-black uppercase tracking-wider block">
            Select & Compare Methodology:
          </span>
          
          <div className="flex gap-2">
            {(["abacus", "vedic", "school"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-xl border-2 border-vibrant-dark text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none transition-all ${activeTab === tab ? "bg-vibrant-teal text-white shadow-none translate-y-0.5" : "bg-white text-vibrant-dark"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid Information */}
          <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 space-y-4">
            <h4 className="font-display font-black text-lg text-vibrant-dark">
              {data[activeTab].title}
            </h4>
            
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-slate-100">
                <span className="font-black text-gray-400">Target Age:</span>
                <span className="col-span-2 font-bold text-gray-700">{data[activeTab].age}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-slate-100">
                <span className="font-black text-gray-400">Active Tool:</span>
                <span className="col-span-2 font-bold text-gray-700">{data[activeTab].method}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-slate-100">
                <span className="font-black text-gray-400">Cognitive Focus:</span>
                <span className="col-span-2 font-bold text-gray-700">{data[activeTab].focus}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5">
                <span className="font-black text-gray-400">Brain Activation:</span>
                <span className="col-span-2 font-bold text-gray-700">{data[activeTab].brain}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 bg-white p-3.5 rounded-xl border border-slate-200 font-semibold leading-relaxed">
              {data[activeTab].bullet}
            </p>
          </div>
        </div>

        {/* Right column: Interactive Complementary Flow */}
        <div className="lg:col-span-5 p-6 md:p-8 bg-vibrant-cream/20 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <Brain className="w-4.5 h-4.5 text-vibrant-teal" />
              <span className="text-[10px] text-vibrant-teal font-black uppercase tracking-wider">
                How They Work Together:
              </span>
            </div>

            <div className="bg-white border-2 border-vibrant-dark p-5 rounded-2xl shadow-sm space-y-3.5">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-[10px] font-black text-vibrant-orange uppercase tracking-wider">Example Scenario:</span>
                <span className="text-xs font-black text-vibrant-dark bg-[#FFF5CC] px-3 py-1 rounded-lg border border-vibrant-gold">
                  {complementarySteps[compStep].text}
                </span>
              </div>

              {/* Complementary points */}
              <div className="space-y-3 text-[11px] leading-relaxed">
                <div>
                  <strong className="text-indigo-600 block">🏫 School Math Framework:</strong>
                  <p className="text-gray-500 font-bold">{complementarySteps[compStep].school}</p>
                </div>
                <div>
                  <strong className="text-amber-700 block">⚡ Vedic Math Shortcut:</strong>
                  <p className="text-gray-500 font-bold">{complementarySteps[compStep].vedic}</p>
                </div>
                <div>
                  <strong className="text-vibrant-teal block">🧮 Abacus Visual Addition:</strong>
                  <p className="text-gray-500 font-bold">{complementarySteps[compStep].abacus}</p>
                </div>
              </div>

              <div className="bg-vibrant-dark text-vibrant-gold font-mono font-black text-center py-2.5 rounded-xl text-sm border-2 border-vibrant-dark">
                {complementarySteps[compStep].conclusion}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            <span className="text-[10px] font-bold text-gray-400">
              Interactive Scenario {compStep + 1} of {complementarySteps.length}
            </span>
            <button
              onClick={() => setCompStep((prev) => (prev + 1) % complementarySteps.length)}
              className="px-4 py-2 border-2 border-vibrant-dark rounded-xl bg-white hover:bg-slate-50 text-xs font-black shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1"
            >
              Next Demo <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
