/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { generateBrochurePDF } from "../lib/brochure";
import { useLanguage } from "../lib/LanguageContext";
import { RotateCw, Download, Sparkles, HelpCircle, Phone, Award, Zap } from "lucide-react";

export default function InteractiveBrochure() {
  const { language } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDownload = () => {
    generateBrochurePDF(language);
  };

  return (
    <div className="bg-[#FFFDF9] min-h-screen py-12 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header Container: Column layout on mobile for neat stacking, row layout on desktop */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-8 mb-10">
        {/* 1. Header Intro (Center aligned on mobile, left aligned on desktop) */}
        <div className="text-center md:text-left space-y-4 max-w-2xl">
          <span className="text-[10px] font-black text-white bg-vibrant-orange px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block shadow-[2px_2px_0_0_#1A2E35] border border-vibrant-dark">
            Best-in-Class Student &amp; Parent Resource
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-vibrant-dark leading-tight">
            Interactive Dashboard &amp; Program Brochure
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-semibold leading-relaxed">
            Explore our double-sided interactive dashboard to review program benefits, syllabus outcomes, and student success highlights at a glance. You can also download a print-ready, high-contrast <span className="text-vibrant-teal font-black">1-Page A4 PDF Brochure</span> to save, print, or share easily with other parents.
          </p>
        </div>

        {/* 2. Responsive Action Buttons (Centered & side-by-side on tablet/desktop, stacked on mobile) */}
        <div className="flex flex-col sm:flex-row md:flex-col items-stretch md:items-end gap-3 sm:justify-center shrink-0 w-full md:w-auto">
          {/* Download Brochure Button */}
          <button
            onClick={handleDownload}
            className="bg-vibrant-orange text-white px-8 py-3.5 rounded-full font-black text-sm shadow-[0_4px_0_0_#D35400] active:translate-y-1 active:shadow-none hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto md:w-64"
          >
            <Download className="w-4 h-4" />
            Download Brochure
          </button>

          {/* Double Side Flip Brochure Action Button */}
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="bg-vibrant-teal text-white px-8 py-3 rounded-full font-black text-sm shadow-[0_4px_0_0_#00897B] active:translate-y-1 active:shadow-none hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto md:w-64"
          >
            <RotateCw className="w-4 h-4" />
            Flip Brochure ({isFlipped ? "Show Front" : "Show Back"})
          </button>
        </div>
      </div>

      {/* 2. 3D Card Flipping Container - Removed scrollbars and compacted contents for mobile */}
      <div className="relative w-full max-w-4xl mx-auto h-[690px] md:h-[710px] lg:h-[730px] perspective-1000 mb-12">
        <div
          className={`relative w-full h-full duration-700 transform-style-3d cursor-pointer ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* FRONT SIDE */}
          <div className="absolute w-full h-full backface-hidden border-2 border-vibrant-dark/20 rounded-3xl bg-white shadow-[0_10px_25px_-5px_rgba(26,46,53,0.1)] flex flex-col justify-between overflow-hidden p-4 md:p-6 lg:p-8">
            {/* Header section with Circular Academy Logo */}
            <div className="flex items-center justify-between border-b-2 border-dashed border-vibrant-dark/10 pb-3 md:pb-4 shrink-0">
              <div className="flex items-center gap-2 md:gap-3">
                <img 
                  src="/logo.png" 
                  className="w-8 h-8 md:w-12 md:h-12 object-contain rounded-full border-2 border-vibrant-dark/20 bg-white" 
                  alt="Academy Logo"
                />
                <div>
                  <h2 className="font-display font-black text-sm md:text-xl text-vibrant-dark tracking-tight leading-tight">
                    ARNAV ABACUS ACADEMY
                  </h2>
                  <p className="text-[8px] md:text-[10px] font-black text-vibrant-orange uppercase tracking-wider">
                    NEP 2020 COGNITIVE SKILLS | IIVA CERTIFIED
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-black text-vibrant-teal bg-vibrant-teal/15 border-2 border-vibrant-teal/20 px-3 py-1 rounded-full uppercase">
                Front Side
              </span>
            </div>

            {/* Core Impact Hook */}
            <div className="my-2 md:my-3 text-center bg-indigo-50/50 border-2 border-indigo-100 rounded-2xl p-2.5 md:p-4 shrink-0">
              <h3 className="font-display font-black text-[11px] md:text-base text-indigo-950 flex items-center justify-center gap-1.5 md:gap-2">
                <Sparkles className="w-3.5 h-3.5 md:w-5 md:h-5 text-vibrant-orange animate-pulse" />
                UNLOCK YOUR CHILD'S MATH SUPERPOWERS!
              </h3>
              <p className="text-gray-650 text-[10px] md:text-xs font-semibold mt-0.5 max-w-2xl mx-auto leading-tight md:leading-relaxed">
                Traditional math workbook drills induce fear and rote memorization stress. We replace boring routines with visual abacus beads and ancient Vedic shortcuts, triggering whole-brain cognitive growth.
              </p>
              <p className="text-vibrant-orange text-[10px] md:text-xs italic font-black mt-1 max-w-2xl mx-auto leading-tight md:leading-relaxed">
                "At AAA, we do not just teach calculations. We inspire deep spatial concentration and visual mastery of numbers to build lifelong academic self-belief." – Neha Patil (Founder)
              </p>
            </div>

            {/* Programs Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 my-1 md:my-2 shrink-0">
              {/* Card 1 */}
              <div className="bg-orange-50/30 border-2 border-orange-100 rounded-2xl p-2.5 md:p-4 flex flex-row md:flex-col justify-between items-center md:items-stretch gap-2 hover:shadow-md transition-shadow">
                <div className="flex-1 md:flex-initial">
                  <h4 className="font-black text-xs md:text-sm text-vibrant-dark leading-tight flex items-center gap-1.5">
                    <span className="w-5 h-5 bg-vibrant-orange text-white rounded-lg flex items-center justify-center font-black text-[10px] md:text-xs">1</span>
                    Magic Bead Quest
                  </h4>
                  <p className="text-gray-650 text-[9.5px] md:text-[11px] leading-tight font-semibold mt-0.5">
                    Slide beads to stimulate left-right brain hemispheres, triggering photographic focus.
                  </p>
                </div>
                <div className="border-l md:border-l-0 md:border-t border-dashed border-vibrant-dark/15 pl-2 md:pl-0 md:pt-1.5 shrink-0 text-[8.5px] md:text-[9.5px] font-bold text-gray-500">
                  <p className="font-black text-vibrant-dark hidden md:block">⚡ Focus Outcomes:</p>
                  <span>Photographic memory.</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-teal-50/30 border-2 border-teal-100 rounded-2xl p-2.5 md:p-4 flex flex-row md:flex-col justify-between items-center md:items-stretch gap-2 hover:shadow-md transition-shadow">
                <div className="flex-1 md:flex-initial">
                  <h4 className="font-black text-xs md:text-sm text-vibrant-dark leading-tight flex items-center gap-1.5">
                    <span className="w-5 h-5 bg-vibrant-teal text-white rounded-lg flex items-center justify-center font-black text-[10px] md:text-xs">2</span>
                    Speed-Math Sorcery
                  </h4>
                  <p className="text-gray-655 text-[9.5px] md:text-[11px] leading-tight font-semibold mt-0.5">
                    16 principles to solve multi-digits 10-15x faster without workspace scratch paper.
                  </p>
                </div>
                <div className="border-l md:border-l-0 md:border-t border-dashed border-vibrant-dark/15 pl-2 md:pl-0 md:pt-1.5 shrink-0 text-[8.5px] md:text-[9.5px] font-bold text-gray-500">
                  <p className="font-black text-vibrant-dark hidden md:block">⚡ Focus Outcomes:</p>
                  <span>Olympiad calculation edge.</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-blue-50/30 border-2 border-blue-100 rounded-2xl p-2.5 md:p-4 flex flex-row md:flex-col justify-between items-center md:items-stretch gap-2 hover:shadow-md transition-shadow">
                <div className="flex-1 md:flex-initial">
                  <h4 className="font-black text-xs md:text-sm text-vibrant-dark leading-tight flex items-center gap-1.5">
                    <span className="w-5 h-5 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black text-[10px] md:text-xs">3</span>
                    Olympiad Arena
                  </h4>
                  <p className="text-gray-650 text-[9.5px] md:text-[11px] leading-tight font-semibold mt-0.5">
                    Direct board concept synergy to completely eliminate exam sheet calculation errors.
                  </p>
                </div>
                <div className="border-l md:border-l-0 md:border-t border-dashed border-vibrant-dark/15 pl-2 md:pl-0 md:pt-1.5 shrink-0 text-[8.5px] md:text-[9.5px] font-bold text-gray-500">
                  <p className="font-black text-vibrant-dark hidden md:block">⚡ Focus Outcomes:</p>
                  <span>Board curriculum sync.</span>
                </div>
              </div>
            </div>

            {/* Bottom Brand Credential Footer */}
            <div className="flex items-center justify-between border-t-2 border-dashed border-vibrant-dark/10 pt-2.5 md:pt-4 mt-1 shrink-0">
              <p className="text-[8.5px] md:text-[10px] font-black text-gray-500">
                Wakad Hub, Pune | Live Global Online Sessions
              </p>
              <p className="text-[9.5px] md:text-[11px] font-black text-vibrant-orange animate-bounce">
                Click Card to View Back Side ➜
              </p>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 border-2 border-vibrant-dark/20 rounded-3xl bg-white shadow-[0_10px_25px_-5px_rgba(26,46,53,0.1)] flex flex-col justify-between overflow-hidden p-4 md:p-6 lg:p-8">
            {/* Header section */}
            <div className="flex items-center justify-between border-b-2 border-dashed border-vibrant-dark/10 pb-3 md:pb-4 shrink-0">
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-lg">🏆</span>
                <div>
                  <h2 className="font-display font-black text-sm md:text-xl text-vibrant-dark tracking-tight leading-tight">
                    TRUST &amp; EVALUATION CRITERIA
                  </h2>
                  <p className="text-[8px] md:text-[10px] font-black text-vibrant-teal uppercase tracking-wider">
                    RESULTS PROVEN IN 30 DAYS OR LESSONS COMPLIMENTARY
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-black text-vibrant-orange bg-vibrant-orange/15 border-2 border-vibrant-orange/20 px-3 py-1 rounded-full uppercase">
                Back Side
              </span>
            </div>

            {/* Content grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 my-1.5 md:my-2 shrink-0">
              {/* AAA Advantages */}
              <div className="space-y-1">
                <h3 className="font-black text-xs md:text-sm text-vibrant-dark flex items-center gap-1">
                  <Zap className="w-3 h-3 md:w-3.5 md:h-3.5 text-vibrant-orange" />
                  Why Choose Arnav Academy?
                </h3>
                <div className="space-y-1">
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-1.5 flex items-center gap-2">
                    <span className="text-vibrant-teal font-black text-xs">✔</span>
                    <p className="text-[9px] md:text-[10px] font-semibold text-gray-650 leading-tight">
                      <strong className="text-vibrant-dark font-black">Ratio:</strong> Max 1:8 batch sizes vs 1:25 crowded centers.
                    </p>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-1.5 flex items-center gap-2">
                    <span className="text-vibrant-teal font-black text-xs">✔</span>
                    <p className="text-[9px] md:text-[10px] font-semibold text-gray-650 leading-tight">
                      <strong className="text-vibrant-dark font-black">Syllabus:</strong> Direct synchronization with school board math.
                    </p>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-1.5 flex items-center gap-2">
                    <span className="text-vibrant-teal font-black text-xs">✔</span>
                    <p className="text-[9px] md:text-[10px] font-semibold text-gray-650 leading-tight">
                      <strong className="text-vibrant-dark font-black">Trainer:</strong> Directed directly by founder Neha Patil.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick FAQs */}
              <div className="space-y-1">
                <h3 className="font-black text-xs md:text-sm text-vibrant-dark flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-vibrant-teal" />
                  Quick Parent FAQs
                </h3>
                <div className="space-y-1 bg-amber-50/20 border border-amber-100/50 rounded-2xl p-2 shrink-0">
                  <p className="text-[8.5px] md:text-[9.5px] font-bold text-gray-650 leading-tight">
                    <strong className="text-vibrant-dark font-black">Q: School confusion?</strong> A: No, it acts as a speed catalyst.
                  </p>
                  <p className="text-[8.5px] md:text-[9.5px] font-bold text-gray-655 leading-tight mt-0.5">
                    <strong className="text-vibrant-dark font-black">Q: Rote repetition?</strong> A: We use visual gaming rounds.
                  </p>
                  <p className="text-[8.5px] md:text-[9.5px] font-bold text-gray-655 leading-tight mt-0.5">
                    <strong className="text-vibrant-dark font-black">Q: Improvement timeline?</strong> A: Results visible in 30 days.
                  </p>
                </div>
              </div>
            </div>

            {/* Hall of Fame section on Backside with 4 Success Stories and 1 line spacing */}
            <div className="my-1 border-2 border-orange-100 bg-orange-50/20 rounded-2xl p-2 md:p-3 shrink-0">
              <h3 className="font-black text-xs text-vibrant-dark flex items-center gap-1.5 mb-1 shrink-0">
                <Award className="w-3 h-3 md:w-3.5 md:h-3.5 text-vibrant-orange animate-bounce" />
                Student Success Highlights
              </h3>
              <ul className="space-y-0.5 text-[9px] md:text-[10px] font-bold text-gray-600">
                <li>🏆 <strong>Arnav Patil:</strong> Rank 1 at the 8th International Abacus Meet.</li>
                <li>🏆 <strong>Hitanshi &amp; Shreshth:</strong> Ranks 3 &amp; 1 at International Pune Meet 2025.</li>
                <li className="pt-0.5">🏆 <strong>Spriha Kamath:</strong> 100% perfect score in Visual Abacus.</li>
                <li className="pt-0.5">🏆 <strong>Neha Patil:</strong> Three consecutive Business Excellence Awards (2025-26).</li>
              </ul>
            </div>

            {/* Bottom CTA Block */}
            <div className="bg-[#1A2E35] border-2 border-vibrant-dark rounded-2xl p-2 text-center text-white shadow-[3px_3px_0_0_#1A2E35] shrink-0">
              <h3 className="font-display font-black text-[9px] md:text-xs text-vibrant-orange tracking-wider uppercase mb-0.5">
                🔥 CLAIM A FREE 1-ON-1 MATH SPEED &amp; FOCUS ASSESSMENT
              </h3>
              <p className="text-[8px] md:text-[9.5px] text-gray-300 font-semibold mb-1">
                Evaluate calculation metrics, analyze error patterns, and claim 2 complimentary demo sessions.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[9px] md:text-xs font-black">
                <span className="flex items-center gap-1 text-vibrant-orange">
                  <Phone className="w-3 h-3 text-vibrant-orange" />
                  WhatsApp: +91 90219 24968
                </span>
                <span className="text-gray-500 hidden sm:inline">|</span>
                <span className="text-gray-200">Email: nehaatharv@gmail.com</span>
              </div>
            </div>

            {/* Micro footer */}
            <div className="flex items-center justify-between border-t-2 border-dashed border-vibrant-dark/10 pt-2.5 mt-1 shrink-0">
              <p className="text-[8.5px] md:text-[10px] font-black text-gray-400">
                Arnav Abacus Academy Brochure | 1-Page Summary
              </p>
              <p className="text-[9.5px] md:text-[11px] font-black text-vibrant-orange">
                Click Card to View Front Side ➜
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
