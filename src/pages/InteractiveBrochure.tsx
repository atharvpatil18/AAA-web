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

      {/* 2. 3D Card Flipping Container with responsive height and scrolling for mobile */}
      <div className="relative w-full max-w-4xl mx-auto min-h-[690px] h-auto lg:h-[730px] perspective-1000 mb-12">
        <div
          className={`relative w-full h-full duration-700 transform-style-3d cursor-pointer ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* FRONT SIDE */}
          <div className="absolute w-full h-full backface-hidden border-2 border-vibrant-dark/20 rounded-3xl bg-white shadow-[0_10px_25px_-5px_rgba(26,46,53,0.1)] flex flex-col justify-between overflow-y-auto lg:overflow-hidden p-5 md:p-8">
            {/* Header section with Circular Academy Logo */}
            <div className="flex items-center justify-between border-b-2 border-dashed border-vibrant-dark/10 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full border-2 border-vibrant-dark/20 bg-white" 
                  alt="Academy Logo"
                />
                <div>
                  <h2 className="font-display font-black text-base md:text-xl text-vibrant-dark tracking-tight leading-tight">
                    ARNAV ABACUS ACADEMY
                  </h2>
                  <p className="text-[9px] md:text-[10px] font-black text-vibrant-orange uppercase tracking-wider">
                    NEP 2020 COGNITIVE SKILLS | IIVA CERTIFIED
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-black text-vibrant-teal bg-vibrant-teal/15 border-2 border-vibrant-teal/20 px-3 py-1 rounded-full uppercase">
                Front Side
              </span>
            </div>

            {/* Core Impact Hook */}
            <div className="my-3 text-center bg-indigo-50/50 border-2 border-indigo-100 rounded-2xl p-3 md:p-4 shrink-0">
              <h3 className="font-display font-black text-xs md:text-base text-indigo-950 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-vibrant-orange animate-pulse" />
                UNLOCK YOUR CHILD'S MATH SUPERPOWERS!
              </h3>
              <p className="text-gray-650 text-[11px] md:text-xs font-semibold mt-1 max-w-2xl mx-auto leading-relaxed">
                Traditional math workbook drills induce fear and rote memorization stress. We replace boring routines with visual abacus beads and ancient Vedic shortcuts, triggering whole-brain cognitive growth.
              </p>
              <p className="text-vibrant-orange text-[11px] md:text-xs italic font-black mt-2 max-w-2xl mx-auto leading-relaxed">
                "At AAA, we do not just teach calculations. We inspire deep spatial concentration and visual mastery of numbers to build lifelong academic self-belief." – Neha Patil (Founder)
              </p>
            </div>

            {/* Programs Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 my-2 shrink-0">
              {/* Card 1 */}
              <div className="bg-orange-50/30 border-2 border-orange-100 rounded-2xl p-3 md:p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-vibrant-orange text-white rounded-xl flex items-center justify-center font-black text-xs md:text-sm mb-2 md:mb-3">
                    1
                  </div>
                  <h4 className="font-black text-xs md:text-sm text-vibrant-dark leading-tight">
                    Magic Bead Quest
                  </h4>
                  <p className="text-[8px] md:text-[9px] font-black text-vibrant-orange uppercase tracking-wider mb-1 md:mb-2">
                    Abacus Math (Ages 4-14)
                  </p>
                  <p className="text-gray-650 text-[10px] md:text-[11px] leading-relaxed font-semibold">
                    Slide physical &amp; visual beads to coordinate left-right brain hemispheres, triggering photographic focus.
                  </p>
                </div>
                <div className="border-t border-dashed border-vibrant-dark/15 pt-2 mt-2 md:mt-3">
                  <p className="text-[9px] md:text-[10px] font-black text-vibrant-dark">⚡ Focus Outcomes:</p>
                  <p className="text-[8px] md:text-[9px] font-bold text-gray-500">Photographic memory &amp; visual focus.</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-teal-50/30 border-2 border-teal-100 rounded-2xl p-3 md:p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-vibrant-teal text-white rounded-xl flex items-center justify-center font-black text-xs md:text-sm mb-2 md:mb-3">
                    2
                  </div>
                  <h4 className="font-black text-xs md:text-sm text-vibrant-dark leading-tight">
                    Speed-Math Sorcery
                  </h4>
                  <p className="text-[8px] md:text-[9px] font-black text-vibrant-teal uppercase tracking-wider mb-1 md:mb-2">
                    Vedic Math (Ages 9-16)
                  </p>
                  <p className="text-gray-650 text-[10px] md:text-[11px] leading-relaxed font-semibold">
                    16 ancient mental speed principles to solve multi-digits 10-15x faster without scratch paper workspace.
                  </p>
                </div>
                <div className="border-t border-dashed border-vibrant-dark/15 pt-2 mt-2 md:mt-3">
                  <p className="text-[9px] md:text-[10px] font-black text-vibrant-dark">⚡ Focus Outcomes:</p>
                  <p className="text-[8px] md:text-[9px] font-bold text-gray-500">Squaring shortcuts &amp; Olympiad edge.</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-blue-50/30 border-2 border-blue-100 rounded-2xl p-3 md:p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-xs md:text-sm mb-2 md:mb-3">
                    3
                  </div>
                  <h4 className="font-black text-xs md:text-sm text-vibrant-dark leading-tight">
                    The Olympiad Arena
                  </h4>
                  <p className="text-[8px] md:text-[9px] font-black text-blue-600 uppercase tracking-wider mb-1 md:mb-2">
                    Academic Board Synergy
                  </p>
                  <p className="text-gray-650 text-[10px] md:text-[11px] leading-relaxed font-semibold">
                    Direct mapping with CBSE &amp; ICSE board maths concept modules to eliminate exam worksheet errors.
                  </p>
                </div>
                <div className="border-t border-dashed border-vibrant-dark/15 pt-2 mt-2 md:mt-3">
                  <p className="text-[9px] md:text-[10px] font-black text-vibrant-dark">⚡ Focus Outcomes:</p>
                  <p className="text-[8px] md:text-[9px] font-bold text-gray-500">Board syllabus sync &amp; mock prep sheets.</p>
                </div>
              </div>
            </div>

            {/* Bottom Brand Credential Footer */}
            <div className="flex items-center justify-between border-t-2 border-dashed border-vibrant-dark/10 pt-3 md:pt-4 mt-2 shrink-0">
              <p className="text-[9px] md:text-[10px] font-black text-gray-500">
                Wakad Hub, Pune | Live Global Online Micro-batches
              </p>
              <p className="text-[10px] md:text-[11px] font-black text-vibrant-orange animate-bounce">
                Click Card to View Back Side ➜
              </p>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 border-2 border-vibrant-dark/20 rounded-3xl bg-white shadow-[0_10px_25px_-5px_rgba(26,46,53,0.1)] flex flex-col justify-between overflow-y-auto lg:overflow-hidden p-5 md:p-8">
            {/* Header section */}
            <div className="flex items-center justify-between border-b-2 border-dashed border-vibrant-dark/10 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-xl">🏆</span>
                <div>
                  <h2 className="font-display font-black text-base md:text-xl text-vibrant-dark tracking-tight leading-tight">
                    TRUST &amp; EVALUATION CRITERIA
                  </h2>
                  <p className="text-[9px] md:text-[10px] font-black text-vibrant-teal uppercase tracking-wider">
                    RESULTS PROVEN IN 30 DAYS OR LESSONS COMPLIMENTARY
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-black text-vibrant-orange bg-vibrant-orange/15 border-2 border-vibrant-orange/20 px-3 py-1 rounded-full uppercase">
                Back Side
              </span>
            </div>

            {/* Content grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2 shrink-0">
              {/* AAA Advantages */}
              <div className="space-y-2">
                <h3 className="font-black text-xs md:text-sm text-vibrant-dark flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-vibrant-orange" />
                  Why Choose Arnav Academy?
                </h3>
                <div className="space-y-1.5">
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-2 flex items-start gap-2">
                    <span className="text-vibrant-teal font-black text-xs">✔</span>
                    <div>
                      <p className="text-[9px] md:text-[10px] font-black text-vibrant-dark leading-none">Classroom Ratio Advantage</p>
                      <p className="text-[8px] md:text-[9px] font-bold text-gray-500 mt-1">Guaranteed max 1:8 batch sizes vs 1:25 crowded centers.</p>
                    </div>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-2 flex items-start gap-2">
                    <span className="text-vibrant-teal font-black text-xs">✔</span>
                    <div>
                      <p className="text-[9px] md:text-[10px] font-black text-vibrant-dark leading-none">Syllabus Synchronization</p>
                      <p className="text-[8px] md:text-[9px] font-bold text-gray-500 mt-1">Directly coordinates calculations with school board math.</p>
                    </div>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-2 flex items-start gap-2">
                    <span className="text-vibrant-teal font-black text-xs">✔</span>
                    <div>
                      <p className="text-[9px] md:text-[10px] font-black text-vibrant-dark leading-none">Master Trainer Direction</p>
                      <p className="text-[8px] md:text-[9px] font-bold text-gray-500 mt-1">All levels directed directly by certified founder Neha Patil.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick FAQs */}
              <div className="space-y-2">
                <h3 className="font-black text-xs md:text-sm text-vibrant-dark flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-vibrant-teal" />
                  Quick Parent FAQs
                </h3>
                <div className="space-y-1.5 bg-amber-50/20 border border-amber-100/50 rounded-2xl p-2 md:p-2.5">
                  <div>
                    <p className="text-[9px] md:text-[9.5px] font-black text-vibrant-dark leading-tight">Q: Will this confuse school methods?</p>
                    <p className="text-[8px] md:text-[9px] font-medium text-gray-650 mt-0.5">A: No! It acts as a speed tool, making school exam sheets 10x faster to solve.</p>
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[9.5px] font-black text-vibrant-dark leading-tight">Q: My child hates repetition. How to trigger interest?</p>
                    <p className="text-[8px] md:text-[9px] font-medium text-gray-650 mt-0.5">A: We replace rote drills with abacus visual gaming rounds. Learning feels like play!</p>
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[9.5px] font-black text-vibrant-dark leading-tight">Q: How soon can we expect improvements?</p>
                    <p className="text-[8px] md:text-[9px] font-medium text-gray-650 mt-0.5">A: Most parents report that finger-counting disappears and scores boost in 30 days.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hall of Fame section on Backside with 4 Success Stories and 1 line spacing */}
            <div className="my-2 border-2 border-orange-100 bg-orange-50/20 rounded-2xl p-3 shrink-0">
              <h3 className="font-black text-xs text-vibrant-dark flex items-center gap-1.5 mb-1.5">
                <Award className="w-3.5 h-3.5 text-vibrant-orange animate-bounce" />
                Student Success Highlights
              </h3>
              <ul className="space-y-1 text-[9.5px] md:text-[10px] font-bold text-gray-600">
                <li>🏆 <strong>Arnav Patil:</strong> Achieved Rank 1 at the 8th International Abacus Meet (presented by Dr. Kiran Bedi).</li>
                <li>🏆 <strong>Hitanshi Agarwal &amp; Shreshth Gupta:</strong> Clinched Ranks 3 &amp; 1 respectively at the International level Abacus Competition Pune 2025.</li>
                <li className="pt-0.5">🏆 <strong>Spriha Kamath:</strong> Named Student of the Year with a perfect 100% score in Visual Abacus certification.</li>
                <li className="pt-0.5">🏆 <strong>Neha Patil:</strong> Honored with three consecutive Business Excellence Awards (2025-26).</li>
              </ul>
            </div>

            {/* Bottom CTA Block */}
            <div className="bg-[#1A2E35] border-2 border-vibrant-dark rounded-2xl p-3 text-center text-white shadow-[3px_3px_0_0_#1A2E35] shrink-0">
              <h3 className="font-display font-black text-[10px] md:text-xs text-vibrant-orange tracking-wider uppercase mb-1">
                🔥 CLAIM A FREE 1-ON-1 MATH SPEED &amp; FOCUS ASSESSMENT
              </h3>
              <p className="text-[8.5px] md:text-[9.5px] text-gray-300 font-semibold mb-1">
                Evaluate calculation metrics, analyze error patterns, and claim 2 complimentary demo sessions.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-[10px] md:text-xs font-black">
                <span className="flex items-center gap-1 text-vibrant-orange">
                  <Phone className="w-3.5 h-3.5" />
                  WhatsApp: +91 90219 24968
                </span>
                <span className="text-gray-500 hidden sm:inline">|</span>
                <span className="text-gray-200">Email: nehaatharv@gmail.com</span>
              </div>
            </div>

            {/* Micro footer */}
            <div className="flex items-center justify-between border-t-2 border-dashed border-vibrant-dark/10 pt-3 mt-2 shrink-0">
              <p className="text-[9px] md:text-[10px] font-black text-gray-400">
                Arnav Abacus Academy Brochure | Strictly 1-Page Layout
              </p>
              <p className="text-[10px] md:text-[11px] font-black text-vibrant-orange">
                Click Card to View Front Side ➜
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
